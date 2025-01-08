package com.example.makeitreal.payload;

import com.example.makeitreal.Model.Task;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
    @NotNull
    private Long assignee;
    private boolean isCompleted;
    @NotEmpty
    private String taskType;
    private Long thread;
    @NotNull
    private Long projectId;
}