package com.byf.byf.account.create;

import com.byf.byf.account.AccountRepository;
import com.byf.byf.account.AccountValidationException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountCreateValidator {

    @Autowired
    AccountRepository accountRepository;

    public void validateInput(String username, String email, String password) throws AccountValidationException {
        validateUsername(username);
        validateUsernameIsUnique(username);

        validateEmail(email);
        validateEmailIsUnique(email);

        validatePassword(password);
    }

    private void validateUsername(String username) throws AccountValidationException {
        if (username != null && username.length() < 4) {
            throw new AccountValidationException("Invalid username: Username should be at least 5 characters long");
        }
    }

    private void validateUsernameIsUnique(String username) throws AccountValidationException {
        if (accountRepository.countByUsername(username) > 0) {
            throw new AccountValidationException("Username taken: Provided username is already taken");
        }
    }

    private void validateEmail(String email) throws AccountValidationException {
        if (!isValidEmail(email)) {
            throw new AccountValidationException("Invalid email: Email must be in correct format");
        }
    }

    private boolean isValidEmail(String email) {
        String emailRegexPattern = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return StringUtils.isNotBlank(email) && email.matches(emailRegexPattern);
    }

    private void validateEmailIsUnique(String email) throws AccountValidationException{
        if (accountRepository.countByEmail(email) > 0) {
            throw new AccountValidationException("Email taken: Provided email is already taken");
        }
    }

    private void validatePassword(String password) throws AccountValidationException {
        if (StringUtils.containsWhitespace(password) || password.length() < 6) {
            throw new AccountValidationException("Invalid password: Password should be at least 6 characters long and shouldn't contain any whitespaces");
        }
    }

}
