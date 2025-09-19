const hamburgerBtn = document.querySelector(".hamburguer");
const hamburgerIcon = document.querySelector(".hamburguer i");
const navMenu = document.querySelector(".main-nav ul");

hamburgerBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    // Alterna o ícone para X
    if (hamburgerIcon.classList.contains("fa-bars")) {
        hamburgerIcon.classList.remove("fa-bars");
        hamburgerIcon.classList.add("fa-xmark");
    } else {
        hamburgerIcon.classList.remove("fa-xmark");
        hamburgerIcon.classList.add("fa-bars");
    }
});
