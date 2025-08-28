const scene = document.getElementById("scene");
const sparkleContainer = document.getElementById("sparkles");
const sound = document.getElementById("sound");

// ==== LẤY THỜI GIAN LƯU TRƯỚC ĐÓ ====
let savedTime = localStorage.getItem("musicTime");

if (savedTime !== null) {
  savedTime = parseFloat(savedTime);
  sound.currentTime = savedTime;
}


// Thử phát nhạc
function tryPlayMusic() {
  sound.play().then(() => {
    console.log("🎵 Tự động phát nhạc thành công.");
  }).catch(() => {
    console.warn("🎵 Tự động phát nhạc bị chặn, chờ người dùng tương tác...");
    waitForUserInteraction();
  });
}

// Đợi người dùng click/chạm
function waitForUserInteraction() {
  const playOnce = () => {
    sound.currentTime = savedTime;
    sound.play().then(() => {
      console.log("🎵 Đã phát nhạc sau khi người dùng tương tác.");
    }).catch(err => {
      console.warn("Không thể phát nhạc:", err);
    });
    document.removeEventListener("click", playOnce);
    document.removeEventListener("touchstart", playOnce);
  };
  document.addEventListener("click", playOnce);
  document.addEventListener("touchstart", playOnce);
}

// Gọi khi load trang
window.addEventListener("load", () => {
  tryPlayMusic();
  waitForUserInteraction();
});
  document.addEventListener("click", waitForUserInteraction());
  document.addEventListener("touchstart", waitForUserInteraction());

// ==== DANH SÁCH TEXT & ICON RƠI ====
const texts = [
  "Chúc mừng sinh nhật 🎉", 
  "Happy Birthday 🎂", 
  "20 - 09", 
  "Ngọc Trâm", 
  "Chúc Mừng Sinh Nhật Ngọc Trâm 🥳", 
  "Chụp ảnh đẹp từ mọi góc cạnh 📸", 
  "Luôn cười thật tươi nhé 😊", 
  "Mọi điều ước thành hiện thật🍀", 
  "Thu hút nhiều năng lượng tích cực❤️",
  "Rực rỡ như hào quang của nhân vật chính✨"
];
const icons = ["🎂", "🎉", "💖", "🌟", "💐", "🎁", "✨", "💝"];

function createFallingText() {
  const text = document.createElement("div");
  text.className = "falling-text";
  text.textContent = texts[Math.floor(Math.random() * texts.length)];
  text.style.left = `${Math.random() * window.innerWidth}px`;
  text.style.transform = `translateZ(${(Math.random() - 0.5) * 300}px)`;
  scene.appendChild(text);
  setTimeout(() => text.remove(), 6000);
}

function createFallingIcon() {
  const icon = document.createElement("div");
  icon.className = "falling-icon";
  icon.textContent = icons[Math.floor(Math.random() * icons.length)];
  icon.style.left = `${Math.random() * window.innerWidth}px`;
  icon.style.transform = `translateZ(${(Math.random() - 0.5) * 300}px)`;
  scene.appendChild(icon);
  setTimeout(() => icon.remove(), 6000);
}

setInterval(() => {
  if (scene.childElementCount < 40) {
    createFallingText();
    createFallingIcon();
  }
}, 300);

// ==== XOAY SCENE KHI KÉO ====
let isDragging = false;
let lastTouch = { x: 0, y: 0 };
let lastMove = 0;

document.addEventListener("mousedown", () => {
  isDragging = true;
  document.body.style.cursor = "grabbing";
});
document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.cursor = "grab";
});
document.addEventListener("mouseleave", () => {
  isDragging = false;
  document.body.style.cursor = "grab";
});
document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (!isDragging || now - lastMove < 30) return;
  lastMove = now;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const rotateY = (e.clientX - centerX) * 0.15;
  const rotateX = -(e.clientY - centerY) * 0.15;
  scene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
document.addEventListener("touchstart", (e) => {
  waitForUserInteraction()
  isDragging = true;
  lastTouch.x = e.touches[0].clientX;
  lastTouch.y = e.touches[0].clientY;
}, { passive: false });
document.addEventListener("touchend", () => {
  waitForUserInteraction()
  isDragging = false;
});
document.addEventListener("touchmove", (e) => {
  waitForUserInteraction()
  const now = Date.now();
  if (!isDragging || now - lastMove < 30) return;
  lastMove = now;
  const touch = e.touches[0];
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const rotateY = (touch.clientX - centerX) * 0.15;
  const rotateX = -(touch.clientY - centerY) * 0.15;
  scene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}, { passive: false });

// ==== HIỆU ỨNG SPARKLES ====
function createSparkles(count = 40) {
  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.top = `${Math.random() * 95}%`;
    s.style.left = `${Math.random() * 95}%`;
    s.style.animationDuration = `${3 + Math.random() * 3}s`;
    s.style.animationDelay = `${Math.random() * 4}s`;
    sparkleContainer.appendChild(s);
  }
}
createSparkles(40);