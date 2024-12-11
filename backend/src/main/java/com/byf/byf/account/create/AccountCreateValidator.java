package com.byf.byf.account.create;

import com.byf.byf.account.AccountRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountCreateValidator {

    @Autowired
    AccountRepository accountRepository;

    public void validateInput(String username, String email, String password) {
        validateUsername(username);
        validateUsernameIsUnique(username);

        validateEmail(email);
        validateEmailIsUnique(email);

        validatePassword(password);
    }

    private void validateUsername(String username) {
        String allowedCharactersRegex = "[a-zA-Z0-9_.]*";
        if (username == null || username.length() < 4) {
            throw new AccountCreateValidationException("Invalid username: Username should be at least 5 characters long");
        }
        if (!username.matches(allowedCharactersRegex)) {
            throw new AccountCreateValidationException("Invalid username: Provided username contains forbidden characters. Username needs to be build from these characters a-z A-Z 0-9 _ . ");
        }

    }

    private void validateUsernameIsUnique(String username) {
        if (accountRepository.countByUsername(username) > 0) {
            throw new AccountCreateValidationException("Username taken: Provided username is already taken");
        }
    }

    private void validateEmail(String email) {
        if (!isValidEmail(email)) {
            throw new AccountCreateValidationException("Invalid email: Email must be in correct format");
        }
    }

    private boolean isValidEmail(String email) {
        String emailRegexPattern = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return StringUtils.isNotBlank(email) && email.matches(emailRegexPattern);
    }

    private void validateEmailIsUnique(String email) {
        if (accountRepository.countByEmail(email) > 0) {
            throw new AccountCreateValidationException("Email taken: Provided email is already taken");
        }
    }

    private void validatePassword(String password) {
        if (StringUtils.containsWhitespace(password) || password.length() < 6) {
            throw new AccountCreateValidationException("Invalid password: Password should be at least 6 characters long and shouldn't contain any whitespaces");
        }
    }

}
