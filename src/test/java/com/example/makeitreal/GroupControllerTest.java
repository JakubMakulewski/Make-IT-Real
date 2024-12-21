package com.example.makeitreal;

import com.example.makeitreal.Controller.GroupController;
import com.example.makeitreal.Service.GroupService;
import com.example.makeitreal.payload.GroupDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GroupControllerTest {

    @Mock
    private GroupService groupService;

    @InjectMocks
    private GroupController groupController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetGroups() {
        // Mock data
        List<GroupDto> mockGroups = Arrays.asList(
                new GroupDto(1L, "Group 1"),
                new GroupDto(2L, "Group 2")
        );

        // Mock behavior
        when(groupService.getAllGroups()).thenReturn(mockGroups);

        // Call the method
        List<GroupDto> result = groupController.getGroups(0, 10, "name", "asc");

        // Assertions
        assertEquals(2, result.size());
        assertEquals("Group 1", result.get(0).getName());
        verify(groupService, times(1)).getAllGroups();
    }

    @Test
    void testGetGroupById() {
        // Mock data
        GroupDto mockGroup = new GroupDto(1L, "Group 1");

        // Mock behavior
        when(groupService.getGroupById(1L)).thenReturn(mockGroup);

        // Call the method
        ResponseEntity<GroupDto> response = groupController.getGroupById(1L);

        // Assertions
        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Group 1", response.getBody().getName());
        verify(groupService, times(1)).getGroupById(1L);
    }

    @Test
    void testGetGroupsByProjectId() {
        // Mock data
        List<GroupDto> mockGroups = Arrays.asList(
                new GroupDto(1L, "Group 1"),
                new GroupDto(2L, "Group 2")
        );

        // Mock behavior
        when(groupService.getGroupsByProjectId(1L)).thenReturn(mockGroups);

        // Call the method
        List<GroupDto> result = groupController.getGroupsByProjectId(1L);

        // Assertions
        assertEquals(2, result.size());
        assertEquals("Group 1", result.get(0).getName());
        verify(groupService, times(1)).getGroupsByProjectId(1L);
    }
}
