/* Hamburger menü açma/kapatma */
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    const hamburger = document.querySelector('.hamburger');
    
    const isOpen = nav.classList.contains('active');
    
    if (!isOpen) {
        nav.classList.add('active');
        hamburger.classList.add('active');
        nav.style.display = 'block';
        gsap.fromTo(nav, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 });
    } else {
        gsap.to(nav, { 
            opacity: 0, 
            y: -20, 
            duration: 0.3, 
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
        gsap.fromTo(searchBar, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 });
        document.getElementById('search-input').focus();
    } else {
        gsap.to(searchBar, { 
            opacity: 0, 
            y: -20, 
            duration: 0.3, 
            onComplete: () => { 
                searchBar.style.display = 'none'; 
                document.getElementById('search-input').value = '';
                document.getElementById('suggestions').style.display = 'none';
            } 
        });
    }
}

/* Arama önerileri */
function suggestKeywords() {
    const input = document.getElementById('search-input').value.toLowerCase().trim();
    const suggestionsBox = document.getElementById('suggestions');
    
    if (input.length < 2) {
        suggestionsBox.style.display = 'none';
        return;
    }

    const blogContent = [
        { title: "Bütçe Seyahati Tüyoları", url: "../blog/butce-seyahati.html", keywords: ["bütçe", "seyahat", "ucuz", "tüyolar"] },
        { title: "Kişisel Gelişim ve Seyahat", url: "../blog/kisisel-gelisim.html", keywords: ["kişisel gelişim", "seyahat", "motivasyon"] },
        { title: "Çalışırken Seyahat Etme", url: "../blog/calisma-ve-seyahat.html", keywords: ["çalışma", "seyahat", "dijital göçebe"] },
        { title: "Yeni Gönderiler", url: "../blog/yeni-gonderiler.html", keywords: ["yeni", "gönderiler", "blog"] }
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
        window.location.href = `../blog/index.html?search=${encodeURIComponent(query)}`;
    }
}

/* Logo tıklama */
function handleLogoClick(event) {
    event.preventDefault();
    window.location.href = '../index.html';
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
                gsap.fromTo(content, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.2 });
            }
        });
        
        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                gsap.to(content, { 
                    opacity: 0, 
                    y: 10, 
                    duration: 0.2, 
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
                    { opacity: isOpen ? 0 : 1, y: isOpen ? 10 : 0, duration: 0.2 }
                );
            }
        });
    });
}

/* Bölge menüsü olayları */
function setupRegionMenus() {
    const regionMenus = document.querySelectorAll('.region-menu');
    
    regionMenus.forEach(menu => {
        const link = menu.querySelector('.region-link');
        const subMenu = menu.querySelector('.sub-menu');
        
        menu.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                subMenu.style.display = 'block';
                gsap.fromTo(subMenu, { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: 0.2 });
            }
        });
        
        menu.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                gsap.to(subMenu, { 
                    opacity: 0, 
                    x: 10, 
                    duration: 0.2, 
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
                { opacity: isOpen ? 0 : 1, x: isOpen ? 10 : 0, duration: 0.2 }
            );
        });
    });
}

/* Menü kaydırma efekti */
function handleScroll() {
    const menuBar = document.querySelector('.menu-bar');
    const heroSection = document.querySelector('.hero-section');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    const buyMeCoffee = document.querySelector('.buy-me-a-coffee');
    
    if (window.scrollY > 50) {
        menuBar.classList.add('scrolled');
        heroSection.classList.add('scrolled');
        scrollToTopBtn.classList.add('visible');
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
            buyMeCoffee.classList.add('sticky');
        } else {
            buyMeCoffee.classList.remove('sticky');
        }
    } else {
        menuBar.classList.remove('scrolled');
        heroSection.classList.remove('scrolled');
        scrollToTopBtn.classList.remove('visible');
        buyMeCoffee.classList.remove('sticky');
    }
}

/* Yukarı kaydırma fonksiyonu */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* FAQ açma/kapama */
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

/* GSAP ile animasyonlar */
gsap.registerPlugin(ScrollTrigger);

gsap.from('.hero-content', {
    opacity: 0,
    y: 50,
    duration: 0.5,
    ease: 'power3.out'
});

gsap.utils.toArray('.content-section').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            once: true
        }
    });
});

/* Başlangıç ayarları */
document.addEventListener('DOMContentLoaded', () => {
    setupDropdowns();
    setupRegionMenus();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
        const menuBar = document.querySelector('.menu-bar');
        const resourcesContent = document.querySelector('.resources-content');
        if (menuBar && resourcesContent) {
            const menuHeight = menuBar.offsetHeight;
            resourcesContent.style.marginTop = `${menuHeight}px`;
        }
    });

    // Görsel yükleme performansını optimize et
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = 1;
        });
        img.style.opacity = 0;
        img.style.transition = 'opacity 0.3s ease';
    });
});