//package com.mgmt.emp.repository;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import com.mgmt.emp.entity.ModuleTask;
//
//@Repository
//public interface TaskRepository extends JpaRepository<ModuleTask, Integer> {
////	List<AssetMaster> findBySerialNoIn(List<String> serialNo);
//
//	@Modifying
//	@Query(value = "update moduletask u set emp_id =:empId where u.task_id = :taskId", nativeQuery = true)
//	public void mapEmpIdInTask(@Param("taskId") Integer taskId, @Param("empId") Integer userId);
//
//	@Modifying
//	@Query(value = "update moduletask u set project_id =:projectId where u.task_id = :taskId", nativeQuery = true)
//	public void mapProjectIdInTask(@Param("taskId") Integer taskId, @Param("projectId") Integer projectId);
//}
