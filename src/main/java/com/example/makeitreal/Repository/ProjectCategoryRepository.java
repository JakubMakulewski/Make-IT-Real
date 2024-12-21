package com.example.makeitreal.Repository;

import com.example.makeitreal.Model.ProjectCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectCategoryRepository extends JpaRepository<ProjectCategory, Long> {
    Optional<ProjectCategory> findOneByName(String name);
}
