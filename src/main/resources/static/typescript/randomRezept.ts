document.addEventListener("DOMContentLoaded", async function () {

    console.log("Application loaded!");

    const recipe = await fetchRandomRecipe();
    displayRandomRecipe(recipe);

    return;
});

async function fetchRandomRecipe(): Promise<Rezept> {
    try {
        const response = await fetch('http://localhost:8080/api/randomRezept');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return {
            name: '',
            beschreibung: '', zubereitungsdauer: '', bild: ''
        };
    }
}

function displayRandomRecipe(recipe: Rezept): void {
    const dailyRecipeName = document.getElementById('RecipeTitle');
    const dailyRecipeDescription = document.getElementById('RecipeDescription');
    const dailyRecipeImage = document.getElementById('RecipeImage') as HTMLImageElement;


    console.log(recipe.bild);

    if (dailyRecipeName && dailyRecipeDescription && dailyRecipeImage) {
        dailyRecipeName.innerHTML = recipe.name;
        dailyRecipeDescription.innerHTML = recipe.beschreibung + "<br><br>Zubereitungsdauer: " + recipe.zubereitungsdauer;
        dailyRecipeImage.src = recipe.bild ? recipe.bild : 'images/recepies/rezept_haehnchen_in_paprika_sahnesoße_05-e1554236259500-1624x1080.jpg';

        console.log(recipe.name);
    } else {
        console.error("One or more elements not found");
    }
}

