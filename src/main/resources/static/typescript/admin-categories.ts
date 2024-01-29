document.addEventListener("DOMContentLoaded", function () {
    console.log("Category editor loaded");

    const categoryList = document.getElementById("CategoryList");


    function getCategoryForID(id: number) : string {
        return "";
    }

    if(categoryList) {
        categoryList.innerHTML = getCategoryForID(1);
    }
});
