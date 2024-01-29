-- Ein zufälliges Rezept (Mindestens 3 weitere SQL-Abfragen 1/3)
SELECT *
FROM rezept
ORDER BY RANDOM()
LIMIT 1;