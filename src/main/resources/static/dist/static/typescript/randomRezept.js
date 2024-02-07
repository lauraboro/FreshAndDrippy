"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const recipe = yield fetchRandomRecipe();
        displayRandomRecipe(recipe);
        return;
    });
});
function fetchRandomRecipe() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:8080/api/randomRezept');
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching recipes:', error);
            return {
                id: 0,
                name: '',
                beschreibung: '',
                zubereitungsdauer: 0,
                bild: '',
                kategories: [],
                zutats: []
            };
        }
    });
}
function displayRandomRecipe(recipe) {
    const dailyRecipeName = document.getElementById('DailyRecipeTitle');
    const dailyRecipeDescription = document.getElementById('DailyRecipeDescription');
    const dailyRecipePrepTime = document.getElementById('DailyRecipePrepTime');
    const dailyRecipeImage = document.getElementById('DailyRecipeImage');
    const addToCartButton = document.getElementById("AddDailyRecipeToCart");
    console.log(recipe.bild);
    if (dailyRecipeName && dailyRecipeDescription && dailyRecipeImage && dailyRecipePrepTime && addToCartButton) {
        dailyRecipeName.innerHTML = recipe.name;
        dailyRecipeDescription.innerHTML = recipe.beschreibung;
        dailyRecipePrepTime.innerHTML = recipe.zubereitungsdauer + "min";
        dailyRecipeImage.style.backgroundImage = recipe.bild ? "url(" + recipe.bild + ")" : 'url(../html/images/recepies/rezept_haehnchen_in_paprika_sahnesoße_05-e1554236259500-1624x1080.jpg)';
        addToCartButton.addEventListener("click", function () {
            addToCart(recipe.id, recipe.name, 0);
        });
    }
    else {
        console.error("One or more elements not found");
    }
}
