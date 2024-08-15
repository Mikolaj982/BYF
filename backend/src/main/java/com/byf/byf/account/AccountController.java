package com.byf.byf.account;

import com.byf.byf.account.authenticate.AccountAuthenticateRQ;
import com.byf.byf.account.authenticate.AccountAuthenticateService;
import com.byf.byf.account.create.AccountCreateRQ;
import com.byf.byf.account.create.AccountCreateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/account")
public class AccountController {

    @Autowired
    AccountCreateService accountCreateService;

    @Autowired
    AccountAuthenticateService accountAuthenticateServices;

    @PostMapping
    public ResponseEntity<Void> createAccount(@RequestBody AccountCreateRQ accountCreateRQ) {
        accountCreateService.createAccount(accountCreateRQ.username(), accountCreateRQ.email(), accountCreateRQ.password());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticateAccount(@RequestBody AccountAuthenticateRQ accountAuthenticateRQ) {
        String jwt = accountAuthenticateServices.authenticate(accountAuthenticateRQ.usernameOrEmail(), accountAuthenticateRQ.password());
        return new ResponseEntity<>(jwt, HttpStatus.OK);
    }
}
