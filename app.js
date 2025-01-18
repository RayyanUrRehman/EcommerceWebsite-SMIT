

// fetch('https://fakestoreapi.com/products')
//             .then(res=>res.json())
//             .then(json=>console.log(json))

const api = 'https://fakestoreapi.com/products';

async function fetchData() {
    let res = await fetch(api);
    let data = await res.json();
    // console.log(data.categories)
    data.map((item)=>{
        console.log(item.category);
    })
}

fetchData()