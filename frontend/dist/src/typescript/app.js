"use strict";
// app.ts
document.addEventListener("DOMContentLoaded", function () {
    // Your application logic goes here
    console.log("Application loaded!");
    var words = ["delicious", "fresh", "drippy", "saucy", "nice", "yummy"];
    var currentWordIndex = 0;
    var currentText = words[0];
    var currentIndex = 0;
    var currentlyDeleting = false;
    var delay = 0;
    // Example: Modify styles using TypeScript
    var homeTextElement = document.getElementById("HomeText");
    var homeImageElement = document.getElementById("Home");
    if (homeImageElement) {
        updateImagePosition();
        window.addEventListener("scroll", updateImagePosition);
    }
    function updateImagePosition() {
        var scrollPos = window.scrollY;
        // @ts-ignore
        homeImageElement.style.backgroundPositionY = Math.min(50 + (scrollPos / 10), 100) + "%";
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
        console.log("animate");
        if (delay > 0) {
            delay--;
            return;
        }
        if (currentlyDeleting) {
            deleteText();
            if (currentIndex == 0) {
                currentWordIndex = (currentWordIndex + 1) % words.length;
                currentText = words[currentWordIndex];
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
    return;
    // Example: Make a request to your backend endpoint
    fetch("https://your-backend-api.com/api/data")
        .then(function (response) { return response.json(); })
        .then(function (data) { return console.log(data); })
        .catch(function (error) { return console.error("Error fetching data:", error); });
});
