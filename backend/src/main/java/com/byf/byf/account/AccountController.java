package com.byf.byf.account;

import com.byf.byf.account.create.AccountCreateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/account")
public class AccountController {

    @Autowired
    AccountCreateService accountCreateService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createAccount(@RequestBody CreateAccountRQ createAccountRQ) throws AccountValidationException {
        accountCreateService.createAccount(createAccountRQ.username(), createAccountRQ.email(), createAccountRQ.password());
    }
}
