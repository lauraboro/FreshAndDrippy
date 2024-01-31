package org.school.freshanddrippy.repository;

import org.school.freshanddrippy.entity.Rezept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RezeptRepository extends JpaRepository<Rezept, Long> {

    @Query("SELECT r FROM Rezept r")
    List<Rezept> findAll();

    @Query(value = "SELECT r.id, r.name, r.beschreibung, r.bild, r.zubereitungsdauer FROM Rezept r ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    Rezept findRandomRezept();

}
