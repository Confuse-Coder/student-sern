import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import teacherController from '../controllers/teacherController';
import teachingCenterController from '../controllers/teachingCenterController';
import specialtyController from '../controllers/specialtyController';
import studentController from '../controllers/studentController';

let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/crud', homeController.getCRUD);
  router.post('/post-crud', homeController.postCRUD);
  router.get('/get-crud', homeController.displayGetCRUD);
  router.get('/edit-crud', homeController.getEditCRUD);
  router.post('/put-crud', homeController.putCRUD);
  router.get('/delete-crud', homeController.deleteCRUD);

  //login
  router.post('/api/login', userController.handleLogin);
  router.get('/api/user/read', userController.readFunc);
  router.get('/api/get-all-users', userController.handleGetAllUser);
  router.post('/api/create-new-user', userController.handleCreateNewUser);
  router.put('/api/edit-user', userController.handleEditUser);
  router.delete('/api/delete-user', userController.handleDeleteUser);
  router.get('/api/allcode', userController.getAllCode);

  router.get('/api/top-teacher-home', teacherController.getTopTeacherHome);
  router.get('/api/get-all-teachers', teacherController.getAllTeachers);
  router.post('/api/save-infor-teachers', teacherController.postInforTeacher);
  router.get('/api/get-detail-teacher-by-id', teacherController.getDetailTeacherById);
  router.get('/api/get-teachingCenter', teachingCenterController.getAllTeachingCenter);

  router.get('/api/get-specialty', specialtyController.getAllSpecialty);

  router.post('/api/bulk-create-schedule', teacherController.bulkCreateSchedule);
  router.get('/api/get-schedule-teacher-by-date', teacherController.getScheduleByDate);
  router.get('/api/get-extra_infor-teacher-by-id', teacherController.getExtraTeacherById);
  router.get('/api/get-profile-teacher-by-id', teacherController.getProfileTeacherById);
  router.get('/api/get-list-student-for-teacher', teacherController.getListStudentForTeacher);
  router.post('/api/send-remedy', teacherController.sendRemedy);
  router.post('/api/student-book-appointment', studentController.postBookAppointment);
  router.post('/api/verify-book-appointment', studentController.postVerifyBookAppointment);
  router.post('/api/create-new-specialty', specialtyController.createSpecialty);
  router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById);
  router.post('/api/create-new-teaching-center', teachingCenterController.createTeachingCenter);
  router.get(
    '/api/get-detail-teaching-center-by-id',
    teachingCenterController.getDetailTeachingCenterById
  );

  return app.use('/', router);
};

module.exports = initWebRoutes;
