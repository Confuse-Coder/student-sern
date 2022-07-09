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
    subject: 'Thông tin đặt lịch học', // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = '';
  if (dataSend.language === 'vi') {
    result = `
    <h3>Xin chào ${dataSend.studentName}! </h3>
    <p>Xin vui lòng xác nhận lịch học tại Akademy</p>
    <p>Thông tin đặt lịch học:</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Giảng viên: ${dataSend.teacherName}</b></div>

    <p>Nếu các thông tin trên là đúng sự thật, xin vui lòng nhấn vào đường link bên dưới để xác nhận lịch học của bạn.</p>
<div>
<a href=${dataSend.redirectLink} target="_blank" >Click here!</a>
</div>

<div>Xin chân thành cảm ơn</div>`;
  }
  if (dataSend.language === 'en') {
    result = `
    <h3>Dear ${dataSend.studentName}! </h3>
    <p>Please confirm the schedule of classes at Akademy</p>
    <p>Information to book your schedule here:</p>
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

let getBodyHTMLEmailConfirmSchedule = (dataSend) => {
  let result = '';
  if (dataSend.language === 'vi') {
    result = `
    <h3>Xin chúc mừng ${dataSend.studentName}! </h3>
    <p>Bạn nhận được email này vì đã đặt lịch học tại Akademy thành công!</p>
    <p>Thông tin lịch học / hoá đơn được gửi trong file đính kèm!</p>
    <div>Xin chân thành cảm ơn</div>`;
  }
  if (dataSend.language === 'en') {
    result = `
    <h3>Congratulations ${dataSend.studentName}! </h3>
    <p>You received this email because your appointment at Akademy has been successfully booked</p>
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
        subject: 'Kết quả đặt lịch học', // Subject line
        html: getBodyHTMLEmailConfirmSchedule(dataSend),
        attachments: [
          {
            // encoded string as an attachment
            filename: `Confirm Schedule-${dataSend.studentId}-${new Date().getTime()}.png`,
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
