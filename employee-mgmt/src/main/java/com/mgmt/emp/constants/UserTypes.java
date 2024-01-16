package com.mgmt.emp.constants;

public enum UserTypes {
	ADMIN("ADMIN"), EMPLOYEE("EMPLOYEE");

	private final String type;

	UserTypes(String string) {
		type = string;
	}

	@Override
	public String toString() {
		return type;
	}
}