package com.byf.byf.account.create;

import com.byf.byf.account.AccountEntity;
import com.byf.byf.account.AccountRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AccountCreateService {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    AccountCreateValidator accountCreateValidator;

    public AccountEntity createAccount(String username, String email, String password) {
        accountCreateValidator.validateInput(username, email, password);

        String encodedPassword = new BCryptPasswordEncoder().encode(password);

        AccountEntity account = new AccountEntity(username, email, encodedPassword);
        return accountRepository.save(account);
    }
}
