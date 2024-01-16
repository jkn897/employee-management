package com.mgmt.emp.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfessionalDetailsDto {

	@NotBlank(message = "Please provide primary skill")
	private String primarySkill;

	@NotEmpty(message = "Please provide other skills")
	private List<String> otherSkills;

}