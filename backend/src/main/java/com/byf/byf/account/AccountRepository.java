package com.byf.byf.account;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends CrudRepository<AccountEntity, Integer> {
    Optional<AccountEntity> findByEmail(String email);

    Optional<AccountEntity> findByUsername(String username);

    int countByUsername(String username);

    int countByEmail(String email);
}
