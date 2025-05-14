// Shopping cart with improved logic
let cart = {};
let isCartInitialized = false;
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountDisplay = document.getElementById('cart-count');
const subtotalDisplay = document.getElementById('cart-subtotal');
const discountDisplay = document.getElementById('cart-discount');
const totalDisplay = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const couponInput = document.getElementById('coupon-input');
const applyCouponBtn = document.getElementById('apply-coupon');
const couponMessage = document.getElementById('coupon-message');
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');
const loadingOverlay = document.getElementById('loading-overlay');
const productsContainer = document.getElementById('products-container');

// Initially hide the counter
cartCountDisplay.style.display = 'none';

// Define discount coupons
const validCoupons = {
    'DESCUENTO10': 10,
    'REBAJA20': 20,
    'OFERTA15': 15,
    'SUPER25': 25
};

let currentDiscount = 0;

// Apply coupon
applyCouponBtn.addEventListener('click', () => {
    const couponCode = couponInput.value.toUpperCase().trim();
    
    if (validCoupons[couponCode]) {
        currentDiscount = validCoupons[couponCode];
        couponMessage.textContent = `¡Cupón ${couponCode} aplicado! Descuento de ${currentDiscount}%`;
        couponMessage.style.color = 'green';
        updateCart();
    } else {
        currentDiscount = 0;
        couponMessage.textContent = 'Cupón inválido';
        couponMessage.style.color = 'red';
        updateCart();
    }
    
    couponInput.value = '';
});


// Función para agregar oyentes de eventos
function addEventListeners() {
    // Add event to add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productElement = e.target.closest('.product');
            const productName = productElement.getAttribute('data-name');
            const productPrice = parseFloat(productElement.getAttribute('data-price'));
            const productImage = productElement.getAttribute('data-image');

            // Add or increment product
            if (!cart[productName]) {
                cart[productName] = { 
                    price: productPrice, 
                    quantity: 1,
                    image: productImage
                };
            } else {
                cart[productName].quantity++;
            }

            updateCart();
        });
    });

    // Add event to images for lightbox
    document.querySelectorAll('.product-image').forEach(image => {
        image.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightboxModal.style.display = 'flex';
        });
    });
}

// Update cart
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    for (const [name, item] of Object.entries(cart)) {
        subtotal += item.price * item.quantity;

        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('flex', 'items-center', 'bg-white', 'p-4', 'rounded-lg', 'shadow', 'space-x-4', 'mb-2');
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${name}" class="w-20 h-20 object-cover rounded">
            <div class="flex-grow">
                <h3 class="font-semibold">${name}</h3>
                <p class="text-gray-600">$${item.price.toFixed(2)} c/u</p>
            </div>
            <div class="flex items-center space-x-2">
                <button class="quantity-decrease bg-gray-200 px-2 rounded" data-name="${name}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-increase bg-gray-200 px-2 rounded" data-name="${name}">+</button>
                <span class="ml-4 font-bold">$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item ml-2 text-red-500" data-name="${name}">🗑️</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    }

    // Calculate discount and total
    const discountAmount = (subtotal * currentDiscount) / 100;
    const shippingCost = subtotal > 0 ? 5.99 : 0;
    const total = subtotal - discountAmount + shippingCost;

    // Update counters and totals
    const totalQuantity = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    
    // Only show the counter if there are products
    if (totalQuantity > 0) {
        cartCountDisplay.textContent = totalQuantity;
        cartCountDisplay.style.display = 'block';
        isCartInitialized = true;
    } else {
        cartCountDisplay.style.display = 'none';
        isCartInitialized = false;
    }

    subtotalDisplay.textContent = `$${subtotal.toFixed(2)}`;
    discountDisplay.textContent = `-$${discountAmount.toFixed(2)}`;
    totalDisplay.textContent = `$${total.toFixed(2)}`;
}

// Close cart
closeCartBtn.addEventListener('click', () => {
    cartModal.classList.add('hidden');
});

// Handle product quantity decrease
cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('quantity-decrease')) {
        const productName = e.target.getAttribute('data-name');
        if (cart[productName].quantity > 1) {
            cart[productName].quantity--;
        } else {
            delete cart[productName];
        }
        updateCart();
    }

    if (e.target.classList.contains('quantity-increase')) {
        const productName = e.target.getAttribute('data-name');
        cart[productName].quantity++;
        updateCart();
    }

    if (e.target.classList.contains('remove-item')) {
        const productName = e.target.getAttribute('data-name');
        delete cart[productName];
        updateCart();
    }
});

// Handle cart icon click event
cartIcon.addEventListener('click', () => {
    if (isCartInitialized) {
        cartModal.classList.toggle('hidden');
    }
});

// Handle WhatsApp checkout
checkoutBtn.addEventListener('click', () => {
    let message = 'Hola, estoy interesado en los siguientes productos:\n\n';
    let subtotal = 0;
    
    for (const [name, item] of Object.entries(cart)) {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        message += `${item.quantity} x ${name} - $${item.price.toFixed(2)} c/u = $${itemTotal.toFixed(2)}\n`;
    }
    
    const discountAmount = (subtotal * currentDiscount) / 100;
    const shippingCost = 5.99;
    const total = subtotal - discountAmount + shippingCost;
    
    message += `\nSubtotal: $${subtotal.toFixed(2)}\n`;
    message += `Descuento (${currentDiscount}%): -$${discountAmount.toFixed(2)}\n`;
    message += `Envío: $${shippingCost.toFixed(2)}\n`;
    message += `Total: $${total.toFixed(2)}\n`;

    const whatsappUrl = `https://wa.me/+5491130207987?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    cart = {}; // Empty the cart
    updateCart(); // Update cart view
    cartModal.classList.add('hidden'); // Close the modal
});

// Function to reload prices
function refreshPrices() {
    fetchData();
}

