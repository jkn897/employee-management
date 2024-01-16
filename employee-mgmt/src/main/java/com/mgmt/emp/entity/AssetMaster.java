package com.mgmt.emp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "assets_master")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssetMaster {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "asset_id")
	private Integer assetId;

	@Column(name = "asset_name")
	private String assetName;

	@Column(name = "manufacturer_name")
	private String manufacturerName;

	@Column(name = "serial_no", unique = true)
	private String serialNo;

	@Column(name = "asset_price")
	private double assetPrice;

}
