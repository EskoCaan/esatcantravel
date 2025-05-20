// Menü açma/kapama fonksiyonu
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    const hamburger = document.querySelector('.hamburger');
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Logo tıklama işlevselliği
function handleLogoClick(event) {
    event.preventDefault();
    window.location.href = 'index.html';
}

// Arama çubuğunu açma/kapama
function toggleSearch() {
    const searchBar = document.getElementById('search-bar');
    searchBar.style.display = searchBar.style.display === 'block' ? 'none' : 'block';
}

// Arama işlevselliği
function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    if (query) {
        alert('Arama: ' + query + ' (Bu bir simülasyon, gerçek arama henüz aktif değil)');
    }
}

// Anahtar kelime önerileri (simülasyon)
function suggestKeywords() {
    const input = document.getElementById('search-input');
    const suggestions = document.getElementById('suggestions');
    const keywords = ['seyahat', 'esim', 'destinasyon', 'blog', 'ekipman'];
    suggestions.innerHTML = '';

    if (input.value) {
        const filtered = keywords.filter(kw => kw.startsWith(input.value.toLowerCase()));
        if (filtered.length > 0) {
            filtered.forEach(kw => {
                const div = document.createElement('div');
                div.textContent = kw;
                div.onclick = () => {
                    input.value = kw;
                    suggestions.style.display = 'none';
                };
                suggestions.appendChild(div);
            });
            suggestions.style.display = 'block';
        } else {
            suggestions.style.display = 'none';
        }
    } else {
        suggestions.style.display = 'none';
    }
}

// FAQ açma/kapama
function toggleFAQ(element) {
    const content = element.nextElementSibling;
    const isActive = content.classList.contains('active');
    document.querySelectorAll('.faq-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.faq-item h3').forEach(h => h.classList.remove('active'));
    if (!isActive) {
        content.classList.add('active');
        element.classList.add('active');
    }
}

// Scroll event'ları için menü ve hero animasyonu
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const menuBar = document.querySelector('.menu-bar');
    const heroSection = document.querySelector('.hero-section');
    const scrollToTop = document.querySelector('.scroll-to-top');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        menuBar.classList.add('scrolled');
        heroSection.classList.add('scrolled');
        if (currentScroll > lastScroll) {
            menuBar.style.transform = 'translateY(-100%)';
        } else {
            menuBar.style.transform = 'translateY(0)';
        }
        if (currentScroll > 300) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    } else {
        menuBar.classList.remove('scrolled');
        heroSection.classList.remove('scrolled');
        menuBar.style.transform = 'translateY(0)';
        scrollToTop.classList.remove('visible');
    }
    lastScroll = currentScroll;
});

// Yukarı çık butonu
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// GSAP ile animasyonlar
gsap.registerPlugin(ScrollTrigger);

gsap.from('.hero-content', {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: 'power3.out'
});

gsap.utils.toArray('.content-section').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Buy Me a Coffee sticky behavior
const buyMeCoffee = document.querySelector('.buy-me-a-coffee');
if (buyMeCoffee) {
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
            buyMeCoffee.classList.add('sticky');
        } else {
            buyMeCoffee.classList.remove('sticky');
        }
    });
}