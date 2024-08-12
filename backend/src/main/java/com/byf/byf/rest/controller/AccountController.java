package com.byf.byf.rest.controller;

import com.byf.byf.rest.request.CreateAccountRQ;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/account")
public class AccountController {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createAccount(@RequestBody CreateAccountRQ createAccountRQ) {
    }
}
