const api = "https://fakestoreapi.com/products"; 

async function fetchProductById(id) {
    const res = await fetch(`${api}/${id}`);
    return await res.json();
}

async function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;

    for (let item of cart) {
        const product = await fetchProductById(item.id);
        console.log(product);

        const cartItem = `
            <li class="flex justify-between items-center border-b pb-2">
                <div>
                    <img src="${product.image}" alt="${product.title}" class="w-10 h-10 inline-block mr-2">
                    <span>${product.title} (x${item.quantity})</span>
                </div>
                <div>
                    <span>$${(product.price * item.quantity).toFixed(2)}</span>
                    <button onclick="removeFromCart(${item.id})" class="text-red-500 text-sm ml-2">
                        Remove
                    </button>
                </div>
            </li>
        `;
        cartItems.innerHTML += cartItem;

        total += product.price * item.quantity;
    }

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}


function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
        } else {
            cart.splice(itemIndex, 1);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

document.getElementById("clear-cart").addEventListener("click", () => {
    localStorage.removeItem("cart");
    renderCart();
});


renderCart();
