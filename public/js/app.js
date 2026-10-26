// Products data - El Sabor de mi Sofy
const products = [
    {
        id: 1,
        name: "Chunchullo",
        description: "Chunchullo bien doradito y crujiente, ¡riquísimo!",
        price: 5000,
        category: "frituras",
        emoji: "🍖",
        tag: "Favorito",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=400&fit=crop"
    },
    {
        id: 2,
        name: "Arepas Rellenas",
        description: "Arepas calientitas rellenas con lo mejor que te puedas imaginar",
        price: 5000,
        category: "arepas",
        emoji: "🫓",
        tag: "Calentitas",
        image: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=500&h=400&fit=crop"
    },
    {
        id: 3,
        name: "Arepa con Chorizo",
        description: "Arepa calientita con chorizo bien doradito, ¡una delicia!",
        price: 7000,
        category: "arepas",
        emoji: "🫓",
        tag: "Nuevo",
        image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=500&h=400&fit=crop"
    },
    {
        id: 4,
        name: "Gaseosa Postobón",
        description: "Gaseosa Postobón bien fría para acompañar tu pedido",
        price: 2500,
        category: "bebidas",
        emoji: "🥤",
        tag: "Fría",
        image: "https://images.unsplash.com/photo-1546554137-f86b9593a222?w=500&h=400&fit=crop"
    },
    {
        id: 5,
        name: "Coca-Cola",
        description: "Coca-Cola bien helada, el clásico que nunca falla",
        price: 3000,
        category: "bebidas",
        emoji: "🥤",
        tag: "Clásico",
        image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&h=400&fit=crop"
    },
    {
        id: 6,
        name: "Pinchos de Cerdo",
        description: "Pinchos de cerdo jugosos a la parrilla, una delicia",
        price: 7000,
        category: "pinchos",
        emoji: "🍢",
        tag: "A la parrilla",
        image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500&h=400&fit=crop"
    }
];

// Cart
let cart = [];

// Initialize the website
function init() {
    renderProducts();
    setupEventListeners();
}

// Render products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card glass';
        
        productCard.innerHTML = `
            <div class="product-image">
                ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:4rem\\'>${product.emoji}</span>' + (product.tag ? '<span class=\\'product-tag\\'>${product.tag}</span>' : '');">
            </div>
            <div class="product-content">
                <div class="product-header">
                    <h3 class="product-name">${product.name}</h3>
                    <span class="product-price">$${product.price.toLocaleString('es-CO')}</span>
                </div>
                <p class="product-description">${product.description}</p>
                <button class="btn-add" onclick="addToCart(${product.id})">
                    <i class="fas fa-plus"></i>
                    <span>Agregar al carrito</span>
                </button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: 1
        });
    }
    
    updateCart();
    showCart();
}

// Update cart
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartBadge = document.getElementById('cartBadge');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    
    // Update items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Tu carrito está vacío 💕</p>';
        cartTotal.textContent = '$0';
        document.getElementById('btnWhatsapp').disabled = true;
        return;
    }
    
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-emoji">${item.emoji}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${(item.price * item.quantity).toLocaleString('es-CO')}</div>
                <div class="cart-item-controls">
                    <button class="cart-item-btn" onclick="decreaseQuantity(${item.id})">-</button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="cart-item-btn" onclick="increaseQuantity(${item.id})">+</button>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    const total = subtotal + 1500;
    cartTotal.textContent = '$' + total.toLocaleString('es-CO');
    document.getElementById('btnWhatsapp').disabled = cart.length === 0;
}

// Increase quantity
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

// Decrease quantity
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Show cart
function showCart() {
    document.getElementById('cartOverlay').classList.add('active');
    document.getElementById('cartSidebar').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Hide cart
function hideCart() {
    document.getElementById('cartOverlay').classList.remove('active');
    document.getElementById('cartSidebar').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Send order via WhatsApp
function sendOrderWhatsApp() {
    if (cart.length === 0) return;
    
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const domicilio = 1500;
    const total = subtotal + domicilio;
    
    let message = "¡Hola! Quisiera hacer el siguiente pedido a *El Sabor de mi Sofy* 💕\n\n";
    
    cart.forEach(item => {
        message += `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-CO')}\n`;
    });
    
    message += `\n*Subtotal: $${subtotal.toLocaleString('es-CO')}*\n`;
    message += `*Domicilio: $${domicilio.toLocaleString('es-CO')}*\n`;
    message += `*Total: $${total.toLocaleString('es-CO')}*\n\n`;
    message += "Por favor, confirmar disponibilidad y forma de entrega. ¡Gracias! ✨";
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/573209022416?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Setup event listeners
function setupEventListeners() {
    // Cart button
    document.getElementById('cartBtn').addEventListener('click', showCart);
    
    // Cart close
    document.getElementById('cartClose').addEventListener('click', hideCart);
    
    // Cart overlay
    document.getElementById('cartOverlay').addEventListener('click', hideCart);
    
    // WhatsApp button
    document.getElementById('btnWhatsapp').addEventListener('click', sendOrderWhatsApp);
    
    // Close cart on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideCart();
        }
    });
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
