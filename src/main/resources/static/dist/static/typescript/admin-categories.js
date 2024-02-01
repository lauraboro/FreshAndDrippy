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
let selectedID;
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Category editor loaded");
        yield loadCategoryList();
        addClosePopupListener();
        addConfirmEditListener();
        addCategoryButtonEventListener();
    });
});
function getHtmlForCategory(category) {
    return `
            <div class="CategoryEntry">
                <a class="CategoryName">` + category.name + `</a>
                <p class="CategoryDescription">` + category.beschreibung + `</p>
                <div class="CategoryEditButton" id="EditButton` + category.id + `">
                    
                </div>
            </div>
        `;
}
function fetchCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:8080/api/allKategorien');
            return yield response.json();
        }
        catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    });
}
function updateCategoryList(categoryList) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield fetchCategories();
        let innerHtml = "";
        categories.forEach(category => {
            innerHtml += getHtmlForCategory(category);
        });
        categoryList.innerHTML = innerHtml;
        addEventListeners(categories);
    });
}
function addCategoryButtonEventListener() {
    const categoryListPopup = document.getElementById("EditCategoryListPopup");
    const popupTitle = document.getElementById("CategoryEditPopupTitle");
    const popupName = document.getElementById("CategoryEditNameText");
    const popupDescription = document.getElementById("CategoryEditDescriptionText");
    const body = document.body;
    if (!categoryListPopup || !popupTitle || !popupDescription)
        return;
    const addCategoryButton = document.getElementById("AddCategoryButton");
    if (!addCategoryButton)
        return;
    addCategoryButton.addEventListener("click", function () {
        categoryListPopup.style.display = "flex";
        body.classList.add("no-scroll");
        popupTitle.textContent = "Add new category";
        popupName.value = "";
        popupDescription.value = "";
        selectedID = 0;
    });
}
function addEventListeners(categories) {
    const categoryListPopup = document.getElementById("EditCategoryListPopup");
    const popupTitle = document.getElementById("CategoryEditPopupTitle");
    const popupName = document.getElementById("CategoryEditNameText");
    const popupDescription = document.getElementById("CategoryEditDescriptionText");
    const body = document.body;
    if (!categoryListPopup || !popupTitle || !popupDescription)
        return;
    for (let i = 1; i <= categories.length; i++) {
        const editButton = document.getElementById("EditButton" + i);
        if (editButton) {
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
function loadCategoryList() {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryList = document.getElementById("CategoryListContent");
        if (categoryList) {
            yield updateCategoryList(categoryList);
        }
    });
}
function addClosePopupListener() {
    const closePopupButton = document.getElementById("CloseEditCategoryListPopup");
    const categoryListPopup = document.getElementById("EditCategoryListPopup");
    const body = document.body;
    if (closePopupButton && categoryListPopup) {
        closePopupButton.addEventListener("click", function () {
            closePopup();
        });
    }
}
function closePopup() {
    const categoryListPopup = document.getElementById("EditCategoryListPopup");
    const body = document.body;
    if (!categoryListPopup || !body)
        return;
    categoryListPopup.style.display = "none";
    body.classList.remove("no-scroll");
}
function addConfirmEditListener() {
    const confirmEditButton = document.getElementById("ConfirmEditButton");
    if (confirmEditButton) {
        confirmEditButton.addEventListener("click", function () {
            const popupTitle = document.getElementById("CategoryEditNameText");
            const popupDescription = document.getElementById("CategoryEditDescriptionText");
            if (!popupTitle || !popupDescription)
                return;
            let categoryData = {
                id: selectedID,
                name: popupTitle.value,
                beschreibung: popupDescription.value,
            };
            let jsonDataString = JSON.stringify(categoryData);
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
