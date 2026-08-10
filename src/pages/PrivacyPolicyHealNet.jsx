import SEO from "../components/SEO";
import React from "react";

const HeaderInfo = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-teal-200/30 last:border-0">
    <span className="text-teal-100 font-medium">{label}</span>
    <span className="text-white sm:text-right font-semibold">{value}</span>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 border-b-2 border-teal-100 pb-2 mb-6 mt-12 first:mt-0">
    {children}
  </h2>
);

const SubSectionTitle = ({ children }) => (
  <h3 className="text-lg sm:text-xl font-bold text-teal-700 mt-6 mb-3">
    {children}
  </h3>
);

const Paragraph = ({ children }) => (
  <p className="text-slate-600 leading-relaxed mb-4">{children}</p>
);

const UnorderedList = ({ children }) => (
  <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 mb-6 marker:text-teal-500">
    {children}
  </ul>
);

const PrivacyPolicyHealNet = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-teal-100 selection:text-teal-900">
      <SEO
        title="HealNet Privacy Policy | IoTrenetics"
        description="Privacy policy for the HealNet AI Health Platform application."
        url="/privacy-policy-healnet"
      />

      <div className="max-w-4xl mx-auto rounded-3xl shadow-xl overflow-hidden bg-white ring-1 ring-slate-900/5">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 px-6 py-12 sm:px-12 sm:py-16 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-cyan-300 blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 shadow-sm">
              Privacy Policy
            </h1>
            <p className="text-xl text-teal-100 mb-8 font-medium">
              HealNet — AI Health Platform
            </p>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/20 shadow-lg">
              <HeaderInfo label="App Name" value="HealNet — AI Health Platform" />
              <HeaderInfo
                label="Company"
                value="IoTrenetics Solutions Private Limited"
              />
              <HeaderInfo label="Effective Date" value="August 9, 2026" />
              <HeaderInfo label="Last Updated" value="August 9, 2026" />
              <HeaderInfo
                label="Contact Email"
                value="support@iotrenetics.com"
              />
              <HeaderInfo
                label="Company Address"
                value="A-3, Third Floor, Chander Nagar (West), Shahdara, Delhi-110051"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 py-10 sm:px-12 sm:py-14 bg-white">
          {/* 1. Introduction */}
          <SectionTitle>1. Introduction</SectionTitle>
          <Paragraph>
            IoTrenetics Solutions Private Limited ("we," "our," or "us") operates the HealNet mobile application (the "App"), a health monitoring and management platform available on Android via Google Play. We are committed to protecting your personal and health information and your right to privacy.
          </Paragraph>
          <Paragraph>
            This Privacy Policy explains what information we collect, how we use it, with whom we share it, and what rights you have in relation to it. Please read this policy carefully. If you disagree with its terms, please discontinue use of the App.
          </Paragraph>

          {/* 2. Information We Collect */}
          <SectionTitle>2. Information We Collect</SectionTitle>
          <Paragraph>
            We collect the following categories of personal data, either directly from you or automatically through your use of the App:
          </Paragraph>

          <SubSectionTitle>2.1 Account and Identity Data</SubSectionTitle>
          <UnorderedList>
            <li><strong className="text-slate-800">Full Name</strong> — provided by you during account registration</li>
            <li><strong className="text-slate-800">Email Address</strong> — provided by you during registration; used for authentication</li>
            <li><strong className="text-slate-800">Password</strong> — stored securely using industry-standard hashing; never stored in plain text</li>
            <li><strong className="text-slate-800">Google Account Information</strong> — if you sign in with Google, we receive your name, email address, and profile picture as provided by Google</li>
          </UnorderedList>

          <SubSectionTitle>2.2 Patient Health Data</SubSectionTitle>
          <UnorderedList>
            <li>Patient name, age, gender, blood group, and contact details you enter for yourself or those in your care</li>
            <li>Vital signs: heart rate, blood pressure, SpO2 (oxygen saturation), body temperature, blood sugar</li>
            <li>Symptoms and medications you log</li>
            <li>Health Score and category breakdowns (Heart Health, Sleep, Stress, Recovery, Activity), calculated from the above</li>
            <li>Blood test reports you upload (images or PDF files), and the values extracted from them via on-device/server-side text recognition</li>
            <li>Alerts generated automatically based on recorded vitals</li>
          </UnorderedList>
          <div className="bg-teal-50 border-l-4 border-teal-600 p-4 rounded-r-xl mb-6 text-teal-900 text-sm sm:text-base">
            This health data is stored in our secure database (Supabase) and is only accessible from your account, unless you explicitly grant access to another account via QR-based family sharing.
          </div>

          <SubSectionTitle>2.3 AI and On-Device Processing Data</SubSectionTitle>
          <Paragraph>
            The <strong>AI Copilot</strong> and <strong>Risk Prediction Engine</strong> features analyze your recorded health data <strong>entirely on your device</strong>. This data is not transmitted to any external AI provider (such as OpenAI or Google Gemini) for these features to function.
          </Paragraph>

          <SubSectionTitle>2.4 Camera Data</SubSectionTitle>
          <Paragraph>
            Photos or video frames captured when you use Camera Vitals, Pupil Detection, or Blood Report photo upload are used only to process the specific feature you're using (e.g., extracting vitals or blood report values); not shared outside your account without your consent.
          </Paragraph>

          <SubSectionTitle>2.5 Wearable and Smartwatch Data</SubSectionTitle>
          <Paragraph>
            Steps, sleep duration, and heart rate synced via CSV upload, Google Fit, or Apple Health, when you choose to connect a wearable device.
          </Paragraph>

          <SubSectionTitle>2.6 Family Sharing Data</SubSectionTitle>
          <Paragraph>
            QR-based share tokens you generate, and which accounts have redeemed them to gain access to a specific patient's records.
          </Paragraph>

          <SubSectionTitle>2.7 Device and Technical Data</SubSectionTitle>
          <UnorderedList>
            <li>Platform type (Android), app version, and device information (for compatibility and bug-fixing purposes)</li>
            <li>Online/offline status (to manage sync behavior)</li>
          </UnorderedList>

          {/* 3. How We Collect Information */}
          <SectionTitle>3. How We Collect Information</SectionTitle>
          <div className="overflow-x-auto mb-8 rounded-xl shadow-xs border border-slate-200">
            <table className="w-full text-left border-collapse bg-white text-sm sm:text-base">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="px-6 py-3.5 font-semibold border-b border-slate-200">Method</th>
                  <th className="px-6 py-3.5 font-semibold border-b border-slate-200">Data Collected</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 divide-y divide-slate-100">
                <tr><td className="px-6 py-3.5 font-medium text-slate-800">Account Registration Form</td><td className="px-6 py-3.5">Name, email address, password</td></tr>
                <tr><td className="px-6 py-3.5 font-medium text-slate-800">Google Sign-In</td><td className="px-6 py-3.5">Name, email, profile picture</td></tr>
                <tr><td className="px-6 py-3.5 font-medium text-slate-800">Vitals Entry Form</td><td className="px-6 py-3.5">Heart rate, blood pressure, SpO2, temperature, blood sugar</td></tr>
                <tr><td className="px-6 py-3.5 font-medium text-slate-800">Camera (Vitals / Pupil Detection)</td><td className="px-6 py-3.5">Photos or video frames for on-device/server vital-sign estimation</td></tr>
                <tr><td className="px-6 py-3.5 font-medium text-slate-800">Blood Report Upload</td><td className="px-6 py-3.5">Uploaded images/PDFs and OCR-extracted lab values</td></tr>
                <tr><td className="px-6 py-3.5 font-medium text-slate-800">Smartwatch Sync</td><td className="px-6 py-3.5">Steps, sleep, heart rate via CSV, Google Fit, or Apple Health</td></tr>
                <tr><td className="px-6 py-3.5 font-medium text-slate-800">QR Family Sharing</td><td className="px-6 py-3.5">Share tokens and linked account identifiers</td></tr>
                <tr><td className="px-6 py-3.5 font-medium text-slate-800">AI Copilot / Risk Prediction</td><td className="px-6 py-3.5">Existing recorded health data, processed on-device only</td></tr>
              </tbody>
            </table>
          </div>

          {/* 4. How We Use Your Information */}
          <SectionTitle>4. How We Use Your Information</SectionTitle>
          <Paragraph>We use the collected data solely for the following purposes:</Paragraph>
          <div className="space-y-3 mb-6 text-slate-700">
            <p><strong>a) App Functionality</strong> — to provide core features including vitals tracking, Health Score calculation, Health Timeline, and Smart Alerts.</p>
            <p><strong>b) Authentication and Account Management</strong> — to create and manage your account and verify your identity.</p>
            <p><strong>c) Blood Report Analysis</strong> — to extract values from uploaded reports and flag results outside standard reference ranges.</p>
            <p><strong>d) AI-Assisted Insights</strong> — to generate on-device health summaries and risk assessments. No health data is sent to external AI providers for this purpose.</p>
            <p><strong>e) Family Sharing</strong> — to enable another account to access a specific patient's records, only when you explicitly generate and share a QR code for that purpose.</p>
            <p><strong>f) Alerts and Notifications</strong> — to notify you of abnormal vitals or concerning health trends.</p>
            <p><strong>g) App Improvement</strong> — to analyze aggregated, anonymized usage patterns to improve future versions of the App.</p>
          </div>

          {/* 5. Third-Party Services */}
          <SectionTitle>5. Third-Party Services</SectionTitle>
          <Paragraph>
            HealNet integrates the following third-party services that may have access to certain data as required to perform their functions:
          </Paragraph>
          <div className="overflow-x-auto mb-6 rounded-xl shadow-xs border border-slate-200">
            <table className="w-full text-left border-collapse bg-white text-sm sm:text-base">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="px-5 py-3.5 font-semibold border-b border-slate-200">Service</th>
                  <th className="px-5 py-3.5 font-semibold border-b border-slate-200">Provider</th>
                  <th className="px-5 py-3.5 font-semibold border-b border-slate-200">Data Shared</th>
                  <th className="px-5 py-3.5 font-semibold border-b border-slate-200">Purpose</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 divide-y divide-slate-100">
                <tr>
                  <td className="px-5 py-3.5 font-bold text-slate-800">5.1 Supabase</td>
                  <td className="px-5 py-3.5">Supabase Inc.</td>
                  <td className="px-5 py-3.5">Account and health data (encrypted, access-controlled)</td>
                  <td className="px-5 py-3.5">Secure database hosting and authentication</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-bold text-slate-800">5.2 Render</td>
                  <td className="px-5 py-3.5">Render Services Inc.</td>
                  <td className="px-5 py-3.5">Data in transit to/from the backend API</td>
                  <td className="px-5 py-3.5">Hosting the application server</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-bold text-slate-800">5.3 Google Sign-In</td>
                  <td className="px-5 py-3.5">Google LLC</td>
                  <td className="px-5 py-3.5">Email, name, profile picture</td>
                  <td className="px-5 py-3.5">Authentication</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-bold text-slate-800">5.4 Capacitor / Ionic</td>
                  <td className="px-5 py-3.5">Ionic</td>
                  <td className="px-5 py-3.5">None transmitted externally</td>
                  <td className="px-5 py-3.5">Native device bridge (camera, filesystem, notifications)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Paragraph>
            We do not use any third-party advertising networks, behavioral tracking SDKs, or data brokers. <strong>HealNet does not display ads.</strong>
          </Paragraph>

          {/* 6. Data Sharing and Disclosure */}
          <SectionTitle>6. Data Sharing and Disclosure</SectionTitle>
          <Paragraph>
            We do not sell, rent, or trade your personal or health data. We share data only in the following limited circumstances:
          </Paragraph>
          <UnorderedList>
            <li><strong>With Supabase/Render:</strong> to store and process your data as described above (see Section 5)</li>
            <li><strong>With Google:</strong> to authenticate your account, if you use Google Sign-In</li>
            <li><strong>With another HealNet account:</strong> only when you explicitly generate and share a QR code granting access to a specific patient's records</li>
            <li><strong>Legal compliance:</strong> if required by applicable law, court order, or government regulation</li>
            <li><strong>Business transfer:</strong> in the event of a merger, acquisition, or sale of assets, your data may be transferred as part of the transaction. You will be notified via the App or email.</li>
          </UnorderedList>
          <Paragraph>No other sharing occurs.</Paragraph>

          {/* 7. Data Retention */}
          <SectionTitle>7. Data Retention</SectionTitle>
          <Paragraph>
            We retain your data for as long as your account remains active. If you delete your account, your personal and health data is permanently deleted as described in our <strong>Account &amp; Data Deletion Policy</strong>, except where retention is required by law or for anonymized, aggregated analytics.
          </Paragraph>

          {/* 8. Data Security */}
          <SectionTitle>8. Data Security</SectionTitle>
          <Paragraph>
            We implement the following technical and organizational measures to protect your data:
          </Paragraph>
          <UnorderedList>
            <li><strong>Authentication:</strong> Secure token-based authentication (JWT) is required for account access.</li>
            <li><strong>Transport Security:</strong> All communications with our backend and third-party APIs use HTTPS/TLS encryption.</li>
            <li><strong>Password Handling:</strong> Passwords are hashed and never stored in plain text.</li>
            <li><strong>Database Security:</strong> Health data is stored in an access-controlled database, restricted to your account unless explicitly shared.</li>
            <li><strong>No Unnecessary Media Storage:</strong> Camera captures are processed for their specific feature and not retained beyond what's needed, unless you choose to save the result to a patient's record.</li>
          </UnorderedList>
          <Paragraph>
            Despite these safeguards, no method of electronic transmission or storage is 100% secure. We encourage you to use a strong password and keep your device software up to date.
          </Paragraph>

          {/* 9. Your Rights and Choices */}
          <SectionTitle>9. Your Rights and Choices</SectionTitle>
          <Paragraph>
            Subject to applicable law (including GDPR for users in the European Economic Area and CCPA for California residents), you have the following rights:
          </Paragraph>
          <div className="space-y-3 mb-6 text-slate-700">
            <p><strong>a) Right to Access:</strong> You may request a copy of the personal and health data we hold about you.</p>
            <p><strong>b) Right to Correction:</strong> You may update your profile and patient information directly within the App.</p>
            <p><strong>c) Right to Deletion:</strong> You may request deletion of your account and associated data by contacting us at support@iotrenetics.com, or directly within the App (see our Account &amp; Data Deletion Policy).</p>
            <p><strong>d) Right to Revoke Sharing:</strong> You may revoke a family member's shared access to a patient's records at any time from the Family Dashboard.</p>
            <p><strong>e) Right to Withdraw Consent (Camera):</strong> You may revoke camera permission at any time via your device's system settings. This will disable camera-based features but not affect the rest of the App.</p>
            <p><strong>f) Right to Withdraw Consent (Notifications):</strong> You may disable notifications at any time via your device's system settings.</p>
            <p><strong>g) CCPA Rights (California Residents):</strong> California residents have the right to know what personal information is collected, to request deletion, and to opt out of the sale of personal information. We do not sell personal information.</p>
          </div>
          <Paragraph>
            To exercise any of these rights, contact us at <a href="mailto:support@iotrenetics.com" className="text-teal-700 font-bold hover:underline">support@iotrenetics.com</a>. We will respond to verified requests within 30 days.
          </Paragraph>

          {/* 10. Children's Privacy */}
          <SectionTitle>10. Children's Privacy</SectionTitle>
          <Paragraph>
            HealNet allows you to manage health records for family members, which may include children, under the supervision of a parent or guardian account holder. HealNet does not knowingly allow children to independently create their own accounts or collect personal information directly from children under 13 (or under 16 in the European Economic Area).
          </Paragraph>
          <Paragraph>
            If you are a parent or guardian and believe your child has provided personal information to us without your consent, please contact us at support@iotrenetics.com, and we will promptly address it.
          </Paragraph>

          {/* 11. International Data Transfers */}
          <SectionTitle>11. International Data Transfers</SectionTitle>
          <Paragraph>
            IoTrenetics Solutions Private Limited is incorporated in India. If you are located outside India, please note that your data (stored via Supabase and processed via Render) may be transferred to and processed in data centers located outside your country of residence. Appropriate data transfer safeguards are maintained. By using the App, you consent to this transfer.
          </Paragraph>

          {/* 12. Changes to This Privacy Policy */}
          <SectionTitle>12. Changes to This Privacy Policy</SectionTitle>
          <Paragraph>
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make material changes:
          </Paragraph>
          <UnorderedList>
            <li>We will update the "Last Updated" date at the top of this policy.</li>
            <li>We will notify you through the App or by email to your registered address at least 7 days before the change takes effect.</li>
          </UnorderedList>
          <Paragraph>
            Your continued use of the App after the effective date of changes constitutes acceptance of the updated policy. We encourage you to review this policy periodically.
          </Paragraph>

          {/* 13. Contact Us */}
          <SectionTitle>13. Contact Us</SectionTitle>
          <Paragraph>
            If you have any questions, concerns, or requests related to this Privacy Policy or our data practices, please contact us:
          </Paragraph>
          <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-6 mb-6 space-y-3 text-slate-800">
            <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-teal-200/60">
              <span className="font-semibold text-teal-900">Company</span>
              <span className="font-medium">IoTrenetics Solutions Private Limited</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-teal-200/60">
              <span className="font-semibold text-teal-900">Email</span>
              <a href="mailto:support@iotrenetics.com" className="text-teal-700 font-bold hover:underline">
                support@iotrenetics.com
              </a>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-teal-200/60">
              <span className="font-semibold text-teal-900">Address</span>
              <span className="font-medium text-slate-700 sm:text-right">A-3, Third Floor, Chander Nagar (West), Shahdara, Delhi-110051</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-1.5">
              <span className="font-semibold text-teal-900">Website</span>
              <a href="https://www.iotrenetics.com/" target="_blank" rel="noopener noreferrer" className="text-teal-700 font-bold hover:underline">
                https://www.iotrenetics.com/
              </a>
            </div>
          </div>
          <div className="text-sm text-slate-600 space-y-1">
            <p><strong>Response Time:</strong> Within 30 business days</p>
            <p><strong>For data deletion requests:</strong> Use the subject line "Data Deletion Request — HealNet"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyHealNet;
