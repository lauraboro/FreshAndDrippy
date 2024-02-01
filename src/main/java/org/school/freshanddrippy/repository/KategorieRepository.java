package org.school.freshanddrippy.repository;

import org.school.freshanddrippy.entity.Kategorie;
import org.school.freshanddrippy.entity.Rezept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KategorieRepository extends JpaRepository<Kategorie, Long> {

    @Query("SELECT k FROM Kategorie k order by k.name asc")
    List<Kategorie> findAll();
}
