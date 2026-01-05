# Regression‑Adjusted CMA

**A lender‑ and builder‑grade valuation report that starts with trusted comps and finishes with transparent math.**

---

## 1. Problem

Pricing residential property – especially **new construction, custom homes, and collateral for construction lending** – is still done with:
- Manual comp selection
- Hand‑wavy $/sqft adjustments
- Excel grids no one wants to audit
- Pretty CMA PDFs that lack mathematical justification

Existing tools:
- **MLS CMAs**: good data, weak math
- **Cloud CMA / RPR**: polished, but mostly narrative
- **AVMs**: automated, but opaque and poorly trusted for edge cases

**There is no lightweight tool that produces a statistically defensible, explainable comp‑based valuation report.**

---

## 2. Product Vision

A focused tool that generates a **regression‑adjusted Comparable Market Analysis (CMA)** using **user‑selected comps**, producing a report that:
- feels familiar to agents,
- is defensible to lenders,
- and is explainable to builders and borrowers.

This is **not** an AVM.
This is **“take the comps you already trust and do the math properly.”**

---

## 3. Target Users

### Primary
- **Residential real estate agents** (pricing listings, justifying price)
- **Construction lenders** (as‑complete / as‑is value support)
- **Builders & developers** (pricing spec homes, feasibility checks)

### Explicitly Not
- Casual consumers
- Zestimate‑style home shoppers

---

## 4. Core Use Case

> “Here are the comps I trust – tell me what the value really is, and show me why.”

### Workflow
1. Enter subject property details
2. Upload comps (MLS / Cloud CMA / RPR CSV)
3. Configure basic assumptions
4. Generate a **regression‑adjusted valuation report**
5. Export a lender‑ready PDF

---

## 5. MVP Scope (Do One Thing Well)

### Inputs

**Subject Property**
- Address
- Beds / baths
- Gross living area (GLA)
- Lot size
- Year built
- Property type
- Optional notes (condition, finish level)

**Comparable Properties**
- Uploaded via CSV (MLS, Cloud CMA, RPR export)
- Required fields:
  - Address / coordinates
  - Sale price
  - Sale date
  - GLA
  - Beds / baths
  - Year built

---

## 6. Modeling Approach (Intentionally Simple)

### Philosophy
- Trust > novelty
- Explainability > black box accuracy
- Stability > cleverness

### Model
- Linear or ridge regression
- Target: sale price (or price per sqft)
- Features:
  - GLA
  - Beds
  - Baths
  - Lot size
  - Year built / age
  - Distance to subject
  - Time adjustment (sale date)

### Safeguards
- Minimum comp count
- Outlier detection (high residuals)
- Confidence grading (A–D)

---

## 7. Report Output (The Product)

### Page 1 – Valuation Summary
- Subject snapshot
- Estimated value
- Value range
- Confidence score

### Page 2 – Comparable Table
- Raw comps
- Distance, age, size deltas
- Similarity score

### Page 3 – Regression Adjustments
- Coefficients expressed as adjustments
- Adjusted comp prices
- Residuals per comp

### Page 4 – Charts
- Price vs GLA (with regression line)
- Adjusted vs unadjusted price distribution
- Sale price trend over time

---

## 8. Key Differentiators

- **Regression‑based adjustments** instead of narrative guesses
- **Transparent math** – every number is explainable
- **User‑chosen comps** (no “mystery data”)
- **New‑construction friendly** (as‑complete assumptions)
- **Lender‑ready PDF**, not a listing presentation

---

## 9. Data Strategy (No MLS Required)

### MVP
- User‑uploaded MLS exports
- Public record enrichment (optional)

### Why This Works
- Agents already export comps daily
- No additional MLS cost to the user
- Fully compliant with MLS rules
- Avoids licensing and fragmentation early

MLS integration only becomes necessary after traction.

---

## 10. Market Fit (Bellingham / Whatcom County)

### Current Standard
- NWMLS Matrix CMA
- Cloud CMA
- Manual Excel adjustments

### Gap
- No statistical adjustment engine
- No audit‑friendly math
- No construction‑specific valuation tooling

This product **slots in alongside existing workflows**, not against them.

---

## 11. Pricing Strategy

### Pay‑Per‑Report
- $15–$50 per report

### Pro Subscription
- $99–$299 / month
- Included reports

### Lender / Builder
- Custom pricing

---

