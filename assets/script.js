// Hamburger menü açma/kapama
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

// Arama çubuğu açma/kapama
function toggleSearch() {
    const searchBar = document.getElementById('search-bar');
    if (searchBar.style.display === 'none') {
        searchBar.style.display = 'block';
        gsap.fromTo(searchBar, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 });
    } else {
        gsap.to(searchBar, { opacity: 0, y: -20, duration: 0.5, onComplete: () => { searchBar.style.display = 'none'; } });
    }
}

// Arama önerileri (sadece blog içerikleri)
function suggestKeywords() {
    const input = document.getElementById('search-input').value.toLowerCase().trim();
    const suggestionsBox = document.getElementById('suggestions');
    
    if (input.length < 2) {
        suggestionsBox.style.display = 'none';
        return;
    }

    const blogContent = [
        { title: "Ucuz Uçak Bileti Nasıl Bulunur", url: "blog/ucuz-ucak-bileti-nasil-bulunur.html" },
        { title: "Ucuz Konaklama Nasıl Bulunur", url: "blog/ucuz-konaklama-nasil-bulunur.html" },
        { title: "Sırt Çantası Nasıl Seçilir", url: "blog/sirt-cantasi-nasil-secilir.html" },
        { title: "Seyahat Planlamak İçin 16 Adım", url: "blog/seyahat-planlamak-icin-16-adim.html" },
        { title: "En Kapsamlı Paketleme Rehberim", url: "blog/en-kapsamli-paketleme-rehberim.html" },
        { title: "Seyahat Sigortası Nasıl Alınır", url: "blog/seyahat-sigortasi-nasil-alinir.html" },
        { title: "Yeni Gezginler İçin 11 İpucu", url: "blog/yeni-gezginler-icin-11-ipucu.html" },
        { title: "Favori Hostellerim", url: "blog/favori-hostellerim.html" },
        { title: "Yalnız Seyahat Eden Kadınlar İçin İpuçları", url: "blog/yalniz-seyahat-eden-kadinlar-icin-ipuclari.html" },
        { title: "Doğru Seyahat Kredi Kartı Nasıl Seçilir", url: "blog/dogru-seyahat-kredi-karti-nasil-secilir.html" },
        { title: "Uzak Durulması Gereken 14 Seyahat Dolandırıcılığı", url: "blog/uzak-durulmasi-gereken-14-seyahat-dolandiriciligi.html" },
        { title: "Yurt Dışında Çalışmanın 15 Yolu", url: "blog/yurt-disinda-calismanin-15-yolu.html" },
    ];

    const suggestions = blogContent.filter(item => item.title.toLowerCase().includes(input));
    
    if (suggestions.length > 0) {
        suggestionsBox.innerHTML = suggestions.slice(0, 5).map(item => `<div onclick="window.location.href='${item.url}'">${item.title}</div>`).join('');
        suggestionsBox.style.display = 'block';
    } else {
        suggestionsBox.innerHTML = '<div>Sonuç bulunamadı</div>';
        suggestionsBox.style.display = 'block';
    }
}

// Arama işlemi
function handleSearch(event) {
    event.preventDefault();
    const input = document.getElementById('search-input').value.trim();
    if (input) {
        window.location.href = `search.html?q=${encodeURIComponent(input)}`;
    }
}

// Abonelik formu
function handleSubscription(event) {
    event.preventDefault();
    const form = document.getElementById('subscription-form');
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    
    if (name && email) {
        alert(`Teşekkürler ${name}! Ücretsiz kopyanız ${email} adresine gönderildi.`);
        form.reset();
    } else {
        alert('Lütfen tüm alanları doldurun ve onay kutusunu işaretleyin.');
    }
}

// Çeteye katıl formu
function handleJoin(event) {
    event.preventDefault();
    const form = document.querySelector('.join-form');
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (name && email && message) {
        alert(`Teşekkürler ${name}! Çeteye katılım talebiniz alındı. Size en kısa sürede ${email} adresinden dönüş yapacağım.`);
        form.reset();
    } else {
        alert('Lütfen tüm alanları doldurun.');
    }
}

