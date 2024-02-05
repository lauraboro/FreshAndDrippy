package org.school.freshanddrippy.service;

import org.school.freshanddrippy.dto.BeschraenkungRequest;
import org.school.freshanddrippy.entity.Beschraenkung;
import org.school.freshanddrippy.repository.BeschraenkungRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BeschraenkungService {
    private final BeschraenkungRepository beschraenkungRepository;

    public BeschraenkungService(BeschraenkungRepository beschraenkungRepository) {
        this.beschraenkungRepository = beschraenkungRepository;
    }

    public List<Beschraenkung> getAllBeschraenkungen() {
        return beschraenkungRepository.findAll();
    }

    public void saveBeschraenkung(BeschraenkungRequest beschraenkungRequest) {
        Beschraenkung editBeschraenkung = getBeschraenkung(beschraenkungRequest.getId());
        editBeschraenkung.setName(beschraenkungRequest.getName());
        beschraenkungRepository.save(editBeschraenkung);
    }

    private Beschraenkung getBeschraenkung(int id) {
        if (beschraenkungRepository.findById((long) id).isPresent()) {
            return beschraenkungRepository.findById((long) id).get();
        }
        return new Beschraenkung();
    }
}