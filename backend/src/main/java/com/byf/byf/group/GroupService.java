package com.byf.byf.group;

import com.byf.byf.account.AccountEntity;
import com.byf.byf.account.AccountRepository;
import com.byf.byf.account.authenticate.exception.AccountNotFoundException;
import com.byf.byf.group.exception.GroupNotFoundException;
import com.byf.byf.group.exception.OperationNotPermittedException;
import com.byf.byf.group.exception.UserAlreadyInGroupException;
import com.byf.byf.group.exception.UserNotInGroupException;
import com.byf.byf.group.groupaccountmapping.GroupUserMapping;
import com.byf.byf.group.groupaccountmapping.GroupUserMappingRepository;
import com.byf.byf.security.AuthenticationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    GroupUserMappingRepository groupUserMappingRepository;

    @Transactional
    public List<GroupRS> listUserGroups() {
        AccountEntity authenticatedUser = authenticationService.readAuthenticatedUserDetails();
        AccountEntity databaseUser = accountRepository.findById(authenticatedUser.getAccountId())
                .orElseThrow(() -> new AccountNotFoundException("Account with given ID not found"));

        return databaseUser.getGroupUserMappings()
                .stream().map(mapping -> new GroupRS(mapping.getGroup().getGroupId(), mapping.getGroup().getName(), mapping.getRole()))
                .toList();
    }

    @Transactional
    public void createNewGroup(String name, String description) {
        GroupEntity group = GroupEntity.builder()
                .name(name)
                .description(description)
                .build();

        AccountEntity authenticatedAccount = authenticationService.readAuthenticatedUserDetails();
        groupRepository.save(group);
        createGroupAccountMapping(authenticatedAccount, group, Role.ADMIN);
    }

    @Transactional
    public void addUserToGroup(int groupId, int accountId) {
        GroupEntity group = groupRepository.findById(groupId)
                .orElseThrow(() -> new GroupNotFoundException("Group with given id was not found in database"));

        AccountEntity accountToAdd = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException("Account to add to group was not found in database"));

        AccountEntity authenticatedAccount = authenticationService.readAuthenticatedUserDetails();

        if (isUserInGroup(accountToAdd.getAccountId(), group)) {
            throw new UserAlreadyInGroupException("User is already in group");
        }

        if (isUserNotGroupAdmin(authenticatedAccount, group)) {
            throw new OperationNotPermittedException("Users can be added only by the group admins");
        }

        createGroupAccountMapping(accountToAdd, group, Role.MEMBER);
    }

    @Transactional
    public void removeUserFromGroup(int groupId, int accountId) {
        GroupEntity group = groupRepository.findById(groupId)
                .orElseThrow(() -> new GroupNotFoundException("Group with given id was not found in database"));

        List<GroupUserMapping> mappingsToRemove = group
                .getGroupUserMappings()
                .stream()
                .filter(mapping -> mapping.getAccount().getAccountId() == accountId)
                .toList();

        AccountEntity authenticatedAccount = authenticationService.readAuthenticatedUserDetails();

        if (!isUserInGroup(accountId, group)) {
            throw new UserNotInGroupException("User not found in group");
        }

        if (isUserNotGroupAdmin(authenticatedAccount, group) && authenticatedAccount.getAccountId() != accountId) {
            throw new OperationNotPermittedException("Only group admin can remove other users from group");
        }

        mappingsToRemove.forEach(
                mapping -> groupUserMappingRepository.delete(mapping)
        );

        if (mappingsToRemove.size() == 1) {
            groupRepository.delete(group);
        }
    }

    @Transactional
    public void deleteGroup(int groupId) {
        GroupEntity groupToDelete = groupRepository.findById(groupId).orElseThrow(
                () -> new GroupNotFoundException("Group with given ID wasn't found")
        );

        AccountEntity authenticatedAccount = authenticationService.readAuthenticatedUserDetails();

        if (isUserNotGroupAdmin(authenticatedAccount, groupToDelete)) {
            throw new OperationNotPermittedException("Only group admin can delete the group");
        }

        groupRepository.delete(groupToDelete);
    }

    private void createGroupAccountMapping(AccountEntity account, GroupEntity group, Role role) {
        GroupUserMapping mapping = new GroupUserMapping();
        mapping.setAccount(account);
        mapping.setGroup(group);
        mapping.setRole(role);
        groupUserMappingRepository.save(mapping);
    }

    private boolean isUserInGroup(int userId, GroupEntity group) {
        return group
                .getGroupUserMappings()
                .stream()
                .anyMatch(
                        mapping -> mapping.getAccount().getAccountId() == userId
                );
    }

    private boolean isUserNotGroupAdmin(AccountEntity account, GroupEntity group) {
        return group.getGroupUserMappings()
                .stream()
                .noneMatch(
                        mapping -> mapping.getAccount().getAccountId() == account.getAccountId() &&
                                mapping.getRole() == Role.ADMIN
                );
    }
}
