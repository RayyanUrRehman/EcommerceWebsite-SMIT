const api = "https://fakestoreapi.com/products"



async function fetchdata()
{
    let res = await fetch(api);
    let data = await res.json();
    
    renderList(data);
}

function renderList(data)
{
    let container = document.getElementById('container')
    data.map((item)=>{
        let div = document.createElement('div')
        div.setAttribute('class','h-fit w-[80%] mx-auto')
        div.innerHTML = `
        <div class="flex w-full h-fit mb-5 border-2 border-black">
            <div class="w-[30%] h-full">
                <img src="${item.image}" alt="">
            </div>
            <div>
                <h1>${item.title}</h1>
                <p class="text-sm">${item.description}</p>
                <p>Price: $${item.price}</p>
                <p>Rating: ${item.rating}</p>
            </div>
        </div>
        `
        container.appendChild(div)
    })
}


fetchdata()