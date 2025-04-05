new Swiper(".product-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: { delay: 7500, disableOnInteraction: false },
  centeredSlides: true,
  breakpoints: { 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1020: { slidesPerView: 3 } },
});

new Swiper(".review-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: { delay: 1000, disableOnInteraction: false },
  centeredSlides: true,
  breakpoints: { 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1020: { slidesPerView: 3 } },
});

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");
const baseColor = "#90EE90";

const generateShades = (color, steps) => {
  const lightenDarken = (col, amt) => {
    let num = parseInt(col.slice(1), 16);
    let r = (num >> 16) + amt;
    let g = ((num >> 8) & 0x00ff) + amt;
    let b = (num & 0x0000ff) + amt;
    r = Math.max(Math.min(255, r), 0);
    g = Math.max(Math.min(255, g), 0);
    b = Math.max(Math.min(255, b), 0);
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  };
  return Array.from({ length: steps }, (_, i) => lightenDarken(color, Math.floor((i - steps / 2) * 10)));
};

const colors = generateShades(baseColor, circles.length);

circles.forEach((circle, index) => {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", (e) => {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

const animateCircles = () => {
  let x = coords.x;
  let y = coords.y;
  circles.forEach((circle, index) => {
    circle.style.left = `${x - 12}px`;
    circle.style.top = `${y - 12}px`;
    circle.style.scale = (circles.length - index) / circles.length;
    circle.x = x;
    circle.y = y;
    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.5;
    y += (nextCircle.y - y) * 0.5;
  });
  requestAnimationFrame(animateCircles);
};

animateCircles();

const goToProfile = () => (window.location.href = "https://aryanrath123.github.io/farm_profile/");