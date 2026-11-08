// This script checks the form inputs when you submit to make sure everything is filled out correctly.
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const githubInput = document.getElementById("github");
    const avatarInput = document.getElementById("avatarInput");
    const dropzone = document.getElementById("dropzone");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const githubError = document.getElementById("githubError");
    const avatarError = document.getElementById("avatarError");

    let savedImageData = "";

    dropzone.addEventListener("click", () => {
        avatarInput.click();
    });

    // The avatar check block
    avatarInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) {
            savedImageData = "";
            dropzone.classList.remove("loaded");
            return;
        }

        const maxSize = 500 * 1024;

        if (file.type !== "image/jpeg" && file.type !== "image/png") {
            avatarError.textContent = "Please upload a valid JPEG or PNG image.";
            avatarInput.value = "";
            savedImageData = "";
            dropzone.classList.remove("loaded");
            return;
        }

        if (file.size > maxSize) {
            avatarError.textContent = "File too large. Please upload a photo under 500KB.";
            avatarInput.value = "";
            savedImageData = "";
            dropzone.classList.remove("loaded");
            return;
        }

        avatarError.textContent = "";
        const reader = new FileReader();
        reader.onload = function(uploadEvent) {
            savedImageData = uploadEvent.target.result;
            dropzone.classList.add("loaded");
            
            const uploadContent = document.getElementById("uploadContent");
            uploadContent.textContent = "";
            
            const successText = document.createElement("p");
            successText.className = "highlight";
            successText.style.fontWeight = "700";
            successText.textContent = "Image loaded successfully!";
            
            const hintText = document.createElement("p");
            hintText.className = "upload-hint";
            hintText.textContent = file.name;
            
            uploadContent.appendChild(successText);
            uploadContent.appendChild(hintText);
        };
        reader.readAsDataURL(file);
    });

    // The submit checks block
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        nameError.textContent = "";
        emailError.textContent = "";
        githubError.textContent = "";
        if (!savedImageData) {
            avatarError.textContent = "";
        }

        fullNameInput.classList.remove("error");
        fullNameInput.setAttribute("aria-invalid", "false");
        emailInput.classList.remove("error");
        emailInput.setAttribute("aria-invalid", "false");
        githubInput.classList.remove("error");
        githubInput.setAttribute("aria-invalid", "false");
        dropzone.classList.remove("error");

        let isValid = true;

        const trimmedName = fullNameInput.value.trim();
        if (trimmedName === "") {
            nameError.textContent = "Please enter your full name.";
            fullNameInput.classList.add("error");
            fullNameInput.setAttribute("aria-invalid", "true");
            isValid = false;
        }

        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            emailError.textContent = "Please enter a valid email address (e.g. user@domain.com).";
            emailInput.classList.add("error");
            emailInput.setAttribute("aria-invalid", "true");
            isValid = false;
        }

        const githubValue = githubInput.value.trim();
        if (!githubValue.startsWith("@") || githubValue.length < 2) {
            githubError.textContent = "GitHub username must start with '@' and have at least one character.";
            githubInput.classList.add("error");
            githubInput.setAttribute("aria-invalid", "true");
            isValid = false;
        }

        if (!savedImageData) {
            avatarError.textContent = "Please select a valid profile image under 500KB.";
            dropzone.classList.add("error");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const randomNum = Math.floor(10000 + Math.random() * 90000);
        const serialNumber = `#${randomNum}`;

        const ticketData = {
            fullName: trimmedName,
            email: emailValue,
            github: githubValue,
            avatar: savedImageData,
            serialNumber: serialNumber
        };

        // The save block
        try {
            localStorage.setItem("codingConfTicket", JSON.stringify(ticketData));
            location.href = "ticket.html";
        } catch (error) {
            console.error("Failed to save registration data to localStorage:", error);
        }
    });
});