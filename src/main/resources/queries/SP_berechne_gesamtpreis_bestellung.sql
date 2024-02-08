-- Gesamtpreis für eine Bestellung mit Mehrwersteuer und Gewinnmarge (Stored Procedure 2/3)
CREATE OR REPLACE FUNCTION calculate_order_price(order_id INTEGER)
    RETURNS VOID AS $$
DECLARE
    order_total NUMERIC;
BEGIN
    -- Calculate the total price for the order including tax and margin
    SELECT  SUM(z.nettopreis * rz.menge * br.menge), 0 * 1.19 * 1.2 -- Add Mehrwertsteuer and margin
    INTO order_total
    FROM bestellung_rezept br
             JOIN rezept_zutat rz ON br.rezept_id = rz.rezept_id
             JOIN zutat z ON rz.zutat_id = z.id
    WHERE br.bestellung_id = order_id;

    -- Update the gesamtpreis column for the specified order
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
    -- Iterate through each order
    FOR order_id IN SELECT id FROM bestellung LOOP
            -- Call the calculate_order_price function for each order_id
            PERFORM calculate_order_price(order_id);
        END LOOP;
END;
$$ LANGUAGE plpgsql;

SELECT calculate_price_for_all_orders();

SELECT calculate_order_price(2);