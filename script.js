// EMAILJS INITIALIZATION
// Set your EmailJS Service ID, Template ID, and Public Key here
// Get these from: https://dashboard.emailjs.com/
const EMAILJS_SERVICE_ID = 'service_6lg7mop'; // Replace with your service ID
const EMAILJS_TEMPLATE_ID = 'template_hclzm4r'; // Replace with your template ID
const EMAILJS_PUBLIC_KEY = '4BddHmDDlVDpObFGZ'; // Replace with your public key

// Initialize EmailJS (this will be called when DOM is ready)
function initEmailJS() {
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS library not loaded! Check CDN connection.');
        showNotification(
            html.getAttribute('data-lang') === 'tr'
                ? 'EmailJS yüklenmedi. İnternet bağlantısını kontrol et.'
                : 'EmailJS failed to load. Check your internet connection.',
            'error'
        );
        return false;
    }
    
    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY,
    });
    console.log('✅ EmailJS initialized');
    return true;
}

// LANGUAGE & THEME TOGGLE
const langToggle = document.getElementById('langToggle');
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Saate göre otomatik tema belirle (19:00 sonrasında dark, 7:00-19:00 arasında light)
function getThemeByTime() {
    const hour = new Date().getHours();
    return hour >= 19 || hour < 7 ? 'dark' : 'light';
}

const savedLang = localStorage.getItem('lang') || 'en';
const initialTheme = getThemeByTime();

html.setAttribute('data-theme', initialTheme);
html.setAttribute('data-lang', savedLang);
updateThemeToggleButton(initialTheme);
updateAllText(savedLang);

// Load title carousel
function loadTitleCarousel() {
    fetch('titlelist.txt')
        .then(response => response.text())
        .then(data => {
            const titles = data.split('\n').filter(line => line.trim()).map(line => line.trim());
            
            // Sort alphabetically
            titles.sort((a, b) => a.localeCompare(b, 'tr'));
            
            // Divide into columns with 7 items each
            const container = document.getElementById('titleCarousel');
            container.innerHTML = '';
            
            const itemsPerColumn = 7;
            const numColumns = Math.ceil(titles.length / itemsPerColumn);
            
            for (let col = 0; col < numColumns; col++) {
                const column = document.createElement('div');
                column.className = 'carousel-column';
                
                for (let row = 0; row < itemsPerColumn; row++) {
                    const index = col * itemsPerColumn + row;
                    if (index < titles.length) {
                        const titleDiv = document.createElement('div');
                        titleDiv.className = 'carousel-title';
                        titleDiv.textContent = titles[index];
                        column.appendChild(titleDiv);
                    }
                }
                
                container.appendChild(column);
            }
        })
        .catch(error => console.error('Titlelist loading error:', error));
}

// Load carousel on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTitleCarousel);
} else {
    loadTitleCarousel();
}

// Tema değiştir
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    updateThemeToggleButton(newTheme);
});

// Dil değiştir
langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const wrapper = document.querySelector('.lang-toggle-wrapper');
    wrapper.classList.toggle('active');
});

// Dil seçeneklerine tıklama
document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', () => {
        const newLang = option.getAttribute('data-lang');
        html.setAttribute('data-lang', newLang);
        localStorage.setItem('lang', newLang);
        updateAllText(newLang);
        
        // Dropdown'u kapat
        const wrapper = document.querySelector('.lang-toggle-wrapper');
        wrapper.classList.remove('active');
    });
});

// Dışarıya tıklandığında dropdown'u kapat
document.addEventListener('click', () => {
    const wrapper = document.querySelector('.lang-toggle-wrapper');
    wrapper.classList.remove('active');
});

function updateThemeToggleButton(theme) {
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.src = theme === 'dark' ? 'light-off.png' : 'light-on.png';
    }
}

