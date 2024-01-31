package org.school.freshanddrippy.controller;

import org.school.freshanddrippy.dto.KategorieRequest;
import org.school.freshanddrippy.entity.Kategorie;
import org.school.freshanddrippy.entity.Rezept;
import org.school.freshanddrippy.service.RezeptService;
import org.school.freshanddrippy.service.KategorieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class MainController {

    private final RezeptService rezeptService;
    private final KategorieService kategorieService;

    public MainController(RezeptService rezeptService, KategorieService kategorieService) {
        this.rezeptService = rezeptService;
		this.kategorieService = kategorieService;
	}

    @GetMapping("/allRezepte")
    public List<Rezept> getAllRezepte() {
        return rezeptService.getAllRezepte();
    }

	@GetMapping("/allKategorien")
	public List<Kategorie> getAllKategorien() {
		return kategorieService.getAllKategorien();
	}

	@PostMapping("/sendKategorieUpdate")
	public ResponseEntity<String> receiveKategorie(@RequestBody KategorieRequest categoryRequest) {
		kategorieService.saveKategorie(categoryRequest);

		return ResponseEntity.ok("Kategorie saved");
	}
}
