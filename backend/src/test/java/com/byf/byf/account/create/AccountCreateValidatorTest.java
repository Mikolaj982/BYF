package com.byf.byf.account.create;

import com.byf.byf.TestApplication;
import com.byf.byf.account.AccountRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = TestApplication.class)
public class AccountCreateValidatorTest {

    @MockBean
    AccountRepository accountRepository;

    @Autowired
    AccountCreateValidator accountCreateValidator;

    @Test
    void shouldValidateCorrectFields() {
        //given
        String username = "correctUsername";
        String email = "correstEmail@test.com";
        String password = "correctPassword";

        //when
        when(accountRepository.countByEmail(anyString())).thenReturn(0);
        when(accountRepository.countByUsername(anyString())).thenReturn(0);

        //then
        assertDoesNotThrow(() -> accountCreateValidator.validateInput(username, email, password));
    }

    @Test
    void shouldThrowExceptionWhenEmailIsNotUnique() {
        //given
        String username = "correctUsername";
        String email = "correstEmail@test.com";
        String password = "correctPassword";

        //when
        when(accountRepository.countByEmail(anyString())).thenReturn(1);
        when(accountRepository.countByUsername(anyString())).thenReturn(0);

        //then
        assertThrows(AccountCreateValidationException.class, () -> accountCreateValidator.validateInput(username, email, password));
    }

    @Test
    void shouldThrowExceptionWhenUsernameIsNotUnique() {
        //given
        String username = "correctUsername";
        String email = "correstEmail@test.com";
        String password = "correctPassword";

        //when
        when(accountRepository.countByEmail(anyString())).thenReturn(0);
        when(accountRepository.countByUsername(anyString())).thenReturn(1);

        //then
        assertThrows(AccountCreateValidationException.class, () -> accountCreateValidator.validateInput(username, email, password));
    }

    @Test
    void shouldThrowExceptionWhenUsernameContainsForbiddenCharacters() {
        //given
        String username = "incorrectUsername@";
        String email = "correstEmail@test.com";
        String password = "correctPassword";

        //when
        when(accountRepository.countByEmail(anyString())).thenReturn(0);
        when(accountRepository.countByUsername(anyString())).thenReturn(0);

        //then
        assertThrows(AccountCreateValidationException.class, () -> accountCreateValidator.validateInput(username, email, password));
    }

    @ParameterizedTest
    @MethodSource("getInvalidFields")
    void shouldThrowExceptionWhenArgumentsAreInvalid(String username, String email, String password) {
        //when
        when(accountRepository.countByEmail(anyString())).thenReturn(0);
        when(accountRepository.countByUsername(anyString())).thenReturn(0);

        assertThrows(AccountCreateValidationException.class, () -> accountCreateValidator.validateInput(username, email, password));
    }

    private static Stream<Arguments> getInvalidFields() {
        return Stream.of(
                Arguments.of("", "", ""),
                Arguments.of(null, null, null),
                Arguments.of("", "correctEmail@test.com", "correctPassword"),
                Arguments.of("correctUsername", "", "correctPassword"),
                Arguments.of("correctUsername", "correctEmail@test.com", ""),
                Arguments.of("correctUsername", "correctEmail@test.com", "inv"),
                Arguments.of("inv", "correctEmail@test.com", "correctPassword"),
                Arguments.of("correctUsername", "invalidEmailFormat.com", "correctPassword"),
                Arguments.of("correctUsername", "invalidEmailFormat.com", "correctPassword"),
                Arguments.of("correctUsername", "correctEmail@test.com", "Password with whitespaces")
        );
    }
}
