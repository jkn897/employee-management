package com.mgmt.emp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mgmt.emp.entity.Leaves;

@Repository
public interface LeavesRepository extends JpaRepository<Leaves, Integer> {
}
