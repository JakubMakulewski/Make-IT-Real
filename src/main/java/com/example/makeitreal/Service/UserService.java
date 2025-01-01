package com.example.makeitreal.Service;

import com.example.makeitreal.payload.UsersDto;
import org.springframework.data.domain.Page;

public interface UserService {
    Page<UsersDto> getAllUsers(int pageNo, int pageSize, String sortBy, String sortDir);

    UsersDto findById(Long id);
}
