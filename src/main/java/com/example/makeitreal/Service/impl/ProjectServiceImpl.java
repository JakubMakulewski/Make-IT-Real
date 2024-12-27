package com.example.makeitreal.Service.impl;

import com.example.makeitreal.Model.Group;
import com.example.makeitreal.Model.Project;
import com.example.makeitreal.Model.ProjectCategory;
import com.example.makeitreal.Model.User;
import com.example.makeitreal.Repository.ProjectCategoryRepository;
import com.example.makeitreal.Repository.ProjectRepository;
import com.example.makeitreal.Service.ProjectService;
import com.example.makeitreal.payload.GroupDto;
import com.example.makeitreal.payload.project.CreateProjectDTO;
import com.example.makeitreal.payload.project.ProjectDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

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

//        Project project = new Project();
//        project.setName(createProjectDTO.getName());
//        project.setDescription(createProjectDTO.getDescription());
        Project project = modelMapper.map(createProjectDTO, Project.class);
        project.setCategory(projectCategory);

        projectRepository.save(project);
        return mapToDto(project);
    }

    @Override
    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    //    private ProjectDto mapToDto(Project project) {
//        return modelMapper.map(project, ProjectDto.class);
//    }
    private ProjectDto mapToDto(Project project) {
        ProjectDto projectDto = new ProjectDto();
        projectDto.setId(project.getId());
        projectDto.setName(project.getName());
        projectDto.setDescription(project.getDescription());
        projectDto.setGroups(project.getGroups().stream()
                .map(this::mapGroupToDto) // Zamieniamy List<Group> na List<GroupDto>
                .collect(Collectors.toList()));
        return projectDto;

    }
    private GroupDto mapGroupToDto(Group group) {
        GroupDto groupDto = new GroupDto();
        groupDto.setId(group.getId());
        groupDto.setName(group.getName());
        groupDto.setUsers(group.getUsers().stream().map(User::getId).toList());
        groupDto.setProjectId(group.getProject().getId());
        return groupDto;
    }
}