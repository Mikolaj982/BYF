package com.byf.byf.group.groupaccountmapping;

import com.byf.byf.account.AccountEntity;
import com.byf.byf.group.GroupEntity;
import com.byf.byf.group.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class GroupUserMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mappingId;

    @ManyToOne
    private AccountEntity account;

    @ManyToOne
    private GroupEntity group;

    private Role role;
}
