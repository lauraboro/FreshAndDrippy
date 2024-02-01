package org.school.freshanddrippy.service;

import org.school.freshanddrippy.dto.KategorieRequest;
import org.school.freshanddrippy.entity.Kategorie;
import org.school.freshanddrippy.entity.Rezept;
import org.school.freshanddrippy.repository.KategorieRepository;
import org.school.freshanddrippy.repository.RezeptRepository;
import org.springframework.data.domain.Sort;
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

	public void saveKategorie(KategorieRequest categoryRequest) {
		Kategorie editCategory = getCategory(categoryRequest.id);
		editCategory.setName(categoryRequest.name);
		editCategory.setBeschreibung(categoryRequest.beschreibung);
		kategorieRepository.save(editCategory);
	}

	private Kategorie getCategory(int id) {
		if(kategorieRepository.findById((long)id).isPresent()) {
			return kategorieRepository.findById((long)id).get();
		}
		return new Kategorie();
	}
}
