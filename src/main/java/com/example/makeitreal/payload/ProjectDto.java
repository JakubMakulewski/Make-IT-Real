package com.example.makeitreal.payload;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link com.example.makeitreal.Model.Project}
 */
@Data
public class ProjectDto  {
    Long id;
    String name;
    String description;
    List<GroupDto> groups;
}