import teacherService from '../services/teacherService';

let getTopTeacherHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await teacherService.getTopTeacherHome(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: 'Error from server...',
    });
  }
};

let getAllDoctors = async (req, res) => {
  try {
    let doctors = await teacherService.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (e) {
    console.log('e');
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server',
    });
  }
};

let postInforDoctor = async (req, res) => {
  try {
    let response = await teacherService.saveDetailInforDoctor(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server',
    });
  }
};

let getDetailDoctorById = async (req, res) => {
  try {
    let infor = await doctorService.getDetailDoctorById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server!',
    });
  }
};

module.exports = {
  getTopTeacherHome,
  getAllDoctors,
  postInforDoctor,
  getDetailDoctorById,
};
