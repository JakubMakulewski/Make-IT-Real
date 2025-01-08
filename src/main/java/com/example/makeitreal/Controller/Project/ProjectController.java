package com.example.makeitreal.Controller.Project;

import com.example.makeitreal.Service.ProjectService;
import com.example.makeitreal.payload.project.CreateProjectDTO;
import com.example.makeitreal.payload.project.ProjectDto;
import com.example.makeitreal.utils.AppCostants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Page<ProjectDto>> getAllProjects(
            @RequestParam(value = "pageNo", defaultValue = AppCostants.DEAFULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = AppCostants.DEFAUL_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppCostants.DEAFULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppCostants.DEFAULT_SORT_DIRECTION, required = false) String sortDir
    ) {
        return new ResponseEntity<>(projectService.getAllProjects(pageNo, pageSize, sortBy, sortDir), HttpStatus.OK);
    }

    // Search by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable Long id) {
        ProjectDto projectDto = projectService.getProjectById(id);
        return new ResponseEntity<>(projectDto, HttpStatus.OK);
    }

    // Update Project
    @PutMapping("/{id}")
    public ResponseEntity<ProjectDto> updateProject(
            @PathVariable Long id,
            @RequestBody CreateProjectDTO updatedProjectDTO
    ) {
        ProjectDto updatedProject = projectService.updateProject(id, updatedProjectDTO);
        return new ResponseEntity<>(updatedProject, HttpStatus.OK);
    }

    // Delete Project
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return new ResponseEntity<>("Project deleted successfully", HttpStatus.OK);
    }
}
