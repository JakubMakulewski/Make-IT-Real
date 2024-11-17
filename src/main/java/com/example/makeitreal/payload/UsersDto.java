package com.example.makeitreal.payload;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

/**
 * DTO for {@link com.example.makeitreal.Model.Users}
 */
@Data
public class UsersDto {
    private Long id;
    @Size
    @NotEmpty(message = "Imie nie powinno byc puste")
    @Size(min = 3, max = 15)
    private String name;
    private List<GroupDto> groups;
}