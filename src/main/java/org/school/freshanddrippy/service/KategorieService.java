package org.school.freshanddrippy.service;

import org.school.freshanddrippy.entity.Kategorie;
import org.school.freshanddrippy.entity.Rezept;
import org.school.freshanddrippy.repository.KategorieRepository;
import org.school.freshanddrippy.repository.RezeptRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KategorieService {
    private final KategorieRepository kategorieRepository;

    public KategorieService(KategorieRepository kategorieRepository) {
        this.kategorieRepository = kategorieRepository;
    }

    public List<Kategorie> getAllKategorien() {

        return kategorieRepository.findAll();
    }
}
