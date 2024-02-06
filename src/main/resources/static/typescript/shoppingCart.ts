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

function addToCart(id: number, name: string) {
    const quantity = document.getElementById("quantity");
    const totalPrice = document.getElementById("totalPrice");
    const cartList = document.getElementById("cartList");

    if (!quantity || !cartList || !totalPrice) {
        return;
    }
    const recipeId = String(id);
    const recipeName = name;
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