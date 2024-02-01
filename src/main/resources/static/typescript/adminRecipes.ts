let collectedIngredients: { zutatId: number; menge: number; name: string; einheit: string }[] = [];
let collectedCategories: { kategorieId: number; name: string; beschreibung: string }[] = [];

interface Zutat {
    id: number;
    name: string;
    einheit: string
}

interface Kategorie {
    id: number;
    name: string;
}

function saveRecipe() {
    let rezeptName = document.getElementById("name") as HTMLInputElement;
    let rezeptDuration = document.getElementById("duration") as HTMLInputElement;

    let rezeptDescription = document.getElementById("description") as HTMLInputElement;

    const neuesRezeptRequest = {
        name: rezeptName.value,
        duration: rezeptDuration.value,
        description: rezeptDescription.value,
        zutaten: collectedIngredients,
        kategorien: [0]
    };
    let rezeptRequestJson = JSON.stringify(neuesRezeptRequest);
    console.log(rezeptRequestJson);

    fetch('http://localhost:8080/api/rezepte/createRezept', {
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

    const ingredientRows = document.querySelectorAll('.ingredient-row');

    ingredientRows.forEach(row => {
        const label = row.querySelector('label')!;
        const input = row.querySelector('input')!;

        const zutatId = label.dataset.id!;
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
        .then(response => response.json() as Promise<Zutat[]>)
        .then((data: Zutat[]) => {
            const ingredientList = document.getElementById('ingredientList');
            if (ingredientList) {
                ingredientList.innerHTML = '';

                console.log(data);

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
        .then(response => response.json() as Promise<Kategorie[]>)
        .then((data: Kategorie[]) => {
            const categoryList = document.getElementById('categoryList');
            if (categoryList) {
                categoryList.innerHTML = '';

                console.log(data);

                data.forEach(category => {
                    const categoryRow = document.createElement('div');
                    categoryRow.classList.add('popup-row'); // Add a class for styling

                    const label = document.createElement('label');
                    label.dataset.id = String(category.id);
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

    const ingredientRows = document.querySelectorAll('.ingredient-row');

    ingredientRows.forEach(row => {
        const label = row.querySelector('label')!;
        const input = row.querySelector('input')!;

        const zutatId = label.dataset.id!;
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
    closeCategoryPopUp();
    //displayCollectedIngredients();
}

function closeCategoryPopUp() {
    const categoryPopup = document.getElementById('categoryPopup');
    if (categoryPopup) {
        categoryPopup.style.display = 'none';
    }
}
