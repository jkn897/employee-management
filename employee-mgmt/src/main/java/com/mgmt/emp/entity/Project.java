package com.mgmt.emp.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "projects")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Project {
	@Id
	@Column(name = "project_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "project_name")
	private String projectName;

	@Column(name = "client_name")
	private String clientName;

	private String domain;

	private String status;

//	@ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
//	@CollectionTable(name = "project_functionality", joinColumns = @JoinColumn(name = "project_id"))
//	@Column(name = "functionality")
//	private List<String> projectFunctionality;

	@Temporal(TemporalType.DATE)
	@Column(name = "creation_date")
	private Date createdDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "completion_date")
	private Date completedDate;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
	@JoinColumn(name = "project_id")
	private List<Functionality> functionalities;

}