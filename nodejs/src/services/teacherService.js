import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';
import emailService from '../services/emailService';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopTeacherHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        where: { roleId: 'R2' },
        order: [['email', 'ASC']],
        attributes: {
          exclude: ['password'],
        },
        include: [
          { model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown'] },
          { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
          { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
          {
            model: db.Teacher_Infor,
            attributes: ['specialtyId'],
            include: [{ model: db.Specialty, as: 'imageData', attributes: ['name'] }],
          },
        ],
        raw: true,
        nest: true,
      });

      resolve({
        errCode: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllTeachers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let teachers = await db.User.findAll({
        where: { roleId: 'R2' },
        attributes: {
          exclude: ['password', 'image'],
        },
      });

      resolve({
        errCode: 0,
        data: teachers,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let checkRequiredFields = (inputData) => {
  let arrFields = [
    'teacherId',
    'contentMarkdown',
    'action',
    'selectedPrice',
    'selectedPayment',
    'selectedProvince',
    'nameTeachingCenter',
    'addressTeachingCenter',
    'note',
    'specialtyId',
  ];

  let isValid = true;
  let element = '';
  for (let i = 0; i < arrFields.length; i++) {
    if (!inputData[arrFields[i]]) {
      isValid = false;
      element = arrFields[i];
      break;
    }
  }
  return {
    isValid: isValid,
    element: element,
  };
};

let saveDetailInforTeacher = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkObjec = checkRequiredFields(inputData);

      if (checkObjec.isValid === false) {
        resolve({
          errCode: 1,
          errMessage: `Missing parameters: ${checkObjec.element}`,
        });
      } else {
        //UPSERT TO MARKDOWN
        if (inputData.action === 'CREATE') {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            description: inputData.description,
            teacherId: inputData.teacherId,
          });
        } else if (inputData.action === 'EDIT') {
          let teacherMarkdown = await db.Markdown.findOne({
            where: { teacherId: inputData.teacherId },
            raw: false,
          });
          if (teacherMarkdown) {
            teacherMarkdown.contentHTML = inputData.contentHTML;
            teacherMarkdown.contentMarkdown = inputData.contentMarkdown;
            teacherMarkdown.description = inputData.description;
            await teacherMarkdown.save();
          }
        }

        //UPSERT TO teacher INFOR TABLE
        let teacherInfor = await db.Teacher_Infor.findOne({
          where: {
            teacherId: inputData.teacherId,
          },
          raw: false,
        });

        if (teacherInfor) {
          //UPDATE
          teacherInfor.teacherId = inputData.teacherId;
          teacherInfor.priceId = inputData.selectedPrice;
          teacherInfor.provinceId = inputData.selectedProvince;
          teacherInfor.paymentId = inputData.selectedPayment;
          teacherInfor.nameTeachingCenter = inputData.nameTeachingCenter;
          teacherInfor.addressTeachingCenter = inputData.addressTeachingCenter;
          teacherInfor.note = inputData.note;
          teacherInfor.specialtyId = inputData.specialtyId;
          teacherInfor.teachingCenterId = inputData.teachingCenterId;
          await teacherInfor.save();
        } else {
          //CREATE
          await db.Teacher_Infor.create({
            teacherId: inputData.teacherId,
            priceId: inputData.selectedPrice,
            provinceId: inputData.selectedProvince,
            paymentId: inputData.selectedPayment,
            nameTeachingCenter: inputData.nameTeachingCenter,
            addressTeachingCenter: inputData.addressTeachingCenter,
            note: inputData.note,
            specialtyId: inputData.specialtyId,
            teachingCenterId: inputData.teachingCenterId,
          });
        }
        resolve({
          errCode: 0,
          errMessage: 'Save information Teachers Succeed!',
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailTeacherById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters!',
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: inputId,
          },
          attributes: {
            exclude: ['password'],
          },
          include: [
            { model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown'] },
            { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
            {
              model: db.Teacher_Infor,
              attributes: {
                exclude: ['id', 'teacherId'],
              },
              include: [
                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
              ],
            },
          ],
          raw: false,
          nest: true,
        });

        if (data && data.image) {
          data.image = new Buffer(data.image, 'base64').toString('binary');
        }

        if (!data) data = {};

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let bulkCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.teacherId || !data.formatedDate) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter',
        });
      } else {
        let schedule = data.arrSchedule;

        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }

        //get all existing  data
        let existing = await db.Schedule.findAll({
          where: { teacherId: data.teacherId, date: data.formatedDate },
          attributes: ['teacherId', 'date', 'timeType', 'maxNumber'],
          raw: true,
        });

        //compare different => create a new Array
        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });

        //create data
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }

        resolve({
          errCode: 0,
          errMessage: 'OK',
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getScheduleByDate = (teacherId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!teacherId || !date) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter!',
        });
      } else {
        let dataSchedule = await db.Schedule.findAll({
          where: {
            teacherId: teacherId,
            date: date,
          },
          include: [
            { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
            { model: db.User, as: 'teacherData', attributes: ['firstName', 'lastName'] },
          ],

          raw: false,
          nest: true,
        });
        if (!dataSchedule) dataSchedule = [];

        resolve({
          errCode: 0,
          data: dataSchedule,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getExtraTeacherById = (idInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idInput) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter!',
        });
      } else {
        let data = await db.Teacher_Infor.findOne({
          where: { teacherId: idInput },
          attributes: {
            exclude: ['id', 'teacherId'],
          },
          include: [
            { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
            { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
            { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
          ],
          raw: false,
          nest: true,
        });

        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getProfileTeacherById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter!',
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: inputId,
          },
          attributes: {
            exclude: ['password'],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ['description', 'contentHTML', 'contentMarkdown'],
            },
            { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
            {
              model: db.Teacher_Infor,
              attributes: {
                exclude: ['id', 'teacherId'],
              },
              include: [
                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
              ],
            },
          ],
          raw: false,
          nest: true,
        });

        if (data && data.image) {
          data.image = new Buffer(data.image, 'base64').toString('binary');
        }

        if (!data) data = {};

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getListStudentForTeacher = (teacherId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!teacherId || !date) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter!',
        });
      } else {
        let data = await db.Booking.findAll({
          where: {
            statusId: 'S2',
            teacherId: teacherId,
            date: date,
          },
          include: [
            {
              model: db.User,
              as: 'studentData',
              attributes: ['email', 'firstName', 'address', 'gender'],
              include: [
                { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
              ],
            },
            {
              model: db.Allcode,
              as: 'timeTypeDataStudent',
              attributes: ['valueEn', 'valueVi'],
            },
          ],
          raw: false,
          nest: true,
        });

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let sendRemedy = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.teacherId || !data.studentId || !data.timeType || !data.imgBase64) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter!',
        });
      } else {
        //update student status
        let appointment = await db.Booking.findOne({
          where: {
            teacherId: data.teacherId,
            studentId: data.studentId,
            timeType: data.timeType,
            statusId: 'S2',
          },
          raw: false,
        });

        if (appointment) {
          appointment.statusId = 'S3';
          await appointment.save();
        }

        //send email remedy
        await emailService.sendAttachment(data);
        resolve({
          errCode: 0,
          errMessage: 'ok',
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getTopTeacherHome,
  getAllTeachers,
  saveDetailInforTeacher,
  getDetailTeacherById,
  bulkCreateSchedule,
  getScheduleByDate,
  getExtraTeacherById,
  getProfileTeacherById,
  getListStudentForTeacher,
  sendRemedy,
};
