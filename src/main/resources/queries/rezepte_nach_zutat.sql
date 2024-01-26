-- Auswahl aller Rezepte, die eine gewisse Zutat enthalten
SELECT r.*
FROM rezept r
         JOIN rezept_zutat rz ON r.id = rz.rezept_id
         JOIN zutat z ON rz.zutat_id = z.id
WHERE z.name = 'Tomate';