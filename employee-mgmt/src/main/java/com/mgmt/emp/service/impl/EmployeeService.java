package com.mgmt.emp.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mgmt.emp.constants.EmpRecdMgmtConstants;
import com.mgmt.emp.constants.UserTypes;
import com.mgmt.emp.dto.AssetDto;
import com.mgmt.emp.dto.EmployeeDto;
import com.mgmt.emp.dto.ProjectDto;
import com.mgmt.emp.entity.AssetMaster;
import com.mgmt.emp.entity.Employee;
import com.mgmt.emp.entity.Functionality;
import com.mgmt.emp.entity.Leaves;
import com.mgmt.emp.entity.Project;
import com.mgmt.emp.entity.Role;
import com.mgmt.emp.entity.TasksTracker;
import com.mgmt.emp.entity.TasksTracker.TasksTrackerBuilder;
import com.mgmt.emp.entity.User;
import com.mgmt.emp.exception.EmployeeNotFoundException;
import com.mgmt.emp.exception.RequiredValueNotFoundException;
import com.mgmt.emp.mapper.DataMapper;
import com.mgmt.emp.repository.AssetMasterRepository;
import com.mgmt.emp.repository.EmployeeRepository;
import com.mgmt.emp.repository.FunctionalityRepository;
import com.mgmt.emp.repository.LeavesRepository;
import com.mgmt.emp.repository.MailDataRepository;
import com.mgmt.emp.repository.ProjectRepository;
import com.mgmt.emp.repository.RoleRepository;
import com.mgmt.emp.repository.TrackerRepository;
import com.mgmt.emp.repository.UserRepository;
import com.mgmt.emp.util.Utility;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EmployeeService {

	@Autowired
	EmployeeRepository empRepository;

	@Autowired
	AssetMasterRepository assetMasterRepository;

	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	FunctionalityRepository functionalityRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	LeavesRepository leavesRepository;

	@Autowired
	TrackerRepository trackerRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	MailDataRepository mailDataRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	DataMapper dataMapper;

	@Autowired
	Utility utility;

	String className = this.getClass().getSimpleName();
	String methodName = EmpRecdMgmtConstants.EMPTY;

	public Map<String, Object> registerEmployee(EmployeeDto employeeDto) {
		methodName = "registerEmployee";
		HashMap<String, Object> responseMap = new HashMap<>();
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		try {

			String userName = employeeDto.getUserName();
			if ((null != userName && userName.length() > 0) && empRepository.findByUserName(userName).isPresent()) {
				Employee employee = empRepository.findByUserName(userName).get();
				dataMapper.populateFieldToUpdate(employee, employeeDto);
				Employee savedEmp = empRepository.save(employee);
				if (null != savedEmp) {
					responseMap.put("Employee", dataMapper.mapToEmployeeDto(savedEmp));
					responseMap.put("msg", EmpRecdMgmtConstants.empRecordUpdateSuccessMsg);
					return responseMap;
				}
			}
			User savedUser = utility.createEmpUser(employeeDto);
			Employee empEntity = dataMapper.mapToEmployeeEntity(employeeDto);
			empEntity.setId(savedUser.getId());
			empEntity.setUserName(savedUser.getUserName());
			empEntity.setPassword(savedUser.getPassword());
			Employee savedEntity = empRepository.save(empEntity);
			if (null != savedEntity) {
				responseMap.put("Employee", dataMapper.mapToEmployeeDto(savedEntity));
				responseMap.put("msg", EmpRecdMgmtConstants.empRecordSavedSuccessMsg);
				return responseMap;
			}
		} catch (Exception e) {
			responseMap.put("error", EmpRecdMgmtConstants.empRecordSaveFailedMsg);
			log.error(e.getLocalizedMessage() + EmpRecdMgmtConstants.SPACE + e);
		}
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return responseMap;
	}

//	@Cacheable(value = "allEmployee")
	public HashMap<String, Object> getEmpList(int page, int size) {
		methodName = "getEmpList";

		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		HashMap<String, Object> responseMap = new HashMap<>();
		List<Employee> empList = new ArrayList<>();
		try {
			Pageable pagination = PageRequest.of(page, size);
			Page<Employee> employeePage = empRepository.findAll(pagination);
			empList = employeePage.getContent();
			responseMap.put("employees", empList);
			responseMap.put("totalRows", empRepository.count());
//			commonService.generateUserNameAndRandomPwd();
		} catch (Exception e) {
			log.error(e.getLocalizedMessage() + "\t" + e);
			responseMap.put("totalRows", HttpStatus.INTERNAL_SERVER_ERROR);
			responseMap.put("employees", empList);
			responseMap.put("totalRows", 0);
		}
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return responseMap;
	}

	@CachePut(value = "allEmployee")
	public List<Employee> getAllEmployees() {
		methodName = "getAllEmployees";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		List<Employee> empList = new ArrayList<>();
		try {
			empList = empRepository.findAll();
		} catch (Exception e) {
			log.error(e.getLocalizedMessage() + "\t" + e);
		}
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return empList;
	}

	public EmployeeDto getEmployeeById(Integer id) {
		methodName = "getEmployeeById";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		EmployeeDto employeeDto = EmployeeDto.builder().build();
		Optional<Employee> optionalEmp = empRepository.findById(id);
		if (optionalEmp.isPresent()) {
			Employee employee = optionalEmp.get();
			employeeDto = dataMapper.mapToEmployeeDto(employee);
		} else
			throw new EmployeeNotFoundException(EmpRecdMgmtConstants.EMPLOYEE_NOT_FOUND_MSG);
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return employeeDto;
	}

	public EmployeeDto getEmployeeByField(Integer id, String field) {
		methodName = "getEmployeeByField";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		EmployeeDto employeeDto = EmployeeDto.builder().build();
		Optional<Employee> optionalEmp = null;
		if ("Email".equals(field)) {
			optionalEmp = empRepository.findByEmail(field);
		} else if ("FirstName".equals(field)) {
			optionalEmp = empRepository.findByFirstName(field);
		} else if ("LastName".equals(field)) {
			optionalEmp = empRepository.findByLastName(field);
		}
		if (null != optionalEmp && optionalEmp.isPresent()) {
			Employee employee = optionalEmp.get();
			employeeDto = dataMapper.mapToEmployeeDto(employee);
		} else
			throw new EmployeeNotFoundException(EmpRecdMgmtConstants.EMPLOYEE_NOT_FOUND_MSG);
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return employeeDto;
	}

	public Map<String, Object> saveMasterAsset(AssetDto assetDto) {
		methodName = "saveMasterAsset";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		HashMap<String, Object> responseMap = new HashMap<>();
		AssetMaster assetMaster = AssetMaster.builder().build();
		BeanUtils.copyProperties(assetDto, assetMaster);
		AssetMaster savedAssetMaster = assetMasterRepository.saveAndFlush(assetMaster);
		if (null != savedAssetMaster && null != savedAssetMaster.getAssetId()) {
			assetDto.setAssetId(assetMaster.getAssetId());
			responseMap.put("assetMaster", assetDto);
		}
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return responseMap;
	}

	public Map<String, Object> saveMasterProject(ProjectDto projectDto) {
		methodName = "saveMasterProject";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		HashMap<String, Object> responseMap = new HashMap<>();
		Project project = Project.builder().build();
		BeanUtils.copyProperties(projectDto, project);
//		project.setProjectModules(dataMapper.mapToProjectModulesEntity(projectDto.getProjectModules()));
//		project.setModuleTasks(dataMapper.mapToTasksEntityList(projectDto.getProjectModules()));
//		project.setProjectFunctionality(dataMapper.mapToFunctionalityList(projectDto.getProjectModules()));
		project.setFunctionalities(dataMapper.mapToFunctionalities(projectDto.getProjectModules()));
		Project savedProject = projectRepository.saveAndFlush(project);
		if (null != savedProject && null != savedProject.getId()) {
			responseMap.put("projectMaster", savedProject);
//			dataMapper.saveToTracker(savedProject);
		}
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return responseMap;
	}

	public HashMap<String, Object> getAllAssets() {
		methodName = "getAllAssets";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		HashMap<String, Object> responseMap = new HashMap<>();
		List<AssetMaster> assetsMater = new ArrayList<>();
		try {
			assetsMater = assetMasterRepository.findAll();
			responseMap.put("assetsMaster", assetsMater);

		} catch (Exception e) {
			log.error(e.getLocalizedMessage() + "\t" + e);
			responseMap.put("assetsMaster", assetsMater);
			responseMap.put("error", e.getLocalizedMessage());
		}
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return responseMap;
	}

	public HashMap<String, Object> getAllMasterProjects() {
		methodName = "getAllMasterProjects";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		HashMap<String, Object> responseMap = new HashMap<>();
		try {
			List<Project> projects = projectRepository.findAll();
			responseMap.put("projectsMaster", projects);

		} catch (Exception e) {
			log.error(e.getLocalizedMessage() + "\t" + e);
			responseMap.put("error", e.getLocalizedMessage());
		}
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return responseMap;
	}

	public Map<String, Object> tagAssetToEmployee(Map<String, String> tagAssetReq) {
		methodName = "tagAssetToEmployee";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		HashMap<String, Object> responseMap = new HashMap<>();

		String empId = tagAssetReq.get("empCode");
		if (null != empId) {
			String assetSerialNo = (String) tagAssetReq.get("assetSerialNo");
			Optional<Employee> employeeOptional = empRepository.findById(Integer.parseInt(empId));
			if (employeeOptional.isPresent()) {
				Employee employeeEntity = employeeOptional.get();
				List<String> asset = employeeEntity.getInitializedAsset();
				asset.add(assetSerialNo);
				employeeEntity.setTaggedAssets(asset);
				Employee taggedAssetResponse = empRepository.saveAndFlush(employeeEntity);
				responseMap.put(assetSerialNo, taggedAssetResponse);
			} else {
				throw new EmployeeNotFoundException(EmpRecdMgmtConstants.EMPLOYEE_NOT_FOUND_MSG);
			}
		}

		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return responseMap;
	}

	public Map<String, Object> assignProjectToEmployee(Map<String, String> assignProjectReq) {
		methodName = "tagAssetToEmployee";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		HashMap<String, Object> responseMap = new HashMap<>();

		Integer empId = Integer.valueOf(assignProjectReq.get("empCode"));
		Integer projectId = Integer.valueOf(assignProjectReq.get("projectId"));
		if (null != empId) {
			Optional<Employee> employeeOptional = empRepository.findById(empId);
			if (employeeOptional.isPresent()) {
				Employee employeeEntity = employeeOptional.get();
				Project project = projectRepository.findById(projectId).get();
//				employeeEntity.getProjects().add(project);
//				employeeEntity.setProjects(Arrays.asList(project));
				Employee updatedEmployee = empRepository.saveAndFlush(employeeEntity);
//				dataMapper.updateAssignedToInfo(employeeEntity);
//				responseMap.put("assignedProjects", updatedEmployee.getProjects());
			} else {
				throw new EmployeeNotFoundException(EmpRecdMgmtConstants.EMPLOYEE_NOT_FOUND_MSG);
			}
		}

		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return responseMap;
	}

	public Map<String, Object> assignFunctionalityToEmployee(Map<String, String> assignFunctionalityReq) {
		methodName = "assignFunctionalityToEmployee";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		HashMap<String, Object> responseMap = new HashMap<>();

		Integer empId = Integer.valueOf(assignFunctionalityReq.get("employeeId"));
		Integer projectId = Integer.valueOf(assignFunctionalityReq.get("projectId"));
		Integer functionalityId = Integer.valueOf(assignFunctionalityReq.get("functionalityId"));
		if (null != empId && null != projectId && null != functionalityId) {
			Optional<Functionality> functionalityOptional = functionalityRepository.findById(functionalityId);
			if (functionalityOptional.isPresent()) {
				Functionality functionality = functionalityOptional.get();
				functionality.setAssignedTo(empId);
				functionality.setStatus(EmpRecdMgmtConstants.TASK_STATUS_TODO);
				Functionality savedFunctionality = functionalityRepository.saveAndFlush(functionality);
//				dataMapper.updateAssignedToInfo(employeeEntity);
				responseMap.put("assignedFunctionality", savedFunctionality);
			}
		}

		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return responseMap;
	}

	public Map<String, Object> removeTaggedAssetFromEmployee(Map<String, Object> tagAssetReq) {
		methodName = "tagAssetToEmployee";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		HashMap<String, Object> responseMap = new HashMap<>();
		Integer empId = (Integer) tagAssetReq.get("");
		Object assetSerialNo = tagAssetReq.get("");
		Optional<Employee> employeeOptional = empRepository.findById(6);
		if (employeeOptional.isPresent()) {
			Employee employeeEntity = employeeOptional.get();
			List<String> assetToRemove = new ArrayList<>();
//			assetToRemove.add("LTP-HP-18624379");
			empRepository.deleteTaggedAssetFromEmployee(empId, assetToRemove);
		} else {
			throw new EmployeeNotFoundException(EmpRecdMgmtConstants.EMPLOYEE_NOT_FOUND_MSG);
		}

		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return responseMap;
	}

	public String removeEmployeeById(Integer empId) {
		methodName = "tagAssetToEmployee";
		String removeStatus = EmpRecdMgmtConstants.EMPTY;
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);

		Optional<Employee> employeeOptional = empRepository.findById(empId);
		if (employeeOptional.isPresent()) {
			empRepository.deleteById(empId);
			removeStatus = EmpRecdMgmtConstants.EMPLOYEE_REMOVED_MSG;
		} else {
			throw new EmployeeNotFoundException(EmpRecdMgmtConstants.EMPLOYEE_NOT_FOUND_MSG);
		}

		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return removeStatus;
	}

