/*package com.mgmt.emp.service.impl;

import java.util.Collection;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mgmt.emp.entity.User;

public class CustomUserDetailsImpl implements UserDetails {
	private static final long serialVersionUID = 1L;

	private Integer id;

	private String username;

	private String email;

	@JsonIgnore
	private String password;

	public CustomUserDetailsImpl(Integer id, String username, String email, String password) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;

	}

	public static CustomUserDetailsImpl build(User user) {

		return new CustomUserDetailsImpl(user.getId(), user.getUserName(), user.getEmail(), user.getPassword());
	}

	public Integer getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		CustomUserDetailsImpl user = (CustomUserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}
}*/