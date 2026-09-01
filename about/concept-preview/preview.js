const content = {
  fa: {
    title: "درباره ما",
    text: "فعالیت ما در چهار حوزه شکل گرفته است: طراحی و دکوراسیون داخلی، تأمین و عرضه، خدمات ساختمان و توسعهٔ ماشین‌آلات سفارشی. این بخش‌ها به‌صورت تخصصی فعالیت می‌کنند و بسته به نیاز پروژه‌ها، در کنار یکدیگر قرار می‌گیرند.",
    navigation: ["طراحی و دکوراسیون داخلی", "تأمین و عرضه", "خدمات", "ماشین‌آلات سفارشی", "درباره ما", "تماس"],
    inquiry: {
      trigger: "مشاوره و ثبت درخواست",
      eyebrow: "ارتباط با گروه نظری‌فر",
      title: "مشاوره و ثبت درخواست",
      name: "نام",
      phone: "شماره تماس",
      topic: "موضوع درخواست",
      topicValue: "درباره ما",
      message: "توضیح کوتاه",
      submit: "ارسال درخواست",
      call: "تماس مستقیم با کارشناس",
    },
  },
  en: {
    title: "About",
    text: "Our activities span four areas: Interior Design & Decoration, Supply, Building Services, and Custom Machine Development. Each operates with its own specialist focus and, depending on project requirements, works alongside the others.",
    navigation: ["Interior Design & Decoration", "Supply", "Services", "Custom Machines", "About", "Contact"],
    inquiry: {
      trigger: "Consultation & Enquiries",
      eyebrow: "Contact Nazarifar Group",
      title: "Consultation & Enquiries",
      name: "Name",
      phone: "Phone",
      topic: "Subject",
      topicValue: "About",
      message: "Brief message",
      submit: "Send enquiry",
      call: "Call a specialist",
    },
  },
};

const site = document.querySelector(".site");
const title = document.querySelector("[data-title]");
const text = document.querySelector("[data-text]");
const languageButton = document.querySelector("[data-language]");
const navigationButtons = [...document.querySelectorAll(".navigation button:not(.language)")];
const image = document.querySelector("[data-image-source]");
const inquiryShell = document.querySelector("[data-inquiry-shell]");
const inquiryTrigger = document.querySelector("[data-inquiry-open]");
const inquiryForm = document.querySelector("[data-inquiry-form]");
let language = "fa";

async function loadImage() {
  const response = await fetch(image.dataset.imageSource);
  image.src = (await response.text()).trim();
}

function render() {
  const current = content[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  site.dataset.lang = language;
  title.textContent = current.title;
  text.textContent = current.text;
  languageButton.textContent = language === "fa" ? "EN" : "FA";
  navigationButtons.forEach((button, index) => {
    button.textContent = current.navigation[index];
  });
  inquiryTrigger.textContent = current.inquiry.trigger;
  document.querySelector("[data-inquiry-eyebrow]").textContent = current.inquiry.eyebrow;
  document.querySelector("[data-inquiry-title]").textContent = current.inquiry.title;
  document.querySelector("[data-label-name]").textContent = current.inquiry.name;
  document.querySelector("[data-label-phone]").textContent = current.inquiry.phone;
  document.querySelector("[data-label-topic]").textContent = current.inquiry.topic;
  document.querySelector("[data-topic-value]").value = current.inquiry.topicValue;
  document.querySelector("[data-label-message]").textContent = current.inquiry.message;
  document.querySelector("[data-submit-label]").textContent = current.inquiry.submit;
  document.querySelector("[data-call-label]").textContent = current.inquiry.call;
}

languageButton.addEventListener("click", () => {
  language = language === "fa" ? "en" : "fa";
  render();
});

function setInquiry(open) {
  inquiryShell.classList.toggle("is-open", open);
  inquiryShell.setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
}

inquiryTrigger.addEventListener("click", () => setInquiry(true));
document.querySelectorAll("[data-inquiry-close]").forEach((button) => {
  button.addEventListener("click", () => setInquiry(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setInquiry(false);
});

inquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(inquiryForm);
  const subject = `${data.get("topic")} — ${data.get("name")}`;
  const body = `${data.get("message")}\n\n${data.get("name")}\n${data.get("phone")}`;
  window.location.href = `mailto:info@nazarifargroup.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

loadImage();
render();
