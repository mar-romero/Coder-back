const addProduct = async ()=>{
    const data = new FormData(form);
    let obj = {};
    data.forEach((value,key)=>obj[key]=value);
    const fetching = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {"Content-Type": "application/json"}
    });
    const res = await fetching.json();
    console.log(res);
};

const deleteProduct = async (id) => {
    try {
        console.log("Eliminar producto "+id);
        await fetch(`/api/products/${id}`,{
            method: "DELETE"
        }); 
    } catch (error) {
        console.log(error.message);
    }
};

const updateProduct = (id) => async (e)=> {
    e.preventDefault();
    console.log("Actualizando producto "+id);
    const data = new FormData(e.target);
    let obj = {};
    data.forEach((value,key)=>obj[key]=value);
    const fetching = await fetch(`/api/products/${id}`,{
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {"Content-Type": "application/json"}
    });
    const res = await fetching.json();
    console.log(res);
    location.reload();
};