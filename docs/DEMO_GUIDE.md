# OMRS FYP Demo Guide

Use this script for the 30-minute Final Year Project presentation.

## Recommended Demo Flow

**1. Introduction (3 min)**
- "Today I'll demonstrate OMRS, an Online Medical Record System designed for the modern Pakistani healthcare context."
- Highlight the problem: paper records, fragmented data, lost histories.
- Show the landing page briefly.

**2. Login & Dashboard (3 min)**
- Login as **Dr. Sarah Khan** (`sarah.khan@omrs.health`).
- Highlight: The Command Palette (cmd+K) and the role-tailored dashboard layout.

**3. Patient Management (5 min)**
- Search for "Tariq Mehmood" using the global search.
- Show the Patient Hub: the persistent hero card and the 14-tab navigation structure.
- Point out the active allergy banner.

**4. Clinical Workflow (10 min)**
- **Problems Tab**: Show ICD-10 coded problems.
- **Allergies Tab**: Show life-threatening alerts.
- **Vitals Tab**: Point out the interactive charts and trend lines.
- **Medications Tab**: Discuss the active medication list and polypharmacy warnings.
- **Labs Tab**: Show a recently entered critical lab value (e.g., Glucose 25 mg/dL) and the acknowledgment workflow.

**5. Prescribing Workflow (5 min)**
- Click "+ New Prescription".
- Type a drug name and show the autocomplete feature.
- **Crucial**: Demonstrate a drug-allergy alert triggering in the safety sidebar.
- Sign the prescription (mention the Step-Up authentication flow).

**6. Analytics & Intelligence (5 min)**
- Navigate to `/analytics`.
- Show the population health dashboard (disease burden heatmaps).
- Build a custom query in Advanced Search: "Diabetics with HbA1c > 7.5%".

**7. Admin & Security (4 min)**
- Switch to the Admin account (`admin@omrs.health`).
- Navigate to the **Audit Logs**.
- **Crucial**: Show the cryptographic hash chain verification proving immutability.
- Show the System Health dashboard.

## Tips for Evaluators
- Emphasize the 15-module architectural approach.
- Explain that the UI is completely Server-Side Rendered (Next.js App Router).
- Point out the security measures (PII encryption, role-based access).
