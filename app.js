// Náttúrugáttin — scrollytelling controller

(function () {
  const steps = Array.from(document.querySelectorAll(".step"));
  const shots = Array.from(document.querySelectorAll(".shot"));
  const captionNum = document.getElementById("captionNum");
  const captionTitle = document.getElementById("captionTitle");
  const progressFill = document.getElementById("progressFill");

  let activeIndex = 0;

  function setActive(index) {
    if (index === activeIndex && steps[index].classList.contains("is-active")) return;
    activeIndex = index;

    shots.forEach((img, i) => img.classList.toggle("is-active", i === index));
    steps.forEach((step, i) => step.classList.toggle("is-active", i === index));

    captionNum.textContent = String(index + 1).padStart(2, "0");
    captionTitle.textContent = steps[index].querySelector(".step-title").textContent;
  }

  // A step becomes active when it crosses the middle band of the viewport.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(Number(entry.target.dataset.index));
        }
      });
    },
    { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
  );
  steps.forEach((step) => observer.observe(step));

  // Top progress bar tracks overall page scroll.
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    progressFill.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  setActive(0);
  updateProgress();
})();
