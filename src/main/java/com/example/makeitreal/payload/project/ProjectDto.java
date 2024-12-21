package com.example.makeitreal.payload.project;

import com.example.makeitreal.payload.GroupDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

/**
 * DTO for {@link com.example.makeitreal.Model.Project}
 */
@Data
@AllArgsConstructor
public class ProjectDto  {
    Long id;
    String name;
    String description;
    List<GroupDto> groups;
}