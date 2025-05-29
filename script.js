// Product data
const productCategories = [
    {
        id: 'bracelets',
        title: 'Bracelets',
        products: [
            {
                image: 'green-bracelet-1.jpg',
                name: 'Emerald Bracelet',
                description: '8mm Emerald Bracelet.'
            },
            {
                image: '7-chakra-beads-2.jpg',
                name: '7 Charkra Beads',
                description: '8mm 7 Chakra Beads.'
            },
            {
                image: 'Yellow-quartz-3.jpg',
                name: 'Botanical Print Series',
                description: 'Hand-pressed botanical prints on vintage paper. Each print captures the delicate beauty of nature. Available as a set or individual pieces for custom arrangements.'
            },
            {
                image: 'Healing-Medition-4.jpg',
                name: 'Macrame Wall Hanging',
                description: 'Intricate macrame design using natural cotton cord. Brings texture and bohemian charm to any wall. Each knot is hand-tied with care and attention to detail.'
            },
            {
                image: 'Lavender-5.jpg',
                name: 'Macrame Wall Hanging',
                description: 'Intricate macrame design using natural cotton cord. Brings texture and bohemian charm to any wall. Each knot is hand-tied with care and attention to detail.'
            },
            {
                image: 'Golden-6.jpg',
                name: 'Macrame Wall Hanging',
                description: 'Intricate macrame design using natural cotton cord. Brings texture and bohemian charm to any wall. Each knot is hand-tied with care and attention to detail.'
            },
            {
                image: 'Silver-7.jpg',
                name: 'Macrame Wall Hanging',
                description: 'Intricate macrame design using natural cotton cord. Brings texture and bohemian charm to any wall. Each knot is hand-tied with care and attention to detail.'
            },
            {
                image: 'red-7-chakra-8.jpg',
                name: 'Macrame Wall Hanging',
                description: 'Intricate macrame design using natural cotton cord. Brings texture and bohemian charm to any wall. Each knot is hand-tied with care and attention to detail.'
            }
        ]
    },
    {
        id: 'pendants',
        title: 'Pendants',
        products: [
            {
                image: 'Amazonia-Copper-Pendant-1.jpg',
                name: 'Amazonia Copper Pendant',
                description: 'Hand-thrown ceramic vases with glazed finish. Perfect for fresh or dried flowers. The organic shapes and earthy tones complement any dining table setting.'
            }
        ]
    }
];

// Configuration
const CONFIG = {
    cardWidth: 300,
    cardMargin: 30,
    autoplayInterval: 5000,
    swipeThreshold: 50,
    breakpoints: {
        mobile: 480,
        tablet: 768
    }
};

// Utility functions
const DOM = {
    getElement: (id) => document.getElementById(id),
    createElement: (tag, className) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        return element;
    },
    setStyle: (element, styles) => {
        Object.assign(element.style, styles);
    }
};

// Carousel class
class Carousel {
    constructor(category, products) {
        this.category = category;
        this.products = products;
        this.currentIndex = 0;
        this.itemsPerView = this.calculateItemsPerView();
        this.element = null;
        this.dotsContainer = null;
    }

    calculateItemsPerView() {
        const width = window.innerWidth;
        if (width <= CONFIG.breakpoints.mobile) return 1;
        if (width <= CONFIG.breakpoints.tablet) return 2;
        return 3;
    }

    init() {
        this.element = DOM.getElement(`${this.category}-carousel`);
        this.dotsContainer = DOM.getElement(`${this.category}-dots`);
        this.createDots();
        this.update();
        this.setupTouchEvents();
    }

    move(direction) {
        const totalItems = this.element.children.length;
        const maxIndex = Math.max(0, totalItems - this.itemsPerView);

        this.currentIndex += direction;

        if (this.currentIndex < 0) {
            this.currentIndex = maxIndex;
        } else if (this.currentIndex > maxIndex) {
            this.currentIndex = 0;
        }

        this.update();
    }

    update() {
        const offset = -this.currentIndex * (CONFIG.cardWidth + CONFIG.cardMargin);
        DOM.setStyle(this.element, { transform: `translateX(${offset}px)` });
        this.updateDots();
    }

    createDots() {
        const totalItems = this.element.children.length;
        const totalDots = Math.max(1, totalItems - this.itemsPerView + 1);

        this.dotsContainer.innerHTML = '';

        for (let i = 0; i < totalDots; i++) {
            const dot = DOM.createElement('div', 'dot');
            dot.onclick = () => this.goToSlide(i);
            this.dotsContainer.appendChild(dot);
        }
    }

    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.update();
    }

    setupTouchEvents() {
        let startX = 0;
        let isDragging = false;

        this.element.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        this.element.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        this.element.addEventListener('touchend', (e) => {
            if (!isDragging) return;

            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;

            if (Math.abs(diffX) > CONFIG.swipeThreshold) {
                this.move(diffX > 0 ? 1 : -1);
            }

            isDragging = false;
        });
    }
}

// Function to generate product HTML
function createProductCard(product, categoryId) {
    const imagePath = `images/${categoryId}/${product.image}`;
    return `
        <div class="product-card">
            <div class="product-image" style="background-image: url('${imagePath}')"></div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
            </div>
        </div>
    `;
}

// Function to generate category section HTML
function createCategorySection(category) {
    const productsHTML = category.products.map(product => createProductCard(product, category.id)).join('');
    return `
        <section class="category-section">
            <h2 class="category-title">${category.title}</h2>
            <div class="carousel-container">
                <div class="carousel" id="${category.id}-carousel">
                    ${productsHTML}
                </div>
            </div>
            <div class="carousel-nav">
                <button class="nav-btn" onclick="carousels['${category.id}'].move(-1)">‹</button>
                <div class="dots-container" id="${category.id}-dots"></div>
                <button class="nav-btn" onclick="carousels['${category.id}'].move(1)">›</button>
            </div>
        </section>
    `;
}

// Function to render all categories
function renderCategories() {
    const mainContainer = document.querySelector('main.container');
    const categoriesHTML = productCategories.map(createCategorySection).join('');
    mainContainer.innerHTML = categoriesHTML;
}

// Initialize carousels
const carousels = {};
function initCarousels() {
    productCategories.forEach(category => {
        carousels[category.id] = new Carousel(category.id, category.products);
        carousels[category.id].init();
    });
}

// Auto-play functionality
function startAutoPlay() {
    setInterval(() => {
        Object.values(carousels).forEach(carousel => carousel.move(1));
    }, CONFIG.autoplayInterval);
}

// Handle window resize
function handleResize() {
    Object.values(carousels).forEach(carousel => {
        carousel.itemsPerView = carousel.calculateItemsPerView();
        carousel.update();
    });
}

// Initialize the application
function init() {
    renderCategories();
    initCarousels();
    startAutoPlay();
    window.addEventListener('resize', handleResize);
}

// Start the application
init(); 