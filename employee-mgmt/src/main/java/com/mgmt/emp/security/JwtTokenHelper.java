package com.mgmt.emp.security;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenHelper {
	public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;
	private String secret = "jwtTokenKey";

	public String getUserNameFromToken(String token) {
		return getClaimFromToken(token, Claims::getSubject);
	}

	public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}

	public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}

	private Claims getAllClaimsFromToken(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
	}

	public Boolean isTokenExpired(String token, UserDetails userDetails) {
		final Date expirationDate = getExpirationDateFromToken(token);
		return expirationDate.before(new Date());
	}

	public String generateToken(UserDetails userDetails) {
		HashMap<String, Object> claims = new HashMap<>();
		return doGenerateToken(claims, userDetails.getUsername());
	}

	private String doGenerateToken(HashMap<String, Object> claims, String subject) {
		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 100))
				.signWith(SignatureAlgorithm.HS512, secret).compact();
	}

	public boolean validateToken(String token, UserDetails userDetails) {
		final String userName = getUserNameFromToken(token);
		return (userName.equals(userDetails.getUsername()) && isTokenExpired(token, userDetails));
	}

//	from medium the below methods added 
//	https://medium.com/@golakiyachintan24/spring-boot-jwt-authentication-with-spring-security-3-0-e9fc83d2c9cc

	public static final long JWT_EXPIRATION = 70000;
	public static final String JWT_SECERT = "pokemonsecretrandomstringwithmorethan256bits";

	public String generateToken(Authentication authentication, Collection<? extends GrantedAuthority> authorities) {
		String username = authentication.getName();
		Date currentDate = new Date();
		Date expiryDate = new Date(currentDate.getTime() + JWT_EXPIRATION);
		String userType = "EMPLOYEE";
		if(null!=authorities && !authorities.isEmpty()) {
			userType = authorities.toString();
		}

		String token = Jwts.builder().setSubject(username).setIssuedAt(currentDate).setExpiration(expiryDate)
				.signWith(SignatureAlgorithm.HS256, JWT_SECERT).claim("usertype", userType).compact();
		return token;
	}

	public String getUsernameFromJWT(String token) {
		Claims claims = Jwts.parser().setSigningKey(JWT_SECERT).parseClaimsJws(token).getBody();
		return claims.getSubject();
	}
}