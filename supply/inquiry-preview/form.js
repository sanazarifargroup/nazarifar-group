const stages = [
  {
    key: "subject",
    title: "در چه زمینه‌ای می‌توانیم همراهتان باشیم؟",
    hint: "موضوع اصلی درخواست را انتخاب کنید.",
    options: ["طراحی", "بازسازی", "تجهیز", "تأمین و عرضه", "خدمات ساختمان", "ماشین‌آلات سفارشی"],
  },
  {
    key: "detail",
    title: "درخواست شما مربوط به کدام بخش است؟",
    hint: "گزینه‌ها بر اساس موضوع انتخاب‌شده نمایش داده می‌شوند.",
  },
  {
    key: "project",
    title: "کمی دربارهٔ پروژه بدانیم",
    hint: "اگر اطلاعات دقیق در دسترس نیست، می‌توانید حدودی وارد کنید.",
  },
  {
    key: "files",
    title: "توضیحات و فایل‌های پروژه",
    hint: "عکس، نقشه یا فایل نمونه به بررسی دقیق‌تر درخواست کمک می‌کند.",
  },
  {
    key: "contact",
    title: "اطلاعات تماس",
    hint: "کارشناس مرتبط پس از بررسی درخواست با شما تماس می‌گیرد.",
  },
  {
    key: "review",
    title: "مرور و ثبت نهایی",
    hint: "پیش از ثبت، خلاصهٔ درخواست را بررسی کنید.",
  },
];

const detailOptions = {
  "طراحی": ["طراحی داخلی", "طراحی نما", "طراحی سه‌بعدی", "طراحی یکپارچهٔ پروژه"],
  "بازسازی": ["مسکونی", "اداری", "تجاری", "ساختمان کامل"],
  "تجهیز": ["مسکونی", "اداری", "تجاری", "اقامتی و پذیرایی"],
  "تأمین و عرضه": ["متریال و تجهیزات ساختمان", "مبلمان و دکوراسیون داخلی", "سازه‌های سفارشی چوب و ام‌دی‌اف"],
  "خدمات ساختمان": ["سرویس‌های دوره‌ای ساختمان", "پشتیبانی فنی و تعمیرات", "مدیریت و نگهداری ساختمان"],
  "ماشین‌آلات سفارشی": ["دستگاه فروش خودکار", "تجهیزات آزمایشگاهی", "بازیافت آمالگام", "توسعهٔ دستگاه اختصاصی"],
};

const state = {
  step: 0,
  subject: "تأمین و عرضه",
  detail: "",
  city: "",
  area: "",
  timeline: "",
  description: "",
  fileNames: [],
  name: "",
  phone: "",
  contactTime: "",
};

const stageRoot = document.querySelector("[data-stage]");
const currentStep = document.querySelector("[data-step-current]");
const progress = document.querySelector("[data-progress]");
const backButton = document.querySelector("[data-back]");
const nextButton = document.querySelector("[data-next]");
const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

function toPersianNumber(value) {
  return String(value).replace(/\d/g, (digit) => persianDigits[digit]);
}

