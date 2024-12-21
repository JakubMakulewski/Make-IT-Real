package com.example.makeitreal.payload.project;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateProjectDTO {
    private String name;
    private String description;
    private String category;
}
