---
title: Privacy Policy
lastUpdated: "2026-05-24"
effectiveDate: "2026-05-24"
---

This Privacy Policy is the counterpart to the Terms of Service available at https://apps.henkas.eu/terms-of-service and applies to all apps published by Henki Papp under that catalogue.

---

## 1. Introduction

Henki Papp ("**we**", "**us**", "**our**") publishes mobile applications ("**Apps**") for iOS, iPadOS, and Android, distributed through the Apple App Store and Google Play Store and listed at **https://apps.henkas.eu**.

We publish the Apps on a **non-commercial basis**: we do not charge for them, we do not show advertising in them, and we do not sell your personal information. This Privacy Policy explains what we collect, why, who we share it with, and what rights you have.

The Apps are individual products with slightly different data practices. The **per-App matrix in Section 13** tells you exactly what each App collects.

We are a **data controller** under the EU General Data Protection Regulation (Regulation (EU) 2016/679, "**GDPR**") for the personal data described below. Where we use processors (such as PostHog), they act on our documented instructions.

- **Publisher**: Henki Papp
- **Country of establishment**: the Netherlands
- **Contact**: henkas@henkas.eu

---

## 2. Information We Collect

### 2.1 Information You Provide Directly

We collect the minimum needed for an App to function. Across the catalogue, this is limited to:

- **Account identifiers from federated sign-in** (see Section 2.3).
- **In-App profile fields** you choose to fill in (for example, a display name or your preferences). For **local-first Apps** (such as *Conjuring*), this information stays on your device and is never transmitted to us.
- **Support correspondence** when you email **henkas@henkas.eu** — we receive whatever you choose to send, including your email address and any attachments.

We do **not** collect: postal addresses, phone numbers, payment information (we accept no payments), government IDs, biometrics, precise geolocation, health data, contacts, photos, microphone or camera input — unless an individual App explicitly says so on its in-App permissions screen, in which case that App's specific disclosure controls.

### 2.2 Information Collected Automatically (Analytics)

Where an App has analytics enabled, the analytics provider is **PostHog Inc.** ("**PostHog**"), used in **product-analytics** mode only (no session recording, no heatmaps, no feature-flag personal-data targeting).

PostHog receives, per event:

| Field | Example | Purpose |
|---|---|---|
| Pseudonymous `distinct_id` | A random UUID generated on first launch | Stitching events into a session for one device |
| Event name | `app_opened`, `screen_viewed`, `feature_used` | Understanding which features are used |
| Event properties | App version, OS version, device model, locale, time zone | Diagnosing platform-specific issues |
| Approximate location | Country, region (derived from IP at ingestion time) | Coarse geographic distribution; **the IP itself is not stored long-term** |
| Timestamp | ISO 8601 timestamp of the event | Time-series analysis |

We do **not** send to PostHog:

- Your real name, email, address, or phone number.
- Anything you type into the App (form input, notes, husbandry log entries, etc.).
- Any of your local data from a local-first App.
- The Apple **Identifier for Advertisers (IDFA)** or the Android **Advertising ID**. We do not request the App Tracking Transparency permission.

For some Apps (including *Conjuring*), analytics are **opt-in** and disabled by default — no events are sent until you turn analytics on in the App's settings.

### 2.3 Information from Third Parties (Federated Sign-In)

Where an App requires sign-in, we use **Sign in with Apple** (Apple Inc.) and/or **Sign in with Google** (Google LLC).

From **Sign in with Apple**, we receive:

- A **per-app stable user identifier** (`sub`) issued by Apple — unique to your Apple ID *and* this specific App, and not reusable to identify you in any other product.
- An **email address**, only the first time you sign in. If you select "**Hide My Email**", we receive an Apple relay address such as `xyz@privaterelay.appleid.com`. We treat the relay address as your real email for support purposes; we do not attempt to deanonymise it.
- A **display name**, only the first time you sign in, and only if you choose to share it.

From **Sign in with Google**, we receive:

- Your Google **`sub`** identifier (a stable, unique numeric ID).
- The email address associated with your Google account.
- Your Google profile name and profile picture URL, where you have made them available.

We do not receive your password from Apple or Google. We do not receive your friends, contacts, calendar, files, or any other Google/Apple data.

### 2.4 Cookies and Similar Technologies

