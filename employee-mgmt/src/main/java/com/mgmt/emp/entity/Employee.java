package com.mgmt.emp.entity;

import java.util.ArrayList;
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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employee")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
	@Id
	@Column(name = "emp_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	private String email;

	@Temporal(TemporalType.DATE)
	@Column(name = "date_of_birth")
	private Date dateOfBirth;

	private String gender;

	@Column(name = "contact_no")
	private String contactNo;

	@Column(name = "highest_qualification")
	private String highestQualification;

	@Column(name = "job_title")
	private String jobTitle;

	private String department;

	@Temporal(TemporalType.DATE)
	@Column(name = "hire_date")
	private Date hireDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "exit_date")
	private Date exitDate;

//	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//	@JoinColumn(name = "employee_id")
//	private List<AssetMaster> assets;

	@ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
	@CollectionTable(name = "emp_assets", joinColumns = @JoinColumn(name = "emp_id"))
	@Column(name = "assets")
	private List<String> taggedAssets;

//	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
//	@JoinColumn(name = "emp_id")
//	private List<Project> projects;

//	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
//	@JoinColumn(name = "emp_id")
//	private List<ModuleTask> tasks;

	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "professional_detail_id")
	private ProfessionalDetails professionalDetails;

	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "address_id")
	private Address address;

	private String userName;
	private String password;

	public List<String> getInitializedAsset() {
		if (null != taggedAssets && !taggedAssets.isEmpty()) {
			return taggedAssets;
		} else {
			return new ArrayList<String>();
		}
	}
}