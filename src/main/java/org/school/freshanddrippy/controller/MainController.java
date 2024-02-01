package org.school.freshanddrippy.controller;

import org.school.freshanddrippy.dto.KategorieRequest;
import org.school.freshanddrippy.dto.NeuesRezeptRequest;
import org.school.freshanddrippy.entity.Kategorie;
import org.school.freshanddrippy.entity.Rezept;
import org.school.freshanddrippy.entity.Zutat;
import org.school.freshanddrippy.service.KategorieService;
import org.school.freshanddrippy.service.RezeptService;
import org.school.freshanddrippy.service.ZutatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class MainController {

    private final RezeptService rezeptService;
    private final ZutatService zutatService;
    private final KategorieService kategorieService;

    public MainController(RezeptService rezeptService, KategorieService kategorieService, ZutatService zutatService) {
        this.rezeptService = rezeptService;
        this.zutatService = zutatService;
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

    @GetMapping("/randomRezept")
    public Rezept getRandomRezept() {
        return rezeptService.getRandomRezept();
    }

    @GetMapping("/allZutaten")
    public List<Zutat> getAllZutaten() {
        return zutatService.getAllZutaten();
    }

    @PostMapping("/rezepte/createRezept")
    public ResponseEntity<NeuesRezeptRequest> createNeuesRezept(@RequestBody NeuesRezeptRequest request) {
        return rezeptService.createRezept(request);
    }
}
