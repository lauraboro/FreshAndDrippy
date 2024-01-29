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
function getHtmlForCategory(category) {
    return `
            <div class="CategoryEntry">
                <a class="CategoryName">` + category.name + `</a>
                <p class="CategoryDescription">` + category.beschreibung + `</p>
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
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Category editor loaded");
        const categoryList = document.getElementById("CategoryListContent");
        if (categoryList) {
            const categories = yield fetchCategories();
            let innerHtml = "";
            categories.forEach(category => {
                innerHtml += getHtmlForCategory(category);
            });
            categoryList.innerHTML = innerHtml;
        }
    });
});
