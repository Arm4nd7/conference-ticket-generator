const uploadImageButton = document.getElementById("fileInput");
let countButtons = 0;

if (uploadImageButton) {
    uploadImageButton.addEventListener("change", () => {
        const borrar = document.getElementById("option-upload");
        borrar?.remove();
        const label = document.querySelector(".img-upload");
        //invalido la funcion de subir archivo en este boton
        label.setAttribute("for", "not-use");
        countButtons++;
        showImage();
        if (countButtons == 1) {
            createButtonModify();
        } else {
            return;
        }
        buttonRemoveAvatar();
    });
}


function showImage() {
    //acceso solo al primer archivo seleccionado [0]
    const file = uploadImageButton.files[0];
    //nos ayuda a seleccionar (leer)archivos locales
    const reader = new FileReader();
    //cuando se termina de leer ese archivo lo verifica el onload
    reader.onload = function (event) {
        const label = document.querySelector(".img-upload")
        if (label) {
            const imageUp = document.querySelector(".img-upload img");
            imageUp.className = "newImage";
            //contiene el archivo seleccionado (leido)
            imageUp.src = event.target.result; // ponemos nuestra imagen como url en src
        }
    };
    if (!file) {
        alert("No ha seleccionado nada.");
        return;
    }
    reader.readAsDataURL(file);//convierte la imagen en una URL
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
    //cambio de funcion subir archivo en este boton
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

function errorEmail() {
    let label = document.getElementById("emailUser");
    let labelError = document.createElement("label");
    labelError.classList.add("email-user-error");
    let imageError = document.createElement("i");
    let errorEmail = document.createElement("p");
    errorEmail.classList.add("parrafo-error");
    imageError.classList.add("icon-info2");
    imageError.innerHTML = `<img src="./assets/images/icon-info.svg"></img>`;
    errorEmail.innerText = `Please enter a valid email adress`;
    labelError.appendChild(imageError);
    labelError.appendChild(errorEmail);
    label.appendChild(labelError);
    return;
}

let numeroTiket = 0
let almacenarNumero = 0
if (generateTicketButton) {
    let pNumero = document.querySelector(".numero");
    generateTicketButton.addEventListener("click", (event) => {
        event.preventDefault();

        almacenarNumero = numeroTiket++
        pNumero.textContent = numeroTiket;

        const fullName = document.querySelector('input[name="fullname"]').value.trim();
        const emailAddress = document.querySelector('input[name="email"]').value.trim();
        const gitHubUsername = document.querySelector('input[name="GitHub"]').value.trim();

        // Verificamos que todos los datos esten completos 
        if (!fullName || !emailAddress.includes("@") || !emailAddress.includes(".") || !gitHubUsername) {
            alert("Por favor, completa todos los campos.");
            if(numeroTiket == 1) {
                errorEmail()
            }else{
                return;
            }
            return;
        }

        // Imagen actualizada en el tiket
        let uploadedImageSrc = document.querySelector(".user-logo");
        const imageIconUpload = document.querySelector(".img-upload img");
        if (!imageIconUpload.src.includes("icon-upload.svg")) {
            uploadedImageSrc.src = imageIconUpload.src;
        } else {
            alert("Escoja una imagen");
            return;
        }

        // Guardamos en localStorage
        localStorage.setItem("ticketFullName", fullName);
        localStorage.setItem("ticketEmailAddress", emailAddress);
        localStorage.setItem("ticketGitHubUsername", gitHubUsername);
        localStorage.setItem("ticketImageSrc", uploadedImageSrc);
        // ponemos los datos del ticket directamente
        document.getElementById("ticketTitleName").textContent = fullName;
        document.getElementById("ticketTitleEmail").textContent = emailAddress;
        document.getElementById("ticketUserName").textContent = fullName;
        document.getElementById("ticketUserEmail").textContent = emailAddress;
        // Mostramos la pantalla del ticket
        document.querySelector("header").style.display = "none";
        document.querySelector("main").style.display = "none";
        document.getElementById("main-2").style.display = "block";





    });
}
