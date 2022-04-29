const messageCenter = document.getElementById("messageCenter");
const emailInput = document.getElementById("email");
const chatLog = document.getElementById("chatLog");
const chatBox = document.getElementById("chatBox");

const renderMessage = (data)=>{
    const p = document.createElement("p");
    const mailSpan = document.createElement("span");
    const dateSpan = document.createElement("span");   
    const messageSpan = document.createElement("span");
    mailSpan.className = "text-primary fw-bold";
    mailSpan.textContent = data.mail + " ";
    dateSpan.className = "text-danger";
    dateSpan.textContent = `[${data.date}]`;
    messageSpan.className = "text-success fst-italic";
    messageSpan.textContent =": " + data.message;
    p.append(mailSpan,dateSpan,messageSpan);
    chatLog.appendChild(p);
    p.scrollIntoView();
};

messageCenter.addEventListener("submit", (e)=>{
    e.preventDefault();
    if (chatBox.value.trim()){
        const message = chatBox.value;
        const mail = emailInput.value;
        socket.emit("message", {mail, message});
        chatBox.value = "";
        chatBox.focus();
        emailInput.disabled = true;
    }
});