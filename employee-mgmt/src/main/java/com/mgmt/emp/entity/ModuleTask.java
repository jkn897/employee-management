//package com.mgmt.emp.entity;
//
//import java.util.Date;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//import jakarta.persistence.Temporal;
//import jakarta.persistence.TemporalType;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Table(name = "module_tasks")
//@Data
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//public class ModuleTask {
//	@Id
//	@Column(name = "task_id")
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Integer taskId;
//
//	@Column(name = "task_details", length = 1000)
//	private String taskDetails;
//
//	private String taskStatus;
//
//	private String assignedTo;
//
//	@Temporal(TemporalType.DATE)
//	@Column(name = "created_date")
//	private Date createdDt;
//
//	@Temporal(TemporalType.DATE)
//	@Column(name = "completed_date")
//	private Date completedDt;
//
//	@Temporal(TemporalType.DATE)
//	@Column(name = "assigned_date")
//	private Date assignedDt;
//}