"use strict";
let collectedIngredients = [];
let collectedCategories = [];
function saveRecipe() {
    let rezeptName = document.getElementById("name");
    let rezeptDuration = document.getElementById("duration");
    let rezeptDescription = document.getElementById("description");
    const neuesRezeptRequest = {
        name: rezeptName.value,
        duration: rezeptDuration.value,
        description: rezeptDescription.value,
        zutaten: collectedIngredients,
        kategorien: collectedCategories
    };
    let rezeptRequestJson = JSON.stringify(neuesRezeptRequest);
    fetch('http://localhost:8080/api/createRezept', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: rezeptRequestJson,
    })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .catch(error => console.error('Error:', error));
    console.log(neuesRezeptRequest);
}
function saveIngredients() {
    collectedIngredients = [];
    const ingredientRows = document.querySelectorAll('.popup-row');
    ingredientRows.forEach(row => {
        const label = row.querySelector('label');
        const input = row.querySelector('input');
        const zutatId = label.dataset.id;
        const menge = input.value;
        const name = label.textContent;
        const einheit = label.dataset.einheit;
        if (menge && parseInt(menge) !== 0 && name != null && einheit != null) {
            collectedIngredients.push({
                zutatId: parseInt(zutatId),
                menge: parseInt(menge),
                name: name,
                einheit: einheit
            });
        }
    });
    closeIngredientPopUp();
    displayCollectedIngredients();
}
function displayCollectedIngredients() {
    const collectedIngredientsList = document.getElementById('selectedIngredients');
    if (collectedIngredientsList) {
        collectedIngredientsList.innerHTML = '';
        collectedIngredients.forEach(collectedIngredient => {
            const ingredientRow = document.createElement('div');
            ingredientRow.textContent = `${collectedIngredient.name} ${collectedIngredient.menge} ${collectedIngredient.einheit}`;
            collectedIngredientsList.appendChild(ingredientRow);
        });
    }
}
function openIngredientPopUp() {
    fetch('http://localhost:8080/api/allZutaten')
        .then(response => response.json())
        .then((data) => {
        const ingredientList = document.getElementById('ingredientList');
        if (ingredientList) {
            ingredientList.innerHTML = '';
            data.forEach(ingredient => {
                const ingredientRow = document.createElement('div');
                ingredientRow.classList.add('popup-row'); // Add a class for styling
                const label = document.createElement('label');
                label.dataset.id = String(ingredient.id);
                label.textContent = ingredient.name;
                label.dataset.einheit = ingredient.einheit;
                const input = document.createElement('input');
                input.type = 'number';
                input.classList.add('ingredient-quantity-popup');
                input.placeholder = 'Quantity';
                input.min = '0';
                // Append elements to the ingredientRow
                ingredientRow.appendChild(label);
                ingredientRow.appendChild(input);
                // Append the ingredientRow to the ingredientList
                if (ingredientList) {
                    ingredientList.appendChild(ingredientRow);
                }
            });
            // Show the popup
            const ingredientPopup = document.getElementById('ingredientPopup');
            if (ingredientPopup) {
                ingredientPopup.style.display = 'block';
            }
        }
    });
}
function closeIngredientPopUp() {
    const ingredientPopup = document.getElementById('ingredientPopup');
    if (ingredientPopup) {
        ingredientPopup.style.display = 'none';
    }
}
function openCategoriesPopUp() {
    fetch('http://localhost:8080/api/allKategorien')
        .then(response => response.json())
        .then((data) => {
        const categoryList = document.getElementById('categoryList');
        if (categoryList) {
            categoryList.innerHTML = '';
            console.log(data);
            data.forEach(category => {
                const categoryRow = document.createElement('div');
                categoryRow.classList.add('popup-row'); // Add a class for styling
                const label = document.createElement('label');
                label.dataset.id = String(category.id);
                label.dataset.beschreibung = String(category.beschreibung);
                label.textContent = category.name;
                const input = document.createElement('input');
                input.type = 'checkbox';
                categoryRow.appendChild(label);
                categoryRow.appendChild(input);
                if (categoryList) {
                    categoryList.appendChild(categoryRow);
                }
            });
            // Show the popup
            const categroyPopup = document.getElementById('categoryPopup');
            if (categroyPopup) {
                categroyPopup.style.display = 'block';
            }
        }
    });
}
function saveCategories() {
    collectedCategories = [];
    const categoryRows = document.querySelectorAll('.popup-row');
    categoryRows.forEach(row => {
        const label = row.querySelector('label');
        const input = row.querySelector('input');
        const kategorieId = label.dataset.id;
        const name = label.textContent;
        const beschreibung = label.dataset.beschreibung;
        if (beschreibung && name != null && input.checked) {
            collectedCategories.push({
                id: parseInt(kategorieId),
                name: name,
                beschreibung: beschreibung
            });
        }
    });
    console.log(collectedCategories);
    closeCategoryPopUp();
    displayCollectedCategories();
}
function displayCollectedCategories() {
    const collectedCategoriesList = document.getElementById('selectedCategories');
    if (collectedCategoriesList) {
        collectedCategoriesList.innerHTML = '';
        console.log(collectedCategories);
        collectedCategories.forEach(collectedIngredient => {
            const categoryRow = document.createElement('div');
            categoryRow.textContent = `${collectedIngredient.name}`;
            collectedCategoriesList.appendChild(categoryRow);
        });
    }
}
function closeCategoryPopUp() {
    const categoryPopup = document.getElementById('categoryPopup');
    if (categoryPopup) {
        categoryPopup.style.display = 'none';
    }
}
