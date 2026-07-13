(() => {
  const root = document.documentElement;

  const syncViewportHeight = () => {
    root.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  syncViewportHeight();
  window.addEventListener("resize", syncViewportHeight, { passive: true });
  window.addEventListener("orientationchange", syncViewportHeight, { passive: true });

  window.addEventListener(
    "load",
    () => {
      const heroImage = document.querySelector(".hero__image");

      if (!heroImage) return;

      heroImage.srcset = heroImage.dataset.srcset || "";
      heroImage.src = heroImage.dataset.src || heroImage.src;
    },
    { once: true },
  );
})();
