package com.byf.byf.account.authenticate.exception;

public class AccountNotFoundException extends RuntimeException {
    public AccountNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
