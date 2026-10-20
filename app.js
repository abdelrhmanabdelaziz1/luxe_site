// Restaurant Home Page Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initCategoryFilters();
  initSearch();
  initLocationPicker();
});

// Global Cart State
const cartState = {
  items: [],
  totalPrice: 0,
  totalCount: 0
};

/* ==========================================================================
   1. Promotional Ads Carousel
   ========================================================================== */
let currentSlide = 0;
let carouselInterval = null;

function initCarousel() {
  const track = document.getElementById('adsTrack');
  const slides = document.querySelectorAll('.ad-slide');
  const dots = document.querySelectorAll('#carouselDots .dot');
  const prevBtn = document.getElementById('prevSlideBtn');
  const nextBtn = document.getElementById('nextSlideBtn');

  if (!track || slides.length === 0) return;

  function updateCarousel(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentSlide = index;

    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      resetAutoPlay();
      updateCarousel(currentSlide - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      resetAutoPlay();
      updateCarousel(currentSlide + 1);
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
      resetAutoPlay();
      updateCarousel(slideIndex);
    });
  });

  // Touch swipe support for mobile
  let startX = 0;
  let endX = 0;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 40) {
      resetAutoPlay();
      if (diff > 0) {
        updateCarousel(currentSlide + 1);
      } else {
        updateCarousel(currentSlide - 1);
      }
    }
  }, { passive: true });

  function startAutoPlay() {
    carouselInterval = setInterval(() => {
      updateCarousel(currentSlide + 1);
    }, 4500);
  }

  function resetAutoPlay() {
    clearInterval(carouselInterval);
    startAutoPlay();
  }

  // Pause on hover
  const wrapper = document.querySelector('.ads-carousel-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    wrapper.addEventListener('mouseleave', () => startAutoPlay());
  }

  startAutoPlay();
}

/* ==========================================================================
   2. Category Filtering
   ========================================================================== */
let activeCategory = 'all';

function initCategoryFilters() {
  const chips = document.querySelectorAll('.category-chip, .category-modern-card');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-category');
      filterProducts();
    });
  });
}

function filterProducts() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = (searchInput ? searchInput.value : '').toLowerCase().trim();
  const productCards = document.querySelectorAll('.product-card');
  const emptyState = document.getElementById('emptyState');
  const itemsCount = document.getElementById('itemsCount');

  let visibleCount = 0;

  productCards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    const cardName = card.getAttribute('data-name') || '';
    const cardDesc = (card.querySelector('.product-desc')?.textContent || '').toLowerCase();

    const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
    const matchesSearch = !searchTerm || cardName.includes(searchTerm) || cardDesc.includes(searchTerm);

    if (matchesCategory && matchesSearch) {
      card.style.display = 'flex';
      card.classList.add('animate-fade-in');
      visibleCount++;
    } else {
      card.style.display = 'none';
      card.classList.remove('animate-fade-in');
    }
  });

  if (itemsCount) {
    itemsCount.textContent = `${visibleCount} item${visibleCount === 1 ? '' : 's'}`;
  }

  if (emptyState) {
    emptyState.style.display = visibleCount === 0 ? 'flex' : 'none';
  }
}

function resetFilters() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('clearSearchBtn');
  if (clearBtn) clearBtn.style.display = 'none';

  const chips = document.querySelectorAll('.category-chip, .category-modern-card');
  chips.forEach(c => c.classList.remove('active'));
  const allChip = document.querySelector('.category-chip[data-category="all"], .category-modern-card[data-category="all"]');
  if (allChip) allChip.classList.add('active');

  activeCategory = 'all';
  filterProducts();
}

/* ==========================================================================
   3. Search Filtering
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearchBtn');

  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    if (clearBtn) {
      clearBtn.style.display = searchInput.value.length > 0 ? 'flex' : 'none';
    }
    filterProducts();
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.style.display = 'none';
      searchInput.focus();
      filterProducts();
    });
  }

  const filterBtn = document.getElementById('filterBtn');
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      showToast('Filters: Sorted by popularity & ratings');
    });
  }
}

/* ==========================================================================
   4. Cart & Order Functionality
   ========================================================================== */
