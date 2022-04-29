const socket = io();

//Eventos iniciales (render del array de productos y del chat).
socket.on("initial", (data)=>{
    data.log.forEach(log => {
        renderMessage(log);
    });
    if (data.products.length){
        showList();
        data.products.forEach(product => {
            renderProduct(product);
        });
    };
});

//Evento del chat (render de cada mensaje nuevo).
socket.on("newLog", (data)=>{
    renderMessage(data);
});

//Evento del form de productos (render de cada producto nuevo).
socket.on("newProduct", (data)=>{
    showList();
    renderProduct(data);
});