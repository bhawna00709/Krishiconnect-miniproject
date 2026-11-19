# KrishiConnect - Digital Agriculture & Land-Sharing Web Platform

A comprehensive web prototype designed and developed based on the **B.Tech Mini Project Synopsis** submitted to **Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow** by **Bhawna (Roll No: 2501720100045, CSE 2C)** at **Lloyd Institute of Engineering & Technology, Greater Noida**.

---

## 🌾 Core Functional Modules (Mapped to Synopsis)

1. **Unused Agricultural Land Connection (Section 1 & 4)**
   - Allows absentee landowners (e.g., migrated to cities) to list vacant farmland.
   - Comprehensive land specifications: acreage, location, soil classification (Black, Alluvial, Sandy Loam, Clay Loam), water/irrigation source (Tube well, Canal), suitable crops, and expected terms.
   - Farmers/cultivators can search, filter by soil/irrigation, and directly submit digital cultivation applications.

2. **Land-Use Agreement Documentation (NITI Aayog Model Guidelines)**
   - Structured agreement module recording lease tenure (1–5 years), rent or crop profit-sharing ratios (e.g. 70-30), input responsibilities (seeds, fertilizers, diesel, tubewell power), and final produce ownership rights.
   - Printable and PDF-exportable digital agreement certificates.

3. **Direct Agricultural Produce Marketplace**
   - Cultivators list their harvested produce directly for retail buyers and wholesalers.
   - Covers all 5 specified categories: **Vegetables**, **Dairy (Pure Desi Cow Ghee, Milk, Curd)**, **Grains & Pulses**, **Fruits**, and **Flowers**.
   - Built-in cart and direct farm checkout order workflow.

4. **e-NAM Benchmark Mandi Price Discovery**
   - Daily price matrix tracking minimum, maximum, and modal benchmark rates across regional APMC Mandis (Meerut, Hapur, Bulandshahr, Agra, Aligarh).
   - Price trend indicators (Up/Down) with actionable agricultural advice for farmers.

5. **Multi-Role Authentication & Dashboard (Section 4)**
   - Separate experiences for:
     1. **Landowner**
     2. **Farmer / Cultivator**
     3. **Buyer (Consumer / Retailer)**
     4. **Platform Administrator**
   - 1-Click test credentials pre-configured on the login page for rapid viva presentation.

---

## 🚀 How to Run the Website

### Option 1: Direct in Browser
Open `index.html` directly in any web browser (Google Chrome, Microsoft Edge, Firefox).

### Option 2: Local HTTP Server (Python)
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

---

## 📁 File Structure

```
krishiconnect/
│
├── index.html                  # Main Landing Page with Navigation Bar, Hero Section, Feature Highlights
├── css/
│   └── style.css               # Farmer UI/UX Green/Earthy Theme & Responsive Styles
├── js/
│   └── app.js                  # State Management, LocalDB seed engine, Auth & Toast system
│
├── pages/
│   ├── land-search.html        # Land Discovery, Filters & Application/Proposal Modal
│   ├── marketplace.html        # Direct Harvest & Dairy Marketplace with Cart System
│   ├── mandi-prices.html       # Daily e-NAM Commodity Price Matrix & Price Trends
│   ├── agreements.html         # Structured NITI Aayog Model Land-Use Agreements
│   ├── dashboard.html          # Dynamic Role-Based Management & Admin Verification Desk
│   ├── login.html              # Multi-Role Sign In with 1-Click Demo Credentials
│   ├── register.html           # Multi-Role Account Creation (4 Roles)
│   └── about.html              # Full Academic Synopsis & Institutional Documentation
│
├── assets/                     # Media & Document Assets
└── KrishiConnect_Synopsis...   # Source Project Synopsis PDF
```

---

## 🔑 Demo Login Credentials

| Role | Email | Password | Access Highlights |
| :--- | :--- | :--- | :--- |
| **Farmer** | `kisan.rajesh@krishi.in` | `kisan123` | Search land, apply for parcels, list harvest, check mandi rates |
| **Landowner** | `rameshwar.land@krishi.in` | `land123` | List vacant acreage, approve farmer proposals, sign agreements |
| **Buyer** | `anita.buyer@krishi.in` | `buyer123` | Browse fresh produce, add to cart, place direct orders |
| **Admin** | `admin@krishiconnect.edu` | `admin123` | Moderate listings, 1-click verify land, reset database |

