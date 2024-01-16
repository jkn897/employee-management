package com.mgmt.emp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AssetDto {

	private Integer assetId;

	@NotBlank(message = "Please provide asset name")
	private String assetName;

	@NotBlank(message = "Please provide manufacturer name")
	private String manufacturerName;

	private double assetPrice;

	@NotBlank(message = "Please provide asset serial no")
	private String serialNo;

}
