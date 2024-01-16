package com.mgmt.emp.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tasks_tracker")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TasksTracker {
	@Id
	@Column(name = "tracker_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer trackerId;
	
	private Integer projectId;
	
	private Integer taskId;

	@Column(name = "task_note", length = 1000)
	private String taskNote;

	private String taskStatus;
	
	private String taskName;

	private String assignedTo;

	@Temporal(TemporalType.DATE)
	@Column(name = "created_date")
	private Date createdDt;

	@Temporal(TemporalType.DATE)
	@Column(name = "completed_date")
	private Date completedDt;
	
}