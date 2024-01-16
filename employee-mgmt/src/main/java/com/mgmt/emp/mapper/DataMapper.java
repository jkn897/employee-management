package com.mgmt.emp.mapper;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mgmt.emp.constants.EmpRecdMgmtConstants;
import com.mgmt.emp.dto.AddressDto;
import com.mgmt.emp.dto.AssetDto;
import com.mgmt.emp.dto.EmployeeDto;
import com.mgmt.emp.dto.EmployeeDto.EmployeeDtoBuilder;
import com.mgmt.emp.dto.ProfessionalDetailsDto;
import com.mgmt.emp.entity.Address;
import com.mgmt.emp.entity.Employee;
import com.mgmt.emp.entity.Employee.EmployeeBuilder;
import com.mgmt.emp.entity.Functionality;
import com.mgmt.emp.entity.ProfessionalDetails;
import com.mgmt.emp.entity.Project;
import com.mgmt.emp.entity.TasksTracker;
import com.mgmt.emp.repository.AssetMasterRepository;
import com.mgmt.emp.repository.EmployeeRepository;
import com.mgmt.emp.repository.ProjectRepository;
import com.mgmt.emp.repository.RoleRepository;
import com.mgmt.emp.repository.TrackerRepository;
import com.mgmt.emp.repository.UserRepository;
import com.mgmt.emp.util.Utility;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class DataMapper {

	@Autowired
	Utility utility;

	@Autowired
	EmployeeRepository empRepository;

	@Autowired
	AssetMasterRepository assetMasterRepository;

	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	TrackerRepository trackerRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	HashMap<String, Object> empDashboardData;

//	public List<ProjectModules> mapToProjectModulesEntity(List<Map<String, String>> projectModulesList) {
//		List<ProjectModules> projectModules = new ArrayList<>();
//		List<ModuleTask> moduleTasks = new ArrayList<>();
//		if (null != projectModulesList && !projectModulesList.isEmpty()) {
//			projectModules = projectModulesList.stream().map(moduleMap -> {
//				return ProjectModules.builder().moduleName(moduleMap.get("projectModule")).moduleTasks(moduleTasks)
//						.build();
//			}).collect(Collectors.toList());
//		}
//
//		return projectModules;
//	}

	public Employee mapToEmployeeEntity(EmployeeDto empDto) {
		EmployeeBuilder employeeBuilder = Employee.builder().firstName(empDto.getFirstName())
				.lastName(empDto.getLastName()).dateOfBirth(utility.getDate(empDto.getDateOfBirth()))
				.gender(empDto.getGender()).jobTitle(empDto.getJobTitle()).department(empDto.getDepartment())
				.email(empDto.getEmail()).hireDate(utility.getDate(empDto.getJoiningDate()))
				.highestQualification(empDto.getHighestQualification()).contactNo(empDto.getContactNo());
		if (null != empDto.getAddress()) {
			AddressDto addressDto = empDto.getAddress();
			Address address = Address.builder().address(addressDto.getAddress()).pinCode(addressDto.getPinCode())
					.city(addressDto.getCity()).state(addressDto.getState()).country(addressDto.getCountry()).build();
			employeeBuilder.address(address);
		}
		if (null != empDto.getProfessionalDetail()) {
			ProfessionalDetailsDto professionalDetailsDto = empDto.getProfessionalDetail();
			ProfessionalDetails professionaLDetails = ProfessionalDetails.builder()
					.primarySkill(professionalDetailsDto.getPrimarySkill())
					.otherSkills(professionalDetailsDto.getOtherSkills()).build();
			employeeBuilder.professionalDetails(professionaLDetails);
		}
		/*
		 * List<AssetMaster> assetsDto = empDto.getAssets().stream().map(asset -> {
		 * return
		 * AssetMaster.builder().systemType(asset.getSystemType()).serialNo(asset.
		 * getSerialNo()).build(); }).collect(Collectors.toList());
		 * 
		 * 
		 * if (!assetsDto.isEmpty()) employeeBuilder.assets(assetsDto);
		 */
		/*
		 * 
		 * List<Project> projects = empDto.getProjects().stream().map(projectDto -> {
		 * return Project.builder().projectName(projectDto.getProjectName()).clientName(
		 * projectDto.getClientName())
		 * .domain(projectDto.getDomain()).allocStartDt(utility.getDate(projectDto.
		 * getAllocStartDt()))
		 * .allocEndDt(utility.getDate(projectDto.getAllocEndDt())).build();
		 * }).collect(Collectors.toList());
		 * 
		 * if (null != projects && !projects.isEmpty())
		 * employeeBuilder.projects(projects);
		 */

		return employeeBuilder.build();
	}

	public EmployeeDto mapToEmployeeDto(Employee emp) {

		EmployeeDtoBuilder employeeDtoBuilder = EmployeeDto.builder();
		ProfessionalDetails professionalDetails = emp.getProfessionalDetails();

		employeeDtoBuilder.empId(emp.getId()).firstName(emp.getFirstName()).lastName(emp.getLastName())
				.email(emp.getEmail()).gender(emp.getGender()).jobTitle(emp.getJobTitle())
				.department(emp.getDepartment()).highestQualification(emp.getHighestQualification())
				.contactNo(emp.getContactNo()).dateOfBirth(utility.convertDateToString(emp.getDateOfBirth()));
		if (null != emp.getAddress()) {
			AddressDto addressDto = AddressDto.builder().build();
			Address address = emp.getAddress();
			BeanUtils.copyProperties(address, addressDto);
			employeeDtoBuilder.address(addressDto);
		}
		if (null != professionalDetails) {
			ProfessionalDetailsDto professionalDetailsDto = ProfessionalDetailsDto.builder()
					.primarySkill(professionalDetails.getPrimarySkill())
					.otherSkills(professionalDetails.getOtherSkills()).build();
			employeeDtoBuilder.professionalDetail(professionalDetailsDto);
		}
		List<AssetDto> assetsDto = assetMasterRepository.findBySerialNoIn(emp.getTaggedAssets()).stream()
				.map(assetMaster -> {
					return AssetDto.builder().assetId(assetMaster.getAssetId()).assetName(assetMaster.getAssetName())
							.manufacturerName(assetMaster.getManufacturerName()).serialNo(assetMaster.getSerialNo())
							.build();
				}).collect(Collectors.toList());
		/*
		 * List<ProjectDto> projects = emp.getProjects().stream().map(project -> {
		 * return
		 * ProjectDto.builder().projectName(project.getProjectName()).clientName(project
		 * .getClientName()) .build(); }).collect(Collectors.toList());
		 */
		employeeDtoBuilder.assets(assetsDto);
		return employeeDtoBuilder.build();
	}

//	public void setEmpTaskData(String userName) {
//		Optional<Employee> empOptional = empRepository.findByUserName(userName);
//		if (empOptional.isPresent()) {
//			empOptional.get().getProjects().forEach(project -> {
//				project.getProjectModules().forEach(module -> {
//					populate(module.getModuleTasks());
//				});
//			});
//
//		}
//	}

//	private void populate(List<ModuleTask> moduleTasks) {
//		empDashboardData = new HashMap<>();
//		long completedTasks = moduleTasks.stream()
//				.filter(module -> "Completed".equalsIgnoreCase(module.getTaskStatus())).count();
//		long pendingTasks = moduleTasks.stream().filter(module -> "Pending".equalsIgnoreCase(module.getTaskStatus()))
//				.count();
//		List<String> assignedTasks = moduleTasks.stream().map(module -> {
//			return module.getTaskDetails();
//		}).collect(Collectors.toList());
//		empDashboardData.put("totalTasks", moduleTasks.size());
//		empDashboardData.put("completedTasks", completedTasks);
//		empDashboardData.put("pendingTasks", pendingTasks);
//		empDashboardData.put("tasks", assignedTasks);
//	}

	public HashMap<String, Object> getPopulatedEmpData() {
		return empDashboardData;
	}

//	public List<ModuleTask> mapToTasksEntityList(List<Map<String, String>> projectModules) {
//		List<ModuleTask> moduleTasks = new ArrayList<>();
//		if (null != projectModules && !projectModules.isEmpty()) {
//			moduleTasks = projectModules.stream().map(moduleMap -> {
//				return ModuleTask.builder().taskDetails(moduleMap.get("projectModule")).createdDt(new Date()).build();
//			}).collect(Collectors.toList());
//		}
//
//		return moduleTasks;
//	}

	public List<String> mapToFunctionalityList(List<Map<String, String>> projectModules) {
		List<String> functionalities = new ArrayList<>();
		if (null != projectModules && !projectModules.isEmpty()) {
			functionalities = projectModules.stream().map(moduleMap -> {
				return moduleMap.get("projectModule");
			}).collect(Collectors.toList());
		}
		return functionalities;
	}

	public List<Functionality> mapToFunctionalities(List<Map<String, String>> projectModules) {
		List<Functionality> functionalityList = new ArrayList<>();
		if (null != projectModules && !projectModules.isEmpty()) {
			functionalityList = projectModules.stream().map(moduleMap -> {
				return Functionality.builder().functionalityName(moduleMap.get("projectModule"))
						.status(EmpRecdMgmtConstants.TASK_STATUS_TODO).build();
//				return moduleMap.get("projectModule");
			}).collect(Collectors.toList());
		}
		return functionalityList;
	}

	public void populateFieldToUpdate(Employee employee, EmployeeDto empDto) {
		employee.setFirstName(empDto.getFirstName());
		employee.setLastName(empDto.getLastName());
		employee.setDateOfBirth(utility.getDate(empDto.getDateOfBirth()));
		employee.setGender(empDto.getGender());
		employee.setJobTitle(empDto.getJobTitle());
		employee.setDepartment(empDto.getDepartment());
		employee.setEmail(empDto.getEmail());
		employee.setHireDate(utility.getDate(empDto.getJoiningDate()));
		employee.setHighestQualification(empDto.getHighestQualification());
		employee.setContactNo(empDto.getContactNo());
		if (null != empDto.getAddress()) {
			AddressDto addressDto = empDto.getAddress();
			Address address = Address.builder().address(addressDto.getAddress()).pinCode(addressDto.getPinCode())
					.city(addressDto.getCity()).state(addressDto.getState()).country(addressDto.getCountry()).build();
			employee.setAddress(address);
		}
		if (null != empDto.getProfessionalDetail()) {
			ProfessionalDetailsDto professionalDetailsDto = empDto.getProfessionalDetail();
			ProfessionalDetails professionaLDetails = ProfessionalDetails.builder()
					.primarySkill(professionalDetailsDto.getPrimarySkill())
					.otherSkills(professionalDetailsDto.getOtherSkills()).build();
			employee.setProfessionalDetails(professionaLDetails);
		}
	}

	public void saveToTracker(Project savedProject) {
		Integer projectId = savedProject.getId();
		try {
			List<Map<String, Object>> functionality = trackerRepository.getProjectFunctionality();
			if (!functionality.isEmpty()) {
				List<TasksTracker> taskTrackers = functionality.stream().map(funcMap -> {
					return TasksTracker.builder().projectId(projectId).taskName((String) funcMap.get("functionality"))
							.taskStatus("New").createdDt(new Date()).taskId(utility.getRandomNo(projectId)).build();

				}).collect(Collectors.toList());
				trackerRepository.saveAllAndFlush(taskTrackers);
			}
		} catch (Exception e) {
			log.error("exception occured saving tasks tracker");
		}
//		savedProject.getProjectFunctionality().stream().map(functionality->{
//			functionality.
//		});
	}

	public void saveFunctionalityToTracker(Project savedProject) {
		Integer projectId = savedProject.getId();
		try {
			savedProject.getFunctionalities().stream().forEach(functionality -> {
				TasksTracker tasksTracker = TasksTracker.builder().projectId(projectId)
						.taskName(functionality.getFunctionalityName()).taskStatus("New").createdDt(new Date())
						.taskId(functionality.getFunctionalityId()).build();
				trackerRepository.saveAndFlush(tasksTracker);
			});
		} catch (Exception e) {
			log.error("exception occured saving tasks tracker");
		}
//		savedProject.getProjectFunctionality().stream().map(functionality->{
//			functionality.
//		});
	}

	public void updateProjectStatus() {
		log.info("updateProjectStatus start");
		projectRepository.findAll().stream().forEach(project -> {
			boolean isAllFunctionalityCompleted = project.getFunctionalities().stream()
					.allMatch(functionality -> "DONE".equalsIgnoreCase(functionality.getStatus()));
			if (isAllFunctionalityCompleted) {
				project.setStatus("COMPLETED");
				projectRepository.save(project);
			}
		});
		log.info("updateProjectStatus end");
	}

	public List<TasksTracker> getTasksTracker(List<Project> projects) {
		List<TasksTracker> tasks = new ArrayList<>();
		for (Project project : projects) {
			Integer projectId = project.getId();
			tasks = trackerRepository.findByProjectId(projectId);
		}
//		projects.stream().forEach(project -> {
//			Integer projectId = project.getId();
//			tasks = trackerRepository.findByProjectId();
//		});
		return tasks;
	}

//	public void updateAssignedToInfo(Employee employeeEntity) {
//		Integer employeeId = employeeEntity.getId();
//		List<Project> projects = employeeEntity.getProjects();
//		for (Project project : projects) {
//			Integer projectId = project.getId();
//			try {
//				trackerRepository.findByProjectId(projectId).stream().forEach(trackers -> {
//					trackers.setAssignedTo(employeeId + EmpRecdMgmtConstants.EMPTY);
//					trackerRepository.save(trackers);
//				});
////				List<TasksTracker> tasksTracker = trackerRepository.findByProjectId(projectId);
////				for (TasksTracker tracker : tasksTracker) {
////
////				}
//			} catch (Exception e) {
//				log.error(" exception " + e.getLocalizedMessage());
//				log.error(" exception message " + e.getMessage());
//			}
//		}
//	}
}