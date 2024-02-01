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
        console.log("Application loaded!");
        const recipes = yield fetchRecipes();
        displayRecipes(recipes);
        return;
    });
});
function fetchRecipes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:8080/api/allRezepte');
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching recipes:', error);
            return [];
        }
    });
}
function displayRecipes(recipes) {
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
