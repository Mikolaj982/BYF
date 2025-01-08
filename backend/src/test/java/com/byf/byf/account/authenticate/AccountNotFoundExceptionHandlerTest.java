package com.byf.byf.account.authenticate;

import com.byf.byf.TestBase;
import com.byf.byf.account.authenticate.exception.AccountNotFoundException;
import com.byf.byf.account.authenticate.exception.AccountNotFoundExceptionHandler;
import com.byf.byf.common.ErrorRS;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static com.byf.byf.constants.ErrorCodes.ACCOUNT_NOT_FOUND;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AccountNotFoundExceptionHandlerTest extends TestBase {

    @Autowired
    AccountNotFoundExceptionHandler accountNotFoundExceptionHandler;

    @Test
    void shouldHandleInvalidPasswordException() {
        //given
        String message = "Test exception message";
        AccountNotFoundException accountNotFoundException = new AccountNotFoundException(message);

        //then
        ResponseEntity<ErrorRS> response = accountNotFoundExceptionHandler.handleAccountNotFoundException(accountNotFoundException);
        assert response.getBody() != null;
        assertEquals(ACCOUNT_NOT_FOUND, response.getBody().errorCode());
        assertEquals("Error while user authentication. Account was not found: " + message, response.getBody().message());
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
