package com.byf.byf.account;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class AccountValidationExceptionHandlerTest {

    @Autowired
    AccountValidationExceptionHandler handler;

    @Test
    void shouldHandleException() {
        //given
        String errorMessage = "Test exception";

        //when
        ResponseEntity<String> response = handler.handleAccountValidationException(new AccountValidationException(errorMessage));

        //then
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Error during account validation: " + errorMessage, response.getBody());
    }
}
