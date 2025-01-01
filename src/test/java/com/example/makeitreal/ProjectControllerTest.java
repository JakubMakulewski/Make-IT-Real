package com.example.makeitreal;

import com.example.makeitreal.Controller.Project.ProjectController;
import com.example.makeitreal.Service.ProjectService;
import com.example.makeitreal.payload.GroupDto;
import com.example.makeitreal.payload.project.CreateProjectDTO;
import com.example.makeitreal.payload.project.ProjectDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProjectControllerTest {

    @Mock
    private ProjectService projectService;

    @InjectMocks
    private ProjectController projectController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateProject() {
        // Mock data
        List<GroupDto> list = new ArrayList<>();
        CreateProjectDTO createProjectDTO = new CreateProjectDTO("New Project","Desc", "kategoria");
        ProjectDto mockProject = new ProjectDto(1L, "New Project", "Desc", list, "kategoria");

        // Mock behavior
        when(projectService.createProject(createProjectDTO)).thenReturn(mockProject);

        // Call the method
        ProjectDto result = projectController.createProject(createProjectDTO);

        // Assertions
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("New Project", result.getName());
        verify(projectService, times(1)).createProject(createProjectDTO);
    }
}
