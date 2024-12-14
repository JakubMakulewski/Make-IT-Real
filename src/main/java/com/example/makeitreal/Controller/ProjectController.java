package com.example.makeitreal.Controller;

import com.example.makeitreal.Service.ProjectService;
import com.example.makeitreal.payload.project.CreateProjectDTO;
import com.example.makeitreal.payload.project.ProjectDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("projects")
public class ProjectController {
    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ProjectDto createProject(@RequestBody CreateProjectDTO createProjectDTO) {
        return projectService.createProject(createProjectDTO);
    }
}
