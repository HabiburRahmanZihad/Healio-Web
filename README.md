<div align="center">
  <img src="public/Healio_logo_png.png" alt="Healio Logo" width="220" />
  <h1>🩺 HEALIO</h1>
  <p><strong>Next-Gen Healthcare Management & Digital Pharmacy Nexus</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-12.0-ff0055?style=for-the-badge&logo=framer" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Better_Auth-1.4.17-orange?style=for-the-badge&logo=auth0" alt="Better Auth" />
  </p>
</div>

---

## 📖 Introduction

**Healio** is a cutting-edge healthcare platform designed to bridge the gap between patients, healthcare providers, and pharmacies. Engineered with the latest **Next.js 16** architecture, it features a bespoke design system called **"Identity Nexus"**, delivering a high-performance, visually stunning, and secure user experience.

---

## 🚀 Technical Core & Architecture

The frontend is built on a foundation of speed, reliability, and modularity.

### 🛠️ The Stack
- **Framework**: `Next.js 16` (App Router, Server Actions, Parallel Intercepted Routes)
- **Language**: `TypeScript` (Type-safe schemas, interfaces, and API responses)
- **Styling**: `Tailwind CSS 4` (Modern CSS variables, advanced utility-first design)
- **Animations**: `Framer Motion 12` (Orchestrated scroll-reveal, staggered lists, and micro-interactions)
- **Auth**: `Better Auth` (Highly secure session management, role-based access control)
- **Toasts**: `Sonner` (Interactive, premium feedback system)
- **State**: `React Context` + `TanStack Form` (Optimized state management and form validation)

### 📁 Project Architecture Details
```yaml
src/
├── app/                  # Routing & Layout Hierarchy
│   ├── (commonLayout)/   # Public pages (Medicines, Wellness, About)
│   ├── (dashboardLayout)/# Role-based secure views (@admin, @seller, @user)
│   └── (auth)/          # Premium Signup & Login flows
├── components/           # UI Component Ecosystem
│   ├── ui/               # Core low-level primitives (Radix UI + Shadcn)
│   ├── shared/           # Reusable system components (Navbar, Footer)
│   └── modules/          # Feature-specific complex components
├── services/             # Axios/Fetch abstraction for Backend Sync
├── providers/            # Context Providers (Cart, Auth, Theme, Toast)
├── types/                # Global TypeScript declarations
└── lib/                  # Auth clients, utils (cn), and configurations
```

---

## ✨ Primary Features & Modules

### 👑 Command Center (Admin Analytics)
- **Real-time Metrics**: Interactive stats for revenue, users, and orders.
- **Revenue Trajectory**: Dynamic SVG-based visualizations of fiscal performance.
- **Node Sync**: Intelligent multi-node synchronization tools for database consistency.

### 🛡️ Wellness Hub & Subscription Matrix
- **Premium Plans**: Tiered membership (Basic, Pro, Elite) with feature comparisons.
- **Health Tips Hub**: A central node for expert medical briefings and vitality guides.
- **Integration**: Real-time "Coming Soon" toast notifications for future premium modules.

### ⚡ Flash Sale Engine
- **Countdown Sync**: High-performance timers for time-sensitive pharmaceuticals.
- **Real-time Inventory**: Automatic stock-level synchronization during sales.

### 📦 Pharmacy Management (Seller Portal)
- **Inventory Matrix**: Sophisticated CRUD for medications with categorized listings.
- **Order Tracking**: Comprehensive lifecycle management from placement to fulfillment.

---

## 🛠️ Setup & Development

### 1️⃣ Clone and Install
```bash
git clone https://github.com/HabiburRahmanZihad/healio-web.git
cd healio-web/Frontend
npm install
```

### 2️⃣ Environment Configuration
Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_BASE_URL=your_api_url
BETTER_AUTH_URL=your_auth_url
# See .env.example for more
```

### 3️⃣ Launch Engine
```bash
npm run dev
```

---

## 🎨 Design Philosophy: The Identity Nexus

The **Identity Nexus** system is built on three pillars:
1. **Glassmorphism**: Using `backdrop-blur-xl` and `bg-white/[0.02]` to create depth and transparency.
2. **Ambient Lighting**: Animated background glows that react to user interaction.
3. **Micro-Feedback**: Every button, input, and state change triggers a purposeful visual response (e.g., Lucide icon morphs, Sonner toasts).

---

## 📄 License & Creator

Developed with 💎 Precision & ❤️ Care by **[Habibur Rahman Zihad](https://habibur-rahman-zihad.vercel.app/)**

*Licensed under the ISC License. All rights reserved.*
