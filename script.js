const translations = {
    pt: {
        "nav-home": "Início",
        "nav-projects": "Projetos",
        "nav-experience": "Experiência",
        "nav-contact": "Contato",
        "hero-title": "Olá, eu sou o Felipe!",
        "hero-description": "Sou graduando em Ciência da Computação pela Universidade Católica de Santos, onde estou no 4º semestre, e tenho muita paixão em tecnologia. Apaixonado por criar experiências digitais modernas, intuitivas e de alto impacto.",
        "hero-cta": "Ver Experiência",
        "projects-title": "Projetos",
        "project-portfolio-title": "Portfólio",
        "project-portfolio-desc": "Este é o site que você está vendo, meu projeto atual. Foi desenvolvido com HTML, CSS e JavaScript, com foco em design moderno e animações suaves de scroll.<br><br>Sujeito a constantes melhorias.",
        "experience-title": "Experiência",
        "exp1-title": "Staff na BxSec",
        "exp1-period": "Agosto 2025",
        "exp1-desc": "Atuei como voluntário no evento BxSec, o maior evento de cibersegurança da Baixada Santista.",
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
        "hero-title": "Hi, I'm Felipe!",
        "hero-description": "I'm a Computer Science student at UNISANTOS, currently in my 4th semester, and I'm really passionate about technology. I love creating modern, intuitive, and high-impact digital experiences.",
        "hero-cta": "View Experience",
        "projects-title": "Projects",
        "project-portfolio-title": "Portfolio",
        "project-portfolio-desc": "It's the website you are visiting, my current project. Built with HTML, CSS, and JavaScript, focusing on modern design and smooth scroll animations.<br><br>It's going to be continuously improved.",
        "experience-title": "Experience",
        "exp1-title": "BxSec Volunteer Staff",
        "exp1-period": "August 2025",
        "exp1-desc": "Worked as a volunteer staff member at BxSec, the largest cybersecurity event in the Baixada Santista region.",
        "contact-title": "Get in Touch",
        "contact-description": "If you liked my work or would like to talk, feel free to reach out.",
        "contact-cta": "Send email",
        "footer-text-prefix": "© 2025 - Made by "
    }
};

let currentLang = localStorage.getItem('preferred-lang') || 'pt';
let currentTheme = localStorage.getItem('preferred-theme') || 'dark';

function setTheme(theme) {
    currentTheme = theme;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('preferred-theme', theme);
    
    const themeIcon = document.querySelector('#themeToggle i');

    if (theme === 'dark') {
        themeIcon.className = 'bi bi-sun-fill';
    } else {
        themeIcon.className = 'bi bi-moon-stars-fill';
    }

    const projetoImg = document.getElementById('projeto-img');

    if (projetoImg) {
        if (theme === 'dark') {
            projetoImg.src = 'black-projeto.jpg';
        } else {
            projetoImg.src = 'white-projeto.jpg';
        }
    }
}

function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'pt' ? 'pt-br' : 'en';
    localStorage.setItem('preferred-lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    document.getElementById('langText').textContent = lang === 'pt' ? 'EN' : 'PT';
    
    const langButton = document.getElementById('langToggle');
    langButton.title = lang === 'pt' ? 'Change language' : 'Mudar idioma';
}

function toggleLanguage() {
    const newLang = currentLang === 'pt' ? 'en' : 'pt';
    setLanguage(newLang);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.animate').forEach((el) => observer.observe(el));

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});

document.querySelector(".brand").addEventListener("click", () => {
    document.querySelector("#hero").scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('langToggle').addEventListener('click', toggleLanguage);

const navbarToggle = document.getElementById('navbarToggle');
const navbarNav = document.getElementById('navbarNav');

if (navbarToggle && navbarNav) {
    navbarToggle.addEventListener('click', () => {
        navbarNav.classList.toggle('show');
        navbarToggle.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbarNav.classList.remove('show');
            navbarToggle.classList.remove('active');
        });
    });

    document.querySelector('.brand').addEventListener('click', () => {
        if (navbarNav.classList.contains('show')) {
            navbarNav.classList.remove('show');
            navbarToggle.classList.remove('active');
        }
    });

    document.addEventListener('click', (e) => {
        const isClickInsideMenu = navbarNav.contains(e.target);
        const isClickOnToggle = navbarToggle.contains(e.target);
        const isClickOnBrand = document.querySelector('.brand-wrapper').contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && !isClickOnBrand && navbarNav.classList.contains('show')) {
            navbarNav.classList.remove('show');
            navbarToggle.classList.remove('active');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && navbarNav.classList.contains('show')) {
            navbarNav.classList.remove('show');
            navbarToggle.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setTheme(currentTheme);
    setLanguage(currentLang);
    
    initializeGallery();
    
    console.log('🎨 Portfólio carregado com sucesso!');
    console.log(`📋 Idioma: ${currentLang.toUpperCase()}`);
    console.log(`🌓 Tema: ${currentTheme}`);
});

function initializeGallery() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');
    
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', function() {
            const expId = this.getAttribute('data-exp');
            const imgSrc = this.getAttribute('data-img');

            document.querySelectorAll(`.thumbnail[data-exp="${expId}"]`).forEach(t => {
                t.classList.remove('active');
            });

            this.classList.add('active');
            
            const mainImage = document.querySelector(`.main-image[data-exp="${expId}"]`);
            mainImage.src = imgSrc;
        });
    });
    
    document.querySelectorAll('.main-image-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', function() {
            const img = this.querySelector('.main-image');
            modal.classList.add('show');
            modalImg.src = img.src;
            document.body.style.overflow = 'hidden';
        });
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}