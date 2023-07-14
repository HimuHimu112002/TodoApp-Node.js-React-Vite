const nodemailer = require("nodemailer");

async function EmailVarification(email,randomOtpNumber) {
   
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: "mdhmaktaruzzaman9101@gmail.com",
          pass: "skrbxatmxhavumgs"
        }
      });
  
    await transporter.sendMail({
        from: '"Fred Foo 👻"',
        to: email,
        subject: "Todo",
        text: "Task Manager",
        html: ` Otp Number = ${randomOtpNumber} <h1 style="font-family: Arial, Helvetica, sans-serif;color: #262626;">Todo Task</h1> <h2 style="font-family: Arial, Helvetica, sans-serif;font-size: 34px; color: #262626;">Please confirm your email </h2> <p style="font-family: Arial, Helvetica, sans-serif;">Welcome to our todo task manager. For continue please verify your email address.</p><button style="background-color: #262626; color: white; padding: 10px 10px; border-radius: 5px; cursor: pointer; font-family: Arial, Helvetica, sans-serif;" >Click Here</button>`,
      });
  
}
module.exports = EmailVarification