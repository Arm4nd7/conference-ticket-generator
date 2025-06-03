const uploadImageButton = document.getElementById("fileInput");


if (uploadImageButton) {
    uploadImageButton.addEventListener("change", () => {
        const borrar = document.getElementById("option-upload");
        borrar?.remove(); 
        uploadImage();
        showImage();
    });
}

function uploadImage() {
    let div = document.createElement("div");
    div.classList.add("modify-upload");
    let removeUpload = document.createElement("button");
    removeUpload.textContent = "Remove image";
    let editUpload = document.createElement("button");
    editUpload.textContent = "Change image";
    div.appendChild(removeUpload);
    div.appendChild(editUpload);
    const containerUpload = document.querySelector(".container-upload");
    if (containerUpload) {
        containerUpload.appendChild(div);
    }
}

function showImage() {
    const file = uploadImageButton.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        const borrar = document.getElementById("upload-image-avatar-before");
        borrar?.remove(); 
        const imgElement = document.querySelector(".img-upload img");
        imgElement.src = event.target.result;

    };
    reader.readAsDataURL(file);
}


const generateTicketButton = document.getElementById("generateTicketBtn"); 

if (generateTicketButton) { 
    generateTicketButton.addEventListener("click", (event) => {
        event.preventDefault(); 

        const fullName = document.querySelector('input[name="fullname"]').value;
        const emailAddress = document.querySelector('input[name="email"]').value;
        const gitHubUsername = document.querySelector('input[name="GitHub"]').value;

        let uploadedImageSrc = "/conference-ticket-generator/assets/images/image-avatar.jpg"; 
        const currentImageElement = document.querySelector(".img-upload img");
        if (currentImageElement && currentImageElement.src && !currentImageElement.src.includes("icon-upload.svg")) {
            uploadedImageSrc = currentImageElement.src;
        }

        localStorage.setItem("ticketFullName", fullName);
        localStorage.setItem("ticketEmailAddress", emailAddress);
        localStorage.setItem("ticketGitHubUsername", gitHubUsername); 
        localStorage.setItem("ticketImageSrc", uploadedImageSrc);

        // Redirigir a la página del ticket
        window.location.href = "index-ticket.html";
    });
}


//cuando pasamos a index-ticket 
document.addEventListener("DOMContentLoaded", () => {
    // si estamos en  "index-ticket.html"
    if (window.location.pathname.includes("index-ticket.html")) {
        // 1. Recuperar la información de localStorage
        const ticketFullName = localStorage.getItem("ticketFullName");
        const ticketEmailAddress = localStorage.getItem("ticketEmailAddress");
        const ticketImageSrc = localStorage.getItem("ticketImageSrc");

        // 2. Actualizar el nombre en el título (h1)
        const ticketTitleNameElement = document.getElementById("ticketTitleName");
        if (ticketTitleNameElement && ticketFullName) {
            ticketTitleNameElement.textContent = ticketFullName;
        }

        // 3. Actualizar el correo en el subtítulo (h2)
        const ticketTitleEmailElement = document.getElementById("ticketTitleEmail");
        if (ticketTitleEmailElement && ticketEmailAddress) {
            ticketTitleEmailElement.textContent = ticketEmailAddress;
        }

        // 4. Actualizar el nombre en el ticket (h3 user-name)
        const ticketUserNameElement = document.getElementById("ticketUserName");
        if (ticketUserNameElement && ticketFullName) {
            ticketUserNameElement.textContent = ticketFullName;
        }

        // 5. Actualizar el correo en el ticket (p user-email)
        const ticketUserEmailElement = document.getElementById("ticketUserEmail");
        if (ticketUserEmailElement && ticketEmailAddress) {
            ticketUserEmailElement.textContent = ticketEmailAddress;
        }

        // 6. Actualizar la imagen del avatar en el ticket
        const userLogoElement = document.querySelector(".user-logo");
        if (userLogoElement && ticketImageSrc) {
            userLogoElement.src = ticketImageSrc;
        }
    }
});