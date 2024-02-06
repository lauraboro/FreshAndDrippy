INSERT INTO kunde (name, vorname, geburtstag, telefonnummer, email)
VALUES ('Wellensteyn', 'Kira', '1990-05-05', '040/443322', 'k.wellensteyn@yahoo.de'),
       ('Foede', 'Dorothea', '2000-03-24', '040/543822', 'd.foede@web.de'),
       ('Leberer', 'Sigrid', '1989-09-21', '0175/1234588', 'sigrid@leberer.de'),
       ('Soerensen', 'Hanna', '1974-04-03', '040/634578', 'h.soerensen@yahoo.de'),
       ('Schnitter', 'Marten', '1964-04-17', '0176/447587', 'schni_mart@gmail.com'),
       ('Maurer', 'Belinda', '1978-09-09', '040/332189', 'belinda1978@yahoo.de'),
       ('Gessert', 'Armin', '1978-01-29', '040/67890', 'armin@gessert.de'),
       ('Haessig', 'Jean-Marc', '1982-08-30', '0178-67013390', 'jm@haessig.de'),
       ('Urocki', 'Eric', '1999-12-04', '0152-96701390', 'urocki@outlook.de');

INSERT INTO adresse (strasse, hausnummer, hausnummerzusatz, postleitzahl, stadt, land)
VALUES ('Eppendorfer Landstrasse', '104', null, '20249', 'Hamburg', 'Deutschland'),
       ('Ohmstraße', '23', null, '22765', 'Hamburg', 'Deutschland'),
       ('Bilser Berg', '6', null, '20459', 'Hamburg', 'Deutschland'),
       ('Alter Teichweg', '95', null, '22049', 'Hamburg', 'Deutschland'),
       ('Stübels', '10', null, '22835', 'Barsbüttel', 'Deutschland'),
       ('Grotelertwiete', '4', 'a', '21075', 'Hamburg', 'Deutschland'),
       ('Küstersweg', '3', null, '21079', 'Hamburg', 'Deutschland'),
       ('Neugrabener Bahnhofstraße', '30', null, '21149', 'Hamburg', 'Deutschland'),
       ('Elbchaussee', '228', null, '22605', 'Hamburg', 'Deutschland');

-- Insert customer addresses

INSERT INTO kunde_adresse (kunde_id, adresse_id)
VALUES ((SELECT id FROM kunde WHERE name = 'Wellensteyn'),
        (SELECT id FROM adresse WHERE strasse = 'Eppendorfer Landstrasse')),
       ((SELECT id FROM kunde WHERE name = 'Foede'), (SELECT id FROM adresse WHERE strasse = 'Ohmstraße')),
       ((SELECT id FROM kunde WHERE name = 'Leberer'), (SELECT id FROM adresse WHERE strasse = 'Bilser Berg')),
       ((SELECT id FROM kunde WHERE name = 'Soerensen'), (SELECT id FROM adresse WHERE strasse = 'Alter Teichweg')),
       ((SELECT id FROM kunde WHERE name = 'Schnitter'), (SELECT id FROM adresse WHERE strasse = 'Stübels')),
       ((SELECT id FROM kunde WHERE name = 'Maurer'), (SELECT id FROM adresse WHERE strasse = 'Grotelertwiete')),
       ((SELECT id FROM kunde WHERE name = 'Gessert'), (SELECT id FROM adresse WHERE strasse = 'Küstersweg')),
       ((SELECT id FROM kunde WHERE name = 'Haessig'),
        (SELECT id FROM adresse WHERE strasse = 'Neugrabener Bahnhofstraße')),
       ((SELECT id FROM kunde WHERE name = 'Urocki'), (SELECT id FROM adresse WHERE strasse = 'Elbchaussee'));;


INSERT INTO adresse (strasse, hausnummer, hausnummerzusatz, postleitzahl, stadt, land)
VALUES ('Dorfstraße', '74', null, '24354', 'Weseby', 'Deutschland'),
       ('Westerjork', '76', null, '21635', 'Jork', 'Deutschland'),
       ('Molkereiwegkundekunde', '13', null, '19217', 'Dechow', 'Deutschland');

