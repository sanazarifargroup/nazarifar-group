const body = document.body;
const parentSection = body.dataset.parent;
const parentRoutes = {
  architecture: "/architecture/",
  supply: "/supply/",
  services: "/services/",
  "custom-machines": "/custom-machines/",
};

const copy = {
  fa: {
    brand: "Nazarifar Group",
    title: body.dataset.titleFa,
    itemName: body.dataset.itemNameFa || "",
    itemNames: (body.dataset.itemNamesFa || body.dataset.itemNameFa || "").split("|").filter(Boolean),
    numbers: ["۱", "۲", "۳", "۴"],
    previousProject: "مورد قبلی",
    nextProject: "مورد بعدی",
    previousImage: "تصویر قبلی",
    nextImage: "تصویر بعدی",
    loadingImage: "در حال بارگذاری تصویر…",
    imageWord: "تصویر",
    itemWord: parentSection === "architecture" ? "پروژه" : parentSection === "services" ? "خدمت" : parentSection === "custom-machines" ? "دستگاه" : "محصول",
    navigation: { architecture: "طراحی و دکوراسیون داخلی", supply: "تأمین و عرضه", services: "خدمات", "custom-machines": "ماشین‌آلات سفارشی", about: "درباره ما", contact: "تماس" },
  },
  en: {
    brand: "Nazarifar Group",
    title: body.dataset.titleEn,
    itemName: body.dataset.itemNameEn || "",
    itemNames: (body.dataset.itemNamesEn || body.dataset.itemNameEn || "").split("|").filter(Boolean),
    numbers: ["1", "2", "3", "4"],
    previousProject: "Previous item",
    nextProject: "Next item",
    previousImage: "Previous image",
    nextImage: "Next image",
    loadingImage: "Loading image…",
    imageWord: "Image",
    itemWord: parentSection === "architecture" ? "project" : parentSection === "services" ? "service" : parentSection === "custom-machines" ? "machine" : "product",
    navigation: { architecture: "Interior Design & Decoration", supply: "Supply", services: "Services", "custom-machines": "Custom Machines", about: "About", contact: "Contact" },
  },
};

const configuredImages = (body.dataset.projectImages || "")
  .split(",")
  .map((image) => image.trim())
  .filter(Boolean);
const configuredGalleries = (body.dataset.projectGalleries || "")
  .split("|")
  .map((gallery) => gallery.split(",").map((image) => image.trim()).filter(Boolean))
  .filter((gallery) => gallery.length);
const projectGalleries = configuredGalleries.length
  ? configuredGalleries
  : configuredImages.length ? [configuredImages] : [];
const projectCount = projectGalleries.length;
const containedImageMode = body.dataset.imageFit === "contained";
const languageAtPageBottom = body.dataset.titlePlacement === "top-opposite";
const slideMarkup = Array.from({ length: projectCount }, (_, index) =>
  `<button class="slide" type="button" data-index="${index}">${index + 1}</button>`,
).join("");

