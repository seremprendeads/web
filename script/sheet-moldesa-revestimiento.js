// Google Sheet Web App URL (replace with your published URL)
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxhHiqNcWTLW5NQTLEDoSyFhW_M4jRGbeFyOQkmtSCOkk4mcBzLU0Eu_AwhZTc-IfLT/exec';

// Product data (will now be loaded from Google Sheets)
const productData = [
    {
        id: "molde-revestimiento",
        name: "Molde de Revestimiento",
        description: "Molde para revestimiento de paredes",
        price: 0,
        image: "img/logo-moldesa.jpg"
    },
    // Otros productos de respaldo...Puedes añadir más
];

// Función para obtener una URL de imagen confiable de Google Drive
function getGoogleDriveImageUrl(fileId) {
    if (!fileId) return 'img/logos-icons/logo-moldesa-negro.png'; // imagen predeterminada
    
    // Intenta varios formatos, empezando por el más confiable
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
}

// Función para extraer el ID de archivo de una URL de Google Drive
function extractGoogleDriveFileId(url) {
    if (!url) return null;
    
    // Buscar el patrón id= en la URL
    const idMatch = url.match(/id=([^&]+)/);
    if (idMatch && idMatch[1]) {
        return idMatch[1];
    }
    
    // Si no se encuentra, devuelve null
    return null;
}

// Function to fetch data from Google Sheets
async function fetchData() {
    const loadingOverlay = document.getElementById('loading-overlay');
    const productsContainer = document.getElementById('products-container');
    
    if (!loadingOverlay || !productsContainer) {
        console.error('Elements not found');
        return { moldes: productData };
    }
    
    try {
        loadingOverlay.style.display = 'flex'; // Show loading overlay
        
        const response = await fetch(SHEET_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data from Google Sheets:', data);
        
        // Process image URLs before rendering
        // Usamos 'moldes' en lugar de 'products'
        if (data.moldes && Array.isArray(data.moldes)) {
            data.moldes.forEach(product => {
                // Procesar la URL de la imagen
                const fileId = extractGoogleDriveFileId(product.image);
                if (fileId) {
                    product.image = getGoogleDriveImageUrl(fileId);
                } else if (product.image) {
                    // Si ya tiene una URL pero no es de Google Drive, la mantenemos
                    product.image = product.image;
                } else {
                    // Si no hay imagen, usamos la predeterminada
                    product.image = 'img/logos-icons/logo-moldesa-negro.png';
                }
            });
        }
        
        renderProducts(data.moldes || []);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        renderProducts(productData); // Load default data in case of error
        return { moldes: productData };
    } finally {
        // Asegurarse de que el overlay de carga se oculte, incluso en caso de error
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none'; // Hide loading overlay
        }
    }
}

// Function to render products
function renderProducts(products) {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) {
        console.error('Products container not found');
        return;
    }
    
    if (!products || products.length === 0) {
        console.error('No products to render');
        productsContainer.innerHTML = '<p class="text-center text-red-500">No se pudieron cargar los moldes de revestimiento.</p>';
        return;
    }
    
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        if (!product.id || !product.name || !product.price) {
            console.warn('Incomplete product data:', product);
            return;
        }
        
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.setAttribute('data-name', product.name);
        productElement.setAttribute('data-price', product.price);
        productElement.setAttribute('data-image', product.image || '');
        
        const imgSrc = product.image || 'img/logos-icons/logo-moldesa-negro.png'; // Fallback image
        
        productElement.innerHTML = `
            <div class="relative">
                <img src="${imgSrc}" alt="${product.name}" class="w-full h-full object-cover product-image rounded-t-lg">
            </div>
            <div class="p-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-blue-900 rounded-b-lg">
                <h3 class="text-xl font-semibold text-gray-200 text-center"><b>${product.name}</b></h3>
                <p class="text-lg font-semibold text-orange-200 text-center">${product.description || ''}</p>
                <div class="flex justify-between items-center mt-2">
                    <span class="text-xl font-bold text-white">$${parseFloat(product.price).toFixed(2)}</span>
                    <button class="add-to-cart bg-green-600 font-bold text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        AGREGAR
                    </button>
                </div>
            </div>
        `;
        
        productsContainer.appendChild(productElement);
    });
    
    // Añadir event listeners a los nuevos botones
    addEventListeners();
    
    // Añadir manejo de errores para las imágenes
    document.querySelectorAll('.product-image').forEach(img => {
        img.onerror = function() {
            console.error('Error al cargar la imagen:', this.src);
            this.src = 'img/logos-icons/logo-moldesa-negro.png'; // Establecer imagen de respaldo
        };
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});