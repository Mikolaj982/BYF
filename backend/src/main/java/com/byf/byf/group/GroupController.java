package com.byf.byf.group;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/group")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @GetMapping
    public ResponseEntity<List<GroupRS>> getUserGroups() {
        List<GroupRS> userGroups = groupService.listUserGroups();
        return new ResponseEntity<>(userGroups, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Void> createNewGroup(@RequestBody GroupCreateRQ groupCreateRQ) {
        groupService.createNewGroup(groupCreateRQ.name(), groupCreateRQ.description());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/{groupId}/account/{accountId}")
    public ResponseEntity<Void> assignUserToGroup(@PathVariable int groupId, @PathVariable int accountId) {
        groupService.addUserToGroup(groupId, accountId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{groupId}/account/{accountId}")
    public ResponseEntity<Void> deleteUserFromGroup(@PathVariable int groupId, @PathVariable int accountId) {
        groupService.removeUserFromGroup(groupId, accountId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<Void> deleteGroup(@PathVariable int groupId) {
        groupService.deleteGroup(groupId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
