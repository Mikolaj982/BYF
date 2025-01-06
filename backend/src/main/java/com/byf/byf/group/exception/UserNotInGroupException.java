package com.byf.byf.group.exception;

public class UserNotInGroupException extends RuntimeException{

    public UserNotInGroupException(String errorMessage) {
        super(errorMessage);
    }
}
