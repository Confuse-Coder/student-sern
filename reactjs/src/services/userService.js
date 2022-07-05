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

const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctorService = (data) => {
  return axios.post('api/save-infor-doctors', data);
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
  getAllDoctors,
  saveDetailDoctorService,
};
