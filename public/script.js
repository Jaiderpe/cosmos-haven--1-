// Services Data
const SERVICES = [
  {
    id: "fumigation",
    name: "Fumigación General",
    characteristics: [],
    price: 999,
    icon: "💨",
  },
  {
    id: "cockroaches",
    name: "Control de Cucarachas",
    characteristics: [],
    price: 1999,
    icon: "🦗",
  },
  {
    id: "termites",
    name: "Control de Termitas",
    characteristics: [],
    price: 1599,
    icon: "🪲",
  },
  {
    id: "disinfection",
    name: "Desinfección Total",
    characteristics: [],
    price: 2499,
    icon: "🧼",
  },
  {
    id: "ants",
    name: "Control de Hormigas",
    characteristics: [],
    price: 799,
    icon: "🐜",
  },
  {
    id: "rodents",
    name: "Control de Roedores",
    characteristics: [],
    price: 1299,
    icon: "🐭",
  },
];

// Cart State
let cart = JSON.parse(localStorage.getItem("marketplace_cart")) || [];

// DOM Elements
const servicesGrid = document.getElementById("servicesGrid");
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const modalOverlay = document.getElementById("modalOverlay");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartBody = document.getElementById("cartBody");
const cartFooter = document.getElementById("cartFooter");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("totalAmount");
const whatsappBtn = document.getElementById("whatsappBtn");
const qrBtn = document.getElementById("qrBtn");
const clearCartBtn = document.getElementById("clearCartBtn");
const continueBtn = document.getElementById("continueBtn");
const ctaBtn = document.getElementById("ctaBtn");

// Initialize
function init() {
  renderServices();
  updateCartUI();
  attachEventListeners();
  addAnimationListeners();
}

// Add animation listeners
function addAnimationListeners() {
  document.addEventListener("scroll", () => {
    const cards = document.querySelectorAll(".service-card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        card.classList.add("visible");
      }
    });
  });
}

// Render Services
function renderServices() {
  servicesGrid.innerHTML = SERVICES.map(
    (service) => `
    <div class="service-card">
      <div class="service-card-header">
        <div class="service-card-icon">${service.icon}</div>
      </div>
      <div class="service-card-content">
        <h3 class="service-card-title">${service.name}</h3>
        <div class="service-card-footer">
          <div class="service-card-price">
            <span class="service-card-price-amount">$${service.price}</span>
          </div>
          <button class="add-to-cart-btn ${isInCart(service.id) ? "in-cart" : ""}" onclick="addToCart('${service.id}')">
            ${isInCart(service.id) ? "✓ Agregado" : "🛒 Agregar"}
          </button>
        </div>
      </div>
    </div>
  `
  ).join("");

  // Trigger animation for visible cards
  setTimeout(() => {
    document
      .querySelectorAll(".service-card")
      .forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add("visible");
      });
  }, 100);
}

// Add to Cart
function addToCart(serviceId) {
  const service = SERVICES.find((s) => s.id === serviceId);
  const existingItem = cart.find((item) => item.id === serviceId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...service,
      quantity: 1,
    });
  }

  saveCart();
  updateCartUI();
  renderServices();

  // Ripple effect
  const btn = event.target;
  rippleEffect(btn);
}

// Ripple Effect Animation
function rippleEffect(button) {
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");
  button.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// Remove from Cart
function removeFromCart(serviceId) {
  cart = cart.filter((item) => item.id !== serviceId);
  saveCart();
  updateCartUI();
  renderServices();
}

// Update Quantity
function updateQuantity(serviceId, change) {
  const item = cart.find((i) => i.id === serviceId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(serviceId);
    } else {
      saveCart();
      updateCartUI();
    }
  }
}

// Check if service is in cart
function isInCart(serviceId) {
  return cart.some((item) => item.id === serviceId);
}

// Calculate Total
function calculateTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Save Cart to LocalStorage
function saveCart() {
  localStorage.setItem("marketplace_cart", JSON.stringify(cart));
}

// Update Cart UI
function updateCartUI() {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = calculateTotal();

  // Update header
  if (itemCount > 0) {
    cartCount.textContent = itemCount;
    cartCount.style.display = "flex";
    cartCount.classList.add("pulse");
    ctaBtn.textContent = `Ver carrito (${itemCount})`;
  } else {
    cartCount.style.display = "none";
    cartCount.classList.remove("pulse");
    ctaBtn.textContent = "Ver carrito (0)";
  }

  // Update modal body
  if (cart.length === 0) {
    cartBody.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
    cartFooter.style.display = "none";
  } else {
    cartBody.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item cart-item-fade">
        <div class="cart-item-icon">${item.icon}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price}</div>
        </div>
        <div class="cart-item-controls">
          <button onclick="updateQuantity('${item.id}', -1)">−</button>
          <span class="cart-item-qty">${item.quantity}</span>
          <button onclick="updateQuantity('${item.id}', 1)">+</button>
        </div>
        <div class="cart-item-total">$${item.price * item.quantity}</div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">🗑️</button>
      </div>
    `
      )
      .join("");
    cartFooter.style.display = "block";
    cartTotal.textContent = `$${total}`;
  }
}

// Open Cart Modal
function openCart() {
  cartModal.classList.add("active");
  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";

  // Add slide animation
  cartModal.style.animation = "slideUp 0.4s ease-out";
}

// Close Cart Modal
function closeCart() {
  cartModal.classList.remove("active");
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

// WhatsApp Payment
function handleWhatsApp() {
  const message = `Hola, me gustaría contratar los siguientes servicios:\n\n${cart
    .map(
      (item) =>
        `• ${item.name} x${item.quantity} - $${item.price * item.quantity}`
    )
    .join("\n")}\n\nTotal: $${calculateTotal()}`;

  // TODO: Replace with your WhatsApp business number
  const phone = "1234567890";
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
}

// QR Payment
function handleQRPayment() {
  // TODO: Replace with your QR payment URL
  alert(
    "Escanea el código QR con tu teléfono para completar el pago de $" +
      calculateTotal()
  );
}

// Clear Cart
function clearCart() {
  if (confirm("¿Estás seguro de que deseas limpiar el carrito?")) {
    cart = [];
    saveCart();
    updateCartUI();
    renderServices();
  }
}

// Attach Event Listeners
function attachEventListeners() {
  cartBtn.addEventListener("click", openCart);
  ctaBtn.addEventListener("click", openCart);
  closeCartBtn.addEventListener("click", closeCart);
  modalOverlay.addEventListener("click", closeCart);
  whatsappBtn.addEventListener("click", handleWhatsApp);
  qrBtn.addEventListener("click", handleQRPayment);
  clearCartBtn.addEventListener("click", clearCart);
  continueBtn.addEventListener("click", closeCart);

  // Close modal on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartModal.classList.contains("active")) {
      closeCart();
    }
  });
}

// Start the app
init();
