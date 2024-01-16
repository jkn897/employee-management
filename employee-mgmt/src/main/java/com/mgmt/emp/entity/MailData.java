package com.mgmt.emp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "mail_data")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MailData {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column
	private String fileName;

	@Column
	private String fileType;

	@Column(name = "encoded_image", columnDefinition = "LONGTEXT")
	private String base64Image;

	private String styleRules;

	private String mailBodyText;

	@Column(name = "old_new")
	private String isLatest;

//	@Column(name = "note", columnDefinition = "LONGTEXT")
//	private String note;// blog

}
