package com.example.makeitreal.Controller.Group;

import com.example.makeitreal.Service.GroupService;
import com.example.makeitreal.payload.GroupDto;
import com.example.makeitreal.utils.AppCostants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@RequestMapping("/group")
public class GroupController {

    private GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping("/groups")
    public List<GroupDto> getGroups(
            @RequestParam(value = "pageNo", defaultValue = AppCostants.DEAFULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = AppCostants.DEFAUL_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppCostants.DEAFULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppCostants.DEFAULT_SORT_DIRECTION, required = false) String sortDir
    ) {
        return groupService.getAllGroups(); // ResponseEntity service grupy
    }

    @GetMapping("/groups/{id}")
    public ResponseEntity<GroupDto> getGroupById(@PathVariable(name = "id") Long id) {
        GroupDto groupDto = groupService.getGroupById(id);
        return new ResponseEntity<>(groupDto, HttpStatus.OK);
    }


    @GetMapping("/projects/{projectId}/groups")
    public List<GroupDto> getGroupsByProjectId(
            @PathVariable(name = "projectId") Long projectId) {
        return groupService.getGroupsByProjectId(projectId);
    }

    @PostMapping("/groups")
    public ResponseEntity<GroupDto> createGroup(@RequestBody GroupDto groupDto) {
        return new ResponseEntity<>(groupService.createGroup(groupDto), HttpStatus.CREATED);
    }

//    @PostMapping("/groups/{groupId}/users/{userId}")
//    public ResponseEntity<Void> addUserToGroup(
//            @PathVariable(name = "groupId") Long groupId,
//            @PathVariable(name = "userId") Long userId) {
//        return new ResponseEntity<>(groupService.addUserToGroup(groupId, userId), HttpStatus.OK);
//    }
}