The Apps are native mobile applications and do **not** set browser cookies on your device. The catalogue website (https://apps.henkas.eu) is a static informational site that does not set tracking cookies.

PostHog identifies devices using a **locally stored pseudonymous UUID** (the `distinct_id`) rather than a cookie. You can reset this identifier by uninstalling and reinstalling the App, or by clearing App storage.

---

## 3. How We Use Your Information

| Purpose | Data Used | Legal Basis (GDPR) |
|---|---|---|
| Authenticating you and keeping you signed in | Federated `sub`, email | **Performance of a contract** — Art. 6(1)(b) GDPR |
| Showing your display name in the App | Display name from Apple/Google | **Performance of a contract** — Art. 6(1)(b) GDPR |
| Replying to your support emails | Email content and address | **Legitimate interests** — Art. 6(1)(f); also Art. 6(1)(b) where you are an existing user |
| Understanding which features are used, diagnosing crashes and bugs | PostHog event data | **Consent** — Art. 6(1)(a) where analytics are opt-in; **Legitimate interests** — Art. 6(1)(f) where analytics are on by default and disclosed |
| Protecting the Apps from abuse and securing your account | Federated `sub`, event metadata | **Legitimate interests** — Art. 6(1)(f) GDPR |
| Complying with legal obligations | Any of the above, as required | **Legal obligation** — Art. 6(1)(c) GDPR |

We do **not** use your data for: advertising targeting, profiling that produces legal effects, automated decision-making within the meaning of Article 22 GDPR, or training machine-learning models.

---

## 4. How We Share Your Information

We share data only with the parties below, and only to the extent needed for them to provide the services described.

### 4.1 Service Providers (Processors)

| Provider | Service | Data | Location |
|---|---|---|---|
| **PostHog Inc.** | Product analytics | Pseudonymous event data (Section 2.2) | EU region |
| **Apple Inc.** | App Store distribution, Sign in with Apple, APNs | Account-linking metadata as required by the platform | United States |
| **Google LLC** | Google Play distribution, Sign in with Google, FCM (where used) | Account-linking metadata as required by the platform | United States |

We have, or will execute, **Data Processing Agreements** with each processor as required by Article 28 GDPR.

### 4.2 Platforms

Apple and Google operate as **independent controllers** for the parts of the user journey they own — installation, authentication, App Store analytics, crash reports they may collect at the OS level. Their privacy policies apply to those processing activities:

- Apple Privacy Policy — https://www.apple.com/legal/privacy/
- Google Privacy Policy — https://policies.google.com/privacy
- PostHog Privacy Notice — https://posthog.com/privacy

### 4.3 Legal Disclosures

We may disclose information when required by law, court order, or a legitimate request from a public authority (e.g. Dutch police acting under a valid Dutch criminal-procedure order, or an equivalent EU member-state authority). We will resist over-broad or extra-territorial requests where lawfully possible.

### 4.4 Business Transfers

If the publisher's activities are transferred to another legal person (e.g. you incorporate a company and assign these Apps to it), users will be notified in advance via in-App notice and/or email, and the receiving entity will be bound by a privacy notice no less protective than this one.

**We do not sell or "share" personal information** as those terms are defined under the California Consumer Privacy Act / California Privacy Rights Act ("**CCPA/CPRA**").

---

## 5. Data Retention

| Data Type | Retention Period | Reason |
|---|---|---|
| Federated identifiers (`sub`, email) | Lifetime of your account + **30 days** after deletion | Allow you to restore an accidentally deleted account |
| In-App profile fields stored on our side (where applicable) | Lifetime of your account + **30 days** | Same as above |
| Local-first App data (e.g. *Conjuring* husbandry logs) | Stored on your device only; deleted when you uninstall or clear App data | We have no copy |
| PostHog analytics events | **12 months** rolling window | Long enough to compare year-over-year usage; short enough to limit exposure |
| Support emails | **24 months** from the last reply | Reference for recurring issues |
| Backups / processor logs containing the above | Up to **35 days** beyond the periods above | Standard backup-rotation; not used for any other purpose |

When the retention period ends, data is **deleted** or **irreversibly anonymised**.

---

## 6. Data Security

We apply technical and organisational measures appropriate to the limited scope of data we hold:

- **TLS** (HTTPS) in transit for all network communication.
- Federated authentication via Apple/Google means we never see your password.
- PostHog ingestion uses **project API keys**, not user-secrets; the keys can be rotated.
- Access to support email and any backend dashboards is protected by **multi-factor authentication**.
- Local-first Apps rely on the operating system's at-rest encryption (iOS Data Protection, Android File-Based Encryption).
- We do not process payment information.

No system is perfectly secure. If we become aware of a personal data breach that is likely to result in a risk to your rights and freedoms, we will notify the relevant supervisory authority within 72 hours, and notify affected users where required by Article 34 GDPR.

---

## 7. International Data Transfers

Some of our processors (Apple, Google, possibly PostHog depending on hosting region) are established in the **United States** or transfer data outside the European Economic Area (EEA). Where transfers occur, we rely on one or more of the following safeguards required by Chapter V of the GDPR:

- The **EU–US Data Privacy Framework** for certified US recipients.
- **Standard Contractual Clauses** (SCCs) as adopted by the European Commission in Decision (EU) 2021/914.
- **Adequacy decisions** where they apply.

Copies of the relevant transfer instruments can be requested from **henkas@henkas.eu**.

---

## 8. Your Rights Under GDPR (EEA/UK/Swiss Residents)

If you are in the European Economic Area, the United Kingdom, or Switzerland, you have the right to:

- **Access** the personal data we hold about you.
- **Rectify** inaccurate or incomplete data.
- **Erase** your data ("right to be forgotten") — subject to limited legal exceptions.
- **Restrict** processing.
- **Object** to processing based on legitimate interests.
- **Data portability** — receive your data in a machine-readable format.
- **Withdraw consent** at any time where processing is based on consent (this does not affect the lawfulness of processing before withdrawal).
- **Lodge a complaint** with a supervisory authority. As the publisher is established in the Netherlands, your competent authority is the **Autoriteit Persoonsgegevens** — https://autoriteitpersoonsgegevens.nl. You may also lodge a complaint in the EU member state where you live or work.

To exercise any of these rights, email **henkas@henkas.eu**. We will respond within **30 days** (extendable by a further 60 days for complex requests, in which case we will tell you within the first 30 days). There is no fee for a reasonable request; we may charge a reasonable fee or refuse manifestly unfounded or excessive requests.

We do not engage in automated decision-making that produces legal or similarly significant effects (Article 22 GDPR).

---

## 9. Your Rights Under CCPA/CPRA (California Residents)

If you are a California resident, you have the right to:

- **Know** what categories of personal information we collect, the sources, the purposes, and with whom we share it.
- **Delete** personal information we hold about you.
- **Correct** inaccurate personal information.
- **Opt out of the sale or sharing** of personal information — *we do not sell or share personal information as defined under CCPA/CPRA*.
- **Limit the use of sensitive personal information** — *we do not use sensitive personal information for purposes that would trigger this right*.
- **Non-discrimination** for exercising any of these rights.

To exercise these rights, contact **henkas@henkas.eu**. We will verify your request by matching the email address and federated identifier on file.

### Categories of personal information collected (past 12 months)

| CCPA Category | Collected? | Source |
|---|---|---|
| Identifiers (federated `sub`, email, pseudonymous device ID) | Yes | You, via Apple/Google |
| Commercial information | No | — |
| Biometric information | No | — |
| Internet or other electronic network activity (limited App-usage events) | Yes, where analytics are enabled | Your device |
| Geolocation data | Coarse only (country/region derived from IP at ingestion) | Your device |
| Sensory data (audio, video, etc.) | No | — |
| Professional or employment information | No | — |
| Education information | No | — |
| Inferences (profiles, predictions) | No | — |
| Sensitive personal information (Cal. Civ. Code § 1798.140(ae)) | No | — |

---

## 10. Children's Privacy

The Apps are not directed to children under **13**, and we do not knowingly collect personal information from children under 13. In the EEA, users must be at least the digital-consent age in their country (between 13 and 16 depending on member state) — we use **16** as the safe default unless the relevant App takes additional steps to obtain verifiable parental consent.

If you believe a child has provided us with personal information, contact **henkas@henkas.eu** and we will delete the information promptly.

---

## 11. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. For **material changes** affecting how we collect or use your data, we will provide at least **30 days' prior notice** by an in-App notice or, where you have a linked email, by email, before the change takes effect. The "Last Updated" date at the top of this policy will always reflect the latest revision.

Previous versions are available on request.

---

## 12. Contact

For any privacy-related question, request, or complaint:

- **Email**: henkas@henkas.eu
- **Apps catalogue**: https://apps.henkas.eu
- **Terms of Service**: https://apps.henkas.eu/terms-of-service

We have **not appointed a Data Protection Officer** because the scale and nature of processing do not require one under Article 37 GDPR. If this changes, the DPO's contact details will be published here.

---

## 13. Per-App Data Matrix

This matrix tells you exactly what each App collects. Where an App is not listed, treat it as "no data collected beyond what the operating system collects" until this matrix is updated.

| App | Sign-in required? | Stored on our servers | Analytics | Local-first? |
|---|---|---|---|---|
| **Conjuring** (Android, iPadOS) | Identity-only (display name shown locally) | Nothing — display name and all husbandry data stay on your device | **Opt-in**, off by default; PostHog event names only | **Yes** |

This matrix is the authoritative description of each App's data flows. If anything in the body of this policy appears to conflict with the matrix for a specific App, **the matrix wins for that App**.

---

## Appendix: In-App Consent (Native-Mobile Equivalent of a Cookie Banner)

Because the Apps are native and set no browser cookies, the equivalent of a cookie consent banner is the **in-App analytics consent prompt** plus the OS-level App Tracking Transparency permission (which we do not request, because we do not track across apps).

### In-App consent prompt (opt-in Apps such as *Conjuring*)

> **Help improve [App Name]?**
>
> If you tap **Share usage data**, we will send anonymous event data (which features you use, what version of iOS/Android you are on) to PostHog so we can fix bugs and make the App better. We never see your husbandry log entries, your display name, your real email, or anything you type. You can turn this off any time in Settings.
>
> [Share usage data] [Not now]
