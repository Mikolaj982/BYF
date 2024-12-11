package com.byf.byf.jwt;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.properties")
@Getter
public class JwtConfiguration {

    @Value("${jwt.secret}")
    private String jwtSecret;
}
