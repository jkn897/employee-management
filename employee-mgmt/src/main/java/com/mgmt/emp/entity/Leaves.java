package com.mgmt.emp.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
@Table(name = "leaves")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Leaves {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "leave_id")
	private Integer leaveId;

	@Temporal(TemporalType.DATE)
	@Column(name = "start_date")
	private Date startdDt;

	@Temporal(TemporalType.DATE)
	@Column(name = "end_date")
	private Date endDt;

	@Column(name = "leave_days")
	private Integer leaveDays;

	private String leaveDescription;

	@Column(name = "employee_id")
	private Integer employee_id;

}
