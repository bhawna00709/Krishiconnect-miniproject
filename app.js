/**
 * KrishiConnect Advanced Agriculture Engine - Enhanced Multi-Feature Suite
 * Upgrades:
 * 1. Dark/Light Theme Switcher with persistence & proper padding
 * 2. 6 Verified high-resolution agriculture lands
 * 3. 8 Verified direct farm products with working image links
 * 4. Yield & Lease Profit Calculator
 * 5. WhatsApp Share Utility
 * 6. AI Crop Recommendation Helper
 */

const KRISHI_STORAGE_KEYS = {
  USER: 'krishi_active_user',
  LANDS: 'krishi_lands_data',
  PRODUCTS: 'krishi_products_data',
  AGREEMENTS: 'krishi_agreements_data',
  REQUESTS: 'krishi_land_requests',
  ORDERS: 'krishi_orders_data',
  PRICES: 'krishi_mandi_prices',
  LANG: 'krishi_selected_lang',
  THEME: 'krishi_selected_theme',
  PRICE_ALERTS: 'krishi_mandi_alerts'
};

// 6 Seed Lands with 100% verified URLs
const DEFAULT_LANDS = [
  {
    id: "LND-101",
    title: "5.5 Acres Fertile Black Soil Farmland",
    ownerName: "Rameshwar Sharma (Migrated to Delhi)",
    ownerPhone: "+91 98765 43210",
    location: "Meerut District, Uttar Pradesh",
    lat: 28.9845,
    lng: 77.7064,
    area: "5.5 Acres",
    soilType: "Black Loamy Soil",
    waterSource: "Tube Well & Canal Access",
    suitableCrops: "Sugarcane, Wheat, Vegetables",
    leaseDuration: "1 to 3 Years",
    rateType: "Annual Lease / 30% Profit Sharing",
    expectedPrice: "₹ 45,000 / Acre / Year",
    status: "Available",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    description: "High-yield farm land located 12km from Meerut Bypass. Fenced perimeter with 24x7 electricity connection for submersible pump. Owner residing in Delhi.",
    verified: true,
    soilHealth: { ph: 7.2, nitrogen: "High (340 kg/ha)", organicCarbon: "0.78%", moisture: "Optimal (28%)", zinc: "Sufficient" }
  },
  {
    id: "LND-102",
    title: "8 Acres Alluvial Riverbed Agricultural Land",
    ownerName: "Vikramjit Singh",
    ownerPhone: "+91 98112 34567",
    location: "Bulandshahr, Uttar Pradesh",
    lat: 28.4070,
    lng: 77.8498,
    area: "8.0 Acres",
    soilType: "Alluvial Soil",
    waterSource: "Ganga Canal Feeder & Solar Pump",
    suitableCrops: "Rice (Basmati), Mustard, Pulses",
    leaseDuration: "2 to 5 Years",
    rateType: "Fixed Rent or Crop Sharing",
    expectedPrice: "₹ 52,000 / Acre / Year",
    status: "Available",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80",
    description: "Ideal for commercial organic farming or multi-crop rotation. Road touch connectivity for easy tractor and transport movement.",
    verified: true,
    soilHealth: { ph: 6.8, nitrogen: "Medium (280 kg/ha)", organicCarbon: "0.85%", moisture: "High (35%)", zinc: "Moderate" }
  },
  {
    id: "LND-103",
    title: "3.2 Acres Organic-Certified Horticulture Plot",
    ownerName: "Sunita Yadav",
    ownerPhone: "+91 94567 89012",
    location: "Greater Noida (Jewar Belt), UP",
    lat: 28.2250,
    lng: 77.5600,
    area: "3.2 Acres",
    soilType: "Sandy Loam",
    waterSource: "Borewell with Drip Irrigation System",
    suitableCrops: "Exotic Vegetables, Marigold, Polyhouse Berries",
    leaseDuration: "1 Year (Renewable)",
    rateType: "Fixed Cash Lease",
    expectedPrice: "₹ 60,000 / Acre / Year",
    status: "Available",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80",
    description: "Ready-to-use horticulture ground equipped with drip lines. Suitable for greenhouse cultivation or high-density flower farming.",
    verified: true,
    soilHealth: { ph: 7.5, nitrogen: "Medium (240 kg/ha)", organicCarbon: "0.65%", moisture: "Moderate (22%)", zinc: "Sufficient" }
  },
  {
    id: "LND-104",
    title: "12 Acres Large Agro-Farming Tract",
    ownerName: "Chaudhary Mahendra Singh",
    ownerPhone: "+91 99270 11223",
    location: "Aligarh - Khair Road, UP",
    lat: 27.8974,
    lng: 78.0880,
    area: "12.0 Acres",
    soilType: "Clay Loam",
    waterSource: "Dual High-Capacity Borewells",
    suitableCrops: "Maize, Wheat, Dairy Fodder, Potatoes",
    leaseDuration: "3 to 7 Years",
    rateType: "Long-term Lease or Joint Cultivation",
    expectedPrice: "₹ 38,000 / Acre / Year",
    status: "Available",
    image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=800&q=80",
    description: "Expansive tract suitable for cooperative farmer groups or dairy fodder plus grain harvesting. High water table.",
    verified: true,
    soilHealth: { ph: 7.0, nitrogen: "High (360 kg/ha)", organicCarbon: "0.92%", moisture: "Good (30%)", zinc: "Rich" }
  },
  {
    id: "LND-105",
    title: "6.5 Acres Lush Organic Terrace Agro Field",
    ownerName: "Anand Swarup Verma",
    ownerPhone: "+91 98370 66554",
    location: "Hapur Mandi Bypass, UP",
    lat: 28.7306,
    lng: 77.7759,
    area: "6.5 Acres",
    soilType: "Loamy Silt Soil",
    waterSource: "Perennial Canal & Solar Pump",
    suitableCrops: "Mustard, Potato, Green Peas, Pulses",
    leaseDuration: "2 to 4 Years",
    rateType: "Annual Lease or Crop Share (70/30)",
    expectedPrice: "₹ 48,000 / Acre / Year",
    status: "Available",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
    description: "Leveled and laser-graded fertile land with direct approach road for tractor trolley. Certified free from chemical residues for last 3 years.",
    verified: true,
    soilHealth: { ph: 7.1, nitrogen: "High (310 kg/ha)", organicCarbon: "0.80%", moisture: "Optimal", zinc: "Sufficient" }
  },
  {
    id: "LND-106",
    title: "4.8 Acres Well-Irrigated River Basin Ground",
    ownerName: "Devendra Pratap",
    ownerPhone: "+91 97561 22334",
    location: "Baghpat - Yamuna Belt, UP",
    lat: 28.9449,
    lng: 77.2285,
    area: "4.8 Acres",
    soilType: "Sandy Alluvial Soil",
    waterSource: "Yamuna Basin Infiltration Wells",
    suitableCrops: "Watermelon, Zaid Vegetables, Wheat, Sugarcane",
    leaseDuration: "1 to 3 Years",
    rateType: "Fixed Lease or Profit Share",
    expectedPrice: "₹ 42,000 / Acre / Year",
    status: "Available",
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80",
    description: "Exceptional water table (at 25 feet). Ideal for multi-season commercial farming with high vegetable and cereal yields.",
    verified: true,
    soilHealth: { ph: 6.9, nitrogen: "Medium", organicCarbon: "0.75%", moisture: "Very High", zinc: "Optimal" }
  }
];

