"use strict";
// app.ts
document.addEventListener("DOMContentLoaded", function () {
    // Your application logic goes here
    console.log("Application loaded!");
    var words = ["delicious", "fresh", "drippy", "saucy", "nice", "yummy"];
    var currentWordIndex = 0;
    var currentText = words[0];
    var currentIndex = 0;
    // Example: Modify styles using TypeScript
    var appElement = document.getElementById("HomeText");
    function writeText(id) {
        if (currentIndex < currentText.length)
            currentIndex++;
        // @ts-ignore
        appElement.textContent = "Order " + words[currentWordIndex].slice(0, currentIndex) + " food to your doorstep";
        if (currentIndex + 1 == currentText.length) {
            var deleteID_1 = setTimeout(function () {
                var timeoutID = setTimeout(function () {
                    deleteText(timeoutID);
                }, 300);
                clearTimeout(deleteID_1);
            }, 2000);
            clearTimeout(id);
        }
    }
    function deleteText(id) {
        if (currentIndex > 0)
            currentIndex--;
        // @ts-ignore
        appElement.textContent = "Order " + words[currentWordIndex].slice(0, currentIndex) + " food to your doorstep";
        if (currentIndex == 0) {
            var writeID_1 = setTimeout(function () {
                var timeoutID = setTimeout(function () {
                    writeText(timeoutID);
                }, 300);
                clearTimeout(writeID_1);
            }, 100);
            currentWordIndex = (currentWordIndex + 1) % words.length;
            clearTimeout(id);
        }
    }
    function animateText() {
        var timeoutID = setTimeout(function () {
            writeText(timeoutID);
        }, 300);
    }
    if (appElement) {
        animateText();
    }
    return;
    // Example: Make a request to your backend endpoint
    fetch("https://your-backend-api.com/api/data")
        .then(function (response) { return response.json(); })
        .then(function (data) { return console.log(data); })
        .catch(function (error) { return console.error("Error fetching data:", error); });
});
