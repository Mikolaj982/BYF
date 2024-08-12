package com.byf.byf.rest.request;

public record CreateAccountRQ(String username,
                              String email,
                              String password) {}