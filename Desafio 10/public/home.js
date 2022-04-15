const form = document.getElementById("productsForm");
const btnAll = document.getElementById("btnAll");

form.addEventListener("submit", async(e)=>{
    e.preventDefault();
    addProduct();
});

btnAll.addEventListener("click", ()=>{
    location.pathname = "products";
});