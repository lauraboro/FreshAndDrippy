interface Kategorie {
    id: number;
    name: string;
    beschreibung: string;
}

let selectedID: number;

document.addEventListener("DOMContentLoaded", async function () {
    console.log("Category editor loaded");

    await loadCategoryList();
    addClosePopupListener();
    addConfirmEditListener();
    addCategoryButtonEventListener();
});


function getHtmlForCategory(category: Kategorie) : string {
    return `
            <div class="CategoryEntry">
                <a class="CategoryName">`+ category.name + `</a>
                <p class="CategoryDescription">`+ category.beschreibung + `</p>
                <div class="CategoryEditButton" id="EditButton`+ category.id + `">
                    
                </div>
            </div>
        `;
}

async function fetchCategories() : Promise<Kategorie[]> {
    try {
        const response = await fetch('http://localhost:8080/api/allKategorien');
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

async function updateCategoryList(categoryList: HTMLElement) {
    const categories = await fetchCategories();
    let innerHtml = "";
    categories.forEach(category => {
        innerHtml += getHtmlForCategory(category);
    });
    categoryList.innerHTML = innerHtml;
    addEventListeners(categories);
}

function addCategoryButtonEventListener() {
    const categoryListPopup = document.getElementById("EditCategoryListPopup");
    const popupTitle = document.getElementById("CategoryEditPopupTitle");
    const popupName = document.getElementById("CategoryEditNameText") as HTMLInputElement;
    const popupDescription = document.getElementById("CategoryEditDescriptionText") as HTMLTextAreaElement;
    const body = document.body;

    if(!categoryListPopup || !popupTitle || !popupDescription) return;

    const addCategoryButton = document.getElementById("AddCategoryButton");

    if(!addCategoryButton) return;

    addCategoryButton.addEventListener("click", function () {
        categoryListPopup.style.display = "flex";
        body.classList.add("no-scroll");
        popupTitle.textContent = "Add new category";
        popupName.value = "";
        popupDescription.value = "";
        selectedID = 0;
    });
}

function addEventListeners(categories: Kategorie[]) {
    const categoryListPopup = document.getElementById("EditCategoryListPopup");
    const popupTitle = document.getElementById("CategoryEditPopupTitle");
    const popupName = document.getElementById("CategoryEditNameText") as HTMLInputElement;
    const popupDescription = document.getElementById("CategoryEditDescriptionText") as HTMLTextAreaElement;
    const body = document.body;

    if(!categoryListPopup || !popupTitle || !popupDescription) return;

    for(let i = 0; i < categories.length; i++) {
        const editButton = document.getElementById("EditButton" + i);

        if(editButton) {
            editButton.addEventListener("click", function () {
                categoryListPopup.style.display = "flex";
                body.classList.add("no-scroll");
                popupTitle.textContent = "Edit " + categories[i - 1].name;
                popupName.value = categories[i - 1].name;
                popupDescription.value = categories[i - 1].beschreibung;
                selectedID = i;
            });
        }
    }
}

async function loadCategoryList() {
    const categoryList = document.getElementById("CategoryListContent");

    if(categoryList) {
        await updateCategoryList(categoryList);
    }
}

function addClosePopupListener() {
    const closePopupButton = document.getElementById("CloseEditCategoryListPopup");
    const categoryListPopup = document.getElementById("EditCategoryListPopup");
    const body = document.body;

    if(closePopupButton && categoryListPopup) {
        closePopupButton.addEventListener("click", function () {
            closePopup();
        });
    }
}

function closePopup() {
    const categoryListPopup = document.getElementById("EditCategoryListPopup");
    const body = document.body;

    if(!categoryListPopup || !body) return;

    categoryListPopup.style.display = "none";
    body.classList.remove("no-scroll");

}

function addConfirmEditListener() {
    const confirmEditButton = document.getElementById("ConfirmEditButton");

    if(confirmEditButton) {
        confirmEditButton.addEventListener("click", function() {
            const popupTitle = document.getElementById("CategoryEditNameText") as HTMLInputElement;
            const popupDescription = document.getElementById("CategoryEditDescriptionText") as HTMLTextAreaElement;

            if(!popupTitle || !popupDescription) return;

            let categoryData= {
                id: selectedID,
                name: popupTitle.value,
                beschreibung: popupDescription.value,
            };

            let jsonDataString  = JSON.stringify(categoryData);
            console.log(jsonDataString);

            fetch("http://localhost:8080/api/sendKategorieUpdate", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: jsonDataString
            })
                .then(response => {
                    console.log(response);
                    loadCategoryList();
                    closePopup();
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