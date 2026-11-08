// This oads he saved ticket info from browser storage and displays it on the page.
document.addEventListener("DOMContentLoaded", () => {
    try {
        const storedData = localStorage.getItem("codingConfTicket");

        if (!storedData) {
            location.href = "index.html";
            return;
        }

        const ticket = JSON.parse(storedData);

        document.getElementById("userNameHeading").textContent = ticket.fullName;
        document.getElementById("userEmailSub").textContent = ticket.email;
        document.getElementById("userNameCard").textContent = ticket.fullName;
        document.getElementById("userGithubCard").textContent = ticket.github;
        document.getElementById("serialNumber").textContent = ticket.serialNumber;

        const avatarImg = document.getElementById("ticketAvatar");
        if (ticket.avatar) {
            avatarImg.src = ticket.avatar;
            avatarImg.alt = `Photo of ${ticket.fullName}`;
        }

    } catch (error) {
        console.error("Error reading ticket data:", error);
        location.href = "index.html";
    }
});