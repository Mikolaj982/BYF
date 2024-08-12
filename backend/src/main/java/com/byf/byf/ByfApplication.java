package com.byf.byf;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Slf4j
public class ByfApplication {

	public static void main(String[] args) {
		SpringApplication.run(ByfApplication.class, args);
		log.info("Działam z loga");
	}

}
