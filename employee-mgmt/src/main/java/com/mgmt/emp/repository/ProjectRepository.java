package com.mgmt.emp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mgmt.emp.entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
//	List<AssetMaster> findBySerialNoIn(List<String> serialNo);
}