INSERT INTO lieferant (name, telefonnummer, email, adresse_id)
VALUES ('Bio-Hof Müller', '04354-9080', 'mueller@biohof.de',
        (SELECT id FROM adresse WHERE strasse = 'Dorfstraße')),
       ('Obst-Hof Altes Land', '04162-4523', 'info@biohof-altesland.de',
        (SELECT id FROM adresse WHERE strasse = 'Westerjork')),
       ('Molkerei Henning', '038873-8976', 'info@molkerei-henning.de',
        (SELECT id FROM adresse WHERE strasse = 'Molkereiwegkundekunde'));

-- Insert bestellungen
INSERT INTO bestellung (kunde_id, datum, gesamtpreis)
VALUES ((SELECT id FROM kunde WHERE email = 'k.wellensteyn@yahoo.de'), '2020-07-01 12:45:00'::timestamp, 6.21),
       ((SELECT id FROM kunde WHERE email = 'd.foede@web.de'), '2020-07-08 13:45:00'::timestamp, 32.96),
       ((SELECT id FROM kunde WHERE email = 'sigrid@leberer.de'), '2020-08-01 14:45:00'::timestamp, 24.08),
       ((SELECT id FROM kunde WHERE email = 'h.soerensen@yahoo.de'), '2020-08-02 15:45:00'::timestamp, 19.90),
       ((SELECT id FROM kunde WHERE email = 'schni_mart@gmail.com'), '2020-08-02 16:45:10'::timestamp, 6.47),
       ((SELECT id FROM kunde WHERE email = 'belinda1978@yahoo.de'), '2020-08-10 12:35:00'::timestamp, 6.96),
       ((SELECT id FROM kunde WHERE email = 'armin@gessert.de'), '2020-08-10 10:05:20'::timestamp, 2.41),
       ((SELECT id FROM kunde WHERE email = 'jm@haessig.de'), '2020-08-10 01:45:00'::timestamp, 13.80),
       ((SELECT id FROM kunde WHERE email = 'urocki@outlook.de'), '2020-08-10 17:05:00'::timestamp, 8.67),
       ((SELECT id FROM kunde WHERE email = 'armin@gessert.de'), '2020-08-15 20:45:00'::timestamp, 17.98),
       ((SELECT id FROM kunde WHERE email = 'schni_mart@gmail.com'), '2020-08-12 12:45:50'::timestamp, 8.67),
       ((SELECT id FROM kunde WHERE email = 'sigrid@leberer.de'), '2020-08-13 12:40:30'::timestamp, 20.87);

