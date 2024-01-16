package com.mgmt.emp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.mgmt.emp.constants.UserTypes;

import static org.springframework.security.config.Customizer.withDefaults;
import com.mgmt.emp.service.impl.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Autowired
	JwtAuthenticationFilter jwtAuthenticationFilter;

	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthEntryPoint;

	@SuppressWarnings("deprecation")
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable()).exceptionHandling(withDefaults())
				.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeRequests(requests -> requests.requestMatchers("/api/v1/login/**").permitAll()
						.requestMatchers("/api/v1/saveEmployee").permitAll().requestMatchers("/api/v1/updateEmployee")
						.permitAll().requestMatchers("/api/v1/createEmployeeUser").permitAll()
						.requestMatchers("/api/v1/createModuleTask").permitAll()
						.requestMatchers("/api/v1/getEmployeeById/**").permitAll()
						.requestMatchers("/api/v1/sendBirthdayMail/**").permitAll()
						.requestMatchers("/api/v1/getAllEmployees/**").permitAll()
						.requestMatchers("/api/v1/saveMasterAsset/**").permitAll()
						.requestMatchers("/api/v1/uploadImage/**").permitAll()
						.requestMatchers("/api/v1/updateTaskDetails/**").permitAll()
						.requestMatchers("/api/v1/applyEmployeeLeave/**").permitAll()
						.requestMatchers("/api/v1/getCurrentTemplateData/**").permitAll()
						.requestMatchers("/api/v1/getAllAssets/**").permitAll()
						.requestMatchers("/api/v1/saveMasterProject/**").permitAll()
						.requestMatchers("/api/v1/getEmployeeById/**").permitAll()
						.requestMatchers("/api/v1/getEmployeeByUserName/**").permitAll()
						.requestMatchers("/api/v1/getAllProjects/**").permitAll()
						.requestMatchers("/api/v1/getAdminDashboardData/**").permitAll()
						.requestMatchers("/api/v1/getEmployeeDashboardData/**").permitAll()
						.requestMatchers("/api/v1/removeEmployeeById/**").permitAll()
						.requestMatchers("/api/v1/tagAssetToEmployee/**").permitAll()
						.requestMatchers("/api/v1/assignProjectToEmployee/**").permitAll()
						.requestMatchers("/api/v1/removeTaggedAssetFromEmployee/**").permitAll()
						.requestMatchers("/api/v1/getEmployeesWithPagination/**").permitAll()
//				.requestMatchers("/api/v1/admin/**").hasAuthority(UserTypes.ADMIN.toString())
						.anyRequest().authenticated())
				.httpBasic(withDefaults());

		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}