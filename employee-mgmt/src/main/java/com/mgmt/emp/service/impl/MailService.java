package com.mgmt.emp.service.impl;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mgmt.emp.constants.EmpRecdMgmtConstants;
import com.mgmt.emp.entity.Employee;
import com.mgmt.emp.entity.MailData;
import com.mgmt.emp.repository.EmployeeRepository;
import com.mgmt.emp.repository.MailDataRepository;

import jakarta.activation.DataHandler;
import jakarta.mail.BodyPart;
import jakarta.mail.MessagingException;
import jakarta.mail.Multipart;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import jakarta.mail.util.ByteArrayDataSource;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class MailService {
	@Autowired
	JavaMailSender mailSender;

	@Autowired
	EmployeeRepository empRepository;

	@Autowired
	ImageService imageService;

	@Autowired
	MailDataRepository mailDataRepository;

	@Value("${test.mail.to}")
	String mailTo;

	@Value("${test.image.path}")
	String imageFilePath;

	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

	String className = this.getClass().getSimpleName();
	String methodName = EmpRecdMgmtConstants.EMPTY;

	@Value("${spring.mail.username}")
	String mailFrom;

	@Scheduled(cron = "0 0 3 * * *")
	public void retrieveBirthDayMatchedEmpAndSendMail() {
		methodName = "retrieveBirthDayMatchedEmpAndSendMail";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		List<Employee> birthDayMatchedEmployees = empRepository.getBirthDayMatchedEmployees();
		birthDayMatchedEmployees.stream().forEach(emp -> {
			sendMail(emp);
		});
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
	}

	public void sendMail(Employee emp) {
		log.info("sending mail start...");
		try {
			String base64Image = EmpRecdMgmtConstants.EMPTY;
			String fileType = EmpRecdMgmtConstants.EMPTY;
			String mailText = EmpRecdMgmtConstants.EMPTY;
			String styleRules = EmpRecdMgmtConstants.EMPTY;
			MailData mailData;
			if (mailDataRepository.findByIsLatest("LATEST").isPresent()) {
				mailData = mailDataRepository.findByIsLatest("LATEST").get();
				base64Image = mailData.getBase64Image();
				
				fileType = mailData.getFileType();
				mailText = mailData.getMailBodyText();
				styleRules = mailData.getStyleRules();

			} else if (mailDataRepository.findByIsLatest("OLD").isPresent()) {
				mailData = mailDataRepository.findByIsLatest("OLD").get();
				base64Image = mailData.getBase64Image();
				fileType = mailData.getFileType();
				mailText = mailData.getMailBodyText();
				styleRules = mailData.getStyleRules();
			}
//			base64ImgStr = base64ImgStr.split("base64,")[1];
			byte[] rawImage = Base64.getDecoder().decode(base64Image);
			MimeMessage mimeMessage = null;
			mimeMessage = mailSender.createMimeMessage();
			mimeMessage.setSubject(EmpRecdMgmtConstants.BIRTHDAY_SUB);
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
			helper.setFrom(mailFrom);
			helper.setTo(emp.getEmail());
			String contentId = generateContentId("CID");
			String mailContent = getMailContent(emp.getEmail(), contentId, mailText);
			helper.setText(mailContent, true);

//			ClassPathResource classPathResource = new ClassPathResource("static/images/pexels-george-dolgikh.jpg");
//			helper.addInline(contentId, classPathResource);

			ByteArrayDataSource imageDataSource = new ByteArrayDataSource(rawImage, fileType);
			helper.addInline(contentId, imageDataSource);

			mailSender.send(mimeMessage);
		} catch (Exception ex) {
			log.error("error occured while sending mai : " + ex.getLocalizedMessage() + "\t" + ex);
		}

		log.info("sending mail end...");
	}

	String getMailContent(String name, String contentId, String mailBodyText) {
		String mailContent = EmpRecdMgmtConstants.EMPTY;
		String styleRules = "\"font-size:28px;font-family: Blackadder ITC;color:green\"";
		String birthdayWish = "Wish you a Very Happy Birthday";
//		String additionalWishMsg = "We hope you have a wonderful day and cherish your time with family, friends and dear ones.";
		mailContent = "<div style=" + styleRules + ">Hi " + name + ",</br></br>" + birthdayWish + "</br>" + mailBodyText
				+ "</br>" + "<img src=\"cid:" + contentId + "\" /></br></br>" + "Thanks & Regards,</br>Teams</div>";
		return mailContent;
	}

	String generateContentId(String prefix) {
		return String.format("%s-%s", prefix, UUID.randomUUID());
	}

	public Map<String, Object> saveImage(MultipartFile file) {
		methodName = "saveImage";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		HashMap<String, Object> responseMap = new HashMap<>();

		try {
//			
			mailDataRepository.save(MailData.builder().fileName(file.getOriginalFilename())
					.fileType(file.getContentType()).isLatest("OLD").build());
			imageService.saveImageToStorage(imageFilePath, file);
		} catch (IOException e) {
			e.printStackTrace();
		}

		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return responseMap;
	}

	private void mailTest1(String base64ImgStr) {
		MimeMessage mimeMessage = null;
		try {
			byte[] rawImage = Base64.getDecoder().decode(base64ImgStr);
			mimeMessage = mailSender.createMimeMessage();
			mimeMessage.setSubject(EmpRecdMgmtConstants.BIRTHDAY_SUB);
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
			helper.setFrom(mailFrom);
			helper.setTo(mailTo);
			String contentId = generateContentId("CID");
			String htmlText = "<div style=\"font-family:Lucida Console,Courier New,monospace\">Hi Jitendra Kumar Naik,</br>Wish you a Very Happy Birthday</br>"
					+ "We hope you have a wonderful day and cherish your time with family, friends and dear ones.</br></br>"
					+ "<img src=\"cid:" + contentId + "\" /></br></br>" + "Thanks & Regards,</br>Teams</div>";
			helper.setText(htmlText, true);

//			ClassPathResource classPathResource = new ClassPathResource("static/images/pexels-george-dolgikh.jpg");
//			helper.addInline(contentId, classPathResource);

			ByteArrayDataSource imageDataSource = new ByteArrayDataSource(rawImage, "image/png");
			helper.addInline(contentId, imageDataSource);

			mailSender.send(mimeMessage);
		} catch (Exception e) {
			log.error(e.getMessage());
		}
	}

	public HashMap<String, Object> updateBirthdayTemplateData(HashMap<String, String> emailTemplateReq) {
		methodName = "updateBirthdayTemplateData";
		log.info(EmpRecdMgmtConstants.START_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		HashMap<String, Object> responseMap = new HashMap<>();
		String base64ImgStr = emailTemplateReq.get("base64Img");
		String fileName = emailTemplateReq.get("fileName");
		String fileType = emailTemplateReq.get("fileType");
		String mailMsg = emailTemplateReq.get("mailMessage");

//		log.info("base64ImgStr {}", base64ImgStr);
		log.info("fileName {}", fileName);

		mailDataRepository.findAll().stream().forEach(mdata -> {
			if (mdata.getIsLatest().equalsIgnoreCase("LATEST")) {
				mdata.setIsLatest("OLD");
				mailDataRepository.saveAndFlush(mdata);
			}
		});

		MailData mailData = MailData.builder().fileName(fileName).fileType(fileType)
//				.content(base64ImgStr)
				.base64Image(base64ImgStr)
//				.note(base64ImgStr)
				.mailBodyText(mailMsg).isLatest("LATEST").build();
		mailDataRepository.saveAndFlush(mailData);

//		emailTemplateReq.get("");
		log.info(EmpRecdMgmtConstants.END_OF + methodName + EmpRecdMgmtConstants.METHOD + className);
		return responseMap;
	}

	public MailData retrieveCurrentTemplateData() {
		Optional<MailData> mailDataOptional = mailDataRepository.findByIsLatest("LATEST");
		if (mailDataOptional.isPresent()) {
			return mailDataOptional.get();
		} else {
			return MailData.builder().build();
		}
	}

}