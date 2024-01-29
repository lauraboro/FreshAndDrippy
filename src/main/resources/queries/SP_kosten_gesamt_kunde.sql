-- Geld, dass best. Kunde insgesamt bereits ausgegeben hat (Stored Procedure 1/3)
-- Schritt 1: Erstelle eine Funktion, um den Gesamtbetrag für einen Kunden zu berechnen
CREATE OR REPLACE FUNCTION gesamt_ausgaben(kunden_name text) RETURNS numeric AS $$
DECLARE
    gesamtbetrag numeric := 0;
BEGIN
    SELECT SUM(bestellung.gesamtpreis)
    INTO gesamtbetrag
    FROM bestellung
             JOIN kunde ON bestellung.kunde_id = kunde.id
    WHERE kunde.email = kunden_name;

    RETURN gesamtbetrag;
END;
$$ LANGUAGE plpgsql;

-- Schritt 2: Verwende die Funktion, um die Gesamtausgaben für einen bestimmten Kunden auszugeben
DO $$
    DECLARE
        kunden_name text := 'k.wellensteyn@yahoo.de';
        gesamtausgaben numeric;
    BEGIN
        gesamtausgaben := gesamt_ausgaben(kunden_name);
        RAISE NOTICE 'Der Kunde % hat insgesamt %.2f ausgegeben.', kunden_name, gesamtausgaben;
    END;
$$;
