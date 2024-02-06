// app.ts

document.addEventListener("DOMContentLoaded", function () {
    console.log("Contact popup loaded");
    const openContactPopupButton = document.getElementById("OpenContactPopup");
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
                if(Math.random() < 0.02)
                    currentText = "gottlos";
                delay = 2;
                currentlyDeleting = false;
            }
        } else {
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

//Shopping Cart logic
let itemsInCart: { id: number; name: string; menge: number }[] = [];

function openCart() {
    const body = document.body;
    let shoppingCart = document.getElementById("shoppingCart");
    if (shoppingCart) {
        shoppingCart.classList.add('cart-active');
    }
}

function closeCart() {
    const body = document.body;
    let shoppingCart = document.getElementById("shoppingCart");
    if (shoppingCart) {
        shoppingCart.classList.remove('cart-active');
    }
}

function addToCart() {
    const dailyRecipeName = document.getElementById('RecipeTitle');
    const quantity = document.getElementById("quantity");
    const totalPrice = document.getElementById("totalPrice");
    const cartList = document.getElementById("cartList");

    if (!dailyRecipeName || !quantity || !cartList || !totalPrice) {
        return;
    }
    const recipeId = String(dailyRecipeName.dataset.id);
    const recipeName = dailyRecipeName.innerHTML;
    let count = 0;
    console.log(recipeId, recipeName);

    //itemsInCart.push({id: parseInt(recipeId), name: recipeName});
    putInCart(parseInt(recipeId), recipeName);


    cartList.innerHTML = "";
    itemsInCart.forEach(item => {
        count += item.menge;
        cartList.innerHTML += `
            <div>
                <a >` + item.menge + `x ` + item.name + `</a>
            </div>
        `;
    });
    quantity.innerHTML = String(count);
    totalPrice.innerHTML = "hallo";
}


function putInCart(id: number, name: string) {
    if (inList(id)) {
        itemsInCart.forEach(item => {
            if (item.id == id) {
                item.menge++;
            }
        })
        return;
    }
    itemsInCart.push({id: id, name: name, menge: 1});
}

function inList(id: number): boolean {
    return itemsInCart.some(item => item.id === id);
}