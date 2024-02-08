-- Berechnung der durchschnittlichen Nährwerte aller Bestellungen eines Kunden
WITH naehrstoffe_bestellungen AS (
    SELECT br.bestellung_id,
           SUM(n.ballaststoffe * br.menge * rz.menge) AS durchschnitt_ballaststoffe,
           SUM(n.fett * br.menge * rz.menge)          AS durchschnitt_fett,
           SUM(n.gesaettigte_fettsaeuren * br.menge * rz.menge) AS durchschnitt_gesaettigte_fettsaeuren,
           SUM(n.kalorien * br.menge * rz.menge)      AS durchschnitt_kalorien,
           SUM(n.kohlenhydrate * br.menge * rz.menge) AS durchschnitt_kohlenhydrate,
           SUM(n.natrium * br.menge * rz.menge)       AS durchschnitt_natrium,
           SUM(n.proteine * br.menge * rz.menge)      AS durchschnitt_proteine,
           SUM(n.zucker * br.menge * rz.menge)        AS durchschnitt_zucker
    FROM naehrstoffe n
             JOIN zutat z ON n.zutat_id = z.id
             JOIN rezept_zutat rz ON z.id = rz.zutat_id
             JOIN bestellung_rezept br ON rz.rezept_id = br.rezept_id
             JOIN bestellung b ON br.bestellung_id = b.id
             JOIN kunde k ON b.kunde_id = k.id
    WHERE k.id = '1'
    GROUP BY br.bestellung_id
)
SELECT AVG(durchschnitt_ballaststoffe) AS durchschnitt_ballaststoffe,
       AVG(durchschnitt_fett) AS durchschnitt_fett,
       AVG(durchschnitt_gesaettigte_fettsaeuren) AS durchschnitt_gesaettigte_fettsaeuren,
       AVG(durchschnitt_kalorien) AS durchschnitt_kalorien,
       AVG(durchschnitt_kohlenhydrate) AS durchschnitt_kohlenhydrate,
       AVG(durchschnitt_natrium) AS durchschnitt_natrium,
       AVG(durchschnitt_proteine) AS durchschnitt_proteine,
       AVG(durchschnitt_zucker) AS durchschnitt_zucker
FROM naehrstoffe_bestellungen;