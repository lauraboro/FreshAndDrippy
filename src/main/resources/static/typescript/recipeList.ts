interface Rezept {
    id: number;
    name: string;
    beschreibung: string;
    zubereitungsdauer: number;
    bild: string;
    kategories: Kategorie[];
    zutats: RezeptZutat[];
}

interface Kategorie {
    id: number;
    name: string;
    beschreibung: string;
}

interface RezeptZutat {
    zutat: Zutat;
    menge: number;
}

interface Zutat {
    name: string;
    einheit: string;
}

let selectedFiltes: number[] = [];
let rezepte: Rezept[] = [];
let costs: number[] = [];

document.addEventListener("DOMContentLoaded", async function () {
    const filterList = document.getElementById("RecipeFilterHeader");

    async function fetchCategories(): Promise<Kategorie[]> {
        try {
            const response = await fetch('http://localhost:8080/api/allKategorien');
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    }
    rezepte = await fetchRecipes();
    await fetchCosts(rezepte);

    updateRecipeList();

    let kategorien = await fetchCategories();

    if(filterList) {
        fillFilterList(filterList, kategorien);
        registerFilterButtons(filterList, kategorien);
    }
});

function updateRecipeList() {
    const recipeList = document.getElementById('RecipeListContent');

    let filteredRecipes: Rezept[] = getFilteredRezipes(rezepte);

    if(recipeList) {
        fillRecipeList(recipeList, filteredRecipes);
        updateRecipeImages(filteredRecipes);
        registerAddToCartButtons(filteredRecipes);
    }
}

function getFilteredRezipes(recipes: Rezept[]) : Rezept[] {
    if(selectedFiltes.length == 0) {
        return recipes;
    }
    let result: Rezept[] = [];
    recipes.forEach(recipe => {
        for (let i = 0; i < recipe.kategories.length; i++) {
            if(containsFilter(recipe.kategories[i].id)) {
                result.push(recipe);
                return;
            }
        }
    });
    return result;
}

function registerAddToCartButtons(rezepte: Rezept[]) {
    rezepte.forEach(rezept => {
        const addToCartButton = document.getElementById("AddRecipeToCart" + rezept.id);
        if (addToCartButton) {
            addToCartButton.addEventListener("click", function () {
                addToCart(rezept.id, rezept.name, costs[rezepte.indexOf(rezept)])
            })
        }
    })
}

function registerFilterButtons(filterList: HTMLElement, categories: Kategorie[]) {
    categories.forEach(category => {
        const filterButton = document.getElementById("Filter" + category.id);
        if(filterButton) {
            filterButton.addEventListener("click", function () {
                if(containsFilter(category.id)) {
                    removeFilter(category.id);
                } else {
                    selectedFiltes.push(category.id);
                }
               fillFilterList(filterList, categories);
                updateRecipeList();
               registerFilterButtons(filterList, categories);
            });
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

async function getCosts(recipe: Rezept) {
    try {
        const response = await fetch('http://localhost:8080/api/rezeptPreis/' + recipe.id);
        const data = await response.text()
        return parseFloat(data);
    } catch(error) {
        console.error('Error fetching costs for recipe:', error);
        return 0;
    }
}

async function fetchCosts(recipes: Rezept[]) {
    for (let i = 0; i < recipes.length; i++) {
        const recipeCosts = await getCosts(recipes[i]);
        costs.push(recipeCosts);
    }
}

function containsFilter(id: number) {
    for (let i = 0; i < selectedFiltes.length; i++) {
        if (selectedFiltes[i] == id) return true;
    }
    return false;
}

function removeFilter(id: number) {
    const index = selectedFiltes.indexOf(id);
    if (index > -1) {
        selectedFiltes.splice(index, 1);
    }
}

function fillFilterList(filterHeader: HTMLElement, categories: Kategorie[]) {
    filterHeader.innerHTML = "";
    categories.forEach(category => {
       filterHeader.innerHTML += buildFilterDisplay(category, containsFilter(category.id));
    });
}

function fillRecipeList(recipeList: HTMLElement, recipes: Rezept[]) {
    recipeList.innerHTML = "";
    for (let i = 0; i < recipes.length; i++){
        const recipe = recipes[i];
        recipeList.innerHTML += buildRecipeDisplay(recipe, costs[i]);
    }
}

function updateRecipeImages(recipes: Rezept[]) {
    recipes.forEach(recipe => {
        const recipeImage = document.getElementById("RecipeImage" + recipe.id);

        if (recipeImage && recipe.bild.length > 0) {
            recipeImage.style.backgroundImage = "url(" + recipe.bild + ")";
        }
    })
}

function getIngredients(recipe: Rezept) : string {
    let result = "";
    for (let i = 0; i < recipe.zutats.length; i++) {
        result += recipe.zutats[i].menge + "-" + recipe.zutats[i].zutat.einheit + " " + recipe.zutats[i].zutat.name;
        if(i < recipe.zutats.length -1) {
            result += ", ";
        }
    }
    return result;
}

function getPricetag(price: number) : string {
    let result = price.toString();
    let cents = result.split(".");
    result = cents[0];
    if(cents.length == 1)
        result += ".00";
    else if(cents[1].length == 1)
        result += "." + cents[1] + "0";
    else {
        result += "." + cents[1];
    }
    return result;
}

function buildRecipeDisplay(recipe: Rezept, costs: number): String {
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
                <p class="RecipeIngredients">`+ getIngredients(recipe) + `</p>
                <div class="RecipeFooter">
                    <a class="AddToCartButton" id="AddRecipeToCart` + recipe.id + `">+ `+ getPricetag(costs) +`€</a>
                </div>
            </div>
        </div>
    `;
}

function buildFilterDisplay(category: Kategorie, selected: boolean) : String {
    return `
        <div class="` + (selected ? "RecipeFilterSelected" : "RecipeFilter" )+ `" id="Filter` + category.id + `">
            <a>` + category.name + `</a>
        </div>
    `;
}