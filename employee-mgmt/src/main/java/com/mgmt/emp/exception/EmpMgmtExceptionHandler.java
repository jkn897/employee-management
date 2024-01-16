package com.mgmt.emp.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class EmpMgmtExceptionHandler {
	@ExceptionHandler(value = MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleException(MethodArgumentNotValidException manve) {
		log.info("handle exception");
		Map<String, String> errors = new HashMap<>();
		manve.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
			log.info("errors : " + errors);
		});
		return new ResponseEntity<Map<String, String>>(errors, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(value = Exception.class)
	public ResponseEntity<?> globalException(Exception exception) {
		log.info("globalException");
		Map<String, Object> errors = new HashMap<>();
		errors.put("error message", exception.getMessage());
		errors.put("localized message", exception.getLocalizedMessage());
		errors.put("cause", exception.getCause());
		return new ResponseEntity<Map<String, Object>>(errors, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(value = EmployeeNotFoundException.class)
	public ResponseEntity<?> employeeNotFoundException(EmployeeNotFoundException empNotFound) {
		log.info("employeeNotFoundException");
		Map<String, Object> errors = new HashMap<>();
		errors.put("error message", empNotFound.getMessage());
		errors.put("localized message", empNotFound.getLocalizedMessage());
//		errors.put("cause", empNotFound.getCause());
		return new ResponseEntity<Map<String, Object>>(errors, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(value = BadCredentialsException.class)
	public ResponseEntity<?> invalidCredentialsException(BadCredentialsException badCredentialsException) {
		log.info("employeeNotFoundException");
		Map<String, Object> errors = new HashMap<>();
		errors.put("error message", badCredentialsException.getMessage());
		errors.put("localized message", badCredentialsException.getLocalizedMessage());
		errors.put("cause", badCredentialsException.getCause());
		return new ResponseEntity<Map<String, Object>>(errors, HttpStatus.UNAUTHORIZED);
	}

	@ExceptionHandler(value = JwtException.class)
	public ResponseEntity<?> invalidOrEmptyJwtException(JwtException jwtException) {
		log.info("employeeNotFoundException");
		Map<String, Object> errors = new HashMap<>();
		errors.put("token error", jwtException.getMessage());
		errors.put("message", jwtException.getLocalizedMessage());
		errors.put("cause", jwtException.getCause());
		return new ResponseEntity<Map<String, Object>>(errors, HttpStatus.UNAUTHORIZED);
	}
}
