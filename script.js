const relationshipStart = new Date("2025-12-04T00:00:00");

function updateCounter() {
  const daysEl = document.getElementById("dias");
  const hoursEl = document.getElementById("horas");
  const minutesEl = document.getElementById("minutos");
  const secondsEl = document.getElementById("segundos");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now = new Date();
  const diff = now - relationshipStart;

  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const dias = Math.floor(totalSeconds / 86400);
  const horas = Math.floor((totalSeconds % 86400) / 3600);
  const minutos = Math.floor((totalSeconds % 3600) / 60);
  const segundos = totalSeconds % 60;

  daysEl.textContent = dias;
  hoursEl.textContent = horas;
  minutesEl.textContent = minutos;
  secondsEl.textContent = segundos;
}

updateCounter();
setInterval(updateCounter, 1000);

function createFloatingHeart() {
  const container = document.querySelector(".hearts");
  if (!container) return;

  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = "❤️";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${14 + Math.random() * 18}px`;
  heart.style.animationDuration = `${5 + Math.random() * 5}s`;
  heart.style.opacity = `${0.4 + Math.random() * 0.5}`;

  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 10000);
}

setInterval(createFloatingHeart, 450);

const sliderImages = [
  {
    src: "imagens/foto1.jpg",
    caption: "Você é meu sorriso favorito."
  },
  {
    src: "imagens/foto2.jpg",
    caption: "Cada detalhe seu é especial para mim."
  },
  {
    src: "imagens/foto3.jpg",
    caption: "Você deixa tudo mais bonito sem esforço."
  },
  {
    src: "imagens/foto4.jpg",
    caption: "Meu coração sempre vai escolher você."
  }
];

let currentSlide = 0;
let autoSlideInterval = null;

function renderSlide(index) {
  const slideImage = document.getElementById("slideImage");
  const slideCaption = document.getElementById("slideCaption");
  const thumbs = document.querySelectorAll(".thumb");

  if (!slideImage || !slideCaption) return;

  currentSlide = index;
  slideImage.src = sliderImages[index].src;
  slideCaption.textContent = sliderImages[index].caption;

  thumbs.forEach((thumb) => thumb.classList.remove("active-thumb"));
  if (thumbs[index]) {
    thumbs[index].classList.add("active-thumb");
  }
}

function nextSlide() {
  const next = (currentSlide + 1) % sliderImages.length;
  renderSlide(next);
}

function prevSlide() {
  const prev = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
  renderSlide(prev);
}

function startAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 3500);
}

function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");

  if (!lightbox || !lightboxImage) return;

  lightboxImage.src = src;
  lightbox.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  lightbox.classList.remove("show");
  document.body.style.overflow = "";
}

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.getElementById("closeLightbox");

  if (!lightbox) return;

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
    closeBtn.addEventListener("touchstart", closeLightbox, { passive: true });
  }

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
}

function setupSlider() {
  const slideImage = document.getElementById("slideImage");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  const thumbs = document.querySelectorAll(".thumb");

  if (!slideImage) return;

  renderSlide(0);
  startAutoSlide();

  slideImage.addEventListener("click", function () {
    openLightbox(sliderImages[currentSlide].src);
  });

  slideImage.addEventListener("touchstart", function () {
    openLightbox(sliderImages[currentSlide].src);
  }, { passive: true });

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      prevSlide();
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      nextSlide();
      startAutoSlide();
    });
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", function () {
      const index = Number(thumb.dataset.index);
      renderSlide(index);
      startAutoSlide();
    });

    thumb.addEventListener("touchstart", function () {
      const index = Number(thumb.dataset.index);
      renderSlide(index);
      startAutoSlide();
    }, { passive: true });
  });
}

setupLightbox();
setupSlider();