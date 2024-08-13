package com.byf.byf.account;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@ControllerAdvice
public class AccountValidationExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(AccountValidationException.class)
    public ResponseEntity<String> handleAccountValidationException(AccountValidationException ex) {
        String errorMessage = "Error during account validation: " + ex.getMessage();
        log.info(errorMessage);
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }
}
