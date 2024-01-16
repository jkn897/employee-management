package com.mgmt.emp.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.mgmt.emp.constants.UserTypes;
import com.mgmt.emp.entity.Role;
import com.mgmt.emp.entity.User;
import com.mgmt.emp.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

//	@Autowired
//	private AdminRepository adminRepository;

	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		log.info("loadUserByUsername {}", userName);

		Collection<GrantedAuthority> authorities = new ArrayList<>();
		SimpleGrantedAuthority grantedAuthority = null;
		User user = userRepository.findByUserName(userName)
				.orElseThrow(() -> new UsernameNotFoundException("Username " + userName + "not found"));
		Set<Role> roles = (!user.getRoles().isEmpty()) ? user.getRoles() : new HashSet<Role>();
		List<String> rolesStr = new ArrayList<>();
		roles.forEach(role -> {
			rolesStr.add(role.getRoleType());
		});

		if (rolesStr.contains(UserTypes.ADMIN.name())) {
			grantedAuthority = new SimpleGrantedAuthority(UserTypes.ADMIN.toString());
			authorities.add(grantedAuthority);
		} else if (rolesStr.contains(UserTypes.EMPLOYEE.name())) {
			grantedAuthority = new SimpleGrantedAuthority(UserTypes.EMPLOYEE.toString());
			authorities.add(grantedAuthority);
		}

		return new org.springframework.security.core.userdetails.User(userName, user.getPassword(), authorities);
	}

}