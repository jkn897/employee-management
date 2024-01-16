package com.mgmt.emp.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
@JsonInclude(Include.NON_NULL)
public class EmployeeDto {

	private Integer empId;

	private String userName;

	@Schema(name = "First Name", required = true)
	@NotBlank(message = "Please enter first name")
	private String firstName;

	@Schema(name = "Last Name", required = true)
	@NotBlank(message = "Please enter last name")
	private String lastName;

	@Schema(name = "Email Id", required = true)
	@NotBlank(message = "Please enter email")
	@Email
	private String email;

	@Schema(name = "Date Of Birth", required = true)
	@NotBlank(message = "Please enter date of birth")
	@Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "Date format must be 'dd-mm-yyyy' format")
	private String dateOfBirth;

	@Schema(name = "Gender", required = true)
	@NotBlank(message = "Please enter gender")
	private String gender;

	private String contactNo;

	@Schema(name = "Job Title", required = true)
	@NotBlank(message = "Please enter job title")
	private String jobTitle;

	@Schema(name = "Department", required = true)
//	@NotBlank(message = "Please enter department")
	private String department;

	@Schema(name = "Joining Date", required = true)
//	@Pattern(regexp = "^\\d{2}-\\d{2}-\\d{4}$", message = "Date format must be 'dd-mm-yyyy' format")
//	@NotBlank(message = "Please enter joining date")
	private String joiningDate;

//	@NotBlank(message = "Please enter password")
	private String password;

	@Schema(name = "Qualification", required = true)
	@NotBlank(message = "Highest qualification is required")
	private String highestQualification;

	@Schema(name = "Address Details", required = true)
	@Valid
	@NotNull(message = "Address detail is required")
	private AddressDto address;

	@Schema(name = "Assets", required = true)
//	@Valid
//	@NotNull(message = "Asset is required.")
	private List<AssetDto> assets;

	@Schema(name = "Professional Details", required = true)
	@Valid
	@NotNull(message = "Professional details are required")
	private ProfessionalDetailsDto professionalDetail;

	@Schema(name = "Project Details", required = true)
//	@Valid
//	@NotNull(message = "Project details are required")
	private List<ProjectDto> projects;

}