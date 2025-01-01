package com.example.makeitreal.Service.impl;

import com.example.makeitreal.Exceptions.ResourceNotFoundException;
import com.example.makeitreal.Model.Group;
import com.example.makeitreal.Model.User;
import com.example.makeitreal.Repository.UserRepository;
import com.example.makeitreal.Service.UserService;
import com.example.makeitreal.payload.GroupDto;
import com.example.makeitreal.payload.UsersDto;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private ModelMapper modelMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Page<UsersDto> getAllUsers(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = Sort.by(sortBy);
        if (sortDir.equals("asc")) {
            sort = sort.ascending();
        } else if (sortDir.equals("desc")) {
            sort = sort.descending();
        }

        Pageable sortedAndPaginated = PageRequest.of(pageNo, pageSize, sort);
        Page<User> users = userRepository.findAll(sortedAndPaginated);
        return users.map(this::mapToDto);
    }

    @Override
    public UsersDto findById(Long id) {
        User user = userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("User", "id", id));
        return mapToDto(user);
    }

    private User mapToEntity(UsersDto usersDto) {
        User user = modelMapper.map(usersDto, User.class);
        return user;
    }

    private UsersDto mapToDto(User user) {
        UsersDto usersDto = new UsersDto();
        usersDto.setId(user.getId());
        usersDto.setName(user.getName());
        usersDto.setEmail(user.getEmail());
        usersDto.setGroups(user.getGroups().stream().map(this::mapGroupToDto).toList());
        return usersDto;
    }

    // TEMP: should instead use GroupService
    private GroupDto mapGroupToDto(Group group) {
        GroupDto groupDto = new GroupDto();
        groupDto.setId(group.getId());
        groupDto.setName(group.getName());
        groupDto.setUsers(group.getUsers().stream().map(User::getId).toList());
        groupDto.setProjectId(group.getProject().getId());
        return groupDto;
    }
}
