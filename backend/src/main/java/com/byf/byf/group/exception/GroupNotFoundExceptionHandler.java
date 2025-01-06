package com.byf.byf.group.exception;

import com.byf.byf.common.ErrorRS;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import static com.byf.byf.constants.ErrorCodes.GROUP_NOT_FOUND;

@Slf4j
@ControllerAdvice
public class GroupNotFoundExceptionHandler {
    @ExceptionHandler(GroupNotFoundException.class)
    public ResponseEntity<ErrorRS> handleGroupNotFoundException(GroupNotFoundException ex) {
        String errorMessage = "Error while searching for group: " + ex.getMessage();
        log.info(errorMessage);
        ErrorRS errorRS = new ErrorRS(GROUP_NOT_FOUND, errorMessage);
        return new ResponseEntity<>(errorRS, HttpStatus.NOT_FOUND);
    }
}
