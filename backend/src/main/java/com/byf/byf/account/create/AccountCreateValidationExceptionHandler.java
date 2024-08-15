package com.byf.byf.account.create;

import com.byf.byf.common.ErrorRS;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import static com.byf.byf.constants.ErrorCodes.CREATE_ACCOUNT_VALIDATION_ERROR;

@Slf4j
@ControllerAdvice
public class AccountCreateValidationExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(AccountCreateValidationException.class)
    public ResponseEntity<ErrorRS> handleAccountValidationException(AccountCreateValidationException ex) {
        String errorMessage = "Error during account validation: " + ex.getMessage();
        log.info(errorMessage);
        ErrorRS errorRS = new ErrorRS(CREATE_ACCOUNT_VALIDATION_ERROR, errorMessage);
        return new ResponseEntity<>(errorRS, HttpStatus.BAD_REQUEST);
    }
}
