package com.byf.byf.group;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/group")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @PostMapping
    public ResponseEntity<Void> createNewGroup(@RequestBody GroupCreateRQ groupCreateRQ) {
        groupService.createNewGroup(groupCreateRQ.name(), groupCreateRQ.description());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/{groupId}")
    public ResponseEntity<Void> assignUserToGroup(@PathVariable int groupId, @RequestParam int accountId) {
        groupService.addUserToGroup(accountId, groupId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<Void> deleteUserFromGroup(@PathVariable int groupId, @RequestParam int accountId) {
        groupService.removeUserFromGroup(accountId, groupId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
