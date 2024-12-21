package com.example.makeitreal.Service;

import com.example.makeitreal.payload.UsersDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    List<UsersDto> getAllUsers();

    UsersDto findById(Long id);
}
