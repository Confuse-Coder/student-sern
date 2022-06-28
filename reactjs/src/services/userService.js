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
export {
  handleLoginApi,
  fetchAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllUsers,
};
