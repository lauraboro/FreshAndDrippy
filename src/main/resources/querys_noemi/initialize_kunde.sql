-- Insert customers
WITH inserted_kunde AS (
    INSERT INTO kunde (name, vorname, geburtstag, telefonnummer, email)
        VALUES
            ('Wellensteyn', 'Kira', '1990-05-05', '040/443322', 'k.wellensteyn@yahoo.de'),
            ('Foede', 'Dorothea', '2000-03-24', '040/543822', 'd.foede@web.de'),
            ('Leberer', 'Sigrid', '1989-09-21', '0175/1234588', 'sigrid@leberer.de'),
            ('Soerensen', 'Hanna', '1974-04-03', '040/634578', 'h.soerensen@yahoo.de'),
            ('Schnitter', 'Marten', '1964-04-17', '0176/447587', 'schni_mart@gmail.com'),
            ('Maurer', 'Belinda', '1978-09-09', '040/332189', 'belinda1978@yahoo.de'),
            ('Gessert', 'Armin', '1978-01-29', '040/67890', 'armin@gessert.de'),
            ('Haessig', 'Jean-Marc', '1982-08-30', '0178-67013390', 'jm@haessig.de'),
            ('Urocki', 'Eric', '1999-12-04', '0152-96701390', 'urocki@outlook.de')
        RETURNING id
)
-- Insert addresses
   , inserted_adresse AS (
    INSERT INTO adresse (strasse, hausnummer, hausnummerzusatz, postleitzahl, stadt, land)
        VALUES
            ('Eppendorfer Landstrasse', '104', null, '20249', 'Hamburg', 'Deutschland'),
            ('Ohmstraße', '23', null, '22765', 'Hamburg', 'Deutschland'),
            ('Bilser Berg', '6', null, '20459', 'Hamburg', 'Deutschland'),
            ('Alter Teichweg', '95', null, '22049', 'Hamburg', 'Deutschland'),
            ('Stübels', '10', null, '22835', 'Barsbüttel', 'Deutschland'),
            ('Grotelertwiete', '4', 'a', '21075', 'Hamburg', 'Deutschland'),
            ('Küstersweg', '3', null, '21079', 'Hamburg', 'Deutschland'),
            ('Neugrabener Bahnhofstraße', '30', null, '21149', 'Hamburg', 'Deutschland'),
            ('Elbchaussee', '228', null, '22605', 'Hamburg', 'Deutschland')
        RETURNING id
)
-- Insert customer addresses
   , inserted_kunde_adresse AS (
    INSERT INTO kunde_adresse (kunde_id, adresse_id)
        SELECT k.id, a.id
        FROM inserted_kunde k
                 JOIN inserted_adresse a ON true
)
-- Insert supplier addresses
   , inserted_supplier_adresse AS (
    INSERT INTO adresse (strasse, hausnummer, hausnummerzusatz, postleitzahl, stadt, land)
        VALUES
            ('Dorfstraße', '74', null,'24354', 'Weseby', 'Deutschland'),
            ('Westerjork', '76', null,'21635', 'Jork', 'Deutschland'),
            ('Molkereiwegkundekunde', '13', null,'19217', 'Dechow', 'Deutschland')
        RETURNING id, strasse
)
-- Insert suppliers
INSERT INTO lieferant (name, telefonnummer, email, adresse_id)
VALUES
    ('Bio-Hof Müller', '04354-9080', 'mueller@biohof.de', (SELECT id FROM inserted_supplier_adresse WHERE strasse = 'Dorfstraße')),
    ('Obst-Hof Altes Land', '04162-4523', 'info@biohof-altesland.de', (SELECT id FROM inserted_supplier_adresse WHERE strasse = 'Westerjork')),
    ('Molkerei Henning', '038873-8976', 'info@molkerei-henning.de', (SELECT id FROM inserted_supplier_adresse WHERE strasse = 'Molkereiwegkundekunde'));
