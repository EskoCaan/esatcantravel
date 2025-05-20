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

    /* Kartlar için animasyon */
    gsap.from('.insurance-card', { 
        opacity: 0, 
        scale: 0.9, 
        duration: 0.6, 
        stagger: 0.2, 
        scrollTrigger: {
            trigger: '.cards-container',
            start: 'top 80%',
            toggleActions: 'play none none none',
            onEnter: () => {
                // GSAP animasyonu tamamlandıktan sonra VanillaTilt'i başlat
                setTimeout(setupTiltEffects, 600); // Animasyon süresi kadar bekle
            }
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

/* Fiyat hesaplama fonksiyonu */
function handlePriceCalculation() {
    const destination = document.getElementById('destination').value;
    const duration = parseInt(document.getElementById('duration').value);
    const age = parseInt(document.getElementById('age').value);
    const resultDiv = document.querySelector('.price-result');
    const calculatedPrice = document.getElementById('calculated-price');

    if (!destination || !duration || !age) {
        alert('Lütfen tüm alanları doldurun.');
        return;
    }

    // Ülkeleri risk seviyelerine göre gruplandırma
    const riskLevels = {
        lowRisk: [
            'australia', 'austria', 'belgium', 'canada', 'cyprus', 'czech-republic', 'denmark', 'estonia',
            'finland', 'france', 'germany', 'greece', 'hungary', 'iceland', 'ireland', 'italy', 'japan',
            'korea-south', 'latvia', 'liechtenstein', 'lithuania', 'luxembourg', 'malta', 'monaco', 'netherlands',
            'new-zealand', 'norway', 'poland', 'portugal', 'singapore', 'slovakia', 'slovenia', 'spain',
            'sweden', 'switzerland', 'united-arab-emirates', 'united-kingdom', 'united-states', 'vatican-city'
        ],
        mediumRisk: [
            'albania', 'andorra', 'argentina', 'armenia', 'azerbaijan', 'bahamas', 'bahrain', 'barbados',
            'belarus', 'belize', 'bhutan', 'bolivia', 'bosnia-and-herzegovina', 'botswana', 'brazil', 'brunei',
            'bulgaria', 'cabo-verde', 'cambodia', 'chile', 'china', 'colombia', 'costa-rica', 'croatia',
            'cuba', 'dominica', 'dominican-republic', 'east-timor', 'ecuador', 'egypt', 'el-salvador', 'fiji',
            'georgia', 'ghana', 'grenada', 'guatemala', 'guyana', 'honduras', 'india', 'indonesia',
            'israel', 'jamaica', 'jordan', 'kazakhstan', 'kenya', 'kosovo', 'kuwait', 'kyrgyzstan',
            'laos', 'malaysia', 'maldives', 'mauritius', 'mexico', 'moldova', 'mongolia', 'montenegro',
            'morocco', 'namibia', 'nepal', 'north-macedonia', 'oman', 'panama', 'paraguay', 'peru',
            'philippines', 'qatar', 'romania', 'russia', 'rwanda', 'saint-kitts-and-nevis', 'saint-lucia',
            'saint-vincent-and-the-grenadines', 'samoa', 'san-marino', 'saudi-arabia', 'serbia', 'seychelles',
            'south-africa', 'sri-lanka', 'suriname', 'taiwan', 'tajikistan', 'tanzania', 'thailand',
            'trinidad-and-tobago', 'tunisia', 'turkey', 'turkmenistan', 'ukraine', 'uruguay', 'uzbekistan',
            'vietnam'
        ],
        highRisk: [
            'afghanistan', 'algeria', 'angola', 'bangladesh', 'benin', 'burkina-faso', 'burundi', 'cameroon',
            'central-african-republic', 'chad', 'comoros', 'congo', 'djibouti', 'equatorial-guinea', 'eritrea',
            'eswatini', 'ethiopia', 'gabon', 'gambia', 'guinea', 'guinea-bissau', 'haiti', 'iran',
            'iraq', 'ivory-coast', 'kiribati', 'korea-north', 'lebanon', 'lesotho', 'liberia', 'libya',
            'madagascar', 'malawi', 'mali', 'marshall-islands', 'mauritania', 'micronesia', 'mozambique', 'myanmar',
            'nauru', 'niger', 'nigeria', 'pakistan', 'palau', 'papua-new-guinea', 'sao-tome-and-principe', 'senegal',
            'sierra-leone', 'solomon-islands', 'somalia', 'south-sudan', 'sudan', 'syria', 'togo', 'tonga',
            'tuvalu', 'uganda', 'vanuatu', 'venezuela', 'yemen', 'zambia', 'zimbabwe'
        ]
    };

    // Fiyat hesaplama fonksiyonu
    function calculatePrice(destination, duration, age) {
        let basePrice = 50; // Temel fiyat (TRY)

        // Risk seviyesine göre fiyat çarpanı
        let riskMultiplier = 1;
        if (riskLevels.lowRisk.includes(destination)) {
            riskMultiplier = 1;
        } else if (riskLevels.mediumRisk.includes(destination)) {
            riskMultiplier = 1.5;
        } else if (riskLevels.highRisk.includes(destination)) {
            riskMultiplier = 2;
        }

        // Süreye göre çarpan (her 7 gün için ek maliyet)
        const durationFactor = 1 + (duration / 7) * 0.2;

        // Yaşa göre çarpan
        let ageFactor = 1;
        if (age >= 60) {
            ageFactor = 1.5;
        } else if (age >= 40) {
            ageFactor = 1.2;
        }

        // Toplam fiyat hesaplama
        const totalPrice = basePrice * riskMultiplier * durationFactor * ageFactor;
        return Math.round(totalPrice);
    }

    const price = calculatePrice(destination, duration, age);
    calculatedPrice.textContent = price;
    resultDiv.style.display = 'block';
    resultDiv.classList.add('show');

    gsap.fromTo(resultDiv, { 
        opacity: 0, 
        y: 20 
    }, { 
        opacity: 1, 
        y: 0, 
        duration: 0.5 
    });
}

/* VanillaTilt Efektleri */
function setupTiltEffects() {
    if (typeof VanillaTilt !== 'undefined') {
        // Mevcut tilt efektlerini temizle (tekrar başlatmayı önlemek için)
        document.querySelectorAll('.insurance-card').forEach(card => {
            if (card.vanillaTilt) {
                card.vanillaTilt.destroy();
            }
        });

        // VanillaTilt'i başlat
        VanillaTilt.init(document.querySelectorAll('.insurance-card'), {
            max: 10, // Daha hafif bir eğim
            speed: 400,
            glare: true,
            'max-glare': 0.2,
            scale: 1.02, // Hafif bir büyütme efekti
            reset: true, // Mouse ayrıldığında sıfırlanır
            perspective: 1000 // Daha doğal bir 3D efekti
        });
    } else {
        console.warn('VanillaTilt kütüphanesi yüklenmedi.');
    }
}

/* Sayfa yüklendiğinde çalışacak fonksiyonlar */
document.addEventListener('DOMContentLoaded', () => {
    setupDropdowns();
    setupRegionMenus();
    setupAnimations();
    // setupTiltEffects burada çağrılmıyor, GSAP animasyonundan sonra çağrılacak
});

window.addEventListener('scroll', handleScroll);

// Tüm kaynakların yüklendiğinden emin olmak için
window.addEventListener('load', () => {
    // GSAP animasyonları zaten setupAnimations içinde yönetiliyor
});