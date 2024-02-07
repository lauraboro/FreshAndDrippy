"use strict";
// app.ts
document.addEventListener("DOMContentLoaded", function () {
    console.log("Contact popup loaded");
    const openContactPopupButton = document.getElementById("OpenContactPopup");
    const homeButton = document.getElementById("HomeButton");
    const homeContent = document.getElementById("Home");
    const recipeButton = document.getElementById("RecipesButton");
    const recipeContent = document.getElementById("Recipes");
    const aboutButton = document.getElementById("AboutButton");
    const aboutContent = document.getElementById("About");
    const closeContactPopupButton = document.getElementById("CloseContactPopup");
    const contactPopupContainer = document.getElementById("ContactPopupContainer");
    const body = document.body;
    if (openContactPopupButton && closeContactPopupButton && contactPopupContainer) {
        openContactPopupButton.addEventListener("click", function () {
            contactPopupContainer.style.display = "flex";
            body.classList.add("no-scroll");
        });
        closeContactPopupButton.addEventListener("click", function () {
            contactPopupContainer.style.display = "none";
            body.classList.remove("no-scroll");
        });
    }
    if (recipeButton && recipeContent) {
        recipeButton.addEventListener("click", () => {
            recipeContent.scrollIntoView({ behavior: 'smooth' });
        });
    }
    if (homeButton && homeContent) {
        homeButton.addEventListener("click", () => {
            homeContent.scrollIntoView({ behavior: 'smooth' });
        });
    }
    if (aboutButton && aboutContent) {
        aboutButton.addEventListener("click", () => {
            aboutContent.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Your application logic goes here
    console.log("Application loaded!");
    const words = ["delicious", "fresh", "drippy", "saucy", "nice", "yummy", "sweet", "amazing", "tangy"];
    let currentWordIndex = 0;
    let currentText = words[0];
    let currentIndex = 0;
    let currentlyDeleting = false;
    let delay = 0;
    // Example: Modify styles using TypeScript
    const homeTextElement = document.getElementById("HomeText");
    const homeImageElement = document.getElementById("Home");
    if (homeImageElement) {
        updateImagePosition();
        window.addEventListener("scroll", updateImagePosition);
    }
    function updateImagePosition() {
        const scrollPos = window.scrollY;
        // @ts-ignore
        homeImageElement.style.backgroundPositionY = Math.min(50 + (scrollPos / 15), 100) + "%";
    }
    function writeText() {
        if (currentIndex < currentText.length)
            currentIndex++;
        // @ts-ignore
        homeTextElement.innerHTML = "Order " + currentText.slice(0, currentIndex) + " food to<br>" +
            "your doorstep";
    }
    function deleteText() {
        if (currentIndex > 0)
            currentIndex--;
        // @ts-ignore
        homeTextElement.innerHTML = "Order " + currentText.slice(0, currentIndex) + " food to<br>" +
            "your doorstep";
    }
    function animateText() {
        if (delay > 0) {
            delay--;
            return;
        }
        if (currentlyDeleting) {
            deleteText();
            if (currentIndex == 0) {
                currentWordIndex = (currentWordIndex + 1) % words.length;
                currentText = words[currentWordIndex];
                if (Math.random() < 0.02)
                    currentText = "gottlos";
                delay = 2;
                currentlyDeleting = false;
            }
        }
        else {
            writeText();
            if (currentIndex == currentText.length) {
                currentlyDeleting = true;
                delay = 20;
            }
        }
    }
    if (homeTextElement) {
        animateText();
        setInterval(animateText, 100);
    }
});
