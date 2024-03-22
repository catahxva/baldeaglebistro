const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
  url: "https://api.eu.mailgun.net",
});

const sendEmail = async function (options) {
  try {
    await mg.messages.create("mainapi.store", {
      from: "postmaster@mainapi.store",
      to: [options.email],
      subject: options.subject,
      html: options.emailHTML,
    });
  } catch (err) {
    throw err;
  }
};

module.exports = sendEmail;
