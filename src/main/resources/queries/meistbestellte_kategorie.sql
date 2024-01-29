-- Kategorien sortiert nach Bestellungen (Mindestens 3 weitere SQL-Abfragen 3/3)
SELECT
    k.name,
    COALESCE(SUM(br.menge), 0) AS gesamtmenge_bestellt,
    COALESCE(COUNT(br.bestellung_id), 0) AS anzahl_bestellungen
FROM
    kategorie k
        LEFT JOIN
    rezept_kategorie rk ON k.id = rk.kategorie_id
        LEFT JOIN
    bestellung_rezept br ON rk.rezept_id = br.rezept_id
GROUP BY
    k.name
ORDER BY
    gesamtmenge_bestellt DESC;

