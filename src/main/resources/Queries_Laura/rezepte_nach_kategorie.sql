SELECT r.*
FROM rezept r
         JOIN rezept_kategorie rk ON r.id = rk.rezept_id
         JOIN kategorie k ON rk.kategorie_id = k.id
WHERE k.name = 'placeholder';
