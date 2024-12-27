package com.example.makeitreal.payload;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO for {@link com.example.makeitreal.Model.Group}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupDto {
    private Long id;
//    @Size(message = "Imie musi miec od 3 do 15 znakow", min = 3, max = 15)
//    @NotEmpty(message = "Imie nie moze byc puste")
    private String name;
    private List<Long> users;
    private Long projectId;
}