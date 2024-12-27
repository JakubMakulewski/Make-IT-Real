package com.example.makeitreal.Service.impl;

import com.example.makeitreal.Exceptions.ResourceNotFoundException;
import com.example.makeitreal.Model.Project;
import com.example.makeitreal.Model.Task;
import com.example.makeitreal.Model.User;
import com.example.makeitreal.Repository.ProjectRepository;
import com.example.makeitreal.Repository.TaskRepository;
import com.example.makeitreal.Repository.UserRepository;
import com.example.makeitreal.Service.TaskService;
import com.example.makeitreal.payload.TaskDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, ProjectRepository projectRepository, ModelMapper modelMapper,UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
    }

    @Override
    public List<TaskDto> getAllTasks(int pageNo, int pageSize, String sortBy, String sortDir) {
        List<Task> tasks = taskRepository.findAll();
        return tasks.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public TaskDto getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", id));
        return mapToDto(task);
    }

    @Override
    public List<TaskDto> getTasksByProjectId(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", projectId));
        List<Task> tasks = taskRepository.findByProject(project);
        return tasks.stream().map(this::mapToDto).collect(Collectors.toList());
    }
    @Override
    public List<TaskDto> getTasksByUserId(Long assigneeId) {
        // Validate that the user exists
        User user = userRepository.findById(assigneeId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", assigneeId));

        // Fetch tasks assigned to the user
        List<Task> tasks = taskRepository.findByAssignee(assigneeId);

        // Map tasks to DTOs
        return tasks.stream().map(this::mapToDto).collect(Collectors.toList());
    }


    @Override
    public TaskDto createTask(TaskDto taskDto) {
        Project project = projectRepository.findById(taskDto.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", taskDto.getProjectId()));

        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setAssignee(taskDto.getAssignee());
        task.setCompleted(taskDto.isCompleted());
        task.setTaskType(taskDto.getTaskType());
        task.setThread(taskDto.getThread());
        task.setProject(project);

        Task savedTask = taskRepository.save(task);
        return mapToDto(savedTask);
    }

    @Override
    public TaskDto updateTask(Long taskId, TaskDto taskDto) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));

        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setAssignee(taskDto.getAssignee());
        task.setCompleted(taskDto.isCompleted());
        task.setTaskType(taskDto.getTaskType());
        task.setThread(taskDto.getThread());

        Project project = projectRepository.findById(taskDto.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", taskDto.getProjectId()));
        task.setProject(project);

        Task updatedTask = taskRepository.save(task);
        return mapToDto(updatedTask);
    }

    @Override
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));
        taskRepository.delete(task);
    }

    private Task mapToEntity(TaskDto taskDto) {
        return modelMapper.map(taskDto, Task.class);
    }

    private TaskDto mapToDto(Task task) {
        TaskDto taskDto = new TaskDto();
        taskDto.setId(task.getId());
        taskDto.setTitle(task.getTitle());
        taskDto.setDescription(task.getDescription());
        taskDto.setAssignee(task.getAssignee());
        taskDto.setCompleted(task.isCompleted());
        taskDto.setTaskType(task.getTaskType());
        taskDto.setThread(task.getThread());
        taskDto.setProjectId(task.getProject().getId());
        return taskDto;
    }
}
