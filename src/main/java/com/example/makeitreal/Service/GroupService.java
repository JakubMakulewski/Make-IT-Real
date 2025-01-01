package com.example.makeitreal.Service;

import com.example.makeitreal.payload.GroupDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface GroupService {
    GroupDto getGroupById(Long id);
    Page<GroupDto> getAllGroups(int pageNo, int pageSize, String sortBy, String sortDir);
    List<GroupDto> getGroupsByProjectId(Long projectId);

    GroupDto createGroup(GroupDto groupDto);

    GroupDto updateGroup(Long groupId, GroupDto groupDto);

    void deleteGroup(Long groupId);
}
