package com.example.makeitreal.Service;

import com.example.makeitreal.payload.UsersDto;

import java.util.List;

public interface UserService {
    List<UsersDto> getAllUsers();
}
