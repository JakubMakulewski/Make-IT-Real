package com.example.makeitreal.Service.impl;

import com.example.makeitreal.Exceptions.ResourceNotFoundException;
import com.example.makeitreal.Model.Group;
import com.example.makeitreal.Model.Project;
import com.example.makeitreal.Model.User;
import com.example.makeitreal.Repository.GroupRepository;
import com.example.makeitreal.Repository.ProjectRepository;
import com.example.makeitreal.Repository.UserRepository;
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

    private final GroupRepository groupRepository;
    private final ModelMapper modelMapper;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Autowired
    public GroupServiceImpl(UserRepository userRepository,GroupRepository groupRepository, ModelMapper modelMapper, ProjectRepository projectRepository) {
        this.groupRepository = groupRepository;
        this.modelMapper = modelMapper;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    @Override
    public GroupDto getGroupById(Long id) {
//        Group group = groupRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Group", "id", id));
//        return mapToDto(group);
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Group", "id", id));

        GroupDto groupDto = new GroupDto();
        groupDto.setId(group.getId());
        groupDto.setName(group.getName());
        groupDto.setUsers(group.getUsers().stream().map(User::getId).toList());
        groupDto.setProjectId(group.getProject().getId());

        return groupDto;
    }

    @Override
    public List<GroupDto> getAllGroups() {
        List<Group> groups = groupRepository.findAll();
//        return groups.stream().map(group -> modelMapper.map(group, GroupDto.class))
//                .collect(Collectors.toList());
        return groups.stream()
                .map(group -> {
                    GroupDto groupDto = new GroupDto();
                    groupDto.setId(group.getId());
                    groupDto.setName(group.getName());
                    groupDto.setProjectId(group.getProject().getId());
                    groupDto.setUsers(group.getUsers().stream().map(User::getId).toList());
                    return groupDto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<GroupDto> getGroupsByProjectId(Long projectId) {
        List<Group> groups = groupRepository.findByProjectId(projectId);

        return groups.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public GroupDto createGroup(GroupDto groupDto) {
        List<User> users = userRepository.findAllById(groupDto.getUsers());

        Group group = new Group();
        group.setName(groupDto.getName());
        group.setProject(projectRepository.findById(groupDto.getProjectId())
                .orElseThrow(() -> new RuntimeException("Projekt nie istnieje")));
        group.setUsers(users);

        Group savedGroup = groupRepository.save(group);

        GroupDto resultDto = new GroupDto();
        resultDto.setId(savedGroup.getId());
        resultDto.setName(savedGroup.getName());
        resultDto.setUsers(users.stream().map(User::getId).toList());
        resultDto.setProjectId(savedGroup.getProject().getId());

        return resultDto;
    }

    @Override
    public GroupDto updateGroup(Long groupId, GroupDto groupDto) {
        Group group = groupRepository.findById(groupId).orElseThrow(()-> new ResourceNotFoundException("Group", "id", groupId));
        List<User> users = userRepository.findAllById(groupDto.getUsers());
        group.setName(groupDto.getName());
        group.setUsers(users);
        group.setProject(projectRepository.findById(groupDto.getProjectId())
               .orElseThrow(() -> new RuntimeException("Projekt nie istnieje")));

        Group updatedGroup = groupRepository.save(group);

        return mapToDtoUpdate(updatedGroup);
    }


    private Group mapToEntity(GroupDto groupDto) {
        return modelMapper.map(groupDto, Group.class);
    }

    private GroupDto mapToDto(Group group) {
        return modelMapper.map(group, GroupDto.class);
    }
    private GroupDto mapToDtoUpdate(Group group) {
        GroupDto groupDto = new GroupDto();
        groupDto.setId(group.getId());
        groupDto.setName(group.getName());
        groupDto.setUsers(group.getUsers().stream().map(User::getId).toList());
        groupDto.setProjectId(group.getProject().getId());
        return groupDto;
    }
}