function handleAddToCart(name, price, buttonElement) {
  // Update state
  cartState.items.push({ name, price });
  cartState.totalCount += 1;
  cartState.totalPrice += price;

  // Visual button feedback
  if (buttonElement) {
    const originalHtml = buttonElement.innerHTML;
    buttonElement.classList.add('added');
    buttonElement.innerHTML = '<i class="fa-solid fa-check"></i> Added';

    setTimeout(() => {
      buttonElement.classList.remove('added');
      buttonElement.innerHTML = originalHtml;
    }, 1200);
  }

  updateCartUI();
  showToast(`Added "${name}" to cart!`);
}

function quickAddToCart(name, price) {
  handleAddToCart(name, price, null);
}

function updateCartUI() {
  const floatingBar = document.getElementById('floatingCartBar');
  const badgeCount = document.getElementById('cartBadgeCount');
  const totalPrice = document.getElementById('cartTotalPrice');
  const navCartCount = document.getElementById('navCartCount');

  if (badgeCount) badgeCount.textContent = cartState.totalCount;
  if (totalPrice) totalPrice.textContent = `$${cartState.totalPrice.toFixed(2)}`;

  if (floatingBar) {
    if (cartState.totalCount > 0) {
      floatingBar.classList.add('visible');
    } else {
      floatingBar.classList.remove('visible');
    }
  }

  if (navCartCount) {
    if (cartState.totalCount > 0) {
      navCartCount.textContent = cartState.totalCount;
      navCartCount.style.display = 'flex';
    } else {
      navCartCount.style.display = 'none';
    }
  }
}

function viewOrderSummary() {
  showToast(`Checkout: ${cartState.totalCount} item(s) • Total: $${cartState.totalPrice.toFixed(2)}`);
  setTimeout(() => {
    window.location.href = 'orders.html';
  }, 1000);
}

function openCartModal(event) {
  if (event) event.preventDefault();
  if (cartState.totalCount === 0) {
    showToast('Your cart is empty. Pick some delicious food!');
  } else {
    viewOrderSummary();
  }
}

/* ==========================================================================
   5. Promo Code & Favorites
   ========================================================================== */
function copyPromo(code) {
  navigator.clipboard?.writeText(code).then(() => {
    showToast(`Code "${code}" copied! Discount applied at checkout.`);
  }).catch(() => {
    showToast(`Code "${code}" applied to order!`);
  });
}

function toggleFav(btn) {
  btn.classList.toggle('favorited');
  const icon = btn.querySelector('i');
  if (btn.classList.contains('favorited')) {
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid');
    showToast('Saved to your favorites!');
  } else {
    icon.classList.remove('fa-solid');
    icon.classList.add('fa-regular');
    showToast('Removed from favorites.');
  }
}

/* ==========================================================================
   6. Location Picker & Notifications
   ========================================================================== */
function initLocationPicker() {
  const picker = document.getElementById('locationPicker');
  if (picker) {
    picker.addEventListener('click', () => {
      const locations = ['Smouha, Alexandria', 'Stanley, Alexandria', 'Gleem Bay, Alexandria', 'Miami, Alexandria'];
      const current = picker.querySelector('strong').textContent;
      const nextIndex = (locations.indexOf(current) + 1) % locations.length;
      picker.querySelector('strong').textContent = locations[nextIndex];
      showToast(`Delivery location set to: ${locations[nextIndex]}`);
    });
  }

  const notifBtn = document.getElementById('notifBtn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      showToast('No new notifications. You have active promo discounts!');
    });
  }
}

/* ==========================================================================
   7. Toast Notification Utility
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
  setTimeout(() => toast.classList.remove('show'), 2800);
}
