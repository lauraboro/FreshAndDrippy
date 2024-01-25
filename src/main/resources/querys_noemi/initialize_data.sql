-- Inserting more Zutaten
INSERT INTO zutat (name, einheit, nettopreis, bestand)
VALUES
    ('Zucchini', 'Stück', 0.89, 100),
    ('Zwiebel', 'Stück', 0.15, 50),
    ('Tomate', 'Stück', 0.45, 50),
    ('Schalotte', 'Stück', 0.20, 500),
    ('Karotte', 'Stück', 0.30, 500),
    ('Kartoffel', 'Stück', 0.15, 1500),
    ('Rucola', 'Bund', 0.90, 10),
    ('Lauch', 'Stück', 1.2, 35),
    ('Knoblauch', 'Stück', 0.25, 250),
    ('Basilikum', 'Bund', 1.3, 10),
    ('Süßkartoffel', 'Stück', 2.0, 200),
    ('Schnittlauch', 'Bund', 0.9, 10),
    ('Apfel', 'Stück', 1.2, 750),
    ('Hafermilch', 'Liter', 1.5, 50),
    ('Mozzarella', 'Packung', 3.5, 20),
    ('Butter', 'Stück', 3.0, 50),
    ('Ei', 'Stück', 0.4, 300),
    ('Paprika', 'Stück', 0.75, 50),
    ('Olivenöl', 'Liter', 5.0, 30),
    ('Hähnchenbrust', 'Stück', 4.5, 25),
    ('Linsen', 'Gramm', 1.0, 500),
    ('Quinoa', 'Gramm', 1.5, 300),
    ('Schokolade', 'Stück', 2.0, 100);

-- Inserting more Rezepte
INSERT INTO rezept (beschreibung, name, zubereitungsdauer)
VALUES
    ('Köstliche Zucchinipfanne', 'Zucchinipfanne', '30 minutes'),
    ('Vegane Gemüse-Lasagne', 'Gemüse-Lasagne', '45 minutes'),
    ('Asiatische Nudelsuppe', 'Nudelsuppe', '40 minutes'),
    ('Italienischer Caprese-Salat', 'Caprese-Salat', '15 minutes'),
    ('Hähnchen mit Paprika', 'Hähnchen-Paprika', '40 minutes'),
    ('Quinoa-Salat', 'Quinoa-Salat', '25 minutes'),
    ('Schokoladenmuffins', 'Schoko-Muffins', '30 minutes');

-- Inserting more Kategorien
INSERT INTO kategorie (beschreibung, name)
VALUES
    ('Saftige Fleischgerichte', 'Fleischhaltig'),
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
VALUES
    ((SELECT id FROM rezept WHERE name = 'Zucchinipfanne'), (SELECT id FROM kategorie WHERE name = 'Mediterran')),
    ((SELECT id FROM rezept WHERE name = 'Gemüse-Lasagne'), (SELECT id FROM kategorie WHERE name = 'Vegan')),
    ((SELECT id FROM rezept WHERE name = 'Nudelsuppe'), (SELECT id FROM kategorie WHERE name = 'Asiatisch')),
    ((SELECT id FROM rezept WHERE name = 'Caprese-Salat'), (SELECT id FROM kategorie WHERE name = 'Italienisch')),
    ((SELECT id FROM rezept WHERE name = 'Hähnchen-Paprika'), (SELECT id FROM kategorie WHERE name = 'Fleischhaltig')),
    ((SELECT id FROM rezept WHERE name = 'Quinoa-Salat'), (SELECT id FROM kategorie WHERE name = 'Vegan')),
    ((SELECT id FROM rezept WHERE name = 'Schoko-Muffins'), (SELECT id FROM kategorie WHERE name = 'Dessert'));

-- Inserting into mapping table rezept_zutat
-- Map Zutaten to Rezepte
INSERT INTO rezept_zutat (rezept_id, zutat_id, menge)
VALUES
    ((SELECT id FROM rezept WHERE name = 'Zucchinipfanne'), (SELECT id FROM zutat WHERE name = 'Zucchini'), 2),
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
    ((SELECT id FROM rezept WHERE name = 'Hähnchen-Paprika'), (SELECT id FROM zutat WHERE name = 'Hähnchenbrust'), 2),
    ((SELECT id FROM rezept WHERE name = 'Hähnchen-Paprika'), (SELECT id FROM zutat WHERE name = 'Paprika'), 3),
    ((SELECT id FROM rezept WHERE name = 'Quinoa-Salat'), (SELECT id FROM zutat WHERE name = 'Quinoa'), 150),
    ((SELECT id FROM rezept WHERE name = 'Quinoa-Salat'), (SELECT id FROM zutat WHERE name = 'Rucola'), 1),
    ((SELECT id FROM rezept WHERE name = 'Schoko-Muffins'), (SELECT id FROM zutat WHERE name = 'Schokolade'), 200),
    ((SELECT id FROM rezept WHERE name = 'Schoko-Muffins'), (SELECT id FROM zutat WHERE name = 'Butter'), 150);

