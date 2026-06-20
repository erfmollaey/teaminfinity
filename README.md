# Immersive 3D Particle Portfolio

An ultra-high-performance, creative portfolio website that blends cutting-edge Full-stack engineering with minimalist aesthetics. Powered by **Next.js**, **Three.js (React Three Fiber)**, and **Framer Motion**, this project orchestrates a massive system of **500,000 dynamic particles** that fluidly morph across 7 distinct geometric states based on precise frame-accurate scroll timelines.

---

## Core Architecture & Visual Milestones

The entire experience is driven by a unified WebGL canvas acting as a backend-driven particle matrix, shifting shapes dynamically as the user scrolls through the presentation:

* **00. Loading Phase (Starburst Spiral Galaxy):** A dual-arm logarithmic spiral with a hyper-dense glowing core, optimizing draw range dynamically ($45k \to 500k$ particles) to maximize rendering performance during server-side boots.
* **01. Hero Section (The Infinity Loop):** The galaxy condenses into a mathematically pure infinity symbol ($\infty$), establishing the core brand identity: *"Infinity is in our DNA."*
* **02. About Section (3D Interactive Cube):** Particles wrap into a solid 3D cube matching a bespoke, accumulated typography fade effect where words lock into full brightness step-by-step.
* **03. Technologies (Dynamic Wavy Plane):** A complex, real-time wave simulation displacement utilizing trigonometric offsets running smoothly at 60FPS.
* **04. Works Section (Double-Helix DNA Strand):** Particles re-map into an intricate, twisting DNA structure showcasing engineering complexity.
* **05. Process Section (Whirlpool Vortex):** A fast-spinning particle vortex utilizing angular velocity matrices.
* **06. Contact Section (Mount Damavand Geometric Cone):** A mathematical tribute utilizing power-based concave distribution formulas, natural ridge noise, and crater rim simulation to form the iconic silhouette of Mt. Damavand.

---

## Tech Stack

* **Framework:** Next.js 15 (App Router, Client-side Optimization)
* **3D Engine:** Three.js / React Three Fiber (@react-three/fiber)
* **Animation & Orchestration:** Framer Motion (Scroll-linked micro-interactions & matrix timelines)
* **Styling:** Tailwind CSS
* **Language:** TypeScript (Strictly typed vectors and matrices)
* **DevOps & Deployment:** Docker / Docker Compose

---

## Optimization & Performance Engineering

Handling half a million particles on a single web thread requires meticulous performance guards:
* **Dynamic Draw Ranges:** Prevents GPU bottlenecks by scaling particles instantly based on loading states.
* **Array Memoization:** Heavily leverages `useMemo` to pre-allocate memory space (`Float32Array`) for all 7 structural forms, completely avoiding garbage collection overhead during transitions.
* **Linear Interpolation (Lerp):** Smooths structural morphing and color shifts (`mat.color.lerpColors`) across custom ease-in-out cubic bezier curves.

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [Docker](https://www.docker.com/) installed.

Install dependencies:

Bash
 npm install
 Run the development server:

Bash
 npm run dev

#### Development

Production Deployment via Docker
The project is fully dockerized to ensure absolute environment replication across staging and production servers.

To spin up the optimized production container, simply run:

Bash
 docker-compose up --build -d

This commands will compile the Next.js production build, optimize asset paths, and launch a background container ready to serve traffic.

##### License
Distributed under the MIT License. See LICENSE for more information.
