package com.mgmt.emp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@Builder
@Table(name = "admin")
public class Admin {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "admin_id", nullable = false)
	private Integer adminId;

	@Column(name = "user_name", nullable = false, unique = true, length = 45)
	private String userName;

	@Column(nullable = false, length = 64)
	private String password;
}
