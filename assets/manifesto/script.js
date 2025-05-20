/* Hamburger menü açma/kapatma */
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

/* Logo tıklama */
function handleLogoClick(event) {
    event.preventDefault();
    window.location.href = 'index.html';
}

/* Kayıt formu gönderimi */
function handleSubscription(event) {
    event.preventDefault();
    const form = document.getElementById('subscription-form');
    const formData = new FormData(form);
    const userName = formData.get('name');
    
    const popup = document.getElementById('subscription-popup');
    const userNameSpan = document.getElementById('user-name');
    userNameSpan.textContent = userName;
    popup.style.display = 'flex';
    
    gsap.fromTo(popup, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
    
    form.reset();
}

/* VIP sayfasına yönlendirme */
function redirectToVIP() {
    const popup = document.getElementById('subscription-popup');
    gsap.to(popup, { 
        opacity: 0, 
        scale: 0.8, 
        duration: 0.5, 
        ease: "back.in(1.7)", 
        onComplete: () => {
            popup.style.display = 'none';
            window.location.href = 'vip.html';
        }
    });
}

/* Dropdown menü olayları */
function setupDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');
        
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 1024) {
                content.style.display = 'block';
                gsap.fromTo(content, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
            }
        });
        
        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 1024) {
                gsap.to(content, { 
                    opacity: 0, 
                    y: 10, 
                    duration: 0.3, 
                    onComplete: () => { content.style.display = 'none'; }
                });
            }
        });
        
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
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
            if (window.innerWidth > 1024) {
                subMenu.style.display = 'block';
                gsap.fromTo(subMenu, { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: 0.3 });
            }
        });
        
        menu.addEventListener('mouseleave', () => {
            if (window.innerWidth > 1024) {
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

/* Div2: Mouse üzerine gelindiğinde içerik gösterimi */
function showValuesContent() {
    const initialText = document.querySelector('.initial-text');
    const valuesContent = document.querySelector('.values-content');
    const valuesSection = document.querySelector('.values-section');

    // İlk metni gizle
    gsap.to(initialText, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
            initialText.style.display = 'none';
            // Yeni içeriği göster
            valuesContent.style.display = 'flex';
            valuesSection.classList.add('expanded');
            gsap.fromTo(valuesContent, 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
            );
        }
    });
}

/* Scroll event listener */
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

/* Yukarı çık butonu için fonksiyon */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Sayfa yüklendiğinde ve pencere boyutu değiştiğinde çalışacak işlevler */
function adjustLayout() {
    const menuBar = document.querySelector('.menu-bar');
    const heroSection = document.querySelector('.hero-section');
    const manifestoContent = document.querySelector('.manifesto-content');
    
    const menuHeight = menuBar.offsetHeight;
    const heroHeight = heroSection.offsetHeight;

    heroSection.style.marginTop = `${menuHeight}px`;
    manifestoContent.style.marginTop = `${heroHeight}px`;
}

/* Event Listener'lar */
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', () => {
    adjustLayout();
    setupDropdowns();
    setupRegionMenus();
});
window.addEventListener('resize', adjustLayout);