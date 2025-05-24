// Product data
const productCategories = [
    {
        id: 'wall-art',
        title: 'Wall Art',
        products: [
            {
                image: 'images/wall-art-1.jpg',
                name: 'Rustic Wood Canvas',
                description: 'A beautiful piece featuring reclaimed wood and natural textures. Perfect for adding warmth to your living room or bedroom. Hand-painted details make each piece unique.'
            },
            {
                image: 'images/wall-art-2.jpg',
                name: 'Abstract Metal Sculpture',
                description: 'Modern abstract design crafted from recycled metal. Creates stunning shadows and adds a contemporary touch to any space. Weather-resistant for indoor and outdoor use.'
            },
            {
                image: 'images/wall-art-3.jpg',
                name: 'Botanical Print Series',
                description: 'Hand-pressed botanical prints on vintage paper. Each print captures the delicate beauty of nature. Available as a set or individual pieces for custom arrangements.'
            },
            {
                image: 'images/wall-art-4.jpg',
                name: 'Macrame Wall Hanging',
                description: 'Intricate macrame design using natural cotton cord. Brings texture and bohemian charm to any wall. Each knot is hand-tied with care and attention to detail.'
            }
        ]
    },
    {
        id: 'table-decor',
        title: 'Table Decor',
        products: [
            {
                image: 'images/table-1.jpg',
                name: 'Ceramic Vase Set',
                description: 'Hand-thrown ceramic vases with glazed finish. Perfect for fresh or dried flowers. The organic shapes and earthy tones complement any dining table setting.'
            },
            {
                image: 'images/table-2.jpg',
                name: 'Wooden Candle Holders',
                description: 'Carved from sustainable hardwood with natural oil finish. Creates warm ambient lighting for dinner parties. Available in various sizes for layered lighting effects.'
            },
            {
                image: 'images/table-3.jpg',
                name: 'Woven Table Runner',
                description: 'Hand-woven using traditional techniques with natural fibers. Adds texture and color to your dining experience. Machine washable and designed to last for years.'
            },
            {
                image: 'images/table-4.jpg',
                name: 'Artisan Centerpiece Bowl',
                description: 'Large decorative bowl crafted from reclaimed wood. Perfect for fruit display or as a standalone centerpiece. Each bowl showcases unique wood grain patterns.'
            }
        ]
    },
    {
        id: 'lighting',
        title: 'Lighting',
        products: [
            {
                image: 'images/lighting-1.jpg',
                name: 'Edison Bulb Chandelier',
                description: 'Industrial-style chandelier featuring vintage Edison bulbs and reclaimed metal framework. Perfect statement piece for dining rooms or entryways. Dimmable for ambiance control.'
            },
            {
                image: 'images/lighting-2.jpg',
                name: 'Himalayan Salt Lamp',
                description: 'Hand-carved from authentic Himalayan pink salt crystal. Creates a warm, soothing glow while naturally purifying the air. Each lamp has unique crystal formations.'
            },
            {
                image: 'images/lighting-3.jpg',
                name: 'Bamboo Floor Lamp',
                description: 'Sustainable bamboo construction with handmade paper shade. Provides soft, diffused lighting perfect for reading corners. Lightweight yet sturdy design with natural finish.'
            },
            {
                image: 'images/lighting-4.jpg',
                name: 'Copper Wire String Lights',
                description: 'Flexible copper wire with warm LED lights. Perfect for creating cozy atmospheres in any room. Battery-powered for easy placement without outlet constraints.'
            }
        ]
    },
    {
        id: 'textiles',
        title: 'Textiles',
        products: [
            {
                image: 'images/textiles-1.jpg',
                name: 'Handwoven Throw Pillows',
                description: 'Soft cotton pillows with intricate woven patterns. Each pillow features unique geometric designs inspired by traditional crafts. Removable covers for easy washing.'
            },
            {
                image: 'images/textiles-2.jpg',
                name: 'Alpaca Wool Blanket',
                description: 'Luxuriously soft blanket made from 100% alpaca wool. Naturally hypoallergenic and temperature-regulating. Perfect for cozy evenings and adds elegance to any sofa.'
            },
            {
                image: 'images/textiles-3.jpg',
                name: 'Vintage-Style Tapestry',
                description: 'Large wall tapestry with vintage-inspired botanical motifs. Hand-printed on sustainable cotton canvas. Creates a stunning focal point for bedrooms or living spaces.'
            },
            {
                image: 'images/textiles-4.jpg',
                name: 'Organic Cotton Curtains',
                description: 'Hand-dyed organic cotton curtains with natural botanical dyes. Available in various earth tones. Provides privacy while filtering natural light beautifully.'
            }
        ]
    }
];

