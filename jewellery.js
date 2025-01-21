const api = "https://fakestoreapi.com/products"



async function fetchdata()
{
    let res = await fetch(api);
    let data = await res.json();
    newData = data.filter(getJewellery)
    
    renderList(newData);
}

function getJewellery(data)
{
    if (data.category == "jewelery"){
        return true;
    }
}


function renderList(data)
{
    let container = document.getElementById('container')
    data.map((item)=>{
        let div = document.createElement('div')
        div.setAttribute('class','h-fit w-[80%] mx-auto')
        div.innerHTML = `
        
        <div class="flex-row w-full h-fit mb-5 border-2 border-black rounded-md">
            <div class="w-[30%] h-[150px] overflow-hidden p-2  ">
                <img src="${item.image}" alt="" class="w-full h-full object-cover"> 
            </div>
            <div class="flex-1 p-2"> 
                <h1 class="text-lg font-bold">${item.title}</h1>
                <p class="text-sm text-gray-600">${item.description}</p>
                <p class="text-base font-medium">Price: $${item.price}</p>
                <p class="text-sm text-gray-500">Rating: ${item.rating.rate}</p>
            </div>
            <div class="h-10 m-2">    
                <button onclick="addToCart(${item.id})" class="bg-blue-400  text-white p-1 rounded-md">Add to Cart</button>
            </div>
        </div>

        `
        container.appendChild(div)
    })
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
}


fetchdata()