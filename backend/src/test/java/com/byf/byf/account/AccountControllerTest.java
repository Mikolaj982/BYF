package com.byf.byf.account;

import com.byf.byf.TestApplication;
import com.byf.byf.account.authenticate.AccountAuthenticateRQ;
import com.byf.byf.account.authenticate.AccountAuthenticateService;
import com.byf.byf.account.create.AccountCreateRQ;
import com.byf.byf.account.create.AccountCreateService;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest(classes = TestApplication.class)
public class AccountControllerTest {

    @MockBean
    AccountCreateService accountCreateService;

    @MockBean
    AccountAuthenticateService accountAuthenticateService;

    @Autowired
    AccountController accountController;

    @Test
    void createShouldReturn201() {
        //given
        String username = "test";
        String email = "test@test.com";
        String password = "password";
        AccountCreateRQ accountCreateRQ = new AccountCreateRQ(username, email, password);

        //when
        when(accountCreateService.createAccount(username, email, password)).thenReturn(new AccountEntity(username, email, password));

        //then
        ResponseEntity<Void> response = accountController.createAccount(accountCreateRQ);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        verify(accountCreateService, times(1)).createAccount(username, email, password);
    }

    @Test
    void authenticateShouldReturnJwt() {
        //given
        String username = "test";
        String password = "password";
        AccountAuthenticateRQ accountAuthenticateRQ = new AccountAuthenticateRQ(username, password);
        String randomStringAsJwt = RandomStringUtils.randomAlphabetic(10);

        //when
        when(accountAuthenticateService.authenticate(username, password)).thenReturn(randomStringAsJwt);

        //then
        ResponseEntity<String> response = accountController.authenticateAccount(accountAuthenticateRQ);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(randomStringAsJwt, response.getBody());
        verify(accountAuthenticateService, times(1)).authenticate(username, password);
    }
}
