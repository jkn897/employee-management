package com.mgmt.emp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mgmt.emp.entity.AssetMaster;


@Repository
public interface AssetMasterRepository extends JpaRepository<AssetMaster, Integer> {
	List<AssetMaster> findBySerialNoIn(List<String> serialNo);
}
