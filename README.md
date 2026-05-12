# OMRS — Online Medical Record System

> A production-grade healthcare records system built with Next.js, MongoDB, and modern web standards.

## ✨ Features

- **Role-Based Access Control**: Tailored dashboards for Doctors, Nurses, Receptionists, and Admins.
- **Comprehensive Patient Hub**: Centralized view for problems, allergies, vitals, and histories.
- **Smart Prescribing**: Polypharmacy detection, drug-allergy alerts, and real-time safety checks.
- **Clinical Intelligence**: Advanced search, cohort analytics, and care gap detection.
- **Secure Communication**: Real-time messaging, WebSocket notifications, and scheduling.
- **Compliance Ready**: Cryptographically verified audit logs, GDPR data export, and strict permissions.

## 🎬 Live Demo

🔗 https://omrs.health

### Demo Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@omrs.health | Admin@12345 |
| Doctor (Cardiology) | sarah.khan@omrs.health | Doctor@12345 |
| Nurse | aisha.malik@omrs.health | Nurse@12345 |
| Receptionist | recep@omrs.health | Recep@12345 |

## 🏗 Architecture

OMRS is built with:
- **Next.js 14+** (App Router, React Server Components)
- **TypeScript** (strict mode)
- **MongoDB + Mongoose** (HIPAA-compliant audit, field encryption)
- **Tailwind + shadcn/ui + Framer Motion**
- **TanStack Query** for client data fetching
- **socket.io** for real-time capabilities

## 📚 Module Map

OMRS was built across 15 interconnected modules:

| # | Module | Core Functionality |
|---|---|---|
| 1 | Foundation & Design System | Tailwind tokens, shared components, layouts |
| 2 | Database & API Architecture | Mongoose schemas, audit plugin, API helpers |
| 3 | Authentication & RBAC | Session management, 60+ granular permissions |
| 4 | Marketing Pages | Public-facing storefront, blog |
| 5 | Role-Based Dashboards | Role-specific views, widgets, command palette |
| 6 | Patient Management | Patient hub, registration wizard |
| 7 | Core Clinical Data | Problems, allergies, vitals, history |
| 8 | Medication Management | Prescribing, MAR, safety checks |
| 9 | Lab & Radiology | Orders, results, DICOM viewer stub |
| 10 | Clinical Notes | Rich text (Tiptap), templates, signing |
| 11 | Care Plans & Instructions | Clinical guidelines, patient handouts |
| 12 | Advanced Analytics | Query builder, population health, predictive |
| 13 | Communication | Appointments hub, messaging, real-time alerts |
| 14 | Security & Settings | User profiles, audit log viewer, system health |
| 15 | Polish & Deployment | Page transitions, PWA, CI/CD, documentation |

See `docs/MODULE_MAP.md` for more details.

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/yourusername/omrs.git
cd omrs

# Install
pnpm install

# Configure environment
cp .env.example .env.local

# Seed demo data
pnpm tsx scripts/seed-demo.ts

# Start development server
pnpm dev
```

Open http://localhost:3000

## 🔐 Security

- PII encrypted at rest
- Cryptographic hash chain on Audit Logs
- Content Security Policy & Rate Limiting

## 🙏 Acknowledgments

Built as a Final Year Project using an advanced modular AI-assisted approach.
