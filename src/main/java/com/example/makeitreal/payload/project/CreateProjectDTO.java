package com.example.makeitreal.payload.project;

import lombok.Data;

@Data
public class CreateProjectDTO {
    private String name;
    private String description;
    private String category;
}