INSERT INTO zutat (name, einheit, nettopreis, bestand, lieferant_id)
VALUES ('Zucchini', 'Stück', 0.89, 100, (SELECT id from lieferant WHERE name = 'Bio-Hof Müller')),
       ('Zwiebel', 'Stück', 0.15, 50, (SELECT id from lieferant WHERE name = 'Bio-Hof Müller')),
       ('Tomate', 'Stück', 0.45, 50, (SELECT id from lieferant WHERE name = 'Obst-Hof Altes Land')),
       ('Schalotte', 'Stück', 0.20, 500, (SELECT id from lieferant WHERE name = 'Bio-Hof Müller')),
       ('Karotte', 'Stück', 0.30, 500, (SELECT id from lieferant WHERE name = 'Bio-Hof Müller')),
       ('Kartoffel', 'Stück', 0.15, 1500, (SELECT id from lieferant WHERE name = 'Bio-Hof Müller')),
       ('Rucola', 'Bund', 0.90, 10, (SELECT id from lieferant WHERE name = 'Bio-Hof Müller')),
       ('Lauch', 'Stück', 1.2, 35, (SELECT id from lieferant WHERE name = 'Obst-Hof Altes Land')),
       ('Knoblauch', 'Stück', 0.25, 250, (SELECT id from lieferant WHERE name = 'Obst-Hof Altes Land')),
       ('Basilikum', 'Bund', 1.3, 10, (SELECT id from lieferant WHERE name = 'Obst-Hof Altes Land')),
       ('Süßkartoffel', 'Stück', 2.0, 200, (SELECT id from lieferant WHERE name = 'Obst-Hof Altes Land')),
       ('Schnittlauch', 'Bund', 0.9, 10, (SELECT id from lieferant WHERE name = 'Obst-Hof Altes Land')),
       ('Apfel', 'Stück', 1.2, 750, (SELECT id from lieferant WHERE name = 'Bio-Hof Müller')),
       ('Hafermilch', 'Liter', 1.5, 50, (SELECT id from lieferant WHERE name = 'Bio-Hof Müller')),
       ('Mozzarella', 'Packung', 3.5, 20, (SELECT id from lieferant WHERE name = 'Molkerei Henning')),
       ('Butter', 'Stück', 3.0, 50, (SELECT id from lieferant WHERE name = 'Molkerei Henning')),
       ('Ei', 'Stück', 0.4, 300, (SELECT id from lieferant WHERE name = 'Bio-Hof Müller')),
       ('Paprika', 'Stück', 0.75, 50, (SELECT id from lieferant WHERE name = 'Bio-Hof Müller')),
       ('Olivenöl', 'Liter', 5.0, 30, (SELECT id from lieferant WHERE name = 'Bio-Hof Müller')),
       ('Hähnchenbrust', 'Stück', 4.5, 25, (SELECT id from lieferant WHERE name = 'Bio-Hof Müller')),
       ('Linsen', 'Gramm', 1.0, 500, (SELECT id from lieferant WHERE name = 'Bio-Hof Müller')),
       ('Quinoa', 'Gramm', 1.5, 300, (SELECT id from lieferant WHERE name = 'Bio-Hof Müller')),
       ('Schokolade', 'Stück', 2.0, 100, (SELECT id from lieferant WHERE name = 'Molkerei Henning'));

-- Inserting more Rezepte
INSERT INTO rezept (beschreibung, name, zubereitungsdauer, bild)
VALUES ('Köstliche Zucchinipfanne', 'Zucchinipfanne', '30', '../html/images/recipes/Gnocchi-Zucchini-Pfanne.webp'),
       ('Vegane Gemüse-Lasagne', 'Gemüse-Lasagne', '45', '../html/images/recipes/Lasange-016-2-1440x1081.jpg'),
       ('Asiatische Nudelsuppe', 'Nudelsuppe', '40', '../html/images/recipes/d575c23772210cd7d18c589326a1fffb.jpg'),
       ('Italienischer Caprese-Salat', 'Caprese-Salat', '15', '../html/images/recipes/Caprese-Salad-3.jpg'),
       ('Hähnchen mit Paprika', 'Hähnchen-Paprika', '40', '../html/images/recipes/rezept_haehnchen_in_paprika_sahnesoße_05-e1554236259500-1624x1080.jpg'),
       ('Quinoa-Salat', 'Quinoa-Salat', '25', '../html/images/recipes/Harvest-Quinoa-Salad-Photo.jpg'),
       ('Schokoladenmuffins', 'Schoko-Muffins', '30', '../html/images/recipes/3a1283887b7dc9dcd01b6b58ced91d6b.jpg');

-- Inserting more Kategorien
INSERT INTO kategorie (beschreibung, name)
VALUES ('Saftige Fleischgerichte', 'Fleischhaltig'),
       ('Süße Verführungen', 'Dessert'),
       ('Leichte Salate', 'Salat'),
       ('Proteinhaltige Vegane Gerichte', 'Proteinreich'),
       ('Mediterrane Köstlichkeiten, wie am Mittelmeer!', 'Mediterran'),
       ('Keine tierischen Produkte.', 'Vegan'),
       ('Keine Produkte, die Fleisch enthalten', 'Vegetarisch'),
       ('Heiße den Orient in deinem Gaumen wilkommen (kein Kink Shaming)', 'Asiatisch'),
       ('You have not mammad your last mia', 'Italienisch');

