package com.mgmt.emp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mgmt.emp.entity.Functionality;

import jakarta.transaction.Transactional;

@Repository
public interface FunctionalityRepository extends JpaRepository<Functionality, Integer> {

	List<Functionality> findByAssignedToAndStatusIn(Integer assignedTo, List<String> status);

	List<Functionality> findByAssignedTo(Integer assignedTo);

//	List<Functionality> findAllByStatusIn(List<String> status);

	@Transactional
	@Modifying
	@Query(value = "update project_functionality f set status=:status where assigned_to=:assignedTo "
			+ "and functionality_id=:functionalityId and project_id=:projectId", nativeQuery = true)
	public void updateStatusByProjectIdAndAssignedToAndFunctionalityId(@Param("projectId") Integer projectId,
			@Param("assignedTo") Integer assignedTo, @Param("functionalityId") Integer functionalityId,
			@Param("status") String status);
}
