/* Hamburger menü açma/kapama */
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    const hamburger = document.querySelector('.hamburger');
    
    const isOpen = nav.classList.contains('active');
    
    if (!isOpen) {
        nav.classList.add('active');
        hamburger.classList.add('active');
        nav.style.display = 'block';
        gsap.fromTo(nav, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 });
    } else {
        gsap.to(nav, { 
            opacity: 0, 
            y: -20, 
            duration: 0.5, 
            onComplete: () => {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
                nav.style.display = 'none';
            }
        });
    }
}

/* Arama çubuğu açma/kapama */
function toggleSearch() {
    const searchBar = document.getElementById('search-bar');
    if (searchBar.style.display === 'none') {
        searchBar.style.display = 'block';
        gsap.fromTo(searchBar, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 });
        document.getElementById('search-input').focus();
    } else {
        gsap.to(searchBar, { 
            opacity: 0, 
            y: -20, 
            duration: 0.5, 
            onComplete: () => { 
                searchBar.style.display = 'none'; 
                document.getElementById('search-input').value = '';
                document.getElementById('suggestions').style.display = 'none';
            } 
        });
    }
}

/* Arama önerileri (blog içerikleri için) */
function suggestKeywords() {
    const input = document.getElementById('search-input').value.toLowerCase().trim();
    const suggestionsBox = document.getElementById('suggestions');
    
    if (input.length < 2) {
        suggestionsBox.style.display = 'none';
        return;
    }

    const blogContent = [
        { title: "Bütçe Seyahati Tüyoları", url: "blog/butce-seyahati.html", keywords: ["bütçe", "seyahat", "ucuz", "tüyolar"] },
        { title: "Kişisel Gelişim ve Seyahat", url: "blog/kisisel-gelisim.html", keywords: ["kişisel gelişim", "seyahat", "motivasyon"] },
        { title: "Çalışırken Seyahat Etme", url: "blog/calisma-ve-seyahat.html", keywords: ["çalışma", "seyahat", "dijital göçebe"] },
        { title: "Yeni Gönderiler", url: "blog/yeni-gonderiler.html", keywords: ["yeni", "gönderiler", "blog"] }
    ];

    const suggestions = blogContent.filter(item => 
        item.title.toLowerCase().includes(input) || 
        item.keywords.some(keyword => keyword.includes(input))
    );

    suggestionsBox.innerHTML = '';
    if (suggestions.length > 0) {
        suggestions.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item.title;
            div.onclick = () => window.location.href = item.url;
            suggestionsBox.appendChild(div);
        });
        suggestionsBox.style.display = 'block';
    } else {
        suggestionsBox.style.display = 'none';
    }
}

/* Arama formu gönderimi */
function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        window.location.href = `blog/index.html?search=${encodeURIComponent(query)}`;
    }
}

/* Logo tıklama (sayfa yenileme önleme) */
function handleLogoClick(event) {
    event.preventDefault();
    window.location.href = 'index.html';
}

/* Dropdown menü olayları */
function setupDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');
        
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                content.style.display = 'block';
                gsap.fromTo(content, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
            }
        });
        
        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                gsap.to(content, { 
                    opacity: 0, 
                    y: 10, 
                    duration: 0.3, 
                    onComplete: () => { content.style.display = 'none'; }
                });
            }
        });
        
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const isOpen = content.style.display === 'block';
                content.style.display = isOpen ? 'none' : 'block';
                gsap.fromTo(content, 
                    { opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }, 
                    { opacity: isOpen ? 0 : 1, y: isOpen ? 10 : 0, duration: 0.3 }
                );
            }
        });
    });
}

/* Bölge menüsü olayları (Destinasyonlar için) */
function setupRegionMenus() {
    const regionMenus = document.querySelectorAll('.region-menu');
    
    regionMenus.forEach(menu => {
        const link = menu.querySelector('.region-link');
        const subMenu = menu.querySelector('.sub-menu');
        
        menu.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                subMenu.style.display = 'block';
                gsap.fromTo(subMenu, { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: 0.3 });
            }
        });
        
        menu.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                gsap.to(subMenu, { 
                    opacity: 0, 
                    x: 10, 
                    duration: 0.3, 
                    onComplete: () => { subMenu.style.display = 'none'; }
                });
            }
        });
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = subMenu.style.display === 'block';
            subMenu.style.display = isOpen ? 'none' : 'block';
            gsap.fromTo(subMenu, 
                { opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 10 }, 
                { opacity: isOpen ? 0 : 1, x: isOpen ? 10 : 0, duration: 0.3 }
            );
        });
    });
}

