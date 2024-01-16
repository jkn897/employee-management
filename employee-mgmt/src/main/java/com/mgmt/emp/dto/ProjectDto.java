package com.mgmt.emp.dto;

import java.util.List;
import java.util.Map;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDto {

	@Schema(name = "project name", required = true)
	@NotBlank(message = "Project name is required")
	private String projectName;

	@Schema(name = "client name", required = true)
	@NotBlank(message = "Client name is required")
	private String clientName;

	@Schema(name = "domain", required = true)
	@NotBlank(message = "Domain is required")
	private String domain;

//	@Schema(name = "allocation start date", required = true)
//	@Pattern(regexp = "^\\d{2}-\\d{2}-\\d{4}$", message = "Date format must be 'dd-mm-yyyy' format")
//	@NotBlank(message = "Allocation start date is required")
	private String allocStartDt;

	/*@Schema(name = "Allocation End Date", required = true)
	@Pattern(regexp = "^\\d{2}-\\d{2}-\\d{4}$", message = "Date format must be 'dd-mm-yyyy' format")
	@NotBlank(message = "allocation end date is required")*/
	private String allocEndDt;
	
	@Schema(name = "Project Modules", required = false)
	private List<Map<String,String>> projectModules;
}