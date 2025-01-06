package com.byf.byf.account.authenticate.exception;

public class InvalidPasswordException extends RuntimeException {
    public InvalidPasswordException(String errorMessage) {
        super(errorMessage);
    }
}
