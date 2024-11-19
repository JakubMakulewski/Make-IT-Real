package com.example.makeitreal.Service;

import com.example.makeitreal.Model.Group;
import com.example.makeitreal.Model.User;
import com.example.makeitreal.payload.GroupDto;

import java.util.List;

public interface GroupService {
    GroupDto getGroupById(Long id);
    List<GroupDto> getAllGroups();
}
