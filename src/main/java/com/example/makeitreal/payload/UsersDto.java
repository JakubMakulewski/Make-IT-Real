package com.example.makeitreal.payload;

import com.example.makeitreal.Model.User;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

/**
 * DTO for {@link User}
 */
@Data
public class UsersDto {
    private Long id;
    @Size
    @NotEmpty(message = "Imie nie powinno byc puste")
    @Size(min = 3, max = 15)
    private String name;
    private String username;
    private String password;
    private String email;
    private List<GroupDto> groups;
}