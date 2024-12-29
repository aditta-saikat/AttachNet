package com.example.AttachNet.repository;

import com.example.AttachNet.model.users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userRepository extends JpaRepository<users, Long> {
    // Additional queries can be added if needed
}
