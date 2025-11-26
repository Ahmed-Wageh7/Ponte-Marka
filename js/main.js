// document.addEventListener("DOMContentLoaded", () => {
//   const items = document.querySelectorAll(".carousel-item");
//   if (!items.length) return;

//   let currentIndex = 0;
//   items[currentIndex].classList.add("active");

//   function showItem(nextIndex) {
//     if (nextIndex === currentIndex) return;

//     const currentItem = items[currentIndex];
//     const nextItem = items[nextIndex];

//     // اضف active للعنصر الجديد
//     nextItem.classList.add("active");

//     // بعد وقت الـ fade، شيل active من القديم
//     setTimeout(() => {
//       currentItem.classList.remove("active");
//       currentIndex = nextIndex;
//     }, 800); // نفس مدة الـ transition
//   }

//   document
//     .querySelector(".carousel-control-next")
//     ?.addEventListener("click", (e) => {
//       e.preventDefault();
//       const nextIndex = (currentIndex + 1) % items.length;
//       showItem(nextIndex);
//     });

//   document
//     .querySelector(".carousel-control-prev")
//     ?.addEventListener("click", (e) => {
//       e.preventDefault();
//       const prevIndex = (currentIndex - 1 + items.length) % items.length;
//       showItem(prevIndex);
//     });
// });
// GLightbox
const lightbox = GLightbox({
  selector: ".glightbox",
  type: "video",
  source: "local", // فيديو محلي
  width: "80%",
  autoplayVideos: true,
});
var heroCarousel = document.querySelector("#hero-carousel");
var carousel = new bootstrap.Carousel(heroCarousel, {
  interval: 2000,
  wrap: true,
  pause: false,
});
