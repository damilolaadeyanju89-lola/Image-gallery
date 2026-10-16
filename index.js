const galleryCards = [...document.querySelectorAll(".gallery-card")];
const filterButtons = [...document.querySelectorAll(".filter-button")];
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-content img");
const lightboxCaption = document.querySelector(".lightbox-content figcaption");
const closeButton = document.querySelector(".close-button");
const previousButton = document.querySelector(".previous-button");
const nextButton = document.querySelector(".next-button");
const imageCount = document.querySelector(".image-count");

let visibleCards = galleryCards;
let currentIndex = 0;

function updateLightbox() {
  const card = visibleCards[currentIndex];
  const image = card.querySelector("img");
  const title = card.querySelector("strong").textContent;
  const category = card.querySelector("small").textContent;

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = `${title} · ${category}`;
  imageCount.textContent = `${currentIndex + 1} / ${visibleCards.length}`;
}

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeButton.focus();
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function moveToImage(step) {
  currentIndex = (currentIndex + step + visibleCards.length) % visibleCards.length;
  updateLightbox();
}

galleryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const index = visibleCards.indexOf(card);
    openLightbox(index);
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      filterButton.classList.toggle("active", filterButton === button);
    });

    visibleCards = filter === "all"
      ? galleryCards
      : galleryCards.filter((card) => card.dataset.category === filter);

    galleryCards.forEach((card) => {
      card.hidden = !visibleCards.includes(card);
    });
  });
});

closeButton.addEventListener("click", closeLightbox);
previousButton.addEventListener("click", () => moveToImage(-1));
nextButton.addEventListener("click", () => moveToImage(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    moveToImage(-1);
  }

  if (event.key === "ArrowRight") {
    moveToImage(1);
  }
});