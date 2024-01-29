interface Kategorie {
    id: number;
    name: string;
    beschreibung: string;
}

function getHtmlForCategory(category: Kategorie) : string {
    return `
            <div class="CategoryEntry">
                <a class="CategoryName">`+ category.name + `</a>
                <p class="CategoryDescription">`+ category.beschreibung + `</p>
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

document.addEventListener("DOMContentLoaded", async function () {
    console.log("Category editor loaded");

    const categoryList = document.getElementById("CategoryListContent");

    if(categoryList) {
        const categories = await fetchCategories();
        let innerHtml = "";
        categories.forEach(category => {
             innerHtml += getHtmlForCategory(category);
        });
        categoryList.innerHTML = innerHtml;
    }
});
