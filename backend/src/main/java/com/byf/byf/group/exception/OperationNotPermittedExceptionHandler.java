package com.byf.byf.group.exception;

import com.byf.byf.common.ErrorRS;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import static com.byf.byf.constants.ErrorCodes.OPERATION_NOT_PERMITTED;

@Slf4j
@ControllerAdvice
public class OperationNotPermittedExceptionHandler {
    @ExceptionHandler(OperationNotPermittedException.class)
    public ResponseEntity<ErrorRS> handleOperationNotPermittedException(OperationNotPermittedException ex) {
        String errorMessage = "Operation not permitted: " + ex.getMessage();
        log.info(errorMessage);
        ErrorRS errorRS = new ErrorRS(OPERATION_NOT_PERMITTED, errorMessage);
        return new ResponseEntity<>(errorRS, HttpStatus.FORBIDDEN);
    }
}
