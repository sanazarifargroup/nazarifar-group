const copy = {
  fa: {
    title: "دکوراسیون، بازسازی و تجهیز",
    navigation: {
      architecture: "طراحی و دکوراسیون داخلی",
      supply: "تأمین و عرضه",
      services: "خدمات",
      "custom-machines": "ماشین‌آلات سفارشی",
      about: "درباره ما",
      contact: "تماس",
    },
  },
  en: {
    title: "Decoration, Renovation & Fit-Out",
    navigation: {
      architecture: "Interior Design & Decoration",
      supply: "Supply",
      services: "Services",
      "custom-machines": "Custom Machines",
      about: "About",
      contact: "Contact",
    },
  },
};

const galleryImages = [
  "03", "04", "05", "07", "08", "13", "16", "17", "19",
  "20", "21", "23", "24", "25", "26", "28", "29", "30",
].map((number) => `../../../assets/projects/پزشکان/${number}.jpg`);

let language = "fa";
let imageIndex = 0;
let dragStart = null;

try {
  const saved = localStorage.getItem("nazarifar-language");
  if (saved === "fa" || saved === "en") language = saved;
} catch {}

const languageButton = document.querySelector("[data-language]");
const galleryImage = document.querySelector("[data-gallery-image]");
const galleryCount = document.querySelector("[data-gallery-count]");
const previousButton = document.querySelector("[data-gallery-previous]");
const nextButton = document.querySelector("[data-gallery-next]");
const viewer = document.querySelector("[data-viewer]");
const brandFrame = document.querySelector(".brand__frame");
const brandName = document.querySelector(".brand__name");

function fitBrandName() {
  brandName.style.transform = "none";
  const naturalWidth = brandName.getBoundingClientRect().width;
  const frameWidth = brandFrame.getBoundingClientRect().width;
  if (naturalWidth > 0) brandName.style.transform = `scaleX(${frameWidth / naturalWidth})`;
}

function showImage(animate = true) {
  if (animate) galleryImage.classList.add("is-changing");
  window.setTimeout(() => {
    galleryImage.src = galleryImages[imageIndex];
    galleryImage.alt = language === "fa"
      ? `تصویر ${(imageIndex + 1).toLocaleString("fa-IR")} از پروژه`
      : `Image ${imageIndex + 1} of project`;
    galleryCount.textContent = language === "fa"
      ? `${(imageIndex + 1).toLocaleString("fa-IR")} / ${galleryImages.length.toLocaleString("fa-IR")}`
      : `${imageIndex + 1} / ${galleryImages.length}`;
    requestAnimationFrame(() => galleryImage.classList.remove("is-changing"));
  }, animate ? 170 : 0);
}

function selectImage(index) {
  imageIndex = (index + galleryImages.length) % galleryImages.length;
  showImage();
}

function applyLanguage() {
  const current = copy[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  document.body.dataset.language = language;
  document.querySelectorAll("[data-copy]").forEach((element) => { element.textContent = current[element.dataset.copy]; });
  document.querySelectorAll("[data-navigation]").forEach((element) => { element.textContent = current.navigation[element.dataset.navigation]; });
  document.querySelector("[data-project-number]").textContent = language === "fa" ? "۱" : "1";
  languageButton.textContent = language === "fa" ? "EN" : "FA";
  document.title = `${current.title} — Nazarifar Group`;
  requestAnimationFrame(fitBrandName);
  showImage(false);
}

previousButton.addEventListener("click", () => selectImage(imageIndex - 1));
nextButton.addEventListener("click", () => selectImage(imageIndex + 1));
viewer.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button")) return;
  dragStart = event.clientX;
  viewer.setPointerCapture(event.pointerId);
});
viewer.addEventListener("pointerup", (event) => {
  if (dragStart === null) return;
  const movement = event.clientX - dragStart;
  dragStart = null;
  if (Math.abs(movement) > 38) selectImage(imageIndex + (movement < 0 ? 1 : -1));
});
languageButton.addEventListener("click", () => {
  language = language === "fa" ? "en" : "fa";
  try { localStorage.setItem("nazarifar-language", language); } catch {}
  applyLanguage();
});

applyLanguage();
