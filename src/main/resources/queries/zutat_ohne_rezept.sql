-- Auswahl aller Zutaten, die keinem Rezept zugeordnet sind
SELECT z.*
FROM rezept_zutat rz
         RIGHT JOIN zutat z ON z.id = rz.zutat_id
WHERE rz.zutat_id IS NULL;
