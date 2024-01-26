-- Auswahl aller Zutaten, die keinem Rezept zugeordnet sind
SELECT z.*
FROM zutat z
         LEFT JOIN rezept_zutat rz ON z.id = rz.zutat_id
WHERE rz.zutat_id IS NULL;
