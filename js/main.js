// -------------------- GLightbox --------------------
// للـ فيديو
const lightboxVideo = GLightbox({
  selector: ".glightbox-video",
  type: "video",
  source: "local",
  width: "80%",
  autoplayVideos: true,
});

// للصور
const lightboxImages = GLightbox({
  selector: ".glightbox-images",
});

// -------------------- DOMContentLoaded --------------------
document.addEventListener("DOMContentLoaded", () => {
  // ------------------ Portfolio Filters ------------------
  const filters = document.querySelectorAll(".portfolio-filters li");
  const descriptions = document.querySelectorAll(".portfolio-description");
  const allGroups = document.querySelectorAll(".portfolio-group");
  const allItems = document.querySelectorAll(".isotope-item");

  // Hide everything initially
  allItems.forEach((item) => (item.style.display = "none"));
  allGroups.forEach((group) => (group.style.display = "none"));
  descriptions.forEach((desc) => (desc.style.display = "none"));

  // Show default Cashew
  const defaultFilter = document.querySelector(".filter-cashew");
  if (defaultFilter) defaultFilter.classList.add("filter-active");

  const firstGroup = document.querySelector(".portfolio-group.filter-cashew");
  if (firstGroup) firstGroup.style.display = "flex";

  const firstDesc = document.querySelector("#desc-cashew");
  if (firstDesc) firstDesc.style.display = "block";

  document.querySelectorAll(".isotope-item.filter-cashew").forEach((item) => {
    item.style.display = "block";
  });

  const iso = new Isotope(".isotope-container", {
    itemSelector: ".isotope-item",
    layoutMode: "masonry",
    filter: ".filter-cashew",
  });

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const filterValue = filter
        .getAttribute("data-filter")
        .replace(".filter-", "");
      filters.forEach((f) => f.classList.remove("filter-active"));
      filter.classList.add("filter-active");

      allItems.forEach((item) => (item.style.display = "none"));
      descriptions.forEach((desc) => (desc.style.display = "none"));
      allGroups.forEach((group) => (group.style.display = "none"));

      if (filterValue === "*") {
        document.querySelectorAll(".first-three").forEach((item) => {
          item.style.display = "block";
        });
        iso.arrange({ filter: "*" });
      } else {
        const desc = document.querySelector(`#desc-${filterValue}`);
        if (desc) desc.style.display = "block";

        const activeGroup = document.querySelector(
          `.portfolio-group.filter-${filterValue}`
        );
        if (activeGroup) activeGroup.style.display = "flex";

        document
          .querySelectorAll(`.isotope-item.filter-${filterValue}`)
          .forEach((item) => {
            item.style.display = "block";
          });

        iso.arrange({ filter: `.filter-${filterValue}` });
      }
    });
  });

  // ------------------ Read More Buttons ------------------
  const readMoreIds = ["Cashew", "Cloves", "Beans", "BlackPepper", "Cardamom"];
  readMoreIds.forEach((id) => {
    const btn = document.getElementById(`readMore${id}`);
    if (btn) {
      btn.addEventListener("click", () => {
        setTimeout(() => {
          const filterBtn = document.querySelector(
            `.portfolio-filters li[data-filter=".filter-${id.toLowerCase()}"]`
          );
          if (filterBtn) filterBtn.click();
        }, 400);
      });
    }
  });

  // ------------------ Language Dropdown Fix ------------------
  const langDropdown = document.querySelector(".language-dropdown");
  if (langDropdown) {
    langDropdown.classList.remove("show");

    langDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle("show");
    });

    document.addEventListener("click", () => {
      langDropdown.classList.remove("show");
    });
  }

  // ------------------ Load saved language ------------------
  const savedLang = localStorage.getItem("selectedLang") || "en";
  changeLang(savedLang);
});

// -------------------- تغيير اللغة + القائمة --------------------
function changeLang(lang) {
  localStorage.setItem("selectedLang", lang); // تخزين اللغة

  // تغيير اتجاه الصفحة
  if (lang === "ar") {
    document.documentElement.setAttribute("dir", "rtl");
    document.body.classList.add("rtl");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
    document.body.classList.remove("rtl");
  }

  // تحميل نصوص اللغة
  fetch(`assets/i18n/${lang}.json`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const keyAttr = el.getAttribute("data-i18n");
        let keys, text;

        if (keyAttr.startsWith("[placeholder]")) {
          keys = keyAttr.replace("[placeholder]", "").split(".");
          text = data;
          keys.forEach((k) => (text = text?.[k] ?? ""));
          el.setAttribute("placeholder", text);
        } else {
          keys = keyAttr.split(".");
          text = data;
          keys.forEach((k) => (text = text?.[k] ?? ""));
          el.innerText = text;
        }
      });
    })
    .catch((err) => console.error("Error loading language JSON:", err));
}

// -------------------- Navbar Active --------------------
const navLinks = document.querySelectorAll('.navmenu a[href^="#"]');
const sections = Array.from(navLinks)
  .map((link) => {
    const id = link.getAttribute("href").substring(1);
    return document.getElementById(id);
  })
  .filter((sec) => sec !== null);

const observerOptions = {
  root: null,
  rootMargin: "-100px 0px 0px 0px",
  threshold: 0.2,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        if (!link.closest(".portfolio-filters")) {
          link.classList.remove("active");
        }
      });
      const id = entry.target.id;
      const activeLink = document.querySelector(`.navmenu a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

document.getElementById("current-year").textContent = new Date().getFullYear();

// -------------------- GLightbox إضافي --------------------
const lightbox2 = GLightbox({ selector: ".glightbox" });

const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const navMenu = document.querySelector("#navmenu");

mobileNavToggle.addEventListener("click", () => {
  document.body.classList.toggle("mobile-nav-active");
  mobileNavToggle.classList.toggle("bi-list");
  mobileNavToggle.classList.toggle("bi-x");
});

document.querySelectorAll("#navmenu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("mobile-nav-active");
    mobileNavToggle.classList.add("bi-list");
    mobileNavToggle.classList.remove("bi-x");
  });
});
