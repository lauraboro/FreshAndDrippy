package org.school.freshanddrippy.repository;

import org.school.freshanddrippy.entity.Beschraenkung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BeschraenkungRepository extends JpaRepository<Beschraenkung, Long> {

    @Query("SELECT b FROM Beschraenkung b order by b.id asc")
    List<Beschraenkung> findAll();
}