// 8 Seed Products with 100% verified working images
const DEFAULT_PRODUCTS = [
  {
    id: "PRD-201",
    name: "Farm-Fresh Desi Tomatoes (Hybrid)",
    farmerName: "Kisan Harish Verma",
    location: "Meerut, UP",
    category: "Vegetables",
    price: 32,
    unit: "per kg",
    availableQty: "850 kg",
    harvestDate: "Yesterday",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
    description: "Pesticide-free vine-ripened red tomatoes. Crispy, flavorful, and harvested fresh."
  },
  {
    id: "PRD-202",
    name: "Pure A2 Desi Cow Bilona Ghee",
    farmerName: "Govardhan Organic Dairy",
    location: "Mathura, UP",
    category: "Dairy",
    price: 950,
    unit: "per 1 Liter",
    availableQty: "65 Jars",
    harvestDate: "Batch: Oct 2026",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80",
    description: "Traditional Vedic curd-churned golden bilona ghee from Gir & Sahiwal cows."
  },
  {
    id: "PRD-203",
    name: "Sharbati Golden Wheat Grain (Cleaned)",
    farmerName: "Sardar Baljit Singh",
    location: "Hapur, UP",
    category: "Grains",
    price: 42,
    unit: "per kg (min 50kg bag)",
    availableQty: "4200 kg",
    harvestDate: "Current Rabi Stock",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
    description: "Sun-dried high protein Sharbati wheat, double cleaned and grade-A certified."
  },
  {
    id: "PRD-204",
    name: "Fresh Marigold Festive Flowers (Genda)",
    farmerName: "Yogesh Nursery & Blooms",
    location: "Greater Noida, UP",
    category: "Flowers",
    price: 65,
    unit: "per kg",
    availableQty: "240 kg",
    harvestDate: "Daily Morning",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
    description: "Bright yellow and orange festive marigold blossoms picked fresh at sunrise."
  },
  {
    id: "PRD-205",
    name: "Crisp Kinnow / Orange Fresh Harvest",
    farmerName: "Aman Preet Orchardist",
    location: "Saharanpur, UP",
    category: "Fruits",
    price: 55,
    unit: "per kg",
    availableQty: "1200 kg",
    harvestDate: "2 days ago",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80",
    description: "Sweet and juicy vitamin C rich Kinnow fruits picked directly from our orchards."
  },
  {
    id: "PRD-206",
    name: "Organic Fresh Buffalo Milk / Curd (Dahi)",
    farmerName: "Vrindavan Krishak Samiti",
    location: "Bulandshahr, UP",
    category: "Dairy",
    price: 68,
    unit: "per Liter",
    availableQty: "200 Liters Daily",
    harvestDate: "Fresh Daily",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    description: "Dense 7.5% fat pure thick milk and natural clay-pot set curd."
  },
  {
    id: "PRD-207",
    name: "Premium Long Grain Basmati Rice (Pusa 1121)",
    farmerName: "Kisan Sukhwinder Singh",
    location: "Aligarh, UP",
    category: "Grains",
    price: 88,
    unit: "per kg",
    availableQty: "1800 kg",
    harvestDate: "Aged 1 Year",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    description: "Aromatic extra-long grain aged basmati rice. Non-sticky and fragrant cooking quality."
  },
  {
    id: "PRD-208",
    name: "Farm Fresh Crunchy Red Carrots (Gajar)",
    farmerName: "Mohan Lal Krishak",
    location: "Bulandshahr, UP",
    category: "Vegetables",
    price: 28,
    unit: "per kg",
    availableQty: "950 kg",
    harvestDate: "Today Morning",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80",
    description: "Sweet, juicy red seasonal carrots direct from fertile riverbed fields."
  }
];

