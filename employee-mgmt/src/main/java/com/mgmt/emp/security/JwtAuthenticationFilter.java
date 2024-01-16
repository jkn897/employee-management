package com.mgmt.emp.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.mgmt.emp.service.impl.CustomUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	CustomUserDetailsService customUserDetailsService;

	@Autowired
	JwtTokenHelper jwtTokenHelper;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		log.info("JwtAuthenticationFilter doFilterInternal");
		log.info("Servlet Path " + request.getServletPath());
		log.info("Request URI " + request.getRequestURI());

		String incomingUrl = request.getRequestURI();
		String loginRegex = "(.*)/login(.*)";

		String header = request.getHeader("Authorization");
		String userName = null;
		String token = null;
		if (!incomingUrl.matches(loginRegex) && null != header && header.startsWith("Bearer")) {
			token = header.substring(7);
			log.info("token : " + token);
			try {
				userName = this.jwtTokenHelper.getUserNameFromToken(token);
				log.info("userName : " + userName);
				if (null != userName && SecurityContextHolder.getContext().getAuthentication() == null) {
					UserDetails userDetails = this.customUserDetailsService.loadUserByUsername(userName);
					if (this.jwtTokenHelper.validateToken(token, userDetails)) {
						UsernamePasswordAuthenticationToken userNamepasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
								userDetails, null, userDetails.getAuthorities());
						userNamepasswordAuthenticationToken
								.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
						SecurityContextHolder.getContext().setAuthentication(userNamepasswordAuthenticationToken);
					} else {
						log.info("Invalid Jwt Token");
					}
				} else {
					log.info("Username is null OR SecurityContextHolder is null");
				}
			} catch (IllegalArgumentException e) {
				log.error(e.getMessage() + "\t" + e.getLocalizedMessage());
			}
		} else {
			log.info("request uri " + incomingUrl);
//			throw new JwtException("Token not found or invalid token");
		}

		filterChain.doFilter(request, response);
	}

}