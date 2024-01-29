package org.school.freshanddrippy.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.school.freshanddrippy.entity.Rezept;
import org.school.freshanddrippy.service.RezeptService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;


import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class MainController {


	@GetMapping("/dailyRecipe")
	public ResponseEntity<Object> getDailyRecipe() {
		Map<String, Object> responseData = new HashMap<>();
		responseData.put("name", "Penne");
		return ResponseEntity.ok(responseData);
	}

    private final RezeptService rezeptService;

    public MainController(RezeptService rezeptService) {
        this.rezeptService = rezeptService;
    }

    @GetMapping("/allRezepte")
    public List<Rezept> getAllRezepte() {
        return rezeptService.getAllRezepte();
    }
}