package com.byf.byf.account.authenticate;

import com.byf.byf.account.AccountEntity;
import com.byf.byf.account.AccountRepository;
import com.byf.byf.jwt.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountAuthenticateService {

    private static final String USERNAME_OR_EMAIL_NOT_FOUND = "Username/Email does not fit to any existing account. Provided: ";
    private static final String INVALID_PASSWORD = "Invalid password for user: ";

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    public String authenticate(String usernameOrEmail, String password) {
        AccountEntity accountEntity = getAccountFromDb(usernameOrEmail);

        if (passwordMatchesHash(password, accountEntity.getPassword())) {
            return jwtTokenUtil.generateToken(accountEntity);
        } else {
            throw new InvalidPasswordException(INVALID_PASSWORD + usernameOrEmail);
        }
    }

    private AccountEntity getAccountFromDb(String usernameOrEmail) {
        AccountEntity accountEntity;
        if (usernameOrEmail.contains("@")) {
            accountEntity = accountRepository.findByEmail(usernameOrEmail).orElseThrow(() -> new AccountNotFoundException(USERNAME_OR_EMAIL_NOT_FOUND + usernameOrEmail));
        } else {
            accountEntity = accountRepository.findByUsername(usernameOrEmail).orElseThrow( () -> new AccountNotFoundException(USERNAME_OR_EMAIL_NOT_FOUND + usernameOrEmail));
        }
        return accountEntity;
    }

    private boolean passwordMatchesHash(String plaintextPassword, String hash) {
        return new BCryptPasswordEncoder().matches(plaintextPassword, hash);
    }
}
