import db from '../models/index';

let getTopTeacherHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        where: { roleId: 'R2' },
        // order: [['email', 'ASC']],
        attributes: {
          exclude: ['password'],
        },
        include: [
          // { model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown'] },
          { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
          { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
          // {
          //   model: db.Teacher_Infor,
          //   attributes: ['specialtyId'],
          //   include: [{ model: db.Specialty, as: 'imageData', attributes: ['name'] }],
          // },
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

let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: 'R2' },
        attributes: {
          exclude: ['password', 'image'],
        },
      });

      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// let checkRequiredFields = (inputData) => {
//   let arrFields = [
//     'doctorId',
//     'contentMarkdown',
//     'action',
//     'selectedPrice',
//     'selectedPayment',
//     'selectedProvince',
//     'nameClinic',
//     'addressClinic',
//     'note',
//     'specialtyId',
//   ];

//   let isValid = true;
//   let element = '';
//   for (let i = 0; i < arrFields.length; i++) {
//     if (!inputData[arrFields[i]]) {
//       isValid = false;
//       element = arrFields[i];
//       break;
//     }
//   }
//   return {
//     isValid: isValid,
//     element: element,
//   };
// };

let saveDetailInforDoctor = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let checkObjec = checkRequiredFields(inputData);

      // if (checkObjec.isValid === false) {
      // }
      if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown) {
        resolve({
          errCode: 1,
          errMessage: 'Missing parameters: ',
          //  ${checkObjec.element}
        });
      } else {
        await db.Markdown.create({
          contentHTML: inputData.contentHTML,
          contentMarkdown: inputData.contentMarkdown,
          description: inputData.description,
          doctorId: inputData.doctorId,
        });
        resolve({
          errCode: 0,
          errMessage: 'Save information Doctors Succeed!',
        });
      }

      // else {
      //   //UPSERT TO MARKDOWN
      //   if (inputData.action === 'CREATE') {
      //     await db.Markdown.create({
      //       contentHTML: inputData.contentHTML,
      //       contentMarkdown: inputData.contentMarkdown,
      //       description: inputData.description,
      //       doctorId: inputData.doctorId,
      //     });
      //   } else if (inputData.action === 'EDIT') {
      //     let doctorMarkdown = await db.Markdown.findOne({
      //       where: { doctorId: inputData.doctorId },
      //       raw: false,
      //     });
      //     if (doctorMarkdown) {
      //       doctorMarkdown.contentHTML = inputData.contentHTML;
      //       doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
      //       doctorMarkdown.description = inputData.description;
      //       await doctorMarkdown.save();
      //     }
      //   }

      //   //UPSERT TO DOCTOR INFOR TABLE
      //   let doctorInfor = await db.Doctor_Infor.findOne({
      //     where: {
      //       doctorId: inputData.doctorId,
      //     },
      //     raw: false,
      //   });

      //   if (doctorInfor) {
      //     //UPDATE
      //     doctorInfor.doctorId = inputData.doctorId;
      //     doctorInfor.priceId = inputData.selectedPrice;
      //     doctorInfor.provinceId = inputData.selectedProvince;
      //     doctorInfor.paymentId = inputData.selectedPayment;
      //     doctorInfor.nameClinic = inputData.nameClinic;
      //     doctorInfor.addressClinic = inputData.addressClinic;
      //     doctorInfor.note = inputData.note;
      //     doctorInfor.specialtyId = inputData.specialtyId;
      //     doctorInfor.clinicId = inputData.clinicId;
      //     await doctorInfor.save();
      //   } else {
      //     //CREATE
      //     await db.Doctor_Infor.create({
      //       doctorId: inputData.doctorId,
      //       priceId: inputData.selectedPrice,
      //       provinceId: inputData.selectedProvince,
      //       paymentId: inputData.selectedPayment,
      //       nameClinic: inputData.nameClinic,
      //       addressClinic: inputData.addressClinic,
      //       note: inputData.note,
      //       specialtyId: inputData.specialtyId,
      //       clinicId: inputData.clinicId,
      //     });
      //   }
      //   resolve({
      //     errCode: 0,
      //     errMessage: 'Save information Doctors Succeed!',
      //   });
      // }
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailDoctorById = (inputId) => {
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
            // { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
            // {
            //   model: db.Doctor_Infor,
            //   attributes: {
            //     exclude: ['id', 'doctorId'],
            //   },
            //   include: [
            //     { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
            //     { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
            //     { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
            //   ],
            // },
          ],
          raw: false,
          nest: true,
        });

        // if (data && data.image) {
        //   data.image = new Buffer(data.image, 'base64').toString('binary');
        // }

        // if (!data) data = {};

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

module.exports = {
  getTopTeacherHome,
  getAllDoctors,
  saveDetailInforDoctor,
  getDetailDoctorById,
};
