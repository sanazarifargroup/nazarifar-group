const scenes = [
  { id: "holding", image: "holding.jpg", mobileImage: "holding-mobile.jpg" },
  { id: "architecture", image: "hero-architecture.jpg", mobileImage: "hero-architecture-mobile.jpg" },
  { id: "supply", image: "supply.jpg", mobileImage: "supply-mobile.jpg" },
  { id: "services", image: "services.jpg", mobileImage: "services-mobile.jpg" },
  { id: "custom-machines", image: null, mobileImage: null },
  { id: "about", image: "about.jpg", mobileImage: "about-mobile.jpg" },
  { id: "contact", image: "contact.jpg", mobileImage: "contact-mobile.jpg" },
];

const copy = {
  en: {
    navigation: {
      architecture: "Architecture",
      supply: "Supply",
      services: "Services",
      customMachines: "Custom Machines",
      about: "About",
      contact: "Contact",
    },
    scenes: {
      holding: "Holding",
      architecture: "Architecture",
      supply: "Supply",
      services: "Services",
      "custom-machines": "Custom Machines",
      about: "About",
      contact: "Contact",
    },
    panels: {
      architecture: [
        "Design",
        "Decoration • Renovation • Fit-Out",
        "Wood & MDF",
        "Smart Building",
      ],
      supply: [
        "Tiles & Flooring",
        "Wood & MDF",
        "Doors",
        "Curtains",
        "Electrical & Lighting",
        "HVAC",
        "Smart Systems",
        "Kitchen",
        "Bathroom",
        "Furniture",
        "Medical Equipment",
      ],
      services: [
        { text: "Service Plans", heading: true },
        "On-Demand Services",
        "Scheduled Services",
        "Maintenance Contract",
        "Facility Management",
      ],
      "custom-machines": ["Vending Machines", "Recycling Systems"],
    },
  },
  fa: {
    navigation: {
      architecture: "معماری",
      supply: "تأمین و عرضه",
      services: "خدمات",
      customMachines: "ماشین‌آلات سفارشی",
      about: "درباره ما",
      contact: "تماس",
    },
    scenes: {
      holding: "هلدینگ",
      architecture: "معماری",
      supply: "تأمین و عرضه",
      services: "خدمات",
      "custom-machines": "ماشین‌آلات سفارشی",
      about: "درباره ما",
      contact: "تماس",
    },
    panels: {
      architecture: [
        "طراحی",
        "دکوراسیون • بازسازی • تجهیز",
        "سازه‌های چوبی و ام‌دی‌افی",
        "هوشمندسازی ساختمان",
      ],
      supply: [
        "سرامیک، اسلب و پوشش‌های کف",
        "چوب و ام‌دی‌اف",
        "انواع درب",
        "پرده",
        "تجهیزات برقی و روشنایی",
        "گرمایش، سرمایش و تهویه",
        "سیستم‌های هوشمند",
        "تجهیزات آشپزخانه",
        "تجهیزات سرویس و حمام",
        "مبلمان",
        "تجهیزات پزشکی",
      ],
      services: [
        { text: "پلن‌های خدماتی", heading: true },
        "سرویس‌های موردی",
        "سرویس‌های دوره‌ای",
        "قرارداد تعمیر و نگهداری",
        "مدیریت و نگهداری ساختمان",
      ],
      "custom-machines": ["وندینگ ماشین", "سیستم‌های بازیافت"],
    },
  },
};

const image = document.querySelector("#scene-image");
const loading = document.querySelector(".loading");
const status = document.querySelector(".status");
const controls = [...document.querySelectorAll("[data-scene]")];
const navButtons = [...document.querySelectorAll("[data-nav-key]")];
const languageToggle = document.querySelector(".language-toggle");
const languageLabel = document.querySelector("[data-language-label]");
const panel = document.querySelector(".section-panel");
const panelTitle = document.querySelector(".section-panel__title");
const panelItems = document.querySelector(".section-panel__items");
const mobileMedia = window.matchMedia("(max-width: 780px)");

let currentIndex = 0;
let changing = false;
let touchStartY = 0;
let language = getSavedLanguage();

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

function getSavedLanguage() {
  try {
    return localStorage.getItem("nazarifar-language") === "fa" ? "fa" : "en";
  } catch {
    return "en";
  }
}

function sceneSource(scene) {
  return mobileMedia.matches ? scene.mobileImage : scene.image;
}

function preloadScenes() {
  scenes.forEach((scene) => {
    const source = sceneSource(scene);
    if (!source) return;
    const preload = new Image();
    preload.src = source;
  });
}

