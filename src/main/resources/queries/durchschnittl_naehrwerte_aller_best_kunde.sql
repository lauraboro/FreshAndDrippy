-- Berechnung der durchschnittlichen Nährwerte aller Bestellungen eines Kunden
WITH naehrstoffe_bestellungen AS (
    SELECT br.bestellung_id,
           AVG(n.ballaststoffe * br.menge) AS durchschnitt_ballaststoffe,
           AVG(n.fett * br.menge)          AS durchschnitt_fett,
           AVG(n.gesaettigte_fettsaeuren * br.menge) AS durchschnitt_gesaettigte_fettsaeuren,
           AVG(n.kalorien * br.menge)      AS durchschnitt_kalorien,
           AVG(n.kohlenhydrate * br.menge) AS durchschnitt_kohlenhydrate,
           AVG(n.natrium * br.menge)       AS durchschnitt_natrium,
           AVG(n.proteine * br.menge)      AS durchschnitt_proteine,
           AVG(n.zucker * br.menge)        AS durchschnitt_zucker
    FROM naehrstoffe n
             JOIN zutat z ON n.zutat_id = z.id
             JOIN rezept_zutat rz ON z.id = rz.zutat_id
             JOIN bestellung_rezept br ON rz.rezept_id = br.rezept_id
             JOIN bestellung b ON br.bestellung_id = b.id
             JOIN kunde k ON b.kunde_id = k.id
    WHERE k.id = '101'
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