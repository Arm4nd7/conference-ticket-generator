const uploadImageButton = document.getElementById("fileInput");
const form = document.querySelector('form');

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
        const imageUp = document.querySelector(".img-upload img");
        imageUp.src = event.target.result;

    };
    reader.readAsDataURL(file);
}

const generateTicketButton = document.getElementById("generateTicketBtn");

if (generateTicketButton) {
    generateTicketButton.addEventListener("click", (event) => {
        event.preventDefault();

        const fullName = document.querySelector('input[name="fullname"]').value.trim();
        const emailAddress = document.querySelector('input[name="email"]').value.trim();
        const gitHubUsername = document.querySelector('input[name="GitHub"]').value.trim();

        // ✅ Validación
        if (!fullName || !emailAddress || !gitHubUsername) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // ✅ Imagen
        let uploadedImageSrc = "./assets/images/image-avatar.jpg";
        const imageIconUpload = document.querySelector(".img-upload img");
        if (imageIconUpload && imageIconUpload.src && !imageIconUpload.src.includes("icon-upload.svg")) {
            uploadedImageSrc = imageIconUpload.src;
        }

        // ✅ Guardar en localStorage
        localStorage.setItem("ticketFullName", fullName);
        localStorage.setItem("ticketEmailAddress", emailAddress);
        localStorage.setItem("ticketGitHubUsername", gitHubUsername);
        localStorage.setItem("ticketImageSrc", uploadedImageSrc);

        // ✅ Mostrar la pantalla del ticket
        document.querySelector("header").style.display = "none";
        document.querySelector("main").style.display = "none";
        document.getElementById("pagina-tikets").style.display = "block";

        // ✅ Cargar los datos del ticket directamente aquí
        document.getElementById("ticketTitleName").textContent = fullName;
        document.getElementById("ticketTitleEmail").textContent = emailAddress;
        document.getElementById("ticketUserName").textContent = fullName;
        document.getElementById("ticketUserEmail").textContent = emailAddress;

        const userLogo = document.querySelector(".user-logo");
        if (userLogo && uploadedImageSrc) {
            userLogo.src = uploadedImageSrc;
        }
    });
}
