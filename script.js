const copy = {
  en: {
    navigation: {
      architecture: "Architecture",
      supply: "Supply",
      services: "Services",
      "custom-machines": "Custom Machines",
      about: "About",
      contact: "Contact",
    },
    architecture: {
      title: "Architecture",
      items: [
        { label: "Design", level: 0 },
        { label: "Decoration • Renovation • Fit-Out", level: 0 },
        { label: "Wood & MDF", level: 0 },
        { label: "Smart Building", level: 0 },
      ],
    },
    supply: {
      title: "Supply",
      items: [
        { label: "Tiles & Flooring", level: 0 },
        { label: "Wood & MDF", level: 0 },
        { label: "Doors", level: 0 },
        { label: "Curtains", level: 0 },
        { label: "Electrical & Lighting", level: 0 },
        { label: "HVAC", level: 0 },
        { label: "Smart Systems", level: 0 },
        { label: "Kitchen", level: 0 },
        { label: "Bathroom", level: 0 },
        { label: "Furniture", level: 0 },
        { label: "Medical Equipment", level: 0 },
      ],
    },
    services: {
      title: "Services",
      items: [
        { label: "Service Plans", level: 0 },
        { label: "On-Demand Services", level: 1 },
        { label: "Wood & MDF", level: 2 },
        { label: "Doors", level: 2 },
        { label: "Electrical & Lighting", level: 2 },
        { label: "HVAC", level: 2 },
        { label: "Smart Systems", level: 2 },
        { label: "Kitchen", level: 2 },
        { label: "Bathroom", level: 2 },
        { label: "Medical Equipment", level: 2 },
        { label: "Cleaning", level: 2 },
        { label: "Scheduled Services", level: 1 },
        { label: "Maintenance Contract", level: 1 },
        { label: "Facility Management", level: 1 },
      ],
    },
  },
  fa: {
    navigation: {
      architecture: "معماری",
      supply: "تأمین و عرضه",
      services: "خدمات",
      "custom-machines": "ماشین‌آلات سفارشی",
      about: "درباره ما",
      contact: "تماس",
    },
    architecture: {
      title: "معماری",
      items: [
        { label: "طراحی", level: 0 },
        { label: "دکوراسیون • بازسازی • تجهیز", level: 0 },
        { label: "سازه‌های چوبی و ام‌دی‌افی", level: 0 },
        { label: "هوشمندسازی ساختمان", level: 0 },
      ],
    },
    supply: {
      title: "تأمین و عرضه",
      items: [
        { label: "سرامیک، اسلب و پوشش‌های کف", level: 0 },
        { label: "چوب و ام‌دی‌اف", level: 0 },
        { label: "انواع درب", level: 0 },
        { label: "پرده", level: 0 },
        { label: "تجهیزات برقی و روشنایی", level: 0 },
        { label: "سیستم‌های گرمایش، سرمایش و تهویه", level: 0 },
        { label: "سیستم‌های هوشمند", level: 0 },
        { label: "تجهیزات آشپزخانه", level: 0 },
        { label: "تجهیزات سرویس و حمام", level: 0 },
        { label: "مبلمان", level: 0 },
        { label: "تجهیزات پزشکی", level: 0 },
      ],
    },
    services: {
      title: "خدمات",
      items: [
        { label: "پلن‌های خدماتی", level: 0 },
        { label: "سرویس‌های موردی", level: 1 },
        { label: "خدمات چوب و ام‌دی‌اف", level: 2 },
        { label: "خدمات انواع درب", level: 2 },
        { label: "خدمات برقی و روشنایی", level: 2 },
        { label: "خدمات گرمایش، سرمایش و تهویه", level: 2 },
        { label: "خدمات سیستم‌های هوشمند", level: 2 },
        { label: "خدمات تجهیزات آشپزخانه", level: 2 },
        { label: "خدمات تجهیزات سرویس و حمام", level: 2 },
        { label: "خدمات تجهیزات پزشکی", level: 2 },
        { label: "خدمات نظافت", level: 2 },
        { label: "سرویس‌های دوره‌ای", level: 1 },
        { label: "قرارداد تعمیر و نگهداری", level: 1 },
        { label: "مدیریت و نگهداری ساختمان", level: 1 },
      ],
    },
  },
};

const availableScenes = new Set(["holding", "architecture", "supply", "services"]);
const scenes = [...document.querySelectorAll("[data-scene]")];
const navigationButtons = [...document.querySelectorAll("[data-target]")];
const languageButton = document.querySelector("[data-language]");
const site = document.querySelector(".site");
let language = "en";
let activeScene = "holding";

function renderSection(sectionName) {
  const target = document.querySelector(`[data-copy="${sectionName}"]`);
  const section = copy[language][sectionName];
  const title = document.createElement("h1");
  const list = document.createElement("ul");

  title.className = "section-title";
  title.textContent = section.title;
  list.className = "section-list";

  section.items.forEach((item) => {
    const row = document.createElement("li");
    row.textContent = item.label;
    row.dataset.level = item.level;
    list.append(row);
  });

  target.replaceChildren(title, list);
}

function renderLanguage() {
  document.documentElement.lang = language;
  site.dataset.lang = language;

  navigationButtons.forEach((button) => {
    button.textContent = copy[language].navigation[button.dataset.target];
  });

  ["architecture", "supply", "services"].forEach(renderSection);
  languageButton.textContent = language === "en" ? "FA" : "EN";
}

function showScene(sceneName, updateHash = true) {
  if (!availableScenes.has(sceneName)) return;
  activeScene = sceneName;

  scenes.forEach((scene) => {
    const active = scene.dataset.scene === sceneName;
    scene.classList.toggle("is-active", active);
    scene.setAttribute("aria-hidden", String(!active));
  });

  navigationButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.target === sceneName);
  });

  if (updateHash) {
    const nextHash = sceneName === "holding" ? "#holding" : `#${sceneName}`;
    history.replaceState(null, "", nextHash);
  }
}

document.addEventListener("click", (event) => {
  const navigationButton = event.target.closest("[data-target]");
  if (navigationButton) {
    showScene(navigationButton.dataset.target);
    return;
  }

  if (event.target.closest("[data-language]")) {
    language = language === "en" ? "fa" : "en";
    renderLanguage();
  }
});

window.addEventListener("hashchange", () => {
  const requested = location.hash.slice(1) || "holding";
  showScene(requested, false);
});

document.addEventListener("keydown", (event) => {
  const order = ["holding", "architecture", "supply", "services"];
  const currentIndex = order.indexOf(activeScene);
  if (event.key === "ArrowRight" && currentIndex < order.length - 1) {
    showScene(order[currentIndex + 1]);
  }
  if (event.key === "ArrowLeft" && currentIndex > 0) {
    showScene(order[currentIndex - 1]);
  }
});

renderLanguage();
showScene(location.hash.slice(1) || "holding", false);
