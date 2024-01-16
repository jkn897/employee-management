package com.mgmt.emp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "project_functionality")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Functionality {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "functionality_id")
	private Integer functionalityId;

	@Column(name = "functionality_name")
	private String functionalityName;

	@Column(name = "assigned_to")
	private Integer assignedTo;

	@Column(name = "status")
	private String status;

	private Integer project_id;
}