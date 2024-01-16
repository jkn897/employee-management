package com.mgmt.emp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mgmt.emp.constants.EmpRecdMgmtConstants;
import com.mgmt.emp.constants.UserTypes;
import com.mgmt.emp.dto.AssetDto;
import com.mgmt.emp.dto.EmployeeDto;
import com.mgmt.emp.dto.ProjectDto;
import com.mgmt.emp.entity.Employee;
import com.mgmt.emp.entity.MailData;
import com.mgmt.emp.exception.EmployeeNotFoundException;
import com.mgmt.emp.security.JwtTokenHelper;
import com.mgmt.emp.service.impl.CustomUserDetailsService;
import com.mgmt.emp.service.impl.EmployeeService;
import com.mgmt.emp.service.impl.MailService;
import com.mgmt.emp.util.Utility;

import jakarta.persistence.EntityManager;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/v1")
@CrossOrigin(origins = EmpRecdMgmtConstants.ALLOWED_ORIGIN_URL)
public class EmpMgmtController {

	@Autowired
	Utility utility;

	@Autowired
	EmployeeService empService;

	@Autowired
	MailService mailService;

	@Autowired
	JwtTokenHelper jwtTokenHelper;

	@Autowired
	CustomUserDetailsService customUserDetailsService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	EntityManager em;

