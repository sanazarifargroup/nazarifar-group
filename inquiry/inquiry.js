(() => {
  if (window.NazarifarInquiry) return;

  const CONFIG = {
    categories: {
      architecture: {
        labels: { fa: "طراحی و دکوراسیون داخلی", en: "Interior Design & Decoration" },
        route: "/architecture/",
        services: [
          { id: "design", route: "/architecture/design/", labels: { fa: "طراحی", en: "Design" } },
          { id: "renovation", route: "/architecture/renovation/", labels: { fa: "بازسازی", en: "Renovation" } },
          { id: "fit-out", route: "/architecture/fit-out/", labels: { fa: "تجهیز", en: "Fit-Out" } },
        ],
        questions: [
          { id: "spaceType", type: "choice", labels: { fa: "نوع فضای پروژه چیست؟", en: "What type of space is the project?" }, options: [
            { id: "residential", labels: { fa: "مسکونی", en: "Residential" } },
            { id: "office", labels: { fa: "اداری", en: "Office" } },
            { id: "commercial", labels: { fa: "تجاری", en: "Commercial" } },
            { id: "other", labels: { fa: "سایر", en: "Other" } },
          ] },
          { id: "area", type: "text", inputMode: "numeric", labels: { fa: "متراژ تقریبی پروژه چقدر است؟", en: "What is the approximate project area?" }, placeholders: { fa: "مثلاً ۲۵۰ مترمربع", en: "For example, 250 sqm" } },
        ],
      },
      supply: {
        labels: { fa: "تأمین و عرضه", en: "Supply" },
        route: "/supply/",
        services: [
          { id: "building-materials-equipment", route: "/supply/building-materials-equipment/", labels: { fa: "متریال و تجهیزات ساختمان", en: "Building Materials & Equipment" } },
          { id: "furniture-interior", route: "/supply/furniture-interior/", labels: { fa: "مبلمان و دکوراسیون داخلی", en: "Furniture & Interior Decoration" } },
          { id: "custom-wood-mdf", route: "/supply/custom-wood-mdf/", labels: { fa: "سازه‌های سفارشی چوب و ام‌دی‌اف", en: "Custom Wood & MDF Structures" } },
        ],
        questions: [
          { id: "supplyNeed", type: "choice", labels: { fa: "در چه مرحله‌ای به تأمین نیاز دارید؟", en: "At what stage do you need supply support?" }, options: [
            { id: "selection", labels: { fa: "انتخاب و پیشنهاد محصول", en: "Product selection and recommendation" } },
            { id: "pricing", labels: { fa: "استعلام قیمت و موجودی", en: "Price and availability enquiry" } },
            { id: "procurement", labels: { fa: "تأمین براساس فایل طراحی", en: "Procurement based on design files" } },
          ] },
          { id: "quantity", type: "text", labels: { fa: "مقدار یا تعداد تقریبی موردنیاز را بنویسید", en: "Enter the approximate quantity required" }, placeholders: { fa: "اگر مشخص نیست، بنویسید نیاز به مشاوره دارم", en: "If unknown, enter: consultation required" } },
        ],
      },
      services: {
        labels: { fa: "خدمات", en: "Services" },
        route: "/services/",
        services: [
          { id: "scheduled", route: "/services/scheduled/", labels: { fa: "سرویس‌های دوره‌ای ساختمان", en: "Scheduled Building Services" } },
          { id: "technical-support", route: "/services/maintenance-contract/", labels: { fa: "پشتیبانی فنی و تعمیرات", en: "Technical Support & Repairs" } },
          { id: "facility-management", route: "/services/facility-management/", labels: { fa: "مدیریت و نگهداری ساختمان", en: "Building Management & Maintenance" } },
        ],
        questions: [
          { id: "buildingType", type: "choice", labels: { fa: "نوع ساختمان چیست؟", en: "What type of building is it?" }, options: [
            { id: "residential", labels: { fa: "مسکونی", en: "Residential" } },
            { id: "office", labels: { fa: "اداری", en: "Office" } },
            { id: "commercial", labels: { fa: "تجاری", en: "Commercial" } },
            { id: "complex", labels: { fa: "مجتمع یا ساختمان کامل", en: "Complex or entire building" } },
          ] },
          { id: "serviceFrequency", type: "choice", labels: { fa: "نوع همکاری موردنظر چیست؟", en: "What type of engagement do you need?" }, options: [
            { id: "single", labels: { fa: "رسیدگی موردی", en: "One-time service" } },
            { id: "periodic", labels: { fa: "همکاری دوره‌ای", en: "Recurring service" } },
            { id: "contract", labels: { fa: "قرارداد مستمر", en: "Ongoing contract" } },
          ] },
        ],
      },
      "custom-machines": {
        labels: { fa: "ماشین‌آلات سفارشی", en: "Custom Machines" },
        route: "/custom-machines/",
        services: [
          { id: "laboratory-equipment", route: "/custom-machines/laboratory-equipment/", labels: { fa: "تجهیزات آزمایشگاهی", en: "Laboratory Equipment" } },
          { id: "vending-machines", route: "/custom-machines/vending-machines/", labels: { fa: "دستگاه‌های فروش خودکار", en: "Vending Machines" } },
          { id: "amalgam-recycling", route: "/custom-machines/amalgam-recycling/", labels: { fa: "دستگاه بازیافت آمالگام", en: "Amalgam Recycling Machine" } },
          { id: "3d-scanner", route: "/custom-machines/3d-scanner/", labels: { fa: "دستگاه اسکنر سه‌بعدی", en: "3D Scanner" } },
        ],
        questions: [
          { id: "developmentStage", type: "choice", labels: { fa: "درخواست شما در چه مرحله‌ای است؟", en: "What stage is your request at?" }, options: [
            { id: "idea", labels: { fa: "ایدهٔ اولیه", en: "Initial idea" } },
            { id: "specification", labels: { fa: "مشخصات فنی آماده است", en: "Technical specification available" } },
            { id: "prototype", labels: { fa: "نمونهٔ اولیه موجود است", en: "Prototype available" } },
            { id: "development", labels: { fa: "نیاز به توسعه یا بازطراحی", en: "Development or redesign required" } },
          ] },
          { id: "machineQuantity", type: "text", inputMode: "numeric", labels: { fa: "تعداد تقریبی دستگاه موردنیاز چقدر است؟", en: "What is the approximate quantity required?" }, placeholders: { fa: "مثلاً یک نمونهٔ اولیه", en: "For example, one prototype" } },
        ],
      },
    },
    commonQuestions: [
      { id: "urgency", type: "choice", labels: { fa: "میزان فوریت درخواست چقدر است؟", en: "How urgent is this request?" }, options: [
        { id: "normal", labels: { fa: "عادی", en: "Normal" } },
        { id: "soon", labels: { fa: "در اولین فرصت", en: "As soon as possible" } },
        { id: "urgent", labels: { fa: "فوری", en: "Urgent" } },
      ] },
      { id: "description", type: "textarea", labels: { fa: "درخواستتان را کوتاه توضیح دهید", en: "Briefly describe your request" }, placeholders: { fa: "نیازها، شرایط فعلی یا نکات مهم را بنویسید", en: "Describe the requirements, current condition or important details" } },
      { id: "files", type: "files", labels: { fa: "اگر فایلی دارید، اضافه کنید", en: "Add supporting files, if available" } },
      { id: "name", type: "text", autocomplete: "name", labels: { fa: "نام و نام خانوادگی شما چیست؟", en: "What is your full name?" } },
      { id: "phone", type: "tel", inputMode: "tel", autocomplete: "tel", labels: { fa: "شمارهٔ همراه شما چیست؟", en: "What is your mobile number?" }, placeholders: { fa: "۰۹۱۲۱۲۳۴۵۶۷", en: "09121234567" } },
      { id: "city", type: "text", autocomplete: "address-level2", labels: { fa: "شهر یا محل پروژه کجاست؟", en: "Where is the project located?" } },
      { id: "contactTime", type: "choice", labels: { fa: "چه زمانی برای تماس مناسب‌تر است؟", en: "What is the best time to contact you?" }, options: [
        { id: "morning", labels: { fa: "صبح", en: "Morning" } },
        { id: "noon", labels: { fa: "ظهر", en: "Noon" } },
        { id: "evening", labels: { fa: "عصر", en: "Evening" } },
        { id: "anytime", labels: { fa: "هر زمان", en: "Any time" } },
      ] },
    ],
  };

  const TEXT = {
    fa: {
      trigger: "مشاوره و ثبت درخواست", eyebrow: "گروه نظری‌فر", title: "مشاوره و ثبت درخواست",
      selectCategory: "درخواست شما مربوط به کدام بخش است؟", selectService: "خدمت موردنظر را انتخاب کنید",
      hintChoice: "یک گزینه را انتخاب کنید.", hintEditable: "انتخاب فعلی قابل تغییر است.", continue: "ادامه", back: "بازگشت",
      summary: "خلاصهٔ درخواست", summaryHint: "پیش از ثبت نهایی، اطلاعات را بررسی کنید.", submit: "ثبت نهایی درخواست",
      required: "لطفاً این مرحله را تکمیل کنید.", invalidPhone: "یک شمارهٔ همراه معتبر وارد کنید.",
      upload: "عکس، نقشه یا فایل نمونه را انتخاب کنید", uploadReady: "فایل برای پیش‌نمایش آماده شد",
      category: "دسته", service: "خدمت", urgency: "فوریت", description: "توضیحات", name: "نام", phone: "شماره همراه",
      city: "شهر", contactTime: "زمان تماس", origin: "صفحهٔ مبدأ", files: "فایل‌ها", noFile: "بدون فایل",
      success: "درخواست با موفقیت ثبت شد", tracking: "شمارهٔ پیگیری", stored: "ذخیره در سیستم", completed: "انجام شد",
      trello: "ترلو", bale: "بله", previewReady: "آمادهٔ اتصال پس از تأیید", offline: "قطع ارتباط آزمایشی",
      queued: "در صف ارسال مجدد", simulate: "نمایش حالت قطع ارتباط", retry: "تلاش مجدد", close: "بستن",
      previewNote: "این پیش‌نمایش است؛ اطلاعات فقط در همین مرورگر ذخیره می‌شود.", change: "تغییر",
      sending: "در حال ارسال…", sendFailed: "ارسال انجام نشد؛ اتصال اینترنت را بررسی و دوباره تلاش کنید.",
      fileLimits: "حداکثر ۳ فایل، هر فایل ۸ مگابایت و مجموعاً ۱۶ مگابایت مجاز است.",
      liveNote: "درخواست شما برای تیم نظری‌فر ارسال شد.", baleSent: "ارسال شد", trelloSent: "کارت ساخته شد", trelloPending: "در انتظار اتصال", trelloFailed: "ارسال ناموفق؛ در بله ثبت شد",
      attachmentsSent: "پیوست‌های ارسال‌شده",
    },
    en: {
      trigger: "Consultation & Enquiries", eyebrow: "Nazarifar Group", title: "Consultation & Enquiries",
      selectCategory: "Which area is your enquiry about?", selectService: "Select the relevant service",
      hintChoice: "Select one option.", hintEditable: "The current selection can be changed.", continue: "Continue", back: "Back",
      summary: "Request summary", summaryHint: "Review the information before final submission.", submit: "Submit request",
      required: "Please complete this step.", invalidPhone: "Enter a valid mobile number.",
      upload: "Choose photos, plans or sample files", uploadReady: "Files are ready for preview",
      category: "Category", service: "Service", urgency: "Urgency", description: "Description", name: "Name", phone: "Mobile",
      city: "City", contactTime: "Contact time", origin: "Source page", files: "Files", noFile: "No files",
      success: "Your request has been registered", tracking: "Tracking number", stored: "System record", completed: "Completed",
      trello: "Trello", bale: "Bale", previewReady: "Ready to connect after approval", offline: "Simulated connection loss",
      queued: "Queued for retry", simulate: "Preview connection error", retry: "Retry", close: "Close",
      previewNote: "This is a preview; data is stored only in this browser.", change: "Change",
      sending: "Sending…", sendFailed: "Submission failed. Check your connection and try again.",
      fileLimits: "Up to 3 files, 8 MB each and 16 MB total are allowed.",
      liveNote: "Your enquiry has been sent to the Nazarifar team.", baleSent: "Sent", trelloSent: "Card created", trelloPending: "Pending connection", trelloFailed: "Failed; saved in Bale",
      attachmentsSent: "Attachments sent",
    },
  };

  const TRIGGER_COPY = {
    fa: {
      architecture: ["برای بررسی پروژه و دریافت پیشنهاد متناسب،", "درخواست خود را ثبت کنید"],
      supply: ["برای انتخاب و تأمین موارد موردنیاز پروژه،", "درخواست خود را ثبت کنید"],
      services: ["برای بررسی شرایط ساختمان و انتخاب نوع همکاری،", "درخواست خود را ثبت کنید"],
      "custom-machines": ["برای بررسی امکان طراحی یا توسعه دستگاه،", "درخواست خود را ثبت کنید"],
      general: ["برای شروع همکاری،", "درخواست خود را ثبت کنید"],
    },
    en: {
      architecture: ["To review your project and receive a tailored proposal,", "submit your enquiry"],
      supply: ["To select and source the requirements of your project,", "submit your enquiry"],
      services: ["To review your building needs and define the right service,", "submit your enquiry"],
      "custom-machines": ["To assess the design or development of your machine,", "submit your enquiry"],
      general: ["To begin a conversation,", "submit your enquiry"],
    },
  };

  const INQUIRY_ENDPOINT = "https://nazarifar-inquiries.round-dream-81b9.workers.dev/inquiries";
  const MAX_FILES = 3;
  const MAX_FILE_BYTES = 8 * 1024 * 1024;
  const MAX_TOTAL_FILE_BYTES = 16 * 1024 * 1024;
  const runtime = { mounted: false, open: false, language: "fa", steps: [], index: 0, origin: null, files: [], values: {}, completed: false };

  function normalizePath(pathname) {
    const value = pathname.replace(/\/+/g, "/");
    return value.endsWith("/") ? value : `${value}/`;
  }

  function language() {
    const htmlLanguage = document.documentElement.lang;
    const bodyLanguage = document.body?.dataset.language || document.querySelector(".site")?.dataset.lang;
    let saved = "";
    try { saved = localStorage.getItem("nazarifar-language") || ""; } catch {}
    return [bodyLanguage, htmlLanguage, saved].find(value => value === "fa" || value === "en") || "fa";
  }

  function detectOrigin() {
    const path = normalizePath(location.pathname);
    let categoryId = null;
    let serviceId = null;
    for (const [id, category] of Object.entries(CONFIG.categories)) {
      if (path === category.route || path.startsWith(category.route)) {
        categoryId = id;
        const service = category.services.find(item => path === item.route || path.startsWith(item.route));
        if (service) serviceId = service.id;
        break;
      }
    }
    return {
      categoryId,
      serviceId,
      title: document.title,
      url: location.href,
      path,
      id: path === "/" ? "home" : path.split("/").filter(Boolean).join("--"),
    };
  }

  function label(item, lang = runtime.language) {
    return item?.labels?.[lang] || item?.labels?.en || "—";
  }

  function selectedCategory() {
    return CONFIG.categories[runtime.values.categoryId] || null;
  }

  function selectedService() {
    return selectedCategory()?.services.find(item => item.id === runtime.values.serviceId) || null;
  }

  function localizedOption(question, value) {
    return label(question?.options?.find(option => option.id === value)) || value || "—";
  }

  function buildSteps(startMode = "auto") {
    const category = selectedCategory();
    const steps = [];
    if (startMode === "category" || !category) steps.push({ id: "categoryId", type: "category" });
    if (startMode === "service" || (category && !selectedService())) steps.push({ id: "serviceId", type: "service" });
    if (category) steps.push(...category.questions);
    steps.push(...CONFIG.commonQuestions, { id: "summary", type: "summary" });
    runtime.steps = steps;
    runtime.index = 0;
  }

  function resetForOrigin() {
    runtime.language = language();
    runtime.origin = detectOrigin();
    runtime.files = [];
    runtime.completed = false;
    runtime.values = {
      categoryId: runtime.origin.categoryId || "",
      serviceId: runtime.origin.serviceId || "",
    };
    buildSteps();
  }

  function escapeHtml(value) {
    return String(value ?? "—").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }

  function questionMarkup(question) {
    const t = TEXT[runtime.language];
    let title = label(question);
    let hint = "";
    let body = "";
    if (question.type === "category") {
      title = t.selectCategory;
      hint = t.hintChoice;
      body = optionsMarkup("categoryId", Object.entries(CONFIG.categories).map(([id, item]) => ({ id, labels: item.labels })));
    } else if (question.type === "service") {
      title = "";
      hint = "";
      body = optionsMarkup("serviceId", selectedCategory()?.services || []);
    } else if (question.type === "choice") {
      hint = t.hintChoice;
      body = optionsMarkup(question.id, question.options);
    } else if (question.type === "textarea") {
      body = `<label class="nf-field"><textarea name="${question.id}" rows="5" placeholder="${escapeHtml(question.placeholders?.[runtime.language] || "")}">${escapeHtml(runtime.values[question.id] || "")}</textarea></label>`;
    } else if (question.type === "files") {
      body = `<label class="nf-upload"><input type="file" name="files" multiple accept="image/*,.pdf,.dwg,.zip" /><span data-nf-upload-label>${runtime.files.length ? escapeHtml(runtime.files.map(file => file.name).join("، ")) : t.upload}</span><i class="nf-upload__progress"></i></label>`;
    } else if (question.type === "summary") {
      title = t.summary;
      hint = t.summaryHint;
      body = summaryMarkup();
    } else {
      body = `<label class="nf-field"><input type="${question.type === "tel" ? "tel" : "text"}" name="${question.id}" value="${escapeHtml(runtime.values[question.id] || "")}" inputmode="${question.inputMode || "text"}" autocomplete="${question.autocomplete || "off"}" placeholder="${escapeHtml(question.placeholders?.[runtime.language] || "")}" /></label>`;
    }
    return `${title ? `<h2 class="nf-question">${escapeHtml(title)}</h2>` : ""}${hint ? `<p class="nf-hint">${escapeHtml(hint)}</p>` : ""}${body}<p class="nf-error" data-nf-error></p>`;
  }

  function optionsMarkup(name, options) {
    return `<div class="nf-options">${options.map(option => `<label class="nf-option"><input type="radio" name="${name}" value="${escapeHtml(option.id)}" ${runtime.values[name] === option.id ? "checked" : ""} /><span>${escapeHtml(label(option))}</span></label>`).join("")}</div>`;
  }

  function summaryRows() {
    const t = TEXT[runtime.language];
    const category = selectedCategory();
    const service = selectedService();
    const questions = [...(category?.questions || []), ...CONFIG.commonQuestions];
    const rows = [
      [t.category, label(category)], [t.service, label(service)],
      ...questions.filter(question => !["files"].includes(question.id) && runtime.values[question.id]).map(question => [label(question), question.type === "choice" ? localizedOption(question, runtime.values[question.id]) : runtime.values[question.id]]),
      [t.files, runtime.files.length ? runtime.files.map(file => file.name).join("، ") : t.noFile],
      [t.origin, `${runtime.origin.title}\n${runtime.origin.url}`, true],
    ];
    return rows;
  }

  function summaryMarkup() {
    return `<div class="nf-review">${summaryRows().map(([key, value, origin]) => `<div class="nf-review__row"><span>${escapeHtml(key)}</span><span class="${origin ? "nf-review__origin" : ""}">${escapeHtml(value)}</span></div>`).join("")}</div>`;
  }

  function renderContext() {
    const root = document.querySelector("[data-nf-context]");
    if (!root) return;
    const category = selectedCategory();
    const service = selectedService();
    const categories = Object.entries(CONFIG.categories).map(([id, item]) => `<button class="nf-category-tab ${runtime.values.categoryId === id ? "is-active" : ""}" type="button" data-nf-category="${escapeHtml(id)}">${escapeHtml(label(item))}</button>`).join("");
    root.innerHTML = `<div class="nf-category-strip">${categories}</div>${service ? `<div class="nf-service-context"><button class="nf-context-button" type="button" data-nf-change="service">${escapeHtml(label(service))}</button></div>` : ""}`;
  }

  function render() {
    const t = TEXT[runtime.language];
    const step = runtime.steps[runtime.index];
    const stage = document.querySelector("[data-nf-stage]");
    const shell = document.querySelector("[data-nf-inquiry]");
    shell.setAttribute("dir", runtime.language === "fa" ? "rtl" : "ltr");
    shell.dataset.language = runtime.language;
    document.querySelector("[data-nf-title]").textContent = t.title;
    document.querySelector("[data-nf-current]").textContent = runtime.index + 1;
    document.querySelector("[data-nf-total]").textContent = runtime.steps.length;
    document.querySelector("[data-nf-progress]").style.width = `${((runtime.index + 1) / runtime.steps.length) * 100}%`;
    renderContext();
    stage.innerHTML = questionMarkup(step);
    const back = document.querySelector("[data-nf-back]");
    const next = document.querySelector("[data-nf-next]");
    back.textContent = t.back;
    back.disabled = runtime.index === 0;
    next.textContent = step.type === "summary" ? t.submit : t.continue;
    next.hidden = ["category", "service", "choice"].includes(step.type);
    bindStage();
  }

  function bindStage() {
    document.querySelectorAll("[data-nf-category]").forEach(button => button.addEventListener("click", () => {
      runtime.values.categoryId = button.dataset.nfCategory;
      runtime.values.serviceId = "";
      buildSteps("service");
      render();
    }));

    document.querySelectorAll("[data-nf-change]").forEach(button => button.addEventListener("click", () => {
      if (button.dataset.nfChange === "category") {
        runtime.values.categoryId = "";
        runtime.values.serviceId = "";
        buildSteps("category");
      } else {
        runtime.values.serviceId = "";
        buildSteps("service");
      }
      render();
    }));

    document.querySelectorAll('.nf-stage input[type="radio"]').forEach(input => input.addEventListener("change", () => {
      const step = runtime.steps[runtime.index];
      saveStep();
      window.setTimeout(() => {
        if (step.type === "category") {
          runtime.values.serviceId = "";
          buildSteps("service");
          render();
        } else {
          move(1);
        }
      }, 110);
    }));

    const fileInput = document.querySelector('.nf-stage input[type="file"]');
    if (fileInput) fileInput.addEventListener("change", () => {
      const upload = fileInput.closest(".nf-upload");
      const files = [...fileInput.files];
      const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
      if (files.length > MAX_FILES || files.some(file => file.size > MAX_FILE_BYTES) || totalBytes > MAX_TOTAL_FILE_BYTES) {
        runtime.files = [];
        fileInput.value = "";
        document.querySelector("[data-nf-upload-label]").textContent = TEXT[runtime.language].fileLimits;
        return;
      }
      upload.classList.add("is-loading");
      document.querySelector("[data-nf-upload-label]").textContent = TEXT[runtime.language].uploadReady;
      window.setTimeout(() => {
        runtime.files = files;
        upload.classList.remove("is-loading");
        document.querySelector("[data-nf-upload-label]").textContent = runtime.files.map(file => file.name).join("، ") || TEXT[runtime.language].upload;
      }, 650);
    });
  }

  function saveStep() {
    const step = runtime.steps[runtime.index];
    if (step.type === "summary" || step.type === "files") return;
    const stage = document.querySelector("[data-nf-stage]");
    const input = stage?.querySelector(`[name="${step.id}"]:checked`) || stage?.querySelector(`[name="${step.id}"]`);
    if (input) runtime.values[step.id] = String(input.value ?? "").trim();
    if (step.type === "category" && runtime.values.categoryId) {
      runtime.values.serviceId = "";
    }
  }

  function validate() {
    const step = runtime.steps[runtime.index];
    saveStep();
    let error = "";
    if (step.type !== "summary" && step.type !== "files" && !runtime.values[step.id]) error = TEXT[runtime.language].required;
    if (step.id === "phone") {
      const latin = String(runtime.values.phone || "").replace(/[۰-۹]/g, digit => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))).replace(/\s|-/g, "");
      if (!/^09\d{9}$/.test(latin)) error = TEXT[runtime.language].invalidPhone;
      else runtime.values.phone = latin;
    }
    const target = document.querySelector("[data-nf-error]");
    if (target) target.textContent = error;
    return !error;
  }

  function move(direction) {
    const stage = document.querySelector("[data-nf-stage]");
    stage.classList.add("is-leaving");
    window.setTimeout(() => {
      runtime.index = Math.max(0, Math.min(runtime.steps.length - 1, runtime.index + direction));
      render();
      requestAnimationFrame(() => stage.classList.remove("is-leaving"));
    }, 170);
  }

  async function submitInquiry() {
    const t = TEXT[runtime.language];
    const next = document.querySelector("[data-nf-next]");
    const error = document.querySelector("[data-nf-error]");
    next.disabled = true;
    next.textContent = t.sending;
    if (error) error.textContent = "";

    const body = new FormData();
    body.append("payload", JSON.stringify({
      language: runtime.language,
      website: document.querySelector('[name="website"]')?.value || "",
      rows: summaryRows().map(([labelText, value]) => ({ label: labelText, value })),
    }));
    runtime.files.forEach(file => body.append("files", file, file.name));

    try {
      const response = await fetch(INQUIRY_ENDPOINT, { method: "POST", body });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok || !result.tracking) throw new Error("submission-failed");
      runtime.completed = true;
      successMarkup(result.tracking);
    } catch {
      if (error) error.textContent = t.sendFailed;
      next.disabled = false;
      next.textContent = t.submit;
    }
  }

  function successMarkup(tracking) {
    const t = TEXT[runtime.language];
    document.querySelector("[data-nf-progress]").style.width = "100%";
    document.querySelector("[data-nf-stage]").innerHTML = `<div class="nf-success"><div class="nf-success__mark">✓</div><h3>${t.success}</h3><p class="nf-success__tracking">${t.tracking}: ${tracking}</p><p class="nf-hint">${t.liveNote}</p><div class="nf-success__tools"><button type="button" data-nf-finish>${t.close}</button></div></div>`;
    const actions = document.querySelector(".nf-actions");
    actions.hidden = true;
    actions.style.display = "none";
    document.querySelector("[data-nf-finish]").addEventListener("click", close);
  }

  function open() {
    resetForOrigin();
    runtime.open = true;
    const shell = document.querySelector("[data-nf-inquiry]");
    shell.classList.add("is-open");
    shell.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const actions = document.querySelector(".nf-actions");
    actions.hidden = false;
    actions.style.removeProperty("display");
    render();
  }

  function close() {
    runtime.open = false;
    const shell = document.querySelector("[data-nf-inquiry]");
    shell.classList.remove("is-open");
    shell.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function updateTrigger() {
    const button = document.querySelector("[data-nf-open]");
    if (!button) return;
    const lang = language();
    const origin = detectOrigin();
    button.hidden = false;
    button.style.display = "";
    const [lead, action] = TRIGGER_COPY[lang][origin.categoryId] || TRIGGER_COPY[lang].general;
    button.innerHTML = `<span class="nf-inquiry-trigger__lead">${escapeHtml(lead)}</span><span class="nf-inquiry-trigger__action">${escapeHtml(action)}</span>`;

    document.body.insertBefore(button, document.querySelector("[data-nf-inquiry]"));
    button.classList.remove("nf-inquiry-trigger--in-section");
  }

  function mount() {
    if (runtime.mounted) return;
    runtime.mounted = true;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/inquiry/inquiry.css?v=8";
    document.head.append(link);
    document.body.insertAdjacentHTML("beforeend", `<button class="nf-inquiry-trigger" type="button" data-nf-open></button><div class="nf-inquiry" data-nf-inquiry aria-hidden="true"><button class="nf-inquiry__backdrop" type="button" data-nf-close aria-label="Close"></button><section class="nf-inquiry__panel" role="dialog" aria-modal="true" aria-labelledby="nf-inquiry-title"><button class="nf-inquiry__close" type="button" data-nf-close aria-label="Close">×</button><header class="nf-inquiry__heading"><h1 class="nf-inquiry__title" id="nf-inquiry-title" data-nf-title></h1></header><div class="nf-inquiry__context" data-nf-context></div><div class="nf-progress"><span class="nf-progress__count"><b data-nf-current>1</b> / <span data-nf-total>1</span></span><span class="nf-progress__track"><i data-nf-progress></i></span></div><form class="nf-inquiry__form" novalidate><input class="nf-honeypot" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" /><div class="nf-stage" data-nf-stage></div><footer class="nf-actions"><button class="nf-actions__back" type="button" data-nf-back></button><button class="nf-actions__next" type="button" data-nf-next></button></footer></form></section></div>`);
    updateTrigger();
    document.querySelector("[data-nf-open]").addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      open();
    });
    document.querySelectorAll("[data-nf-close]").forEach(button => button.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      close();
    }));
    document.querySelector("[data-nf-next]").addEventListener("click", () => {
      if (!validate()) return;
      const currentType = runtime.steps[runtime.index].type;
      if (currentType === "summary") {
        submitInquiry();
      } else if (currentType === "category") {
        buildSteps("service");
        render();
      } else {
        move(1);
      }
    });
    document.querySelector("[data-nf-back]").addEventListener("click", () => {
      saveStep();
      move(-1);
    });
    document.querySelector("[data-nf-inquiry]").addEventListener("wheel", event => event.stopPropagation(), { passive: true });
    document.querySelector("[data-nf-inquiry]").addEventListener("touchend", event => event.stopPropagation(), { passive: true });
    document.addEventListener("keydown", event => { if (event.key === "Escape" && runtime.open) close(); });
    const observer = new MutationObserver(updateTrigger);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang", "dir"] });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-language"] });
  }

  window.NazarifarInquiry = { mount, open, config: CONFIG };
  mount();
})();
