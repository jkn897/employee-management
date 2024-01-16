package com.mgmt.emp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mgmt.emp.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
	public void deleteByTaggedAssetsIn(List<String> serialNos);

	@Query(value = "delete from emp_assets ea where ea.emp_id = :empId and assets in(:assets)", nativeQuery = true)
	public void deleteTaggedAssetFromEmployee(Integer empId, List<String> assets);

	@Query(value = "select * from employee where date_format(date_of_birth, '%m-%d') = DATE_FORMAT(curdate(), '%m-%d');", nativeQuery = true)
	public List<Employee> getBirthDayMatchedEmployees();

	Optional<Employee> findByUserName(String userName);

	Optional<Employee> findByFirstName(String firstName);

	Optional<Employee> findByLastName(String lastName);

	Optional<Employee> findByEmail(String email);

}
