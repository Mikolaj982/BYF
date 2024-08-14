package com.byf.byf.account;

public class AccountValidationException extends Exception {
    public AccountValidationException(String errorMessage) {
        super(errorMessage);
    }
}
