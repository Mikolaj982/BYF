package com.byf.byf.account.authenticate;

import com.byf.byf.common.ErrorRS;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import static com.byf.byf.constants.ErrorCodes.ACCOUNT_NOT_FOUND;

@Slf4j
@ControllerAdvice
public class AccountNotFoundExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(AccountNotFoundException.class)
    public ResponseEntity<ErrorRS> handleAccountNotFoundException(AccountNotFoundException ex) {
        String errorMessage = "Error while user authentication. Account was not found: " + ex.getMessage();
        log.info(errorMessage);
        ErrorRS errorRS = new ErrorRS(ACCOUNT_NOT_FOUND, errorMessage);
        return new ResponseEntity<>(errorRS, HttpStatus.NOT_FOUND);
    }
}
