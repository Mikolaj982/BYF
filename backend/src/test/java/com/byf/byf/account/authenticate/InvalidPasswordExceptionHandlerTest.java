package com.byf.byf.account.authenticate;

import com.byf.byf.TestApplication;
import com.byf.byf.common.ErrorRS;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static com.byf.byf.constants.ErrorCodes.INVALID_PASSWORD;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(classes = TestApplication.class)
public class InvalidPasswordExceptionHandlerTest {

    @Autowired
    InvalidPasswordExceptionHandler invalidPasswordExceptionHandler;

    @Test
    void shouldHandleInvalidPasswordException() {
        //given
        String message = "Test exception message";
        InvalidPasswordException invalidPasswordException = new InvalidPasswordException(message);

        //then
        ResponseEntity<ErrorRS> response = invalidPasswordExceptionHandler.handleInvalidPasswordException(invalidPasswordException);
        assert response.getBody() != null;
        assertEquals(INVALID_PASSWORD, response.getBody().errorCode());
        assertEquals("Error while user authentication. Invalid password: " + message, response.getBody().message());
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }
}
