package com.example.hibnb_project.data.repository;

import com.example.hibnb_project.data.entity.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Integer> {
    @Query(value = "SELECT * FROM book WHERE username=:username", nativeQuery = true)
    List<BookEntity> findAllByUsername(@Param("username") String username);

    List<BookEntity> findTop5ByOrderByAccomidDesc();
}
