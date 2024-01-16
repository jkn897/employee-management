import http from "../http-common";
import authHeader from "./auth-header";
const headers = { headers: authHeader };
const saveMasterProject = (projectData) => {
  return http.post("/saveMasterProject", projectData, headers);
};
const createModuleTask = (taskData) => {
  return http.post("/createModuleTask", taskData, headers);
};
const updateTaskWork = (taskUpdateData) => {
  return http.post("/updateTaskDetails", taskUpdateData, headers);
};
const updateEmployee = (employee) => {
  return http.post("/updateEmployee", employee, headers);
};
const birthdayImageUpload = (formData) => {
  return http.post("/uploadImage", formData, headers);
};
const getCurrentTemplateData = (formData) => {
  return http.post("/getCurrentTemplateData", formData, headers);
};
const getEmployeeById = (id) => {
  console.log('getEmployeeById in user service ' + id);
  return http.get(`/getEmployeeById?empId=${id}`, headers);
};

const getAdminDashboardData = (userName) => {
  return http.get(`/getAdminDashboardData?userName=${userName}`, headers);
};

const getEmployeeDashboardData = (userName) => {
  return http.get(`/getEmployeeDashboardData?userName=${userName}`, headers);
};
const getEmployeeByUserName = (userName) => {
  return http.get(`/getEmployeeByUserName?userName=${userName}`, headers);
};
const getAllProjects = (data) => {
  return http.get("/getAllProjects", data, headers);
};

const getAllAssets = (data) => {
  return http.get("/getAllAssets", data, headers);
};

const update = (id, data) => {
  return http.put(`/users/${id}`, data);
};

const removeEmployeeById = (id) => {
  console.log('id : ' + id);
  return http.delete(`/removeEmployeeById?empId=${id}`, headers);
};

const getEmployeesWithPagination = (params) => {
  return http.get("/getAllEmployeesWithPagination", { params }, headers);
};

const getAllEmployees = (params) => {
  return http.get("/getAllEmployees", { params }, headers);
};

const register = (data) => {
  return http.post("/saveEmployee", data);
};

const saveMasterAsset = (data) => {
  return http.post("/saveMasterAsset", data, headers);
};

const applyEmployeeLeave = (data) => {
  return http.post("/applyEmployeeLeave", data, headers);
};

const tagAssetToEmp = (data) => {
  return http.post("/tagAssetToEmployee", data, headers);
};
const tagProjectToEmployee = (data) => {
  return http.post("/assignProjectToEmployee", data, headers);
};

const UserService = {
  getEmployeesWithPagination,
  getAllEmployees,
  getEmployeeById,
  getEmployeeByUserName,
  getCurrentTemplateData,
  update,
  register,
  saveMasterAsset,
  updateEmployee,
  updateTaskWork,
  tagAssetToEmp,
  tagProjectToEmployee,
  getAllAssets,
  getAllProjects,
  getAdminDashboardData,
  getEmployeeDashboardData,
  removeEmployeeById,
  createModuleTask,
  saveMasterProject,
  birthdayImageUpload,
  applyEmployeeLeave
};

export default UserService;