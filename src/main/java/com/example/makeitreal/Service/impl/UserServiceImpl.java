package com.example.makeitreal.Service.impl;

import com.example.makeitreal.Exceptions.ResourceNotFoundException;
import com.example.makeitreal.Model.Group;
import com.example.makeitreal.Model.User;
import com.example.makeitreal.Repository.UserRepository;
import com.example.makeitreal.Service.UserService;
import com.example.makeitreal.payload.GroupDto;
import com.example.makeitreal.payload.UsersDto;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    public List<UsersDto> getAllUsers() {
        //List<User> users = userRepository.getAllUsers();
        //return users.stream().map(this::mapToDto).collect(Collectors.toList());
        return new ArrayList<>();
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
        UsersDto userDto = modelMapper.map(user, UsersDto.class);
        return userDto;
    }
}
