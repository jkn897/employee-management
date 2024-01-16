package com.mgmt.emp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mgmt.emp.entity.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {
	Optional<Admin> findByUserName(String userName);
}
