package org.school.freshanddrippy.repository;

import org.school.freshanddrippy.entity.Zutat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ZutatRepository extends JpaRepository<Zutat, Long> {

    @Query("SELECT z FROM Zutat z order by z.name asc")
    List<Zutat> findAll();
}
