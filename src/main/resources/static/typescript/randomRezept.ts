document.addEventListener("DOMContentLoaded", async function () {
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
            id: 0,
            name: '',
            beschreibung: '',
            zubereitungsdauer: 0,
            bild: '',
            kategories: []
        };
    }
}

function displayRandomRecipe(recipe: Rezept): void {
    const dailyRecipeName = document.getElementById('DailyRecipeTitle');
    const dailyRecipeDescription = document.getElementById('DailyRecipeDescription');
    const dailyRecipePrepTime = document.getElementById('DailyRecipePrepTime');
    const dailyRecipeImage = document.getElementById('DailyRecipeImage') as HTMLDivElement;


    console.log(recipe.bild);

    if (dailyRecipeName && dailyRecipeDescription && dailyRecipeImage && dailyRecipePrepTime) {
        dailyRecipeName.innerHTML = recipe.name;
        dailyRecipeDescription.innerHTML = recipe.beschreibung;
        dailyRecipePrepTime.innerHTML = recipe.zubereitungsdauer + "min";
        dailyRecipeImage.style.backgroundImage = recipe.bild ? "url(" + recipe.bild + ")" : 'url(../html/images/recepies/rezept_haehnchen_in_paprika_sahnesoße_05-e1554236259500-1624x1080.jpg)';

        console.log(recipe.name);
    } else {
        console.error("One or more elements not found");
    }
}

