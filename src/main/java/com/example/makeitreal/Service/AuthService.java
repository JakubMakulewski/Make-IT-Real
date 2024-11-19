package com.example.makeitreal.Service;


import com.example.makeitreal.payload.LoginDto;
import com.example.makeitreal.payload.RegisterDto;

public interface AuthService {
    String login(LoginDto loginDto);
    String register(RegisterDto registerDto);
}
