let collectedIngredients: { zutatId: number; menge: number; name: string; einheit: string }[] = [];

interface Zutat {
    id: number;
    name: string;
    einheit: string
}

function saveRecipe() {
    let rezeptName = document.getElementById("name") as HTMLInputElement;
    let rezeptDuration = document.getElementById("duration") as HTMLInputElement;

    let rezeptDescription = document.getElementById("description") as HTMLInputElement;

    const neuesRezeptRequest = {
        name: rezeptName.value,
        duration: rezeptDuration.value,
        description: rezeptDescription.value,
        zutaten: JSON.stringify(collectedIngredients),
        kategorien: JSON.stringify([0])
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
        .then(data => {
            console.log(data);
            location.reload();
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
                    ingredientRow.classList.add('ingredient-row'); // Add a class for styling

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
