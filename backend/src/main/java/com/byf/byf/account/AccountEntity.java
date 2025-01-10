package com.byf.byf.account;


import com.byf.byf.group.groupaccountmapping.GroupUserMapping;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;

import java.util.List;

@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Table(name = "account")
public class AccountEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int accountId;

    @NonNull
    @Column(nullable = false, length = 30)
    private String username;

    @NonNull
    @Column(nullable = false)
    @Email
    private String email;

    @NonNull
    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "account")
    private List<GroupUserMapping> groupUserMappings;
}
