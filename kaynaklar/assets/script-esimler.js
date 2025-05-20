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

/* Arama önerileri */
function suggestKeywords() {
    const input = document.getElementById('search-input').value.toLowerCase().trim();
    const suggestionsBox = document.getElementById('suggestions');
    
    if (input.length < 2) {
        suggestionsBox.style.display = 'none';
        return;
    }

    const blogContent = [
        { title: "Bütçe Seyahati Tüyoları", url: "file:///Users/esat/Desktop/Websitem/blog/butce-seyahati.html", keywords: ["bütçe", "seyahat", "ucuz", "tüyolar"] },
        { title: "Kişisel Gelişim ve Seyahat", url: "file:///Users/esat/Desktop/Websitem/blog/kisisel-gelisim.html", keywords: ["kişisel gelişim", "seyahat", "motivasyon"] },
        { title: "Çalışırken Seyahat Etme", url: "file:///Users/esat/Desktop/Websitem/blog/calisma-ve-seyahat.html", keywords: ["çalışma", "seyahat", "dijital göçebe"] },
        { title: "Yeni Gönderiler", url: "file:///Users/esat/Desktop/Websitem/blog/yeni-gonderiler.html", keywords: ["yeni", "gönderiler", "blog"] }
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
        window.location.href = `file:///Users/esat/Desktop/Websitem/blog/index.html?search=${encodeURIComponent(query)}`;
    }
}

/* Logo tıklama */
function handleLogoClick(event) {
    event.preventDefault();
    window.location.href = 'file:///Users/esat/Desktop/Websitem/index.html';
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

/* Bölge menüsü olayları */
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
    const buyMeCoffee = document.querySelector('.buy-me-a-coffee');
    const footer = document.querySelector('.footer');
    
    if (window.scrollY > 50) {
        menuBar.classList.add('scrolled');
        heroSection.classList.add('scrolled');
        scrollToTopBtn.classList.add('visible');
    } else {
        menuBar.classList.remove('scrolled');
        heroSection.classList.remove('scrolled');
        scrollToTopBtn.classList.remove('visible');
    }

    // "Buy Me a Coffee" div'inin genişlik ayarı ve görünürlüğü
    const footerWidth = footer.offsetWidth;
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 200) {
        buyMeCoffee.classList.add('sticky');
        buyMeCoffee.style.maxWidth = `${footerWidth}px`;
    } else {
        buyMeCoffee.classList.remove('sticky');
        buyMeCoffee.style.maxWidth = '';
    }

    // Div7'nin her zaman görünür olduğundan emin ol
    if (buyMeCoffee.style.display !== 'block') {
        buyMeCoffee.style.display = 'block';
    }
}

/* Yukarı kaydırma fonksiyonu */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* SSS açılır-kapanır fonksiyonu */
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const content = faqItem.querySelector('.faq-content');
    const allFaqs = document.querySelectorAll('.faq-item');
    
    allFaqs.forEach(item => {
        const itemContent = item.querySelector('.faq-content');
        const itemHeader = item.querySelector('h3');
        if (itemContent !== content) {
            itemContent.classList.remove('active');
            itemHeader.classList.remove('active');
        }
    });

    content.classList.toggle('active');
    element.classList.toggle('active');
}

/* GSAP Animasyonları */
function setupAnimations() {
    /* Hero bölümü animasyonları */
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

    /* İçerik bölümleri için animasyon */
    gsap.from('.content-section', { 
        opacity: 0, 
        y: 50, 
        duration: 0.8, 
        stagger: 0.2, 
        scrollTrigger: {
            trigger: '.content-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    /* SIM kartlar için animasyon */
    gsap.from('.sim-card', { 
        opacity: 0, 
        scale: 0.9, 
        duration: 0.6, 
        stagger: 0.2, 
        scrollTrigger: {
            trigger: '.sim-comparison',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    /* Footer için animasyon */
    gsap.from('.footer-container > div', { 
        opacity: 0, 
        y: 30, 
        duration: 0.8, 
        stagger: 0.2, 
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });
}

/* Sayfa yüklendiğinde çalışacak fonksiyonlar */
document.addEventListener('DOMContentLoaded', () => {
    setupDropdowns();
    setupRegionMenus();
    setupAnimations();
});

/* Scroll olayını dinle */
window.addEventListener('scroll', handleScroll);