body.dataset.showcasePage = "true";
body.dataset.hasProjects = projectCount ? "true" : "false";
body.innerHTML = `
  <header class="hero">
    <div class="topbar">
      <a class="brand" href="${parentRoutes[parentSection]}" aria-label="بازگشت">
        <span class="brand__frame"><img src="/assets/na-logo-transparent.png" alt="NA" /></span>
        <span class="brand__name" data-copy="brand">Nazarifar Group</span>
      </a>
      ${languageAtPageBottom ? "" : '<button class="language" type="button" data-language>EN</button>'}
    </div>
    <div class="carousel" aria-label="انتخاب مورد" data-carousel tabindex="0">
      <h1 class="carousel__title" data-copy="title"></h1>
      <p class="carousel__item-name" data-item-name${body.dataset.itemNameFa || body.dataset.itemNameEn || body.dataset.itemNamesFa || body.dataset.itemNamesEn ? "" : " hidden"}></p>
      <div class="carousel__display">
        <button class="arrow arrow--previous" type="button" data-previous aria-label="مورد قبلی"${projectCount ? "" : " hidden"}>&#8592;</button>
        <div class="number-window"><div class="carousel__track" data-track>
          ${slideMarkup}
        </div></div>
        <button class="arrow arrow--next" type="button" data-next aria-label="مورد بعدی"${projectCount ? "" : " hidden"}>&#8594;</button>
      </div>
    </div>
  </header>
  <main class="viewer" aria-live="polite" data-viewer tabindex="0">
    ${containedImageMode ? `<img class="viewer__backdrop" alt="" aria-hidden="true" data-gallery-backdrop${projectCount ? "" : " hidden"} />` : ""}
    <img class="project-image" alt="" data-gallery-image fetchpriority="high"${projectCount ? "" : " hidden"} />
    <div class="viewer__loading" data-image-loading role="status" aria-live="polite" aria-hidden="true">
      <span class="viewer__loading-spinner" aria-hidden="true"></span>
      <span class="viewer__loading-text" data-loading-text></span>
    </div>
    <button class="viewer__arrow viewer__arrow--previous" type="button" data-image-previous aria-label="تصویر قبلی"${projectCount ? "" : " hidden"}>&#8592;</button>
    <button class="viewer__arrow viewer__arrow--next" type="button" data-image-next aria-label="تصویر بعدی"${projectCount ? "" : " hidden"}>&#8594;</button>
    <span class="viewer__image-count" data-image-count${projectCount ? "" : " hidden"}></span>
    <nav class="viewer__navigation" aria-label="ناوبری اصلی">
      <a href="/architecture/" data-navigation="architecture"></a>
      <a href="/supply/" data-navigation="supply"></a>
      <a href="/services/" data-navigation="services"></a>
      <a href="/custom-machines/" data-navigation="custom-machines"></a>
      <a href="/about/" data-navigation="about"></a>
      <a href="/contact/" data-navigation="contact"></a>
    </nav>
  </main>
  ${languageAtPageBottom ? '<button class="language language--page-bottom" type="button" data-language>EN</button>' : ""}`;

const carousel = document.querySelector("[data-carousel]");
const track = document.querySelector("[data-track]");
const slides = [...document.querySelectorAll("[data-index]")];
const viewer = document.querySelector("[data-viewer]");
const galleryBackdrop = document.querySelector("[data-gallery-backdrop]");
const galleryImage = document.querySelector("[data-gallery-image]");
const imageCount = document.querySelector("[data-image-count]");
const imagePreviousButton = document.querySelector("[data-image-previous]");
const imageNextButton = document.querySelector("[data-image-next]");
const imageLoadingStatus = document.querySelector("[data-image-loading]");
const imageLoadingText = document.querySelector("[data-loading-text]");
const languageButton = document.querySelector("button[data-language]");
const itemName = document.querySelector("[data-item-name]");
const previousButton = document.querySelector("[data-previous]");
const nextButton = document.querySelector("[data-next]");
const brandFrame = document.querySelector(".brand__frame");
const brandName = document.querySelector(".brand__name");
let activeIndex = 0;
let imageIndex = 0;
let language = "fa";
let dragStart = null;
let dragStartY = null;
let imageDragStart = null;
let imageDragStartY = null;
let wheelLock = false;
let imageSwapTimer = null;
let imageRequest = 0;
let imageLoading = false;

if (projectCount) {
  track.style.width = `${projectCount * 100}%`;
  slides.forEach((slide) => {
    slide.style.flexBasis = `${100 / projectCount}%`;
    slide.style.width = `${100 / projectCount}%`;
  });
}

if (projectCount <= 1) {
  previousButton.hidden = true;
  nextButton.hidden = true;
}

try {
  const saved = localStorage.getItem("nazarifar-language");
  if (saved === "fa" || saved === "en") language = saved;
} catch {}

function centerActive() {
  track.style.transform = projectCount
    ? `translate3d(${-activeIndex * (100 / projectCount)}%, 0, 0)`
    : "none";
}

function numberText(index) {
  return language === "fa" ? (index + 1).toLocaleString("fa-IR") : String(index + 1);
}

function updateImageCount() {
  if (!projectCount) return;
  imageCount.textContent = `${numberText(imageIndex)} / ${numberText(projectGalleries[activeIndex].length - 1)}`;
}

