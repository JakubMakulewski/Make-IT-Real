package com.example.makeitreal.Service;

import com.example.makeitreal.payload.TaskDto;

import java.util.List;

public interface TaskService {
    List<TaskDto> getAllTasks(int pageNo, int pageSize, String sortBy, String sortDir);
    TaskDto getTaskById(Long id);
    List<TaskDto> getTasksByProjectId(Long projectId);
    TaskDto createTask(TaskDto taskDto);
    TaskDto updateTask(Long taskId, TaskDto taskDto);
    void deleteTask(Long taskId);
}

