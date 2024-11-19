package com.example.makeitreal.Repository;

import com.example.makeitreal.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users,Long> {

    Optional<Users> findById(Long id);
    Optional<Users> findByEmail(String name);
}
