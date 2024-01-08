package org.example.repositories;

import org.example.entities.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PersonRepository extends JpaRepository<Person, Integer> {

    @Query
    Optional<Person> findByUsername(String name);

    Boolean existsByUsername(String username);

}
