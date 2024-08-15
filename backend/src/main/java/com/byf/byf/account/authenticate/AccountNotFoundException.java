package com.byf.byf.account.authenticate;

public class AccountNotFoundException extends RuntimeException {
    public AccountNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
