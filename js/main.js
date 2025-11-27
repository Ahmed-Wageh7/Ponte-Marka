// -------------------- GLightbox --------------------
const lightbox = GLightbox({
  selector: ".glightbox",
  type: "video",
  source: "local",
  width: "80%",
  autoplayVideos: true,
});

// -------------------- DOMContentLoaded --------------------
document.addEventListener("DOMContentLoaded", () => {
  // --- الفلاتر والوصف الافتراضي (الكاجو) ---
  const filters = document.querySelectorAll(".portfolio-filters li");
  const descriptions = document.querySelectorAll(".portfolio-description");
  const allItems = document.querySelectorAll(".isotope-item");

  // تحديد الفلتر الافتراضي
  const defaultFilter = document.querySelector(
    ".portfolio-filters .filter-cashew"
  );
  if (defaultFilter) defaultFilter.classList.add("filter-active");

  // اخفاء كل الوصفات
  descriptions.forEach((desc) => (desc.style.display = "none"));
  const firstDesc = document.querySelector("#desc-cashew");
  if (firstDesc) firstDesc.style.display = "block";

  // اخفاء كل الصور ماعدا الكاجو
  allItems.forEach((item) => {
    item.style.display = item.classList.contains("filter-cashew")
      ? "block"
      : "none";
  });

  // --- Isotope ---
  const grid = document.querySelector(".isotope-container");
  const iso = new Isotope(grid, {
    itemSelector: ".isotope-item",
    layoutMode: "masonry",
    percentPosition: true,
  });

  // --- التعامل مع الضغط على الفلاتر ---
  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const filterValue = filter.getAttribute("data-filter");

      // إزالة active من الكل واضافة للضغط عليه
      filters.forEach((f) => f.classList.remove("filter-active"));
      filter.classList.add("filter-active");

      // اخفاء كل الوصفات
      descriptions.forEach((desc) => (desc.style.display = "none"));

      // اظهار الوصف المناسب
      if (filterValue === "*") {
        allItems.forEach((item) => (item.style.display = "block"));
      } else {
        const desc = document.querySelector(
          `#desc-${filterValue.replace(".filter-", "")}`
        );
        if (desc) desc.style.display = "block";

        // اظهار الصور المناسبة فقط
        allItems.forEach((item) => {
          item.style.display = item.classList.contains(
            filterValue.replace(".", "")
          )
            ? "block"
            : "none";
        });
      }

      // ترتيب Isotope بعد تغيير الفلاتر
      iso.arrange({ filter: filterValue });
    });
  });

  // -------------------- EmailJS --------------------
  const form = document.querySelector(".php-email-form");
  if (form) {
    emailjs.init("RTNI71vKNe9BQxvi1"); // مفتاحك العام
    const loading = form.querySelector(".loading");
    const error = form.querySelector(".error-message");
    const success = form.querySelector(".sent-message");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      loading.style.display = "block";
      error.style.display = "none";
      success.style.display = "none";

      emailjs
        .sendForm("service_d7hnp1q", "template_adixyjt", form)
        .then(() => {
          loading.style.display = "none";
          success.style.display = "block";
          form.reset();
        })
        .catch((err) => {
          loading.style.display = "none";
          error.style.display = "block";
          error.textContent = "Failed to send message ❌";
          console.error("EmailJS Error:", err);
        });
    });
  }
});

// -------------------- تغيير اللغة --------------------
function changeLang(lang) {
  fetch(`assets/i18n/${lang}.json`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const keyAttr = el.getAttribute("data-i18n");
        let keys, text;
        if (keyAttr.startsWith("[placeholder]")) {
          keys = keyAttr.replace("[placeholder]", "").split(".");
          text = data;
          keys.forEach((k) => (text = text[k]));
          el.setAttribute("placeholder", text);
        } else {
          keys = keyAttr.split(".");
          text = data;
          keys.forEach((k) => (text = text[k]));
          el.innerText = text;
        }
      });
    });
}

// تطبيق اللغة المختارة
function changeLang(lang) {
  fetch(`assets/i18n/${lang}.json`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const keyAttr = el.getAttribute("data-i18n");
        let keys, text;

        if (keyAttr.startsWith("[placeholder]")) {
          keys = keyAttr.replace("[placeholder]", "").split(".");
          text = data;
          keys.forEach((k) => {
            if (text && text[k] !== undefined) text = text[k];
            else text = "";
          });
          el.setAttribute("placeholder", text);
        } else {
          keys = keyAttr.split(".");
          text = data;
          keys.forEach((k) => {
            if (text && text[k] !== undefined) text = text[k];
            else text = "";
          });
          el.innerText = text;
        }
      });
    })
    .catch((err) => console.error("Error loading language JSON:", err));
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".mobile-nav-toggle");
  const nav = document.querySelector(".navmenu");
  const overlay = document.querySelector(".navmenu-overlay");

  toggle.addEventListener("click", () => {
    nav.classList.toggle("mobile-nav-active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    nav.classList.remove("mobile-nav-active");
    overlay.classList.remove("active");
  });
});
