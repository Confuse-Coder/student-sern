import axios from '../axios';

const handleLoginApi = (email, password) => {
  return axios.post('/api/login', { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const fetchAllUsers = (page, limit) => {
  return axios.get(`/api/user/read?page=${page}&limit=${limit}`);
};

const createNewUserService = (data) => {
  return axios.post('api/create-new-user', data);
};

const deleteUserService = (userId) => {
  return axios.delete('api/delete-user', { data: { id: userId } });
};

const editUserService = (inputData) => {
  return axios.put('/api/edit-user', inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopTeacherHomeService = (limit) => {
  return axios.get(`/api/top-teacher-home?limit=${limit}`);
};

const getAllTeachers = () => {
  return axios.get(`/api/get-all-teachers`);
};

const saveDetailTeacherService = (data) => {
  return axios.post('api/save-infor-teachers', data);
};

const getDetailInfoTeacher = (inputId) => {
  return axios.get(`/api/get-detail-teacher-by-id?id=${inputId}`);
};

const getAllSpecialty = () => {
  return axios.get(`/api/get-specialty`);
};

const getAllTeachingCenter = () => {
  return axios.get(`/api/get-teachingCenter`);
};

const saveBulkScheduleTeacher = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleTeacherByDate = (teacherId, date) => {
  return axios.get(`/api/get-schedule-teacher-by-date?teacherId=${teacherId}&date=${date}`);
};

const getExtraInforTeacherById = (teacherId) => {
  return axios.get(`/api/get-extra_infor-teacher-by-id?teacherId=${teacherId}`);
};

const getProfileTeacherById = (teacherId) => {
  return axios.get(`/api/get-profile-teacher-by-id?teacherId=${teacherId}`);
};

const postStudentBookAppointment = (data) => {
  return axios.post(`/api/student-book-appointment`, data);
};

const postVerifyBookAppointment = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};

const createNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};

const getDetailSpecialtyById = (data) => {
  return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
};

const createNewTeachingCenter = (data) => {
  return axios.post(`/api/create-new-teaching-center`, data);
};

const getDetailTeachingCenterById = (data) => {
  return axios.get(`/api/get-detail-teaching-center-by-id?id=${data.id}`);
};

const getAllStudentForTeacher = (data) => {
  return axios.get(
    `/api/get-list-student-for-teacher?teacherId=${data.teacherId}&date=${data.date}`
  );
};

const postSendConfirmSchedule = (data) => {
  return axios.post(`/api/send-confirm-schedule`, data);
};

export {
  handleLoginApi,
  fetchAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getAllUsers,
  getTopTeacherHomeService,
  getAllTeachers,
  saveDetailTeacherService,
  getDetailInfoTeacher,
  getAllSpecialty,
  getAllTeachingCenter,
  saveBulkScheduleTeacher,
  getScheduleTeacherByDate,
  getExtraInforTeacherById,
  getProfileTeacherById,
  postStudentBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getDetailSpecialtyById,
  createNewTeachingCenter,
  getDetailTeachingCenterById,
  getAllStudentForTeacher,
  postSendConfirmSchedule,
};
