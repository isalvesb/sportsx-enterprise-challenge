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


// Inicializa o mapa centralizado em São Paulo
const map = L.map('map').setView([-23.5505, -46.6333], 12);

// Camada do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// Marcador de exemplo
L.marker([-23.5505, -46.6333])
    .addTo(map)
    .bindPopup('<b>90 Graus Escalada</b><br>Academia de escalada')
    .openPopup();
