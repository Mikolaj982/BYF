package com.byf.byf.group;

import com.byf.byf.TestBase;
import com.byf.byf.account.AccountEntity;
import com.byf.byf.account.authenticate.exception.AccountNotFoundException;
import com.byf.byf.group.exception.OperationNotPermittedException;
import com.byf.byf.group.exception.UserAlreadyInGroupException;
import com.byf.byf.group.exception.UserNotInGroupException;
import com.byf.byf.group.groupaccountmapping.GroupUserMapping;
import com.byf.byf.group.groupaccountmapping.GroupUserMappingRepository;
import com.byf.byf.security.AuthenticationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class GroupServiceTest extends TestBase {

    @MockBean
    GroupRepository groupRepository;

    @MockBean
    GroupUserMappingRepository groupUserMappingRepository;

    @MockBean
    AuthenticationService authenticationService;

    @Autowired
    GroupService groupService;

    @Mock
    GroupEntity group;
    @Mock
    AccountEntity account;
    @Mock
    GroupUserMapping groupUserMapping;

    @BeforeEach
    void setup() {
        when(groupUserMapping.getGroup()).thenReturn(group);
        when(groupRepository.findAll()).thenReturn(List.of(group));
        when(accountRepository.findById(any())).thenReturn(Optional.of(account));
        when(authenticationService.readAuthenticatedUserDetails()).thenReturn(account);
    }

    @Test
    void shouldListUsers() {
        List<GroupRS> groups = groupService.listUserGroups();
        groups.forEach(groupRs -> assertEquals(new GroupRS(group.getGroupId(), group.getName(), group.getGroupUserMappings().getFirst().getRole()), groupRs));
    }

    @Test
    void shouldThrowAccountNotFoundException() {
        when(accountRepository.findById(any())).thenReturn(Optional.empty());
        assertThrows(AccountNotFoundException.class, () -> groupService.listUserGroups());
    }

    @Test
    void shouldCreateNewGroup() {
        groupService.createNewGroup("name", "description");
        verify(groupRepository, times(1)).save(any());
        verify(groupUserMappingRepository, times(1)).save(any());
    }

    @Test
    void shouldAddUserToGroup() {
        // given
        AccountEntity groupAdmin = mock(AccountEntity.class);
        GroupUserMapping adminMapping = mock(GroupUserMapping.class);

        // when
        when(group.getGroupUserMappings()).thenReturn(List.of(adminMapping));
        when(adminMapping.getAccount()).thenReturn(new AccountEntity(2, "user2", "user2@test.com", "password", List.of(adminMapping)));
        when(groupRepository.findById(1)).thenReturn(Optional.of(group));
        when(accountRepository.findById(1)).thenReturn(Optional.of(account));
        when(adminMapping.getRole()).thenReturn(Role.ADMIN);
        when(groupAdmin.getGroupUserMappings()).thenReturn(List.of(adminMapping));
        when(accountRepository.findById(2)).thenReturn(Optional.of(groupAdmin));
        when(authenticationService.readAuthenticatedUserDetails()).thenReturn(new AccountEntity(2, "username", "email", "password", List.of(adminMapping)));

        // then
        groupService.addUserToGroup(1, 1);
        verify(groupUserMappingRepository, times(1)).save(any());
    }

    @Test
    void shouldRemoveUserFromGroup() {
        // given
        AccountEntity groupAdmin = mock(AccountEntity.class);
        GroupUserMapping adminMapping = mock(GroupUserMapping.class);

        // when
        when(group.getGroupUserMappings()).thenReturn(List.of(adminMapping));
        when(adminMapping.getAccount()).thenReturn(new AccountEntity(2, "user2", "user2@test.com", "password", List.of(adminMapping)));
        when(groupRepository.findById(1)).thenReturn(Optional.of(group));
        when(accountRepository.findById(1)).thenReturn(Optional.of(account));
        when(adminMapping.getRole()).thenReturn(Role.ADMIN);
        when(groupAdmin.getGroupUserMappings()).thenReturn(List.of(adminMapping));
        when(accountRepository.findById(2)).thenReturn(Optional.of(groupAdmin));
        when(authenticationService.readAuthenticatedUserDetails()).thenReturn(new AccountEntity(1, "username", "email", "password", List.of(adminMapping)));

        // then
        groupService.removeUserFromGroup(1, 2);
        verify(groupUserMappingRepository, times(1)).delete(any());
    }

    @Test
    void shouldRemoveSelfFromGroup() {
        // given
        AccountEntity groupMember = mock(AccountEntity.class);
        GroupUserMapping memberMapping = mock(GroupUserMapping.class);

        // when
        when(group.getGroupUserMappings()).thenReturn(List.of(memberMapping));
        when(memberMapping.getAccount()).thenReturn(new AccountEntity(2, "user2", "user2@test.com", "password", List.of(memberMapping)));
        when(groupRepository.findById(1)).thenReturn(Optional.of(group));
        when(accountRepository.findById(1)).thenReturn(Optional.of(account));
        when(memberMapping.getRole()).thenReturn(Role.MEMBER);
        when(groupMember.getGroupUserMappings()).thenReturn(List.of(memberMapping));
        when(accountRepository.findById(2)).thenReturn(Optional.of(groupMember));
        when(authenticationService.readAuthenticatedUserDetails()).thenReturn(new AccountEntity(2, "username", "email", "password", List.of(memberMapping)));

        // then
        groupService.removeUserFromGroup(1, 2);
        verify(groupUserMappingRepository, times(1)).delete(any());
    }

    @Test
    void shouldThrowUserAlreadyInGroupException() {
        // given
        GroupUserMapping mappingMock = mock(GroupUserMapping.class);
        AccountEntity accountEntityMock = mock(AccountEntity.class);
        GroupEntity groupEntityMock = mock(GroupEntity.class);

        // when
        when(accountEntityMock.getAccountId()).thenReturn(1);
        when(groupRepository.findById(any())).thenReturn(Optional.of(groupEntityMock));
        when(groupEntityMock.getGroupUserMappings()).thenReturn(List.of(mappingMock));
        when(accountEntityMock.getGroupUserMappings()).thenReturn(List.of(mappingMock));
        when(mappingMock.getAccount()).thenReturn(accountEntityMock);
        when(accountRepository.findById(any())).thenReturn(Optional.of(accountEntityMock));

        // then
        assertThrows(UserAlreadyInGroupException.class, () -> groupService.addUserToGroup(1, 1));
    }

    @Test
    void shouldThrowOperationNotPermittedException() {
        // given
        AccountEntity groupMember = mock(AccountEntity.class);
        GroupUserMapping memberMapping = mock(GroupUserMapping.class);

        // when
        when(group.getGroupUserMappings()).thenReturn(List.of(memberMapping));
        when(memberMapping.getAccount()).thenReturn(new AccountEntity(2, "user2", "user2@test.com", "password", List.of(memberMapping)));
        when(groupRepository.findById(1)).thenReturn(Optional.of(group));
        when(accountRepository.findById(1)).thenReturn(Optional.of(account));
        when(memberMapping.getRole()).thenReturn(Role.MEMBER);
        when(groupMember.getGroupUserMappings()).thenReturn(List.of(memberMapping));
        when(accountRepository.findById(2)).thenReturn(Optional.of(groupMember));
        when(authenticationService.readAuthenticatedUserDetails()).thenReturn(new AccountEntity(1, "username", "email", "password", List.of(memberMapping)));

        // then
        assertThrows(OperationNotPermittedException.class, () -> groupService.addUserToGroup(1, 1));
        assertThrows(OperationNotPermittedException.class, () -> groupService.removeUserFromGroup(1, 2));
        assertThrows(OperationNotPermittedException.class, () -> groupService.deleteGroup(1));
    }

    @Test
    void shouldThrowUserNotInGroupException() {
        // given
        AccountEntity groupAdmin = mock(AccountEntity.class);
        GroupUserMapping adminMapping = mock(GroupUserMapping.class);

        // when
        when(group.getGroupUserMappings()).thenReturn(List.of(adminMapping));
        when(adminMapping.getAccount()).thenReturn(new AccountEntity(2, "user2", "user2@test.com", "password", List.of(adminMapping)));
        when(groupRepository.findById(1)).thenReturn(Optional.of(group));
        when(accountRepository.findById(1)).thenReturn(Optional.of(account));
        when(adminMapping.getRole()).thenReturn(Role.ADMIN);
        when(groupAdmin.getGroupUserMappings()).thenReturn(List.of(adminMapping));
        when(accountRepository.findById(2)).thenReturn(Optional.of(groupAdmin));
        when(authenticationService.readAuthenticatedUserDetails()).thenReturn(new AccountEntity(2, "username", "email", "password", List.of(adminMapping)));

        // then
        assertThrows(UserNotInGroupException.class, () -> groupService.removeUserFromGroup(1, 99));
    }
}
