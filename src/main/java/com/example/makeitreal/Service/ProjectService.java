package com.example.makeitreal.Service;

import com.example.makeitreal.payload.project.CreateProjectDTO;
import com.example.makeitreal.payload.project.ProjectDto;

import java.util.List;

// Project service
public interface ProjectService {
    ProjectDto createProject(CreateProjectDTO createProjectDTO);

    List<ProjectDto> getAllProjects();
}
