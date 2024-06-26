const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide an username"],
      minlength: [6, "Please provide an username of over 6 characters"],
      unique: [true, "Username is already in use"],
    },
    role: {
      type: String,
      required: [true, "User must have a role"],
      enum: ["admin", "user"],
      default: "user",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "This email is already in use"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords must be identical",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    verifyEmailToken: String,
    orders: {
      previousOrders: [
        {
          orderId: {
            type: mongoose.Schema.ObjectId,
            ref: "Order",
          },
        },
      ],
    },
    address: {
      email: {
        type: String,
      },
      name: {
        type: String,
      },
      phone: {
        type: String,
      },
      street: {
        type: String,
      },
      streetNumber: {
        type: String,
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimeStamp < changedTimeStamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = resetToken;

  this.passwordResetExpires = Date.now() + 24 * 60 * 60 * 1000;

  return resetToken;
};

userSchema.methods.createEmailVerificationToken = function () {
  const verifyToken = crypto.randomBytes(32).toString("hex");

  this.verifyEmailToken = verifyToken;

  return verifyToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
