const translations = {
    pt: {
        "nav-home": "Início",
        "nav-projects": "Projetos",
        "nav-experience": "Experiência",
        "nav-contact": "Contato",

        "hero-title": "Olá!",
        "hero-description": "Sou graduando em Ciência da Computação pela Universidade Católica de Santos, onde estou no 4º semestre, e tenho muita paixão em tecnologia. Estou dedicado a criar experiências digitais modernas, intuitivas e de alto impacto.",
        "hero-cta": "Ver Experiência",

        "experience-title": "Experiência",
        "exp1-title": "Staff na BxSec",
        "exp1-period": "Agosto 2025",
        "exp1-desc": "Atuei como voluntário no evento BxSec, o maior evento de cibersegurança da Baixada Santista.",
        "exp1-skill1": "Trabalho em Equipe",
        "exp1-skill2": "Comunicação",
        "exp1-skill3": "Adaptabilidade",
        "exp1-skill4": "Engajamento de pessoas",

        "projects-title": "Projetos",
        "project-portfolio-title": "Portfólio",
        "project-portfolio-desc": "É o site que você está vendo, meu projeto atual. Foi desenvolvido com HTML, CSS e JavaScript, com foco em design moderno e animações suaves de scroll.<br><br>Sujeito a constantes melhorias.",

        "contact-title": "Entre em Contato",
        "contact-description": "Se gostou do meu trabalho, ou gostaria de conversar, fique à vontade para me chamar.",
        "contact-cta": "Enviar e-mail",

        "footer-text-prefix": "© 2025 - Feito por "
    },

    en: {
        "nav-home": "Home",
        "nav-projects": "Projects",
        "nav-experience": "Experience",
        "nav-contact": "Contact",

        "hero-title": "Hi!",
        "hero-description": "I'm a Computer Science student at Universidade Católica de Santos, currently in my 4th semester, and I'm really passionate about technology. I love creating modern, intuitive, and high-impact digital experiences.",
        "hero-cta": "View Experience",

        "experience-title": "Experience",
        "exp1-title": "BxSec Volunteer Staff",
        "exp1-period": "August 2025",
        "exp1-desc": "Worked as a volunteer staff member at BxSec, the largest cybersecurity event in the Baixada Santista region.",
        "exp1-skill1": "Teamwork",
        "exp1-skill2": "Communication",
        "exp1-skill3": "Adaptability",
        "exp1-skill4": "People engagement",

        "projects-title": "Projects",
        "project-portfolio-title": "Portfolio",
        "project-portfolio-desc": "It's the website you are visiting, my current project. Built with HTML, CSS, and JavaScript, focusing on modern design and smooth scroll animations.<br><br>It's going to be continuously improved.",

        "contact-title": "Get in Touch",
        "contact-description": "If you liked my work or would like to talk, feel free to reach out.",
        "contact-cta": "Send email",

        "footer-text-prefix": "© 2025 - Made by "
    }
};

let currentLang = localStorage.getItem("preferred-lang") || "pt";
let currentTheme = localStorage.getItem("preferred-theme") || "dark";

function setTheme(theme) {
    currentTheme = theme;
    document.body.dataset.theme = theme;
    localStorage.setItem("preferred-theme", theme);

    const icon = document.querySelector("#themeToggle i");
    icon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";

    const projectImage = document.getElementById("projeto-img");
    if (projectImage) {
        projectImage.src = theme === "dark"
            ? "black-projeto.jpg"
            : "white-projeto.jpg";
    }
}

function toggleTheme() {
    setTheme(currentTheme === "dark" ? "light" : "dark");
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("preferred-lang", lang);

    document.documentElement.lang = lang === "pt" ? "pt-br" : "en";

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    document.getElementById("langText").textContent = lang === "pt" ? "EN" : "PT";
    document.getElementById("langToggle").title = lang === "pt"
        ? "Change language"
        : "Mudar idioma";
}

function toggleLanguage() {
    setLanguage(currentLang === "pt" ? "en" : "pt");
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".animate").forEach(el => observer.observe(el));

window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    header.classList.toggle("shrink", window.scrollY > 50);
});

document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

const navbarToggle = document.getElementById("navbarToggle");
const navbarNav = document.getElementById("navbarNav");

if (navbarToggle && navbarNav) {
    navbarToggle.addEventListener("click", () => {
        navbarNav.classList.toggle("show");
        navbarToggle.classList.toggle("active");
    });

    document.querySelectorAll(".mobile-nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navbarNav.classList.remove("show");
            navbarToggle.classList.remove("active");
        });
    });

    document.addEventListener("click", (e) => {
        const clickInside = navbarNav.contains(e.target) || navbarToggle.contains(e.target);
        if (!clickInside && navbarNav.classList.contains("show")) {
            navbarNav.classList.remove("show");
            navbarToggle.classList.remove("active");
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            navbarNav.classList.remove("show");
            navbarToggle.classList.remove("active");
        }
    });
}

function initializeGallery() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const modalClose = document.querySelector(".modal-close");

    document.querySelectorAll(".thumbnail").forEach(thumb => {
        thumb.addEventListener("click", function () {
            const expId = this.dataset.exp;
            const img = this.dataset.img;

            document.querySelectorAll(`.thumbnail[data-exp="${expId}"]`)
                .forEach(t => t.classList.remove("active"));

            this.classList.add("active");

            const main = document.querySelector(`.main-image[data-exp="${expId}"]`);
            main.src = img;
        });
    });

    document.querySelectorAll(".main-image-wrapper").forEach(wrapper => {
        wrapper.addEventListener("click", () => {
            modal.classList.add("show");
            modalImg.src = wrapper.querySelector(".main-image").src;
            document.body.style.overflow = "hidden";
        });
    });

    function closeModal() {
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    modalClose?.addEventListener("click", closeModal);

    modal.addEventListener("click", e => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setTheme(currentTheme);
    setLanguage(currentLang);
    initializeGallery();

    console.log("🌐 Language:", currentLang.toUpperCase());
    console.log("🌓 Theme:", currentTheme);
    console.log("✨ Portfolio loaded successfully.");
});

document.getElementById("themeToggle")?.addEventListener("click", toggleTheme);
document.getElementById("langToggle")?.addEventListener("click", toggleLanguage);