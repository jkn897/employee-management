package com.mgmt.emp.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Random;

import org.passay.CharacterData;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.mgmt.emp.constants.EmpRecdMgmtConstants;
import com.mgmt.emp.constants.UserTypes;
import com.mgmt.emp.dto.EmployeeDto;
import com.mgmt.emp.entity.Role;
import com.mgmt.emp.entity.User;
import com.mgmt.emp.repository.EmployeeRepository;
import com.mgmt.emp.repository.RoleRepository;
import com.mgmt.emp.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class Utility {

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	UserRepository userRepository;

	@Autowired
	EmployeeRepository empRepository;

	@Autowired
	RoleRepository roleRepository;

	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

	String className = this.getClass().getSimpleName();
	String methodName = EmpRecdMgmtConstants.EMPTY;

	public Date getDate(String strDate) {
		Date formattedDate = null;
		try {
			if (null != strDate && strDate.length() != 0)
				formattedDate = dateFormat.parse(strDate);
		} catch (ParseException e) {
			log.error("Date Parse Exception : " + e.getLocalizedMessage());
			e.printStackTrace();
		}
		return formattedDate;
	}

	public String convertDateToString(Date date) {
		String strDate = EmpRecdMgmtConstants.SPACE;
		try {
			strDate = dateFormat.format(date);
		} catch (Exception e) {
			log.error("Date Conversion Exception : " + e.getLocalizedMessage());
			e.printStackTrace();
		}
		return strDate;
	}

	public String generatePassword() {
		PasswordGenerator gen = new PasswordGenerator();
		org.passay.CharacterData lowerCaseChars = EnglishCharacterData.LowerCase;
		CharacterRule lowerCaseRule = new CharacterRule(lowerCaseChars);
		lowerCaseRule.setNumberOfCharacters(2);

		org.passay.CharacterData upperCaseChars = EnglishCharacterData.UpperCase;
		CharacterRule upperCaseRule = new CharacterRule(upperCaseChars);
		upperCaseRule.setNumberOfCharacters(2);

		org.passay.CharacterData digitChars = EnglishCharacterData.Digit;
		CharacterRule digitRule = new CharacterRule(digitChars);
		digitRule.setNumberOfCharacters(2);

		CharacterData specialChars = new CharacterData() {

			@Override
			public String getErrorCode() {
				return "500";
			}

			@Override
			public String getCharacters() {
				return "!@#$%^&*()_+";
			}
		};
		CharacterRule splCharRule = new CharacterRule(specialChars);
		splCharRule.setNumberOfCharacters(2);

		String password = gen.generatePassword(10, splCharRule, lowerCaseRule, upperCaseRule, digitRule);
//		String encodedPwd = passwordEncoder.encode(password);
		return password;
	}

	public Integer getRandomNo(Integer input) {
		Random rand = new Random();

		// Generate random integers in range 0 to 999
		int rand_int1 = rand.nextInt(input);
		return rand_int1;
	}

	public User createEmpUser(EmployeeDto request) {
		String userName = (null != request.getUserName() && request.getUserName().length() > 0) ? request.getUserName()
				: request.getEmail();
		String password = (null != request.getPassword() && request.getPassword().length() > 0) ? request.getPassword()
				: generatePassword();

		User user = User.builder().userName(userName).email(request.getEmail()).firstName(request.getFirstName())
				.lastName(request.getLastName()).passwordWithoutEnc(password).build();
		user.setPassword(passwordEncoder.encode(user.getPasswordWithoutEnc()));
		Role employeeRole = roleRepository.findByRoleType(UserTypes.EMPLOYEE.name());
		HashSet<Role> roles = new HashSet<>();
		roles.add(employeeRole);
		user.setRoles(roles);

		User savedUser = userRepository.saveAndFlush(user);
		log.info("saved user {}", savedUser);
		return savedUser;
	}
}
