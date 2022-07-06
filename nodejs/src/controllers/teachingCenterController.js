import teachingCenterService from '../services/teachingCenterService';

let getAllTeachingCenter = async (req, res) => {
  try {
    let infor = await teachingCenterService.getAllTeachingCenter();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server!',
    });
  }
};

let createTeachingCenter = async (req, res) => {
  try {
    let infor = await teachingCenterService.createTeachingCenter(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server!',
    });
  }
};

let getDetailTeachingCenterById = async (req, res) => {
  try {
    let infor = await teachingCenterService.getDetailTeachingCenterById(req.query.id);
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
  getAllTeachingCenter,
  createTeachingCenter,
  getDetailTeachingCenterById,
};
