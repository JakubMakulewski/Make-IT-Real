package com.example.makeitreal.Repository;

import com.example.makeitreal.Model.Project;
import com.example.makeitreal.Model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    Optional<Task> findById(Long id);
    List<Task> findAllByTaskType(String taskType);//nie wiem po co to?
    List<Task> findByProject(Project project);//raczej potrzebne do laczenia taskow z projektami.
    List<Task> findByAssignee(Long assigneeId);
}
