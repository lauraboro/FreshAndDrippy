// app.ts

document.addEventListener("DOMContentLoaded", function () {
    // Your application logic goes here
    console.log("Application loaded!");

    const words = ["delicious", "fresh", "drippy", "saucy", "nice", "yummy"];
    let currentWordIndex = 0;

    let currentText = words[0];
    let currentIndex = 0;

    // Example: Modify styles using TypeScript
    const appElement = document.getElementById("HomeText");

    function writeText(id: number) {
        if(currentIndex < currentText.length)
            currentIndex++;
        // @ts-ignore
        appElement.textContent = "Order " + words[currentWordIndex].slice(0, currentIndex) + " food to your doorstep";

        if(currentIndex + 1 == currentText.length) {
            const deleteID = setTimeout( () => {
                const timeoutID = setTimeout(() => {
                    deleteText(timeoutID);
                }, 300)
                clearTimeout(deleteID);
            }, 2000);
            clearTimeout(id);
        }
    }
    function deleteText(id: number) {
        if(currentIndex > 0)
            currentIndex--;

        // @ts-ignore
        appElement.textContent = "Order " + words[currentWordIndex].slice(0, currentIndex) + " food to your doorstep";

        if(currentIndex == 0) {
            const writeID = setTimeout(() => {
                const timeoutID = setTimeout(() => {
                    writeText(timeoutID);
                }, 300);
                clearTimeout(writeID);
            }, 100);
            currentWordIndex = (currentWordIndex + 1) % words.length;
            clearTimeout(id);
        }
    }

    function animateText() {
        const timeoutID = setTimeout(() => {
            writeText(timeoutID);
        }, 300)
    }

    if(appElement) {
        animateText();
    }

    return;
    // Example: Make a request to your backend endpoint
    fetch("https://your-backend-api.com/api/data")
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error fetching data:", error));
});
