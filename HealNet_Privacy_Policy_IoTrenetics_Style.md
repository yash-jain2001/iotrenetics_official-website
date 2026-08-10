# Privacy Policy
### HealNet — AI Health Platform

| | |
|---|---|
| **App Name** | HealNet — AI Health Platform |
| **Company** | IoTrenetics Solutions Private Limited |
| **Effective Date** | August 9, 2026 |
| **Last Updated** | August 9, 2026 |
| **Contact Email** | support@iotrenetics.com |
| **Company Address** | A-3, Third Floor, Chander Nagar (West), Shahdara, Delhi-110051 |

---

## 1. Introduction

IoTrenetics Solutions Private Limited ("we," "our," or "us") operates the HealNet mobile application (the "App"), a health monitoring and management platform available on Android via Google Play. We are committed to protecting your personal and health information and your right to privacy.

This Privacy Policy explains what information we collect, how we use it, with whom we share it, and what rights you have in relation to it. Please read this policy carefully. If you disagree with its terms, please discontinue use of the App.

---

## 2. Information We Collect

We collect the following categories of personal data, either directly from you or automatically through your use of the App:

### 2.1 Account and Identity Data
- **Full Name** — provided by you during account registration
- **Email Address** — provided by you during registration; used for authentication
- **Password** — stored securely using industry-standard hashing; never stored in plain text
- **Google Account Information** — if you sign in with Google, we receive your name, email address, and profile picture as provided by Google

### 2.2 Patient Health Data
- Patient name, age, gender, blood group, and contact details you enter for yourself or those in your care
- Vital signs: heart rate, blood pressure, SpO2 (oxygen saturation), body temperature, blood sugar
- Symptoms and medications you log
- Health Score and category breakdowns (Heart Health, Sleep, Stress, Recovery, Activity), calculated from the above
- Blood test reports you upload (images or PDF files), and the values extracted from them via on-device/server-side text recognition
- Alerts generated automatically based on recorded vitals

> This health data is stored in our secure database (Supabase) and is only accessible from your account, unless you explicitly grant access to another account via QR-based family sharing.

### 2.3 AI and On-Device Processing Data
- The **AI Copilot** and **Risk Prediction Engine** features analyze your recorded health data **entirely on your device**. This data is not transmitted to any external AI provider (such as OpenAI or Google Gemini) for these features to function.

### 2.4 Camera Data
- Photos or video frames captured when you use Camera Vitals, Pupil Detection, or Blood Report photo upload
- Used only to process the specific feature you're using (e.g., extracting vitals or blood report values); not shared outside your account without your consent

### 2.5 Wearable and Smartwatch Data
- Steps, sleep duration, and heart rate synced via CSV upload, Google Fit, or Apple Health, when you choose to connect a wearable device

### 2.6 Family Sharing Data
- QR-based share tokens you generate, and which accounts have redeemed them to gain access to a specific patient's records

### 2.7 Device and Technical Data
- Platform type (Android), app version, and device information (for compatibility and bug-fixing purposes)
- Online/offline status (to manage sync behavior)

---

## 3. How We Collect Information

| Method | Data Collected |
|---|---|
| Account Registration Form | Name, email address, password |
| Google Sign-In | Name, email, profile picture |
| Vitals Entry Form | Heart rate, blood pressure, SpO2, temperature, blood sugar |
| Camera (Vitals / Pupil Detection) | Photos or video frames for on-device/server vital-sign estimation |
| Blood Report Upload | Uploaded images/PDFs and OCR-extracted lab values |
| Smartwatch Sync | Steps, sleep, heart rate via CSV, Google Fit, or Apple Health |
| QR Family Sharing | Share tokens and linked account identifiers |
| AI Copilot / Risk Prediction | Existing recorded health data, processed on-device only |

---

## 4. How We Use Your Information

We use the collected data solely for the following purposes:

**a) App Functionality** — to provide core features including vitals tracking, Health Score calculation, Health Timeline, and Smart Alerts.

**b) Authentication and Account Management** — to create and manage your account and verify your identity.

**c) Blood Report Analysis** — to extract values from uploaded reports and flag results outside standard reference ranges.

**d) AI-Assisted Insights** — to generate on-device health summaries and risk assessments. No health data is sent to external AI providers for this purpose.

**e) Family Sharing** — to enable another account to access a specific patient's records, only when you explicitly generate and share a QR code for that purpose.

**f) Alerts and Notifications** — to notify you of abnormal vitals or concerning health trends.

**g) App Improvement** — to analyze aggregated, anonymized usage patterns to improve future versions of the App.

---

## 5. Third-Party Services

HealNet integrates the following third-party services that may have access to certain data as required to perform their functions:

