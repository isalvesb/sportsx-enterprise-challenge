const hamburgerBtn = document.querySelector(".hamburguer");
const hamburgerIcon = document.querySelector(".hamburguer i");
const navMenu = document.querySelector(".main-nav ul");

if (hamburgerBtn && hamburgerIcon && navMenu) {
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
}

const track = document.querySelector(".testimonial-track");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

if (track && prevBtn && nextBtn) {
  const slides = Array.from(track.children);
  let currentIndex = 0;

  const updateCarousel = () => {
    if (!slides.length) return;
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  };

  nextBtn.addEventListener("click", () => {
    if (!slides.length) return;
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    if (!slides.length) return;
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });
}

(function () {
  const mapEl = document.getElementById('map');
  if (!mapEl || !window.L) return;

  // Centro inicial (SP) – ajuste se quiser outra cidade
  const map = L.map('map', { scrollWheelZoom: false }).setView([-23.55052, -46.63331], 12);

  // Camada de mapa (OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Seus locais (coordenadass aproximadas – ajuste quando tiver as coordenadas oficiais)
  const places = [
    {
      id: '90-graus',
      name: '90 Graus Escalada',
      coords: [-23.6025, -46.6734],
      type: 'Academia de escalada',
      address: 'Av. João Pedro Cardoso, 107',
      rating: 5,
      reviews: 39
    },
    {
      id: 'fabrica-vila-madalena',
      name: 'Fábrica Escalada (Vila Madalena)',
      coords: [-23.5577, -46.6914],
      type: 'Academia de escalada',
      address: 'R. da Paz dos Lírios, 1978',
      rating: 4.9,
      reviews: 144
    }
  ];

  // Cria marcadores + popups e guarda referências
  const markers = [];
  const group = L.featureGroup();
  places.forEach(p => {
    const popupHtml = `
      <strong>${p.name}</strong><br>
      ${p.type}<br>
      <small>${p.address}</small><br>
      <small>★ ${p.rating} (${p.reviews} avaliações)</small>
    `;
    const m = L.marker(p.coords).addTo(map).bindPopup(popupHtml);
    m.on('click', () => highlightCard(p.id));
    markers.push({ id: p.id, marker: m });
    group.addLayer(m);
  });

  if (places.length) map.fitBounds(group.getBounds().pad(0.2));

  // Vincula clique no card -> foca o pino
  document.querySelectorAll('.location-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      const p = places.find(x => x.id === id);
      const mk = markers.find(x => x.id === id)?.marker;
      if (p && mk) {
        map.setView(p.coords, 15, { animate: true });
        mk.openPopup();
        highlightCard(id);
      }
    });
  });

  function highlightCard(id) {
    document.querySelectorAll('.location-card').forEach(c => {
      c.classList.toggle('is-active', c.dataset.id === id);
    });
    const el = document.querySelector(`.location-card[data-id="${id}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Busca: filtra cards e esconde/mostra pinos em tempo real
  const form = document.querySelector('.search-form');
  const input = document.querySelector('.search-input');

  function applyFilter() {
    const q = (input?.value || '').toLowerCase();
    const visibleMarkers = [];

    document.querySelectorAll('.location-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      const match = text.includes(q);
      card.style.display = match ? '' : 'none';

      const id = card.dataset.id;
      const mkObj = markers.find(x => x.id === id);
      if (!mkObj) return;

      if (match) {
        if (!map.hasLayer(mkObj.marker)) mkObj.marker.addTo(map);
        visibleMarkers.push(mkObj.marker);
      } else {
        if (map.hasLayer(mkObj.marker)) map.removeLayer(mkObj.marker);
      }
    });

    if (visibleMarkers.length) {
      const g = L.featureGroup(visibleMarkers);
      map.fitBounds(g.getBounds().pad(0.2));
    }
  }

  form?.addEventListener('submit', e => { e.preventDefault(); applyFilter(); });
  input?.addEventListener('input', applyFilter);
})();