// LANGUAGE & THEME TOGGLE
const langToggle = document.getElementById('langToggle');
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Saate göre otomatik tema belirle (19:00 sonrasında dark, 7:00-19:00 arasında light)
function getThemeByTime() {
    const hour = new Date().getHours();
    return hour >= 19 || hour < 7 ? 'dark' : 'light';
}

const savedLang = localStorage.getItem('lang') || 'tr';
const initialTheme = getThemeByTime();

html.setAttribute('data-theme', initialTheme);
html.setAttribute('data-lang', savedLang);
updateThemeToggleButton(initialTheme);
updateLangToggleButton(savedLang);

// Tema değiştir
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    updateThemeToggleButton(newTheme);
});

// Dil değiştir
langToggle.addEventListener('click', () => {
    const currentLang = html.getAttribute('data-lang');
    const newLang = currentLang === 'tr' ? 'en' : 'tr';
    
    html.setAttribute('data-lang', newLang);
    localStorage.setItem('lang', newLang);
    updateLangToggleButton(newLang);
    updateAllText(newLang);
});

function updateThemeToggleButton(theme) {
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.src = theme === 'dark' ? 'light-off.png' : 'light-on.png';
    }
}

function updateLangToggleButton(lang) {
    langToggle.textContent = lang === 'tr' ? 'EN' : 'TR';
}

// Tüm metinleri dile göre güncelle
function updateAllText(lang) {
    document.querySelectorAll('[data-tr][data-en]').forEach(element => {
        if (lang === 'tr') {
            element.textContent = element.getAttribute('data-tr');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
    
    // Placeholder'ları güncelle
    document.querySelectorAll('[data-tr-placeholder][data-en-placeholder]').forEach(element => {
        if (lang === 'tr') {
            element.placeholder = element.getAttribute('data-tr-placeholder');
        } else {
            element.placeholder = element.getAttribute('data-en-placeholder');
        }
    });
    
    // Nav linklerini güncelle
    updateNavLinks(lang);
}

function updateNavLinks(lang) {
    const navTexts = {
        tr: {
            'nav-contact': 'İletişim'
        },
        en: {
            'nav-contact': 'Contact'
        }
    };
    
    Object.keys(navTexts[lang]).forEach(key => {
        const element = document.querySelector(`.${key}`);
        if (element) {
            element.textContent = navTexts[lang][key];
        }
    });
}

// SCROLL FADE ANIMATIONS
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // İsteğe bağlı olarak bir daha izlemeyi kapat
            // observer.unobserve(entry.target);
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// Tüm scroll-fade elementlerini izle
document.querySelectorAll('.scroll-fade').forEach(element => {
    observer.observe(element);
});

// NAVBAR SCROLL EFFECT
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop;
});

// PARALLAX EFFECT
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        let scrollPosition = window.pageYOffset;
        element.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    });
});

// SMOOTH SCROLL FOR NAVIGATION LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// SCROLL POSITION ANIMATION
const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.scroll-fade');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Sayfa yüklendiğinde bir kez çalıştır

// CURSOR EFFECT (İsteğe bağlı - Modern tarayıcılar için)
document.addEventListener('DOMContentLoaded', () => {
    // CSS animasyonları zaten çalışıyor, ek JavaScript zorunlu değil
    console.log('Portfolio sitesi başarıyla yüklendi!');
});

// MOUSE MOVE EFFECT (Bonus: İmleç hareketine göre glow efekti)
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Isteğe bağlı: Burada custom cursor efektleri ekleyebilirsiniz
});

// SCROLL PROGRESS BAR (Bonus: Sayfa scroll oranını gösteren bar)
const scrollProgressBar = () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.pageYOffset;
    const scrollPercent = (scrolled / windowHeight) * 100;
    
    // Eğer bir progress bar element'i varsa burada güncellenebilir
};

window.addEventListener('scroll', scrollProgressBar);
