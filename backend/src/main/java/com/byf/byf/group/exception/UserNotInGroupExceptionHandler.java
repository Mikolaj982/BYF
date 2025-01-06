package com.byf.byf.group.exception;

import com.byf.byf.common.ErrorRS;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import static com.byf.byf.constants.ErrorCodes.USER_NOT_IN_GROUP;

@Slf4j
@ControllerAdvice
public class UserNotInGroupExceptionHandler {
    @ExceptionHandler(UserAlreadyInGroupException.class)
    public ResponseEntity<ErrorRS> handleUserNotInGroupException(UserNotInGroupException ex) {
        String errorMessage = "User is not present in the given group: " + ex.getMessage();
        log.info(errorMessage);
        ErrorRS errorRS = new ErrorRS(USER_NOT_IN_GROUP, errorMessage);
        return new ResponseEntity<>(errorRS, HttpStatus.NOT_FOUND);
    }
}
