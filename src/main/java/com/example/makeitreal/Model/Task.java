package com.example.makeitreal.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Column(name = "assignee_id") // Użycie nazwy kolumny w bazie danych
    private Long assignee;

    @Column(name = "is_completed") // Użycie czytelniejszej nazwy
    private boolean isCompleted;

    @Column(name = "task_type")
    private String taskType;

    @Column(name = "thread_id")
    private Long thread;

    @ManyToOne
    @JoinColumn(name = "project_id",nullable = false)
    private Project project;
}
