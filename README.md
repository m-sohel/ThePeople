# ThePeople — The Constitution of India for Every Citizen 🇮🇳

[![Expo SDK 58](https://img.shields.io/badge/Expo-SDK%2058-000020.svg?style=flat&logo=expo)](https://expo.dev)
[![React Native 0.88](https://img.shields.io/badge/React%20Native-0.88-61DAFB.svg?style=flat&logo=react)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Offline First](https://img.shields.io/badge/Offline-100%25%20Local-success.svg)](#features)
[![WCAG AA](https://img.shields.io/badge/Accessibility-WCAG%20AA-orange.svg)](#accessibility)
[![Developer](https://img.shields.io/badge/Built%20by-M.%20Sohel-blue.svg?logo=github)](https://github.com/m-sohel/)

A production-quality, **100% offline-first** mobile application designed to bridge the gap between complex constitutional law and everyday Indian citizens—especially those with low legal literacy or elderly readers.

---

## 👨‍💻 Developer & Creator

**Built by [M. Sohel](https://github.com/m-sohel/)**  
GitHub: [https://github.com/m-sohel/](https://github.com/m-sohel/)  
*Created with civic pride to empower every Indian citizen with knowledge of their fundamental rights, duties, and constitutional protections.*

---

## ⚖️ Official Source & Legal Disclaimer

> ### 🏛️ Non-Governmental Educational Initiative
> **ThePeople** is an independent, non-governmental civic educational project created by **M. Sohel**. It is **not** an official application of the Government of India, nor is it affiliated with, endorsed by, or representing the Ministry of Law and Justice or any other governmental department, judiciary, or state authority.

> ### 📜 Verbatim Official Source
> The constitutional data contained within this application is extracted and verified verbatim from the authentic and official publication:
> - **Document:** *The Constitution of India* (English Version, Updated with latest constitutional amendments)
> - **Publisher:** Legislative Department, Ministry of Law and Justice, Government of India
> - **Source Archive:** Preserved locally in `assets/official constitution/english-version.pdf`
> - **Total Coverage:** 500 Articles across 26 Parts, 12 Schedules, and the historic Preamble with 0 extraction errors.

> ### ⚠️ Educational Purpose Notice
> The simplified summaries, citizen scenarios, and plain-language guides provided within the app are designed strictly for educational awareness and constitutional literacy. They do **not** constitute legal advice, judicial interpretation, or formal counsel. For official legal proceedings, please consult the official Gazette of India or a qualified legal advocate.

---

## ✨ Features

- **100% Offline-First Operation**: Every single article, part, schedule, and quiz is packaged inside the app (`assets/data/`). Zero internet access required.
- **Interactive Preamble with Audio**: Line-by-line breakdown of sovereign ideals (*SOVEREIGN, SOCIALIST, SECULAR, DEMOCRATIC, REPUBLIC, JUSTICE, LIBERTY, EQUALITY, FRATERNITY*) with text-to-speech voice narration (`expo-speech`).
- **Dual-View Article Reader**: Seamlessly toggle between **Official Verbatim Legal Text** and **Citizen Plain-Language Explanation** with real-world everyday examples.
- **Full-Text Offline Search**: Sub-millisecond indexed search across all 500 articles, titles, and legal bodies, with keyword highlighting and quick topic pills.
- **Know Your Rights Hub**: Practical guide to the 6 Fundamental Rights groups, Directive Principles of State Policy, and the 11 Fundamental Duties paired with citizen action recommendations.
- **Citizen Constitutional Quiz**: Interactive quizzes across 4 key civic categories with instant educational rationales, score tracking, and achievement badges.
- **Personal Offline Library (Bookmarks)**: Save articles for quick reference, filter by Part, search within saved items, and share formatted excerpts.
- **Bilingual Interface**: Full localization support for **English** and **Hindi (हिंदी)**.
- **WCAG AA Accessible Design**:
  - Tricolour-inspired palette (Deep Saffron `#C25E00`, Ashok Chakra Navy `#0D2040`, India Green `#0F6E3B`).
  - High-contrast text compliance (tested > 4.5:1 for body copy).
  - Dynamic font scaling (Standard 16px, Large 18px, Extra Large 22px).
  - Minimum 48dp touch targets on all interactive components.

---

## 🏗️ Architecture & Technology Stack

- **Framework**: [Expo](https://expo.dev/) (SDK 58) with New Architecture
- **Runtime**: [React Native](https://reactnative.dev/) 0.88 + React 19
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation with tabs and stack layouts)
- **State & Offline Storage**: `@react-native-async-storage/async-storage` with `useSyncExternalStore` for SSR/hydration safety
- **Accessibility & TTS**: `expo-speech` with speech rate and pitch control
- **Icons**: `@expo/vector-icons` (Ionicons)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, or bun
- [Expo Go](https://expo.dev/go) app on your Android or iOS device (or an Android emulator / iOS simulator)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/m-sohel/ThePeople.git
   cd ThePeople
   ```

2. Install dependencies:
   ```bash
   npx expo install
   ```

3. Start the Expo development server:
   ```bash
   npx expo start
   ```

4. Scan the QR code with **Expo Go** (Android) or the Camera app (iOS) to run the application immediately.

---

## 🧪 Verification & Quality Checks

Run the project verification commands:

```bash
# Typecheck
npx tsc --noEmit

# Lint check
npx expo lint

# Expo Doctor diagnostics
npx expo-doctor
```

---

## 📄 License & Attribution

- **Application Code**: Licensed under the MIT License — Copyright (c) 2026 [M. Sohel](https://github.com/m-sohel/).
- **Constitutional Text**: Sourced verbatim from the public domain publications of the Ministry of Law and Justice, Government of India.
