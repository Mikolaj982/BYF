package com.byf.byf.account;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Entity
@RequiredArgsConstructor
@NoArgsConstructor
public class AccountEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @NonNull
    @Column(nullable = false, length = 30)
    String username;

    @NonNull
    @Column(nullable = false)
    @Email
    String email;

    @NonNull
    @Column(nullable = false)
    String password;
}
