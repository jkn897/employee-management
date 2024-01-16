package com.mgmt.emp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mgmt.emp.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
	Role findByRoleType(String roleType);
}