// Tüm metinleri dile göre güncelle
function updateAllText(lang) {
    document.querySelectorAll('[data-tr][data-en]:not(.contact-link)').forEach(element => {
        if (lang === 'tr') {
            element.innerHTML = element.getAttribute('data-tr');
        } else {
            element.innerHTML = element.getAttribute('data-en');
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
    const contactLink = document.querySelector('.nav-contact');
    if (contactLink) {
        const text = lang === 'tr' ? 'İletişim' : 'Contact';
        contactLink.setAttribute('aria-label', text);
        contactLink.setAttribute('title', text);
    }
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

// Contact link click handler - works with image elements
document.addEventListener('click', (e) => {
    const contactLink = e.target.closest('.contact-link');
    if (contactLink) {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// FORM HANDLER (Flask Backend)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    const emailjsLoaded = initEmailJS();
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        console.log('✅ Contact form found');
        contactForm.addEventListener('submit', (e) => {
            console.log('📝 Form submit clicked');
            e.preventDefault();
            console.log('✅ preventDefault worked');
            
            // EmailJS check
            if (typeof emailjs === 'undefined') {
                console.error('❌ EmailJS not available');
                showNotification(
                    html.getAttribute('data-lang') === 'tr'
                        ? 'EmailJS yüklenmedi. Sayfayı yenile ve tekrar dene.'
                        : 'EmailJS not loaded. Refresh and try again.',
                    'error'
                );
                submitButton.disabled = false;
                submitButton.textContent = html.getAttribute('data-lang') === 'tr' ? originalTextTr : originalTextEn;
                return;
            }
            
            const submitButton = contactForm.querySelector('.submit-button');
            const originalTextTr = submitButton.getAttribute('data-tr');
            const originalTextEn = submitButton.getAttribute('data-en');
            const currentLang = html.getAttribute('data-lang');
            
            submitButton.disabled = true;
            submitButton.textContent = currentLang === 'tr' ? 'Gönderiliyor...' : 'Sending...';
            
            // Form verilerini EmailJS'e uygun şekilde hazırla
            const templateParams = {
                from_name: document.getElementById('contactName').value,
                from_email: document.getElementById('contactEmail').value,
                message: document.getElementById('contactMessage').value,
                reply_to: document.getElementById('contactEmail').value
            };
            
            // EmailJS ile gönder
            try {
                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                    .then(function(response) {
                        console.log('Email sent successfully', response.status, response.text);
                        // Form'u fade out ve success mesajını fade in
                        contactForm.classList.add('hidden');
                        const successMessage = document.getElementById('successMessage');
                        successMessage.classList.add('show');
                        // Dil ayarlarını uygula
                        const currentLang = html.getAttribute('data-lang');
                        updateAllText(currentLang);
                        submitButton.disabled = false;
                    })
                    .catch(function(error) {
                        console.error('Error:', error);
                        showNotification(
                            html.getAttribute('data-lang') === 'tr' 
                                ? 'Email gönderilirken hata oluştu. Lütfen tekrar deneyin.' 
                                : 'Failed to send email. Please try again.',
                            'error'
                        );
                        submitButton.disabled = false;
                        submitButton.textContent = html.getAttribute('data-lang') === 'tr' ? originalTextTr : originalTextEn;
                    });
            } catch(error) {
                console.error('Submit error:', error);
                showNotification(
                    html.getAttribute('data-lang') === 'tr' 
                        ? 'Bir hata oluştu. Lütfen tekrar deneyin.' 
                        : 'An error occurred. Please try again.',
                    'error'
                );
                submitButton.disabled = false;
                submitButton.textContent = html.getAttribute('data-lang') === 'tr' ? originalTextTr : originalTextEn;
            }
        });
    }
    
    // Back to home button
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', () => {
            // Form'u fade in ve success mesajını fade out
            const contactForm = document.getElementById('contactForm');
            const successMessage = document.getElementById('successMessage');
            contactForm.classList.remove('hidden');
            successMessage.classList.remove('show');
            // Form'u temizle
            contactForm.reset();
            // Placeholder'ları güncelle
            const currentLang = html.getAttribute('data-lang');
            updateAllText(currentLang);
        });
    }
    
    console.log('Portfolio sitesi başarıyla yüklendi!');
});

function showNotification(message, type) {
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.textContent = message;
    notif.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease-in;
        max-width: 300px;
        font-size: 14px;
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

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
