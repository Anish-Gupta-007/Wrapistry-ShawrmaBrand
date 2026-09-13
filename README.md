<div align="center">

  <img src="public/WRAPISTRY_v2_horizontal_darkBG.png" alt="Wrapistry Banner" width="600" />

  # 🌯 WRAPISTRY | Mediterranean Craft Shawarma

  ### *The Gold Standard of Artisanal Mediterranean Street Food*

  [![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-wrapistry--shawrma--brand.vercel.app-E8A33D?style=for-the-badge&logo=vercel)](https://wrapistry-shawrma-brand.vercel.app/)
  [![GitHub Repo](https://img.shields.io/badge/📦_GitHub-Wrapistry--ShawrmaBrand-181818?style=for-the-badge&logo=github)](https://github.com/Anish-Gupta-007/Wrapistry-ShawrmaBrand)
  [![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 🌟 Overview

**Wrapistry** is an immersive, high-performance web experience built for a premium Mediterranean Craft Shawarma brand. Designed with modern web aesthetics, vibrant golden-amber accents, fluid 60fps GSAP scroll animations, 3D interactive galleries, and seamless cart management.

Every wrap is rolled to order in double-baked Saj flatbread with 24-hour slow-marinated prime meats, charcoal roasting, and hand-whipped signature garlic toum.

👉 **[Experience the Live Web Application](https://wrapistry-shawrma-brand.vercel.app/)**

---

## ✨ Key Features

### 🌯 3D Interactive Hero Experience
- **GSAP ScrollTrigger Trajectories**: Seamless frame transformations, scrubbed image sequences, and dynamic parallax title reveals.
- **Lenis Smooth Scroll**: Buttery-smooth scrolling experience across desktop and mobile devices.

### 📜 Craft Menu & Detail Modal
- **Real-Time Filtering**: Filter by category (*Artisanal Wraps, Legend Combos, Craft Sides, Beverages*) or diet (*100% Veg, Craft Meat, Chef's Choice*).
- **Instant Search**: Search by wrap names, spices, or ingredients in real-time.
- **Customization Modal**: Pick spice levels (*Mild 🌿, Medium 🌶️, Fire 🔥*), view key ingredient breakdowns, enter special preparation notes, and add directly to your order.
- **Isolated Card Scroll**: Smart scroll containment keeps inner modal details scrolling without leaking scroll events to the background page.

### 🛒 Slide-Out Interactive Cart Drawer
- **Persistent Cart State**: Powered by React Context API.
- **Customization Breakdown**: Tracks selected spice levels, quantity adjustments, and custom instructions per item.
- **Promo System**: Integrated promo code engine with dynamic discount calculations.

### 📍 Multi-Location Store Finder
- Interactive store cards with real-time status badges (*Open Now / Closing Soon*), Google Maps integration, phone ordering, and address details.

### 📸 3D Interactive Instagram Gallery
- Interactive 3D perspective gallery showcase with tilt dynamics, hover lighting, and direct social links.

### 💼 Franchise & Partnership Portal
- Comprehensive brand story, investment ROI breakdown, tier selection cards, and interactive application form.

### 🌶️ Custom Shawarma Cursor Physics
- Custom animated Saj wrap vector cursor featuring sizzling ember particles, tilt velocity physics, hover text badges, and click sizzle shockwaves (automatically optimized for desktop pointer devices).

### 📱 100% Mobile Responsive
- Zero horizontal layout overflow, fluid typography scaling (`clamp()`), touch-optimized drawers, and custom-tuned viewport breakpoints for all mobile, tablet, and desktop displays.

---

## 🛠️ Tech Stack & Libraries

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) & [GSAP (ScrollTrigger)](https://gsap.com/) |
| **Smooth Scroll** | [@studio-freight/lenis](https://lenis.darkroom.engineering/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **State Management** | React Context API |
| **Deployment** | [Vercel](https://vercel.app/) |

---

## 🚀 Getting Started

Follow these steps to set up and run Wrapistry locally on your machine:

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** or **pnpm**

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Anish-Gupta-007/Wrapistry-ShawrmaBrand.git
cd Wrapistry-ShawrmaBrand
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4️⃣ Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
Wrapistry-ShawrmaBrand/
├── app/
│   ├── about/          # Brand Story & Heritage Page
│   ├── contact/        # Contact & Catering Inquiry Page
│   ├── franchise/      # Franchise Opportunities Portal
│   ├── locations/      # Interactive Locations & Map Finder
│   ├── menu/           # Artisanal Craft Menu & Food Modal
│   ├── order/          # Checkout & Order Confirmation Page
│   ├── privacy/        # Privacy Policy Page
│   ├── terms/          # Terms of Service Page
│   ├── globals.css     # Design Tokens, Glassmorphism & Keyframes
│   ├── layout.tsx      # Root Layout with Font Loaders & Contexts
│   └── page.tsx        # Interactive Landing Page
├── components/
│   ├── gallery/        # 3D Instagram Gallery Showcase
│   ├── hero/           # GSAP Hero Scroll Sequences & Frames
│   ├── menu/           # Food Cards & Slide-out Cart Drawer
│   ├── sections/       # Craft Manifesto & Feature Highlights
│   ├── testimonials/   # Customer Reviews & Rating Showcase
│   └── ui/             # Custom Cursor, Navbar, Footer, Preloader, Magnetic Buttons
├── context/
│   └── CartContext.tsx # Global Cart State & Discount Calculations
├── lib/
│   ├── data.ts         # Menu Data, Ingredients, Locations & Testimonials
│   └── utils.ts        # Helper Functions & Currency Formatter
└── public/             # Brand Assets, Logos, and Images
```

---

## 🌐 Deployment

This project is deployed on **Vercel**.

- **Production URL**: [https://wrapistry-shawrma-brand.vercel.app/](https://wrapistry-shawrma-brand.vercel.app/)
- **Repository**: [https://github.com/Anish-Gupta-007/Wrapistry-ShawrmaBrand](https://github.com/Anish-Gupta-007/Wrapistry-ShawrmaBrand)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

  **Crafted with 🔥 & 🧄 by [Anish Gupta](https://github.com/Anish-Gupta-007)**

</div>
