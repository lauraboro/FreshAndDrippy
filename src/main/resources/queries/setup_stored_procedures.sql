CREATE OR REPLACE FUNCTION calculate_order_price(order_id INTEGER)
    RETURNS VOID AS $$
DECLARE
    order_total NUMERIC;
BEGIN

    SELECT COALESCE(SUM(z.nettopreis), 0) * 1.19 * 1.2 -- Add Mehrwertsteuer and margin
    INTO order_total
    FROM bestellung_rezept br
             JOIN rezept_zutat rz ON br.rezept_id = rz.rezept_id
             JOIN zutat z ON rz.zutat_id = z.id
    WHERE br.bestellung_id = order_id;


    UPDATE bestellung
    SET gesamtpreis = order_total
    WHERE id = order_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION calculate_price_for_all_orders()
    RETURNS VOID AS $$
DECLARE
    order_id INTEGER;
BEGIN

    FOR order_id IN SELECT id FROM bestellung LOOP

            PERFORM calculate_order_price(order_id);
        END LOOP;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION retrieve_customer_information(email_to_check VARCHAR(300))
    RETURNS TABLE (
                      kunde_name VARCHAR(50),
                      kunde_vorname VARCHAR(50),
                      kunde_geburtstag DATE,
                      kunde_telefonnummer VARCHAR(20),
                      kunde_email VARCHAR(300),
                      strasse VARCHAR(50),
                      hausnummer INTEGER,
                      hausnummerzusatz CHAR,
                      postleitzahl INTEGER,
                      stadt VARCHAR(50),
                      land VARCHAR(50)
                  )
AS $$
BEGIN
    RETURN QUERY
        SELECT
            k.name,
            k.vorname,
            k.geburtstag,
            k.telefonnummer,
            k.email,
            a.strasse,
            a.hausnummer,
            a.hausnummerzusatz,
            a.postleitzahl,
            a.stadt,
            a.land
        FROM
            kunde k
                INNER JOIN
            kunde_adresse ka ON k.id = ka.kunde_id
                INNER JOIN
            adresse a ON ka.adresse_id = a.id
        WHERE
            k.email = email_to_check;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_customer_information(email_to_delete VARCHAR(300))
    RETURNS VOID
AS $$
DECLARE
    kunde_id_to_delete INT;
BEGIN

    SELECT id INTO kunde_id_to_delete FROM kunde WHERE email = email_to_delete;

    DELETE FROM kunde_adresse WHERE kunde_id = kunde_id_to_delete;

    DELETE FROM bestellung WHERE kunde_id = kunde_id_to_delete;

    DELETE FROM kunde WHERE id = kunde_id_to_delete;

END;
$$ LANGUAGE plpgsql;

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
