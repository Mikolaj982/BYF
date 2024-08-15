package com.byf.byf.account.create;

public class AccountCreateValidationException extends RuntimeException {
    public AccountCreateValidationException(String errorMessage) {
        super(errorMessage);
    }
}