-- Inserting into mapping table rezept_kategorie
-- Map Rezepte to Kategorien
INSERT INTO rezept_kategorie (rezept_id, kategorie_id)
VALUES ((SELECT id FROM rezept WHERE name = 'Zucchinipfanne'), (SELECT id FROM kategorie WHERE name = 'Mediterran')),
       ((SELECT id FROM rezept WHERE name = 'Gemüse-Lasagne'), (SELECT id FROM kategorie WHERE name = 'Vegan')),
       ((SELECT id FROM rezept WHERE name = 'Nudelsuppe'), (SELECT id FROM kategorie WHERE name = 'Asiatisch')),
       ((SELECT id FROM rezept WHERE name = 'Caprese-Salat'), (SELECT id FROM kategorie WHERE name = 'Italienisch')),
       ((SELECT id FROM rezept WHERE name = 'Hähnchen-Paprika'),
        (SELECT id FROM kategorie WHERE name = 'Fleischhaltig')),
       ((SELECT id FROM rezept WHERE name = 'Quinoa-Salat'), (SELECT id FROM kategorie WHERE name = 'Vegan')),
       ((SELECT id FROM rezept WHERE name = 'Schoko-Muffins'), (SELECT id FROM kategorie WHERE name = 'Dessert'));

-- Inserting into mapping table rezept_zutat
-- Map Zutaten to Rezepte
INSERT INTO rezept_zutat (rezept_id, zutat_id, menge)
VALUES ((SELECT id FROM rezept WHERE name = 'Zucchinipfanne'), (SELECT id FROM zutat WHERE name = 'Zucchini'), 2),
       ((SELECT id FROM rezept WHERE name = 'Zucchinipfanne'), (SELECT id FROM zutat WHERE name = 'Tomate'), 3),
       ((SELECT id FROM rezept WHERE name = 'Zucchinipfanne'), (SELECT id FROM zutat WHERE name = 'Rucola'), 1),
       ((SELECT id FROM rezept WHERE name = 'Gemüse-Lasagne'), (SELECT id FROM zutat WHERE name = 'Karotte'), 4),
       ((SELECT id FROM rezept WHERE name = 'Gemüse-Lasagne'), (SELECT id FROM zutat WHERE name = 'Kartoffel'), 300),
       ((SELECT id FROM rezept WHERE name = 'Gemüse-Lasagne'), (SELECT id FROM zutat WHERE name = 'Süßkartoffel'), 2),
       ((SELECT id FROM rezept WHERE name = 'Nudelsuppe'), (SELECT id FROM zutat WHERE name = 'Schalotte'), 2),
       ((SELECT id FROM rezept WHERE name = 'Nudelsuppe'), (SELECT id FROM zutat WHERE name = 'Knoblauch'), 1),
       ((SELECT id FROM rezept WHERE name = 'Nudelsuppe'), (SELECT id FROM zutat WHERE name = 'Basilikum'), 1),
       ((SELECT id FROM rezept WHERE name = 'Caprese-Salat'), (SELECT id FROM zutat WHERE name = 'Tomate'), 4),
       ((SELECT id FROM rezept WHERE name = 'Caprese-Salat'), (SELECT id FROM zutat WHERE name = 'Apfel'), 200),
       ((SELECT id FROM rezept WHERE name = 'Caprese-Salat'), (SELECT id FROM zutat WHERE name = 'Hafermilch'), 1.5),
       ((SELECT id FROM rezept WHERE name = 'Hähnchen-Paprika'), (SELECT id FROM zutat WHERE name = 'Hähnchenbrust'),
        2),
       ((SELECT id FROM rezept WHERE name = 'Hähnchen-Paprika'), (SELECT id FROM zutat WHERE name = 'Paprika'), 3),
       ((SELECT id FROM rezept WHERE name = 'Quinoa-Salat'), (SELECT id FROM zutat WHERE name = 'Quinoa'), 150),
       ((SELECT id FROM rezept WHERE name = 'Quinoa-Salat'), (SELECT id FROM zutat WHERE name = 'Rucola'), 1),
       ((SELECT id FROM rezept WHERE name = 'Schoko-Muffins'), (SELECT id FROM zutat WHERE name = 'Schokolade'), 200),
       ((SELECT id FROM rezept WHERE name = 'Schoko-Muffins'), (SELECT id FROM zutat WHERE name = 'Butter'), 150);



