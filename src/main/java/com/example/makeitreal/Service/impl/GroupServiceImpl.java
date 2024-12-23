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

    private GroupRepository groupRepository;
    private ModelMapper modelMapper;
    private ProjectRepository projectRepository;
    private UserRepository userRepository;

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

        // Ręczne mapowanie Group -> GroupDto
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
        // Pobierz użytkowników na podstawie ich ID
        List<User> users = userRepository.findAllById(groupDto.getUsers());

        // Utwórz nową grupę
        Group group = new Group();
        group.setName(groupDto.getName());
        group.setProject(projectRepository.findById(groupDto.getProjectId())
                .orElseThrow(() -> new RuntimeException("Projekt nie istnieje")));
        group.setUsers(users);

        // Zapisz grupę w bazie
        Group savedGroup = groupRepository.save(group);

        // Mapowanie Group -> GroupDto
        GroupDto resultDto = new GroupDto();
        resultDto.setId(savedGroup.getId());
        resultDto.setName(savedGroup.getName());
        resultDto.setUsers(users.stream().map(User::getId).toList());
        resultDto.setProjectId(savedGroup.getProject().getId());

        return resultDto;
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
