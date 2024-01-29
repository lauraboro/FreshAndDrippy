package org.school.freshanddrippy.controller;

import org.school.freshanddrippy.entity.Rezept;
import org.school.freshanddrippy.service.RezeptService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class MainController {

    private final RezeptService rezeptService;

    public MainController(RezeptService rezeptService) {
        this.rezeptService = rezeptService;
    }

    @GetMapping("/allRezepte")
    public List<Rezept> getAllRezepte() {
        return rezeptService.getAllRezepte();
    }
}
