package com.example.makeitreal.Service.impl;

import com.example.makeitreal.Model.Project;
import com.example.makeitreal.Model.ProjectCategory;
import com.example.makeitreal.Repository.ProjectCategoryRepository;
import com.example.makeitreal.Repository.ProjectRepository;
import com.example.makeitreal.Service.ProjectService;
import com.example.makeitreal.payload.project.CreateProjectDTO;
import com.example.makeitreal.payload.project.ProjectDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectCategoryRepository projectCategoryRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, ProjectCategoryRepository projectCategoryRepository, ModelMapper modelMapper) {
        this.projectRepository = projectRepository;
        this.projectCategoryRepository = projectCategoryRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ProjectDto createProject(CreateProjectDTO createProjectDTO) {
        ProjectCategory projectCategory =
                projectCategoryRepository.findOneByName(createProjectDTO.getCategory())
                .orElseGet(() -> {
                    ProjectCategory newProjectCategory = new ProjectCategory();
                    newProjectCategory.setName(createProjectDTO.getCategory());
                    projectCategoryRepository.save(newProjectCategory);
                    return newProjectCategory;
                });

        Project project = new Project();
        project.setName(createProjectDTO.getName());
        project.setDescription(createProjectDTO.getDescription());
        project.setCategory(projectCategory);

        projectRepository.save(project);
        return mapToDto(project);
    }

    private ProjectDto mapToDto(Project project) {
        return modelMapper.map(project, ProjectDto.class);
    }
}