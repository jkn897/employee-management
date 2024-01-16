//package com.mgmt.emp.entity;
//
//import java.util.List;
//
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
//import jakarta.persistence.ForeignKey;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.OneToMany;
//import jakarta.persistence.Table;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Table(name = "project_modules")
//@Data
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//public class ProjectModules {
//	@Id
//	@Column(name = "module_id")
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Integer moduleId;
//
//	@Column(name = "module_name")
//	private String moduleName;
//
//	private String moduleStatus;
//
//	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
//	@JoinColumn(name = "task_id")
//	private List<ModuleTask> moduleTasks;
//
//}