async function resolveImage(source) {
  if (!source.endsWith(".b64")) return source;
  const response = await fetch(source);
  if (!response.ok) throw new Error("Image unavailable");
  return (await response.text()).trim();
}

async function loadImage(source) {
  const resolvedSource = await resolveImage(source);
  await new Promise((resolve, reject) => {
    const loader = new Image();
    loader.decoding = "async";
    loader.onload = resolve;
    loader.onerror = reject;
    loader.src = resolvedSource;
  });
  return resolvedSource;
}

function setImageLoading(loading) {
  imageLoading = loading;
  viewer.classList.toggle("is-loading", loading);
  viewer.setAttribute("aria-busy", String(loading));
  imageLoadingStatus.setAttribute("aria-hidden", String(!loading));
  [imagePreviousButton, imageNextButton, previousButton, nextButton, ...slides]
    .forEach((button) => { button.disabled = loading; });
}

function preloadAdjacentImages() {
  const gallery = projectGalleries[activeIndex];
  if (!gallery || gallery.length < 2) return;
  const indexes = [
    (imageIndex - 1 + gallery.length) % gallery.length,
    (imageIndex + 1) % gallery.length,
  ];
  indexes.forEach((index) => {
    resolveImage(gallery[index]).then((source) => {
      const image = new Image();
      image.decoding = "async";
      image.src = source;
    }).catch(() => {});
  });
}

function showGalleryImage(animate = true) {
  if (!projectCount) return;
  const request = ++imageRequest;
  window.clearTimeout(imageSwapTimer);
  setImageLoading(true);
  if (animate) galleryImage.classList.add("is-changing");
  imageSwapTimer = window.setTimeout(async () => {
    try {
      const source = await loadImage(projectGalleries[activeIndex][imageIndex]);
      if (request !== imageRequest) return;
      if (galleryBackdrop) galleryBackdrop.src = source;
      galleryImage.src = source;
      galleryImage.alt = language === "fa"
        ? `${copy.fa.imageWord} ${numberText(imageIndex)} از ${copy.fa.itemWord} ${numberText(activeIndex)}`
        : `${copy.en.imageWord} ${numberText(imageIndex)} of ${copy.en.itemWord} ${numberText(activeIndex)}`;
      updateImageCount();
      preloadAdjacentImages();
    } catch {
      if (request === imageRequest) galleryImage.classList.remove("is-changing");
    } finally {
      if (request === imageRequest) {
        setImageLoading(false);
        requestAnimationFrame(() => galleryImage.classList.remove("is-changing"));
      }
    }
  }, animate ? 170 : 0);
}

function selectImage(index) {
  if (!projectCount || imageLoading) return;
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
  if (!projectCount || imageLoading) return;
  activeIndex = (index + projectCount) % projectCount;
  imageIndex = 0;
  slides.forEach((slide, itemIndex) => slide.classList.toggle("is-active", itemIndex === activeIndex));
  centerActive();
  updateItemName();
  showGalleryImage();
}

function updateItemName() {
  if (!itemName) return;
  const current = copy[language];
  itemName.textContent = current.itemNames[activeIndex] || current.itemName;
}

