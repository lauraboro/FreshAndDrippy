package org.school.freshanddrippy.service;

import org.school.freshanddrippy.entity.Rezept;
import org.school.freshanddrippy.repository.RezeptRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RezeptService {
    private final RezeptRepository rezeptRepository;

    public RezeptService(RezeptRepository rezeptRepository) {
        this.rezeptRepository = rezeptRepository;
    }

    public List<Rezept> getAllRezepte() {

        return rezeptRepository.findAll();
    }

    public Rezept getRandomRezept() {

        return rezeptRepository.findRandomRezept();
    }
}
