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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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
    public Page<ProjectDto> getAllProjects(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = Sort.by(sortBy);
        if (sortDir.equals("asc")) {
            sort = sort.ascending();
        } else if (sortDir.equals("desc")) {
            sort = sort.descending();
        }

        Pageable sortedAndPaginated = PageRequest.of(pageNo, pageSize, sort);
        Page<Project> projects = projectRepository.findAll(sortedAndPaginated);
        return projects.map(this::mapToDto);
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
        projectDto.setCategory(project.getCategory().getName());
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
    @Override
    public ProjectDto getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        return mapToDto(project);
    }

    @Override
    public ProjectDto updateProject(Long id, CreateProjectDTO updatedProjectDTO) {

        Project existingProject = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        existingProject.setName(updatedProjectDTO.getName());
        existingProject.setDescription(updatedProjectDTO.getDescription());

        ProjectCategory projectCategory = projectCategoryRepository.findOneByName(updatedProjectDTO.getCategory())
                .orElseGet(() -> {
                    ProjectCategory newCategory = new ProjectCategory();
                    newCategory.setName(updatedProjectDTO.getCategory());
                    projectCategoryRepository.save(newCategory);
                    return newCategory;
                });
        existingProject.setCategory(projectCategory);

        projectRepository.save(existingProject);
        return mapToDto(existingProject);
    }

    @Override
    public void deleteProject(Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        projectRepository.delete(project);
    }

}