function applyLanguage() {
  const current = copy[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  body.dataset.language = language;
  body.dataset.titleSize = current.title.length > 20 ? "long" : "short";
  document.querySelectorAll("[data-copy]").forEach(element => element.textContent = current[element.dataset.copy]);
  updateItemName();
  document.querySelectorAll("[data-navigation]").forEach(element => {
    element.textContent = current.navigation[element.dataset.navigation];
    element.classList.toggle("is-active", element.dataset.navigation === parentSection);
  });
  slides.forEach((slide, index) => { slide.textContent = numberText(index); });
  previousButton.setAttribute("aria-label", current.previousProject);
  nextButton.setAttribute("aria-label", current.nextProject);
  imagePreviousButton.setAttribute("aria-label", current.previousImage);
  imageNextButton.setAttribute("aria-label", current.nextImage);
  imageLoadingText.textContent = current.loadingImage;
  languageButton.textContent = language === "fa" ? "EN" : "FA";
  document.title = `${current.title} — Nazarifar Group`;
  requestAnimationFrame(centerActive);
  requestAnimationFrame(fitBrandName);
  updateImageCount();
}

slides.forEach(slide => slide.addEventListener("click", () => selectProject(Number(slide.dataset.index))));
previousButton.addEventListener("click", () => selectProject(activeIndex - 1));
nextButton.addEventListener("click", () => selectProject(activeIndex + 1));
imagePreviousButton.addEventListener("click", () => selectImage(imageIndex - 1));
imageNextButton.addEventListener("click", () => selectImage(imageIndex + 1));

carousel.addEventListener("wheel", event => {
  if (event.ctrlKey || event.metaKey) return;
  const movement = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
  if (Math.abs(movement) < 6 || wheelLock) return;
  event.preventDefault();
  wheelLock = true;
  selectProject(activeIndex + (movement > 0 ? 1 : -1));
  window.setTimeout(() => { wheelLock = false; }, 520);
}, { passive: false });

carousel.addEventListener("pointerdown", event => {
  if (event.target.closest("button")) return;
  if (!event.isPrimary || Math.abs((window.visualViewport?.scale || 1) - 1) > 0.01) {
    dragStart = null;
    dragStartY = null;
    return;
  }
  dragStart = event.clientX;
  dragStartY = event.clientY;
  carousel.setPointerCapture(event.pointerId);
});
carousel.addEventListener("pointerup", event => {
  if (!event.isPrimary || dragStart === null || dragStartY === null || Math.abs((window.visualViewport?.scale || 1) - 1) > 0.01) {
    dragStart = null;
    dragStartY = null;
    return;
  }
  const movement = event.clientX - dragStart;
  const verticalMovement = event.clientY - dragStartY;
  dragStart = null;
  dragStartY = null;
  if (Math.abs(movement) > 44 && Math.abs(movement) > Math.abs(verticalMovement) * 1.2) selectProject(activeIndex + (movement < 0 ? 1 : -1));
});
carousel.addEventListener("pointercancel", () => { dragStart = null; dragStartY = null; });
carousel.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") selectProject(activeIndex + 1);
  if (event.key === "ArrowLeft") selectProject(activeIndex - 1);
});

viewer.addEventListener("pointerdown", event => {
  if (imageLoading) return;
  if (event.target.closest("button, a")) return;
  if (!event.isPrimary || Math.abs((window.visualViewport?.scale || 1) - 1) > 0.01) {
    imageDragStart = null;
    imageDragStartY = null;
    return;
  }
  imageDragStart = event.clientX;
  imageDragStartY = event.clientY;
  viewer.setPointerCapture(event.pointerId);
});
viewer.addEventListener("pointerup", event => {
  if (imageLoading) return;
  if (!event.isPrimary || imageDragStart === null || imageDragStartY === null || Math.abs((window.visualViewport?.scale || 1) - 1) > 0.01) {
    imageDragStart = null;
    imageDragStartY = null;
    return;
  }
  const movement = event.clientX - imageDragStart;
  const verticalMovement = event.clientY - imageDragStartY;
  imageDragStart = null;
  imageDragStartY = null;
  if (Math.abs(movement) > 44 && Math.abs(movement) > Math.abs(verticalMovement) * 1.2) selectImage(imageIndex + (movement < 0 ? 1 : -1));
});
viewer.addEventListener("pointercancel", () => { imageDragStart = null; imageDragStartY = null; });
viewer.addEventListener("keydown", event => {
  if (imageLoading) return;
  if (event.key === "ArrowRight") selectImage(imageIndex + 1);
  if (event.key === "ArrowLeft") selectImage(imageIndex - 1);
});

languageButton.addEventListener("click", () => {
  language = language === "fa" ? "en" : "fa";
  try { localStorage.setItem("nazarifar-language", language); } catch {}
  applyLanguage();
});

window.addEventListener("resize", () => { centerActive(); fitBrandName(); });
if (document.fonts?.ready) document.fonts.ready.then(fitBrandName);
applyLanguage();
if (projectCount) selectProject(0);

if (!document.querySelector('script[data-nf-inquiry-loader]')) {
  const inquiryScript = document.createElement("script");
  inquiryScript.src = "/inquiry/inquiry.js?v=17";
  inquiryScript.dataset.nfInquiryLoader = "true";
  document.body.append(inquiryScript);
}