// Carousel functionality
const carousels = {};

// Initialize carousels data structure
productCategories.forEach(category => {
    carousels[category.id] = { currentIndex: 0, itemsPerView: 3 };
});

// Function to generate product HTML
function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image" style="background-image: url('${product.image}')"></div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
            </div>
        </div>
    `;
}

// Function to generate category section HTML
function createCategorySection(category) {
    const productsHTML = category.products.map(createProductCard).join('');
    return `
        <section class="category-section">
            <h2 class="category-title">${category.title}</h2>
            <div class="carousel-container">
                <div class="carousel" id="${category.id}-carousel">
                    ${productsHTML}
                </div>
            </div>
            <div class="carousel-nav">
                <button class="nav-btn" onclick="moveCarousel('${category.id}', -1)">‹</button>
                <div class="dots-container" id="${category.id}-dots"></div>
                <button class="nav-btn" onclick="moveCarousel('${category.id}', 1)">›</button>
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

function updateItemsPerView() {
    const screenWidth = window.innerWidth;
    let itemsPerView;

    if (screenWidth <= 480) {
        itemsPerView = 1;
    } else if (screenWidth <= 768) {
        itemsPerView = 2;
    } else {
        itemsPerView = 3;
    }

    Object.keys(carousels).forEach(category => {
        carousels[category].itemsPerView = itemsPerView;
        updateCarousel(category);
    });
}

function moveCarousel(category, direction) {
    const carousel = carousels[category];
    const carouselElement = document.getElementById(category + '-carousel');
    const totalItems = carouselElement.children.length;
    const maxIndex = Math.max(0, totalItems - carousel.itemsPerView);

    carousel.currentIndex += direction;

    if (carousel.currentIndex < 0) {
        carousel.currentIndex = maxIndex;
    } else if (carousel.currentIndex > maxIndex) {
        carousel.currentIndex = 0;
    }

    updateCarousel(category);
}

function updateCarousel(category) {
    const carousel = carousels[category];
    const carouselElement = document.getElementById(category + '-carousel');
    const cardWidth = 300 + 30; // card width + margins
    const offset = -carousel.currentIndex * cardWidth;

    carouselElement.style.transform = `translateX(${offset}px)`;
    updateDots(category);
}

function createDots(category) {
    const carousel = carousels[category];
    const carouselElement = document.getElementById(category + '-carousel');
    const dotsContainer = document.getElementById(category + '-dots');
    const totalItems = carouselElement.children.length;
    const totalDots = Math.max(1, totalItems - carousel.itemsPerView + 1);

    dotsContainer.innerHTML = '';

    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.onclick = () => goToSlide(category, i);
        dotsContainer.appendChild(dot);
    }
}

function updateDots(category) {
    const dots = document.querySelectorAll(`#${category}-dots .dot`);
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === carousels[category].currentIndex);
    });
}

function goToSlide(category, index) {
    carousels[category].currentIndex = index;
    updateCarousel(category);
}

// Initialize carousels
function initCarousels() {
    Object.keys(carousels).forEach(category => {
        createDots(category);
        updateCarousel(category);
    });
}

// Auto-play functionality (optional)
function startAutoPlay() {
    setInterval(() => {
        Object.keys(carousels).forEach(category => {
            moveCarousel(category, 1);
        });
    }, 5000); // Change slides every 5 seconds
}

// Event listeners
window.addEventListener('resize', updateItemsPerView);
window.addEventListener('load', () => {
    renderCategories(); // Render the categories first
    updateItemsPerView();
    initCarousels();
    // Uncomment the next line if you want auto-play
    // startAutoPlay();
});

// Touch/swipe support for mobile
function setupTouchEvents() {
    Object.keys(carousels).forEach(category => {
        const carouselElement = document.getElementById(category + '-carousel');
        let startX = 0;
        let isDragging = false;

        carouselElement.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        carouselElement.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        carouselElement.addEventListener('touchend', (e) => {
            if (!isDragging) return;

            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;

            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (diffX > 0) {
                    moveCarousel(category, 1); // Swipe left - next
                } else {
                    moveCarousel(category, -1); // Swipe right - previous
                }
            }

            isDragging = false;
        });
    });
} 