INSERT INTO bestellung_rezept (bestellung_id, rezept_id, menge)
VALUES ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-07-01 12:45:00'::timestamp
           AND i.email = 'k.wellensteyn@yahoo.de'),
        (SELECT id FROM rezept WHERE name = 'Zucchinipfanne'), 2),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-01 14:45:00'::timestamp
           AND i.email = 'sigrid@leberer.de'),
        (SELECT id FROM rezept WHERE name = 'Gemüse-Lasagne'), 3),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-02 15:45:00'::timestamp
           AND i.email = 'h.soerensen@yahoo.de'),
        (SELECT id FROM rezept WHERE name = 'Nudelsuppe'), 1),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-02 16:45:10'::timestamp
           AND i.email = 'schni_mart@gmail.com'),
        (SELECT id FROM rezept WHERE name = 'Caprese-Salat'), 2),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-10 12:35:00'::timestamp
           AND i.email = 'belinda1978@yahoo.de'),
        (SELECT id FROM rezept WHERE name = 'Hähnchen-Paprika'), 1),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-10 10:05:20'::timestamp
           AND i.email = 'armin@gessert.de'),
        (SELECT id FROM rezept WHERE name = 'Quinoa-Salat'), 2),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-10 01:45:00'::timestamp
           AND i.email = 'jm@haessig.de'),
        (SELECT id FROM rezept WHERE name = 'Schoko-Muffins'), 1),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-10 17:05:00'::timestamp
           AND i.email = 'urocki@outlook.de'),
        (SELECT id FROM rezept WHERE name = 'Schoko-Muffins'), 2),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-15 20:45:00'::timestamp
           AND i.email = 'armin@gessert.de'),
        (SELECT id FROM rezept WHERE name = 'Zucchinipfanne'), 1),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-12 12:45:50'::timestamp
           AND i.email = 'schni_mart@gmail.com'),
        (SELECT id FROM rezept WHERE name = 'Nudelsuppe'), 3),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-13 12:40:30'::timestamp
           AND i.email = 'sigrid@leberer.de'),
        (SELECT id FROM rezept WHERE name = 'Nudelsuppe'), 1);

INSERT INTO beschraenkung (name)
VALUES ('Soja'),
       ('Fisch'),
       ('Erdnuss'),
       ('Laktose'),
       ('Gluten'),
       ('Ei'),
       ('Tomate'),
       ('Schweinefleisch'),
       ('Fleisch'),
       ('Tierprodukt'),
       ('Koffein');

INSERT INTO zutat_beschraenkung (zutat_id, beschraenkung_id)
VALUES ((SELECT id FROM zutat WHERE name = 'Tomate'), (SELECT id FROM beschraenkung WHERE name = 'Tomate')),
       ((SELECT id FROM zutat WHERE name = 'Mozzarella'), (SELECT id FROM beschraenkung WHERE name = 'Laktose')),
       ((SELECT id FROM zutat WHERE name = 'Mozzarella'), (SELECT id FROM beschraenkung WHERE name = 'Tierprodukt')),
       ((SELECT id FROM zutat WHERE name = 'Butter'), (SELECT id FROM beschraenkung WHERE name = 'Laktose')),
       ((SELECT id FROM zutat WHERE name = 'Butter'), (SELECT id FROM beschraenkung WHERE name = 'Tierprodukt')),
       ((SELECT id FROM zutat WHERE name = 'Ei'), (SELECT id FROM beschraenkung WHERE name = 'Ei')),
       ((SELECT id FROM zutat WHERE name = 'Ei'), (SELECT id FROM beschraenkung WHERE name = 'Tierprodukt')),
       ((SELECT id FROM zutat WHERE name = 'Hähnchenbrust'), (SELECT id FROM beschraenkung WHERE name = 'Fleisch')),
       ((SELECT id FROM zutat WHERE name = 'Hähnchenbrust'), (SELECT id FROM beschraenkung WHERE name = 'Tierprodukt')),
       ((SELECT id FROM zutat WHERE name = 'Schokolade'), (SELECT id FROM beschraenkung WHERE name = 'Laktose')),
       ((SELECT id FROM zutat WHERE name = 'Schokolade'), (SELECT id FROM beschraenkung WHERE name = 'Tierprodukt'));

