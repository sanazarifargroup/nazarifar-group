const copy = {
  fa: {
    brand: "Nazarifar Group", title: "طراحی", numbers: ["۱", "۲", "۳", "۴"], total: "۳", previousImage: "تصویر قبلی", nextImage: "تصویر بعدی",
    navigation: { architecture: "طراحی و دکوراسیون داخلی", supply: "تأمین و عرضه", services: "خدمات", "custom-machines": "ماشین‌آلات سفارشی", about: "درباره ما", contact: "تماس" },
  },
  en: {
    brand: "Nazarifar Group", title: "Design", numbers: ["1", "2", "3", "4"], total: "3", previousImage: "Previous image", nextImage: "Next image",
    navigation: { architecture: "Interior Design & Decoration", supply: "Supply", services: "Services", "custom-machines": "Custom Machines", about: "About", contact: "Contact" },
  },
};

const projectGalleries = [
  ["../../assets/hero-renovation-ai-v5.png", "../../assets/hero-renovation-ai-v3.png", "../../assets/hero-renovation-ai-v2.png"],
  ["../../assets/hero-renovation-ai-v3.png", "../../assets/architecture-desktop.png", "../../assets/hero-renovation-ai-v5.png"],
  ["../../assets/hero-renovation-ai-v2.png", "../../assets/hero-renovation-ai-v5.png", "../../assets/architecture-desktop.png"],
  ["../../assets/architecture-desktop.png", "../../assets/hero-renovation-ai-v2.png", "../../assets/hero-renovation-ai-v3.png"],
];

const body = document.body;
const previewMode = body.dataset.preview || "design";
const machineCopy = {
  fa: { title: "ماشین‌آلات سفارشی", names: ["دستگاه بازیافت آمالگام", "اسکنر سه‌بعدی", "دستگاه فروش خودکار", "تجهیزات آزمایشگاهی"] },
  en: { title: "Custom Machines", names: ["Amalgam Recycling Machine", "3D Scanner", "Vending Machine", "Laboratory Equipment"] },
};
const carousel = document.querySelector("[data-carousel]");
const track = document.querySelector("[data-track]");
const slides = [...document.querySelectorAll("[data-index]")];
const viewer = document.querySelector("[data-viewer]");
const galleryImage = document.querySelector("[data-gallery-image]");
const imageCount = document.querySelector("[data-image-count]");
const imagePreviousButton = document.querySelector("[data-image-previous]");
const imageNextButton = document.querySelector("[data-image-next]");
const languageButton = document.querySelector("button[data-language]");
const previousButton = document.querySelector("[data-previous]");
const nextButton = document.querySelector("[data-next]");
const brandFrame = document.querySelector(".brand__frame");
const brandName = document.querySelector(".brand__name");
const itemName = document.querySelector("[data-item-name]");
let activeIndex = 0;
let imageIndex = 0;
let language = "fa";
let dragStart = null;
let imageDragStart = null;
let wheelLock = false;
let imageSwapTimer = null;

try {
  const saved = localStorage.getItem("nazarifar-language");
  if (saved === "fa" || saved === "en") language = saved;
} catch {}

function centerActive() {
  track.style.transform = `translate3d(${-activeIndex * 25}%, 0, 0)`;
}

function updateImageCount() {
  imageCount.textContent = `${copy[language].numbers[imageIndex]} / ${copy[language].total}`;
}

function showGalleryImage(animate = true) {
  window.clearTimeout(imageSwapTimer);
  if (animate) galleryImage.classList.add("is-changing");
  imageSwapTimer = window.setTimeout(() => {
    galleryImage.src = projectGalleries[activeIndex][imageIndex];
    galleryImage.alt = language === "fa"
      ? `تصویر ${copy.fa.numbers[imageIndex]} از پروژه طراحی ${copy.fa.numbers[activeIndex]}`
      : `Image ${copy.en.numbers[imageIndex]} of design project ${copy.en.numbers[activeIndex]}`;
    requestAnimationFrame(() => galleryImage.classList.remove("is-changing"));
  }, animate ? 170 : 0);
  updateImageCount();
}

