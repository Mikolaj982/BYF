package com.byf.byf.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.byf.byf.TestApplication;
import com.byf.byf.account.AccountEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = TestApplication.class)
public class JwtTokenUtilTest {

    @MockBean
    JwtConfiguration jwtConfiguration;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @Test
    void shouldGenerateJwt() {
        //given
        String username = "test";
        String email = "test@test.com";
        String password = "password";
        AccountEntity accountEntity = new AccountEntity(username, email, password);

        //when
        when(jwtConfiguration.getJwtSecret()).thenReturn("secret");
        String jwtToken = jwtTokenUtil.generateToken(accountEntity);

        //then
        DecodedJWT decodedJWT = JWT.decode(jwtToken);
        String decodedUsername = decodedJWT.getClaim("username").asString();
        String decodedEmail = decodedJWT.getClaim("email").asString();
        assertEquals(username, decodedUsername);
        assertEquals(email, decodedEmail);
    }
}
