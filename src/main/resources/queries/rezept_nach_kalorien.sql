-- Auswahl aller Rezepte, die eine bestimmte Kalorienmenge nicht überschreiten
WITH rezept_kalorien AS (
    SELECT
        rz.rezept_id,
        SUM(n.kalorien * rz.menge) AS gesamt_kalorien
    FROM
        rezept_zutat rz
            JOIN
        naehrstoffe n ON rz.zutat_id = n.zutat_id
    GROUP BY
        rz.rezept_id
)
SELECT
    r.*
FROM
    rezept r
        JOIN
    rezept_kalorien rk ON r.id = rk.rezept_id
WHERE
    rk.gesamt_kalorien <= 1000;
