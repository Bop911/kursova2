// ======================
// BURGER MENU
// ======================
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

if (burger) {
    burger.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

// ======================
// MODAL WINDOW
// ======================
const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

if (openModal) {
    openModal.addEventListener("click", () => {
        modal.classList.add("active");
    });
}

if (closeModal) {
    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
    });
}

// Miss Click
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("active");
    }
});

// ======================
// SCROLL HEADER WITH TEXT COLOR FIX
// ======================
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    const isDark = document.body.classList.contains("dark-theme");
    const links = document.querySelectorAll(".header .nav a, .header .logo");
    const burgerLines = document.querySelectorAll(".burger span");

    if (window.scrollY > 50) {
        header.style.transition = "0.3s";
        
        if (isDark) {
            header.style.background = "#1e1e1e";
            links.forEach(link => link.style.color = "#ffffff");
            burgerLines.forEach(line => line.style.background = "#ffffff");
        } else {
            header.style.background = "#0099ff";
            links.forEach(link => link.style.color = "#ffffff"); // Текст стає білим на синьому фоні
            burgerLines.forEach(line => line.style.background = "#ffffff");
        }
    } else {
        header.style.background = isDark ? "#1e1e1e" : "#ffffff";
        links.forEach(link => {
            // Повертаємо початкові кольори, коли скрол вгорі
            if (isDark) {
                link.style.color = "#ffffff";
            } else {
                // Якщо це активне посилання (наприклад, Тури чи Про Нас), залишаємо його синім, інші - темними
                link.style.color = link.classList.contains("active") ? "#0099ff" : "#222222";
            }
        });
        
        burgerLines.forEach(line => {
            line.style.background = isDark ? "#ffffff" : "#222222";
        });
    }
});

// ======================
// BUTTON TO TOP
// ======================
const topBtn = document.createElement("button");
topBtn.innerHTML = "↑";
topBtn.style.position = "fixed";
topBtn.style.bottom = "20px";
topBtn.style.right = "20px";
topBtn.style.width = "50px";
topBtn.style.height = "50px";
topBtn.style.borderRadius = "50%";
topBtn.style.border = "none";
topBtn.style.background = "#0099ff";
topBtn.style.color = "white";
topBtn.style.fontSize = "22px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.zIndex = "999";
topBtn.style.transition = "transform 0.2s ease";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

topBtn.addEventListener("mouseenter", () => { topBtn.style.transform = "scale(1.1)"; });
topBtn.addEventListener("mouseleave", () => { topBtn.style.transform = "scale(1)"; });

// ======================
// DARK THEME
// ======================
const themeBtn = document.createElement("button");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeBtn.innerHTML = "☀️";
} else {
    themeBtn.innerHTML = "🌙";
}

themeBtn.style.position = "fixed";
themeBtn.style.bottom = "80px";
themeBtn.style.right = "20px";
themeBtn.style.width = "50px";
themeBtn.style.height = "50px";
themeBtn.style.borderRadius = "50%";
themeBtn.style.cursor = "pointer";
themeBtn.style.fontSize = "20px";
themeBtn.style.zIndex = "999";
themeBtn.style.transition = "transform 0.2s ease";

// Початкова стилізація кнопки залежно від теми
const updateThemeButtonStyles = () => {
    const isDark = document.body.classList.contains("dark-theme");
    themeBtn.style.background = isDark ? "#333" : "#fff";
    themeBtn.style.color = isDark ? "#fff" : "#222";
    themeBtn.style.border = isDark ? "1px solid #fff" : "1px solid #222";
};
updateThemeButtonStyles();

document.body.appendChild(themeBtn);

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    
    if (isDark) {
        themeBtn.innerHTML = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeBtn.innerHTML = "🌙";
        localStorage.setItem("theme", "light");
    }
    
    updateThemeButtonStyles();
    // Штучно викликаємо подію скролу, щоб шапка миттєво оновила свій колір під нову тему
    window.dispatchEvent(new Event('scroll'));
});

themeBtn.addEventListener("mouseenter", () => { themeBtn.style.transform = "scale(1.1)"; });
themeBtn.addEventListener("mouseleave", () => { themeBtn.style.transform = "scale(1)"; });

// ======================
// SIMPLE ANIMATION
// ======================
const cards = document.querySelectorAll(
    ".adv-card, .tour-card, .stat, .service-card, .features-text, .features-image-box"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "0.6s cubic-bezier(0.25, 0.8, 0.25, 1)";
    observer.observe(card);
});