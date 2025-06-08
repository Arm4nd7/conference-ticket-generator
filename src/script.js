const uploadImageButton = document.getElementById("fileInput");
let countButtons = 0;




if (uploadImageButton) {
    uploadImageButton.addEventListener("change", () => {
        const borrar = document.getElementById("option-upload");
        borrar?.remove();
        const label = document.querySelector(".img-upload")
        label.setAttribute("for", "not-use");
        countButtons++;
        showImage();
        if (countButtons == 1) {
            createButtonModify();
        } else {
            return
        }

        buttonRemoveAvatar();


    });
}


function showImage() {
    const file = uploadImageButton.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        const label = document.querySelector(".img-upload")
        if (label) {
            const imageUp = document.querySelector(".img-upload img");
            imageUp.className = "newImage";
            imageUp.src = event.target.result;
        }

    };
    if (!file) {
        alert("No ha seleccionado nada.");
        return
    }

    reader.readAsDataURL(file);
}

function createButtonModify() {
    let div = document.createElement("div");
    div.classList.add("modify-upload");
    let removeAvatar = document.createElement("button");
    removeAvatar.classList.add("removeAvatar");
    removeAvatar.type = "button";
    removeAvatar.textContent = "Remove image";
    let editAvatar = document.createElement("label");
    editAvatar.classList.add("editAvatar");
    editAvatar.type = "button";
    editAvatar.textContent = "Change image";
    editAvatar.setAttribute("for", "fileInput");


    div.appendChild(removeAvatar);
    div.appendChild(editAvatar);
    const containerUpload = document.querySelector(".container-upload");
    if (containerUpload) {
        containerUpload.appendChild(div);
    }

}

function buttonRemoveAvatar() {
    let removeAvatar = document.querySelector(".removeAvatar");
    removeAvatar.addEventListener("click", () => {
        const newImage = document.querySelector(".newImage");
        newImage.src = "/src/assets/images/icon-upload.svg"
    });
}




const generateTicketButton = document.getElementById("generateTicketBtn");

if (generateTicketButton) {
    generateTicketButton.addEventListener("click", (event) => {
        event.preventDefault();

        const fullName = document.querySelector('input[name="fullname"]').value.trim();
        const emailAddress = document.querySelector('input[name="email"]').value.trim();
        const gitHubUsername = document.querySelector('input[name="GitHub"]').value.trim();

        // Verificamos que todos los datos esten completos 
        if (!fullName || !emailAddress || !gitHubUsername) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Imagen actualizada en el tiket
        let uploadedImageSrc = "./assets/images/image-avatar.jpg";
        const imageIconUpload = document.querySelector(".img-upload img");
        if (imageIconUpload && imageIconUpload.src && !imageIconUpload.src.includes("icon-upload.svg")) {
            uploadedImageSrc = imageIconUpload.src;
        }

        // Guardamos en localStorage
        localStorage.setItem("ticketFullName", fullName);
        localStorage.setItem("ticketEmailAddress", emailAddress);
        localStorage.setItem("ticketGitHubUsername", gitHubUsername);
        localStorage.setItem("ticketImageSrc", uploadedImageSrc);

        // Mostramos la pantalla del ticket
        document.querySelector("header").style.display = "none";
        document.querySelector("main").style.display = "none";
        document.getElementById("main-2").style.display = "block";

        // ponemos los datos del ticket directamente
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
