package com.byf.byf.group.exception;

import com.byf.byf.common.ErrorRS;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import static com.byf.byf.constants.ErrorCodes.USER_IN_GROUP;

@Slf4j
@ControllerAdvice
public class UserAlreadyInGroupExceptionHandler {
    @ExceptionHandler(UserAlreadyInGroupException.class)
    public ResponseEntity<ErrorRS> handleUserAlreadyInGroupException(UserAlreadyInGroupException ex) {
        String errorMessage = "User already in group: " + ex.getMessage();
        log.info(errorMessage);
        ErrorRS errorRS = new ErrorRS(USER_IN_GROUP, errorMessage);
        return new ResponseEntity<>(errorRS, HttpStatus.CONFLICT);
    }
}