const DEFAULT_MANDI_PRICES = [
  { commodity: "Wheat (Gehun)", mandi: "Meerut Mandi (UP)", minPrice: "₹ 2,420", maxPrice: "₹ 2,650", modalPrice: "₹ 2,540 / Qtl", trend: "up", change: "+₹ 45", history: [2480, 2500, 2510, 2530, 2540] },
  { commodity: "Basmati Paddy (Dhan)", mandi: "Karnal / Hapur", minPrice: "₹ 3,600", maxPrice: "₹ 4,250", modalPrice: "₹ 3,980 / Qtl", trend: "up", change: "+₹ 80", history: [3800, 3850, 3900, 3940, 3980] },
  { commodity: "Mustard (Sarson)", mandi: "Aligarh Mandi", minPrice: "₹ 5,300", maxPrice: "₹ 5,850", modalPrice: "₹ 5,620 / Qtl", trend: "down", change: "-₹ 30", history: [5720, 5690, 5670, 5650, 5620] },
  { commodity: "Potato (Aloo)", mandi: "Agra Mandi", minPrice: "₹ 1,100", maxPrice: "₹ 1,450", modalPrice: "₹ 1,280 / Qtl", trend: "up", change: "+₹ 25", history: [1200, 1220, 1250, 1270, 1280] },
  { commodity: "Tomato (Tamatar)", mandi: "Sahibabad Mandi", minPrice: "₹ 1,800", maxPrice: "₹ 2,500", modalPrice: "₹ 2,150 / Qtl", trend: "down", change: "-₹ 120", history: [2400, 2350, 2280, 2220, 2150] },
  { commodity: "Sugarcane (SAP Rate)", mandi: "Western UP Mills", minPrice: "₹ 370", maxPrice: "₹ 390", modalPrice: "₹ 380 / Qtl", trend: "stable", change: "0", history: [380, 380, 380, 380, 380] },
  { commodity: "Desi Cow Ghee", mandi: "Regional Dairy Hub", minPrice: "₹ 820", maxPrice: "₹ 1,050", modalPrice: "₹ 920 / Kg", trend: "up", change: "+₹ 40", history: [860, 880, 890, 910, 920] }
];

