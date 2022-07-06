require('dotenv').config();
const nodemailer = require('nodemailer');

let sendSimpleEmail = async (dataSend) => {
  // async..await is not allowed in global scope, must use a wrapper
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Too Foo 👻" <tuhuynh272@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: 'Thông tin đặt lịch khám bệnh', // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = '';
  if (dataSend.language === 'vi') {
    result = `
    <h3>Xin chào ${dataSend.studentName}! </h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh tại bệnh viện Online trên Too Foo Hispotal</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.teacherName}</b></div>

    <p>Nếu các thông tin trên là đúng sự thật, xin vui lòng nhấn vào đường link bên dưới để xác nhận lịch khám bệnh của bạn.</p>
<div>
<a href=${dataSend.redirectLink} target="_blank" >Click here!</a>
</div>

<div>Xin chân thành cảm ơn</div>`;
  }
  if (dataSend.language === 'en') {
    result = `
    <h3>Dear ${dataSend.studentName}! </h3>
    <p>This email was sent to you because you scheduled an online hospital appointment with Too Foo Hospital.l</p>
    <p>Information to book a medical appointment:</p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Teacher: ${dataSend.teacherName}</b></div>

    <p>If the above information is correct, please click on the link below to confirm your appointment.</p>
<div>
<a href=${dataSend.redirectLink} target="_blank" >Click here!</a>
</div>

<div>Thank you very much.</div>`;
  }
  return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = '';
  if (dataSend.language === 'vi') {
    result = `
    <h3>Xin chào ${dataSend.studentName}! </h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh tại bệnh viện Online trên Too Foo Hispotal thành công</p>
    <p>Thông tin đơn thuốc / hoá đơn được gửi trong file đính kèm!</p>
    <div>Xin chân thành cảm ơn</div>`;
  }
  if (dataSend.language === 'en') {
    result = `
    <h3>Dear ${dataSend.studentName}! </h3>
    <p>You received thí email because you booked an online hospital appointment with Too Foo Hospital successfully</p>
    <p>Hope to see you again</p>
<div>Thank you very much.</div>`;
  }
  return result;
};

let sendAttachment = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Too Foo 👻" <tuhuynh272@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: 'Kết quả đặt lịch khám bệnh', // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
          {
            // encoded string as an attachment
            filename: `remedy-${dataSend.studentId}-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split('base64,')[1],
            encoding: 'base64',
          },
        ],
      });
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment,
};