-- Insert customers
WITH inserted_kunde AS (
    INSERT INTO kunde (name, vorname, geburtstag, telefonnummer, email)
        VALUES ('Wellensteyn', 'Kira', '1990-05-05', '040/443322', 'k.wellensteyn@yahoo.de'),
               ('Foede', 'Dorothea', '2000-03-24', '040/543822', 'd.foede@web.de'),
               ('Leberer', 'Sigrid', '1989-09-21', '0175/1234588', 'sigrid@leberer.de'),
               ('Soerensen', 'Hanna', '1974-04-03', '040/634578', 'h.soerensen@yahoo.de'),
               ('Schnitter', 'Marten', '1964-04-17', '0176/447587', 'schni_mart@gmail.com'),
               ('Maurer', 'Belinda', '1978-09-09', '040/332189', 'belinda1978@yahoo.de'),
               ('Gessert', 'Armin', '1978-01-29', '040/67890', 'armin@gessert.de'),
               ('Haessig', 'Jean-Marc', '1982-08-30', '0178-67013390', 'jm@haessig.de'),
               ('Urocki', 'Eric', '1999-12-04', '0152-96701390', 'urocki@outlook.de')
        RETURNING id, name)
-- Insert addresses
   , inserted_adresse AS (
    INSERT INTO adresse (strasse, hausnummer, hausnummerzusatz, postleitzahl, stadt, land)
        VALUES ('Eppendorfer Landstrasse', '104', null, '20249', 'Hamburg', 'Deutschland'),
               ('Ohmstraße', '23', null, '22765', 'Hamburg', 'Deutschland'),
               ('Bilser Berg', '6', null, '20459', 'Hamburg', 'Deutschland'),
               ('Alter Teichweg', '95', null, '22049', 'Hamburg', 'Deutschland'),
               ('Stübels', '10', null, '22835', 'Barsbüttel', 'Deutschland'),
               ('Grotelertwiete', '4', 'a', '21075', 'Hamburg', 'Deutschland'),
               ('Küstersweg', '3', null, '21079', 'Hamburg', 'Deutschland'),
               ('Neugrabener Bahnhofstraße', '30', null, '21149', 'Hamburg', 'Deutschland'),
               ('Elbchaussee', '228', null, '22605', 'Hamburg', 'Deutschland')
        RETURNING id)
-- Insert customer addresses
   , inserted_kunde_adresse AS (
    INSERT INTO kunde_adresse (kunde_id, adresse_id)
        SELECT k.id, a.id
        FROM inserted_kunde k
                 JOIN inserted_adresse a ON true)
-- Insert supplier addresses
   , inserted_supplier_adresse AS (
    INSERT INTO adresse (strasse, hausnummer, hausnummerzusatz, postleitzahl, stadt, land)
        VALUES ('Dorfstraße', '74', null, '24354', 'Weseby', 'Deutschland'),
               ('Westerjork', '76', null, '21635', 'Jork', 'Deutschland'),
               ('Molkereiwegkundekunde', '13', null, '19217', 'Dechow', 'Deutschland')
        RETURNING id, strasse)
-- Insert suppliers
INSERT
INTO lieferant (name, telefonnummer, email, adresse_id)
VALUES ('Bio-Hof Müller', '04354-9080', 'mueller@biohof.de',
        (SELECT id FROM inserted_supplier_adresse WHERE strasse = 'Dorfstraße')),
       ('Obst-Hof Altes Land', '04162-4523', 'info@biohof-altesland.de',
        (SELECT id FROM inserted_supplier_adresse WHERE strasse = 'Westerjork')),
       ('Molkerei Henning', '038873-8976', 'info@molkerei-henning.de',
        (SELECT id FROM inserted_supplier_adresse WHERE strasse = 'Molkereiwegkundekunde'));

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


INSERT INTO bestellung_rezept (bestellung_id, rezept_id, menge)
VALUES ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-07-01 12:45:00'::timestamp
           AND i.email = 'k.wellensteyn@yahoo.de'),
        (SELECT id FROM rezept WHERE name = 'Ofenkartoffeln'), 2),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-01 14:45:00'::timestamp
           AND i.email = 'sigrid@leberer.de'),
        (SELECT id FROM rezept WHERE name = 'Ofenkartoffeln'), 3),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-02 15:45:00'::timestamp
           AND i.email = 'h.soerensen@yahoo.de'),
        (SELECT id FROM rezept WHERE name = 'Ofenkartoffeln'), 1),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-02 16:45:10'::timestamp
           AND i.email = 'schni_mart@gmail.com'),
        (SELECT id FROM rezept WHERE name = 'Ofenkartoffeln'), 2),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-10 12:35:00'::timestamp
           AND i.email = 'belinda1978@yahoo.de'),
        (SELECT id FROM rezept WHERE name = 'Ofenkartoffeln'), 1),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-10 10:05:20'::timestamp
           AND i.email = 'armin@gessert.de'),
        (SELECT id FROM rezept WHERE name = 'Ofenkartoffeln'), 2),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-10 01:45:00'::timestamp
           AND i.email = 'jm@haessig.de'),
        (SELECT id FROM rezept WHERE name = 'Ofenkartoffeln'), 1),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-10 17:05:00'::timestamp
           AND i.email = 'urocki@outlook.de'),
        (SELECT id FROM rezept WHERE name = 'Ofenkartoffeln'), 2),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-15 20:45:00'::timestamp
           AND i.email = 'armin@gessert.de'),
        (SELECT id FROM rezept WHERE name = 'Ofenkartoffeln'), 1),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-12 12:45:50'::timestamp
           AND i.email = 'schni_mart@gmail.com'),
        (SELECT id FROM rezept WHERE name = 'Ofenkartoffeln'), 3),

       ((SELECT b.id
         FROM bestellung b
                  JOIN kunde i ON b.kunde_id = i.id
         WHERE b.datum = '2020-08-13 12:40:30'::timestamp
           AND i.email = 'sigrid@leberer.de'),
        (SELECT id FROM rezept WHERE name = 'Ofenkartoffeln'), 1);