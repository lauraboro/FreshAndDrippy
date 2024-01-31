document.addEventListener("DOMContentLoaded", async function () {

    console.log("Application loaded!");

    const recipes = await fetchRecipes();
    displayRecipes(recipes);

    return;
});

interface Rezept {
    name: string;
    beschreibung: string;
    zubereitungsdauer: string;
}


async function fetchRandomRecipe(): Promise<Rezept[]> {
    try {
        const response = await fetch('http://localhost:8080/api/randomRezept');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
}

function displayRecipe(recipe: Rezept): void {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${recipe.name}</td>
            <td>${recipe.beschreibung}</td>
            <td>${recipe.zubereitungsdauer}</td>
        `;
    });
}