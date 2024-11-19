package com.example.makeitreal.Repository;

import com.example.makeitreal.Model.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {


    List<Group> findByProjectId(Long projectId);
}
