package org.school.freshanddrippy.service;

import org.school.freshanddrippy.entity.Zutat;
import org.school.freshanddrippy.repository.ZutatRepository;
import org.springframework.stereotype.Service;

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
}
