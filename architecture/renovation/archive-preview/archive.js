const projects = {
  residential: [
    "../../../assets/hero-renovation-ai-v5.png",
    "../../../assets/hero-renovation-ai-v3.png",
    "../../../assets/hero-renovation-ai-v2.png",
  ],
  office: [
    "../../../assets/hero-renovation-ai-v4.png",
    "../../../assets/architecture-desktop.png",
    "../../../assets/hero-renovation-ai-v1.png",
  ],
};

const copy = {
  fa: { back: "معماری", archive: "آرشیو پروژه‌ها", title: "دکوراسیون، بازسازی و تجهیز", residential: "مسکونی", office: "اداری", footer: "پروژه‌های منتخب", view: "مشاهدهٔ پروژه" },
  en: { back: "Architecture", archive: "Project Archive", title: "Interior Design, Renovation & Fit-Out", residential: "Residential", office: "Office", footer: "Selected Projects", view: "View project" },
};

let language = "fa";
let category = "residential";
try {
  const saved = localStorage.getItem("nazarifar-language");
  if (saved === "fa" || saved === "en") language = saved;
} catch {}

const list = document.querySelector("[data-projects]");
const languageButton = document.querySelector("[data-language]");
const categoryButtons = [...document.querySelectorAll("[data-category]")];

function number(value) {
  const raw = String(value).padStart(2, "0");
  return language === "fa" ? raw.replace(/[0-9]/g, digit => "۰۱۲۳۴۵۶۷۸۹"[digit]) : raw;
}

function renderProjects() {
  list.replaceChildren();
  projects[category].forEach((image, index) => {
    const article = document.createElement("article");
    article.className = "project";
    article.innerHTML = `
      <div class="project__number">${number(index + 1)}</div>
      <a class="project__link" href="../project/?id=${category}-${String(index + 1).padStart(2, "0")}">
        <span class="project__frame"><img src="${image}" alt="" loading="${index === 0 ? "eager" : "lazy"}" /></span>
        <span class="project__foot"><span>${copy[language][category]}</span><span>${copy[language].view}</span></span>
      </a>`;
    list.append(article);
  });
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  document.body.dataset.lang = language;
  document.querySelectorAll("[data-copy]").forEach(element => element.textContent = copy[language][element.dataset.copy]);
  languageButton.textContent = language === "fa" ? "EN" : "FA";
  renderProjects();
}

categoryButtons.forEach(button => button.addEventListener("click", () => {
  category = button.dataset.category;
  categoryButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  renderProjects();
}));

languageButton.addEventListener("click", () => {
  language = language === "fa" ? "en" : "fa";
  try { localStorage.setItem("nazarifar-language", language); } catch {}
  applyLanguage();
});

applyLanguage();