//	public Object createModuleTask(HashMap<String, String> request) {
//		String moduleTask = request.get("moduleTask");
//		HashMap<String, Object> responseMap = new HashMap<>();
//		Integer projectId = Integer.valueOf(request.get("projectId"));
//		Integer moduleId = Integer.valueOf(request.get("moduleId"));
//		Optional<ProjectModules> modulesOptional = projectModulesRepository.findById(moduleId);
//		if (modulesOptional.isPresent()) {
//			ProjectModules projectModules = modulesOptional.get();
//			ModuleTask moduleTaskEntity = ModuleTask.builder().createdDt(new Date()).taskDetails(moduleTask).build();
//			projectModules.setModuleTasks(Arrays.asList(moduleTaskEntity));
//			ProjectModules savedProjectModul = projectModulesRepository.saveAndFlush(projectModules);
//			log.info("saved project module with task {} ", savedProjectModul.getModuleTasks());
//			responseMap.put("moduleTasks", savedProjectModul.getModuleTasks());
//			responseMap.put("message", "Tasks Saved Successfully");
//		} else {
//			responseMap.put("message", "Project module doesn't exist");
//		}
//
//		return responseMap;
//	}

	public Object createUser(HashMap<String, String> request) {
		methodName = "createUser";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		String userName = (null != request.get("userName") && request.get("userName").length() > 0)
				? request.get("userName")
				: request.get("email");
		String password = (null != request.get("password") && request.get("password").length() > 0)
				? request.get("password")
				: utility.generatePassword();

		User user = User.builder().userName(userName).email(request.get("email")).firstName(request.get("firstName"))
				.lastName(request.get("lastName")).passwordWithoutEnc(password).build();
		user.setPassword(passwordEncoder.encode(user.getPasswordWithoutEnc()));
		Role employeeRole = roleRepository.findByRoleType(UserTypes.EMPLOYEE.name());
		HashSet<Role> roles = new HashSet<>();
		roles.add(employeeRole);
		user.setRoles(roles);

		User savedUser = userRepository.saveAndFlush(user);

		Employee employee = Employee.builder().id(savedUser.getId()).firstName(savedUser.getFirstName())
				.lastName(savedUser.getLastName()).email(savedUser.getEmail()).userName(savedUser.getUserName())
				.password(savedUser.getPassword()).build();
		Employee savedEmployee = empRepository.saveAndFlush(employee);

		log.info("saved employee record {}", savedEmployee);
		return savedEmployee;
	}

	public void test() {
		try {

		} catch (Exception e) {
			log.error(e.getMessage());
			log.error(e.getLocalizedMessage());

		}
	}

	public HashMap<String, Object> getAdminDashboardData(String userName) {
		methodName = "getAdminDashboardData";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		HashMap<String, Object> responseMap = new HashMap<>();
		Optional<Employee> empData = empRepository.findByUserName(userName);
		if (empData.isPresent()) {
			responseMap.put("totalProjects", projectRepository.findAll().size());
			responseMap.put("totalEmployees", empRepository.findAll().size());
			responseMap.put("allProjects", projectRepository.findAll());
//			responseMap.put("tasks", dataMapper.getTasksTracker(empData.get().getProjects()));
		}
		HashMap<String, Object> populatedEmpData = dataMapper.getPopulatedEmpData();
		log.info("populate data {}", populatedEmpData);
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return responseMap;
	}

	public HashMap<String, Object> getEmpDashboardData(String userName) {
		methodName = "getEmpDashboardData";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		HashMap<String, Object> responseMap = new HashMap<>();
		Optional<Employee> empData = empRepository.findByUserName(userName);
		List<String> statusList = Arrays.asList(EmpRecdMgmtConstants.TASK_STATUS_TODO,
				EmpRecdMgmtConstants.TASK_STATUS_INPROGRESS, EmpRecdMgmtConstants.TASK_STATUS_BLOCKED);

		if (empData.isPresent()) {
//			List<Functionality> assignedFunctionalities = functionalityRepository
//					.findByAssignedToAndStatusIn(empData.get().getId(), statusList);

			List<Functionality> assignedFunctionalities = functionalityRepository
					.findByAssignedTo(empData.get().getId());

			responseMap.put("functionalities", assignedFunctionalities);
			responseMap.put("employeeId", empData.get().getId());
//			responseMap.put("projects", empData.get().getProjects());
//			responseMap.put("tasks", dataMapper.getTasksTracker(empData.get().getProjects()));
		}
		HashMap<String, Object> populatedEmpData = dataMapper.getPopulatedEmpData();
		log.info("populate data {}", populatedEmpData);
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return responseMap;
	}

	public EmployeeDto getEmployeeByUserName(String userName) {
		methodName = "getEmployeeByUserName";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		EmployeeDto employeeDto = EmployeeDto.builder().build();
		if (null != userName && userName.length() > 0) {
			Optional<Employee> optionalEmp = empRepository.findByUserName(userName);
			if (optionalEmp.isPresent()) {
				Employee employee = optionalEmp.get();
				employeeDto = dataMapper.mapToEmployeeDto(employee);
			} else
				throw new EmployeeNotFoundException(EmpRecdMgmtConstants.REQUIRED_DATA_NOT_FOUND_MSG);
		} else {
			throw new RequiredValueNotFoundException(EmpRecdMgmtConstants.REQUIRED_DATA_NOT_FOUND_MSG + "[userName]");
		}

		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return employeeDto;
	}

	public Map<String, Object> applyEmployeeLeave(Map<String, String> employeeLeavReq) {
		methodName = "applyEmployeeLeave";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		HashMap<String, Object> responseMap = new HashMap<>();
		String userName = employeeLeavReq.get("userName");
		Optional<Employee> employeeOptional = empRepository.findByUserName(userName);
		if (employeeOptional.isPresent()) {
			Employee employee = employeeOptional.get();
			Date startDate = utility.getDate(employeeLeavReq.get("startDate"));
			Date endDate = utility.getDate(employeeLeavReq.get("endDate"));

			String leaveDescription = employeeLeavReq.get("leaveDescription");
			Leaves leaves = Leaves.builder().startdDt(startDate).endDt(endDate).leaveDescription(leaveDescription)
					.employee_id(employee.getId()).build();
			Leaves savedLeave = leavesRepository.save(leaves);
			if (savedLeave.getLeaveId() != null) {
				responseMap.put("savedLeave", savedLeave);
			}
		}
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return responseMap;
	}

	public Map<String, Object> updateTaskDetails(Map<String, String> updateTaskReq) {
		methodName = "updateTaskDetails";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		HashMap<String, Object> responseMap = new HashMap<>();
		Integer empId = Integer.valueOf(updateTaskReq.get("employeeId"));
		Integer taskId = Integer.valueOf(updateTaskReq.get("taskId"));
		Integer projectId = Integer.valueOf(updateTaskReq.get("projectId"));
		String taskStatus = updateTaskReq.get("taskStatus");
		String functionalityStatus = updateTaskReq.get("functionalityStatus");
		String taskNote = updateTaskReq.get("taskNote");
		String taskName = updateTaskReq.get("taskName");
//		functionalityRepository.findby
		TasksTrackerBuilder tasksBuilder = TasksTracker.builder();
		if (EmpRecdMgmtConstants.TASK_STATUS_INPROGRESS.equalsIgnoreCase(taskStatus)) {
			tasksBuilder.assignedTo(empId.toString()).projectId(projectId).taskId(taskId).taskName(taskName)
					.taskNote(taskNote).taskStatus(EmpRecdMgmtConstants.TASK_STATUS_INPROGRESS);
			trackerRepository.saveAndFlush(tasksBuilder.build());
			if (EmpRecdMgmtConstants.TASK_STATUS_TODO.equalsIgnoreCase(functionalityStatus)) {
				functionalityRepository.updateStatusByProjectIdAndAssignedToAndFunctionalityId(projectId, empId, taskId,
						EmpRecdMgmtConstants.TASK_STATUS_INPROGRESS);
			}

		} else if (EmpRecdMgmtConstants.TASK_STATUS_BLOCKED.equalsIgnoreCase(taskStatus)) {
			tasksBuilder.assignedTo(empId.toString()).projectId(projectId).taskId(taskId).taskName(taskName)
					.taskNote(taskNote).taskStatus(taskStatus);

		} else if (EmpRecdMgmtConstants.TASK_STATUS_DONE.equalsIgnoreCase(taskStatus)) {
			tasksBuilder.assignedTo(empId.toString()).projectId(projectId).taskId(taskId).taskName(taskName)
					.taskNote(taskNote).taskStatus(taskStatus);
			trackerRepository.saveAndFlush(tasksBuilder.build());
			if (EmpRecdMgmtConstants.TASK_STATUS_INPROGRESS.equalsIgnoreCase(functionalityStatus)) {
				functionalityRepository.updateStatusByProjectIdAndAssignedToAndFunctionalityId(projectId, empId, taskId,
						EmpRecdMgmtConstants.TASK_STATUS_DONE);
			}
		}

		dataMapper.updateProjectStatus();

		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return responseMap;
	}

}