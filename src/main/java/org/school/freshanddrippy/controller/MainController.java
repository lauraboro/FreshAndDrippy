package org.school.freshanddrippy.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api")
public class MainController {


	@GetMapping("/dailyRecipe")
	public ResponseEntity<Object> getDailyRecipe() {
		Map<String, Object> responseData = new HashMap<>();
		responseData.put("name", "Penne");
		return ResponseEntity.ok(responseData);
	}

}