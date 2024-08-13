package com.byf.byf.account;

import com.byf.byf.account.create.AccountCreateService;
import com.byf.byf.account.create.AccountCreateValidator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@SpringBootTest
public class AccountCreateServiceTest {

    @MockBean
    AccountRepository accountRepository;

    @MockBean
    AccountCreateValidator accountCreateValidator;

    @Autowired
    AccountCreateService accountCreateService;

    @Test
    void shouldCreateAccount() throws AccountValidationException {
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
        assertEquals(username, account.username);
        assertEquals(email, account.email);
        assertTrue(new BCryptPasswordEncoder().matches(password, account.password));
        verify(accountCreateValidator, times(1)).validateInput(username, email, password);
    }
}
