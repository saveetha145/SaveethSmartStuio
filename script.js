// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

    /* ==========================================
       NAVBAR SCROLL EFFECT
    ========================================== */
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-scrolled');
        } else {
            navbar.classList.remove('bg-scrolled');
        }
    });


    /* ==========================================
       MOBILE MENU CLOSE (FIXED)
       Smooth scroll handled by CSS scroll-padding
    ========================================== */
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {

            const navbarCollapse = document.querySelector('.navbar-collapse');

            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse)
                    || new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });


    /* ==========================================
       ACTIVE NAVIGATION HIGHLIGHT
    ========================================== */
    const sections = document.querySelectorAll('section');

    function updateActiveNav() {
        let current = '';

        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('load', updateActiveNav);


    /* ==========================================
       STUDIO CARD 3D EFFECT
    ========================================== */
    const studioCards = document.querySelectorAll('.studio-card');

    studioCards.forEach((card, index) => {

        card.addEventListener('mousemove', function(e) {

            if (window.innerWidth < 768) return; // disable 3D on mobile

            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform =
                'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });

        card.style.animationDelay = `${index * 0.2}s`;
    });


    /* ==========================================
       FEATURE ITEMS SCROLL ANIMATION
    ========================================== */
    const featureItems = document.querySelectorAll('.feature-item');

    function checkFeatures() {
        featureItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (itemTop < windowHeight - 100) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }

    featureItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', checkFeatures);
    checkFeatures();


    /* ==========================================
       CONTACT HOVER EFFECT
    ========================================== */
    const contactItems = document.querySelectorAll('.contact-item');

    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 215, 0, 0.2)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });


    /* ==========================================
       HERO PARALLAX EFFECT
    ========================================== */
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;

        if (hero) {
            hero.style.backgroundPositionY = `${scrolled * 0.4}px`;
        }
    });


    /* ==========================================
       SCROLL TO TOP BUTTON
    ========================================== */
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';

    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 25px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: gold;
        color: black;
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1040;
        transition: all 0.3s;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    /* ==========================================
       IMAGE ZOOM ANIMATION (INTERSECTION OBSERVER)
    ========================================== */
    const images = document.querySelectorAll('img');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'zoomIn 1s';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    images.forEach(img => imageObserver.observe(img));


    /* ==========================================
       PREVENT EMPTY LINKS
    ========================================== */
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', e => e.preventDefault());
    });


    console.log('Saveetha Smart Studio & Store Loaded Successfully 🚀');
});


/* ==========================================
   LOADING SCREEN
========================================== */
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading';
loadingScreen.innerHTML = `
<div style="text-align:center;">
    <h2 style="color:gold;">Saveetha</h2>
    <div style="
        width:50px;
        height:50px;
        border:5px solid #f3f3f3;
        border-top:5px solid gold;
        border-radius:50%;
        margin:20px auto;
        animation:spin 1s linear infinite;">
    </div>
</div>
`;

document.body.appendChild(loadingScreen);

window.addEventListener('load', function() {
    setTimeout(() => {
        loadingScreen.style.animation = 'fadeOut 1s forwards';
    }, 1200);
});