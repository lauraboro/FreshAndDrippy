-- Auswahl aller Rezepte, die weniger als fünf Zutaten enthalten und einer bestimmten Kategorie entsprechen
WITH ingredient_counts AS (
    SELECT
        rz.rezept_id,
        COUNT(rz.zutat_id) AS num_ingredients
    FROM
        rezept_zutat rz
    GROUP BY
        rz.rezept_id
)
SELECT
    r.*
FROM
    rezept r
        JOIN
    ingredient_counts ic ON r.id = ic.rezept_id
        JOIN
    rezept_kategorie rk ON r.id = rk.rezept_id
        JOIN
    kategorie k ON rk.kategorie_id = k.id
WHERE
    ic.num_ingredients < 5
  AND k.name = 'Asiatisch';