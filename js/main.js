document.addEventListener('DOMContentLoaded', () => {

    /* ============================================
       1. Sticky Navbar & Transparency Transition
       ============================================ */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ============================================
       2. Mobile Menu Toggle
       ============================================ */
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
        });

        // Ensure clean state if window is resized back to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navList.classList.remove('active');
                // Remove inline styles in case they were set previously before cache clear
                navList.style.display = '';
                navList.style.flexDirection = '';
                navList.style.position = '';
                navList.style.top = '';
                navList.style.left = '';
                navList.style.width = '';
                navList.style.backgroundColor = '';
                navList.style.padding = '';
                navList.style.boxShadow = '';
            }
        });
    }

    /* ============================================
       3. Scroll Fade-In / Slide Animations (Intersection Observer)
       ============================================ */
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-up, .animate-slide-left, .animate-slide-right');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 15% of element visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));



    /* ============================================
       5. Vitrine de Produtos Dinâmica (Tabs)
       ============================================ */
    const vitrineTabs = document.querySelectorAll('.vitrine-tab');
    const vitrinePanes = document.querySelectorAll('.vitrine-pane');

    if(vitrineTabs.length > 0 && vitrinePanes.length > 0) {
        vitrineTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault(); // Remove scroll jump

                // Remove active de todas as abas
                vitrineTabs.forEach(t => t.classList.remove('active'));
                
                // Remove active de todos os painéis
                vitrinePanes.forEach(p => {
                    p.classList.remove('active');
                    p.style.display = 'none'; // garante q vai sumir
                });

                // Adiciona active na aba atual
                tab.classList.add('active');

                // Pega o target e exibe
                const targetId = tab.getAttribute('data-target');
                const targetPane = document.getElementById(targetId);
                
                if(targetPane) {
                    targetPane.style.display = 'block';
                    // pequeno delay pra animation ser visivel
                    setTimeout(() => {
                        targetPane.classList.add('active');
                    }, 50);
                }
            });
        });
        
        // Ativa a primeira aba no início
        vitrineTabs[0].click();
    }

});