## 12. Why This Works as a Solo Dev Project

- Narrow scope
- Clear wedge
- No MLS licensing required
- High perceived value
- Technically achievable

This is not a Zillow competitor.
This is a **pricing justification tool**.

---

## 13. Expansion Paths (Later)

- MLS direct integrations
- Appraisal‑style forms
- Scenario comparisons (as‑is vs as‑complete)
- Saved market presets
- Team accounts

---

## 14. One‑Sentence Pitch

> **“A regression‑adjusted CMA that turns trusted comps into a lender‑grade valuation – with math you can explain.”**


---

# 15. One‑Page Pitch & Go‑To‑Market Plan

## Product Name (Working)
**CompClear**  
_Subtitle: Regression‑Adjusted CMAs you can actually explain_

---

## The Pitch (1 Page)

### Headline
**Turn trusted comps into a lender‑grade valuation – with math you can defend.**

### Sub‑headline
CompClear generates regression‑adjusted CMA reports from the comps you already trust, producing clear value ranges, adjustments, and confidence scores for real estate, construction, and lending decisions.

---

### The Problem
Pricing homes – especially new construction and non‑cookie‑cutter properties – still relies on:
- manual $/sqft guesses
- opaque AVMs lenders don’t trust
- Excel grids no one wants to audit

Agents, builders, and lenders need **defensible pricing**, not prettier slides.

---

### The Solution
CompClear starts with **your comps**, then:
- runs a transparent regression model
- shows exactly how adjustments are calculated
- produces a lender‑ready PDF

No mystery data. No MLS lock‑in. Just better math.

---

### Who It’s For
- Residential real estate agents
- Construction lenders
- Builders & developers

_Not a consumer Zestimate. A professional pricing tool._

---

### What You Get
- Value estimate + range
- Regression‑based adjustments
- Comp similarity scoring
- Confidence grade
- Charts lenders recognize
- Exportable PDF

---

### Why It’s Different
| Traditional CMA | CompClear |
|-----------------|-----------|
| Narrative adjustments | Statistical adjustments |
| Manual math | Automated, explainable math |
| Presentation‑focused | Decision‑focused |
| Hard to audit | Easy to justify |

---

### The Ask
**Upload your comps. We’ll do the math.**

---

## Free → Paid Conversion Strategy

### Free Tier – “Proof of Value”
Purpose: Let users *see the math* before paying.

**Free Includes:**
- 1 subject property
- Up to 5 comps
- Basic regression summary
- Estimated value (no range)
- On‑screen results only
- Watermarked preview

**Limits (intentional):**
- No PDF export
- No confidence grading
- Limited comps

This tier answers: *“Is this better than my spreadsheet?”*

---

### Paid Tier – “Professional Use”
Purpose: Monetize when the report leaves the screen.

**Paid Unlocks:**
- 10–15 comps
- Full regression output
- Adjusted comp table
- Confidence score
- Charts
- **Lender‑ready PDF export**

**Pricing Options:**
- $25–$50 per report (pay‑as‑you‑go)
- $149/month Pro (X reports included)

This tier answers: *“Can I send this to a client or lender?”*

---

### Expansion Tier (Later)
- Team accounts
- Saved templates
- As‑is vs as‑complete scenarios
- Branded exports

---

## Early Marketing Plan (Zero‑Fluff)

### Phase 1 – Local Credibility (Bellingham / Whatcom)
- Demo reports on **real local homes**
- Share with:
  - 2–3 trusted agents
  - 1 construction lender
  - 1 builder

Goal: refine output until they say “I’d actually use this.”

---

### Phase 2 – Problem‑Driven Messaging
Focus content on:
- “Why $/sqft breaks on new construction”
- “Why lenders hate CMAs (and what they actually want)”
- “How appraisers think about adjustments vs agents”

Formats:
- short blog posts
- LinkedIn screenshots of anonymized reports
- 1‑page PDF examples

---

### Phase 3 – Conversion Hooks
- “Upload your comps, see the math – free”
- “Don’t send a spreadsheet to a lender again”
- “Justify your price in one PDF”

---

## Why This Converts
- Free tier proves value
- Paid tier solves a real workflow moment
- Output leaves the product (PDF)
- Pricing aligns with deal value

---

## The North Star Metric
**Paid report exports per user.**

If users are exporting and sending reports, the product is working.

---

## One‑Line CTA
**Upload your comps. Defend your price.**

