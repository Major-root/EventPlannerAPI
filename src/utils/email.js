const nodemailer = require("nodemailer");
const { html } = require("../templates/html");

module.exports = class Email {
  constructor(user, data) {
    this.to = user.email;
    this.name = user.name;
    this.data = data;
    this.from = `Stanley Kelechi <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GOOGLE_USERNAME,
          pass: process.env.GOOGLE_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_USERNAME,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = template;

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    const info = await this.newTransport().sendMail(mailOptions);
  }

  async sendVerifyEmail() {
    await this.send(
      html.otpVerificationEmail(this.data, this.name),
      "Verify email OTP"
    );
    return;
  }
  async sendTicketEmail() {
    await this.send(
      html.ticketEmail(this.data, this.name),
      "Your ticket has been generated"
    );
    return;
  }
};
