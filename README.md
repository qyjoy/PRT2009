<img width="998" height="560" alt="440" src="https://github.com/user-attachments/assets/be96a87d-3d4a-42ef-ae78-e2935ebb9fcf" />


# 🌿 Eco-Orchard: Advanced Biology

![Platform](https://img.shields.io/badge/Platform-Cloudflare_Workers-orange?style=flat&logo=cloudflare)
![Architecture](https://img.shields.io/badge/Architecture-Edge_Computing-blueviolet)
![Focus](https://img.shields.io/badge/Focus-Sustainable_Agriculture-green)

**A high-fidelity agro-ecosystem simulation running on the global edge.**

Developed by **Group 2** for the *PRT 2009* Project.

## 📖 Overview

**Eco-Orchard** is a full-stack serverless web application designed to gamify complex agricultural concepts. Unlike traditional farming simulators, this project utilizes a **resource-management algorithm** that forces players to balance economic viability with environmental stewardship.

The game runs on **Cloudflare’s Distributed Edge Network**, ensuring ultra-low latency and minimal digital carbon footprint, aligning the technical architecture with the game's sustainability theme.

---

## 💻 Technical Architecture (Edge Computing)

This project demonstrates the power of **Serverless Edge Computing**:

*   **Global Distribution:** The game logic executes on Cloudflare's distributed nodes closest to the user, not on a centralized server.
*   **Full-Stack Worker:** Both the frontend (HTML/CSS/DOM) and backend logic (State Management, Game Loop) are rendered server-side within a single lightweight worker script.
*   **Digital Sustainability:** The event-driven architecture ensures zero idle energy consumption, reducing the computational carbon footprint.

---

## 🌾 Agricultural & Biological Mechanics

The game engine simulates real-world biological constraints:

### 1. The Nitrogen Cycle & Soil Health
*   **Nitrogen Fixation:** Implements `legume-rhizobia` symbiosis logic. Planting **Long Beans** (Legumes) restores "Soil N" levels without synthetic fertilizers.
*   **Nutrient Depletion:** Cash crops (Durian, Mango) actively consume soil nutrients, requiring soil regeneration strategies.

### 2. Integrated Pest Management (IPM)
*   **Dynamic Threats:** Stochastic algorithms generate random pest (Aphid) outbreaks based on environmental factors.
*   **Decision Matrix:** Players must choose between:
    *   *Chemical Control:* Fast but degrades the `Eco-Score` variable and soil health.
    *   *Biological Control:* Releasing **Ladybugs** (Natural Predators) to restore balance sustainably.

### 3. Crop Rotation Logic
*   **Monoculture Penalty:** The system tracks plot history. Planting the same crop consecutively triggers a **30% yield reduction penalty**, simulating pathogen buildup and nutrient exhaustion.

---

<img width="1247" height="889" alt="image" src="https://github.com/user-attachments/assets/85485754-2f5b-4b6e-a438-3585a695e931" />

### How to play
1.  **Plant & Rotate:** Select seeds from the *Biology Tab*. Click a plot to plant. **Avoid planting the same crop twice in a row** to prevent yield penalties.
2.  **Monitor Soil N:** Soil fertility drops with fruit crops. Plant **Long Beans (Legumes)** to naturally fix nitrogen and restore soil health.
3.  **Manage Pests:** If a plot turns red (Aphid attack), click it and select **Biological Control** (Ladybugs) to solve the problem without harming the environment.
4.  **Harvest:** Click fully grown crops to earn Money and Eco-points.

## 🎯 Game Objectives
<img width="677" height="614" alt="image" src="https://github.com/user-attachments/assets/081630dc-c703-4634-862e-4051405bf32b" />

*   **Economic Goal:** Accumulate **500 Money**.
*   **Ecological Goal:** Maintain **100 Eco-Score**.

> *Success requires systemic thinking—treating the farm not as a factory, but as a living ecosystem.*
