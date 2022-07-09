import db from '../models/index';

let getAllSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll();
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

let createSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
        resolve({
          errCode: 1,
          errMessage: 'Missing parameters!',
        });
      } else {
        await db.Specialty.create({
          name: data.name,
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

let getDetailSpecialtyById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: 'Missing parameters!',
        });
      } else {
        let data = await db.Specialty.findOne({
          where: { id: inputId },
          attributes: ['descriptionHTML', 'descriptionMarkdown'],
        });

        if (data) {
          let teacherSpecialty = [];
          if (location === 'ALL') {
            teacherSpecialty = await db.Teacher_Infor.findAll({
              where: { specialtyId: inputId },
              attributes: ['teacherId', 'provinceId'],
            });
          } else {
            //find by location
            teacherSpecialty = await db.Teacher_Infor.findAll({
              where: {
                specialtyId: inputId,
                provinceId: location,
              },
              attributes: ['teacherId', 'provinceId'],
            });
          }

          data.teacherSpecialty = teacherSpecialty;
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
  getAllSpecialty,
  createSpecialty,
  getDetailSpecialtyById,
};
