document.addEventListener('DOMContentLoaded', () => {

    /**
     * Page and Header Management
     */
    const mainHeader = document.querySelector('.main-header');
    const landingPage = document.getElementById('landing-page');
    const galleryPage = document.getElementById('gallery-page');
    const editorialPage = document.getElementById('editorial-page');
    const codePage = document.getElementById('code-page');
    const mainNavLinks = document.querySelectorAll('.main-header .nav-links a');
    const showCodeBtn = document.getElementById('show-code-btn');
    const backToGalleryBtn = document.getElementById('back-to-gallery-btn');
    const codeDisplay = document.getElementById('code-display');

    let lastActivePage = 'landing-page';

    const showPage = (pageId) => {
        const pages = ['landing-page', 'gallery-page', 'editorial-page', 'code-page'];
        pages.forEach(p => {
            const pageEl = document.getElementById(p);
            if (pageEl) pageEl.classList.add('hidden');
        });

        const targetPage = document.getElementById(pageId);
        if (targetPage) targetPage.classList.remove('hidden');
        
        if (pageId === 'gallery-page' || pageId === 'editorial-page') {
            mainHeader.classList.add('gallery-active');
            showCodeBtn.classList.remove('hidden');
            lastActivePage = pageId;
        } else if (pageId === 'code-page') {
             mainHeader.classList.add('gallery-active');
            showCodeBtn.classList.add('hidden');
            const fullHtml = document.documentElement.outerHTML;
            codeDisplay.textContent = fullHtml;
        }
        else {
            mainHeader.classList.remove('gallery-active');
            showCodeBtn.classList.add('hidden');
            lastActivePage = 'landing-page';
        }
        window.scrollTo(0, 0);
    };
    
    showCodeBtn.addEventListener('click', () => showPage('code-page'));
    backToGalleryBtn.addEventListener('click', () => showPage(lastActivePage));
    
    mainNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (document.getElementById('landing-page').classList.contains('hidden')) {
                 e.preventDefault();
                 showPage('landing-page');
                 setTimeout(() => {
                    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        });
    });


    /**
     * Mobile Menu Functionality
     */
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuButton.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuButton.querySelector('i').classList.remove('fa-times');
                    mobileMenuButton.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    /**
     * Multi-Step Modal Functionality
     */
    const diveInButton = document.getElementById('dive-in-btn');
    const buildModal = document.getElementById('build-modal');
    const closeModalButton = buildModal.querySelector('.close-button');
    const modalSteps = document.querySelectorAll('.modal-step');
    
    const goToStep = (stepNumber) => {
        modalSteps.forEach(step => step.classList.add('hidden'));
        document.getElementById(`modal-step-${stepNumber}`).classList.remove('hidden');
    };

    const openModal = () => {
        goToStep(1);
        buildModal.classList.remove('hidden');
    };

    const closeModal = () => {
        buildModal.classList.add('hidden');
    };

    document.getElementById('get-started-btn').addEventListener('click', () => goToStep(2));

    document.querySelectorAll('.btn-previous').forEach(button => {
        button.addEventListener('click', () => {
            const targetStep = button.dataset.targetStep;
            goToStep(targetStep);
        });
    });

    document.querySelectorAll('.btn-choice[data-target-step]').forEach(button => {
        button.addEventListener('click', () => {
            const targetStep = button.dataset.targetStep;
            goToStep(targetStep);
        });
    });
    
    document.querySelectorAll('.btn-choice[data-target-page]').forEach(button => {
        button.addEventListener('click', () => {
            const pageId = button.dataset.targetPage;
            closeModal();
            showPage(pageId);
        });
    });
    
    document.querySelectorAll('.btn-choice').forEach(button => {
        button.addEventListener('click', (e) => {
            const parentContainer = e.target.closest('.choice-buttons');
            if(parentContainer){
                parentContainer.querySelectorAll('.btn-choice').forEach(btn => btn.classList.remove('active'));
            }
            e.target.classList.add('active');
        });
    });

    diveInButton.addEventListener('click', openModal);
    closeModalButton.addEventListener('click', closeModal);

    buildModal.addEventListener('click', (event) => {
        if (event.target === buildModal) {
            closeModal();
        }
    });

    /**
    * Side Panel Functionality
    */
    const sidePanel = document.querySelector('.side-panel');
    const sidePanelToggle = document.querySelector('.side-panel-toggle');
    const pageContainers = document.querySelectorAll('.page-container');
    
    const colorPaletteToggle = document.getElementById('color-palette-toggle');
    const colorPaletteDetails = document.getElementById('color-palette-details');
    const paletteOptions = document.querySelectorAll('.palette-option');
    
    const typographyToggle = document.getElementById('typography-toggle');
    const typographyDetails = document.getElementById('typography-details');
    const fontPairingOptions = document.querySelectorAll('.font-pairing-option');
    
    const heroToggle = document.getElementById('hero-toggle');
    const heroDetails = document.getElementById('hero-details');
    const headlineOptions = document.querySelectorAll('.headline-list li');
    const ctaButtons = document.querySelectorAll('.btn-cta');

    if (sidePanelToggle) {
        sidePanelToggle.addEventListener('click', () => {
            sidePanel.classList.toggle('open');
            const icon = sidePanelToggle.querySelector('i');
            if (icon.classList.contains('fa-chevron-left')) {
                icon.classList.remove('fa-chevron-left');
                icon.classList.add('fa-chevron-right');
            } else {
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-left');
            }
        });
    }
    
    const setupToggle = (toggleBtn, detailsPanel) => {
         if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                toggleBtn.classList.toggle('open');
                detailsPanel.classList.toggle('hidden');
            });
        }
    };

    setupToggle(colorPaletteToggle, colorPaletteDetails);
    setupToggle(typographyToggle, typographyDetails);
    setupToggle(heroToggle, heroDetails);
    
    paletteOptions.forEach(option => {
        option.addEventListener('click', () => {
            paletteOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            const newTheme = option.dataset.theme;
            pageContainers.forEach(container => {
                container.className = 'page-container ' + container.dataset.baseClass; // Reset classes
                if (newTheme) {
                    container.classList.add(newTheme);
                }
            });
        });
    });
    
    fontPairingOptions.forEach(option => {
        option.addEventListener('click', () => {
            fontPairingOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            const newFontClass = option.dataset.fontClass;
            pageContainers.forEach(container => {
                container.classList.remove('font-classic-serif', 'font-modern-minimalist', 'font-understated-refined');
                if (newFontClass) {
                    container.classList.add(newFontClass);
                }
            });
        });
    });
    
    const pageHeadlines = document.querySelectorAll('.page-headline');
    headlineOptions.forEach(option => {
        option.addEventListener('click', () => {
            headlineOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            pageHeadlines.forEach(h1 => h1.textContent = option.dataset.headline);
        });
    });
    
    const pageCtas = document.querySelectorAll('.page-cta');
     ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            ctaButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            pageCtas.forEach(cta => cta.textContent = button.dataset.cta);
        });
    });


    /**
     * Scroll Animation Functionality
     */
    const animatedElements = document.querySelectorAll('section, footer');

    const observerOptions = {
        root: null,
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        if (!el.classList.contains('modal-overlay')) {
            el.classList.add('hidden');
            observer.observe(el);
        }
    });

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
       heroSection.classList.remove('hidden');
       heroSection.classList.add('visible');
    }

});
