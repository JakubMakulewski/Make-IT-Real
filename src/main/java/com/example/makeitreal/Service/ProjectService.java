package com.example.makeitreal.Service;

import com.example.makeitreal.payload.project.CreateProjectDTO;
import com.example.makeitreal.payload.project.ProjectDto;

// Project service
public interface ProjectService {
    ProjectDto createProject(CreateProjectDTO createProjectDTO);
}
