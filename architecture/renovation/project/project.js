const titles = {
  "residential-01": { en: "Residential 01", fa: "مسکونی ۱" },
  "residential-02": { en: "Residential 02", fa: "مسکونی ۲" },
  "residential-03": { en: "Residential 03", fa: "مسکونی ۳" },
  "office-01": { en: "Office 01", fa: "اداری ۱" },
  "office-02": { en: "Office 02", fa: "اداری ۲" },
  "office-03": { en: "Office 03", fa: "اداری ۳" },
};

const copy = {
  en: { renovation: "Renovation", projectLabel: "Renovation project", back: "Back to renovation" },
  fa: { renovation: "بازسازی", projectLabel: "پروژهٔ بازسازی", back: "بازگشت به بازسازی" },
};

const selectedId = new URLSearchParams(window.location.search).get("id") || "residential-01";
let language = "en";

try {
  const saved = window.localStorage.getItem("nazarifar-language");
  if (saved === "fa" || saved === "en") language = saved;
} catch {
  language = "en";
}

const languageButton = document.querySelector("[data-language]");

function applyLanguage() {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  document.body.dataset.lang = language;
  const title = (titles[selectedId] || titles["residential-01"])[language];
  document.querySelectorAll("[data-project-title]").forEach((element) => { element.textContent = title; });
  document.querySelectorAll("[data-copy]").forEach((element) => { element.textContent = copy[language][element.dataset.copy]; });
  languageButton.textContent = language === "en" ? "FA" : "EN";
  document.title = `${title} — Nazarifar Group`;
}

languageButton.addEventListener("click", () => {
  language = language === "en" ? "fa" : "en";
  try { window.localStorage.setItem("nazarifar-language", language); } catch {}
  applyLanguage();
});

applyLanguage();
