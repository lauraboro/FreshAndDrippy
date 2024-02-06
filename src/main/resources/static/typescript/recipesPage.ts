document.addEventListener("DOMContentLoaded", async function () {

    console.log("Application loaded!");

    const recipes = await fetchRecipes();
    displayRecipes(recipes);

    return;
});

interface Rezept {
    id: number;
    name: string;
    beschreibung: string;
    zubereitungsdauer: number;
    bild: string;
}


async function fetchRecipes(): Promise<Rezept[]> {
    try {
        const response = await fetch('http://localhost:8080/api/allRezepte');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
}

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

            <td><a href = 'http://localhost:8080/rezept/${recipe.id}'>${recipe.name}</a></td>
            <td>${recipe.beschreibung}</td>
            <td>${recipe.zubereitungsdauer}</td>
            
           
        `;
        tableBody.appendChild(row);
    });
}