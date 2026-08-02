(function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxThumbs = document.getElementById("lightboxThumbs");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  let currentImages = [];
  let currentAlts = [];
  let currentIndex = 0;

  function openLightbox(images, alts, startIndex) {
    currentImages = images;
    currentAlts = alts;
    currentIndex = startIndex;
    renderThumbs();
    showImage(currentIndex);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function showImage(index) {
    currentIndex = (index + currentImages.length) % currentImages.length;
    lightboxImg.src = currentImages[currentIndex];
    lightboxImg.alt = currentAlts[currentIndex] || "";
    [...lightboxThumbs.children].forEach((el, i) => {
      el.classList.toggle("is-active", i === currentIndex);
    });
    prevBtn.style.display = currentImages.length > 1 ? "flex" : "none";
    nextBtn.style.display = currentImages.length > 1 ? "flex" : "none";
    lightboxThumbs.style.display = currentImages.length > 1 ? "flex" : "none";
  }

  function renderThumbs() {
    lightboxThumbs.innerHTML = "";
    currentImages.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = currentAlts[i] || "";
      img.addEventListener("click", () => showImage(i));
      lightboxThumbs.appendChild(img);
    });
  }

  document.querySelectorAll(".house-card").forEach((card) => {
    const images = (card.dataset.images || "").split(",").map((s) => s.trim()).filter(Boolean);
    const alts = (card.dataset.alts || "").split("|").map((s) => s.trim());
    if (images.length === 0) return;
    card.querySelectorAll(".house-card__shot").forEach((trigger) => {
      const startIndex = parseInt(trigger.dataset.index, 10) || 0;
      trigger.addEventListener("click", () => openLightbox(images, alts, startIndex));
    });
  });

  document.querySelectorAll(".symbol__frame").forEach((trigger) => {
    const images = (trigger.dataset.images || "").split(",").map((s) => s.trim()).filter(Boolean);
    const alts = (trigger.dataset.alts || "").split("|").map((s) => s.trim());
    if (images.length === 0) return;
    trigger.addEventListener("click", () => openLightbox(images, alts, 0));
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
  nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
  });
})();
