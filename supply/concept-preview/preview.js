const content = {
  fa: {
    title: "تأمین و عرضه",
    navigation: ["طراحی و دکوراسیون داخلی", "تأمین و عرضه", "خدمات", "ماشین‌آلات سفارشی", "درباره ما", "تماس"],
    groups: [
      {
        title: "متریال و تجهیزات ساختمان",
        description: "متریال و تجهیزات ساختمان، متناسب با طرح پروژه و سلیقهٔ شخصی شما انتخاب و پیشنهاد می‌شوند. پس از تأیید نهایی، تأمین سرامیک و اسلب، انواع درب، تجهیزات روشنایی، سیستم‌های گرمایش، سرمایش و تهویه، هوشمندسازی و تجهیزات آشپزخانه و سرویس توسط ما انجام خواهد شد.",
      },
      {
        title: "مبلمان و دکوراسیون داخلی",
        description: "مبلمان و عناصر دکوراسیون داخلی، متناسب با سبک طراحی و سلیقهٔ شخصی شما انتخاب و پیشنهاد می‌شوند. پس از تأیید نهایی، تأمین مبلمان، پرده و اکسسوری‌های دکوراتیو توسط ما انجام خواهد شد.",
      },
      {
        title: "سازه‌های سفارشی چوب و ام‌دی‌اف",
        description: "سازه‌های سفارشی چوب و ام‌دی‌اف، بر اساس ابعاد فضا، طرح پروژه و نیازهای شما طراحی و پیشنهاد می‌شوند. پس از تأیید نهایی، ساخت و اجرای کابینت، کمد، میز، کانتر، دیوار تلویزیون، روشویی و سایر اجزای سفارشی توسط تیم ما انجام خواهد شد.",
      },
    ],
    inquiry: {
      trigger: "مشاوره و ثبت درخواست",
      eyebrow: "ارتباط با گروه نظری‌فر",
      title: "مشاوره و ثبت درخواست",
      name: "نام",
      phone: "شماره تماس",
      topic: "موضوع درخواست",
      topicValue: "تأمین و عرضه",
      message: "توضیح کوتاه",
      submit: "ارسال درخواست در واتساپ",
      call: "تماس مستقیم با کارشناس",
    },
  },
  en: {
    title: "Supply",
    navigation: ["Interior Design & Decoration", "Supply", "Services", "Custom Machines", "About", "Contact"],
    groups: [
      {
        title: "Building Materials & Equipment",
        description: "Building materials and equipment are selected and proposed in accordance with the project design and your personal preferences. Following final approval, we undertake the supply of tiles and slabs, doors, lighting, heating, cooling and ventilation systems, smart systems, and kitchen and bathroom equipment.",
      },
      {
        title: "Furniture & Interior Decoration",
        description: "Furniture and interior elements are selected and proposed to complement the design language and your personal preferences. Following final approval, we undertake the supply of furniture, curtains and decorative accessories.",
      },
      {
        title: "Custom Wood & MDF Structures",
        description: "Custom wood and MDF structures are designed and proposed around the dimensions of the space, the project design and your requirements. Following final approval, our team undertakes the fabrication and installation of cabinetry, wardrobes, desks, counters, TV walls, vanities and other bespoke elements.",
      },
    ],
    inquiry: {
      trigger: "Consultation & Enquiries",
      eyebrow: "Contact Nazarifar Group",
      title: "Consultation & Enquiries",
      name: "Name",
      phone: "Phone",
      topic: "Subject",
      topicValue: "Supply",
      message: "Brief message",
      submit: "Send via WhatsApp",
      call: "Call a specialist",
    },
  },
};

const site = document.querySelector(".site");
const title = document.querySelector("[data-title]");
const groupsRoot = document.querySelector("[data-groups]");
const languageButton = document.querySelector("[data-language]");
const navigationButtons = [...document.querySelectorAll(".navigation button:not(.language)")];
const inquiryShell = document.querySelector("[data-inquiry-shell]");
const inquiryTrigger = document.querySelector("[data-inquiry-open]");
const inquiryForm = document.querySelector("[data-inquiry-form]");
let language = "fa";
let openGroup = 0;

function render() {
  const current = content[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  site.dataset.lang = language;
  title.textContent = current.title;
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

  groupsRoot.replaceChildren(...current.groups.map((group, index) => {
    const section = document.createElement("section");
    section.className = `supply-group${index === openGroup ? " is-open" : ""}`;

    const button = document.createElement("button");
    button.className = "supply-group__button";
    button.type = "button";
    button.textContent = group.title;
    button.setAttribute("aria-expanded", String(index === openGroup));
    button.addEventListener("click", () => {
      openGroup = openGroup === index ? -1 : index;
      render();
    });

    const items = document.createElement("div");
    items.className = "supply-group__items";
    const inner = document.createElement("div");
    inner.className = "supply-group__items-inner";
    const description = document.createElement("p");
    description.className = "supply-group__description";
    description.textContent = group.description;
    inner.append(description);
    items.append(inner);
    section.append(button, items);
    return section;
  }));
}

languageButton.addEventListener("click", () => {
  language = language === "fa" ? "en" : "fa";
  openGroup = 0;
  render();
});

function setInquiry(open) {
  inquiryShell.classList.toggle("is-open", open);
  inquiryShell.setAttribute("aria-hidden", String(!open));
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
  const labels = language === "fa"
    ? { heading: "درخواست جدید از سایت", topic: "موضوع", name: "نام", phone: "شماره تماس", message: "توضیحات" }
    : { heading: "New website enquiry", topic: "Subject", name: "Name", phone: "Phone", message: "Message" };
  const message = [
    labels.heading,
    "",
    `${labels.topic}: ${data.get("topic")}`,
    `${labels.name}: ${data.get("name")}`,
    `${labels.phone}: ${data.get("phone")}`,
    `${labels.message}: ${data.get("message") || "—"}`,
  ].join("\n");
  window.open(`https://wa.me/989374493810?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

render();
