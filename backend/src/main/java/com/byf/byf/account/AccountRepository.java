package com.byf.byf.account;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends CrudRepository<AccountEntity, Integer> {
    int countByUsername(String username);
    int countByEmail(String email);
}
