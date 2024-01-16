package com.mgmt.emp.exception;

public class RequiredValueNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7347506531458074971L;

	public RequiredValueNotFoundException() {
		super();
	}

	public RequiredValueNotFoundException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public RequiredValueNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public RequiredValueNotFoundException(String message) {
		super(message);
	}

	public RequiredValueNotFoundException(Throwable cause) {
		super(cause);
	}

}
