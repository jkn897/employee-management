package com.mgmt.emp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto {

	@NotBlank(message = "Please enter address")
	private String address;

	@NotBlank(message = "Please enter pincode")
	private String pinCode;

	@NotBlank(message = "Please enter city")
	private String city;

	@NotBlank(message = "Please enter state")
	private String state;

	@NotBlank(message = "Please enter country")
	private String country;
}