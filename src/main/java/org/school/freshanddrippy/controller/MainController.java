package org.school.freshanddrippy.controller;

import org.school.freshanddrippy.dto.NeuesRezeptRequest;
import org.school.freshanddrippy.entity.Rezept;
import org.school.freshanddrippy.entity.Zutat;
import org.school.freshanddrippy.service.RezeptService;
import org.school.freshanddrippy.service.ZutatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class MainController {

    private final RezeptService rezeptService;
    private final ZutatService zutatService;

    public MainController(RezeptService rezeptService, ZutatService zutatService) {
        this.rezeptService = rezeptService;
        this.zutatService = zutatService;
    }

    @GetMapping("/allRezepte")
    public List<Rezept> getAllRezepte() {
        return rezeptService.getAllRezepte();
    }

    @GetMapping("/allZutaten")
    public List<Zutat> getAllZutaten() {
        return zutatService.getAllZutaten();
    }

    @PostMapping("/rezepte/createRezept")
    public void createNeuesRezept(@RequestBody NeuesRezeptRequest request) {
        rezeptService.createRezept(request);
    }
}
