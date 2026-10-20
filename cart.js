// Shared Cart, Catalog & Utility Library for BiteHub (EGP Currency)

const CATALOG = {
  // --- PRODUCTS ---
  'burger-deluxe': {
    id: 'burger-deluxe',
    type: 'burger',
    name: 'Deluxe Double Smash Burger',
    category: 'burgers',
    image: 'images/burger.jpg',
    basePrice: 195, // EGP
    originalPrice: 240,
    rating: 4.9,
    reviews: 184,
    prepTime: '15-20 min',
    calories: '620 kcal',
    description: 'Two seared angus smash patties, melted aged cheddar, crispy smoked beef bacon, caramelized onions, and house secret sauce on a toasted brioche bun.',
    specs: {
      sizes: [
        { name: 'Single Patty (150g)', priceDelta: -45 },
        { name: 'Double Patty (300g)', priceDelta: 0, default: true },
        { name: 'Triple Monster (450g)', priceDelta: 55 }
      ],
      cheese: [
        { name: 'Aged Cheddar', priceDelta: 0, default: true },
        { name: 'Swiss Cheese', priceDelta: 15 },
        { name: 'Pepper Jack (Spicy)', priceDelta: 15 }
      ],
      sauces: [
        { name: 'House Secret Sauce', priceDelta: 0, default: true },
        { name: 'Smoky BBQ Sauce', priceDelta: 0 },
        { name: 'Truffle Mayo', priceDelta: 20 },
        { name: 'Spicy Sriracha', priceDelta: 10 }
      ],
      extras: [
        { name: 'Extra Smoked Bacon', priceDelta: 35 },
        { name: 'Crispy Onion Rings', priceDelta: 25 },
        { name: 'Pickled Jalapeños', priceDelta: 15 },
        { name: 'Fried Farm Egg', priceDelta: 20 }
      ]
    }
  },

  'pizza-margherita': {
    id: 'pizza-margherita',
    type: 'pizza',
    name: 'Artisanal Margherita Pizza',
    category: 'pizza',
    image: 'images/pizza.jpg',
    basePrice: 220, // EGP
    originalPrice: 275,
    rating: 4.8,
    reviews: 142,
    prepTime: '20-25 min',
    calories: '740 kcal',
    description: 'Authentic stone wood-fired pizza with San Marzano tomato sauce, fresh buffalo mozzarella, aromatic sweet basil leaves, and cold-pressed extra virgin olive oil.',
    specs: {
      sizes: [
        { name: 'Medium (10")', priceDelta: -40 },
        { name: 'Large (12")', priceDelta: 0, default: true },
        { name: 'Family Feast (14")', priceDelta: 65 }
      ],
      crusts: [
        { name: 'Classic Neapolitan Thin', priceDelta: 0, default: true },
        { name: 'Cheesy Stuffed Crust', priceDelta: 45 },
        { name: 'Golden Pan Thick Crust', priceDelta: 30 }
      ],
      toppings: [
        { name: 'Extra Buffalo Mozzarella', priceDelta: 35 },
        { name: 'Pepperoni Slices', priceDelta: 40 },
        { name: 'Wild Sautéed Mushrooms', priceDelta: 25 },
        { name: 'Spicy Jalapeños & Olives', priceDelta: 20 }
      ],
      dips: [
        { name: 'Creamy Garlic Ranch Dip', priceDelta: 20 },
        { name: 'Spicy Marinara Dip', priceDelta: 15 }
      ]
    }
  },

  'wings-crispy': {
    id: 'wings-crispy',
    type: 'chicken',
    name: 'Crispy Honey Glazed Wings',
    category: 'chicken',
    image: 'images/wings.jpg',
    basePrice: 165, // EGP
    originalPrice: 210,
    rating: 4.9,
    reviews: 215,
    prepTime: '15-18 min',
    calories: '540 kcal',
    description: 'Golden fried crispy jumbo chicken wings tossed in our signature honey BBQ glaze and toasted sesame seeds, served with herb buttermilk ranch.',
    specs: {
      sizes: [
        { name: '8 Pieces', priceDelta: 0, default: true },
        { name: '12 Pieces', priceDelta: 75 },
        { name: '18 Pieces Party Box', priceDelta: 150 }
      ],
      glazes: [
        { name: 'Honey BBQ Sweet Glaze', priceDelta: 0, default: true },
        { name: 'Classic Buffalo Hot Sauce', priceDelta: 0 },
        { name: 'Garlic Parmesan Butter', priceDelta: 20 }
      ],
      spice: [
        { name: 'Mild & Sweet', priceDelta: 0, default: true },
        { name: 'Medium Zing', priceDelta: 0 },
        { name: 'Extra Fiery Hot', priceDelta: 10 }
      ],
      extras: [
        { name: 'Extra Buttermilk Ranch Dip', priceDelta: 20 },
        { name: 'Crispy Seasoned Curly Fries', priceDelta: 45 }
      ]
    }
  },

  'salad-caesar': {
    id: 'salad-caesar',
    type: 'salad',
    name: 'Grilled Chicken Caesar Bowl',
    category: 'salads',
    image: 'images/salad.jpg',
    basePrice: 145, // EGP
    originalPrice: 175,
    rating: 4.7,
    reviews: 98,
    prepTime: '12-15 min',
    calories: '390 kcal',
    description: 'Marinated tender grilled chicken breast, fresh hass avocado slices, organic crisp romaine lettuce, shaved aged parmesan, and herb garlic croutons.',
    specs: {
      sizes: [
        { name: 'Regular Bowl', priceDelta: 0, default: true },
        { name: 'Super Protein Large Bowl', priceDelta: 45 }
      ],
      dressing: [
        { name: 'Classic Creamy Caesar', priceDelta: 0, default: true },
        { name: 'Light Lemon Vinaigrette', priceDelta: 0 }
      ],
      extras: [
        { name: 'Double Grilled Chicken', priceDelta: 45 },
        { name: 'Extra Avocado Slices', priceDelta: 30 },
        { name: 'Hard Boiled Egg', priceDelta: 15 }
      ]
    }
  },

  'drinks-passion': {
    id: 'drinks-passion',
    type: 'drinks',
    name: 'Sparkling Passion Fruit Mojito',
    category: 'drinks',
    image: 'images/drinks.jpg',
    basePrice: 75, // EGP
    originalPrice: 95,
    rating: 4.9,
    reviews: 160,
    prepTime: '5-8 min',
    calories: '180 kcal',
    description: 'Handcrafted artisan sparkling beverage infused with natural passion fruit nectar, fresh crushed garden mint leaves, lime juice, and sparkling soda.',
    specs: {
      sizes: [
        { name: 'Regular (400ml)', priceDelta: 0, default: true },
        { name: 'Large Jar (650ml)', priceDelta: 25 }
      ],
      ice: [
        { name: 'Regular Ice', priceDelta: 0, default: true },
        { name: 'Less Ice', priceDelta: 0 },
        { name: 'No Ice', priceDelta: 0 }
      ],
      sugar: [
        { name: 'Standard Sweetness', priceDelta: 0, default: true },
        { name: 'Low Sugar', priceDelta: 0 },
        { name: 'Zero Calorie Sweetener', priceDelta: 5 }
      ]
    }
  },

  // --- DEALS & EXCLUSIVE COMBOS ---
  'deal-day-combo': {
    id: 'deal-day-combo',
    type: 'deal',
    name: 'Mega Family Feast Platter (Deal of the Day)',
    category: 'deals',
    image: 'images/deal_combo.jpg',
    basePrice: 420, // EGP
    originalPrice: 825, // 49% OFF!
    discountPercent: 49,
    duration: '24 Hours Only',
    isDealOfDay: true,
    rating: 5.0,
    reviews: 340,
    description: '1 Large Artisan Pizza + 2 Gourmet Smash Burgers + 8 Crispy Wings + Seasoned Curly Fries + 4 Signature Dips. Unbeatable 49% discount for 24h only!',
    specs: {
      pizzaType: [
        { name: 'Artisanal Margherita Pizza', priceDelta: 0, default: true },
        { name: 'Pepperoni & Cheese Feast', priceDelta: 30 },
        { name: 'BBQ Chicken Pizza', priceDelta: 35 }
      ],
      pizzaCrust: [
        { name: 'Classic Thin Crust', priceDelta: 0, default: true },
        { name: 'Cheesy Stuffed Crust', priceDelta: 45 }
      ],
      burgerCheese: [
        { name: 'Double Aged Cheddar', priceDelta: 0, default: true },
        { name: 'Swiss Cheese & Mushrooms', priceDelta: 25 }
      ],
      wingsGlaze: [
        { name: 'Honey BBQ Glaze', priceDelta: 0, default: true },
        { name: 'Fiery Buffalo', priceDelta: 0 }
      ],
      drinks: [
        { name: '1.5L Coca-Cola Bottle', priceDelta: 0, default: true },
        { name: '2x Passion Fruit Mojitos', priceDelta: 45 }
      ]
    }
  },

  'deal-pizza-night': {
    id: 'deal-pizza-night',
    type: 'deal',
    name: 'Duo Pizza & Pasta Italian Night',
    category: 'deals',
    image: 'images/banner2.jpg',
    basePrice: 320, // EGP
    originalPrice: 590, // 46% OFF
    discountPercent: 46,
    duration: 'Ends in 6 Hours',
    rating: 4.8,
    reviews: 190,
    description: 'Any 2 Large Stone-Oven Pizzas + Fresh Cheesy Garlic Bread + 1L Chilled Beverage.',
    specs: {
      pizza1: [
        { name: 'Margherita Fresca (12")', priceDelta: 0, default: true },
        { name: 'Smoky Pepperoni (12")', priceDelta: 25 }
      ],
      pizza2: [
        { name: 'Wild Truffle Mushroom (12")', priceDelta: 0, default: true },
        { name: 'Quattro Formaggi 4-Cheese (12")', priceDelta: 30 }
      ],
      crusts: [
        { name: 'Traditional Hand-Tossed', priceDelta: 0, default: true },
        { name: 'Stuffed Mozzarella Crust', priceDelta: 45 }
      ],
      extras: [
        { name: 'Extra Cheesy Garlic Butter Dip', priceDelta: 20 },
        { name: 'Tiramisu Dessert Cup', priceDelta: 45 }
      ]
    }
  },

  'deal-flash-smash': {
    id: 'deal-flash-smash',
    type: 'deal',
    name: 'Flash Sale: Double Burger & Wings Duo',
    category: 'deals',
    image: 'images/banner1.jpg',
    basePrice: 245, // EGP
    originalPrice: 450, // 45% OFF
    discountPercent: 45,
    duration: 'Flash: 2h 45m left',
    rating: 4.9,
    reviews: 280,
    description: 'Double Angus Smash Burger + 6 Crispy Wings + Seasoned Curly Fries + Soft Drink.',
    specs: {
      pattyStyle: [
        { name: 'Double Angus Patty (300g)', priceDelta: 0, default: true },
        { name: 'Triple Patty (450g)', priceDelta: 50 }
      ],
      cheese: [
        { name: 'Melted Cheddar', priceDelta: 0, default: true },
        { name: 'Swiss Cheese', priceDelta: 15 }
      ],
      wingsSauce: [
        { name: 'Sweet Honey BBQ', priceDelta: 0, default: true },
        { name: 'Buffalo Tangy Hot', priceDelta: 0 }
      ],
      drinks: [
        { name: 'Iced Cola (500ml)', priceDelta: 0, default: true },
        { name: 'Passion Fruit Mojito', priceDelta: 30 }
      ]
    }
  }
};

