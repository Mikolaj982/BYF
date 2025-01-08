package com.byf.byf.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.byf.byf.account.AccountEntity;
import com.byf.byf.account.AccountRepository;
import com.byf.byf.account.authenticate.exception.AccountNotFoundException;
import com.byf.byf.jwt.JwtConfiguration;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static com.byf.byf.jwt.JwtClaimsConstants.*;

@Component
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    JwtConfiguration jwtConfiguration;

    @Autowired
    AccountRepository accountRepository;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        String jwt = readJwtFromRequest(request);
        String jwtSecret = jwtConfiguration.getJwtSecret();
        Algorithm algorithm = Algorithm.HMAC512(jwtSecret);

        try {
            DecodedJWT decodedJWT = verifyAndDecodeJwt(jwt, algorithm);
            setGlobalAuthentication(decodedJWT);
            filterChain.doFilter(request, response);
        } catch (JWTVerificationException | AccountNotFoundException exception) {
            log.info("Couldn't validate jwt: {}", jwt);
            response.sendError(HttpStatus.UNAUTHORIZED.value());
        } catch (Exception e) {
            log.error("Unexpected error appeared in jwt filter!", e);
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
        return request.getRequestURI().contains("/api/v1/account");
    }

    private String readJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        String BEARER_PREFIX = "Bearer ";

        if (StringUtils.isNotBlank(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(BEARER_PREFIX.length());
        }
        return "";
    }

    private DecodedJWT verifyAndDecodeJwt(String jwt, Algorithm algorithm) {
        JWTVerifier verifier = JWT.require(algorithm)
                .withClaimPresence(ACCOUNT_ID)
                .withClaimPresence(USERNAME)
                .withClaimPresence(EMAIL)
                .build();

        return verifier.verify(jwt);
    }

    private void setGlobalAuthentication(DecodedJWT decodedJWT) {
        String decodedUsername = decodedJWT.getClaim(USERNAME).asString();
        AccountEntity account = accountRepository.findByUsername(decodedUsername).orElseThrow(() -> new AccountNotFoundException("Account not found"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(account, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
