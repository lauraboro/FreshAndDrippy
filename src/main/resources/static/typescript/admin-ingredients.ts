interface Zutat {
    id: number;
    name: string;
    beschraenkungs: Beschraenkung[];
}

let selectedIngredientID: number;
let collectedRestrictions: { id: number; name: string; }[] = [];

document.addEventListener("DOMContentLoaded", async function () {

    await loadIngredientList();
    addIngredientClosePopupListener();
    addConfirmEditIngredientListener();
    addIngredientButtonEventListener();
});


function getHtmlForIngredient(ingredient: Zutat): string {
    let beschraenkung: string = "Keine Beschränkung";
    if (ingredient.beschraenkungs != null) {
        beschraenkung = "";
        for (let i = 0; i < ingredient.beschraenkungs.length; i++) {
            beschraenkung += ingredient.beschraenkungs[i].name;
            if (i < ingredient.beschraenkungs.length - 1) {
                beschraenkung += ", ";
            }
        }
    }

    return `
            <div class="adminTableEntry">
                <a class="adminTableEntryName">` + ingredient.name + `</a>
                <p class="adminTableEntryDescription">` + beschraenkung + `</p>
                <div class="adminTableEditButton" id="EditButton` + ingredient.id + `">
                </div>
            </div>
        `;
}

async function fetchIngredients(): Promise<Zutat[]> {
    try {
        const response = await fetch('http://localhost:8080/api/allZutaten');
        return await response.json();
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        return [];
    }
}

async function updateIngredientList(ingredientList: HTMLElement) {
    const ingredients = await fetchIngredients();
    let innerHtml = "";
    ingredients.forEach(ingredient => {
        innerHtml += getHtmlForIngredient(ingredient);
    });
    ingredientList.innerHTML = innerHtml;
    addIngredientEventListeners(ingredients);
}

function addIngredientButtonEventListener() {
    const ingredientListPopup = document.getElementById("EditIngredientListPopup");
    const popupTitle = document.getElementById("IngredientEditPopupTitle");
    const popupName = document.getElementById("IngredientEditNameText") as HTMLInputElement;
    const popupMultiselect = document.getElementById("IngredientMultiselect") as HTMLSelectElement;
    const body = document.body;

    if (!ingredientListPopup || !popupTitle || !popupMultiselect) return;

    const addIngredientButton = document.getElementById("AddIngredientButton");

    if (!addIngredientButton) return;

    addIngredientButton.addEventListener("click", function () {
        ingredientListPopup.style.display = "flex";
        body.classList.add("no-scroll");
        popupTitle.textContent = "Add new ingredient";
        popupName.value = "";
        selectedIngredientID = 0;
        fetch('http://localhost:8080/api/allBeschraenkungen')
            .then(response => response.json() as Promise<Beschraenkung[]>)
            .then((data: Beschraenkung[]) => {
                popupMultiselect.innerHTML = '';
                console.log(data);
                data.forEach(beschraenkung => {
                    const optionElement = document.createElement("option");
                    optionElement.text = beschraenkung.name;
                    optionElement.dataset.id = String(beschraenkung.id);
                    popupMultiselect.add(optionElement);
                })
            });
    });
}

function addIngredientEventListeners(ingredients: Zutat[]) {
    const ingredientListPopup = document.getElementById("EditIngredientListPopup");
    const popupTitle = document.getElementById("IngredientEditPopupTitle");
    const popupName = document.getElementById("IngredientEditNameText") as HTMLInputElement;
    const popupMultiselect = document.getElementById("IngredientMultiselect") as HTMLSelectElement;
    const body = document.body;

    if (!ingredientListPopup || !popupTitle || !popupMultiselect) return;

    for (let i = 1; i <= ingredients.length; i++) {
        const editButton = document.getElementById("EditButton" + i);

        if (editButton) {
            editButton.addEventListener("click", function () {
                ingredientListPopup.style.display = "flex";
                body.classList.add("no-scroll");
                popupTitle.textContent = "Edit " + ingredients[i - 1].name;
                popupName.value = ingredients[i - 1].name;
                selectedIngredientID = i;
                fetch('http://localhost:8080/api/allBeschraenkungen')
                    .then(response => response.json() as Promise<Beschraenkung[]>)
                    .then((data: Beschraenkung[]) => {
                        popupMultiselect.innerHTML = '';
                        console.log(data);
                        data.forEach(beschraenkung => {
                            const optionElement = document.createElement("option");
                            optionElement.text = beschraenkung.name;
                            optionElement.dataset.id = String(beschraenkung.id);
                            popupMultiselect.add(optionElement);
                        })
                    });
            });
        }
    }
}

async function loadIngredientList() {
    const ingredientList = document.getElementById("IngredientListContent");

    if (ingredientList) {
        await updateIngredientList(ingredientList);
    }
}

function addIngredientClosePopupListener() {
    const closePopupButton = document.getElementById("CloseEditIngredientListPopup");
    const ingredientListPopup = document.getElementById("EditIngredientListPopup");
    const body = document.body;

    if (closePopupButton && ingredientListPopup) {
        closePopupButton.addEventListener("click", function () {
            closeIngredientPopup();
        });
    }
}

function closeIngredientPopup() {
    const ingredientListPopup = document.getElementById("EditIngredientListPopup");
    const body = document.body;
    if (!ingredientListPopup || !body) return;

    ingredientListPopup.style.display = "none";
    body.classList.remove("no-scroll");

}

function addConfirmEditIngredientListener() {
    const confirmEditButton = document.getElementById("IngredientConfirmEditButton");

    if (confirmEditButton) {
        confirmEditButton.addEventListener("click", function () {
            const popupTitle = document.getElementById("IngredientEditNameText") as HTMLInputElement;
            const popupMultiselect = document.getElementById("IngredientMultiselect") as HTMLSelectElement;

            for (let i = 0; i < popupMultiselect.options.length; i++) {

                const beschraenkungId = popupMultiselect.options[i].dataset.id!;
                const name = popupMultiselect.options[i].value;

                if (name != null && popupMultiselect.options[i].selected) {
                    collectedRestrictions.push({
                        id: parseInt(beschraenkungId),
                        name: name,
                    });
                }
            }

            if (!popupTitle || !popupMultiselect) return;

            let categoryData = {
                id: selectedIngredientID,
                name: popupTitle.value,
                einheit: 'Stück',
                beschraenkungs: collectedRestrictions,
            };

            console.log(categoryData);

            let jsonDataString = JSON.stringify(categoryData);

            fetch("http://localhost:8080/api/sendZutatUpdate", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: jsonDataString
            })
                .then(response => {
                    loadIngredientList();
                    closeIngredientPopup();
                })
                .then(data => {
                    console.log("Successfully transmitted data: ", data);
                })
                .catch(error => {
                    console.log("Error transmitting data: ", error);
                });
        });
    }
}