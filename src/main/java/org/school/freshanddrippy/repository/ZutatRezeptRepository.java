package org.school.freshanddrippy.repository;

import org.school.freshanddrippy.dto.ZutatMengeDto;
import org.school.freshanddrippy.entity.RezeptZutat;
import org.school.freshanddrippy.entity.Zutat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ZutatRezeptRepository extends JpaRepository<RezeptZutat, Long> {

    @Query(value = "SELECT rz FROM RezeptZutat rz WHERE rz.rezept.id = :recipeId")
    List<RezeptZutat> findByRecipeId(@Param("recipeId") int recipeId);
}
