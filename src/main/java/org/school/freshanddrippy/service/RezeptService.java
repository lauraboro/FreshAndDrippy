package org.school.freshanddrippy.service;

import org.school.freshanddrippy.dto.KategorieRequest;
import org.school.freshanddrippy.dto.NeuesRezeptRequest;
import org.school.freshanddrippy.dto.ZutatMengeDto;
import org.school.freshanddrippy.entity.Kategorie;
import org.school.freshanddrippy.entity.Rezept;
import org.school.freshanddrippy.entity.RezeptZutat;
import org.school.freshanddrippy.entity.Zutat;
import org.school.freshanddrippy.repository.RezeptRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class RezeptService {
    private final RezeptRepository rezeptRepository;

    public RezeptService(RezeptRepository rezeptRepository) {
        this.rezeptRepository = rezeptRepository;
    }

    public List<Rezept> getAllRezepte() {

        return rezeptRepository.findAll();
    }

    public ResponseEntity<NeuesRezeptRequest> createRezept(NeuesRezeptRequest request) {
        try {
            Rezept rezept = new Rezept();

            rezept.setName(request.getName());
            rezept.setBeschreibung(request.getDescription());
            rezept.setZubereitungsdauer(request.getDuration());

            Set<RezeptZutat> rezeptZutaten = new HashSet<>();
            for (ZutatMengeDto zutatMengeDto : request.getZutaten()) {
                Zutat zutat = new Zutat();
                zutat.setId(zutatMengeDto.getZutatId());

                RezeptZutat rezeptZutat = new RezeptZutat();
                rezeptZutat.setRezept(rezept);
                rezeptZutat.setZutat(zutat);
                rezeptZutat.setMenge(zutatMengeDto.getMenge());

                rezeptZutaten.add(rezeptZutat);
            }
            rezept.setZutats(rezeptZutaten);

            Set<Kategorie> kategorien = new HashSet<>();
            for (KategorieRequest kategorieRequest : request.getKategorien()) {
                Kategorie kategorie = new Kategorie();
                kategorie.setId(kategorieRequest.getId());

                kategorien.add(kategorie);
            }
            rezept.setKategories(kategorien);

            rezeptRepository.save(rezept);
            return new ResponseEntity<>(request, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Rezept getRandomRezept() {

        return rezeptRepository.findRandomRezept();
    }
}
