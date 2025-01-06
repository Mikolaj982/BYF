package com.byf.byf.security;

import com.byf.byf.account.AccountEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    public AccountEntity readAuthenticatedUserDetails() {
        return (AccountEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
