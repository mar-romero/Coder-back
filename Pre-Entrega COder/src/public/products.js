const allProductsView = document.getElementById("allProducts");
const oneProductView = document.getElementById("oneProduct");
const productsDiv = document.getElementById("products");

//SERVICES
const toggleView = (view)=>{
    allProductsView.classList.add("d-none");
    oneProductView.classList.add("d-none");
    if (view == "allProducts") return allProductsView.classList.remove("d-none");
    return oneProductView.classList.remove("d-none");
}
const getProductById = async (id)=>{
    try {
        const fetching = await fetch(`/api/products/${id}`);
        const res = await fetching.json();
        renderProduct(res);
    } catch (error) {
        console.log(error);
    }
}
const getProducts = async ()=>{
    try {
        const fetching = await fetch("/api/products");
        const res = await fetching.json();
        renderProducts(res);
    } catch (error) {
        console.log(error);
    }
}
const updateProduct = async (id, form)=>{
    console.log("Actualizando producto "+id);
    const data = new FormData(form);
    let obj = {};
    data.forEach((value,key)=>obj[key]=value);
    const fetching = await fetch(`/api/products/${id}`,{
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {"Content-Type": "application/json"}
    });
    const res = await fetching.json();
    console.log(res);
    if (fetching.status == 401){
        Swal.fire({
            icon: 'error',
            title: 'Oops... debes iniciar como ADMIN',
            text: `error ${res.error}: ${res.descripcion}`,
            footer: '<a href="/">Ir al inicio</a>'
          })
    }else{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
        }).then((result)=>{
            location.reload();
        })
    }
}
const deleteProduct = async (id) => {
    try {
        console.log("Eliminar producto "+id);
        const fetching = await fetch(`/api/products/${id}`,{
            method: "DELETE"
        });
        const res = await fetching.json();
        if (fetching.status == 401){
            Swal.fire({
                icon: 'error',
                title: 'Oops... debes iniciar como ADMIN',
                text: `error ${res.error}: ${res.descripcion}`,
                footer: '<a href="/">Ir al inicio</a>'
              })
        }else{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.message,
                showConfirmButton: false,
                timer: 1500
            }).then((result)=>{
                location.reload();
            })
        } 
    } catch (error) {
        console.log(error.message);
    }
};

//RENDERS
const renderProduct = (product) =>{
    const productHTML = `
    <div class="card my-5">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${product.thumbnail}" class="img-fluid rounded-start" alt="${product.title}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">Price: $${product.price}</p>
                <p class="card-text"><small class="text-muted">Product ID: ${product.id}</small></p>
                <p class="card-text"><small class="text-muted">Codigo: ${product.code}</small></p>
                <p class="card-text"><small class="text-muted">Stock disponible: ${product.stock}</small></p>
                </div>
                <button class="btn btn-danger text-white" onclick="deleteProduct(${product.id})">ELIMINAR</button>
                <button class="btn btn-primary text-white" data-bs-toggle="modal" data-bs-target="#producto${product.id}">EDITAR</button>
            </div>
        </div>
    </div>
    <button class="btn btn-dark text-white" onclick="toggleView('allProducts');">REGRESAR</button>
    <!-- Modal -->
    <div class="modal fade" id="producto${product.id}" tabindex="-1" aria-labelledby="producto${product.id}Label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="producto${product.id}Label">Editar ${product.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="updateForm">
                        <label for="title" class="form-label fw-bold">Titulo</label>
                        <input type="text" name="title" class="form-control" required>
                        <span class="fw-light">El titulo anterior: ${product.title}</span>
                        </br>
                        <label for="description" class="form-label fw-bold mt-1">Descripcion</label>
                        <input type="text" name="description" class="form-control" required>
                        <span class="fw-light">Descripcion anterior: ${product.description}</span>
                        </br>
                        <label for="code" class="form-label fw-bold mt-1">Codigo</label>
                        <input type="text" name="code" class="form-control" required>
                        <span class="fw-light">Codigo anterior: ${product.code}</span>
                        </br>
                        <label for="stock" class="form-label fw-bold mt-1">Stock</label>
                        <input type="number" name="stock" class="form-control" required>
                        <span class="fw-light">Stock anterior: ${product.stock}</span>
                        </br>
                        <label for="price" class="form-label fw-bold mt-1">Precio</label>
                        <input type="number" name="price" step=".01" class="form-control" required>
                        <span class="fw-light">El precio anterior: ${product.price}</span>
                        </br>
                        <label for="thumbnail" class="form-label fw-bold mt-1">Imagen</label>
                        <input type="text" name="thumbnail" class="form-control" placeholder="https://img.com/img.jpg" required>
                        <span class="fw-light">URL anterior: ${product.thumbnail}</span>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" form="updateForm" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
    `;
    oneProductView.innerHTML = productHTML;
    const form = document.getElementById("updateForm");
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        updateProduct(product.id, form);
    });
    toggleView('oneProduct');
}
const renderProducts = (products)=>{
    products.forEach(prod => {
        const div = document.createElement("div");
        div.className = "product shadow rounded border border-dark d-flex flex-column justify-content-end col-12 col-sm-6 col-md-4 col-lg-3 my-3 mx-3";
        div.style = `background-image: url(${prod.thumbnail});`;
        div.innerHTML = `<div class="bg-dark opacity-75 text-white w-100">
                            <p class="my-0">${prod.title}</p>
                            <p class="my-0">$${prod.price}</p>
                        </div>`;
        div.addEventListener("click", ()=>{
            getProductById(prod.id);
        });
        productsDiv.appendChild(div);
    });
}

//RENDER INICIAL
getProducts();