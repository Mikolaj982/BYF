package com.byf.byf.account.authenticate;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.byf.byf.TestApplication;
import com.byf.byf.account.AccountEntity;
import com.byf.byf.account.AccountRepository;
import com.byf.byf.jwt.JwtConfiguration;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@SpringBootTest(classes = TestApplication.class)
public class AccountAuthenticateServiceTest {

    @MockBean
    AccountRepository accountRepository;

    @MockBean
    JwtConfiguration jwtConfiguration;

    @Autowired
    AccountAuthenticateService accountAuthenticateService;

    @Test
    void shouldAuthenticateAndReturnJwt() {
        //given
        String username = "test";
        String email = "test@test.com";
        String password = "password";
        String encodedPassword = new BCryptPasswordEncoder().encode(password);
        AccountEntity accountEntity = new AccountEntity(username, email, encodedPassword);

        //when
        when(accountRepository.findByEmail(anyString())).thenReturn(Optional.of(accountEntity));
        when(accountRepository.findByUsername(anyString())).thenReturn(Optional.of(accountEntity));
        when(jwtConfiguration.getJwtSecret()).thenReturn("secret");

        //then
        String authWithUsernameJwt = accountAuthenticateService.authenticate(username, password);
        String authWithEmailJwt = accountAuthenticateService.authenticate(email, password);

        verify(accountRepository, times(1)).findByEmail(email);
        verify(accountRepository, times(1)).findByUsername(username);

        DecodedJWT decodedUsernameJWT = JWT.decode(authWithUsernameJwt);
        DecodedJWT decodedEmailJWT = JWT.decode(authWithEmailJwt);

        assertEquals(username, decodedUsernameJWT.getClaim("username").asString());
        assertEquals(username, decodedEmailJWT.getClaim("username").asString());
        assertEquals(email, decodedUsernameJWT.getClaim("email").asString());
        assertEquals(email, decodedEmailJWT.getClaim("email").asString());
    }

    @Test
    void shouldReturnInvalidPasswordException() {
        //given
        String username = "test";
        String email = "test@test.com";
        String password = "password";
        String encodedPassword = new BCryptPasswordEncoder().encode(password);
        AccountEntity accountEntity = new AccountEntity(username, email, encodedPassword);

        //when
        when(accountRepository.findByEmail(anyString())).thenReturn(Optional.of(accountEntity));
        when(accountRepository.findByUsername(anyString())).thenReturn(Optional.of(accountEntity));

        //then
        assertThrows(
                InvalidPasswordException.class,
                () -> accountAuthenticateService.authenticate(username, "invalidPassword")
        );
        assertThrows(
                InvalidPasswordException.class,
                () -> accountAuthenticateService.authenticate(email, "invalidPassword")
        );
    }

    @Test
    void shouldReturnAccountNotFoundFoundException() {
        //given
        String username = "test";
        String email = "test@test.com";
        String password = "password";

        //when
        when(accountRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(accountRepository.findByUsername(anyString())).thenReturn(Optional.empty());

        //then
        assertThrows(
                AccountNotFoundException.class,
                () -> accountAuthenticateService.authenticate(username, password)
        );
        assertThrows(
                AccountNotFoundException.class,
                () -> accountAuthenticateService.authenticate(email, password)
        );
    }
}