// Logo tıklamasında menü kapatma
function handleLogoClick(event) {
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('.main-nav');
        const hamburger = document.querySelector('.hamburger');
        if (nav.classList.contains('active')) {
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
}

// Menü davranışları
function initializeMenu() {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.replaceWith(dropdown.cloneNode(true));
    });
    document.querySelectorAll('.region-menu').forEach(region => {
        region.replaceWith(region.cloneNode(true));
    });

    if (window.innerWidth > 1024) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            const content = dropdown.querySelector('.dropdown-content');
            dropdown.addEventListener('mouseenter', () => {
                gsap.fromTo(content, { opacity: 0, y: 10 }, { opacity: 1, y: 0, display: 'block', duration: 0.3 });
            });
            dropdown.addEventListener('mouseleave', () => {
                gsap.to(content, { opacity: 0, y: 10, display: 'none', duration: 0.3 });
            });
        });

        document.querySelectorAll('.region-menu').forEach(region => {
            const subMenu = region.querySelector('.sub-menu');
            region.addEventListener('mouseenter', () => {
                gsap.fromTo(subMenu, { opacity: 0, x: 10 }, { opacity: 1, x: 0, display: 'block', duration: 0.3 });
            });
            region.addEventListener('mouseleave', () => {
                gsap.to(subMenu, { opacity: 0, x: 10, display: 'none', duration: 0.3 });
            });
        });
    } else {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            const link = dropdown.querySelector('a');
            const content = dropdown.querySelector('.dropdown-content');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const isOpen = content.style.display === 'block';
                document.querySelectorAll('.dropdown-content').forEach(otherContent => {
                    if (otherContent !== content && otherContent.style.display === 'block') {
                        gsap.to(otherContent, { opacity: 0, height: 0, duration: 0.3, onComplete: () => { otherContent.style.display = 'none'; } });
                    }
                });
                if (!isOpen) {
                    content.style.display = 'block';
                    gsap.fromTo(content, { opacity: 0, height: 0 }, { opacity: 1, height: 'auto', duration: 0.3 });
                } else {
                    gsap.to(content, { opacity: 0, height: 0, duration: 0.3, onComplete: () => { content.style.display = 'none'; } });
                }
            });
        });

        document.querySelectorAll('.region-menu').forEach(region => {
            const link = region.querySelector('.region-link');
            const subMenu = region.querySelector('.sub-menu');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const isOpen = subMenu.style.display === 'block';
                document.querySelectorAll('.sub-menu').forEach(otherSubMenu => {
                    if (otherSubMenu !== subMenu && otherSubMenu.style.display === 'block') {
                        gsap.to(otherSubMenu, { opacity: 0, height: 0, duration: 0.3, onComplete: () => { otherSubMenu.style.display = 'none'; } });
                    }
                });
                if (!isOpen) {
                    subMenu.style.display = 'block';
                    gsap.fromTo(subMenu, { opacity: 0, height: 0 }, { opacity: 1, height: 'auto', duration: 0.3 });
                } else {
                    gsap.to(subMenu, { opacity: 0, height: 0, duration: 0.3, onComplete: () => { subMenu.style.display = 'none'; } });
                }
            });
        });
    }
}

window.addEventListener('resize', initializeMenu);

initializeMenu();

window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero-section');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    const menuBar = document.querySelector('.menu-bar');
    const menuLogo = document.getElementById('menu-logo');
    const courseSection = document.querySelector('.course-section');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition > 100) {
        heroSection.classList.add('scrolled');
        scrollToTopBtn.classList.add('visible');
        menuBar.classList.add('scrolled');
        menuLogo.src = 'assets/logowhite.svg';
    } else {
        heroSection.classList.remove('scrolled');
        scrollToTopBtn.classList.remove('visible');
        menuBar.classList.remove('scrolled');
        menuLogo.src = 'assets/logo.svg';
    }

    if (scrollPosition > documentHeight / 2) {
        courseSection.classList.add('expanded');
    } else {
        courseSection.classList.remove('expanded');
    }
});

const plannerSection = document.querySelector('.planner-section');
plannerSection.addEventListener('mouseenter', () => {
    gsap.to(plannerSection, { scale: 1.02, duration: 0.3 });
});
plannerSection.addEventListener('mouseleave', () => {
    gsap.to(plannerSection, { scale: 1, duration: 0.3 });
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openSignupPopup() {
    const popup = document.getElementById('signupPopup');
    popup.style.display = 'flex';
    gsap.fromTo(popup, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 });
}

function closeSignupPopup() {
    const popup = document.getElementById('signupPopup');
    gsap.to(popup, { opacity: 0, scale: 0.8, duration: 0.5, onComplete: () => { popup.style.display = 'none'; } });
}

document.querySelector('.signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    
    if (name && email) {
        alert(`Teşekkürler ${name}! Programa katılım talebiniz alındı. Size en kısa sürede ${email} adresinden dönüş yapacağım.`);
        this.reset();
        closeSignupPopup();
    } else {
        alert('Lütfen tüm alanları doldurun.');
    }
});