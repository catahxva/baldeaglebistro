const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../models/userModel");
const sendEmail = require("../utils/email");
const emailTemplate = require("../utils/emailTemplate");
const sendError = require("../utils/sendError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 90 * 86400,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.signup = async function (req, res, next) {
  try {
    const newUser = await User.create({
      username: req.body.username,
      role: req.body.role && "user",
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const verificationToken = newUser.createEmailVerificationToken();

    await newUser.save({ validateBeforeSave: false });

    const preheaderText = "Verify your account";
    const message = `This email was sent to you to verify your newly created account at Bald Eagle Bistro. Please click the button below to proceed, or use the link if there are any problems with the buton.`;
    const ctaText = `Verify`;
    const ctaLink = `${verificationToken}`;

    const html = emailTemplate(preheaderText, message, ctaText, ctaLink);

    await sendEmail({
      email: newUser.email,
      subject: "Verify Account",
      html,
    });

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    sendError(
      res,
      400,
      "There has been a problem with creating your account, please try again later.",
      err
    );
  }
};

exports.verifyEmail = async function (req, res, next) {
  try {
    const user = await User.findOne({
      verifyEmailToken: req.body.token,
    });

    if (!user) {
      return sendError(res, 404, "No user found");
    }

    user.verified = true;

    user.verifyEmailToken = undefined;

    await user.save({ validateBeforeSave: false });

    createSendToken(user, 200, res);
  } catch (err) {
    sendError(
      res,
      400,
      "There has been a problem with verifying your account. Please try again later"
    );
  }
};

exports.login = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(
        res,
        400,
        "Please provide an email and/or password to proceed"
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return sendError(res, 400, "Invalid email or password. Please try again");
    }

    if (!user.verified) {
      return sendError(res, 400, "Your account has not been verified yet");
    }

    createSendToken(user, 200, res);
  } catch (err) {
    sendError(
      res,
      400,
      "There has been a problem logging into your account. Please try again later"
    );
  }
};

exports.forgotPassword = async function (req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return sendError(res, 404, "No account found for this email address");
    }

    const resetToken = user.createPasswordResetToken();

    await user.save({ validateBeforeSave: false });

    const preheaderText = "Reset your password";
    const message = `Click on the button below to reset the password for your account on Scent Haven. If you did not try to reset your password, please ignore this email. If the button below did not work, please access this link: `;
    const ctaText = "Reset password";
    const ctaLink = `${resetToken}`;

    const html = emailTemplate(preheaderText, message, ctaText, ctaLink);

    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      html,
    });

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    sendError(res, 400, "There has been an error. Please try again later");
  }
};

exports.resetForgotPassword = async function (req, res, next) {
  try {
    const user = await User.findOne({
      passwordResetToken: req.body.token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return sendError(res, 400, "Your token is invalid or it has expired");
    }

    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    createSendToken(user, 200, res);
  } catch (err) {
    sendError(
      res,
      400,
      "There has been an error with reseting your password. Please try again later"
    );
  }
};

exports.resetPassword = async function (req, res, next) {
  try {
    const user = req.user;

    if (!user) {
      return sendError(res, 404, "No user found");
    }

    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;

    await user.save({ validateBeforeSave: false });

    createSendToken(user, 200, res);
  } catch (err) {
    console.log(err);
    sendError(
      res,
      400,
      "There has been a problem with resetting your password. Please try again later",
      err
    );
  }
};

exports.isLoggedIn = async function (req, res, next) {
  if (req.body.token) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.body.token,
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decoded.id).select("+password");

      if (!currentUser) {
        return sendError(res, 404, "No user found with this ID.");
      }

      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return sendError(
          res,
          400,
          "User has recently changed the account password, please log in again."
        );
      }

      res.locals.user = currentUser;

      req.user = currentUser;

      return next();
    } catch (err) {
      return sendError(
        res,
        400,
        "There has been a problem. Please try again later"
      );
    }
  }

  next();
};

exports.protect = async function (req, res, next) {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return sendError(
        res,
        400,
        "You are not logged in. Please log in to get access"
      );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return sendError(res, 404, "No user found with this ID.");
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return sendError(
        res,
        400,
        "User has recently changed account password. Please log in again to continue."
      );
    }

    req.user = currentUser;

    return next();
  } catch (err) {
    return sendError(
      res,
      400,
      "There has been an error. Please try again later."
    );
  }
};

exports.protectRole = async function (req, res, next) {
  const user = req.user;

  if (user.role !== "admin") {
    return sendError(
      res,
      400,
      "You do not have permission to perform this action"
    );
  }

  next();
};

exports.updateUserAddress = async function (req, res, next) {
  try {
    const user = req.user;
    const { name, phone, street, streetNumber } = req.body;

    user.address = {
      name,
      phone,
      street,
      streetNumber,
    };

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      data: {
        data: user.address,
      },
    });
  } catch (err) {
    sendError(res, 400, "There has been an error. Please try again later");
  }
};