	String className = this.getClass().getSimpleName();
	String methodName = EmpRecdMgmtConstants.EMPTY;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody HashMap<String, String> loginRequest) {
		System.out.println("Login");
		String userName = loginRequest.get("username");
		String password = loginRequest.get("password");
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(userName, password));
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtTokenHelper.generateToken(authentication, authentication.getAuthorities());
		HashMap<String, Object> response = new HashMap<>();
		response.put("message", "login success");
		response.put("accessToken", token);
		response.put("tokenType", "Bearer");
		response.put("user", SecurityContextHolder.getContext().getAuthentication().getPrincipal());

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping("/saveEmployee")
	public ResponseEntity<?> saveEmployee(@Valid @RequestBody EmployeeDto employeeDto) {
		methodName = "registerEmployee";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		log.info("employee request {}", employeeDto);
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(empService.registerEmployee(employeeDto), HttpStatus.OK);
	}

	@PostMapping("/updateEmployee")
	public ResponseEntity<?> updateEmployee(@Valid @RequestBody EmployeeDto employeeDto) {
		methodName = "updateEmployee";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		log.info("employee request {}", employeeDto);
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(empService.registerEmployee(employeeDto), HttpStatus.OK);
	}

	@PostMapping("/saveMasterAsset")
	public ResponseEntity<?> addMasterAsset(@Valid @RequestBody AssetDto assetDto) {
		methodName = "addMasterAsset";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		if (null != assetDto)
			log.info("save asset request {}", assetDto);
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(empService.saveMasterAsset(assetDto), HttpStatus.OK);
	}

	@PostMapping("/saveMasterProject")
	public ResponseEntity<?> addMasterProject(@Valid @RequestBody ProjectDto projectDto) {
		methodName = "addMasterProject";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		if (null != projectDto)
			log.info("save project request {}", projectDto);
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(empService.saveMasterProject(projectDto), HttpStatus.OK);
	}

	@GetMapping("/getEmployeesWithPagination")
	public ResponseEntity<?> retrieveEmployeesWithPagination(
			@RequestParam(value = "page", defaultValue = "0", required = false) int page,
			@RequestParam(value = "perPage", defaultValue = "5", required = false) int perPage) {
		methodName = "retrieveEmployees";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		log.info("pagination properties page : " + page);
		log.info("pagination properties perPage : " + perPage);
		HashMap<String, Object> response = empService.getEmpList(page, perPage);

		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/getAllAssets")
	public ResponseEntity<?> retrieveAllAssets() {
		methodName = "retrieveAllAssets";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);

		HashMap<String, Object> allAssets = empService.getAllAssets();

		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(allAssets, HttpStatus.OK);
	}

	@GetMapping("/getAllEmployees")
	public ResponseEntity<?> retrieveAllEmployees() {
		methodName = "retrieveEmployees";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);

		List<Employee> employees = empService.getAllEmployees();

		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(employees, HttpStatus.OK);
	}

	@GetMapping("/getAdminDashboardData")
	public ResponseEntity<?> getAdminDashBoardInfo(
			@RequestParam(defaultValue = EmpRecdMgmtConstants.EMPTY) String userName) {
		methodName = "getAdminDashBoardInfo";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);

		HashMap<String, Object> allAssets = empService.getAdminDashboardData(userName);

		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(allAssets, HttpStatus.OK);
	}

	@GetMapping("/getEmployeeDashboardData")
	public ResponseEntity<?> getEmpDashBoardInfo(
			@RequestParam(defaultValue = EmpRecdMgmtConstants.EMPTY) String userName) {
		methodName = "getEmpDashBoardInfo";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);

		HashMap<String, Object> empDashboardData = empService.getEmpDashboardData(userName);

		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(empDashboardData, HttpStatus.OK);
	}

	@GetMapping("/getAllProjects")
	public ResponseEntity<?> getAllProjects() {
		methodName = "getAllProjects";

		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);

		HashMap<String, Object> allMasterProjects = empService.getAllMasterProjects();

		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(allMasterProjects, HttpStatus.OK);
	}

	@PostMapping("/tagAssetToEmployee")
	public ResponseEntity<?> tagAssetToEmployee(@RequestBody Map<String, String> tagAssetData) {
		methodName = "tagAssetToEmployee";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		Map<String, Object> tagAssetResponse = new HashMap<>();
		if (null != tagAssetData && null != tagAssetData.get("empCode")) {
			log.info("tag asset request {}", tagAssetData);
			tagAssetResponse = empService.tagAssetToEmployee(tagAssetData);
		} else {
			throw new EmployeeNotFoundException(EmpRecdMgmtConstants.REQUIRED_DATA_NOT_FOUND_MSG);
		}
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(tagAssetResponse, HttpStatus.OK);
	}

	@PostMapping("/assignProjectToEmployee")
	public ResponseEntity<?> assignProjectToEmployee(@RequestBody Map<String, String> assignProjectReq) {
		methodName = "assignProjectToEmployee";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		if (null != assignProjectReq)
			log.info("assign project request {}", assignProjectReq);
//		Map<String, Object> assignProjectResponse = empService.assignProjectToEmployee(assignProjectReq);
		Map<String, Object> assignProjectResponse = empService.assignFunctionalityToEmployee(assignProjectReq);
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(assignProjectResponse, HttpStatus.OK);
	}

	@PostMapping("/updateTaskDetails")
	public ResponseEntity<?> updateTaskDetails(@RequestBody Map<String, String> updateTaskReq) {
		methodName = "updateTaskDetails";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		if (null != updateTaskReq)
			log.info("update task request {}", updateTaskReq);
//		Map<String, Object> assignProjectResponse = empService.assignProjectToEmployee(assignProjectReq);
		Map<String, Object> assignProjectResponse = empService.updateTaskDetails(updateTaskReq);
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(assignProjectResponse, HttpStatus.OK);
	}

	@PostMapping("/applyEmployeeLeave")
	public ResponseEntity<?> applyEmployeeLeave(@RequestBody Map<String, String> employeeLeavReq) {
		methodName = "applyEmployeeLeave";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		if (null != employeeLeavReq)
			log.info("employee leave request {}", employeeLeavReq);
		Map<String, Object> employeeLeaveResponse = empService.applyEmployeeLeave(employeeLeavReq);
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(employeeLeaveResponse, HttpStatus.OK);
	}

	@PostMapping("/removeTaggedAssetFromEmployee")
	public ResponseEntity<?> removeTaggedAssetFromEmployee(Map<String, String> tagAsset) {
		methodName = "removeTaggedAssetFromEmployee";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		if (null != tagAsset)
			log.info("tag asset request {}", tagAsset);
		Map<String, Object> removeTagAssetResponse = empService.tagAssetToEmployee(tagAsset);
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(removeTagAssetResponse, HttpStatus.OK);
	}

	@GetMapping("/getEmployeeById")
	public ResponseEntity<?> getEmployeeById(@RequestParam Integer empId) {
		methodName = "getEmployeeById";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		EmployeeDto employeeDto = empService.getEmployeeById(empId);

		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(employeeDto, HttpStatus.OK);
	}

	@GetMapping("/getEmployeeByUserName")
	public ResponseEntity<?> getEmployeeByUserName(@RequestParam String userName) {
		methodName = "getEmployeeByUserName";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		EmployeeDto employeeDto = empService.getEmployeeByUserName(userName);

		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(employeeDto, HttpStatus.OK);
	}

	@GetMapping("/getEmployeeByField")
	public ResponseEntity<?> getEmployeeByField(@RequestParam(defaultValue = "0") int empId,
			@RequestParam(defaultValue = "Email") String field) {
		methodName = "getEmployeeByField";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		EmployeeDto employeeDto = empService.getEmployeeById(empId);

		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(employeeDto, HttpStatus.OK);
	}

	@DeleteMapping("/removeEmployeeById")
	public ResponseEntity<?> removeEmployeeById(@RequestParam Integer empId) {
		methodName = "removeEmployeeById";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		String removeStatus = empService.removeEmployeeById(empId);
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(removeStatus, HttpStatus.OK);
	}

	@PostMapping("/createEmployeeUser")
	public ResponseEntity<?> createEmpUser(@RequestBody HashMap<String, String> request) {
		methodName = "createEmpUser";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		log.info("create employee user request {} ", request);
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(empService.createUser(request), HttpStatus.OK);
	}

	@PostMapping(value = "/uploadImage")
	public ResponseEntity<?> uploadFile(@RequestBody HashMap<String, String> emailTemplateReq) {
		methodName = "uploadFile";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		log.info("file emailTemplateReq {} ", emailTemplateReq);
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(mailService.updateBirthdayTemplateData(emailTemplateReq), HttpStatus.OK);
//		return new ResponseEntity<>(responseMap, HttpStatus.OK);
	}

	@GetMapping("/sendBirthdayMail")
	public void sendBirthdayMail() {
		methodName = "sendBirthdayMail";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		mailService.retrieveBirthDayMatchedEmpAndSendMail();
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
	}

	@GetMapping("/getCurrentTemplateData")
	public ResponseEntity<?> retrieveCurrentMailData() {
		methodName = "retrieveCurrentMailTemplateData";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return new ResponseEntity<>(mailService.retrieveCurrentTemplateData(), HttpStatus.OK);
	}
}