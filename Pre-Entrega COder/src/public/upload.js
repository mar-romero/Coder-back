const productsForm = document.getElementById("productsForm");
productsForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const data = new FormData(productsForm);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    const fetching = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {"Content-Type": "application/json"}
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
        });
        productsForm.reset();
    }
});