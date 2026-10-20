// App-State Engine for BiteHub
// Manages User Profile, Catalog, Smart Cart, Checkout, Tracking, Loyalty, Vouchers, Bilingual Support (EGP)

// Early Direction and Language Bootstrap (Executes synchronously before DOMContentLoaded)
(function initDirAndLang() {
  try {
    const lang = localStorage.getItem('gb_lang_v3') || 'en';
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    if (lang === 'ar') {
      document.documentElement.classList.add('rtl-mode');
    } else {
      document.documentElement.classList.remove('rtl-mode');
    }
  } catch (e) {}
})();

const AppState = {
  STORAGE_KEYS: {
    PROFILE: 'gb_user_profile_v3',
    CART: 'gb_cart_v3',
    FAVORITES: 'gb_favorites_v3',
    RECENTLY_VIEWED: 'gb_recently_viewed_v3',
    ACTIVE_ORDER: 'gb_active_order_v3',
    PAST_ORDERS: 'gb_past_orders_v3',
    VOUCHERS: 'gb_vouchers_v3',
    NOTIFICATIONS: 'gb_notifications_v3',
    LANGUAGE: 'gb_lang_v3'
  },

  // 1. Initial Profile
  defaultProfile: {
    name: 'Ahmed Mohamed',
    nameAr: 'أحمد محمد',
    phone: '+20 100 123 4567',
    email: 'ahmed.mohamed@example.com',
    avatar: 'images/user_avatar.jpg',
    birthday: '1998-05-14',
    city: 'Alexandria',
    addresses: [
      { id: 'addr-1', label: 'Home', labelAr: 'المنزل', address: '14 Victor Emmanuel Sq, Smouha, Alexandria', floor: '4', apt: '12', notes: 'Ring bell 12', isDefault: true },
      { id: 'addr-2', label: 'Office', labelAr: 'العمل', address: 'Arabella Plaza, Stanley Coast Road, Alexandria', floor: '2', apt: 'Office 204', notes: 'Leave at reception', isDefault: false }
    ],
    activeAddressId: 'addr-1',
    loyaltyPoints: 1250,
    loyaltyTier: 'Silver',
    pointsToNextTier: 350,
    referralCode: 'AHMED50',
    referralBonus: 50,
    notificationPrefs: {
      orders: true,
      promotions: true,
      flashSales: true,
      loyalty: true
    }
  },

  // 2. Comprehensive Catalog (7 Categories)
  catalog: {
    // --- BURGERS ---
    'burger-deluxe': {
      id: 'burger-deluxe',
      type: 'burger',
      name: 'Deluxe Double Smash Burger',
      nameAr: 'ديلوكس دبل سماش برجر',
      category: 'burgers',
      image: 'images/burger.jpg',
      basePrice: 195,
      originalPrice: 240,
      discountPercent: 19,
      rating: 4.9,
      reviews: 184,
      prepTime: '15-20 min',
      calories: '620 kcal',
      isPopular: true,
      isBestSeller: true,
      isSpicy: false,
      isVeg: false,
      isNew: false,
      description: 'Two seared angus smash patties, melted aged cheddar, crispy smoked beef bacon, caramelized onions, and house secret sauce on a toasted brioche bun.',
      descriptionAr: 'قطعتان من لحم الأنجوس المشوي، جبن شيدر معتق، لحم بقري مقدد مقرمش، بصل مكرمل وصوص سري خاص في خبز بريوش محمص.',
      ingredients: ['100% Angus Beef', 'Aged Cheddar Cheese', 'Smoked Beef Bacon', 'Caramelized Onions', 'Brioche Bun', 'House Special Sauce'],
      allergens: ['Dairy', 'Gluten', 'Eggs'],
      frequentlyBoughtWith: ['drinks-passion', 'wings-crispy'],
      specs: {
        size: {
          title: 'Patty Selection',
          titleAr: 'اختيار شريحة اللحم',
          required: true,
          type: 'radio',
          options: [
            { id: 'b-single', name: 'Single Patty (150g)', nameAr: 'شريحة واحدة (150جم)', delta: -45 },
            { id: 'b-double', name: 'Double Patty (300g)', nameAr: 'شريحتان (300جم)', delta: 0, default: true },
            { id: 'b-triple', name: 'Triple Monster (450g)', nameAr: 'ثلاث شرائح وحشية (450جم)', delta: 55 }
          ]
        },
        cheese: {
          title: 'Cheese Selection',
          titleAr: 'نوع الجبن',
          required: true,
          type: 'radio',
          options: [
            { id: 'ch-cheddar', name: 'Aged Cheddar', nameAr: 'شيدر معتق', delta: 0, default: true },
            { id: 'ch-swiss', name: 'Swiss Cheese', nameAr: 'جبن سويسري', delta: 15 },
            { id: 'ch-pepperjack', name: 'Spicy Pepper Jack', nameAr: 'بيبر جاك حار', delta: 15 }
          ]
        },
        sauce: {
          title: 'Signature Sauce',
          titleAr: 'الصوص المميز',
          required: true,
          type: 'radio',
          options: [
            { id: 'sc-secret', name: 'House Secret Sauce', nameAr: 'صوص البيت السري', delta: 0, default: true },
            { id: 'sc-bbq', name: 'Smoky BBQ Sauce', nameAr: 'باربيكيو مدخن', delta: 0 },
            { id: 'sc-truffle', name: 'Truffle Mayo', nameAr: 'مايونيز الكمأة', delta: 20 },
            { id: 'sc-sriracha', name: 'Spicy Sriracha', nameAr: 'سيراتشا حارة', delta: 10 }
          ]
        },
        extras: {
          title: 'Add Delicious Extras',
          titleAr: 'إضافات شهية',
          required: false,
          type: 'checkbox',
          maxSelect: 3,
          options: [
            { id: 'ex-bacon', name: 'Extra Smoked Bacon', nameAr: 'بيكون مقدد إضافي', delta: 35 },
            { id: 'ex-onion', name: 'Crispy Onion Rings', nameAr: 'حلقات بصل مقرمشة', delta: 25 },
            { id: 'ex-jalapeno', name: 'Pickled Jalapeños', nameAr: 'هالبينو مخلل', delta: 15 },
            { id: 'ex-egg', name: 'Fried Farm Egg', nameAr: 'بيض مقلي طازج', delta: 20 }
          ]
        }
      }
    },

    'burger-truffle': {
      id: 'burger-truffle',
      type: 'burger',
      name: 'Truffle Mushroom Swiss Burger',
      nameAr: 'برجر المشروم السويسري بصلصة الكمأة',
      category: 'burgers',
      image: 'images/burger_truffle.jpg',
      basePrice: 215,
      originalPrice: 260,
      discountPercent: 17,
      rating: 4.9,
      reviews: 146,
      prepTime: '15-20 min',
      calories: '680 kcal',
      isPopular: true,
      isBestSeller: true,
      isSpicy: false,
      isVeg: false,
      isNew: true,
      description: 'Charbroiled Angus beef patty crowned with melted imported Swiss cheese, butter-sautéed portobello mushrooms, crispy smoked bacon, and house black truffle aioli on a toasted brioche bun.',
      descriptionAr: 'قطعة أنجوس مشوية على اللهب تعلوها جبنة سويسرية ذائبة، فطر بورتوبيلو سوتيه بالزبدة، بيكون مقدد ومايونيز الكمأة السوداء الفاخر في خبز بريوش طازج.',
      ingredients: ['100% Angus Beef', 'Swiss Cheese', 'Portobello Mushrooms', 'Truffle Aioli', 'Smoked Beef Bacon', 'Toasted Brioche Bun'],
      allergens: ['Dairy', 'Gluten', 'Eggs'],
      frequentlyBoughtWith: ['fries-loaded', 'drinks-berry'],
      specs: {
        size: {
          title: 'Patty Selection',
          titleAr: 'اختيار شريحة اللحم',
          required: true,
          type: 'radio',
          options: [
            { id: 'bt-single', name: 'Single Patty (180g)', nameAr: 'شريحة واحدة (180جم)', delta: 0, default: true },
            { id: 'bt-double', name: 'Double Patty (360g)', nameAr: 'شريحتان (360جم)', delta: 55 }
          ]
        },
        truffleExtra: {
          title: 'Truffle Sauce Level',
          titleAr: 'كمية صلصة الكمأة',
          required: true,
          type: 'radio',
          options: [
            { id: 'tr-standard', name: 'Standard Truffle Aioli', nameAr: 'كمية قياسية متوازنة', delta: 0, default: true },
            { id: 'tr-extra', name: 'Extra Truffle Heaven', nameAr: 'كمأة إضافية مضاعفة', delta: 25 }
          ]
        },
        extras: {
          title: 'Add Extras',
          titleAr: 'إضافات لذيذة',
          required: false,
          type: 'checkbox',
          maxSelect: 3,
          options: [
            { id: 'ex-truffle-fries', name: 'Add Truffle Curly Fries', nameAr: 'إضافة بطاطس بالكمأة', delta: 45 },
            { id: 'ex-caramelized', name: 'Extra Caramelized Onions', nameAr: 'بصل مكرمل إضافي', delta: 20 },
            { id: 'ex-bacon-strip', name: 'Double Bacon Strips', nameAr: 'بيكون مقدد مضاعف', delta: 35 }
          ]
        }
      }
    },

    // --- PIZZA ---
    'pizza-margherita': {
      id: 'pizza-margherita',
      type: 'pizza',
      name: 'Artisanal Margherita Pizza',
      nameAr: 'بيتزا مارجريتا إيطالية أصلية',
      category: 'pizza',
      image: 'images/pizza.jpg',
      basePrice: 220,
      originalPrice: 275,
      discountPercent: 20,
      rating: 4.8,
      reviews: 142,
      prepTime: '20-25 min',
      calories: '740 kcal',
      isPopular: true,
      isBestSeller: true,
      isSpicy: false,
      isVeg: true,
      isNew: false,
      description: 'Authentic stone wood-fired pizza with San Marzano tomato sauce, fresh buffalo mozzarella, sweet basil, and extra virgin olive oil.',
      descriptionAr: 'بيتزا إيطالية مخبوزة على الحجر مع صوص طماطم سان مارزانو، موزاريلا بافلو طازجة، ريحان عطري وزيت زيتون بكر.',
      ingredients: ['Italian Flour 00', 'San Marzano Tomatoes', 'Fresh Buffalo Mozzarella', 'Sweet Basil Leaves', 'Cold Pressed Olive Oil'],
      allergens: ['Dairy', 'Gluten'],
      frequentlyBoughtWith: ['drinks-passion', 'dessert-lava'],
      specs: {
        size: {
          title: 'Pizza Size',
          titleAr: 'حجم البيتزا',
          required: true,
          type: 'radio',
          options: [
            { id: 'pz-med', name: 'Medium (10" - 6 slices)', nameAr: 'وسط (10 بوصة - 6 قطع)', delta: -40 },
            { id: 'pz-lrg', name: 'Large (12" - 8 slices)', nameAr: 'كبير (12 بوصة - 8 قطع)', delta: 0, default: true },
            { id: 'pz-fam', name: 'Family Feast (14" - 10 slices)', nameAr: 'عائلي (14 بوصة - 10 قطع)', delta: 65 }
          ]
        },
        crust: {
          title: 'Crust Type',
          titleAr: 'نوع العجينة والأطراف',
          required: true,
          type: 'radio',
          options: [
            { id: 'cr-thin', name: 'Classic Neapolitan Thin', nameAr: 'عجينة رقيقة كلاسيكية', delta: 0, default: true },
            { id: 'cr-stuffed', name: 'Cheesy Stuffed Crust', nameAr: 'أطراف محشوة بالجبن الغني', delta: 45 },
            { id: 'cr-pan', name: 'Golden Pan Thick Crust', nameAr: 'عجينة بان سميكة مقرمشة', delta: 30 }
          ]
        },
        sauce: {
          title: 'Sauce Base',
          titleAr: 'قاعدة الصوص',
          required: true,
          type: 'radio',
          options: [
            { id: 'sc-red', name: 'San Marzano Red Sauce', nameAr: 'صلصة طماطم سان مارزانو', delta: 0, default: true },
            { id: 'sc-white', name: 'Creamy Garlic Alfredo', nameAr: 'صلصة ألفريدو كريمية بالثوم', delta: 20 }
          ]
        },
        cheeseLevel: {
          title: 'Cheese Level',
          titleAr: 'مستوى الجبن',
          required: true,
          type: 'radio',
          options: [
            { id: 'ch-norm', name: 'Standard Mozzarella', nameAr: 'موزاريلا قياسية', delta: 0, default: true },
            { id: 'ch-extra', name: 'Extra Double Mozzarella', nameAr: 'دبل موزاريلا إضافية', delta: 35 }
          ]
        },
        toppings: {
          title: 'Extra Toppings (Up to 3)',
          titleAr: 'إضافات حشوة (حتى 3)',
          required: false,
          type: 'checkbox',
          maxSelect: 3,
          options: [
            { id: 'tp-pep', name: 'Pepperoni Slices', nameAr: 'شرائح بيبيروني بقري', delta: 40 },
            { id: 'tp-mush', name: 'Wild Sautéed Mushrooms', nameAr: 'مشروم طازج سوتيه', delta: 25 },
            { id: 'tp-olive', name: 'Black & Green Olives', nameAr: 'زيتون أسود وأخضر', delta: 15 },
            { id: 'tp-jalapeno', name: 'Fire Jalapeño Peppers', nameAr: 'فلفل هالبينو حار', delta: 20 }
          ]
        }
      }
    },

    'pizza-pepperoni': {
      id: 'pizza-pepperoni',
      type: 'pizza',
      name: 'Spicy Pepperoni & Hot Honey Pizza',
      nameAr: 'بيتزا بيبيروني حارة بالعسل الحار',
      category: 'pizza',
      image: 'images/pizza_pepperoni.jpg',
      basePrice: 245,
      originalPrice: 290,
      discountPercent: 15,
      rating: 4.9,
      reviews: 188,
      prepTime: '20-25 min',
      calories: '810 kcal',
      isPopular: true,
      isBestSeller: true,
      isSpicy: true,
      isVeg: false,
      isNew: true,
      description: 'Artisanal Neapolitan crust loaded with crispy-cup beef pepperoni, rich whole-milk mozzarella, fresh basil, and finished with a hot chili-infused honey drizzle.',
      descriptionAr: 'عجينة نابوليتان الحجرية الفاخرة محشوة ببيبيروني بقري مقرمش، جبنة موزاريلا غنية، ريحان طازج ولمسة من العسل الحار الخاص.',
      ingredients: ['Italian Flour 00', 'San Marzano Tomato Sauce', 'Whole Milk Mozzarella', 'Crisp Beef Pepperoni', 'Hot Chili Honey Drizzle', 'Fresh Basil'],
      allergens: ['Dairy', 'Gluten'],
      frequentlyBoughtWith: ['chicken-tenders', 'drinks-berry'],
      specs: {
        size: {
          title: 'Pizza Size',
          titleAr: 'حجم البيتزا',
          required: true,
          type: 'radio',
          options: [
            { id: 'pp-med', name: 'Medium (10" - 6 slices)', nameAr: 'وسط (10 بوصة - 6 قطع)', delta: -45 },
            { id: 'pp-lrg', name: 'Large (12" - 8 slices)', nameAr: 'كبير (12 بوصة - 8 قطع)', delta: 0, default: true },
            { id: 'pp-fam', name: 'Family (14" - 10 slices)', nameAr: 'عائلي (14 بوصة - 10 قطع)', delta: 65 }
          ]
        },
        crust: {
          title: 'Crust Style',
          titleAr: 'نوع العجينة',
          required: true,
          type: 'radio',
          options: [
            { id: 'pp-cr-thin', name: 'Neapolitan Thin Crust', nameAr: 'عجينة رقيقة كلاسيكية', delta: 0, default: true },
            { id: 'pp-cr-cheese', name: 'Mozzarella Stuffed Crust', nameAr: 'أطراف محشوة موزاريلا', delta: 45 }
          ]
        },
        spiceLevel: {
          title: 'Hot Honey Heat',
          titleAr: 'درجة حرارة العسل الحار',
          required: true,
          type: 'radio',
          options: [
            { id: 'pp-sp-mild', name: 'Mild Zing (Balanced)', nameAr: 'معتدل وحلو', delta: 0, default: true },
            { id: 'pp-sp-fire', name: 'Extra Spicy Fire', nameAr: 'حار جداً نار', delta: 10 }
          ]
        }
      }
    },

    // --- CHICKEN & WINGS ---
    'wings-crispy': {
      id: 'wings-crispy',
      type: 'chicken',
      name: 'Crispy Honey Glazed Wings',
      nameAr: 'أجنحة دجاج مقرمشة بصوص العسل',
      category: 'chicken',
      image: 'images/wings.jpg',
      basePrice: 165,
      originalPrice: 210,
      discountPercent: 21,
      rating: 4.9,
      reviews: 215,
      prepTime: '15-18 min',
      calories: '540 kcal',
      isPopular: true,
      isBestSeller: true,
      isSpicy: true,
      isVeg: false,
      isNew: false,
      description: 'Golden fried crispy jumbo wings tossed in signature honey BBQ glaze and toasted sesame seeds, served with herb buttermilk ranch.',
      descriptionAr: 'أجنحة دجاج مقرمشة ذهبية بصوص الباربيكيو والعسل مع سمسم محمص وصوص رانش طازج.',
      ingredients: ['Fresh Chicken Wings', 'Honey BBQ Glaze', 'Sesame Seeds', 'Herbed Ranch Sauce'],
      allergens: ['Dairy'],
      frequentlyBoughtWith: ['burger-deluxe', 'drinks-passion'],
      specs: {
        size: {
          title: 'Portion Pieces',
          titleAr: 'عدد القطع',
          required: true,
          type: 'radio',
          options: [
            { id: 'wg-8', name: '8 Pieces', nameAr: '8 قطع', delta: 0, default: true },
            { id: 'wg-12', name: '12 Pieces Box', nameAr: '12 قطعة', delta: 75 },
            { id: 'wg-18', name: '18 Pieces Feast', nameAr: '18 قطعة عائلية', delta: 150 }
          ]
        },
        spiciness: {
          title: 'Heat Level',
          titleAr: 'درجة الحرارة',
          required: true,
          type: 'radio',
          options: [
            { id: 'sp-mild', name: 'Mild & Sweet', nameAr: 'معتدل وحلو', delta: 0, default: true },
            { id: 'sp-med', name: 'Medium Zing', nameAr: 'متوسط الحرارة', delta: 0 },
            { id: 'sp-hot', name: 'Extra Fiery Hot', nameAr: 'حار جداً نار', delta: 10 }
          ]
        },
        glaze: {
          title: 'Glaze Flavor',
          titleAr: 'نكهة الصوص',
          required: true,
          type: 'radio',
          options: [
            { id: 'gz-honey', name: 'Honey BBQ Sweet Glaze', nameAr: 'عسل وباربيكيو مميز', delta: 0, default: true },
            { id: 'gz-buff', name: 'Classic Buffalo Tangy', nameAr: 'بافلو كلاسيكي لاذع', delta: 0 },
            { id: 'gz-parm', name: 'Garlic Parmesan Butter', nameAr: 'زبدة الثوم والبارميزان', delta: 20 }
          ]
        },
        side: {
          title: 'Side Choice',
          titleAr: 'طبق جانبي اختياري',
          required: false,
          type: 'checkbox',
          maxSelect: 2,
          options: [
            { id: 'sd-fries', name: 'Seasoned Curly Fries', nameAr: 'بطاطس كيرلي متبلة', delta: 45 },
            { id: 'sd-ranch', name: 'Extra Buttermilk Ranch Dip', nameAr: 'صوص رانش إضافي', delta: 20 }
          ]
        }
      }
    },

    'chicken-tenders': {
      id: 'chicken-tenders',
      type: 'chicken',
      name: 'Nashville Hot Crispy Chicken Tenders',
      nameAr: 'أصابع دجاج ناشفيل المقرمشة الحارة',
      category: 'chicken',
      image: 'images/chicken_tenders.jpg',
      basePrice: 175,
      originalPrice: 220,
      discountPercent: 20,
      rating: 4.8,
      reviews: 165,
      prepTime: '12-16 min',
      calories: '590 kcal',
      isPopular: true,
      isBestSeller: false,
      isSpicy: true,
      isVeg: false,
      isNew: true,
      description: 'Hand-breaded jumbo fresh chicken breast tenders fried to ultra-crispy golden perfection, basted with spiced cayenne hot butter, served with crinkle dill pickles and garlic ranch.',
      descriptionAr: 'أصابع دجاج طازجة متبلة ومقلية لقرمشة ذهبية لا تُقاوم، مغطاة بزبدة شطة ناشفيل الحارة، مع مخلل الخيار وصوص الثوم والرانش.',
      ingredients: ['Fresh Chicken Breast Strips', 'Nashville Cayenne Seasoning', 'Buttermilk Marinade', 'Garlic Ranch Dip', 'Dill Pickles'],
      allergens: ['Dairy', 'Gluten', 'Eggs'],
      frequentlyBoughtWith: ['fries-loaded', 'drinks-passion'],
      specs: {
        portion: {
          title: 'Tenders Quantity',
          titleAr: 'عدد الأصابع',
          required: true,
          type: 'radio',
          options: [
            { id: 'ct-5', name: '5 Jumbo Tenders', nameAr: '5 أصابع جامبو', delta: 0, default: true },
            { id: 'ct-8', name: '8 Jumbo Tenders (Feast)', nameAr: '8 أصابع جامبو (وليمة)', delta: 60 }
          ]
        },
        heat: {
          title: 'Nashville Heat Level',
          titleAr: 'درجة الحرارة والشطة',
          required: true,
          type: 'radio',
          options: [
            { id: 'ct-h-mild', name: 'Southern Mild (No Heat)', nameAr: 'مقرمش بدون شطة (عادي)', delta: 0 },
            { id: 'ct-h-med', name: 'Medium Nashville Zing', nameAr: 'ناشفيل متوسط', delta: 0, default: true },
            { id: 'ct-h-inferno', name: 'Inferno Fire', nameAr: 'نار جهنم إنفيرنو', delta: 15 }
          ]
        },
        dips: {
          title: 'Choose Dipping Sauce',
          titleAr: 'اختر صوص التغميس',
          required: true,
          type: 'radio',
          options: [
            { id: 'ct-dp-ranch', name: 'Herb Buttermilk Ranch', nameAr: 'صوص رانش بالأعشاب', delta: 0, default: true },
            { id: 'ct-dp-honey', name: 'Honey Mustard Dip', nameAr: 'عسل ومستردة', delta: 0 },
            { id: 'ct-dp-garlic', name: 'Creamy Garlic Mayo', nameAr: 'ثومية كريمية فاخرة', delta: 0 }
          ]
        }
      }
    },

    // --- MEALS & BOWLS ---
    'salad-caesar': {
      id: 'salad-caesar',
      type: 'meals',
      name: 'Grilled Chicken Caesar Bowl',
      nameAr: 'طبق سلطة سيزر بالدجاج المشوي',
      category: 'meals',
      image: 'images/salad.jpg',
      basePrice: 145,
      originalPrice: 175,
      discountPercent: 17,
      rating: 4.7,
      reviews: 98,
      prepTime: '12-15 min',
      calories: '390 kcal',
      isPopular: false,
      isBestSeller: false,
      isSpicy: false,
      isVeg: false,
      isNew: true,
      description: 'Marinated tender grilled chicken breast, fresh hass avocado slices, organic crisp romaine lettuce, shaved aged parmesan, and herb garlic croutons.',
      descriptionAr: 'صدور دجاج مشوية متبلة، شرائح أفوكادو طازجة، خس روماني مقرمش، جبن بارميزان معتق وقطع خبز محمصة بالثوم.',
      ingredients: ['Grilled Chicken Breast', 'Hass Avocado', 'Romaine Lettuce', 'Parmesan Cheese', 'Caesar Dressing', 'Garlic Croutons'],
      allergens: ['Dairy', 'Gluten', 'Eggs'],
      frequentlyBoughtWith: ['drinks-passion'],
      specs: {
        size: {
          title: 'Bowl Size',
          titleAr: 'حجم الطبق',
          required: true,
          type: 'radio',
          options: [
            { id: 'sl-reg', name: 'Regular Fresh Bowl', nameAr: 'طبق عادي مشبع', delta: 0, default: true },
            { id: 'sl-super', name: 'Super Protein Large (+30g Protein)', nameAr: 'طبق كبير مضاعف البروتين', delta: 45 }
          ]
        },
        dressing: {
          title: 'Dressing',
          titleAr: 'نوع الصوص',
          required: true,
          type: 'radio',
          options: [
            { id: 'dr-caesar', name: 'Classic Creamy Caesar', nameAr: 'سيزر كريمي كلاسيكي', delta: 0, default: true },
            { id: 'dr-lemon', name: 'Olive Oil & Lemon Vinaigrette', nameAr: 'زيت زيتون وليمون لايت', delta: 0 }
          ]
        },
        extras: {
          title: 'Add Protein & Crunch',
          titleAr: 'إضافات بروتين وقرمشة',
          required: false,
          type: 'checkbox',
          maxSelect: 3,
          options: [
            { id: 'sl-ex-chk', name: 'Double Grilled Chicken', nameAr: 'دجاج مشوي مضاعف', delta: 45 },
            { id: 'sl-ex-avo', name: 'Extra Avocado Slices', nameAr: 'أفوكادو إضافي', delta: 30 },
            { id: 'sl-ex-egg', name: 'Boiled Farm Egg', nameAr: 'بيضة مسلوقة', delta: 15 }
          ]
        }
      }
    },

    'fries-loaded': {
      id: 'fries-loaded',
      type: 'meals',
      name: 'Loaded Truffle & Cheddar Curly Fries',
      nameAr: 'طبق بطاطس كيرلي محملة بصلصة الكمأة والبيكون',
      category: 'meals',
      image: 'images/fries_loaded.jpg',
      basePrice: 125,
      originalPrice: 155,
      discountPercent: 19,
      rating: 4.8,
      reviews: 132,
      prepTime: '10-12 min',
      calories: '490 kcal',
      isPopular: true,
      isBestSeller: false,
      isSpicy: false,
      isVeg: false,
      isNew: true,
      description: 'Crispy seasoned spiral curly fries smothered in warm molten Wisconsin cheddar, crispy smoked bacon crumbles, freshly grated parmesan, chives, and truffle mayo swirl.',
      descriptionAr: 'بطاطس كيرلي حلزونية مقرمشة مغطاة بجبن الشيدر الذائب الساخن، قطع بيكون مقدد، جبن بارميزان مبشور، بصل أخضر وصلصة مايونيز الكمأة.',
      ingredients: ['Seasoned Curly Potatoes', 'Aged Cheddar Cheese Sauce', 'Smoked Beef Bacon Bits', 'Grated Parmesan', 'Truffle Mayo', 'Fresh Chives'],
      allergens: ['Dairy', 'Gluten'],
      frequentlyBoughtWith: ['burger-deluxe', 'drinks-passion'],
      specs: {
        size: {
          title: 'Portion Size',
          titleAr: 'حجم الطبق',
          required: true,
          type: 'radio',
          options: [
            { id: 'fr-reg', name: 'Regular Shareable Bowl', nameAr: 'طبق عادي للمشاركة', delta: 0, default: true },
            { id: 'fr-giant', name: 'Giant Loaded Platter', nameAr: 'طبق عملاق عائلي', delta: 45 }
          ]
        },
        spice: {
          title: 'Jalapeño Kick',
          titleAr: 'إضافة هالبينو',
          required: false,
          type: 'checkbox',
          options: [
            { id: 'fr-jal', name: 'Add Pickled Jalapeños', nameAr: 'إضافة شرائح هالبينو حارة', delta: 15 }
          ]
        }
      }
    },

    // --- DRINKS ---
    'drinks-passion': {
      id: 'drinks-passion',
      type: 'drinks',
      name: 'Sparkling Passion Fruit Mojito',
      nameAr: 'موهيتو باشن فروت فوار',
      category: 'drinks',
      image: 'images/drinks.jpg',
      basePrice: 75,
      originalPrice: 95,
      discountPercent: 21,
      rating: 4.9,
      reviews: 160,
      prepTime: '5-8 min',
      calories: '180 kcal',
      isPopular: true,
      isBestSeller: true,
      isSpicy: false,
      isVeg: true,
      isNew: false,
      description: 'Handcrafted artisan sparkling beverage with natural passion fruit nectar, fresh crushed garden mint leaves, lime slices, and sparkling soda.',
      descriptionAr: 'مشروب فوار منعش بعصير الباشن فروت الطبيعي، أوراق النعناع الطازجة، شرائح الليمون والصودا الفوارة.',
      ingredients: ['Passion Fruit Puree', 'Fresh Garden Mint', 'Lime Slices', 'Sparkling Soda Water', 'Pure Cane Sugar'],
      allergens: [],
      frequentlyBoughtWith: ['burger-deluxe', 'pizza-margherita'],
      specs: {
        size: {
          title: 'Drink Size',
          titleAr: 'حجم المشروب',
          required: true,
          type: 'radio',
          options: [
            { id: 'dk-reg', name: 'Regular Glass (400ml)', nameAr: 'كوب وسط (400 مل)', delta: 0, default: true },
            { id: 'dk-lrg', name: 'Large Jar (650ml)', nameAr: 'برطمان كبير (650 مل)', delta: 25 }
          ]
        },
        ice: {
          title: 'Ice Level',
          titleAr: 'مستوى الثلج',
          required: true,
          type: 'radio',
          options: [
            { id: 'ice-reg', name: 'Regular Ice', nameAr: 'ثلج معتدل', delta: 0, default: true },
            { id: 'ice-less', name: 'Less Ice', nameAr: 'ثلج قليل', delta: 0 },
            { id: 'ice-none', name: 'No Ice', nameAr: 'بدون ثلج', delta: 0 }
          ]
        },
        sweetness: {
          title: 'Sweetness',
          titleAr: 'درجة الحلاوة',
          required: true,
          type: 'radio',
          options: [
            { id: 'sw-norm', name: 'Standard Sweetness', nameAr: 'حلاوة عادية', delta: 0, default: true },
            { id: 'sw-less', name: 'Low Sugar', nameAr: 'سكر قليل', delta: 0 },
            { id: 'sw-zero', name: 'Zero Sugar (Stevia)', nameAr: 'بدون سكر (ستيفيا)', delta: 5 }
          ]
        }
      }
    },

    'drinks-berry': {
      id: 'drinks-berry',
      type: 'drinks',
      name: 'Wild Berry Hibiscus Iced Cooler',
      nameAr: 'مشروب الكركديه والتوت البري المثلج',
      category: 'drinks',
      image: 'images/drinks_berry.jpg',
      basePrice: 70,
      originalPrice: 90,
      discountPercent: 22,
      rating: 4.9,
      reviews: 118,
      prepTime: '4-6 min',
      calories: '140 kcal',
      isPopular: true,
      isBestSeller: false,
      isSpicy: false,
      isVeg: true,
      isNew: true,
      description: 'Cold-steeped Egyptian hibiscus blossoms fused with freshly muddled wild blackberries, raspberries, fresh mint sprig, and lemon over cracked crystal ice.',
      descriptionAr: 'كركديه مصري منقوع على البارد مع توت أسود وتوت بري مهروس طازج، نعناع طازج وشريحة ليمون مع ثلج كريستالي منعش.',
      ingredients: ['Egyptian Hibiscus Flowers', 'Wild Blackberries & Raspberries', 'Fresh Mint', 'Lemon Wheel', 'Filtered Ice Spring Water'],
      allergens: [],
      frequentlyBoughtWith: ['pizza-pepperoni', 'burger-truffle'],
      specs: {
        size: {
          title: 'Cup Size',
          titleAr: 'حجم الكوب',
          required: true,
          type: 'radio',
          options: [
            { id: 'db-reg', name: 'Regular 450ml Cup', nameAr: 'كوب وسط 450 مل', delta: 0, default: true },
            { id: 'db-lrg', name: 'Large 700ml Jar', nameAr: 'برطمان كبير 700 مل', delta: 25 }
          ]
        },
        sweetness: {
          title: 'Sweetness',
          titleAr: 'درجة الحلاوة',
          required: true,
          type: 'radio',
          options: [
            { id: 'db-sw-norm', name: 'Balanced Sweetness', nameAr: 'حلاوة معتدلة', delta: 0, default: true },
            { id: 'db-sw-less', name: 'Low Sugar', nameAr: 'سكر قليل', delta: 0 },
            { id: 'db-sw-stevia', name: 'Stevia / Zero Sugar', nameAr: 'ستيفيا بدون سكر', delta: 5 }
          ]
        }
      }
    },

    // --- DESSERTS ---
    'dessert-lava': {
      id: 'dessert-lava',
      type: 'desserts',
      name: 'Molten Chocolate Lava Cake',
      nameAr: 'كيك الشوكولاتة الذائبة (مولتن لافا)',
      category: 'desserts',
      image: 'images/dessert.jpg',
      basePrice: 95,
      originalPrice: 130,
      discountPercent: 27,
      rating: 5.0,
      reviews: 175,
      prepTime: '10-12 min',
      calories: '480 kcal',
      isPopular: true,
      isBestSeller: true,
      isSpicy: false,
      isVeg: true,
      isNew: true,
      description: 'Warm rich Belgian chocolate cake with a molten chocolate center that flows when cut, served with a scoop of real vanilla gelato and berries.',
      descriptionAr: 'كيك شوكولاتة بلجيكية دافئة وغنية بقلب شوكولاتة سائلة، تقدم مع بولة آيس كريم فانيليا إيطالية وتوت طازج.',
      ingredients: ['Belgian Dark Chocolate', 'Farm Butter', 'Flour', 'Eggs', 'Vanilla Bean Gelato', 'Fresh Raspberries'],
      allergens: ['Dairy', 'Gluten', 'Eggs'],
      frequentlyBoughtWith: ['pizza-margherita', 'drinks-passion'],
      specs: {
        iceCream: {
          title: 'Gelato Flavor',
          titleAr: 'نكهة الآيس كريم',
          required: true,
          type: 'radio',
          options: [
            { id: 'gl-vanilla', name: 'Madagascar Vanilla Bean', nameAr: 'فانيليا مدغشقر الأصلية', delta: 0, default: true },
            { id: 'gl-choc', name: 'Dark Chocolate Gelato', nameAr: 'شوكولاتة داكنة', delta: 15 },
            { id: 'gl-pistachio', name: 'Roasted Pistachio', nameAr: 'فستق محمص فاخر', delta: 25 }
          ]
        },
        toppings: {
          title: 'Extra Drizzles & Crunch',
          titleAr: 'إضافات وتزيين اختياري',
          required: false,
          type: 'checkbox',
          maxSelect: 2,
          options: [
            { id: 'ds-fudge', name: 'Extra Warm Caramel Drizzle', nameAr: 'كراميل دافئ إضافي', delta: 15 },
            { id: 'ds-nuts', name: 'Crushed Candied Hazelnuts', nameAr: 'بندق مكرمل مقرمش', delta: 20 },
            { id: 'ds-berries', name: 'Extra Wild Berries', nameAr: 'توت بري طازج', delta: 20 }
          ]
        }
      }
    },

    'dessert-cheesecake': {
      id: 'dessert-cheesecake',
      type: 'desserts',
      name: 'Lotus Biscoff Crunch Cheesecake',
      nameAr: 'تشيز كيك لوتس بسكوف المقرمش',
      category: 'desserts',
      image: 'images/dessert_cheesecake.jpg',
      basePrice: 110,
      originalPrice: 140,
      discountPercent: 21,
      rating: 5.0,
      reviews: 210,
      prepTime: '5-8 min',
      calories: '520 kcal',
      isPopular: true,
      isBestSeller: true,
      isSpicy: false,
      isVeg: true,
      isNew: true,
      description: 'Velvety New York style cheesecake built on a buttery caramelized Lotus biscuit crust, drizzled with warm melted Biscoff spread and topped with crushed biscuits.',
      descriptionAr: 'تشيز كيك نيويورك مخملية غنية على قاعدة من بسكويت لوتس المقرمش بالزبدة، مغطاة بطبقة دافئة من زبدة لوتس المذابة وقطع البسكويت.',
      ingredients: ['Cream Cheese', 'Belgian Lotus Biscoff Spread', 'Caramelized Biscuit Base', 'Fresh Whipped Cream', 'Vanilla'],
      allergens: ['Dairy', 'Gluten', 'Eggs'],
      frequentlyBoughtWith: ['drinks-berry', 'burger-deluxe'],
      specs: {
        crust: {
          title: 'Crust Thickness',
          titleAr: 'سُمك قاعدة البسكويت',
          required: true,
          type: 'radio',
          options: [
            { id: 'lc-norm', name: 'Standard Lotus Crust', nameAr: 'قاعدة لوتس كلاسيكية', delta: 0, default: true },
            { id: 'lc-extra', name: 'Extra Thick Crunchy Crust', nameAr: 'قاعدة مقرمشة مضاعفة', delta: 20 }
          ]
        },
        extraDrizzle: {
          title: 'Extra Drizzles',
          titleAr: 'صوص إضافي',
          required: false,
          type: 'checkbox',
          options: [
            { id: 'lc-drizzle', name: 'Extra Warm Biscoff Shot', nameAr: 'شوت زبدة لوتس دافئة إضافية', delta: 25 },
            { id: 'lc-gelato', name: 'Add Vanilla Gelato Scoop', nameAr: 'إضافة بولة آيس كريم فانيليا', delta: 30 }
          ]
        }
      }
    },

    // --- DEALS & EXCLUSIVE COMBOS ---
    'deal-day-combo': {
      id: 'deal-day-combo',
      type: 'deal',
      name: 'Mega Family Feast Platter',
      nameAr: 'وليمة العائلة الكبرى (عرض اليوم)',
      category: 'deals',
      image: 'images/deal_combo.jpg',
      basePrice: 420,
      originalPrice: 825,
      discountPercent: 49,
      duration: '24 Hours Only',
      isDealOfDay: true,
      rating: 5.0,
      reviews: 340,
      description: '1 Large Artisan Pizza + 2 Gourmet Smash Burgers + 8 Crispy Wings + Seasoned Curly Fries + 4 Signature Dips + 1.5L Beverage. Unbeatable 49% discount!',
      descriptionAr: 'بيتزا كبيرة فاخرة + 2 برجر أنجوس سماش + 8 أجنحة دجاج مقرمشة + بطاطس كيرلي + 4 صوصات + زجاجة لتر ونصف. خصم استثنائي 49%!',
      ingredients: ['Pizza of Choice', '2 Burgers of Choice', '8 Honey Wings', 'Curly Fries', '4 Dips', '1.5L Beverage'],
      allergens: ['Dairy', 'Gluten', 'Eggs'],
      frequentlyBoughtWith: ['dessert-lava', 'drinks-passion'],
      specs: {
        pizzaChoice: {
          title: 'Included Pizza (12" Large)',
          titleAr: 'اختر البيتزا الكبيرة',
          required: true,
          type: 'radio',
          options: [
            { id: 'dp-margherita', name: 'Artisanal Margherita Fresca', nameAr: 'مارجريتا إيطالية أصلية', delta: 0, default: true },
            { id: 'dp-pepperoni', name: 'Smoky Pepperoni & Cheese', nameAr: 'بيبيروني وجبن مدخن', delta: 30 },
            { id: 'dp-bbqchicken', name: 'BBQ Charred Chicken Pizza', nameAr: 'بيتزا دجاج بالباربيكيو', delta: 35 }
          ]
        },
        crustChoice: {
          title: 'Pizza Crust Style',
          titleAr: 'عجينة البيتزا',
          required: true,
          type: 'radio',
          options: [
            { id: 'dc-thin', name: 'Classic Thin Crust', nameAr: 'عجينة رقيقة', delta: 0, default: true },
            { id: 'dc-stuffed', name: 'Cheesy Stuffed Crust', nameAr: 'أطراف محشوة جبن', delta: 45 }
          ]
        },
        burgerCheese: {
          title: 'Burgers Cheese Style',
          titleAr: 'نوع جبن البرجر',
          required: true,
          type: 'radio',
          options: [
            { id: 'db-cheddar', name: 'Double Aged Cheddar', nameAr: 'شيدر معتق دبل', delta: 0, default: true },
            { id: 'db-swiss', name: 'Swiss Cheese & Mushrooms', nameAr: 'سويسري مع مشروم', delta: 25 }
          ]
        },
        wingsGlaze: {
          title: 'Wings Glaze Flavor',
          titleAr: 'نكهة الأجنحة',
          required: true,
          type: 'radio',
          options: [
            { id: 'dw-honey', name: 'Honey BBQ Sweet Glaze', nameAr: 'عسل وباربيكيو حلو', delta: 0, default: true },
            { id: 'dw-buffalo', name: 'Fiery Buffalo Hot', nameAr: 'بافلو حار ناري', delta: 0 }
          ]
        },
        drinkChoice: {
          title: 'Included 1.5L Beverage',
          titleAr: 'المشروب العائلي',
          required: true,
          type: 'radio',
          options: [
            { id: 'dd-cola', name: '1.5L Coca-Cola Bottle', nameAr: 'كوكاكولا 1.5 لتر', delta: 0, default: true },
            { id: 'dd-sprite', name: '1.5L Sprite Bottle', nameAr: 'سبرايت 1.5 لتر', delta: 0 },
            { id: 'dd-mojitos', name: '2x Passion Fruit Mojitos (Upgrade)', nameAr: '2 كوب موهيتو باشن فروت طازج', delta: 45 }
          ]
        }
      }
    },

    'deal-pizza-night': {
      id: 'deal-pizza-night',
      type: 'deal',
      name: 'Duo Pizza & Pasta Italian Night',
      nameAr: 'ليلة البيتزا والباستا الإيطالية',
      category: 'deals',
      image: 'images/banner2.jpg',
      basePrice: 320,
      originalPrice: 590,
      discountPercent: 46,
      duration: 'Ends in 6 Hours',
      rating: 4.8,
      reviews: 190,
      description: 'Any 2 Large Stone-Oven Pizzas + Fresh Cheesy Garlic Bread + 1L Chilled Beverage.',
      descriptionAr: 'اختيارك من أي 2 بيتزا كبيرة مخبوزة على الحجر + خبز ثوم بالجبن + لتر مشروب منعش.',
      ingredients: ['2 Large Pizzas', 'Cheesy Garlic Bread', '1L Drink'],
      allergens: ['Dairy', 'Gluten'],
      frequentlyBoughtWith: ['wings-crispy', 'drinks-passion'],
      specs: {
        pizza1: {
          title: 'Select Pizza #1',
          titleAr: 'البيتزا الأولى',
          required: true,
          type: 'radio',
          options: [
            { id: 'd2-mrg', name: 'Margherita Fresca (12")', nameAr: 'مارجريتا فريسكا (12")', delta: 0, default: true },
            { id: 'd2-pep', name: 'Smoky Pepperoni (12")', nameAr: 'بيبيروني مدخن (12")', delta: 25 }
          ]
        },
        pizza2: {
          title: 'Select Pizza #2',
          titleAr: 'البيتزا الثانية',
          required: true,
          type: 'radio',
          options: [
            { id: 'd2-mush', name: 'Wild Truffle Mushroom (12")', nameAr: 'مشروم ترفل (12")', delta: 0, default: true },
            { id: 'd2-4ch', name: 'Quattro Formaggi 4-Cheese (12")', nameAr: 'أربعة أجبان فاخرة (12")', delta: 30 }
          ]
        },
        crust: {
          title: 'Crust Style',
          titleAr: 'نوع العجينة',
          required: true,
          type: 'radio',
          options: [
            { id: 'd2-thin', name: 'Traditional Hand-Tossed Thin', nameAr: 'عجينة رقيقة تقليدية', delta: 0, default: true },
            { id: 'd2-stuffed', name: 'Stuffed Mozzarella Crust', nameAr: 'أطراف محشوة موزاريلا', delta: 45 }
          ]
        }
      }
    },

    'deal-flash-smash': {
      id: 'deal-flash-smash',
      type: 'deal',
      name: 'Flash Sale: Double Burger & Wings Duo',
      nameAr: 'فلاش سيل: دبل برجر وأجنحة دجاج',
      category: 'deals',
      image: 'images/banner1.jpg',
      basePrice: 245,
      originalPrice: 450,
      discountPercent: 45,
      duration: 'Flash: 01:42:35 left',
      rating: 4.9,
      reviews: 280,
      description: 'Double Angus Smash Burger with melted cheddar + 6 Crispy Honey BBQ Wings + Seasoned Curly Fries + Soft Drink.',
      descriptionAr: 'برجر أنجوس دبل سماش بالجبن الشيدر + 6 أجنحة دجاج مقرمشة + بطاطس كيرلي + مشروب غازي.',
      ingredients: ['Double Angus Burger', '6 Wings', 'Curly Fries', 'Soft Drink'],
      allergens: ['Dairy', 'Gluten'],
      frequentlyBoughtWith: ['dessert-lava', 'pizza-margherita'],
      specs: {
        pattyStyle: {
          title: 'Burger Patty',
          titleAr: 'حجم البرجر',
          required: true,
          type: 'radio',
          options: [
            { id: 'fs-double', name: 'Double Angus Patty (300g)', nameAr: 'دبل لحم أنجوس (300جم)', delta: 0, default: true },
            { id: 'fs-triple', name: 'Triple Patty (450g)', nameAr: 'ثلاثي أنجوس (450جم)', delta: 50 }
          ]
        },
        wingsSauce: {
          title: 'Wings Sauce',
          titleAr: 'صوص الأجنحة',
          required: true,
          type: 'radio',
          options: [
            { id: 'fs-honey', name: 'Sweet Honey BBQ', nameAr: 'عسل وباربيكيو حلو', delta: 0, default: true },
            { id: 'fs-buff', name: 'Buffalo Tangy Hot', nameAr: 'بافلو حار', delta: 0 }
          ]
        }
      }
    }
  },

  // 3. Vouchers Data
  defaultVouchers: [
    { code: 'WELCOME50', title: '50 EGP Welcome Discount', titleAr: 'خصم ترحيبي 50 ج.م', amount: 50, minOrder: 250, status: 'available', expiry: '30 Nov 2026' },
    { code: 'FEAST50', title: '50% OFF Weekend Feasts', titleAr: 'خصم 50% على الوجبات', percent: 50, maxDiscount: 100, minOrder: 300, status: 'available', expiry: '31 Dec 2026' },
    { code: 'FREEDEL', title: 'Free Delivery Anywhere', titleAr: 'توصيل مجاني لأي مكان', freeDelivery: true, minOrder: 150, status: 'available', expiry: '31 Dec 2026' },
    { code: 'SUMMER20', title: '20 EGP Summer Cooler', titleAr: 'خصم 20 ج.م للصيف', amount: 20, minOrder: 100, status: 'used', expiry: '01 Sep 2026' },
    { code: 'LAUNCH100', title: '100 EGP Grand Opening', titleAr: 'خصم 100 ج.م للافتتاح', amount: 100, minOrder: 500, status: 'expired', expiry: '10 Aug 2026' }
  ],

  // 4. Notifications Data
  defaultNotifications: [
    { id: 'notif-1', title: 'Order #EGY-8942 On the Way!', titleAr: 'طلبك رقم #EGY-8942 في الطريق!', time: '10 mins ago', type: 'order', unread: true },
    { id: 'notif-2', title: 'Flash Sale: 45% OFF Wings & Burger', titleAr: 'فلاش سيل: خصم 45% على البرجر والأجنحة!', time: '1 hour ago', type: 'flash', unread: true },
    { id: 'notif-3', title: 'You earned 50 Loyalty Points!', titleAr: 'حصلت على 50 نقطة مكافآت جديدة!', time: 'Yesterday', type: 'loyalty', unread: false },
    { id: 'notif-4', title: 'Your friend Sara joined using your code!', titleAr: 'صديقتك سارة انضمت باستخدام كودك!', time: '2 days ago', type: 'referral', unread: false }
  ],

  // 5. Helper Methods
  formatEGP(amount) {
    const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
    const isAr = this.getLanguage() === 'ar';
    return isAr ? `${Math.round(num)} ج.م` : `${Math.round(num)} EGP`;
  },

  normalizeText(str) {
    if (!str) return '';
    return str
      .toString()
      .toLowerCase()
      .replace(/[\u064B-\u065F\u0670]/g, '') // remove Arabic diacritics / tashkeel
      .replace(/[أإآآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/[^\w\s\u0600-\u06FF]/g, ' ')
      .trim();
  },

  matchesItem(it, tokens, categoryAliases) {
    const fields = [
      it.name || '',
      it.nameAr || '',
      it.description || '',
      it.descriptionAr || '',
      it.category || '',
      ...(it.ingredients || [])
    ].map(f => this.normalizeText(f));

    const aliases = (categoryAliases[it.category] || []).map(a => this.normalizeText(a));
    const haystack = fields.join(' ') + ' ' + aliases.join(' ');

    return tokens.every(token => haystack.includes(token));
  },

  searchProducts(query = '', category = 'all', tagFilter = 'all') {
    let items = Object.values(this.catalog).filter(it => it.type !== 'deal');

    const categoryAliases = {
      'burgers': ['burger', 'burgers', 'smash', 'patty', 'angus', 'cheddar', 'truffle', 'swiss', 'برجر', 'برغر', 'سماش', 'شيدر', 'سويسري', 'لحم'],
      'pizza': ['pizza', 'pizzas', 'crust', 'mozzarella', 'pepperoni', 'margherita', 'بيتزا', 'موزاريلا', 'بيبيروني', 'مارجريتا'],
      'chicken': ['chicken', 'wings', 'tenders', 'strips', 'crispy', 'honey', 'buffalo', 'nashville', 'دجاج', 'فراخ', 'اجنحه', 'أجنحة', 'اصابع', 'مقرمش', 'استربس', 'ناشفيل'],
      'meals': ['meal', 'meals', 'bowl', 'salad', 'fries', 'caesar', 'curly', 'truffle', 'سلطه', 'سلطة', 'سيزر', 'بطاطس', 'كيرلي', 'وجبه', 'وجبات', 'افوكادو'],
      'drinks': ['drink', 'drinks', 'beverage', 'mojito', 'cooler', 'soda', 'hibiscus', 'passion', 'مشروب', 'مشروبات', 'عصير', 'موهيتو', 'كركديه', 'باشن', 'صودا', 'بارد'],
      'desserts': ['dessert', 'desserts', 'cake', 'cheesecake', 'lava', 'biscoff', 'lotus', 'sweet', 'حلويات', 'حلو', 'كيك', 'تشيز كيك', 'لافا', 'لوتس', 'شوكولاته']
    };

    const hasQuery = query && query.trim().length > 0;
    const cleanQ = this.normalizeText(query);
    const tokens = cleanQ.split(/\s+/).filter(Boolean);

    if (category && category !== 'all' && !hasQuery) {
      items = items.filter(it => it.category === category);
    } else if (category && category !== 'all' && hasQuery) {
      const inCat = items.filter(it => it.category === category);
      const matchesInCat = inCat.filter(it => this.matchesItem(it, tokens, categoryAliases));
      if (matchesInCat.length > 0) {
        items = matchesInCat;
      } else {
        items = items.filter(it => this.matchesItem(it, tokens, categoryAliases));
      }
    } else if (hasQuery) {
      items = items.filter(it => this.matchesItem(it, tokens, categoryAliases));
    }

    if (tagFilter === 'popular') items = items.filter(it => it.isPopular);
    else if (tagFilter === 'bestseller') items = items.filter(it => it.isBestSeller);
    else if (tagFilter === 'spicy') items = items.filter(it => it.isSpicy);
    else if (tagFilter === 'veg') items = items.filter(it => it.isVeg);
    else if (tagFilter === 'new') items = items.filter(it => it.isNew);

    return items;
  },

  getLanguage() {
    return localStorage.getItem(this.STORAGE_KEYS.LANGUAGE) || 'en';
  },

  toggleLanguage() {
    const current = this.getLanguage();
    const next = current === 'ar' ? 'en' : 'ar';
    this.setLanguage(next);
  },

  setLanguage(lang) {
    localStorage.setItem(this.STORAGE_KEYS.LANGUAGE, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    if (lang === 'ar') {
      document.documentElement.classList.add('rtl-mode');
    } else {
      document.documentElement.classList.remove('rtl-mode');
    }
    window.location.reload();
  },

  i18n: {
    en: {
      appName: 'BiteHub',
      tagline: 'Fast Food Hub & Feast Delivery',
      navHome: 'Home',
      navOrders: 'Orders',
      navDeals: 'Deals',
      navProfile: 'Profile',
      greetingMorning: 'Good Morning',
      greetingAfternoon: 'Good Afternoon',
      greetingEvening: 'Good Evening',
      deliverTo: 'Deliver to',
      searchPlaceholder: 'Search burgers, pizzas, wings, deals...',
      trending: 'Trending:',
      allCategories: 'All Categories',
      catAll: 'All',
      catBurgers: 'Burgers',
      catPizzas: 'Pizzas',
      catChicken: 'Wings & Strips',
      catPastas: 'Pastas',
      catDrinks: 'Drinks',
      catDesserts: 'Desserts',
      catDeals: 'Deals',
      orderAgain: 'Order Again',
      orderAgainSubtitle: 'Fast reorder from your past feasts',
      reorderBtn: 'Reorder',
      exploreMenu: 'Explore Menu',
      exploreSubtitle: 'Handcrafted deliciousness prepared fresh to your door in Alexandria',
      filterAll: 'All Items',
      filterPopular: 'Popular',
      filterBestSeller: 'Best Seller',
      filterSpecial: "Chef's Special",
      filterQuick: 'Quick Prep',
      sortBy: 'Sort by:',
      sortRecommended: 'Recommended',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      sortRating: 'Top Rated',
      sortTime: 'Fastest Prep',
      add: 'Add',
      added: 'Added',
      reviews: 'reviews',
      mins: 'min',
      calories: 'kcal',
      allergens: 'Allergens:',
      contains: 'Contains',
      flashSale: 'Flash Sale',
      dealOfDay: 'Deal of the Day',
      specialOffer: 'Special Offer',
      limitedTime: 'Limited Time',
      save: 'Save',
      endsIn: 'Ends in',
      claimDeal: 'Claim Deal',
      customizeDeal: 'Customize & Order',
      customizeItem: 'Customize Item',
      ingredients: 'Fresh Ingredients',
      specifications: 'Item Specifications',
      freqBought: 'Frequently Bought Together',
      specialInstructions: 'Special Cooking Instructions',
      instructionsPlaceholder: 'E.g., No pickles, extra napkins, dressing on the side...',
      addToCart: 'Add to Cart',
      updateCart: 'Update Cart',
      requiredChoose: 'Required (Choose 1)',
      optional: 'Optional',
      included: 'Included',
      myCart: 'My Cart',
      itemsCount: 'items',
      itemCount: 'item',
      cartEmptyTitle: 'Your cart is hungry!',
      cartEmptyDesc: 'Add some delicious meals, deals, or pizzas to get started.',
      exploreDealsBtn: 'Explore Hot Deals',
      promoCodePlaceholder: 'Enter promo code (e.g. WELCOME50)',
      applyBtn: 'Apply',
      subtotal: 'Subtotal',
      voucherDiscount: 'Voucher Discount',
      deliveryCharge: 'Delivery Charge',
      total: 'Total',
      free: 'FREE',
      proceedToCheckout: 'Proceed to Checkout',
      freeDeliveryUnlock: 'Add {diff} more to unlock FREE Delivery!',
      freeDeliveryUnlocked: 'Congratulations! You unlocked FREE Delivery!',
      checkoutTitle: 'Checkout',
      stepMethod: 'Method',
      stepPayment: 'Payment',
      stepReview: 'Review',
      chooseMethod: '1. Choose Delivery Method',
      doorstepDelivery: 'Doorstep Delivery (25-35m)',
      restaurantPickup: 'Restaurant Pickup (15m)',
      selectAddress: 'Select Delivery Address',
      deliveryInstructions: 'Delivery Instructions',
      continueToPayment: 'Continue to Payment',
      back: 'Back',
      selectPaymentMethod: '2. Select Payment Method (EGP)',
      codTitle: 'Cash on Delivery (EGP)',
      codDesc: 'Pay cash when the driver arrives at your door',
      cardTitle: 'Credit / Debit Card',
      cardDesc: 'Visa ending in •••• 4242',
      walletTitle: 'Vodafone Cash Wallet',
      walletDesc: 'Instant mobile wallet transfer',
      reviewOrderTitle: '3. Final Order Review',
      deliveringTo: 'Delivering to',
      paymentVia: 'Payment via',
      placeOrder: 'Place Order (EGP)',
      orderConfirmed: 'Order Confirmed!',
      orderConfirmedDesc: 'We are preparing your feast with fresh ingredients right now.',
      orderNumber: 'Order Number',
      estTime: 'Estimated Time',
      trackLiveOrder: 'Track Live Order',
      notifications: 'Notifications',
      markAllRead: 'Mark all as read',
      chooseDeliveryAddress: 'Choose Delivery Address',
      home: 'Home',
      office: 'Office',
      myOrdersTitle: 'My Orders',
      myOrdersSubtitle: 'Track live delivery & review past meals',
      tabActive: 'Active Order',
      tabPast: 'Past Orders',
      activeTrackingTitle: 'Active Delivery Tracking',
      activeTrackingSubtitle: 'Real-time status updates from our kitchen',
      liveTracking: 'Live Tracking',
      stepPlaced: 'Placed',
      stepConfirmed: 'Confirmed',
      stepPreparing: 'Preparing',
      stepOnTheWay: 'On the Way',
      stepDelivered: 'Delivered',
      estimatedArrival: 'Estimated Arrival',
      yourCourier: 'Your Courier',
      callCourier: 'Call Courier',
      deliveryPin: 'Delivery PIN:',
      givePinDesc: 'Give this 4-digit code to the courier upon delivery',
      cancelOrder: 'Cancel Order',
      pastFeastsTitle: 'Past Feasts & Receipts',
      rateOrderBtn: 'Rate Order',
      viewReceiptBtn: 'View Receipt',
      myAccountTitle: 'My Account',
      myAccountSubtitle: 'Account overview & preferences',
      points: 'Points',
      vouchers: 'Vouchers',
      places: 'Places',
      favorites: 'Favorites',
      groupAccountDelivery: 'Account & Delivery',
      personalInfo: 'Personal Information',
      personalInfoDesc: 'Name, phone, birthday & photo',
      savedAddresses: 'Saved Addresses',
      savedAddressesDesc: 'Manage home, office & other delivery spots',
      paymentMethods: 'Payment Methods',
      paymentMethodsDesc: 'Cards, Vodafone Cash & digital wallets',
      groupRewardsPromos: 'Rewards & Promotions',
      loyaltyRewards: 'Loyalty Rewards',
      loyaltyRewardsDesc: 'Earn points on every order for discounts',
      vouchersOffers: 'Vouchers & Offers',
      vouchersOffersDesc: 'Active promo codes & seasonal savings',
      inviteFriends: 'Invite Friends (Get 50 EGP)',
      inviteFriendsDesc: 'Share your referral code and earn bonus points',
      groupAppSupport: 'App & Support',
      helpSupport: 'Help & Customer Support',
      helpSupportDesc: 'FAQ, live chat & issue reporting',
      settingsPrefs: 'Settings & Preferences',
      settingsPrefsDesc: 'Language, notifications & app controls',
      logOut: 'Log Out',
      backToAccount: 'Back to Account',
      saveChanges: 'Save Changes'
    },
    ar: {
      appName: 'بايت هَب',
      tagline: 'منصة الطعام الأسرع وأشهى الوجبات (ج.م)',
      navHome: 'الرئيسية',
      navOrders: 'الطلبات',
      navDeals: 'العروض',
      navProfile: 'حسابي',
      greetingMorning: 'صباح الخير',
      greetingAfternoon: 'مساء الخير',
      greetingEvening: 'مساء الخير',
      deliverTo: 'التوصيل إلى',
      searchPlaceholder: 'ابحث عن برجر، بيتزا، أجنحة، عروض...',
      trending: 'الأكثر طلباً:',
      allCategories: 'جميع الأقسام',
      catAll: 'الكل',
      catBurgers: 'برجر',
      catPizzas: 'بيتزا',
      catChicken: 'دجاج وأجنحة',
      catPastas: 'باستا',
      catDrinks: 'مشروبات',
      catDesserts: 'حلويات',
      catDeals: 'عروض خاصة',
      orderAgain: 'اطلب مجدداً',
      orderAgainSubtitle: 'إعادة طلب سريعة من وجباتك السابقة',
      reorderBtn: 'إعادة الطلب',
      exploreMenu: 'تصفح القائمة',
      exploreSubtitle: 'تشكيلة أطباق شهية ومحضرة بعناية تصلك ساخنة في الإسكندرية',
      filterAll: 'جميع الأطباق',
      filterPopular: 'الأكثر شهرة',
      filterBestSeller: 'الأكثر مبيعاً',
      filterSpecial: 'مميز الشيف',
      filterQuick: 'سريع التحضير',
      sortBy: 'ترتيب حسب:',
      sortRecommended: 'الموصى به',
      sortPriceAsc: 'السعر: من الأقل للأعلى',
      sortPriceDesc: 'السعر: من الأعلى للأقل',
      sortRating: 'الأعلى تقييماً',
      sortTime: 'الأسرع تحضيراً',
      add: 'إضافة',
      added: 'تمت الإضافة',
      reviews: 'تقييم',
      mins: 'دقيقة',
      calories: 'سعرة',
      allergens: 'مسببات الحساسية:',
      contains: 'يحتوي على',
      flashSale: 'فلاش سيل',
      dealOfDay: 'عرض اليوم',
      specialOffer: 'عرض خاص',
      limitedTime: 'لفترة محدودة',
      save: 'وفّر',
      endsIn: 'ينتهي خلال',
      claimDeal: 'اطلب العرض',
      customizeDeal: 'تخصيص وطلب العرض',
      customizeItem: 'تخصيص الوجبة',
      ingredients: 'المكونات الطازجة',
      specifications: 'خيارات وإضافات الوجبة',
      freqBought: 'غالباً يُطلب معاً',
      specialInstructions: 'تعليمات خاصة للمطبخ',
      instructionsPlaceholder: 'مثال: بدون مخلل، صوص إضافي جانبي، مناديل إضافية...',
      addToCart: 'أضف للسلة',
      updateCart: 'تحديث السلة',
      requiredChoose: 'إجباري (اختر 1)',
      optional: 'اختياري',
      included: 'مشمول بالسعر',
      myCart: 'سلة الطلبات',
      itemsCount: 'أصناف',
      itemCount: 'صنف',
      cartEmptyTitle: 'سلتك جائعة!',
      cartEmptyDesc: 'أضف بعض الوجبات الشهية أو عروض اليوم لتبدأ طلبك.',
      exploreDealsBtn: 'تصفح أقوى العروض',
      promoCodePlaceholder: 'أدخل كود الخصم (مثال: WELCOME50)',
      applyBtn: 'تطبيق',
      subtotal: 'المجموع الفرعي',
      voucherDiscount: 'خصم الكوبون',
      deliveryCharge: 'رسوم التوصيل',
      total: 'الإجمالي',
      free: 'مجاناً',
      proceedToCheckout: 'المتابعة لإتمام الطلب',
      freeDeliveryUnlock: 'أضف {diff} إضافية للحصول على توصيل مجاني!',
      freeDeliveryUnlocked: 'مبروك! لقد حصلت على توصيل مجاني!',
      checkoutTitle: 'إتمام الطلب',
      stepMethod: 'الاستلام',
      stepPayment: 'الدفع',
      stepReview: 'المراجعة',
      chooseMethod: '1. اختر طريقة الاستلام',
      doorstepDelivery: 'توصيل لباب المنزل (25-35 د)',
      restaurantPickup: 'استلام من المطعم (15 د)',
      selectAddress: 'اختر عنوان التوصيل',
      deliveryInstructions: 'تعليمات التوصيل للسائق',
      continueToPayment: 'المتابعة للدفع',
      back: 'رجوع',
      selectPaymentMethod: '2. اختر وسيلة الدفع (ج.م)',
      codTitle: 'الدفع نقداً عند الاستلام (كاش)',
      codDesc: 'ادفع نقداً للمندوب عند وصول الطلب إلى بابك',
      cardTitle: 'بطاقة بنكية / فيزا',
      cardDesc: 'فيزا تنتهي بـ •••• 4242',
      walletTitle: 'محفظة فودافون كاش',
      walletDesc: 'تحويل فوري عبر المحفظة الإلكترونية',
      reviewOrderTitle: '3. مراجعة الطلب النهائية',
      deliveringTo: 'التوصيل إلى',
      paymentVia: 'طريقة الدفع',
      placeOrder: 'تأكيد وإرسال الطلب (ج.م)',
      orderConfirmed: 'تم تأكيد طلبك بنجاح!',
      orderConfirmedDesc: 'المطبخ يقوم الآن بإعداد وجبتك بمكونات طازجة 100%.',
      orderNumber: 'رقم الطلب',
      estTime: 'الوقت المقدر',
      trackLiveOrder: 'تتبع الطلب مباشرة',
      notifications: 'الإشعارات',
      markAllRead: 'تحديد الكل كمقروء',
      chooseDeliveryAddress: 'اختر عنوان التوصيل',
      home: 'المنزل',
      office: 'العمل',
      myOrdersTitle: 'طلباتي',
      myOrdersSubtitle: 'تتبع الطلبات المباشرة واستعرض الفواتير السابقة',
      tabActive: 'طلب جاري',
      tabPast: 'طلبات سابقة',
      activeTrackingTitle: 'تتبع التوصيل المباشر',
      activeTrackingSubtitle: 'تحديثات حية لحظة بلحظة من مطبخنا',
      liveTracking: 'مباشر',
      stepPlaced: 'تم الإرسال',
      stepConfirmed: 'تم التأكيد',
      stepPreparing: 'قيد التحضير',
      stepOnTheWay: 'في الطريق',
      stepDelivered: 'تم التوصيل',
      estimatedArrival: 'الوقت المقدر للوصول',
      yourCourier: 'مندوب التوصيل',
      callCourier: 'اتصال بالمندوب',
      deliveryPin: 'رمز استلام الطلب:',
      givePinDesc: 'يرجى إعطاء هذا الكود المكون من 4 أرقام للمندوب عند الاستلام',
      cancelOrder: 'إلغاء الطلب',
      pastFeastsTitle: 'سجل الطلبات والفواتير السابقة',
      rateOrderBtn: 'تقييم الطلب',
      viewReceiptBtn: 'عرض الفاتورة',
      myAccountTitle: 'حسابي',
      myAccountSubtitle: 'نظرة عامة على حسابك وتفضيلاتك',
      points: 'نقطة',
      vouchers: 'كوبونات',
      places: 'عناوين',
      favorites: 'المفضلة',
      groupAccountDelivery: 'الحساب والعناوين',
      personalInfo: 'المعلومات الشخصية',
      personalInfoDesc: 'الاسم، رقم الهاتف، تاريخ الميلاد والصورة',
      savedAddresses: 'العناوين المحفوظة',
      savedAddressesDesc: 'إدارة عناوين المنزل والعمل وأماكن التوصيل',
      paymentMethods: 'وسائل الدفع',
      paymentMethodsDesc: 'البطاقات الائتمانية، فودافون كاش والمحافظ',
      groupRewardsPromos: 'المكافآت والعروض',
      loyaltyRewards: 'نقاط المكافآت والولاء',
      loyaltyRewardsDesc: 'اكسب نقاطاً مع كل طلب واستبدلها بخصومات',
      vouchersOffers: 'الكوبونات والعروض الترويجية',
      vouchersOffersDesc: 'كوبونات الخصم الفعالة والعروض الموسمية',
      inviteFriends: 'دعوة صديق (احصل على 50 ج.م)',
      inviteFriendsDesc: 'شارك كود الدعوة الخاص بك واكسب نقاطاً إضافية',
      groupAppSupport: 'التطبيق والمساعدة',
      helpSupport: 'المساعدة والدعم الفني',
      helpSupportDesc: 'الأسئلة الشائعة، المحادثة المباشرة والإبلاغ عن مشكلة',
      settingsPrefs: 'الإعدادات والتفضيلات',
      settingsPrefsDesc: 'لغة التطبيق، الإشعارات وتفضيلات التغليف',
      logOut: 'تسجيل الخروج',
      backToAccount: 'العودة للحساب',
      saveChanges: 'حفظ التعديلات'
    }
  },

  t(key, params) {
    const lang = this.getLanguage();
    let text = (this.i18n[lang] && this.i18n[lang][key]) || (this.i18n['en'] && this.i18n['en'][key]) || key;
    if (params && typeof params === 'object') {
      Object.keys(params).forEach(p => {
        text = text.replace(new RegExp(`\\{${p}\\}`, 'g'), params[p]);
      });
    }
    return text;
  },

  getProfile() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : this.defaultProfile;
    } catch (e) {
      return this.defaultProfile;
    }
  },

  saveProfile(profile) {
    localStorage.setItem(this.STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    this.updateHeaderProfileInfo();
  },

  getActiveAddress() {
    const profile = this.getProfile();
    const active = profile.addresses.find(a => a.id === profile.activeAddressId) || profile.addresses[0];
    return active;
  },

  setActiveAddress(addrId) {
    const profile = this.getProfile();
    profile.activeAddressId = addrId;
    this.saveProfile(profile);
    this.updateHeaderLocationDisplay();
    showToast(`Delivery location set to: ${this.getActiveAddress().label}`);
  },

  // 6. Cart Manager with Smart Milestones
  getCart() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.CART);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem(this.STORAGE_KEYS.CART, JSON.stringify(cart));
    this.updateCartBadges();
    this.renderCartDrawer();
  },

  addToCart(item) {
    const cart = this.getCart();
    const optionsKey = JSON.stringify(item.selectedOptions || {});
    const existingIdx = cart.findIndex(c => c.id === item.id && JSON.stringify(c.selectedOptions || {}) === optionsKey);

    if (existingIdx > -1) {
      cart[existingIdx].quantity += (item.quantity || 1);
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        nameAr: item.nameAr,
        image: item.image,
        unitPrice: item.unitPrice,
        selectedOptions: item.selectedOptions || {},
        notes: item.notes || '',
        quantity: item.quantity || 1
      });
    }

    this.saveCart(cart);
    showToast(`Added "${item.name}" to cart!`);
  },

  updateCartQty(index, delta) {
    const cart = this.getCart();
    if (!cart[index]) return;
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    this.saveCart(cart);
  },

  removeFromCart(index) {
    const cart = this.getCart();
    cart.splice(index, 1);
    this.saveCart(cart);
    showToast('Item removed from cart');
  },

  getCartCount() {
    return this.getCart().reduce((sum, it) => sum + it.quantity, 0);
  },

  getCartSubtotal() {
    return this.getCart().reduce((sum, it) => sum + (it.unitPrice * it.quantity), 0);
  },

  getAppliedVoucher() {
    try {
      const data = sessionStorage.getItem('gb_applied_voucher') || localStorage.getItem('gb_applied_voucher');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  isVoucherActive(code) {
    const applied = this.getAppliedVoucher();
    if (!applied || !applied.code) return false;
    return applied.code.toUpperCase().trim() === (code || '').toUpperCase().trim();
  },

  getAppliedVoucherDiscount(subtotal) {
    const voucher = this.getAppliedVoucher();
    if (!voucher) return { amount: 0, isQualified: false, reason: 'none' };

    const minRequired = voucher.minOrder || 0;
    if (subtotal < minRequired) {
      return {
        amount: 0,
        isQualified: false,
        minOrder: minRequired,
        diff: minRequired - subtotal,
        voucher: voucher
      };
    }

    let discountAmount = 0;
    if (voucher.amount) {
      discountAmount = voucher.amount;
    } else if (voucher.percent) {
      discountAmount = Math.min(voucher.maxDiscount || 999, Math.round((subtotal * voucher.percent) / 100));
    } else if (voucher.freeDelivery) {
      discountAmount = 25; // standard delivery fee
    }

    return {
      amount: discountAmount,
      isQualified: true,
      minOrder: minRequired,
      diff: 0,
      voucher: voucher
    };
  },

  applyVoucher(code, notify = true) {
    const cleanCode = (code || '').toUpperCase().trim();
    const isAr = this.getLanguage() === 'ar';
    if (!cleanCode) {
      if (notify) showToast(isAr ? 'يرجى إدخال كود الكوبون أولاً' : 'Please enter a coupon code.');
      return false;
    }

    const vouchers = this.getVouchers();
    let found = vouchers.find(v => v.code === cleanCode && v.status === 'available');

    // If not found in current vouchers list, check known promo codes or auto-create custom promo
    if (!found) {
      found = this.recognizeAndAddPromoCode(cleanCode);
    }

    if (!found) {
      if (notify) showToast(isAr ? 'كود الكوبون غير صالح أو منتهي الصلاحية' : 'Invalid or expired coupon code.');
      return false;
    }

    // Persist as the active coupon
    sessionStorage.setItem('gb_applied_voucher', JSON.stringify(found));
    localStorage.setItem('gb_applied_voucher', JSON.stringify(found));

    const subtotal = this.getCartSubtotal();
    const minRequired = found.minOrder || 0;

    let discountDesc = '';
    if (found.amount) discountDesc = `${this.formatEGP(found.amount)} OFF`;
    else if (found.percent) discountDesc = `${found.percent}% OFF`;
    else if (found.freeDelivery) discountDesc = isAr ? 'توصيل مجاني' : 'Free Delivery';

    if (subtotal > 0 && subtotal >= minRequired) {
      if (notify) {
        showToast(isAr 
          ? `تم تفعيل الكوبون ${cleanCode}! وفرت ${discountDesc}`
          : `Coupon ${cleanCode} is now ACTIVE! Saved ${discountDesc}`);
      }
    } else if (subtotal > 0) {
      const diff = minRequired - subtotal;
      if (notify) {
        showToast(isAr 
          ? `تم تفعيل الكوبون ${cleanCode}! أضف ${this.formatEGP(diff)} للسلة للحصول على الخصم`
          : `Coupon ${cleanCode} is ACTIVE! Add ${this.formatEGP(diff)} more to apply discount.`);
      }
    } else {
      if (notify) {
        showToast(isAr 
          ? `تم تفعيل الكوبون ${cleanCode}! (${discountDesc} للطلبات من ${this.formatEGP(minRequired)})`
          : `Coupon ${cleanCode} is now ACTIVE! (${discountDesc} on orders from ${this.formatEGP(minRequired)})`);
      }
    }

    this.renderCartDrawer();
    this.updateVoucherBadges();
    window.dispatchEvent(new CustomEvent('gb_voucher_changed', { detail: { voucher: found, action: 'applied' } }));
    return true;
  },

  removeVoucher(notify = true) {
    sessionStorage.removeItem('gb_applied_voucher');
    localStorage.removeItem('gb_applied_voucher');
    const isAr = this.getLanguage() === 'ar';
    if (notify) {
      showToast(isAr ? 'تم إلغاء تفعيل الكوبون.' : 'Coupon deactivated / removed.');
    }
    this.renderCartDrawer();
    window.dispatchEvent(new CustomEvent('gb_voucher_changed', { detail: { voucher: null, action: 'removed' } }));
  },

  getVouchers() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.VOUCHERS);
      return data ? JSON.parse(data) : this.defaultVouchers;
    } catch(e) {
      return this.defaultVouchers;
    }
  },

  saveVouchers(vouchers) {
    try {
      localStorage.setItem(this.STORAGE_KEYS.VOUCHERS, JSON.stringify(vouchers));
      this.updateVoucherBadges();
      window.dispatchEvent(new CustomEvent('gb_vouchers_updated'));
    } catch (e) {
      console.error('Error saving vouchers', e);
    }
  },

  addVoucher(voucherData, autoActivate = true) {
    if (!voucherData || !voucherData.code) return null;
    const cleanCode = voucherData.code.trim().toUpperCase();
    const vouchers = this.getVouchers();
    const isAr = this.getLanguage() === 'ar';

    let amount = 0;
    let percent = 0;
    let freeDelivery = false;

    if (voucherData.type === 'percent' || voucherData.percent) {
      percent = parseInt(voucherData.percent || voucherData.value || 20, 10);
    } else if (voucherData.type === 'freeDelivery' || voucherData.freeDelivery) {
      freeDelivery = true;
    } else {
      amount = parseInt(voucherData.amount || voucherData.value || 50, 10);
    }

    const minOrder = parseInt(voucherData.minOrder || (amount ? amount * 2 : 150), 10);
    const maxDiscount = parseInt(voucherData.maxDiscount || 120, 10);

    let title = voucherData.title;
    let titleAr = voucherData.titleAr;
    if (!title) {
      if (freeDelivery) {
        title = 'Free Delivery Promo Coupon';
        titleAr = 'كوبون توصيل مجاني ترويجي';
      } else if (percent > 0) {
        title = `${percent}% OFF Promo Discount`;
        titleAr = `خصم ${percent}% ترويجي خاص`;
      } else {
        title = `${amount} EGP Promo Discount`;
        titleAr = `خصم ترويجي بقيمة ${amount} ج.م`;
      }
    }

    const newVoucher = {
      code: cleanCode,
      title: title,
      titleAr: titleAr,
      amount: amount,
      percent: percent,
      freeDelivery: freeDelivery,
      maxDiscount: maxDiscount,
      minOrder: minOrder,
      status: 'available',
      expiry: voucherData.expiry || '31 Dec 2026'
    };

    const existingIndex = vouchers.findIndex(v => v.code === cleanCode);
    if (existingIndex >= 0) {
      vouchers[existingIndex] = { ...vouchers[existingIndex], ...newVoucher, status: 'available' };
    } else {
      vouchers.unshift(newVoucher);
    }

    this.saveVouchers(vouchers);

    if (autoActivate) {
      this.applyVoucher(cleanCode);
    }

    return newVoucher;
  },

  recognizeAndAddPromoCode(code) {
    const cleanCode = (code || '').toUpperCase().trim();
    if (!cleanCode) return null;

    const PROMO_MAP = {
      'BURGER25': { title: '25 EGP Off Burgers & Meals', titleAr: 'خصم 25 ج.م على البرجر والوجبات', amount: 25, minOrder: 150 },
      'BURGER': { title: '20 EGP Off Burger Feast', titleAr: 'خصم 20 ج.م على البرجر', amount: 20, minOrder: 150 },
      'GOURMET10': { title: '10% OFF Gourmet Orders', titleAr: 'خصم 10% على طلبات جورميه', percent: 10, maxDiscount: 80, minOrder: 200 },
      'GOURMET': { title: '15% OFF Gourmet Special', titleAr: 'خصم 15% جورميه خاص', percent: 15, maxDiscount: 100, minOrder: 200 },
      'SAVE50': { title: '50 EGP Super Savings', titleAr: 'وفر 50 ج.م فوراً', amount: 50, minOrder: 250 },
      'SAVE100': { title: '100 EGP Mega Feast Discount', titleAr: 'خصم ميجا 100 ج.م', amount: 100, minOrder: 450 },
      'SPECIAL30': { title: '30 EGP Special Chef Discount', titleAr: 'خصم خاص 30 ج.م من الشيف', amount: 30, minOrder: 180 },
      'RAMADAN': { title: '40 EGP Ramadan Blessing Discount', titleAr: 'خصم رمضان الكريم 40 ج.م', amount: 40, minOrder: 200 },
      'EID': { title: '50 EGP Eid Mubarak Treat', titleAr: 'عيدية العيد 50 ج.م خصم', amount: 50, minOrder: 250 },
      'VIP': { title: '60 EGP VIP Member Privilege', titleAr: 'خصم 60 ج.م لأعضاء VIP', amount: 60, minOrder: 300 },
      'FREEDELIVERY': { title: 'Free Express Delivery', titleAr: 'توصيل مجاني سريع', freeDelivery: true, minOrder: 100 },
      'SUPER': { title: '35 EGP Super Discount', titleAr: 'خصم سوبر 35 ج.م', amount: 35, minOrder: 180 }
    };

    let promoData = PROMO_MAP[cleanCode];

    if (!promoData) {
      const matchNum = cleanCode.match(/\d+/);
      const val = matchNum ? parseInt(matchNum[0], 10) : 50;
      if (cleanCode.includes('%') || (matchNum && val <= 50 && (cleanCode.includes('PCT') || cleanCode.includes('PER')))) {
        promoData = {
          title: `${val}% OFF Promotional Coupon`,
          titleAr: `خصم ${val}% ترويجي خاص`,
          percent: val,
          maxDiscount: 120,
          minOrder: 180
        };
      } else {
        const discountAmount = val > 0 && val <= 300 ? val : 50;
        promoData = {
          title: `${discountAmount} EGP Special Discount`,
          titleAr: `خصم خاص بقيمة ${discountAmount} ج.م`,
          amount: discountAmount,
          minOrder: Math.max(120, discountAmount * 2)
        };
      }
    }

    return this.addVoucher({
      code: cleanCode,
      ...promoData,
      status: 'available',
      expiry: '31 Dec 2026'
    }, false);
  },

  updateVoucherBadges() {
    try {
      const vouchers = this.getVouchers();
      const activeCount = vouchers.filter(v => v.status === 'available').length;
      const isAr = this.getLanguage() === 'ar';
      
      const badgeVouchers = document.getElementById('badgeVouchers');
      if (badgeVouchers) {
        badgeVouchers.textContent = isAr ? `${activeCount} متاحة` : `${activeCount} Active`;
      }
      const statVouchers = document.getElementById('statVouchers');
      if (statVouchers) {
        statVouchers.textContent = activeCount;
      }
    } catch(e) {}
  },

  // 7. Favorites & Recently Viewed
  getFavorites() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : ['burger-deluxe', 'pizza-margherita'];
    } catch(e) {
      return ['burger-deluxe', 'pizza-margherita'];
    }
  },

  isFavorite(id) {
    return this.getFavorites().includes(id);
  },

  toggleFavorite(id) {
    let favs = this.getFavorites();
    const idx = favs.indexOf(id);
    let isNowFav = false;
    if (idx > -1) {
      favs.splice(idx, 1);
      isNowFav = false;
      showToast('Removed from favorites.');
    } else {
      favs.push(id);
      isNowFav = true;
      showToast('Saved to your favorites!');
    }
    localStorage.setItem(this.STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
    this.updateFavoriteButtons();
    return isNowFav;
  },

  trackRecentlyViewed(id) {
    try {
      let list = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.RECENTLY_VIEWED) || '[]');
      list = list.filter(item => item !== id);
      list.unshift(id);
      if (list.length > 8) list.pop();
      localStorage.setItem(this.STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(list));
    } catch(e) {}
  },

  getRecentlyViewed() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.RECENTLY_VIEWED) || '[]');
    } catch(e) {
      return [];
    }
  },

  // 8. Orders Management & Real-Time Tracking
  getActiveOrder() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.ACTIVE_ORDER);
      if (data) return JSON.parse(data);
      // Default active order if none
      const sample = {
        id: '#EGY-8942',
        placedAt: new Date(Date.now() - 15 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Out for Delivery',
        statusStep: 4, // 1: Placed, 2: Confirmed, 3: Preparing, 4: Out for Delivery, 5: Delivered
        estimatedMinutes: '15-25 mins',
        courier: {
          name: 'Captain Mostafa',
          phone: '+20 112 345 6789',
          rating: 4.9,
          badge: 'Top Rated Courier'
        },
        address: '14 Victor Emmanuel Sq, Smouha, Alexandria',
        items: [
          { name: 'Deluxe Double Smash Burger', quantity: 1, unitPrice: 230, options: 'Double (300g) • Cheddar • Extra Bacon' },
          { name: 'Sparkling Passion Fruit Mojito', quantity: 1, unitPrice: 75, options: 'Regular (400ml) • Regular Ice' }
        ],
        subtotal: 305,
        deliveryFee: 0,
        discount: 0,
        total: 305,
        isCancellable: false, // Cannot cancel once out for delivery
        cancelPolicyNote: 'Order cannot be cancelled once cooking or out for delivery.'
      };
      localStorage.setItem(this.STORAGE_KEYS.ACTIVE_ORDER, JSON.stringify(sample));
      return sample;
    } catch(e) {
      return null;
    }
  },

  saveActiveOrder(order) {
    localStorage.setItem(this.STORAGE_KEYS.ACTIVE_ORDER, JSON.stringify(order));
  },

  getPastOrders() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.PAST_ORDERS);
      if (data) return JSON.parse(data);
      const defaults = [
        {
          id: '#EGY-7814',
          date: '21 Sep 2026, 8:40 PM',
          items: [
            { id: 'pizza-margherita', name: 'Artisan Margherita Fresca', nameAr: 'مارجريتا إيطالية أصلية', quantity: 1, unitPrice: 195 },
            { id: 'chicken-wings-honey', name: 'Honey BBQ Glazed Wings', nameAr: 'أجنحة دجاج بالعسل والباربيكيو', quantity: 1, unitPrice: 165 }
          ],
          total: 395
        },
        {
          id: '#EGY-6590',
          date: '14 Sep 2026, 7:15 PM',
          status: 'Delivered',
          items: [
            { id: 'burger-truffle', name: 'Double Truffle Smash Burger', nameAr: 'برجر ترافل دبل سماش', quantity: 2, unitPrice: 210 }
          ],
          total: 455
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.PAST_ORDERS, JSON.stringify(defaults));
      return defaults;
    } catch(e) {
      return [];
    }
  },

  updateHeaderProfileInfo() {
    const isAr = this.getLanguage() === 'ar';
    const profile = this.getProfile();
    const hour = new Date().getHours();
    let greeting = 'Hello';
    if (isAr) {
      if (hour < 12) greeting = 'صباح الخير';
      else greeting = 'مساء الخير';
    } else {
      if (hour < 12) greeting = 'Good Morning';
      else if (hour < 17) greeting = 'Good Afternoon';
      else greeting = 'Good Evening';
    }

    const userName = isAr ? ((profile.nameAr || profile.name).split(' ')[0]) : profile.name.split(' ')[0];
    const greetingEls = document.querySelectorAll('.dynamic-user-greeting');
    greetingEls.forEach(el => {
      el.textContent = isAr ? `${greeting}، ${userName}` : `${greeting}, ${userName}`;
    });

    this.updateHeaderLocationDisplay();
  },

  updateHeaderLocationDisplay() {
    const isAr = this.getLanguage() === 'ar';
    const active = this.getActiveAddress();
    const label = isAr ? (active.labelAr || active.label) : active.label;
    const city = isAr ? 'الإسكندرية' : 'Alexandria';
    document.querySelectorAll('.dynamic-active-address').forEach(el => {
      el.textContent = `${label} - ${city}`;
    });
  },

  updateFavoriteButtons() {
    document.querySelectorAll('.fav-btn').forEach(btn => {
      const card = btn.closest('[data-product-id]');
      if (!card) return;
      const pid = card.getAttribute('data-product-id');
      const isFav = this.isFavorite(pid);
      btn.classList.toggle('favorited', isFav);
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
      }
    });
  },

  updateCartBadges() {
    const count = this.getCartCount();
    document.querySelectorAll('.cart-badge').forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  },

  getNotifications() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.NOTIFICATIONS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item, idx) => ({
            id: item.id || `notif-${idx + 1}`,
            type: item.type || (item.title && item.title.includes('Deal') ? 'deal' : item.title && item.title.includes('order') ? 'order' : 'info'),
            icon: item.icon || (item.type === 'deal' ? 'fa-solid fa-fire' : item.type === 'order' ? 'fa-solid fa-motorcycle' : item.type === 'loyalty' ? 'fa-solid fa-gift' : 'fa-solid fa-bell'),
            title: item.title || 'Notification',
            titleAr: item.titleAr || item.title || 'إشعار جديد',
            desc: item.desc || (item.type === 'deal' ? 'Get 2 double smash burgers, loaded fries & drinks at 49% discount today!' : item.type === 'order' ? 'Courier Mohamed has picked up your meal and is speeding to Smouha.' : 'Tap to view details and updates.'),
            descAr: item.descAr || (item.type === 'deal' ? 'احصل على 2 ديلوكس سماش برجر وبطاطس ومشروبات بخصم 49% اليوم فقط!' : item.type === 'order' ? 'الكابتن محمد استلم وجبتك الساخنة وهو في الطريق إلى سموحة الآن.' : 'اضغط للاطلاع على التفاصيل والتحديثات.'),
            time: item.time || 'Just now',
            timeAr: item.timeAr || 'الآن',
            read: typeof item.read === 'boolean' ? item.read : false,
            actionUrl: item.actionUrl || (item.type === 'deal' ? 'deals.html' : item.type === 'order' ? 'orders.html' : 'profile.html'),
            actionText: item.actionText || (item.type === 'deal' ? 'Claim Deal' : item.type === 'order' ? 'Track Order' : 'View Details'),
            actionTextAr: item.actionTextAr || (item.type === 'deal' ? 'استفد بالعرض' : item.type === 'order' ? 'تتبع الطلب' : 'عرض التفاصيل')
          }));
        }
      }
      const defaults = [
        {
          id: 'notif-1',
          type: 'deal',
          icon: 'fa-solid fa-fire',
          title: '49% OFF Mega Combo Deal',
          titleAr: 'خصم 49% على وليمة الكومبو',
          desc: 'Get 2 double smash burgers, loaded fries & drinks at 49% discount today only!',
          descAr: 'احصل على 2 ديلوكس سماش برجر وبطاطس ومشروبات بخصم 49% اليوم فقط!',
          time: '10m ago',
          timeAr: 'منذ 10 دقائق',
          read: false,
          actionUrl: 'deals.html',
          actionText: 'Claim Deal',
          actionTextAr: 'استفد بالعرض'
        },
        {
          id: 'notif-2',
          type: 'order',
          icon: 'fa-solid fa-motorcycle',
          title: 'Order #EGY-4419 is En Route',
          titleAr: 'طلبك #EGY-4419 في الطريق إليك',
          desc: 'Courier Mohamed has picked up your meal and is speeding to Smouha.',
          descAr: 'الكابتن محمد استلم وجبتك الساخنة وهو في الطريق إلى سموحة الآن.',
          time: '25m ago',
          timeAr: 'منذ 25 دقيقة',
          read: false,
          actionUrl: 'orders.html',
          actionText: 'Track Order',
          actionTextAr: 'تتبع الطلب'
        },
        {
          id: 'notif-3',
          type: 'loyalty',
          icon: 'fa-solid fa-gift',
          title: '150 Loyalty Points Added',
          titleAr: 'تم إضافة 150 نقطة ولاء',
          desc: 'Your account was credited 150 VIP points. Redeem anytime for tasty sides!',
          descAr: 'تم إضافة 150 نقطة لحسابك. استبدلها في أي وقت بمقبلات ومشروبات مجانية!',
          time: '2h ago',
          timeAr: 'منذ ساعتين',
          read: true,
          actionUrl: 'loyalty.html',
          actionText: 'View Balance',
          actionTextAr: 'عرض الرصيد'
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(defaults));
      return defaults;
    } catch(e) {
      return [];
    }
  },

  updateNotificationBadges() {
    const notifs = this.getNotifications();
    const unread = notifs.filter(n => !n.read).length;
    document.querySelectorAll('.notif-badge').forEach(b => {
      b.textContent = unread;
      b.style.display = unread > 0 ? 'inline-flex' : 'none';
    });
    const headerBadge = document.getElementById('notifDrawerUnreadBadge');
    if (headerBadge) {
      const isAr = this.getLanguage() === 'ar';
      if (unread > 0) {
        headerBadge.textContent = isAr ? `${unread} جديد` : `${unread} new`;
        headerBadge.style.display = 'inline-block';
      } else {
        headerBadge.textContent = isAr ? 'لا جديد' : '0 new';
        headerBadge.style.display = 'none';
      }
    }
  },

  // 11. Bilingual & UI Localization Routines
  updateLanguageSwitcherButtons() {
    const isAr = this.getLanguage() === 'ar';

    // Remove legacy/top header language switcher buttons if present
    document.querySelectorAll('.lang-switch-btn').forEach(btn => btn.remove());

    // Settings page buttons highlighting (language selection in Profile -> Settings)
    const enBtn = document.getElementById('settingsLangEn');
    const arBtn = document.getElementById('settingsLangAr');
    if (enBtn && arBtn) {
      enBtn.classList.toggle('active', !isAr);
      arBtn.classList.toggle('active', isAr);
    }
  },

  applyPageTranslations() {
    const isAr = this.getLanguage() === 'ar';
    const lang = this.getLanguage();

    // 1. Root Attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    if (isAr) {
      document.documentElement.classList.add('rtl-mode');
    } else {
      document.documentElement.classList.remove('rtl-mode');
    }

    // 2. Language Switcher Buttons
    this.updateLanguageSwitcherButtons();

    // 3. Bottom Navigation - Fix: use direct child span or lastElementChild so .nav-badge is preserved
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    if (navItems.length >= 4) {
      const navKeys = ['navHome', 'navOrders', 'navDeals', 'navProfile'];
      navItems.forEach((item, idx) => {
        if (navKeys[idx]) {
          const labelSpan = item.querySelector(':scope > span') || item.lastElementChild;
          if (labelSpan && labelSpan.tagName === 'SPAN') {
            labelSpan.textContent = this.t(navKeys[idx]);
          }
        }
      });
    }

    // 4. Common Localizations if Arabic
    if (isAr) {
      // Deliver to tag
      document.querySelectorAll('.deliver-tag').forEach(el => el.textContent = this.t('deliverTo'));

      // Search input placeholder
      const searchInput = document.getElementById('searchInput');
      if (searchInput && !searchInput.value) {
        searchInput.placeholder = this.t('searchPlaceholder');
      }

      // Suggest label
      const suggestLabel = document.querySelector('.suggest-label');
      if (suggestLabel) suggestLabel.innerHTML = `<i class="fa-solid fa-fire"></i> ${this.t('trending')}`;

      // Section titles
      document.querySelectorAll('.home-section-title h2').forEach(el => {
        if (el.textContent.includes('Order Again')) el.textContent = this.t('orderAgain');
        if (el.textContent.includes('Explore Menu')) el.textContent = this.t('exploreMenu');
      });
      document.querySelectorAll('.home-section-title p').forEach(el => {
        if (el.textContent.includes('Fast reorder')) el.textContent = this.t('orderAgainSubtitle');
        if (el.textContent.includes('Handcrafted')) el.textContent = this.t('exploreSubtitle');
      });

      // Filter pills
      document.querySelectorAll('.filter-tag-pill').forEach(btn => {
        const text = btn.textContent.trim();
        if (text.includes('All Items')) btn.textContent = this.t('filterAll');
        else if (text.includes('Popular')) btn.innerHTML = this.t('filterPopular');
        else if (text.includes('Best Seller')) btn.innerHTML = this.t('filterBestSeller');
        else if (text.includes("Chef's Special")) btn.innerHTML = this.t('filterSpecial');
        else if (text.includes('Quick Prep')) btn.innerHTML = this.t('filterQuick');
      });

      // Sort Select Options
      const sortSelect = document.getElementById('sortSelect');
      if (sortSelect) {
        const opts = sortSelect.querySelectorAll('option');
        if (opts.length >= 5) {
          opts[0].textContent = 'الموصى به';
          opts[1].textContent = 'السعر: من الأقل للأعلى';
          opts[2].textContent = 'السعر: من الأعلى للأقل';
          opts[3].textContent = 'الأعلى تقييماً';
          opts[4].textContent = 'الأسرع تحضيراً';
        }
      }

      // Subpage translations
      this.translateProfilePageAr();
      this.translateDealsPageAr();
      this.translateOrdersPageAr();
      this.translateSubpagesAr();
    }

    // 4. Notification Drawer dynamic localization
    const notifHeading = document.getElementById('notifDrawerHeading');
    if (notifHeading) notifHeading.textContent = isAr ? 'الإشعارات' : 'Notifications';
    const notifStatus = document.getElementById('notifStatusLabel');
    if (notifStatus) notifStatus.innerHTML = `<i class="fa-solid fa-bell"></i> ${isAr ? 'التحديثات الأخيرة' : 'Recent Updates'}`;
    const markReadSpan = document.querySelector('.mark-read-btn span');
    if (markReadSpan) markReadSpan.textContent = isAr ? 'تحديد الكل كمقروء' : 'Mark all as read';
    if (document.getElementById('notificationsList')) {
      this.renderNotificationsList();
    }
  },

  translateSubpagesAr() {
    // Translate subpage-title-box if present
    const titleH1 = document.querySelector('.subpage-title-box h1');
    const titleP = document.querySelector('.subpage-title-box p');
    if (titleH1) {
      const t = titleH1.textContent.trim();
      if (t.includes('Saved Addresses')) {
        titleH1.textContent = 'العناوين المحفوظة';
        if (titleP) titleP.textContent = 'وجهات التوصيل في الإسكندرية';
      } else if (t.includes('Personal Information')) {
        titleH1.textContent = 'المعلومات الشخصية';
        if (titleP) titleP.textContent = 'بياناتك المسجلة وتفاصيل الاتصال';
      } else if (t.includes('Payment Methods')) {
        titleH1.textContent = 'وسائل الدفع';
        if (titleP) titleP.textContent = 'البطاقات الائتمانية ومحفظة فودافون كاش';
      } else if (t.includes('Rewards') || t.includes('Loyalty')) {
        titleH1.textContent = 'برنامج المكافآت والولاء';
        if (titleP) titleP.textContent = 'نقاطك ومستواك الفضي ومكافآتك';
      } else if (t.includes('Coupons') || t.includes('Vouchers')) {
        titleH1.textContent = 'الكوبونات وقسائم الخصم';
        if (titleP) titleP.textContent = 'الكوبونات النشطة والعروض الترويجية';
      } else if (t.includes('Invite') || t.includes('Referral')) {
        titleH1.textContent = 'دعوة الأصدقاء';
        if (titleP) titleP.textContent = 'شارك كود الدعوة واكسب 50 ج.م رصيداً';
      } else if (t.includes('Help') || t.includes('Support')) {
        titleH1.textContent = 'المساعدة والدعم';
        if (titleP) titleP.textContent = 'فريق الدعم الفني جاهز لمساعدتك دائماً';
      } else if (t.includes('Settings') || t.includes('Preferences')) {
        titleH1.textContent = 'الإعدادات والتفضيلات';
        if (titleP) titleP.textContent = 'لغة التطبيق والإشعارات والخصوصية';
      } else if (t.includes('Favorites')) {
        titleH1.textContent = 'الأطباق المفضلة';
        if (titleP) titleP.textContent = 'وجباتك المحفوظة لطلبها بضغطة زر';
      }
    }
  },

  translateProfilePageAr() {
    const greetingBox = document.querySelector('.home-header .user-greeting-box h1');
    const greetingSub = document.querySelector('.home-header .user-greeting-box p');
    if (greetingBox && (greetingBox.textContent.includes('Account') || greetingBox.textContent.includes('Profile'))) {
      greetingBox.textContent = 'حسابي';
    }
    if (greetingSub) {
      greetingSub.textContent = 'نظرة عامة على حسابك وتفضيلاتك';
    }
    const editBtn = document.querySelector('.account-quick-edit-btn');
    if (editBtn) editBtn.innerHTML = `<i class="fa-solid fa-user-pen"></i> تعديل الحساب`;

    const statLabels = document.querySelectorAll('.account-stat-label');
    if (statLabels.length >= 4) {
      statLabels[0].textContent = 'النقاط';
      statLabels[1].textContent = 'الكوبونات';
      statLabels[2].textContent = 'العناوين';
      statLabels[3].textContent = 'المفضلة';
    }

    const groupTitles = document.querySelectorAll('.account-group-title');
    const groupTitlesAr = ['الحساب والعناوين', 'التوفير والمكافآت', 'التفضيلات والدعم'];
    groupTitles.forEach((t, i) => {
      if (groupTitlesAr[i]) t.textContent = groupTitlesAr[i];
    });

    const menuItems = document.querySelectorAll('.account-menu-item .menu-text-box');
    const menuAr = [
      { h: 'المعلومات الشخصية', p: 'الاسم، رقم الهاتف، تاريخ الميلاد والصورة' },
      { h: 'عناوين التوصيل المحفوظة', p: 'عناوين المنزل، العمل، ومواقع الإسكندرية' },
      { h: 'طرق الدفع والمحافظ', p: 'فيزا، فودافون كاش، إنستاباي (ج.م)' },
      { h: 'أطباقي المفضلة', p: 'إعادة الطلب السريع بضغطة زر واحدة' },
      { h: 'نادي المكافآت والولاء', p: 'استبدل النقاط بكوبونات وخصومات نقدية فورية' },
      { h: 'الكوبونات وأكواد الخصم', p: 'تطبيق أكواد الخصم وقسائم التوفير' },
      { h: 'دعوة صديق وكسب المكافأة', p: 'ادعُ أصدقاءك واحصل معهم على 50 ج.م' },
      { h: 'الإعدادات والتفضيلات', p: 'لغة التطبيق، الإشعارات وتفضيلات التغليف' },
      { h: 'مركز المساعدة والدعم المباشر', p: 'الخط الساخن 19888، المحادثة والأسئلة الشائعة' },
      { h: 'تسجيل الخروج', p: 'تسجيل الخروج من جلستك الحالية بأمان' },
      { h: 'حذف الحساب', p: 'حذف البيانات والعناوين المحفوظة نهائياً' }
    ];

    menuItems.forEach((box, i) => {
      if (menuAr[i]) {
        const h3 = box.querySelector('h3');
        const p = box.querySelector('p');
        if (h3) h3.textContent = menuAr[i].h;
        if (p) p.textContent = menuAr[i].p;
      }
    });

    // Translate all badges inside profile menu items
    document.querySelectorAll('.menu-item-badge, .menu-badge-pill').forEach(badge => {
      const text = badge.textContent.trim();
      if (text.includes('Saved')) badge.textContent = text.replace(/Saved/i, 'محفوظ');
      else if (text.includes('Default: Cash')) badge.textContent = 'الافتراضي: كاش';
      else if (text.includes('Default:')) badge.textContent = 'الافتراضي: بطاقة';
      else if (text.includes('Items')) badge.textContent = text.replace(/Items/i, 'وجبات');
      else if (text.includes('Pts')) badge.textContent = text.replace(/Pts/i, 'نقطة');
      else if (text.includes('Active')) badge.textContent = text.replace(/Active/i, 'متاحة');
      else if (text.includes('Earn 50 EGP')) badge.textContent = 'اكسب 50 ج.م';
      else if (text.includes('24/7 Care')) badge.textContent = 'دعم 24/7';
      else if (text === 'English') badge.textContent = 'العربية';
    });

    const tierChip = document.querySelector('.account-tier-chip');
    if (tierChip) {
      tierChip.innerHTML = `<i class="fa-solid fa-crown" style="color: #fbbf24;"></i> فضي`;
    }
  },

  translateDealsPageAr() {
    const dealsTitle = document.querySelector('.deals-hero-banner h2');
    const dealsSub = document.querySelector('.deals-hero-banner p');
    if (dealsTitle) dealsTitle.textContent = 'أقوى العروض والكومبو الحصرية';
    if (dealsSub) dealsSub.textContent = 'وفّر حتى 49% مع وجبات الكومبو العائلية وصواني البيتزا الفاخرة!';

    const pills = document.querySelectorAll('.deal-category-filters .deal-pill');
    if (pills.length >= 5) {
      pills[0].textContent = 'جميع العروض';
      pills[1].textContent = 'عرض اليوم';
      pills[2].textContent = 'فلاش سيل';
      pills[3].textContent = 'وجبات عائلية';
      pills[4].textContent = 'عروض البيتزا';
    }

    document.querySelectorAll('.customize-deal-btn span').forEach(s => s.textContent = 'تخصيص وطلب العرض');
  },

  translateOrdersPageAr() {
    const ordersTitle = document.querySelector('.orders-app .home-header .user-greeting-box h1');
    const ordersSub = document.querySelector('.orders-app .home-header .user-greeting-box .greeting-subtitle');
    if (ordersTitle) ordersTitle.textContent = 'طلباتي';
    if (ordersSub) ordersSub.textContent = 'تتبع مباشر لطلبك ومراجعة وجباتك السابقة';

    const tabActive = document.getElementById('tabActiveBtn');
    const tabPast = document.getElementById('tabPastBtn');
    if (tabActive) {
      const badge = tabActive.querySelector('.tab-badge');
      tabActive.innerHTML = `طلب جاري ${badge ? badge.outerHTML : ''}`;
    }
    if (tabPast) {
      const badge = tabPast.querySelector('.tab-badge');
      tabPast.innerHTML = `طلبات سابقة ${badge ? badge.outerHTML : ''}`;
    }

    const hlTitle = document.querySelector('.section-headline h2');
    const hlDesc = document.querySelector('.section-headline p');
    const livePill = document.querySelector('.live-pill');
    if (hlTitle) hlTitle.textContent = 'تتبع التوصيل المباشر';
    if (hlDesc) hlDesc.textContent = 'تحديثات حية لحظة بلحظة من مطبخنا';
    if (livePill) livePill.innerHTML = `<i class="fa-solid fa-circle"></i> مباشر`;

    // Active order card texts
    const simLabel = document.querySelector('.sim-card-top span');
    if (simLabel) simLabel.textContent = 'محاكي التتبع المباشر';
    const simBtn = document.querySelector('.sim-btn');
    if (simBtn) simBtn.innerHTML = `<i class="fa-solid fa-forward-step"></i> المرحلة التالية`;
    const etaLabel = document.querySelector('.eta-label');
    if (etaLabel) etaLabel.textContent = 'وقت الوصول المتوقع';

    const courierRole = document.querySelector('.courier-meta p');
    if (courierRole) courierRole.textContent = 'شريك توصيل سريع • التقييم: 4.9';
    const callBtn = document.querySelector('.call-courier-btn');
    if (callBtn) callBtn.innerHTML = `<i class="fa-solid fa-phone"></i> اتصال`;

    const itemsHeading = document.querySelector('.order-items-wrapper h4');
    if (itemsHeading) itemsHeading.textContent = 'محتويات الطلب';

    const summaryLines = document.querySelectorAll('.order-price-summary .summary-line');
    if (summaryLines.length >= 3) {
      const s0 = summaryLines[0].querySelector('span');
      const s1 = summaryLines[1].querySelector('span');
      const s2 = summaryLines[2].querySelector('span');
      if (s0) s0.textContent = 'المجموع الفرعي';
      if (s1) s1.textContent = 'رسوم التوصيل';
      if (s2) s2.textContent = 'المبلغ الإجمالي المدفوع';
      const freeEl = summaryLines[1].querySelector('strong');
      if (freeEl && freeEl.textContent.trim() === 'FREE') freeEl.textContent = 'مجاناً';
    }

    const cancelPolicy = document.getElementById('cancelPolicyNote');
    if (cancelPolicy) cancelPolicy.innerHTML = `<i class="fa-solid fa-circle-info"></i> ملاحظة: لا يمكن إلغاء الطلب بعد بدء الطهي أو خروج المندوب.`;
    const cancelBtn = document.getElementById('cancelOrderBtn');
    if (cancelBtn) cancelBtn.textContent = 'إلغاء الطلب';

    const pastHeading = document.querySelector('#pastOrdersSection .section-headline h2');
    if (pastHeading) pastHeading.textContent = 'سجل الطلبات والفواتير السابقة';
    const pastSub = document.querySelector('#pastOrdersSection .section-headline p');
    if (pastSub) pastSub.textContent = 'اضغط على إعادة الطلب لإضافة الوجبة إلى سلتك بنقرة واحدة';

    document.querySelectorAll('.reorder-btn span').forEach(s => s.textContent = 'إعادة الطلب');
    document.querySelectorAll('.rate-order-btn').forEach(s => s.innerHTML = `<i class="fa-regular fa-star"></i> تقييم الطلب`);
  },

  // 11. Cart Drawer Slide-Over & Multi-Step Checkout Modal
  openCartDrawer() {
    let drawer = document.getElementById('smartCartDrawer');
    let overlay = document.getElementById('cartDrawerOverlay');
    if (!drawer || !overlay) {
      if (typeof injectSharedComponents === 'function') injectSharedComponents();
      drawer = document.getElementById('smartCartDrawer');
      overlay = document.getElementById('cartDrawerOverlay');
    }
    if (drawer && overlay) {
      this.renderCartDrawer();
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  },

  closeCartDrawer() {
    const drawer = document.getElementById('smartCartDrawer');
    const overlay = document.getElementById('cartDrawerOverlay');
    if (drawer && overlay) {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  },

  renderCartDrawer() {
    const container = document.getElementById('cartItemsList');
    const subtotalEl = document.getElementById('cartSubtotal');
    const deliveryEl = document.getElementById('cartDeliveryFee');
    const discountRow = document.getElementById('cartDiscountRow');
    const discountEl = document.getElementById('cartDiscountAmount');
    const totalEl = document.getElementById('cartTotal');
    const freeDeliveryProgress = document.getElementById('freeDeliveryProgress');
    const freeDeliveryText = document.getElementById('freeDeliveryText');
    const voucherInput = document.getElementById('cartVoucherInput');
    const emptyState = document.getElementById('cartEmptyState');
    const cartFooter = document.getElementById('cartFooter');
    const itemCountBadge = document.getElementById('cartDrawerItemCount');

    if (!container) return;

    const cart = this.getCart();
    const subtotal = this.getCartSubtotal();
    const count = this.getCartCount();

    const isAr = this.getLanguage() === 'ar';
    if (itemCountBadge) itemCountBadge.textContent = isAr ? `${count} ${count === 1 ? 'صنف' : 'أصناف'}` : `${count} ${count === 1 ? 'item' : 'items'}`;

    if (cart.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      if (cartFooter) cartFooter.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (cartFooter) cartFooter.style.display = 'block';

    // Free delivery progress (Target: 300 EGP)
    const threshold = 300;
    const diff = threshold - subtotal;
    if (freeDeliveryProgress && freeDeliveryText) {
      if (diff > 0) {
        const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
        freeDeliveryProgress.style.width = `${pct}%`;
        freeDeliveryText.innerHTML = isAr 
          ? `أضف <strong>${this.formatEGP(diff)}</strong> إضافية للحصول على <strong>توصيل مجاني!</strong>`
          : `Add <strong>${this.formatEGP(diff)}</strong> more to unlock <strong>FREE Delivery!</strong>`;
      } else {
        freeDeliveryProgress.style.width = '100%';
        freeDeliveryProgress.style.background = 'var(--green)';
        freeDeliveryText.innerHTML = isAr
          ? `<span style="color:var(--green);font-weight:700;">مبروك! لقد حصلت على توصيل مجاني!</span>`
          : `<span style="color:var(--green);font-weight:700;">Congratulations! You unlocked FREE Delivery!</span>`;
      }
    }

    // Vouchers & Discounts
    const voucher = this.getAppliedVoucher();
    const discountInfo = this.getAppliedVoucherDiscount(subtotal);
    const discountAmount = discountInfo.amount;

    const hasFreeDeliveryVoucher = voucher && voucher.freeDelivery && discountInfo.isQualified;
    const deliveryFee = (subtotal >= threshold || hasFreeDeliveryVoucher) ? 0 : 25;
    const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

    // Render Active Coupon UI in Cart Drawer
    const voucherBox = document.getElementById('cartVoucherBox');
    if (voucherBox) {
      if (voucher) {
        let discountBadgeText = '';
        if (voucher.amount) discountBadgeText = `${this.formatEGP(voucher.amount)} OFF`;
        else if (voucher.percent) discountBadgeText = `${voucher.percent}% OFF`;
        else if (voucher.freeDelivery) discountBadgeText = isAr ? 'توصيل مجاني' : 'Free Delivery';

        voucherBox.innerHTML = `
          <div class="active-cart-voucher-card">
            <div class="acv-left">
              <div class="acv-code-badge-row">
                <span class="acv-code-tag">${voucher.code}</span>
                <span class="acv-active-pill"><i class="fa-solid fa-circle-check"></i> ${isAr ? 'كوبون نشط' : 'ACTIVE COUPON'}</span>
                <span class="acv-save-badge">${discountBadgeText}</span>
              </div>
              <p class="acv-sub-text">${isAr ? (voucher.titleAr || voucher.title) : voucher.title}</p>
              ${!discountInfo.isQualified && subtotal > 0 ? `
                <div class="acv-warn-msg">
                  <i class="fa-solid fa-circle-exclamation"></i>
                  <span>${isAr ? `أضف ${this.formatEGP(discountInfo.diff)} أكثر لتفعيل الخصم (الحد الأدنى ${this.formatEGP(voucher.minOrder)})` : `Add ${this.formatEGP(discountInfo.diff)} more to activate discount (Min. ${this.formatEGP(voucher.minOrder)})`}</span>
                </div>
              ` : `
                <div class="acv-applied-msg">
                  <i class="fa-solid fa-sparkles"></i>
                  <span>${isAr ? `تم تطبيق خصم ${this.formatEGP(discountAmount)} بنجاح!` : `Saved ${this.formatEGP(discountAmount)} on your total!`}</span>
                </div>
              `}
            </div>
            <button class="acv-remove-btn" onclick="AppState.removeVoucher()" title="${isAr ? 'إلغاء الكوبون' : 'Remove coupon'}">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        `;
      } else {
        voucherBox.innerHTML = `
          <div class="voucher-input-group">
            <i class="fa-solid fa-ticket"></i>
            <input type="text" id="cartVoucherInput" placeholder="${isAr ? 'أدخل كود الخصم (مثال: WELCOME50)' : 'Enter promo code (e.g. WELCOME50)'}" uppercase />
            <button onclick="AppState.applyVoucher(document.getElementById('cartVoucherInput').value)">${isAr ? 'تطبيق' : 'Apply'}</button>
          </div>
          <div class="voucher-suggestion-pill" onclick="AppState.applyVoucher('WELCOME50')">
            <i class="fa-solid fa-sparkles"></i> <strong>WELCOME50</strong> ${isAr ? 'متاح لخصم 50 ج.م!' : 'available for 50 EGP OFF!'}
          </div>
        `;
      }
    }

    // Render Items
    container.innerHTML = cart.map((it, idx) => {
      const itemName = isAr ? (it.nameAr || it.name) : it.name;
      const optionsPill = it.selectedOptions ? Object.values(it.selectedOptions).flat().join(' • ') : '';
      return `
        <div class="cart-item-row">
          <img src="${it.image}" alt="${itemName}" class="cart-item-thumbnail" />
          <div class="cart-item-info">
            <h4 class="cart-item-title">${itemName}</h4>
            ${optionsPill ? `<p class="cart-item-specs-text">${optionsPill}</p>` : ''}
            ${it.notes ? `<p class="cart-item-notes-text"><i class="fa-regular fa-note-sticky"></i> "${it.notes}"</p>` : ''}
            <div class="cart-item-price-tag">${this.formatEGP(it.unitPrice * it.quantity)}</div>
          </div>
          <div class="cart-item-actions">
            <div class="qty-pill">
              <button onclick="AppState.updateCartQty(${idx}, -1)" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
              <span>${it.quantity}</span>
              <button onclick="AppState.updateCartQty(${idx}, 1)" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
            </div>
            <button class="cart-remove-btn" onclick="AppState.removeFromCart(${idx})" title="Remove item">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (subtotalEl) subtotalEl.textContent = this.formatEGP(subtotal);
    if (deliveryEl) deliveryEl.textContent = deliveryFee === 0 ? (isAr ? 'مجاناً' : 'FREE') : this.formatEGP(deliveryFee);

    if (discountRow && discountEl) {
      if (voucher && discountAmount > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `-${this.formatEGP(discountAmount)} (${voucher.code})`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    if (totalEl) totalEl.textContent = this.formatEGP(finalTotal);
  },

  // 12. Checkout Multi-Step Flow
  openCheckout() {
    if (this.getCartCount() === 0) {
      showToast('Your cart is empty.');
      return;
    }
    this.closeCartDrawer();
    const modal = document.getElementById('checkoutModal');
    if (modal) {
      this.initCheckoutModal();
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  },

  closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  },

  initCheckoutModal() {
    this.currentCheckoutStep = 1;
    this.selectedDeliveryMethod = 'delivery'; // 'delivery' or 'pickup'
    this.selectedPaymentMethod = 'cod'; // 'cod', 'card', 'wallet'
    this.renderCheckoutStep(1);
  },

  renderCheckoutStep(step) {
    this.currentCheckoutStep = step;
    document.querySelectorAll('.checkout-step-pane').forEach((pane, idx) => {
      pane.style.display = (idx + 1 === step) ? 'block' : 'none';
    });

    document.querySelectorAll('.checkout-progress-step').forEach((st, idx) => {
      st.classList.toggle('active', idx + 1 === step);
      st.classList.toggle('done', idx + 1 < step);
    });

    // Populate Dynamic Summary at Review step (Step 3)
    if (step === 3) {
      const summaryItems = document.getElementById('checkoutReviewItems');
      const cart = this.getCart();
      if (summaryItems) {
        summaryItems.innerHTML = cart.map(it => `
          <div class="review-item-line">
            <span>${it.quantity}x ${it.name}</span>
            <strong>${this.formatEGP(it.unitPrice * it.quantity)}</strong>
          </div>
        `).join('');
      }

      const subtotal = this.getCartSubtotal();
      const voucher = this.getAppliedVoucher();
      const discountInfo = this.getAppliedVoucherDiscount(subtotal);
      const discountAmount = discountInfo.amount;

      const hasFreeDelivery = this.selectedDeliveryMethod === 'pickup' || subtotal >= 300 || (voucher && voucher.freeDelivery && discountInfo.isQualified);
      const deliveryFee = hasFreeDelivery ? 0 : 25;
      const total = Math.max(0, subtotal - discountAmount + deliveryFee);

      document.getElementById('reviewSubtotal').textContent = this.formatEGP(subtotal);
      document.getElementById('reviewDeliveryFee').textContent = deliveryFee === 0 ? (this.getLanguage() === 'ar' ? 'مجاناً' : 'FREE') : this.formatEGP(deliveryFee);

      const revDiscRow = document.getElementById('reviewDiscountRow');
      const revDiscTag = document.getElementById('reviewDiscountCode');
      const revDiscVal = document.getElementById('reviewDiscountAmount');
      if (revDiscRow && revDiscVal) {
        if (voucher && discountAmount > 0) {
          revDiscRow.style.display = 'flex';
          if (revDiscTag) revDiscTag.textContent = voucher.code;
          revDiscVal.textContent = `-${this.formatEGP(discountAmount)}`;
        } else {
          revDiscRow.style.display = 'none';
        }
      }

      document.getElementById('reviewTotal').textContent = this.formatEGP(total);

      // Address and payment summary
      const activeAddr = this.getActiveAddress();
      document.getElementById('reviewDeliveryAddress').textContent = this.selectedDeliveryMethod === 'pickup' ? 'Restaurant Pickup (Gleem Bay Branch)' : activeAddr.address;
      document.getElementById('reviewPaymentMethod').textContent = this.selectedPaymentMethod === 'cod' ? 'Cash on Delivery' : (this.selectedPaymentMethod === 'card' ? 'Credit Card (Visa •••• 4242)' : 'Vodafone Cash Wallet');
    }
  },

  nextCheckoutStep() {
    if (this.currentCheckoutStep < 3) {
      this.renderCheckoutStep(this.currentCheckoutStep + 1);
    } else {
      this.confirmOrder();
    }
  },

  prevCheckoutStep() {
    if (this.currentCheckoutStep > 1) {
      this.renderCheckoutStep(this.currentCheckoutStep - 1);
    }
  },

  confirmOrder() {
    const cart = this.getCart();
    const subtotal = this.getCartSubtotal();
    const voucher = this.getAppliedVoucher();
    const discountInfo = this.getAppliedVoucherDiscount(subtotal);
    const discountAmount = discountInfo.amount;
    const hasFreeDelivery = this.selectedDeliveryMethod === 'pickup' || subtotal >= 300 || (voucher && voucher.freeDelivery && discountInfo.isQualified);
    const deliveryFee = hasFreeDelivery ? 0 : 25;
    const total = Math.max(0, subtotal - discountAmount + deliveryFee);
    const orderId = '#EGY-' + Math.floor(1000 + Math.random() * 9000);

    const newActiveOrder = {
      id: orderId,
      placedAt: 'Just now',
      status: 'Order Placed',
      statusStep: 1, // Stage 1 of 5
      estimatedMinutes: this.selectedDeliveryMethod === 'pickup' ? '15-20 mins (Pickup)' : '25-35 mins (Delivery)',
      courier: {
        name: 'Captain Tarek',
        phone: '+20 115 998 8776',
        rating: 4.9,
        badge: 'Express Courier'
      },
      address: this.selectedDeliveryMethod === 'pickup' ? 'Pickup at Smouha Kitchen' : this.getActiveAddress().address,
      items: cart,
      subtotal: subtotal,
      discount: discountAmount,
      deliveryFee: deliveryFee,
      voucherCode: voucher ? voucher.code : null,
      total: total,
      paymentMethod: this.selectedPaymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment',
      isCancellable: true,
      cancelPolicyNote: 'You can cancel within 5 minutes before cooking starts.'
    };

    if (voucher) {
      const vouchers = this.getVouchers();
      const vIdx = vouchers.findIndex(v => v.code === voucher.code);
      if (vIdx >= 0) {
        vouchers[vIdx].status = 'used';
        this.saveVouchers(vouchers);
      }
    }

    localStorage.setItem(this.STORAGE_KEYS.ACTIVE_ORDER, JSON.stringify(newActiveOrder));
    localStorage.removeItem(this.STORAGE_KEYS.CART);
    sessionStorage.removeItem('gb_applied_voucher');
    localStorage.removeItem('gb_applied_voucher');

    this.updateCartBadges();
    this.closeCheckout();

    // Show Confirmation Modal
    this.showOrderConfirmationModal(newActiveOrder);
  },

  showOrderConfirmationModal(order) {
    const modal = document.getElementById('orderConfirmedModal');
    if (modal) {
      document.getElementById('confirmedOrderId').textContent = order.id;
      document.getElementById('confirmedEta').textContent = order.estimatedMinutes;
      document.getElementById('confirmedTotal').textContent = this.formatEGP(order.total);
      document.getElementById('confirmedAddress').textContent = order.address;
      document.getElementById('confirmedPayment').textContent = order.paymentMethod;
      modal.classList.add('open');
    }
  },

  // 13. Universal Countdown Timers (Deal of Day & Flash Sale)
  initUniversalTimers() {
    function updateTimers() {
      const now = new Date();

      // 1. Deal of the Day (24-Hour countdown to midnight)
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diffDay = tomorrow - now;
      const dh = Math.floor(diffDay / (1000 * 60 * 60));
      const dm = Math.floor((diffDay % (1000 * 60 * 60)) / (1000 * 60));
      const ds = Math.floor((diffDay % (1000 * 60)) / 1000);
      const pad = (n) => String(n).padStart(2, '0');
      const dayStr = `${pad(dh)}h : ${pad(dm)}m : ${pad(ds)}s`;

      document.querySelectorAll('.deal-of-day-timer').forEach(el => {
        el.textContent = dayStr;
      });

      // 2. Flash Sale (Countdown in 2-hour cycles)
      const chunk = 2 * 60 * 60 * 1000;
      const diffFlash = chunk - (now.getTime() % chunk);
      const fh = Math.floor(diffFlash / (1000 * 60 * 60));
      const fm = Math.floor((diffFlash % (1000 * 60 * 60)) / (1000 * 60));
      const fs = Math.floor((diffFlash % (1000 * 60)) / 1000);
      const flashStr = `${pad(fh)}:${pad(fm)}:${pad(fs)}`;

      document.querySelectorAll('.flash-sale-timer').forEach(el => {
        el.textContent = flashStr;
      });
    }

    updateTimers();
    setInterval(updateTimers, 1000);
  }
};

/* ==========================================================================
   Global Toast Notification
   ========================================================================== */
let appToastTimeout = null;
function showToast(message, type = 'auto') {
  if (!message) return;
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    document.body.appendChild(toast);
  }

  // Detect type and icon from message or argument
  let iconClass = 'fa-solid fa-circle-check';
  let typeClass = 'type-success';
  const msgLower = (message || '').toString().toLowerCase();

  if (type === 'error' || msgLower.includes('invalid') || msgLower.includes('failed') || msgLower.includes('error') || msgLower.includes('غير صالح') || msgLower.includes('خطأ') ) {
    iconClass = 'fa-solid fa-circle-xmark';
    typeClass = 'type-error';
  } else if (type === 'warning' || msgLower.includes('require') || msgLower.includes('minimum') || msgLower.includes('not enough') || msgLower.includes('أضف') ) {
    iconClass = 'fa-solid fa-triangle-exclamation';
    typeClass = 'type-warning';
  } else if (msgLower.includes('favorite') || msgLower.includes('مفضلة') ) {
    iconClass = 'fa-solid fa-heart';
    typeClass = 'type-favorite';
  } else if (msgLower.includes('coupon') || msgLower.includes('voucher') || msgLower.includes('كوبون') || msgLower.includes('خصم') ) {
    iconClass = 'fa-solid fa-ticket';
    typeClass = 'type-voucher';
  } else if (msgLower.includes('cart') || msgLower.includes('سلة') || msgLower.includes('item') ) {
    iconClass = 'fa-solid fa-bag-shopping';
    typeClass = 'type-cart';
  }

  toast.className = `toast-notification ${typeClass}`;
  toast.onclick = () => {
    toast.classList.remove('show');
    toast.classList.remove('pop');
    clearTimeout(appToastTimeout);
  };

  toast.innerHTML = `
    <div class="toast-icon-wrap">
      <i class="${iconClass}"></i>
    </div>
    <span id="toastMessage" class="toast-msg-text">${message}</span>
    <button type="button" class="toast-close-btn" aria-label="Dismiss">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  // Trigger smooth pop / re-entrance
  toast.classList.remove('pop');
  void toast.offsetWidth; // force browser reflow for CSS animation re-trigger
  toast.classList.add('show');
  toast.classList.add('pop');

  clearTimeout(appToastTimeout);
  appToastTimeout = setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.remove('pop');
  }, 3000);
}
window.showToast = showToast;

/* ==========================================================================
   Inject Shared Modals (Smart Cart, Checkout, Notifications, Address Switcher)
   ========================================================================== */
function injectSharedComponents() {
  if (document.getElementById('smartCartDrawer')) return;

  const isAr = AppState.getLanguage() === 'ar';

  const sharedHtml = `
    <!-- Cart Overlay -->
    <div class="cart-drawer-overlay" id="cartDrawerOverlay" onclick="AppState.closeCartDrawer(); AppState.closeNotifications();"></div>

    <!-- 1. SMART CART DRAWER -->
    <aside class="cart-drawer" id="smartCartDrawer" aria-label="Shopping Cart">
      <div class="drawer-header">
        <div class="drawer-title-row">
          <i class="fa-solid fa-bag-shopping"></i>
          <h3>${isAr ? 'سلة الطلبات' : 'My Cart'}</h3>
          <span class="drawer-count-badge" id="cartDrawerItemCount">${isAr ? '0 أصناف' : '0 items'}</span>
        </div>
        <button class="drawer-close-btn" onclick="AppState.closeCartDrawer()" aria-label="Close cart">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Free Delivery Milestone Bar -->
      <div class="free-delivery-milestone">
        <div class="milestone-text" id="freeDeliveryText">
          ${isAr ? 'أضف <strong>75 ج.م</strong> إضافية للحصول على <strong>توصيل مجاني!</strong>' : 'Add <strong>75 EGP</strong> more to unlock <strong>FREE Delivery!</strong>'}
        </div>
        <div class="milestone-progress-track">
          <div class="milestone-progress-fill" id="freeDeliveryProgress" style="width: 65%;"></div>
        </div>
      </div>

      <div class="drawer-body">
        <div class="drawer-empty-state" id="cartEmptyState" style="display:none;">
          <div class="empty-icon"><i class="fa-solid fa-cart-shopping"></i></div>
          <h4>${isAr ? 'سلتك جائعة!' : 'Your cart is hungry!'}</h4>
          <p>${isAr ? 'أضف بعض الوجبات الشهية أو عروض اليوم لتبدأ طلبك.' : 'Add some delicious meals, deals, or pizzas to get started.'}</p>
          <button class="explore-btn" onclick="AppState.closeCartDrawer(); window.location.href='deals.html'">
            ${isAr ? 'تصفح أقوى العروض' : 'Explore Hot Deals'}
          </button>
        </div>

        <div class="drawer-items-list" id="cartItemsList"></div>

        <!-- Voucher Input Box -->
        <div class="cart-voucher-box" id="cartVoucherBox">
          <div class="voucher-input-group">
            <i class="fa-solid fa-ticket"></i>
            <input type="text" id="cartVoucherInput" placeholder="${isAr ? 'أدخل كود الخصم (مثال: WELCOME50)' : 'Enter promo code (e.g. WELCOME50)'}" uppercase />
            <button onclick="AppState.applyVoucher(document.getElementById('cartVoucherInput').value)">${isAr ? 'تطبيق' : 'Apply'}</button>
          </div>
          <div class="voucher-suggestion-pill" onclick="AppState.applyVoucher('WELCOME50')">
            <i class="fa-solid fa-sparkles"></i> <strong>WELCOME50</strong> ${isAr ? 'متاح لخصم 50 ج.م!' : 'available for 50 EGP OFF!'}
          </div>
        </div>
      </div>

      <div class="drawer-footer" id="cartFooter">
        <div class="drawer-summary-row">
          <span>${isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
          <strong id="cartSubtotal">0 ${isAr ? 'ج.م' : 'EGP'}</strong>
        </div>
        <div class="drawer-summary-row" id="cartDiscountRow" style="display:none; color:var(--green);">
          <span>${isAr ? 'خصم الكوبون' : 'Voucher Discount'}</span>
          <strong id="cartDiscountAmount">-0 ${isAr ? 'ج.م' : 'EGP'}</strong>
        </div>
        <div class="drawer-summary-row">
          <span>${isAr ? 'رسوم التوصيل' : 'Delivery Charge'}</span>
          <strong id="cartDeliveryFee">25 ${isAr ? 'ج.م' : 'EGP'}</strong>
        </div>
        <div class="drawer-total-row">
          <span>${isAr ? 'الإجمالي (ج.م)' : 'Total (EGP)'}</span>
          <strong id="cartTotal">0 ${isAr ? 'ج.م' : 'EGP'}</strong>
        </div>
        <button class="drawer-checkout-btn" onclick="AppState.openCheckout()">
          <span>${isAr ? 'المتابعة لإتمام الطلب' : 'Proceed to Checkout'}</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </aside>

    <!-- 2. MULTI-STEP CHECKOUT MODAL -->
    <div class="checkout-modal" id="checkoutModal">
      <div class="checkout-modal-content">
        <div class="checkout-modal-header">
          <h3>${isAr ? 'إتمام الطلب' : 'Checkout'}</h3>
          <button class="modal-close-btn" onclick="AppState.closeCheckout()"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <!-- Progress Stepper -->
        <div class="checkout-stepper-bar">
          <div class="checkout-progress-step active" id="chkStep1"><span class="step-num">1</span> ${isAr ? 'الاستلام' : 'Method'}</div>
          <div class="checkout-progress-step" id="chkStep2"><span class="step-num">2</span> ${isAr ? 'الدفع' : 'Payment'}</div>
          <div class="checkout-progress-step" id="chkStep3"><span class="step-num">3</span> ${isAr ? 'المراجعة' : 'Review'}</div>
        </div>

        <!-- Step 1: Delivery vs Pickup & Address -->
        <div class="checkout-step-pane" id="paneStep1">
          <h4 class="pane-title">${isAr ? '1. اختر طريقة الاستلام' : '1. Choose Delivery Method'}</h4>
          <div class="delivery-type-toggle">
            <button class="type-btn active" id="btnTypeDelivery" onclick="setDeliveryType('delivery')">
              <i class="fa-solid fa-motorcycle"></i> ${isAr ? 'توصيل لباب المنزل (25-35 د)' : 'Doorstep Delivery (25-35m)'}
            </button>
            <button class="type-btn" id="btnTypePickup" onclick="setDeliveryType('pickup')">
              <i class="fa-solid fa-bag-shopping"></i> ${isAr ? 'استلام من المطعم (15 د)' : 'Restaurant Pickup (15m)'}
            </button>
          </div>

          <div id="addressSelectionBlock">
            <h5 class="sub-pane-title">${isAr ? 'اختر عنوان التوصيل' : 'Select Delivery Address'}</h5>
            <div class="saved-addresses-options">
              <label class="address-option-card">
                <input type="radio" name="checkoutAddress" value="addr-1" checked onchange="AppState.setActiveAddress('addr-1')" />
                <div class="addr-box">
                  <strong>${isAr ? 'المنزل' : 'Home'}</strong>
                  <p>${isAr ? '14 ميدان فيكتور عمانويل، سموحة، الإسكندرية (الدور 4، شقة 12)' : '14 Victor Emmanuel Sq, Smouha, Alexandria (Floor 4, Apt 12)'}</p>
                </div>
              </label>
              <label class="address-option-card">
                <input type="radio" name="checkoutAddress" value="addr-2" onchange="AppState.setActiveAddress('addr-2')" />
                <div class="addr-box">
                  <strong>${isAr ? 'العمل' : 'Office'}</strong>
                  <p>${isAr ? 'أرابيلا بلازا، طريق الكورنيش، ستانلي، الإسكندرية' : 'Arabella Plaza, Stanley Coast Road, Alexandria'}</p>
                </div>
              </label>
            </div>

            <div class="notes-field">
              <label>${isAr ? 'تعليمات التوصيل للسائق' : 'Delivery Instructions'}</label>
              <input type="text" id="checkoutDeliveryNotes" placeholder="${isAr ? 'مثال: اضغط الجرس، اتركه مع حارس العمارة...' : 'E.g., Ring bell, leave with doorman...'}" />
            </div>
          </div>

          <div class="checkout-nav-actions">
            <button class="btn-primary" onclick="AppState.renderCheckoutStep(2)">${isAr ? 'المتابعة للدفع' : 'Continue to Payment'} <i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>

        <!-- Step 2: Payment Method Selection -->
        <div class="checkout-step-pane" id="paneStep2" style="display:none;">
          <h4 class="pane-title">${isAr ? '2. اختر وسيلة الدفع (ج.م)' : '2. Select Payment Method (EGP)'}</h4>
          <div class="payment-selection-grid">
            <label class="payment-option-card">
              <input type="radio" name="checkoutPayment" value="cod" checked onchange="AppState.selectedPaymentMethod='cod'" />
              <div class="pay-card-content">
                <div class="pay-icon"><i class="fa-solid fa-money-bill-wave"></i></div>
                <div>
                  <strong>${isAr ? 'الدفع نقداً عند الاستلام (كاش)' : 'Cash on Delivery (EGP)'}</strong>
                  <p>${isAr ? 'ادفع نقداً للمندوب عند وصول الطلب إلى بابك' : 'Pay cash when the driver arrives at your door'}</p>
                </div>
              </div>
            </label>

            <label class="payment-option-card">
              <input type="radio" name="checkoutPayment" value="card" onchange="AppState.selectedPaymentMethod='card'" />
              <div class="pay-card-content">
                <div class="pay-icon"><i class="fa-brands fa-cc-visa"></i></div>
                <div>
                  <strong>${isAr ? 'بطاقة بنكية / فيزا' : 'Credit / Debit Card'}</strong>
                  <p>${isAr ? 'فيزا تنتهي بـ •••• 4242' : 'Visa ending in •••• 4242'}</p>
                </div>
              </div>
            </label>

            <label class="payment-option-card">
              <input type="radio" name="checkoutPayment" value="wallet" onchange="AppState.selectedPaymentMethod='wallet'" />
              <div class="pay-card-content">
                <div class="pay-icon"><i class="fa-solid fa-mobile-screen"></i></div>
                <div>
                  <strong>${isAr ? 'محفظة فودافون كاش' : 'Vodafone Cash Wallet'}</strong>
                  <p>${isAr ? 'تحويل فوري عبر المحفظة الإلكترونية' : 'Instant mobile wallet transfer'}</p>
                </div>
              </div>
            </label>
          </div>

          <div class="checkout-nav-actions split">
            <button class="btn-secondary" onclick="AppState.renderCheckoutStep(1)"><i class="fa-solid fa-arrow-left"></i> ${isAr ? 'رجوع' : 'Back'}</button>
            <button class="btn-primary" onclick="AppState.renderCheckoutStep(3)">${isAr ? 'مراجعة الطلب' : 'Review Order'} <i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>

        <!-- Step 3: Order Review & Place Order -->
        <div class="checkout-step-pane" id="paneStep3" style="display:none;">
          <h4 class="pane-title">${isAr ? '3. مراجعة الطلب النهائية' : '3. Final Order Review'}</h4>

          <div class="review-box">
            <div class="review-destination">
              <i class="fa-solid fa-location-dot"></i>
              <div>
                <span>${isAr ? 'التوصيل إلى' : 'Delivering to'}</span>
                <strong id="reviewDeliveryAddress">${isAr ? 'سموحة، الإسكندرية' : 'Smouha, Alexandria'}</strong>
              </div>
            </div>
            <div class="review-payment-summary">
              <i class="fa-solid fa-credit-card"></i>
              <div>
                <span>${isAr ? 'طريقة الدفع' : 'Payment via'}</span>
                <strong id="reviewPaymentMethod">${isAr ? 'الدفع عند الاستلام' : 'Cash on Delivery'}</strong>
              </div>
            </div>
          </div>

          <div class="review-items-list" id="checkoutReviewItems"></div>

          <div class="review-totals-card">
            <div class="line"><span>${isAr ? 'المجموع الفرعي' : 'Subtotal'}</span><strong id="reviewSubtotal">0 ${isAr ? 'ج.م' : 'EGP'}</strong></div>
            <div class="line" id="reviewDiscountRow" style="display:none; color:var(--green);">
              <span>${isAr ? 'خصم الكوبون' : 'Coupon Discount'} (<strong id="reviewDiscountCode"></strong>)</span>
              <strong id="reviewDiscountAmount">-0 ${isAr ? 'ج.م' : 'EGP'}</strong>
            </div>
            <div class="line"><span>${isAr ? 'رسوم التوصيل' : 'Delivery Fee'}</span><strong id="reviewDeliveryFee">25 ${isAr ? 'ج.م' : 'EGP'}</strong></div>
            <div class="line total"><span>${isAr ? 'المبلغ الإجمالي' : 'Total Amount'}</span><strong id="reviewTotal">0 ${isAr ? 'ج.م' : 'EGP'}</strong></div>
          </div>

          <div class="checkout-nav-actions split">
            <button class="btn-secondary" onclick="AppState.renderCheckoutStep(2)"><i class="fa-solid fa-arrow-left"></i> ${isAr ? 'رجوع' : 'Back'}</button>
            <button class="btn-primary place-order-btn" onclick="AppState.confirmOrder()">${isAr ? 'تأكيد وإرسال الطلب (ج.م)' : 'Place Order (EGP)'}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. ORDER CONFIRMED SCREEN MODAL -->
    <div class="confirmed-modal" id="orderConfirmedModal">
      <div class="confirmed-modal-content">
        <div class="celebration-icon"><i class="fa-solid fa-circle-check"></i></div>
        <h2>${isAr ? 'تم تأكيد طلبك بنجاح!' : 'Order Confirmed!'}</h2>
        <p class="confirmed-msg">${isAr ? 'المطبخ يقوم الآن بإعداد وجبتك بمكونات طازجة 100%.' : 'We are preparing your feast with fresh ingredients right now.'}</p>

        <div class="confirmed-summary-box">
          <div class="conf-row"><span>${isAr ? 'رقم الطلب' : 'Order Number'}</span><strong id="confirmedOrderId">#EGY-8942</strong></div>
          <div class="conf-row"><span>${isAr ? 'الوقت المقدر' : 'Estimated Time'}</span><strong id="confirmedEta">${isAr ? '25-35 دقيقة' : '25-35 mins'}</strong></div>
          <div class="conf-row"><span>${isAr ? 'المبلغ الإجمالي' : 'Total Amount'}</span><strong id="confirmedTotal">305 ${isAr ? 'ج.م' : 'EGP'}</strong></div>
          <div class="conf-row"><span>${isAr ? 'مكان التوصيل' : 'Destination'}</span><p id="confirmedAddress">${isAr ? 'سموحة، الإسكندرية' : 'Smouha, Alexandria'}</p></div>
          <div class="conf-row"><span>${isAr ? 'طريقة الدفع' : 'Payment'}</span><p id="confirmedPayment">${isAr ? 'الدفع نقداً عند الاستلام' : 'Cash on Delivery'}</p></div>
        </div>

        <button class="track-order-btn" onclick="window.location.href='orders.html'">
          <i class="fa-solid fa-motorcycle"></i> ${isAr ? 'تتبع الطلب مباشرة' : 'Track Live Order'}
        </button>
      </div>
    </div>

    <!-- 4. NOTIFICATION CENTER DRAWER -->
    <aside class="notifications-drawer" id="notificationsDrawer">
      <div class="drawer-drag-handle"></div>
      <div class="drawer-header">
        <div class="drawer-title-row">
          <div class="notif-header-icon"><i class="fa-solid fa-bell"></i></div>
          <h3 id="notifDrawerHeading">${isAr ? 'الإشعارات' : 'Notifications'}</h3>
          <span class="drawer-count-badge notif-badge-pill" id="notifDrawerUnreadBadge">0 unread</span>
        </div>
        <button class="drawer-close-btn" onclick="AppState.closeNotifications()" aria-label="${isAr ? 'إغلاق الإشعارات' : 'Close Notifications'}">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="drawer-body notif-drawer-body">
        <div class="notif-actions-bar">
          <span class="notif-status-label" id="notifStatusLabel"><i class="fa-solid fa-bell"></i> ${isAr ? 'التحديثات الأخيرة' : 'Recent Updates'}</span>
          <button class="mark-read-btn" onclick="AppState.markNotificationsAsRead()">
            <i class="fa-solid fa-check-double"></i>
            <span>${isAr ? 'تحديد الكل كمقروء' : 'Mark all as read'}</span>
          </button>
        </div>
        <div class="notifications-list" id="notificationsList"></div>
      </div>
    </aside>

    <!-- 5. DELIVERY LOCATION SELECTOR MODAL -->
    <div class="location-switcher-modal" id="locationSwitcherModal">
      <div class="location-modal-card">
        <div class="loc-header">
          <h3>${isAr ? 'اختر عنوان التوصيل' : 'Choose Delivery Address'}</h3>
          <button onclick="document.getElementById('locationSwitcherModal').classList.remove('open')"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="loc-list">
          <div class="loc-item" onclick="AppState.setActiveAddress('addr-1'); document.getElementById('locationSwitcherModal').classList.remove('open')">
            <i class="fa-solid fa-house"></i>
            <div>
              <strong>${isAr ? 'المنزل' : 'Home'}</strong>
              <p>${isAr ? '14 ميدان فيكتور عمانويل، سموحة، الإسكندرية' : '14 Victor Emmanuel Sq, Smouha, Alexandria'}</p>
            </div>
          </div>
          <div class="loc-item" onclick="AppState.setActiveAddress('addr-2'); document.getElementById('locationSwitcherModal').classList.remove('open')">
            <i class="fa-solid fa-briefcase"></i>
            <div>
              <strong>${isAr ? 'العمل' : 'Office'}</strong>
              <p>${isAr ? 'أرابيلا بلازا، طريق الكورنيش، ستانلي، الإسكندرية' : 'Arabella Plaza, Stanley Coast Road, Alexandria'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', sharedHtml);
}

function setDeliveryType(type) {
  AppState.selectedDeliveryMethod = type;
  document.getElementById('btnTypeDelivery').classList.toggle('active', type === 'delivery');
  document.getElementById('btnTypePickup').classList.toggle('active', type === 'pickup');
  const addrBlock = document.getElementById('addressSelectionBlock');
  if (addrBlock) addrBlock.style.display = (type === 'delivery') ? 'block' : 'none';
}

// Notification Drawer controls
AppState.openNotifications = function() {
  let drawer = document.getElementById('notificationsDrawer');
  let overlay = document.getElementById('cartDrawerOverlay');
  if (!drawer || !overlay) {
    if (typeof injectSharedComponents === 'function') injectSharedComponents();
    drawer = document.getElementById('notificationsDrawer');
    overlay = document.getElementById('cartDrawerOverlay');
  }
  if (drawer && overlay) {
    this.renderNotificationsList();
    this.updateNotificationBadges();
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

AppState.closeNotifications = function() {
  const drawer = document.getElementById('notificationsDrawer');
  const overlay = document.getElementById('cartDrawerOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
};

AppState.markNotificationsAsRead = function() {
  const notifs = this.getNotifications().map(n => ({ ...n, read: true }));
  localStorage.setItem(this.STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  this.updateNotificationBadges();
  this.renderNotificationsList();
  const isAr = this.getLanguage() === 'ar';
  showToast(isAr ? 'تم تحديد جميع الإشعارات كمقروءة' : 'All notifications marked as read');
};

AppState.handleNotificationClick = function(id, actionUrl) {
  const notifs = this.getNotifications().map(n => n.id === id ? { ...n, read: true } : n);
  localStorage.setItem(this.STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  this.updateNotificationBadges();
  this.renderNotificationsList();
  if (actionUrl && actionUrl !== '#') {
    this.closeNotifications();
    setTimeout(() => {
      window.location.href = actionUrl;
    }, 150);
  }
};

AppState.renderNotificationsList = function() {
  const list = document.getElementById('notificationsList');
  if (!list) return;
  const notifs = this.getNotifications();
  const isAr = this.getLanguage() === 'ar';

  if (!notifs || notifs.length === 0) {
    list.innerHTML = `
      <div class="notif-empty-state">
        <div class="notif-empty-icon"><i class="fa-regular fa-bell-slash"></i></div>
        <h4>${isAr ? 'لا توجد إشعارات حالياً' : 'All caught up!'}</h4>
        <p>${isAr ? 'أنت على اطلاع دائم. سنرسل لك تنبيهات بالعروض الحصرية وحالة وجباتك.' : "You have no new alerts right now. We'll notify you about delicious deals & deliveries."}</p>
      </div>
    `;
    return;
  }

  list.innerHTML = notifs.map(n => {
    const isUnread = !n.read;
    const type = n.type || 'info';
    const iconClass = n.icon || (type === 'deal' ? 'fa-solid fa-fire' : type === 'order' ? 'fa-solid fa-motorcycle' : type === 'loyalty' ? 'fa-solid fa-gift' : 'fa-solid fa-bell');
    const catName = type === 'deal' ? (isAr ? 'عرض خاص' : 'Deal') : type === 'order' ? (isAr ? 'حالة الطلب' : 'Delivery') : type === 'loyalty' ? (isAr ? 'مكافآت' : 'Reward') : (isAr ? 'تنبيه' : 'Alert');
    const title = isAr ? (n.titleAr || n.title) : n.title;
    const desc = isAr ? (n.descAr || n.desc || '') : (n.desc || n.descAr || '');
    const time = isAr ? (n.timeAr || n.time) : n.time;
    const actionText = isAr ? (n.actionTextAr || 'عرض التفاصيل') : (n.actionText || 'View Details');
    const actionUrl = n.actionUrl || '#';

    return `
      <div class="notif-item ${isUnread ? 'unread' : ''}" onclick="AppState.handleNotificationClick('${n.id}', '${actionUrl}')" role="button" tabindex="0">
        <div class="notif-icon-box ${type}">
          <i class="${iconClass}"></i>
        </div>
        <div class="notif-content">
          <div class="notif-top-line">
            <span class="notif-category-tag ${type}">${catName}</span>
            <span class="notif-time-tag"><i class="fa-regular fa-clock"></i> ${time}</span>
          </div>
          <h4 class="notif-title">${title}</h4>
          ${desc ? `<p class="notif-desc">${desc}</p>` : ''}
          <div class="notif-action-link">
            <span>${actionText}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
        ${isUnread ? '<div class="notif-unread-dot" title="Unread"></div>' : ''}
      </div>
    `;
  }).join('');
};

// DOM Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  injectSharedComponents();
  AppState.applyPageTranslations();
  AppState.updateCartBadges();
  AppState.updateNotificationBadges();
  AppState.updateHeaderProfileInfo();
  AppState.updateFavoriteButtons();
  AppState.initUniversalTimers();

  // Attach Top Cart Button Triggers
  document.querySelectorAll('.open-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      AppState.openCartDrawer();
    });
  });

  // Attach Notification Button Triggers
  document.querySelectorAll('.open-notif-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      AppState.openNotifications();
    });
  });

  // Attach Location Switcher Trigger
  document.querySelectorAll('.location-picker').forEach(el => {
    el.addEventListener('click', () => {
      document.getElementById('locationSwitcherModal')?.classList.add('open');
    });
  });
});
