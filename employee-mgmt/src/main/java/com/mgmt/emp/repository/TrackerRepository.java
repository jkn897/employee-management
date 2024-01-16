package com.mgmt.emp.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mgmt.emp.entity.TasksTracker;

@Repository
public interface TrackerRepository extends JpaRepository<TasksTracker, Integer> {
	@Query(value = "select * from project_functionality;", nativeQuery = true)
	public List<Map<String, Object>> getProjectFunctionality();

	public List<TasksTracker> findByProjectId(Integer projectId);

//	public List<Map<String, Object>> tagEmployeeToTasks();

	List<TasksTracker> findByProjectIdAndTaskId(Integer projectId, Integer taskId);
}
