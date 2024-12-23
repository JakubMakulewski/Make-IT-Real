package com.example.makeitreal.payload.project;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateProjectDTO {
    private String name;
    private String description;
    private String category;
}
