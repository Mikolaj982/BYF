package com.byf.byf.account.authenticate;

import com.byf.byf.common.ErrorRS;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import static com.byf.byf.constants.ErrorCodes.INVALID_PASSWORD;

@Slf4j
@ControllerAdvice
public class InvalidPasswordExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<ErrorRS> handleInvalidPasswordException(InvalidPasswordException ex) {
        String errorMessage = "Error while user authentication. Invalid password: " + ex.getMessage();
        log.info(errorMessage);
        ErrorRS errorRS = new ErrorRS(INVALID_PASSWORD, errorMessage);
        return new ResponseEntity<>(errorRS, HttpStatus.UNAUTHORIZED);
    }
}