function escapeHtml(value) {
  return String(value || "—")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function optionsMarkup(name, options, selected) {
  return `<div class="request-options">${options.map((option) => `
    <label class="request-option">
      <input type="radio" name="${name}" value="${escapeHtml(option)}" ${selected === option ? "checked" : ""} />
      <span>${escapeHtml(option)}</span>
    </label>`).join("")}</div>`;
}

function stageMarkup() {
  const stage = stages[state.step];
  let body = "";

  if (stage.key === "subject") {
    body = optionsMarkup("subject", stage.options, state.subject);
  }

  if (stage.key === "detail") {
    body = optionsMarkup("detail", detailOptions[state.subject] || [], state.detail);
  }

  if (stage.key === "project") {
    body = `<div class="request-fields">
      <label class="request-field"><span>شهر یا محل پروژه</span><input name="city" value="${escapeHtml(state.city)}" autocomplete="address-level2" /></label>
      <label class="request-field"><span>متراژ تقریبی</span><input name="area" value="${escapeHtml(state.area)}" inputmode="numeric" placeholder="مثلاً ۲۵۰ متر" /></label>
      <label class="request-field request-field--wide"><span>زمان موردنظر برای شروع</span>
        <select name="timeline">
          <option value="">انتخاب کنید</option>
          ${["در اولین فرصت", "یک تا سه ماه آینده", "سه تا شش ماه آینده", "فعلاً در مرحلهٔ بررسی هستم"].map((value) => `<option ${state.timeline === value ? "selected" : ""}>${value}</option>`).join("")}
        </select>
      </label>
    </div>`;
  }

  if (stage.key === "files") {
    body = `<div class="request-fields">
      <label class="request-field request-field--wide"><span>شرح کوتاه درخواست</span><textarea name="description" rows="4" placeholder="نیازها یا نکات مهم پروژه را بنویسید">${escapeHtml(state.description === "—" ? "" : state.description)}</textarea></label>
      <label class="request-upload request-field--wide">
        <input name="files" type="file" multiple accept="image/*,.pdf,.dwg,.zip" />
        <span data-upload-label>${state.fileNames.length ? escapeHtml(state.fileNames.join("، ")) : "افزودن عکس، نقشه یا فایل نمونه"}</span>
      </label>
    </div>`;
  }

  if (stage.key === "contact") {
    body = `<div class="request-fields">
      <label class="request-field"><span>نام و نام خانوادگی</span><input name="name" value="${escapeHtml(state.name)}" autocomplete="name" /></label>
      <label class="request-field"><span>شمارهٔ همراه</span><input name="phone" value="${escapeHtml(state.phone)}" inputmode="tel" autocomplete="tel" placeholder="۰۹۱۲۱۲۳۴۵۶۷" /></label>
      <label class="request-field request-field--wide"><span>زمان مناسب تماس</span>
        <select name="contactTime">
          <option value="">انتخاب کنید</option>
          ${["صبح", "ظهر", "عصر", "هر زمان"].map((value) => `<option ${state.contactTime === value ? "selected" : ""}>${value}</option>`).join("")}
        </select>
      </label>
    </div>`;
  }

  if (stage.key === "review") {
    const rows = [
      ["موضوع درخواست", state.subject],
      ["بخش مرتبط", state.detail],
      ["محل پروژه", state.city],
      ["متراژ تقریبی", state.area],
      ["زمان شروع", state.timeline],
      ["نام", state.name],
      ["شمارهٔ همراه", state.phone],
      ["فایل پیوست", state.fileNames.length ? `${toPersianNumber(state.fileNames.length)} فایل` : "بدون فایل"],
    ];
    body = `<div class="request-review">${rows.map(([label, value]) => `<div class="request-review__row"><span>${label}</span><span>${escapeHtml(value)}</span></div>`).join("")}</div>`;
  }

  return `<h2 class="request-question">${stage.title}</h2><p class="request-hint">${stage.hint}</p>${body}<p class="request-error" data-error></p>`;
}

function render() {
  currentStep.textContent = toPersianNumber(state.step + 1);
  progress.style.width = `${((state.step + 1) / stages.length) * 100}%`;
  stageRoot.innerHTML = stageMarkup();
  backButton.disabled = state.step === 0;
  nextButton.textContent = state.step === stages.length - 1 ? "ثبت درخواست" : "ادامه";

  const fileInput = stageRoot.querySelector('input[type="file"]');
  if (fileInput) {
    fileInput.addEventListener("change", () => {
      state.fileNames = [...fileInput.files].map((file) => file.name);
      document.querySelector("[data-upload-label]").textContent = state.fileNames.length
        ? state.fileNames.join("، ")
        : "افزودن عکس، نقشه یا فایل نمونه";
    });
  }
}

function saveVisibleFields() {
  const fields = stageRoot.querySelectorAll("input, select, textarea");
  fields.forEach((field) => {
    if (field.type === "file" || (field.type === "radio" && !field.checked)) return;
    if (field.name && Object.hasOwn(state, field.name)) state[field.name] = field.value.trim();
  });
  if (state.step === 0 && !detailOptions[state.subject]?.includes(state.detail)) state.detail = "";
}

function validateStep() {
  saveVisibleFields();
  const error = stageRoot.querySelector("[data-error]");
  let message = "";
  if (state.step === 0 && !state.subject) message = "لطفاً موضوع درخواست را انتخاب کنید.";
  if (state.step === 1 && !state.detail) message = "لطفاً بخش مرتبط را انتخاب کنید.";
  if (state.step === 2 && !state.city) message = "لطفاً شهر یا محل پروژه را وارد کنید.";
  if (state.step === 3 && !state.description) message = "لطفاً توضیح کوتاهی دربارهٔ درخواست بنویسید.";
  if (state.step === 4 && (!state.name || !/^09\d{9}$/.test(state.phone.replace(/[۰-۹]/g, (digit) => persianDigits.indexOf(digit))))) {
    message = "نام و یک شمارهٔ همراه معتبر وارد کنید.";
  }
  if (error) error.textContent = message;
  return !message;
}

function moveTo(step) {
  stageRoot.classList.add("is-leaving");
  window.setTimeout(() => {
    state.step = step;
    render();
    requestAnimationFrame(() => stageRoot.classList.remove("is-leaving"));
  }, 180);
}

nextButton.addEventListener("click", () => {
  if (!validateStep()) return;
  if (state.step < stages.length - 1) {
    moveTo(state.step + 1);
    return;
  }

  stageRoot.innerHTML = `<div class="request-success"><strong>پیش‌نمایش ثبت درخواست</strong><p>در نسخهٔ نهایی، درخواست در این مرحله ذخیره می‌شود<br />و جزئیات آن از طریق بله برای شما ارسال خواهد شد.</p></div>`;
  document.querySelector(".request-actions").style.display = "none";
});

backButton.addEventListener("click", () => {
  saveVisibleFields();
  if (state.step > 0) moveTo(state.step - 1);
});

render();
