interface Rezept {
    id: number;
    name: string;
    beschreibung: string;
    zubereitungsdauer: number;
    bild: string;
    kategories: Kategorie[];
}

interface Kategorie {
    id: number;
    name: string;
    beschreibung: string;
}

document.addEventListener("DOMContentLoaded", async function () {

    const recipeList = document.getElementById('RecipeListContent');

    let rezepte = await fetchRecipes();


    if (recipeList) {
        fillRecipeList(recipeList, rezepte);
        updateRecipeImages(rezepte);
        registerAddToCartButtons(rezepte);
    }
});

function registerAddToCartButtons(rezepte: Rezept[]) {
    rezepte.forEach(rezept => {
        const addToCartButton = document.getElementById("AddRecipeToCart" + rezept.id);
        if (addToCartButton) {
            addToCartButton.addEventListener("click", function () {
                addToCart(rezept.id, rezept.name)
            })
        }
    })
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

function fillRecipeList(recipeList: HTMLElement, recipes: Rezept[]) {
    recipeList.innerHTML = "";
    recipes.forEach(recipe => {
        recipeList.innerHTML += buildRecipeDisplay(recipe);
    });
}

function updateRecipeImages(recipes: Rezept[]) {
    recipes.forEach(recipe => {
        const recipeImage = document.getElementById("RecipeImage" + recipe.id);

        if (recipeImage) {
            recipeImage.style.backgroundImage = "url(" + recipe.bild + ")";
        }
    })
}

function buildRecipeDisplay(recipe: Rezept): String {
    return `
        <div class="Recipe">
            <div class="RecipeImage" id="RecipeImage` + recipe.id + `">
                <div class="RecipeImageGlow"></div>
            </div>
            <div class="RecipeContent">
                <div class="RecipeHeader">
                    <div class="RecipePrepTime">
                        <img src="images/clock.png" alt="time">
                        <a>` + recipe.zubereitungsdauer + `min</a>
                    </div>
                    <a class="RecipeTitle">` + recipe.name + `</a>
                    <div class="RecipeInfoContainer">
                        <img class="RecipeInfo" src="images/info.png" alt="Info">
                    </div>
                </div>
                <p class="RecipeDescription">` + recipe.beschreibung + `</p>
                <p class="RecipeIngredients">3x Tomaten, 5x Schnittlauch, 1x deine Mum</p>
                <div class="RecipeFooter">
                    <a class="AddToCartButton" id="AddRecipeToCart` + recipe.id + `">+ 13,99€</a>
                </div>
            </div>
        </div>
    `;
}