const DEFAULT_AGREEMENTS = [
  {
    id: "AGR-2026-001",
    landId: "LND-101",
    landTitle: "5.5 Acres Fertile Black Soil Farmland",
    landowner: "Rameshwar Sharma",
    farmer: "Kisan Rajesh Patel",
    duration: "24 Months (Nov 2026 - Nov 2028)",
    terms: "30% profit share to Landowner, 70% to Cultivator. Farmer responsible for seed, irrigation fuel, and harvest labor. Landowner provides operational tubewell.",
    consideration: "₹ 45,000 security advance + Seasonal Profit Share",
    ownershipOfProduce: "Cultivator has 100% marketing right on final yield with audited accounts.",
    status: "Active & Recorded",
    createdOn: "2026-10-15"
  }
];

// Initialize Storage (Clean reset on schema expansion)
function initKrishiDB() {
  const currentLands = JSON.parse(localStorage.getItem(KRISHI_STORAGE_KEYS.LANDS) || '[]');
  if (currentLands.length < 6) {
    localStorage.setItem(KRISHI_STORAGE_KEYS.LANDS, JSON.stringify(DEFAULT_LANDS));
  }

  const currentProducts = JSON.parse(localStorage.getItem(KRISHI_STORAGE_KEYS.PRODUCTS) || '[]');
  // Re-seed if old broken image is found
  const hasBrokenImg = currentProducts.some(p => p.image && p.image.includes('1566847438217'));
  if (currentProducts.length < 8 || hasBrokenImg) {
    localStorage.setItem(KRISHI_STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
  }

  if (!localStorage.getItem(KRISHI_STORAGE_KEYS.PRICES)) {
    localStorage.setItem(KRISHI_STORAGE_KEYS.PRICES, JSON.stringify(DEFAULT_MANDI_PRICES));
  }
  if (!localStorage.getItem(KRISHI_STORAGE_KEYS.AGREEMENTS)) {
    localStorage.setItem(KRISHI_STORAGE_KEYS.AGREEMENTS, JSON.stringify(DEFAULT_AGREEMENTS));
  }
  if (!localStorage.getItem(KRISHI_STORAGE_KEYS.REQUESTS)) {
    localStorage.setItem(KRISHI_STORAGE_KEYS.REQUESTS, JSON.stringify([
      {
        id: "REQ-701",
        landId: "LND-102",
        landTitle: "8 Acres Alluvial Riverbed Agricultural Land",
        farmerName: "Kisan Sukhwinder Singh",
        farmerPhone: "+91 97188 55443",
        cropIntended: "Organic Basmati Rice & Mustard",
        proposedTenure: "3 Years",
        message: "We have modern machinery and drip equipment ready for this tract.",
        date: "2026-10-28",
        status: "Pending Landowner Review"
      }
    ]));
  }
  applyStoredTheme();
}

// User Auth Helpers
function getActiveUser() {
  const user = localStorage.getItem(KRISHI_STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
}

function setActiveUser(userData) {
  localStorage.setItem(KRISHI_STORAGE_KEYS.USER, JSON.stringify(userData));
  updateNavUser();
}

function logoutUser() {
  localStorage.removeItem(KRISHI_STORAGE_KEYS.USER);
  showToast("Logged out successfully. Redirecting to Login...", "info");
  setTimeout(() => {
    const isPagesDir = window.location.pathname.includes('/pages/') || window.location.href.includes('/pages/');
    window.location.href = isPagesDir ? "login.html" : "pages/login.html";
  }, 450);
}

// Toast notification helper
function showToast(message, type = "success") {
  let container = document.getElementById("krishiToastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "krishiToastContainer";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  const bgClass = type === "success" ? "bg-success text-white" : type === "danger" ? "bg-danger text-white" : "bg-dark text-white";
  toast.className = `toast align-items-center ${bgClass} border-0 show mb-2 shadow`;
  toast.setAttribute("role", "alert");
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body d-flex align-items-center gap-2">
        <i class="bi ${type === 'success' ? 'bi-check-circle-fill' : type === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill'}"></i>
        <span>${message}</span>
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="this.parentElement.parentElement.remove()"></button>
    </div>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 4500);
}

// Voice Assistant Synthesis
function speakKrishiAdvice(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
    showToast("Speaking audio advisory...", "info");
  } else {
    showToast("Voice synthesis not supported in this browser.", "danger");
  }
}

// Theme Switcher (Dark / Light) with smooth state
function applyStoredTheme() {
  const theme = localStorage.getItem(KRISHI_STORAGE_KEYS.THEME) || 'light';
  document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(KRISHI_STORAGE_KEYS.THEME, next);
  showToast(`Switched to ${next === 'dark' ? 'Dark Mode' : 'Light Theme'}!`, "info");
  updateNavUser();
}

// Update Navbar user badge & actions with equal and balanced padding
function updateNavUser() {
  const user = getActiveUser();
  const userArea = document.getElementById("navUserArea");
  if (!userArea) return;

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const themeIcon = currentTheme === 'dark' ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill';

  const themeBtn = `
    <button class="theme-toggle-btn" onclick="toggleTheme()" title="Toggle Dark/Light Mode" aria-label="Toggle Theme">
      <i class="bi ${themeIcon}"></i>
    </button>
  `;

  if (user) {
    userArea.innerHTML = `
      <div class="navbar-actions">
        ${themeBtn}
        <div class="dropdown">
          <button class="btn btn-sm btn-outline-success dropdown-toggle d-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold" type="button" data-bs-toggle="dropdown">
            <i class="bi bi-person-circle fs-6"></i>
            <span>${user.name.split(' ')[0]}</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
            <li><h6 class="dropdown-header">Signed in as <strong>${user.role}</strong></h6></li>
            <li><a class="dropdown-item" href="${getRelativePath('pages/dashboard.html')}"><i class="bi bi-speedometer2 me-2"></i>Dashboard</a></li>
            <li><a class="dropdown-item" href="${getRelativePath('pages/agreements.html')}"><i class="bi bi-file-earmark-check me-2"></i>My Agreements</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="javascript:void(0)" onclick="logoutUser()"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
          </ul>
        </div>
      </div>
    `;
  } else {
    userArea.innerHTML = `
      <div class="navbar-actions">
        ${themeBtn}
        <a href="${getRelativePath('pages/login.html')}" class="btn btn-outline-success btn-sm px-3 py-2 rounded-pill fw-semibold">
          Login
        </a>
        <a href="${getRelativePath('pages/register.html')}" class="btn btn-farm-primary btn-sm px-3 py-2 rounded-pill fw-semibold">
          Register
        </a>
      </div>
    `;
  }
}

function getRelativePath(target) {
  const isInsidePages = window.location.pathname.includes('/pages/');
  if (isInsidePages) {
    if (target.startsWith('pages/')) {
      return target.replace('pages/', '');
    }
    return '../' + target;
  }
  return target;
}

// Yield & Lease Profit Calculator
function calculateProfitShare(acres, cropType, leaseModel, expectedYieldQtl, marketRatePerQtl, inputCosts) {
  const grossRevenue = acres * expectedYieldQtl * marketRatePerQtl;
  const totalCost = acres * inputCosts;
  const netProfit = Math.max(0, grossRevenue - totalCost);

  let ownerShare = 0;
  let farmerShare = 0;

  if (leaseModel === "profitShare") {
    ownerShare = netProfit * 0.30;
    farmerShare = netProfit * 0.70;
  } else {
    ownerShare = acres * 45000;
    farmerShare = grossRevenue - totalCost - ownerShare;
  }

  return {
    grossRevenue: grossRevenue,
    totalCost: totalCost,
    netProfit: netProfit,
    ownerShare: Math.round(ownerShare),
    farmerShare: Math.round(farmerShare)
  };
}

// WhatsApp Share Utility
function shareOnWhatsApp(title, details, url) {
  const text = encodeURIComponent(`🌾 *KrishiConnect Agriculture Alert* 🌾\n\n*${title}*\n${details}\n\n👉 Check on KrishiConnect: ${url || window.location.href}`);
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

// AI Crop Recommendation Helper
function getRecommendedCrops(soilType, waterType, season) {
  const recommendations = {
    "Black": ["Sugarcane (High Yield)", "Wheat (Sharbati/PBW-343)", "Cotton", "Sunflower"],
    "Alluvial": ["Basmati Paddy (Pusa 1121)", "Mustard (Pusa Bold)", "Wheat", "Potato", "Moong Dal"],
    "Sandy": ["Watermelon / Muskmelon", "Bajra (Pearl Millet)", "Groundnut", "Zaid Vegetables", "Marigold Flowers"],
    "Clay": ["Paddy", "Maize (Corn)", "Barley", "Green Fodder (Barseem)"]
  };

  const key = Object.keys(recommendations).find(k => soilType.includes(k)) || "Alluvial";
  return recommendations[key];
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initKrishiDB();
  updateNavUser();
});
