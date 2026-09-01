const previewCopy = {
  fa: {
    title: "خدمات",
    language: "EN",
    labels: ["سرویس‌های دوره‌ای ساختمان", "پشتیبانی فنی و تعمیرات", "مدیریت و نگهداری ساختمان"],
    descriptions: [
      "قراردادهای تعمیر و نگهداری شامل بازدید دوره‌ای تأسیسات برقی، مکانیکی و تجهیزات ساختمان؛ همراه با چک‌لیست، سرویس، ثبت وضعیت و اعلام موارد نیازمند تعمیر.",
      "پیگیری درخواست خرابی، عیب‌یابی، اعزام نیروی تخصصی، تأمین قطعه و انجام تعمیرات.",
      "تنظیم برنامهٔ نظافت ساختمان و هماهنگی با نیروهای نظافت، کنترل و رسیدگی به فضای سبز و مشاعات و هماهنگی با مسئول فضای سبز، ارائهٔ گزارش منظم از وضعیت فنی ساختمان.",
    ],
    navigation: ["طراحی و دکوراسیون داخلی", "تأمین و عرضه", "خدمات", "ماشین‌آلات سفارشی", "درباره ما", "تماس"],
  },
  en: {
    title: "Services",
    language: "FA",
    labels: ["Scheduled Building Services", "Technical Support & Repairs", "Building Management & Maintenance"],
    descriptions: [
      "Maintenance contracts include periodic inspection of electrical and mechanical systems and building equipment, with checklists, servicing, condition records and repair notices.",
      "Follow-up of fault requests, diagnostics, specialist dispatch, parts sourcing and repairs.",
      "Planning building cleaning, coordinating cleaning staff, overseeing landscaping and common areas, coordinating grounds personnel and providing regular reports on the building’s technical condition.",
    ],
    navigation: ["Interior Design & Decoration", "Supply", "Services", "Custom Machines", "About", "Contact"],
  },
};

const previewSite = document.querySelector(".service-preview");
const serviceTitle = document.querySelector(".service-concept__title");
const serviceButtons = [...document.querySelectorAll("[data-service]")];
const serviceItems = [...document.querySelectorAll("[data-service-item]")];
const serviceLabels = [...document.querySelectorAll(".service-concept__label")];
const serviceDescriptions = [...document.querySelectorAll(".service-concept__inline-description")];
const languageButton = document.querySelector("[data-language]");
const navigationButtons = [...document.querySelectorAll("[data-route]")];

let previewLanguage = "fa";
let activeService = 0;

function renderPreview() {
  const current = previewCopy[previewLanguage];
  document.documentElement.lang = previewLanguage;
  document.documentElement.dir = previewLanguage === "fa" ? "rtl" : "ltr";
  previewSite.dataset.lang = previewLanguage;
  serviceTitle.textContent = current.title;
  languageButton.textContent = current.language;
  serviceLabels.forEach((label, index) => { label.textContent = current.labels[index]; });
  serviceDescriptions.forEach((item, index) => { item.textContent = current.descriptions[index]; });
  navigationButtons.forEach((button, index) => { button.textContent = current.navigation[index]; });
}

function selectService(index) {
  activeService = index;
  serviceButtons.forEach((button, itemIndex) => button.classList.toggle("is-active", itemIndex === index));
  serviceItems.forEach((item, itemIndex) => item.classList.toggle("is-active", itemIndex === index));
}

serviceButtons.forEach((button) => button.addEventListener("click", () => selectService(Number(button.dataset.service))));
languageButton.addEventListener("click", () => {
  previewLanguage = previewLanguage === "fa" ? "en" : "fa";
  renderPreview();
});
navigationButtons.forEach((button) => button.addEventListener("click", () => { window.location.href = button.dataset.route; }));

renderPreview();
