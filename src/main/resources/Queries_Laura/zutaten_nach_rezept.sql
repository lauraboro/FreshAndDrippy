-- Auswahl aller Zutaten eines Rezeptes nach Rezeptname
SELECT z.*
FROM zutat z
        JOIN rezept_zutat rz ON z.id = rz.zutat_id
        JOIN rezept r ON rz.rezept_id = r.id
WHERE r.name = 'Nudelsuppe';