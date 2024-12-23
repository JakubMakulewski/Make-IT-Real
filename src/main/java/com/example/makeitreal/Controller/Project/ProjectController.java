package com.example.makeitreal.Controller.Project;

import com.example.makeitreal.Service.ProjectService;
import com.example.makeitreal.payload.project.CreateProjectDTO;
import com.example.makeitreal.payload.project.ProjectDto;
import com.example.makeitreal.utils.AppCostants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping()
    public ProjectDto createProject(@RequestBody CreateProjectDTO createProjectDTO) {
        return projectService.createProject(createProjectDTO);
    }
    @GetMapping
    public List<ProjectDto> getAllProjects(
            @RequestParam(value = "pageNo", defaultValue = AppCostants.DEAFULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = AppCostants.DEFAUL_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppCostants.DEAFULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppCostants.DEFAULT_SORT_DIRECTION, required = false) String sortDir
    ) {
        return projectService.getAllProjects();
    }
}
