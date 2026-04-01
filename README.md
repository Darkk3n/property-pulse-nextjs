# Property Pulse 🏠

A high-performance, full-stack property management platform built with **Next.js 14**, **TypeScript**, and **MongoDB**. 

> **Technical Evolution:** Originally developed as a JavaScript-based training module, I completely re-architected this project into **Strict TypeScript**. This migration was driven by a requirement for enterprise-grade type safety, predictable data structures, and a more robust developer experience.

## 🚀 Key Engineering & Techniques

* **JS to TypeScript Migration:** Refactored the entire codebase to TS, implementing custom interfaces for Mongoose models (`HydratedDocument`) and Next.js Page Props to eliminate "any" types and runtime crashes.
* **Secure Authentication (Next-Auth):** Integrated **Google OAuth** for a seamless, industry-standard authentication flow.
* **Advanced Media Handling (Cloudinary):** Implemented dynamic image storage and optimization. 
* **Interactive Galleries (PhotoSwipe):** Integrated high-performance lightboxes for a premium property-viewing experience.
* **Data Integrity & Serialization:** * **Custom Serialization:** Engineered a recursive utility to bridge the gap between MongoDB's `ObjectIDs/Dates` and Next.js Server Components, preventing "Plain Object" errors.
    * **Relational Mapping:** Solved complex Mongoose `.populate()` typing challenges using `Omit` and `Extension` interfaces.
* **Dynamic Search Engine:** Built a multi-parameter filtering engine using Mongoose regex and logical operators for real-time property discovery.

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router & Server Actions) |
| **Language** | **TypeScript** (Complete Refactor from JS) |
| **Database** | MongoDB via Mongoose 9 |
| **Auth** | Next-Auth.js (Google Provider) |
| **Media** | Cloudinary + PhotoSwipe |
| **UI Polish** | Tailwind CSS, React Icons, Toastify, React Spinners |

## 🧩 Challenges Surpassed

### 1. Type-Safe Hydration
Coming from a JavaScript background, managing Mongoose documents in TypeScript required a deep dive into `HydratedDocument`. I successfully implemented a pattern that maintains Mongoose's internal methods (like `.save()`) while ensuring strict property checking.

### 2. The Next.js / Mongoose "Bridge"
Next.js Server Components require "Plain Objects" to be passed to the Client. I developed a serialization layer that sanitizes complex MongoDB documents, ensuring the app remains stable during data handoffs.

### 3. HMR Stability
Resolved issues with Next.js Hot Module Replacement (HMR) attempting to re-compile Mongoose models by implementing a robust Singleton pattern for model exports.
