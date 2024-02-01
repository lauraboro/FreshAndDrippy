-- Geld, dass best. Kunde insgesamt bereits ausgegeben hat (Mindestens 3 weitere SQL-Abfragen 2/3)
SELECT SUM(bestellung.gesamtpreis)
FROM bestellung
         JOIN kunde ON bestellung.kunde_id = kunde.id
WHERE kunde.email = 'k.wellensteyn@yahoo.de';