-- Gesamteinnahmen minus Gesamtausgaben (Gesamtverdienst Fresh and Drippy) (Mindestens 3 weitere SQL-Abfragen 4/3)
-- Berechne den Gesamtgewinn für jede Bestellung
WITH bestellungen_gewinn AS (
    SELECT
        b.id,
        SUM(rz.menge * z.nettopreis) AS gesamtkosten_pro_bestellung
    FROM
        bestellung b
            INNER JOIN
        bestellung_rezept br ON b.id = br.id
            INNER JOIN
        rezept r ON br.id = r.id
            INNER JOIN
        rezept_zutat rz ON r.id = rz.id
            INNER JOIN
        zutat z ON rz.id = z.id
    GROUP BY
        b.id
),

-- Berechne den Gesamtgewinn aus allen Bestellungen
     gesamtgewinn AS (
         SELECT
             SUM(gesamtpreis) AS gesamtumsatz,
             SUM(gesamtkosten_pro_bestellung) AS gesamtkosten,
             SUM(gesamtpreis) - SUM(gesamtkosten_pro_bestellung) AS gesamtgewinn
         FROM
             bestellungen_gewinn
                 INNER JOIN
             bestellung b ON bestellungen_gewinn.id = b.id
     )

-- Gib den Gesamtgewinn aus
SELECT
    gesamtumsatz,
    gesamtkosten,
    gesamtgewinn
FROM
    gesamtgewinn;