function selectImage(index) {
  const total = projectGalleries[activeIndex].length;
  imageIndex = (index + total) % total;
  showGalleryImage();
}

function fitBrandName() {
  brandName.style.transform = "none";
  const naturalWidth = brandName.getBoundingClientRect().width;
  const frameWidth = brandFrame.getBoundingClientRect().width;
  if (naturalWidth > 0) brandName.style.transform = `scaleX(${frameWidth / naturalWidth})`;
}

function selectProject(index) {
  activeIndex = Math.max(0, Math.min(slides.length - 1, index));
  imageIndex = 0;
  slides.forEach((slide, itemIndex) => slide.classList.toggle("is-active", itemIndex === activeIndex));
  centerActive();
  if (itemName && previewMode === "machines") itemName.textContent = machineCopy[language].names[activeIndex];
  showGalleryImage();
}

function applyLanguage() {
  const current = copy[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  body.dataset.language = language;
  document.querySelectorAll("[data-copy]").forEach(element => {
    element.textContent = previewMode === "machines" && element.dataset.copy === "title" ? machineCopy[language].title : current[element.dataset.copy];
  });
  document.querySelectorAll("[data-navigation]").forEach(element => element.textContent = current.navigation[element.dataset.navigation]);
  if (itemName && previewMode === "machines") itemName.textContent = machineCopy[language].names[activeIndex];
  slides.forEach((slide, index) => slide.textContent = current.numbers[index]);
  imagePreviousButton.setAttribute("aria-label", current.previousImage);
  imageNextButton.setAttribute("aria-label", current.nextImage);
  languageButton.textContent = language === "fa" ? "EN" : "FA";
  requestAnimationFrame(centerActive);
  requestAnimationFrame(fitBrandName);
  showGalleryImage(false);
}

slides.forEach(slide => slide.addEventListener("click", () => selectProject(Number(slide.dataset.index))));
previousButton.addEventListener("click", () => selectProject(activeIndex - 1));
nextButton.addEventListener("click", () => selectProject(activeIndex + 1));
imagePreviousButton.addEventListener("click", () => selectImage(imageIndex - 1));
imageNextButton.addEventListener("click", () => selectImage(imageIndex + 1));

carousel.addEventListener("wheel", event => {
  const movement = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
  if (Math.abs(movement) < 6 || wheelLock) return;
  event.preventDefault();
  wheelLock = true;
  selectProject(activeIndex + (movement > 0 ? 1 : -1));
  window.setTimeout(() => { wheelLock = false; }, 520);
}, { passive: false });

carousel.addEventListener("pointerdown", event => { dragStart = event.clientX; carousel.setPointerCapture(event.pointerId); });
carousel.addEventListener("pointerup", event => {
  if (dragStart === null) return;
  const movement = event.clientX - dragStart;
  dragStart = null;
  if (Math.abs(movement) > 38) selectProject(activeIndex + (movement < 0 ? 1 : -1));
});

carousel.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") selectProject(activeIndex + 1);
  if (event.key === "ArrowLeft") selectProject(activeIndex - 1);
});

viewer.addEventListener("pointerdown", event => {
  if (event.target.closest("button")) return;
  imageDragStart = event.clientX;
  viewer.setPointerCapture(event.pointerId);
});
viewer.addEventListener("pointerup", event => {
  if (imageDragStart === null) return;
  const movement = event.clientX - imageDragStart;
  imageDragStart = null;
  if (Math.abs(movement) > 38) selectImage(imageIndex + (movement < 0 ? 1 : -1));
});
viewer.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") selectImage(imageIndex + 1);
  if (event.key === "ArrowLeft") selectImage(imageIndex - 1);
});

languageButton.addEventListener("click", () => {
  language = language === "fa" ? "en" : "fa";
  try { localStorage.setItem("nazarifar-language", language); } catch {}
  applyLanguage();
});

window.addEventListener("resize", () => {
  centerActive();
  fitBrandName();
});
if (document.fonts?.ready) document.fonts.ready.then(fitBrandName);
applyLanguage();
selectProject(0);
