package org.school.freshanddrippy.controller;

import org.school.freshanddrippy.dto.ZutatMengeDto;
import org.school.freshanddrippy.entity.RezeptZutat;
import org.school.freshanddrippy.service.RezeptService;
import org.school.freshanddrippy.service.ZutatRezeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
public class ZutatenRezeptController {

    @Autowired
    private ZutatRezeptService zutatRezeptService;

    @GetMapping("/{recipeId}/zutaten")
    public ResponseEntity<List<RezeptZutat>> getZutatenForRecipe(@PathVariable int recipeId) {
        List<RezeptZutat> zutaten = zutatRezeptService.getByRezeptId(recipeId);
        if (zutaten.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(zutaten);
    }
}
