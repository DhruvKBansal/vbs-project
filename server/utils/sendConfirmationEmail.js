// utils/sendConfirmationEmail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vacationbusservices@gmail.com",
    pass: "aatz hyuw bfzd bbdy", // Replace with App Password
  },
});

const sendConfirmationEmail = async (email, date, timeSlot) => {
  try {
    await transporter.sendMail({
      from: "vacationbusservices@gmail.com",
      to: email,
      subject: "Booking Confirmation - VBS",
      text: `🎉 Your booking for ${date} at ${timeSlot} has been successfully confirmed!\n\nThank you for choosing Vacation Bus Services.`,
    });
    console.log(`✅ Confirmation email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error);
  }
};

module.exports = sendConfirmationEmail;
