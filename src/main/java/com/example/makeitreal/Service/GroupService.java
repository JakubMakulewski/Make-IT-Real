package com.example.makeitreal.Service;

import com.example.makeitreal.Model.Group;
import com.example.makeitreal.Model.User;
import com.example.makeitreal.payload.GroupDto;

import java.util.List;
import java.util.Optional;

public interface GroupService {
    GroupDto getGroupById(Long id);
    List<GroupDto> getAllGroups();
    List<GroupDto> getGroupsByProjectId(Long projectId);

    GroupDto createGroup(GroupDto groupDto);

    GroupDto updateGroup(Long groupId, GroupDto groupDto);

    void deleteGroup(Long groupId);
}
