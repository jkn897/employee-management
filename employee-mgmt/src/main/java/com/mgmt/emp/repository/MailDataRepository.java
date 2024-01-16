package com.mgmt.emp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mgmt.emp.entity.MailData;

@Repository
public interface MailDataRepository extends JpaRepository<MailData, Integer> {
	Optional<MailData> findByFileName(String fileName);

	Optional<MailData> findByIsLatest(String isLatest);
}
