package org.school.freshanddrippy.repository;

import org.school.freshanddrippy.entity.Rezept;
import org.school.freshanddrippy.entity.Zutat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RezeptRepository extends JpaRepository<Rezept, Long> {

    @Query("SELECT DISTINCT r FROM Rezept r " + "LEFT JOIN FETCH r.kategories " + "LEFT JOIN FETCH r.zutats rz " + "LEFT JOIN FETCH rz.zutat")
    List<Rezept> findAll();

    @Query(value = "SELECT r.id, r.name, r.beschreibung, r.bild, r.zubereitungsdauer FROM Rezept r ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    Rezept findRandomRezept();

	@Query("SELECT SUM(rzm.menge * z.gesamtpreis) FROM RezeptZutat rzm JOIN rzm.zutat z WHERE rzm.rezept.id = :rezeptId")
	float getCosts(@Param("rezeptId") Long rezeptId);

}
