const scenes = [
  {
    id: "holding",
    label: "Holding",
    image: "holding.jpg",
  },
  {
    id: "architecture",
    label: "Architecture",
    image: "hero-architecture.jpg",
  },
  {
    id: "supply",
    label: "Supply",
    image: "supply.jpg",
  },
  {
    id: "services",
    label: "Services",
    image: "services.jpg",
  },
  {
    id: "custom-machines",
    label: "Custom Machines",
    image: null,
  },
  {
    id: "about",
    label: "About",
    image: "about.jpg",
  },
  {
    id: "contact",
    label: "Contact",
    image: "contact.jpg",
  },
];

const image = document.querySelector("#scene-image");
const loading = document.querySelector(".loading");
const status = document.querySelector(".status");
const controls = [...document.querySelectorAll("[data-scene]")];

let currentIndex = 0;
let changing = false;
let touchStartY = 0;

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

function preloadScenes() {
  scenes.forEach((scene) => {
    if (!scene.image) return;
    const preload = new Image();
    preload.src = scene.image;
  });
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

async function showScene(index, { initial = false } = {}) {
  if (changing && !initial) return;

  const nextIndex = Math.max(0, Math.min(index, scenes.length - 1));
  const scene = scenes[nextIndex];

  if (!initial && nextIndex === currentIndex) return;

  changing = true;
  loading.classList.add("is-active");

  if (!initial) {
    image.classList.remove("is-visible");
    await wait(650);
  }

  currentIndex = nextIndex;
  updateControls(scene);
  status.textContent = scene.label;
  history.replaceState(null, "", `#${scene.id}`);

  if (!scene.image) {
    image.removeAttribute("src");
    image.classList.remove("is-visible");
    loading.classList.remove("is-active");
    changing = false;
    return;
  }

  try {
    await loadImage(scene.image);
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

const initialId = location.hash.slice(1);
showScene(sceneIndex(initialId), { initial: true });
preloadScenes();
