package com.mgmt.emp.entity;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "professional_details")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfessionalDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "professional_detail_id")
	private Integer id;

	@Column(name = "primary_skill")
	private String primarySkill;

	@Column(name = "other_skills")
	@ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
	@CollectionTable(name = "other_skills", joinColumns = @JoinColumn(name = "professional_detail_id"))
	private List<String> otherSkills;
}
