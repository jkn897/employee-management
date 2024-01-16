package com.mgmt.emp;

import java.util.ArrayList;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.CacheManager;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

//@EnableCaching
@EnableScheduling
@SpringBootApplication()
public class EmpRecordMgmtApplication {

	@PersistenceContext
	private EntityManager entityManager;

	public static void main(String[] args) {
		SpringApplication.run(EmpRecordMgmtApplication.class, args);
	}

	@Bean
	CacheManager cacheManager() {
		ConcurrentMapCacheManager cacheManager = new ConcurrentMapCacheManager();
		ArrayList<String> cacheNames = new ArrayList<>();
		cacheNames.add("employeeManagement");
		cacheManager.setCacheNames(cacheNames);
		return cacheManager;
	}

//	@Bean
//	public CommonsMultipartResolver commonsMultipartResolver() {
//		final CommonsMultipartResolver commonsMultipartResolver = new CommonsMultipartResolver();
//		commonsMultipartResolver.setMaxUploadSize(-1);
//		return commonsMultipartResolver;
//	}
//
//	@Bean
//	public FilterRegistrationBean multipartFilterRegistrationBean() {
//		final MultipartFilter multipartFilter = new MultipartFilter();
//		final FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(multipartFilter);
//		filterRegistrationBean.addInitParameter("multipartResolverBeanName", "commonsMultipartResolver");
//		return filterRegistrationBean;
//	}
}
