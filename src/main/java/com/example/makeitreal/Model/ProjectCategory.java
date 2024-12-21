package com.example.makeitreal.Model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "project_categories")
public class ProjectCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // NOTE: Maybe should be unique
    private String name;

    @OneToMany(mappedBy = "category")
    private List<Project> projects;
}
