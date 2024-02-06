package org.school.freshanddrippy.service;

import org.school.freshanddrippy.entity.RezeptZutat;
import org.school.freshanddrippy.repository.ZutatRezeptRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZutatRezeptService {
    private final ZutatRezeptRepository zutatRezeptRepository;

    public ZutatRezeptService(ZutatRezeptRepository zutatRezeptRepository) {
        this.zutatRezeptRepository = zutatRezeptRepository;
    }

    public List<RezeptZutat> getByRezeptId(int rezeptId) {

        return zutatRezeptRepository.findByRecipeId(rezeptId);
    }
}
