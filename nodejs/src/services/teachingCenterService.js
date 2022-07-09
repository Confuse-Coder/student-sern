import db from '../models/index';

let getAllTeachingCenter = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Teaching_Center.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = Buffer.from(item.image, 'base64').toString('binary');
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: 'ok',
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createTeachingCenter = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: 'Missing parameters!',
        });
      } else {
        await db.Teaching_Center.create({
          name: data.name,
          address: data.address,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          errMessage: 'OK!',
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailTeachingCenterById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: 'Missing parameters!',
        });
      } else {
        let data = await db.Teaching_Center.findOne({
          where: { id: inputId },
          attributes: ['address', 'name', 'descriptionHTML', 'descriptionMarkdown'],
        });
        if (data) {
          let teacherTeachingCenter = [];
          teacherTeachingCenter = await db.Teacher_Infor.findAll({
            where: { teachingCenterId: inputId },
            attributes: ['teacherId'],
          });

          data.teacherTeachingCenter = teacherTeachingCenter;
        } else {
          data = {};
        }
        resolve({
          errCode: 0,
          errMessage: 'ok',
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllTeachingCenter,
  createTeachingCenter,
  getDetailTeachingCenterById,
};
