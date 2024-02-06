document.addEventListener("DOMContentLoaded", async function () {

    console.log("Application loaded!");

    const recipes = await fetchRecipes();
    displayRecipes(recipes);

    return;
});

function displayRecipes(recipes: Rezept[]): void {
    const tableBody = document.getElementById('recipeTableBody');

    if (!tableBody) {
        console.error('Table body not found.');
        return;
    }

    // Clear existing table rows
    tableBody.innerHTML = '';

    recipes.forEach(recipe => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${recipe.name}</td>
            <td>${recipe.beschreibung}</td>
            <td>${recipe.zubereitungsdauer}</td>
        `;
        tableBody.appendChild(row);
    });
}