function renderPanel(scene) {
  const items = copy[language].panels[scene.id];
  const visible = Array.isArray(items);

  panel.setAttribute("aria-hidden", String(!visible));
  panel.classList.toggle("is-visible", visible);
  panelItems.replaceChildren();

  if (!visible) {
    panelTitle.textContent = "";
    return;
  }

  panelTitle.textContent = copy[language].scenes[scene.id];

  items.forEach((item) => {
    const definition = typeof item === "string" ? { text: item, heading: false } : item;
    const element = document.createElement(definition.heading ? "p" : "button");
    element.className = definition.heading
      ? "section-panel__group"
      : "section-panel__item";
    element.textContent = definition.text;
    if (!definition.heading) element.type = "button";
    panelItems.append(element);
  });

  panel.classList.toggle("is-dense", scene.id === "supply");
}

function renderLanguage() {
  document.documentElement.lang = language === "fa" ? "fa" : "en";
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  languageLabel.textContent = language === "fa" ? "EN" : "FA";
  languageToggle.setAttribute(
    "aria-label",
    language === "fa" ? "Switch to English" : "تغییر زبان به فارسی",
  );

  navButtons.forEach((button) => {
    button.textContent = copy[language].navigation[button.dataset.navKey];
  });

  renderPanel(scenes[currentIndex]);
  status.textContent = copy[language].scenes[scenes[currentIndex].id];
}

function updateControls(scene) {
  controls.forEach((control) => {
    const active = control.dataset.scene === scene.id && control.tagName === "BUTTON";
    if (active) control.setAttribute("aria-current", "page");
    else control.removeAttribute("aria-current");
  });
}

async function loadImage(source) {
  image.src = source;

  if (image.complete && image.naturalWidth) {
    if (image.decode) await image.decode().catch(() => {});
    return;
  }

  await new Promise((resolve, reject) => {
    image.addEventListener("load", resolve, { once: true });
    image.addEventListener("error", reject, { once: true });
  });
}

async function showScene(index, { initial = false, force = false } = {}) {
  if (changing && !initial) return;

  const nextIndex = Math.max(0, Math.min(index, scenes.length - 1));
  const scene = scenes[nextIndex];

  if (!initial && !force && nextIndex === currentIndex) return;

  changing = true;
  loading.classList.add("is-active");

  if (!initial) {
    image.classList.remove("is-visible");
    panel.classList.remove("is-visible");
    await wait(650);
  }

  currentIndex = nextIndex;
  document.documentElement.dataset.scene = scene.id;
  updateControls(scene);
  renderPanel(scene);
  status.textContent = copy[language].scenes[scene.id];
  history.replaceState(null, "", `#${scene.id}`);

  const source = sceneSource(scene);

  if (!source) {
    image.removeAttribute("src");
    image.classList.remove("is-visible");
    loading.classList.remove("is-active");
    changing = false;
    return;
  }

  try {
    await loadImage(source);
    requestAnimationFrame(() => image.classList.add("is-visible"));
  } catch {
    image.removeAttribute("src");
  }

  loading.classList.remove("is-active");
  changing = false;
}

function sceneIndex(id) {
  const index = scenes.findIndex((scene) => scene.id === id);
  return index < 0 ? 0 : index;
}

controls.forEach((control) => {
  control.addEventListener("click", (event) => {
    event.preventDefault();
    showScene(sceneIndex(control.dataset.scene));
  });
});

languageToggle.addEventListener("click", () => {
  language = language === "en" ? "fa" : "en";
  try {
    localStorage.setItem("nazarifar-language", language);
  } catch {}
  renderLanguage();
});

window.addEventListener(
  "wheel",
  (event) => {
    if (Math.abs(event.deltaY) < 18) return;
    showScene(currentIndex + (event.deltaY > 0 ? 1 : -1));
  },
  { passive: true },
);

window.addEventListener("keydown", (event) => {
  const nextKeys = ["ArrowDown", "PageDown", " "];
  const previousKeys = ["ArrowUp", "PageUp"];

  if (nextKeys.includes(event.key)) {
    event.preventDefault();
    showScene(currentIndex + 1);
  } else if (previousKeys.includes(event.key)) {
    event.preventDefault();
    showScene(currentIndex - 1);
  } else if (event.key === "Home") {
    showScene(0);
  } else if (event.key === "End") {
    showScene(scenes.length - 1);
  }
});

window.addEventListener(
  "touchstart",
  (event) => {
    touchStartY = event.changedTouches[0].clientY;
  },
  { passive: true },
);

window.addEventListener(
  "touchend",
  (event) => {
    const distance = touchStartY - event.changedTouches[0].clientY;
    if (Math.abs(distance) < 45) return;
    showScene(currentIndex + (distance > 0 ? 1 : -1));
  },
  { passive: true },
);

mobileMedia.addEventListener("change", () => {
  showScene(currentIndex, { force: true });
});

const initialId = location.hash.slice(1);
currentIndex = sceneIndex(initialId);
renderLanguage();
showScene(currentIndex, { initial: true });
preloadScenes();
