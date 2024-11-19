package com.example.makeitreal.Repository;

import com.example.makeitreal.Model.Group;
import com.example.makeitreal.Model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    Optional<Project> findById(Long id);

}