/* ==========================================================================
   Currency Formatter (EGP)
   ========================================================================== */
function formatEGP(amount) {
  const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  return `${Math.round(num)} EGP`;
}

/* ==========================================================================
   Cart Manager (localStorage backed)
   ========================================================================== */
const CartManager = {
  STORAGE_KEY: 'gourmet_bites_cart_v2',

  getCart() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    this.updateHeaderBadge();
    this.renderDrawer();
  },

  addItem(item) {
    const cart = this.getCart();
    // Check if duplicate with identical options
    const optionsKey = JSON.stringify(item.selectedOptions || {});
    const existingIndex = cart.findIndex(c => c.id === item.id && JSON.stringify(c.selectedOptions || {}) === optionsKey);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += (item.quantity || 1);
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        image: item.image,
        unitPrice: item.unitPrice,
        selectedOptions: item.selectedOptions || {},
        quantity: item.quantity || 1
      });
    }

    this.saveCart(cart);
    showToast(`Added "${item.name}" to cart!`);
  },

  updateQuantity(index, delta) {
    const cart = this.getCart();
    if (!cart[index]) return;

    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    this.saveCart(cart);
  },

  removeItem(index) {
    const cart = this.getCart();
    cart.splice(index, 1);
    this.saveCart(cart);
    showToast('Item removed from cart');
  },

  getTotalCount() {
    return this.getCart().reduce((acc, item) => acc + item.quantity, 0);
  },

  getSubtotal() {
    return this.getCart().reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  },

  updateHeaderBadge() {
    const totalCount = this.getTotalCount();
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.textContent = totalCount;
      if (totalCount > 0) {
        badge.classList.add('visible');
        badge.style.display = 'flex';
      } else {
        badge.classList.remove('visible');
        badge.style.display = 'none';
      }
    });
  },

  openDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartDrawerOverlay');
    if (drawer && overlay) {
      this.renderDrawer();
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  },

  closeDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartDrawerOverlay');
    if (drawer && overlay) {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  },

  renderDrawer() {
    const container = document.getElementById('drawerCartItems');
    const subtotalEl = document.getElementById('drawerSubtotal');
    const deliveryEl = document.getElementById('drawerDeliveryFee');
    const totalEl = document.getElementById('drawerTotalPrice');
    const countLabel = document.getElementById('drawerItemCount');
    const emptyState = document.getElementById('drawerEmptyState');
    const footer = document.getElementById('drawerFooter');

    if (!container) return;

    const cart = this.getCart();
    const subtotal = this.getSubtotal();
    const deliveryFee = subtotal > 300 || subtotal === 0 ? 0 : 25; // Free delivery over 300 EGP
    const total = subtotal + deliveryFee;

    if (countLabel) countLabel.textContent = `${this.getTotalCount()} items`;

    if (cart.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      if (footer) footer.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (footer) footer.style.display = 'block';

    container.innerHTML = cart.map((item, idx) => {
      const optionsArray = [];
      if (item.selectedOptions) {
        Object.entries(item.selectedOptions).forEach(([k, v]) => {
          if (Array.isArray(v)) {
            v.forEach(val => optionsArray.push(val));
          } else if (v) {
            optionsArray.push(v);
          }
        });
      }

      return `
        <div class="drawer-cart-item">
          <img src="${item.image}" alt="${item.name}" class="drawer-item-img" />
          <div class="drawer-item-details">
            <h4>${item.name}</h4>
            ${optionsArray.length ? `<p class="drawer-item-specs">${optionsArray.join(' • ')}</p>` : ''}
            <div class="drawer-item-price">${formatEGP(item.unitPrice * item.quantity)}</div>
          </div>
          <div class="drawer-item-controls">
            <button class="qty-btn" onclick="CartManager.updateQuantity(${idx}, -1)" aria-label="Decrease quantity">
              <i class="fa-solid fa-minus"></i>
            </button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn" onclick="CartManager.updateQuantity(${idx}, 1)" aria-label="Increase quantity">
              <i class="fa-solid fa-plus"></i>
            </button>
            <button class="delete-btn" onclick="CartManager.removeItem(${idx})" aria-label="Remove item">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (subtotalEl) subtotalEl.textContent = formatEGP(subtotal);
    if (deliveryEl) deliveryEl.textContent = deliveryFee === 0 ? 'FREE' : formatEGP(deliveryFee);
    if (totalEl) totalEl.textContent = formatEGP(total);
  },

  checkout() {
    const cart = this.getCart();
    if (cart.length === 0) {
      showToast('Cart is empty. Add delicious food first!');
      return;
    }
    const subtotal = this.getSubtotal();
    const deliveryFee = subtotal > 300 ? 0 : 25;
    const total = subtotal + deliveryFee;

    // Create an active order in localStorage for orders.html
    const newOrder = {
      id: '#EGY-' + Math.floor(1000 + Math.random() * 9000),
      date: 'Just now',
      status: 'In Kitchen',
      statusStep: 2, // 1: Placed, 2: Kitchen, 3: On way, 4: Delivered
      estimatedTime: '25-35 mins',
      courier: 'Captain Mostafa',
      courierPhone: '+20 112 345 6789',
      address: 'Smouha, Victor Emmanuel Sq, Alexandria',
      items: cart,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: total
    };

    localStorage.setItem('active_order', JSON.stringify(newOrder));
    localStorage.removeItem(this.STORAGE_KEY);
    this.updateHeaderBadge();
    this.closeDrawer();

    showToast('Order confirmed! Redirecting to tracking...');
    setTimeout(() => {
      window.location.href = 'orders.html';
    }, 1000);
  }
};

/* ==========================================================================
   Countdown Timers (Deal of the Day & Flash Sale)
   ========================================================================== */
function initTimers() {
  // Deal of the Day (24-hour cycle)
  function updateDealOfDayTimer() {
    const timerEls = document.querySelectorAll('.deal-of-day-timer');
    if (!timerEls.length) return;

    const now = new Date();
    // Midnight reset
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const diffMs = tomorrow - now;

    const h = Math.floor(diffMs / (1000 * 60 * 60));
    const m = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diffMs % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');
    const timeStr = `${pad(h)}h : ${pad(m)}m : ${pad(s)}s`;

    timerEls.forEach(el => {
      el.textContent = timeStr;
    });
  }

  // Flash Sale Timer (3 hours cycle)
  function updateFlashTimer() {
    const timerEls = document.querySelectorAll('.flash-sale-timer');
    if (!timerEls.length) return;

    const now = new Date();
    // Target 3-hour chunks
    const chunkMs = 3 * 60 * 60 * 1000;
    const diffMs = chunkMs - (now.getTime() % chunkMs);

    const h = Math.floor(diffMs / (1000 * 60 * 60));
    const m = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diffMs % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');
    const timeStr = `${pad(h)}h : ${pad(m)}m : ${pad(s)}s`;

    timerEls.forEach(el => {
      el.textContent = timeStr;
    });
  }

  updateDealOfDayTimer();
  updateFlashTimer();
  setInterval(() => {
    updateDealOfDayTimer();
    updateFlashTimer();
  }, 1000);
}

/* ==========================================================================
   Toast Notification
   ========================================================================== */
function showToast(message, type) {
  if (typeof window !== 'undefined' && window.showToast && window.showToast !== showToast) {
    window.showToast(message, type);
    return;
  }
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i><span id="toastMessage">${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

// Inject Shared Cart Drawer HTML into body if not already present
function injectCartDrawer() {
  if (document.getElementById('cartDrawer')) return;

  const drawerHtml = `
    <div class="cart-drawer-overlay" id="cartDrawerOverlay" onclick="CartManager.closeDrawer()"></div>
    <aside class="cart-drawer" id="cartDrawer" aria-label="Shopping Cart">
      <div class="drawer-header">
        <div class="drawer-title-row">
          <i class="fa-solid fa-bag-shopping"></i>
          <h3>My Cart</h3>
          <span class="drawer-count-badge" id="drawerItemCount">0 items</span>
        </div>
        <button class="drawer-close-btn" onclick="CartManager.closeDrawer()" aria-label="Close cart">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="drawer-body">
        <div class="drawer-empty-state" id="drawerEmptyState" style="display: none;">
          <div class="empty-icon"><i class="fa-solid fa-cart-shopping"></i></div>
          <h4>Your cart is hungry!</h4>
          <p>Add your favorite meals, deals, or pizzas to get started.</p>
          <button class="explore-btn" onclick="CartManager.closeDrawer(); window.location.href='deals.html'">
            Explore Hot Deals
          </button>
        </div>

        <div class="drawer-items-list" id="drawerCartItems"></div>
      </div>

      <div class="drawer-footer" id="drawerFooter">
        <div class="drawer-summary-row">
          <span>Subtotal</span>
          <strong id="drawerSubtotal">0 EGP</strong>
        </div>
        <div class="drawer-summary-row">
          <span>Delivery Fee <small style="color:var(--green)">(Free over 300 EGP)</small></span>
          <strong id="drawerDeliveryFee">25 EGP</strong>
        </div>
        <div class="drawer-total-row">
          <span>Total</span>
          <strong id="drawerTotalPrice">0 EGP</strong>
        </div>
        <button class="drawer-checkout-btn" onclick="CartManager.checkout()">
          <span>Confirm Order</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </aside>
  `;

  document.body.insertAdjacentHTML('beforeend', drawerHtml);
}

// Initialization on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  injectCartDrawer();
  CartManager.updateHeaderBadge();
  initTimers();

  // Attach cart triggers
  document.querySelectorAll('.open-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      CartManager.openDrawer();
    });
  });
});
