package com.byf.byf.group.exception;

public class OperationNotPermittedException extends RuntimeException {
    public OperationNotPermittedException(String errorMessage) {
        super(errorMessage);
    }
}
