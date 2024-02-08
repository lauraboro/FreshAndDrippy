package org.school.freshanddrippy.service;

import org.school.freshanddrippy.dto.ZutatRequest;
import org.school.freshanddrippy.entity.Zutat;
import org.school.freshanddrippy.repository.ZutatRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ZutatService {
    private final ZutatRepository zutatRepository;

    public ZutatService(ZutatRepository zutatRepository) {
        this.zutatRepository = zutatRepository;
    }

    public List<Zutat> getAllZutaten() {
        return zutatRepository.findAll();
    }

    public void saveZutat(ZutatRequest zutatRequest) {
        Zutat editZutat = getZutat(zutatRequest.id);
        editZutat.setName(zutatRequest.name);
        editZutat.setEinheit(zutatRequest.einheit);
        editZutat.setGesamtpreis(BigDecimal.valueOf(0.5));
        editZutat.setBeschraenkungs(zutatRequest.getBeschraenkungs());
        zutatRepository.save(editZutat);
    }

    private Zutat getZutat(int id) {
        if (zutatRepository.findById((long) id).isPresent()) {
            return zutatRepository.findById((long) id).get();
        }
        return new Zutat();
    }
}
