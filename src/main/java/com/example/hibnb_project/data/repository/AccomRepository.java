package com.example.hibnb_project.data.repository;

import com.example.hibnb_project.data.entity.AccomEntity;
import com.example.hibnb_project.data.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AccomRepository extends JpaRepository<AccomEntity, Integer> {
    @Query(value = """
        SELECT *
        FROM accom a
        WHERE a.address like :address
          AND a.max_capacity >= :capacity
          AND a.accomid NOT IN (
              SELECT b.accomid
              FROM book b
              WHERE b.checkindate < :checkoutDate
                AND b.checkoutdate > :checkinDate
          )
        """, nativeQuery = true)
    List<AccomEntity> findDetailedAccom(
            @Param("address") String address,
            @Param("checkinDate") LocalDate checkinDate,
            @Param("checkoutDate") LocalDate checkoutDate,
            @Param("capacity") Integer capacity
    );

    List<AccomEntity> findByHostid(UserEntity hostid);
}
