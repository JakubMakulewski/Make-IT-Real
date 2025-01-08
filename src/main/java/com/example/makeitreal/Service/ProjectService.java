package com.example.makeitreal.Service;

import com.example.makeitreal.payload.project.CreateProjectDTO;
import com.example.makeitreal.payload.project.ProjectDto;
import org.springframework.data.domain.Page;

// Project service
public interface ProjectService {
    ProjectDto createProject(CreateProjectDTO createProjectDTO);

    Page<ProjectDto> getAllProjects(int pageNo, int pageSize, String sortBy, String sortDir);

    ProjectDto getProjectById(Long id);

    ProjectDto updateProject(Long id, CreateProjectDTO updatedProjectDTO);

    void deleteProject(Long id);
}
