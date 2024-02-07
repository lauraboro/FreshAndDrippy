package org.school.freshanddrippy.controller;

import org.school.freshanddrippy.dto.ZutatMengeDto;
import org.school.freshanddrippy.entity.Rezept;
import org.school.freshanddrippy.service.RezeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/rezept")
public class RecipeController {

    @Autowired
    private RezeptService rezeptService;

    @GetMapping("/{id}")
    public String getResourceById(@PathVariable int id, Model model) throws Exception {
        Rezept rezept = rezeptService.findById(id);
        model.addAttribute("recipe", rezept);
        return "rezeptDetails"; // return the name of Thymeleaf template to render
    }
}
