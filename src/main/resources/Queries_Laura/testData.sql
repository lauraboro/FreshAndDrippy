INSERT INTO zutat (name, einheit, nettopreis, bestand)
VALUES ('Zucchini', 'Stück', 0.89, 100),
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
       ('Ei', 'Stück', 0.4, 300);

INSERT INTO rezept (beschreibung, name, zubereitungsdauer)
VALUES ('koch mal gut', 'Ofenkartoffeln', '20 minutes'),
       ('Schälen und kochen', 'Spaghetti', '60 minutes');

INSERT INTO kategorie (beschreibung, name) VALUES
    ('Mediterrane Köstlichkeiten, wie am Mittelmeer!', 'Mediterran'),
    ('Keine tierischen Produkte.', 'Vegan'),
    ('Keine Produkte, die Fleisch enthalten', 'Vegetarisch'),
    ('Heiße den Orient in deinem Gaumen wilkommen (kein Kink Shaming)', 'Asiatisch'),
    ('You have not mammad your last mia', 'Italienisch');