const btnAdmin = document.getElementById("admin");
const btnUser = document.getElementById("user");

btnAdmin.addEventListener("click", async ()=>{
    try {
        const fetching = await fetch("/api/login", {
            method: "POST",
            headers:{
                user: "admin",
                pass: "admin"
            }
        })
        const res = await fetching.json();
        console.log(res);
        location.href = "/upload.html";
    } catch (error) {
        console.log(error.message);
    }
});
btnUser.addEventListener("click", async ()=>{
    try {
        const fetching = await fetch("/api/login", {
            method: "POST",
            headers:{
                user: "user",
                pass: "user"
            }
        })
        const res = await fetching.json();
        console.log(res);
        location.href = "/products.html";
    } catch (error) {
        console.log(error.message);
    }
});