package com.byf.byf.group;

import com.byf.byf.TestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class GroupControllerTest extends TestBase {

    @MockBean
    GroupService groupService;

    @Autowired
    GroupController groupController;

    @Test
    void createShouldReturn201() {
        // given
        String name = "example";
        String description = "example desc";
        GroupCreateRQ groupCreateRQ = new GroupCreateRQ(name, description);

        // when

        // then
        ResponseEntity<Void> response = groupController.createNewGroup(groupCreateRQ);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        verify(groupService, times(1)).createNewGroup(name, description);
    }

    @Test
    void shouldReturnListOfGroups() {
        // given
        GroupRS returnedGroupAdmin = new GroupRS(1, "nameAdmin", Role.ADMIN);
        GroupRS returnedGroupMember = new GroupRS(2, "nameMember", Role.MEMBER);

        // when
        when(groupService.listUserGroups()).thenReturn(List.of(
                returnedGroupAdmin,
                returnedGroupMember
        ));

        // then
        ResponseEntity<List<GroupRS>> response = groupController.getUserGroups();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(returnedGroupAdmin, Objects.requireNonNull(response.getBody()).getFirst());
        assertEquals(returnedGroupMember, Objects.requireNonNull(response.getBody().getLast()));
        verify(groupService, times(1)).listUserGroups();
    }

    @Test
    void shouldAssignUsersToGroup() {
        // given
        int accountId = 101;
        int groupId = 201;

        // then
        ResponseEntity<Void> response = groupController.assignUserToGroup(groupId, accountId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(groupService, times(1)).addUserToGroup(groupId, accountId);
    }

    @Test
    void shouldDeleteUserFromGroup() {
        // given
        int accountId = 101;
        int groupId = 201;

        // then
        ResponseEntity<Void> response = groupController.deleteUserFromGroup(groupId, accountId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(groupService, times(1)).removeUserFromGroup(groupId, accountId);
    }

    @Test
    void shouldDeleteGroup() {
        // given
        int groupId = 201;

        // then
        ResponseEntity<Void> response = groupController.deleteGroup(groupId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(groupService, times(1)).deleteGroup(groupId);
    }
}
