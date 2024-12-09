package com.example.makeitreal.Service.impl;

import com.example.makeitreal.Exceptions.ResourceNotFoundException;
import com.example.makeitreal.Model.Group;
import com.example.makeitreal.Model.Project;
import com.example.makeitreal.Model.User;
import com.example.makeitreal.Repository.GroupRepository;
import com.example.makeitreal.Repository.ProjectRepository;
import com.example.makeitreal.Service.GroupService;
import com.example.makeitreal.payload.GroupDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GroupServiceImpl implements GroupService {

    private GroupRepository groupRepository;
    private ModelMapper modelMapper;
    private ProjectRepository projectRepository;

    @Autowired
    public GroupServiceImpl(GroupRepository groupRepository, ModelMapper modelMapper, ProjectRepository projectRepository) {
        this.groupRepository = groupRepository;
        this.modelMapper = modelMapper;
        this.projectRepository = projectRepository;
    }

    @Override
    public GroupDto getGroupById(Long id) {
        Group group = groupRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Group", "id", id));
        return mapToDto(group);
    }

    @Override
    public List<GroupDto> getAllGroups() {
        List<Group> groups = groupRepository.findAll();
        return groups.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<GroupDto> getGroupsByProjectId(Long projectId) {
        List<Group> groups = groupRepository.findByProjectId(projectId);

        return groups.stream().map(this::mapToDto).collect(Collectors.toList());
    }


    private Group mapToEntity(GroupDto groupDto) {
        Group group = modelMapper.map(groupDto, Group.class);
        return group;
    }

    private GroupDto mapToDto(Group group) {
        GroupDto groupDto = modelMapper.map(group, GroupDto.class);
        return groupDto;
    }
}
