package com.byf.byf.account.create;

import com.byf.byf.TestBase;
import com.byf.byf.account.AccountEntity;
import com.byf.byf.account.create.exception.AccountCreateValidationException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

public class AccountCreateServiceTest extends TestBase {

    @MockBean
    AccountCreateValidator accountCreateValidator;

    @Autowired
    AccountCreateService accountCreateService;

    @Test
    void shouldCreateAccount() throws AccountCreateValidationException {
        //given
        String username = "correctUsername";
        String email = "correstEmail@test.com";
        String password = "correctPassword";

        //when
        when(accountRepository.save(any(AccountEntity.class))).thenReturn(
                new AccountEntity(
                        username,
                        email,
                        new BCryptPasswordEncoder().encode(password)
                )
        );
        AccountEntity account = accountCreateService.createAccount(username, email, password);

        //then
        assertEquals(username, account.getUsername());
        assertEquals(email, account.getEmail());
        assertTrue(new BCryptPasswordEncoder().matches(password, account.getPassword()));
        verify(accountCreateValidator, times(1)).validateInput(username, email, password);
    }
}
