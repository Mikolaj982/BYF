package com.byf.byf.group.exception;

public class UserAlreadyInGroupException extends RuntimeException {
    public UserAlreadyInGroupException(String errorMessage) {
        super(errorMessage);
    }
}