INSERT INTO naehrstoffe (zutat_id, ballaststoffe, fett, gesaettigte_fettsaeuren, kalorien, kohlenhydrate, natrium, proteine, zucker)
VALUES ((SELECT id FROM zutat WHERE name = 'Zucchini'), 1.0, 0.3, 0.0, 17.0, 3.1, 8.0, 1.2, 2.5),
       ((SELECT id FROM zutat WHERE name = 'Zwiebel'), 1.7, 0.1, 0.0, 40.0, 9.3, 4.0, 1.1, 4.7),
       ((SELECT id FROM zutat WHERE name = 'Tomate'), 1.2, 0.2, 0.0, 18.0, 3.9, 5.0, 0.9, 2.6),
       ((SELECT id FROM zutat WHERE name = 'Schalotte'), 2.6, 0.1, 0.0, 60.0, 14.2, 12.0, 2.5, 7.9),
       ((SELECT id FROM zutat WHERE name = 'Karotte'), 2.8, 0.2, 0.0, 41.0, 9.6, 69.0, 0.9, 4.7),
       ((SELECT id FROM zutat WHERE name = 'Kartoffel'), 2.2, 0.1, 0.0, 77.0, 17.5, 6.0, 2.0, 0.8),
       ((SELECT id FROM zutat WHERE name = 'Rucola'), 1.6, 0.7, 0.1, 25.0, 3.7, 27.0, 2.6, 2.1),
       ((SELECT id FROM zutat WHERE name = 'Lauch'), 1.8, 0.3, 0.1, 61.0, 14.2, 20.0, 1.5, 3.9),
       ((SELECT id FROM zutat WHERE name = 'Knoblauch'), 2.1, 0.5, 0.1, 149.0, 33.1, 17.0, 6.4, 1.0),
       ((SELECT id FROM zutat WHERE name = 'Basilikum'), 2.1, 0.6, 0.1, 23.0, 2.7, 4.0, 3.2, 0.3),
       ((SELECT id FROM zutat WHERE name = 'Süßkartoffel'), 3.0, 0.1, 0.0, 86.0, 20.1, 55.0, 1.6, 4.2),
       ((SELECT id FROM zutat WHERE name = 'Schnittlauch'), 2.5, 0.7, 0.1, 30.0, 4.4, 3.0, 3.3, 1.1),
       ((SELECT id FROM zutat WHERE name = 'Apfel'), 2.4, 0.3, 0.1, 52.0, 14.0, 1.0, 0.3, 10.0),
       ((SELECT id FROM zutat WHERE name = 'Hafermilch'), 0.5, 1.5, 0.2, 48.0, 7.0, 52.0, 1.0, 4.0),
       ((SELECT id FROM zutat WHERE name = 'Mozzarella'), 0.0, 22.0, 14.0, 280.0, 2.0, 627.0, 28.0, 0.7),
       ((SELECT id FROM zutat WHERE name = 'Butter'), 0.0, 81.0, 51.0, 717.0, 0.1, 643.0, 0.9, 0.1),
       ((SELECT id FROM zutat WHERE name = 'Ei'), 0.0, 13.0, 4.0, 155.0, 1.1, 124.0, 13.0, 1.1),
       ((SELECT id FROM zutat WHERE name = 'Paprika'), 2.1, 0.3, 0.1, 31.0, 6.0, 3.0, 1.2, 4.2),
       ((SELECT id FROM zutat WHERE name = 'Olivenöl'), 0.0, 100.0, 14.0, 884.0, 0.0, 2.0, 0.0, 0.0),
       ((SELECT id FROM zutat WHERE name = 'Hähnchenbrust'), 0.0, 3.6, 1.0, 165.0, 0.0, 64.0, 31.0, 0.0),
       ((SELECT id FROM zutat WHERE name = 'Linsen'), 7.9, 0.4, 0.1, 116.0, 20.0, 2.0, 9.0, 1.1),
       ((SELECT id FROM zutat WHERE name = 'Quinoa'), 6.3, 6.1, 0.7, 120.0, 21.3, 5.0, 4.4, 0.9),
       ((SELECT id FROM zutat WHERE name = 'Schokolade'), 7.0, 31.0, 18.0, 546.0, 60.0, 45.0, 5.3, 54.0);