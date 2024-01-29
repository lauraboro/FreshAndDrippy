-- Information über Kunde anhand seiner Email (Stored Procedure 3/3)
DROP FUNCTION retrieve_customer_information(email_to_check text);
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
    -- Get Kunde ID based on provided email
    SELECT id INTO kunde_id_to_delete FROM kunde WHERE email = email_to_delete;

    -- Delete Kunde from kunde_adresse mapping table
    DELETE FROM kunde_adresse WHERE kunde_id = kunde_id_to_delete;

    -- Delete Bestellungen associated with the Kunde
    DELETE FROM bestellung WHERE kunde_id = kunde_id_to_delete;

    -- Delete Kunde
    DELETE FROM kunde WHERE id = kunde_id_to_delete;

    -- Log the deletion or take any other necessary action
    -- INSERT INTO deletion_log (kunde_id, deleted_at) VALUES (kunde_id_to_delete, NOW());

END;
$$ LANGUAGE plpgsql;


SELECT * FROM retrieve_customer_information('k.wellensteyn@yahoo.de');
