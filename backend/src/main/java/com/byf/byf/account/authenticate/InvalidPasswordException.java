package com.byf.byf.account.authenticate;

public class InvalidPasswordException extends RuntimeException {
    public InvalidPasswordException(String errorMessage) {
        super(errorMessage);
    }
}
