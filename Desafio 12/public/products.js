const formProductos = document.getElementById("formProductos");
const productsList = document.getElementById("productsList");
const emptyList = document.getElementById("emptyList");

const showList = ()=>{
    productsList.classList.remove("d-none");
    emptyList.classList.add("d-none");
}

const renderProduct = (product)=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <th scope="row">${product.id}</th>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td><img class="img-fluid" src=${product.thumbnail} alt=${product.name} width="75rem"></td>
    `;
    productsList.querySelector("tbody").appendChild(tr);
};

formProductos.addEventListener("submit", (e)=>{
    e.preventDefault();
    const data = new FormData(formProductos);
    let obj = {};
    data.forEach((value,key)=>obj[key]=value);
    socket.emit("product", obj);
    formProductos.reset();
});