package com.example.makeitreal.payload;

import com.example.makeitreal.Model.Task;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

/**
 * DTO for {@link Task}
 */
@Data
public class TaskDto {
    private Long id;
    @NotEmpty
    private String title;
    @NotEmpty
    private String description;
    @NotEmpty
    private Long assignee;
    private boolean isCompleted;
    private String taskType;
    private Long thread;
}