/* Menü kaydırma efekti */
function handleScroll() {
    const menuBar = document.querySelector('.menu-bar');
    const heroSection = document.querySelector('.hero-section');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (window.scrollY > 50) {
        menuBar.classList.add('scrolled');
        heroSection.classList.add('scrolled');
        scrollToTopBtn.classList.add('visible');
    } else {
        menuBar.classList.remove('scrolled');
        heroSection.classList.remove('scrolled');
        scrollToTopBtn.classList.remove('visible');
    }
}

/* Yukarı kaydırma fonksiyonu */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* GSAP Animasyonları */
function setupAnimations() {
    gsap.from('.welcome-text', { 
        opacity: 0, 
        scale: 0.8, 
        duration: 1, 
        delay: 0.5, 
        ease: 'back.out(1.7)' 
    });
    gsap.from('.hero-content h2', { 
        opacity: 0, 
        x: -50, 
        duration: 1, 
        delay: 0.7 
    });
    gsap.from('.hero-content p', { 
        opacity: 0, 
        x: 50, 
        duration: 1, 
        delay: 0.9 
    });

    gsap.utils.toArray('.selam-content > div').forEach(section => {
        const textElements = section.querySelectorAll('h2, p');
        gsap.from(textElements, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            }
        });
    });

    gsap.from('.profile-card', {
        opacity: 0,
        scale: 0.9,
        rotationX: 20,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
            trigger: '.card-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none'
        }
    });
}

/* Çok katmanlı parallax efekti */
function setupParallax() {
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        
        gsap.to(heroSection, { 
            x: x * 0.5, 
            y: y * 0.5, 
            duration: 0.8,
            ease: 'power2.out' 
        });
        gsap.to(heroContent, { 
            x: x * -0.3, 
            y: y * -0.3, 
            duration: 0.8,
            ease: 'power2.out' 
        });
    });
}

/* Galeri kaydırma ve otomatik oynatma */
function setupGallery() {
    const gallery = document.querySelector('.gallery-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    gallery.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
    });

    gallery.addEventListener('mouseleave', () => {
        isDown = false;
    });

    gallery.addEventListener('mouseup', () => {
        isDown = false;
    });

    gallery.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - gallery.offsetLeft;
        const walk = (x - startX) * 2;
        gallery.scrollLeft = scrollLeft - walk;
    });

    let scrollAmount = 0;
    const scrollSpeed = 1;
    function autoScroll() {
        scrollAmount += scrollSpeed;
        gallery.scrollLeft = scrollAmount;
        if (scrollAmount >= gallery.scrollWidth - gallery.clientWidth) {
            scrollAmount = 0;
        }
        requestAnimationFrame(autoScroll);
    }
    autoScroll();
}

/* 3D Tilt efekti */
function setupTilt() {
    VanillaTilt.init(document.querySelectorAll('.gallery-item'), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3
    });
}

/* Fareyle ışık efekti */
function setupLightEffect() {
    const light = document.createElement('div');
    light.classList.add('light-effect');
    document.body.appendChild(light);

    document.addEventListener('mousemove', (e) => {
        gsap.to(light, {
            x: e.clientX - 100,
            y: e.clientY - 100,
            duration: 0.3
        });
    });
}

/* Başlangıç ayarları */
document.addEventListener('DOMContentLoaded', () => {
    setupDropdowns();
    setupRegionMenus();
    setupAnimations();
    setupParallax();
    setupGallery();
    setupTilt();
    setupLightEffect();
    
    window.addEventListener('scroll', handleScroll);
});

/* Işık efekti için CSS (eklendi) */
const style = document.createElement('style');
style.textContent = `
    .light-effect {
        position: absolute;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
        pointer-events: none;
        z-index: 9999;
    }
`;
document.head.appendChild(style);