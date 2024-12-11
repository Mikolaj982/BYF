package com.byf.byf.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.byf.byf.account.AccountEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class JwtTokenUtil {

    @Autowired
    JwtConfiguration jwtConfiguration;

    public String generateToken(AccountEntity accountEntity) {
        String jwtSecret = jwtConfiguration.getJwtSecret();

        return JWT.create()
                .withClaim("id", accountEntity.getId())
                .withClaim("username", accountEntity.getUsername())
                .withClaim("email", accountEntity.getEmail())
                .withIssuedAt(Instant.now())
                .sign(Algorithm.HMAC512(jwtSecret));
    }
}