| Service | Provider | Data Shared | Purpose |
|---|---|---|---|
| **5.1 Supabase** | Supabase Inc. | Account and health data (encrypted, access-controlled) | Secure database hosting and authentication |
| **5.2 Render** | Render Services Inc. | Data in transit to/from the backend API | Hosting the application server |
| **5.3 Google Sign-In** | Google LLC | Email, name, profile picture | Authentication |
| **5.4 Capacitor / Ionic** | Ionic | None transmitted externally | Native device bridge (camera, filesystem, notifications) |

We do not use any third-party advertising networks, behavioral tracking SDKs, or data brokers. **HealNet does not display ads.**

---

## 6. Data Sharing and Disclosure

We do not sell, rent, or trade your personal or health data. We share data only in the following limited circumstances:

- **With Supabase/Render:** to store and process your data as described above (see Section 5)
- **With Google:** to authenticate your account, if you use Google Sign-In
- **With another HealNet account:** only when you explicitly generate and share a QR code granting access to a specific patient's records
- **Legal compliance:** if required by applicable law, court order, or government regulation
- **Business transfer:** in the event of a merger, acquisition, or sale of assets, your data may be transferred as part of the transaction. You will be notified via the App or email.

No other sharing occurs.

---

## 7. Data Retention

We retain your data for as long as your account remains active. If you delete your account, your personal and health data is permanently deleted as described in our **Account & Data Deletion Policy**, except where retention is required by law or for anonymized, aggregated analytics.

---

## 8. Data Security

We implement the following technical and organizational measures to protect your data:

- **Authentication:** Secure token-based authentication (JWT) is required for account access.
- **Transport Security:** All communications with our backend and third-party APIs use HTTPS/TLS encryption.
- **Password Handling:** Passwords are hashed and never stored in plain text.
- **Database Security:** Health data is stored in an access-controlled database, restricted to your account unless explicitly shared.
- **No Unnecessary Media Storage:** Camera captures are processed for their specific feature and not retained beyond what's needed, unless you choose to save the result to a patient's record.

Despite these safeguards, no method of electronic transmission or storage is 100% secure. We encourage you to use a strong password and keep your device software up to date.

---

## 9. Your Rights and Choices

Subject to applicable law (including GDPR for users in the European Economic Area and CCPA for California residents), you have the following rights:

**a) Right to Access:** You may request a copy of the personal and health data we hold about you.

**b) Right to Correction:** You may update your profile and patient information directly within the App.

**c) Right to Deletion:** You may request deletion of your account and associated data by contacting us at support@iotrenetics.com, or directly within the App (see our Account & Data Deletion Policy).

**d) Right to Revoke Sharing:** You may revoke a family member's shared access to a patient's records at any time from the Family Dashboard.

**e) Right to Withdraw Consent (Camera):** You may revoke camera permission at any time via your device's system settings. This will disable camera-based features but not affect the rest of the App.

**f) Right to Withdraw Consent (Notifications):** You may disable notifications at any time via your device's system settings.

**g) CCPA Rights (California Residents):** California residents have the right to know what personal information is collected, to request deletion, and to opt out of the sale of personal information. We do not sell personal information.

To exercise any of these rights, contact us at support@iotrenetics.com. We will respond to verified requests within 30 days.

---

## 10. Children's Privacy

HealNet allows you to manage health records for family members, which may include children, under the supervision of a parent or guardian account holder. HealNet does not knowingly allow children to independently create their own accounts or collect personal information directly from children under 13 (or under 16 in the European Economic Area).

If you are a parent or guardian and believe your child has provided personal information to us without your consent, please contact us at support@iotrenetics.com, and we will promptly address it.

---

## 11. International Data Transfers

IoTrenetics Solutions Private Limited is incorporated in India. If you are located outside India, please note that your data (stored via Supabase and processed via Render) may be transferred to and processed in data centers located outside your country of residence. Appropriate data transfer safeguards are maintained. By using the App, you consent to this transfer.

---

## 12. Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make material changes:

- We will update the "Last Updated" date at the top of this policy.
- We will notify you through the App or by email to your registered address at least 7 days before the change takes effect.

Your continued use of the App after the effective date of changes constitutes acceptance of the updated policy. We encourage you to review this policy periodically.

---

## 13. Contact Us

If you have any questions, concerns, or requests related to this Privacy Policy or our data practices, please contact us:

| | |
|---|---|
| **Company** | IoTrenetics Solutions Private Limited |
| **Email** | support@iotrenetics.com |
| **Address** | A-3, Third Floor, Chander Nagar (West), Shahdara, Delhi-110051 |
| **Website** | https://www.iotrenetics.com/ |

**Response Time:** Within 30 business days
**For data deletion requests:** Use the subject line "Data Deletion Request — HealNet"
