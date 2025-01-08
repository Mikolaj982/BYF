package com.byf.byf.account.create;

import com.byf.byf.TestBase;
import com.byf.byf.account.create.exception.AccountCreateValidationException;
import com.byf.byf.account.create.exception.AccountCreateValidationExceptionHandler;
import com.byf.byf.common.ErrorRS;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static com.byf.byf.constants.ErrorCodes.CREATE_ACCOUNT_VALIDATION_ERROR;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AccountCreateValidationExceptionHandlerTest extends TestBase {

    @Test
    void shouldHandleException() {
        //given
        String errorMessage = "Test exception";
        ErrorRS errorRS = new ErrorRS(
                CREATE_ACCOUNT_VALIDATION_ERROR,
                "Error during account validation: " + errorMessage
        );

        //when
        ResponseEntity<ErrorRS> response = new AccountCreateValidationExceptionHandler().handleAccountValidationException(new AccountCreateValidationException(errorMessage));

        //then
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(errorRS, response.getBody());
    }
}
