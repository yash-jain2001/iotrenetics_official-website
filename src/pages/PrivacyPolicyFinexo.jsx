import React from "react";

const HeaderInfo = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-indigo-200/30 last:border-0">
    <span className="text-indigo-100 font-medium">{label}</span>
    <span className="text-white sm:text-right font-semibold">{value}</span>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 border-b-2 border-indigo-100 pb-2 mb-6 mt-12 first:mt-0">
    {children}
  </h2>
);

const SubSectionTitle = ({ children }) => (
  <h3 className="text-lg sm:text-xl font-bold text-indigo-700 mt-6 mb-3">
    {children}
  </h3>
);

const Paragraph = ({ children }) => (
  <p className="text-slate-600 leading-relaxed mb-4">{children}</p>
);

const UnorderedList = ({ children }) => (
  <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 mb-6 marker:text-indigo-400">
    {children}
  </ul>
);

const PrivacyPolicyfinexo = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className=" mx-auto rounded-3xl shadow-xl overflow-hidden bg-white ring-1 ring-slate-900/5">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 px-6 py-12 sm:px-12 sm:py-16 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-400 blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 shadow-sm">
              Privacy Policy
            </h1>
            <p className="text-xl text-indigo-100 mb-8 font-medium">
              finexo — Voice-Powered Finance Manager
            </p>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/20 shadow-lg">
              <HeaderInfo
                label="App Name"
                value="finexo — Voice-Powered Finance Manager"
              />
              <HeaderInfo
                label="Company"
                value="IoTrenetics Solutions Private Limited"
              />
              <HeaderInfo label="Effective Date" value="March 20, 2026" />
              <HeaderInfo label="Last Updated" value="March 20, 2026" />
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
          <SectionTitle>1. Introduction</SectionTitle>
          <Paragraph>
            IoTrenetics Solutions Private Limited (“we,” “our,” or “us”)
            operates the finexo mobile application (the “App”), a voice-powered
            personal finance manager available on Android via Google Play. We
            are committed to protecting your personal information and your right
            to privacy.
          </Paragraph>
          <Paragraph>
            This Privacy Policy explains what information we collect, how we use
            it, with whom we share it, and what rights you have in relation to
            it. Please read this policy carefully. If you disagree with its
            terms, please discontinue use of the App.
          </Paragraph>

          <SectionTitle>2. Information We Collect</SectionTitle>
          <Paragraph>
            We collect the following categories of personal data, either
            directly from you or automatically through your use of the App:
          </Paragraph>

          <SubSectionTitle>2.1 Account and Identity Data</SubSectionTitle>
          <UnorderedList>
            <li>
              <strong className="text-slate-800">Full Name</strong> — provided
              by you during account registration
            </li>
            <li>
              <strong className="text-slate-800">Email Address</strong> —
              provided by you during registration; used for authentication and
              email verification
            </li>
            <li>
              <strong className="text-slate-800">Referral Code</strong> —
              provided optionally during signup to link accounts for referral
              rewards
            </li>
          </UnorderedList>

          <SubSectionTitle>2.2 Financial Transaction Data</SubSectionTitle>
          <UnorderedList>
            <li>Transaction amounts (debit and credit values)</li>
            <li>Transaction dates and timestamps</li>
            <li>Currency type (e.g., INR, USD, EUR)</li>
            <li>Transaction category (e.g., food, salary, transport, bills)</li>
            <li>Payment mode (e.g., UPI, cash, card, net banking)</li>
            <li>Person or entity name associated with a transaction</li>
            <li>Free-text descriptions/notes added to transactions</li>
          </UnorderedList>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6 text-blue-800 text-sm">
            This financial data is stored locally on your device and, for
            authenticated users, partially synced via Firebase Firestore.
          </div>

          <SubSectionTitle>2.3 Voice and Speech Data</SubSectionTitle>
          <UnorderedList>
            <li>
              <strong className="text-slate-800">Microphone audio</strong> is
              captured temporarily when you initiate voice input. The audio is
              processed in real time by your device’s built-in Speech
              Recognition API (Web Speech API on Android Chrome, or Capacitor
              SpeechRecognition plugin). We do not store or transmit raw audio
              recordings to our servers.
            </li>
            <li>
              Transcribed text from voice input is processed locally and stored
              only as the resulting transaction record.
            </li>
          </UnorderedList>

          <SubSectionTitle>2.4 Device and Technical Data</SubSectionTitle>
          <UnorderedList>
            <li>Platform type (Android, iOS, or web)</li>
            <li>Online/offline status (to manage sync behavior)</li>
            <li>
              Local storage data (transactions, settings, budget limits,
              preferences stored in your device’s browser/app local storage)
            </li>
          </UnorderedList>

          <SubSectionTitle>
            2.5 Usage and Analytics Data (Local Only)
          </SubSectionTitle>
          <UnorderedList>
            <li>
              Session activity timestamps (tracked locally to measure daily
              active usage)
            </li>
            <li>
              Feature usage patterns (e.g., which tabs are used) — stored only
              on-device; not transmitted to external analytics platforms
            </li>
          </UnorderedList>

          <SubSectionTitle>2.6 Referral and Reward Data</SubSectionTitle>
          <UnorderedList>
            <li>Referral code you share and codes you receive</li>
            <li>Count of successful referrals and free months earned</li>
            <li>
              Stored in Firebase Firestore linked to your authenticated user
              account
            </li>
          </UnorderedList>

          <SubSectionTitle>2.7 Subscription and Purchase Data</SubSectionTitle>
          <UnorderedList>
            <li>Subscription status (free or premium)</li>
            <li>
              Purchase receipt data processed via Google Play’s In-App Purchase
              system (CdvPurchase / Google Play Billing)
            </li>
            <li>
              Subscription expiry timestamps stored locally and in local storage
            </li>
          </UnorderedList>

          <SectionTitle>3. How We Collect Information</SectionTitle>
          <div className="overflow-x-auto mb-8 rounded-xl shadow-sm ring-1 ring-slate-200">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-slate-50 text-slate-800 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold border-b border-slate-200">
                    Method
                  </th>
                  <th className="px-6 py-4 font-semibold border-b border-slate-200">
                    Data Collected
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-600 divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Account Registration Form
                  </td>
                  <td className="px-6 py-4">
                    Name, email address, optional referral code
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Voice Input (Microphone)
                  </td>
                  <td className="px-6 py-4">
                    Real-time speech transcription for transactions
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Manual Text Input
                  </td>
                  <td className="px-6 py-4">
                    Transaction details typed by the user
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Firebase Authentication
                  </td>
                  <td className="px-6 py-4">
                    Email/password credentials for login
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Firebase Firestore
                  </td>
                  <td className="px-6 py-4">
                    User profile data, referral stats synced to cloud
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Device Local Storage
                  </td>
                  <td className="px-6 py-4">
                    Transactions, settings, budget limits, preferences
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Google Play Billing API
                  </td>
                  <td className="px-6 py-4">
                    Purchase and subscription status
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Exchange Rate API
                  </td>
                  <td className="px-6 py-4">
                    Live currency conversion rates (no personal data sent)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Capacitor Filesystem
                  </td>
                  <td className="px-6 py-4">
                    File exports (Excel/HTML reports saved to device storage)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Web Share API
                  </td>
                  <td className="px-6 py-4">
                    Sharing of exported reports (invoked by user action only)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionTitle>4. How We Use Your Information</SectionTitle>
          <Paragraph>
            We use the collected information solely for the following purposes:
          </Paragraph>
          <UnorderedList>
            <li>
              <strong className="text-slate-800">a) App Functionality:</strong>{" "}
              To provide core features including transaction recording,
              analytics, budget tracking, scheduled reports, group expense
              management, and multi-currency support.
            </li>
            <li>
              <strong className="text-slate-800">
                b) Authentication and Account Management:
              </strong>{" "}
              To create and manage your account, verify your email address, and
              handle password reset requests via Firebase Authentication.
            </li>
            <li>
              <strong className="text-slate-800">c) Voice Processing:</strong>{" "}
              To convert your spoken words into transaction records using your
              device’s on-device speech recognition engine. Audio is never
              stored or sent to our servers.
            </li>
            <li>
              <strong className="text-slate-800">
                d) Currency Conversion:
              </strong>{" "}
              To display transaction amounts in your preferred currency using
              live exchange rates fetched from third-party currency APIs. No
              personal data is transmitted in these requests.
            </li>
            <li>
              <strong className="text-slate-800">e) Push Notifications:</strong>{" "}
              To send budget limit alerts and scheduled report reminders using
              the device’s local notification system. Notifications are
              generated on-device and do not require transmission of personal
              data to our servers.
            </li>
            <li>
              <strong className="text-slate-800">f) Referral Program:</strong>{" "}
              To track successful referrals and credit free premium months to
              qualifying users via Firebase Firestore.
            </li>
            <li>
              <strong className="text-slate-800">g) In-App Purchases:</strong>{" "}
              To verify and activate premium subscriptions purchased through
              Google Play.
            </li>
            <li>
              <strong className="text-slate-800">
                h) Data Export and Reports:
              </strong>{" "}
              To generate Excel (.xlsx) or HTML financial reports saved to your
              device storage, shared via your device’s native share sheet upon
              your explicit request.
            </li>
            <li>
              <strong className="text-slate-800">i) App Improvement:</strong> To
              analyze on-device usage patterns (stored locally, not transmitted)
              for improving future versions of the App.
            </li>
          </UnorderedList>

          <SectionTitle>5. Third-Party Services</SectionTitle>
          <Paragraph>
            finexo integrates the following third-party services that may have
            access to certain data as required to perform their functions:
          </Paragraph>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-2">
                5.1 Google Firebase
              </h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>
                  <span className="font-medium text-slate-700">Provider:</span>{" "}
                  Google LLC
                </li>
                <li>
                  <span className="font-medium text-slate-700">
                    Data shared:
                  </span>{" "}
                  Email address, user ID, display name, referral stats, premium
                  status
                </li>
                <li>
                  <span className="font-medium text-slate-700">Purpose:</span>{" "}
                  Secure authentication, email verification, cloud-synced user
                  profile
                </li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-2">
                5.2 Google Play Billing
              </h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>
                  <span className="font-medium text-slate-700">Provider:</span>{" "}
                  Google LLC
                </li>
                <li>
                  <span className="font-medium text-slate-700">
                    Data shared:
                  </span>{" "}
                  Purchase tokens and product IDs
                </li>
                <li>
                  <span className="font-medium text-slate-700">Purpose:</span>{" "}
                  Processing and verifying premium subscription purchases
                </li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-2">
                5.3 Exchange Rate APIs
              </h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>
                  <span className="font-medium text-slate-700">Providers:</span>{" "}
                  ExchangeRate-API & ExchangeRate.host
                </li>
                <li>
                  <span className="font-medium text-slate-700">
                    Data shared:
                  </span>{" "}
                  None — anonymous HTTP requests
                </li>
                <li>
                  <span className="font-medium text-slate-700">Purpose:</span>{" "}
                  Fetching live exchange rates
                </li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-2">
                5.4 Capacitor / Ionic
              </h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>
                  <span className="font-medium text-slate-700">Provider:</span>{" "}
                  Ionic / Capacitor framework
                </li>
                <li>
                  <span className="font-medium text-slate-700">
                    Data shared:
                  </span>{" "}
                  None transmitted externally
                </li>
                <li>
                  <span className="font-medium text-slate-700">Purpose:</span>{" "}
                  Native device bridge (notifications, filesystem, speech,
                  share)
                </li>
              </ul>
            </div>
          </div>
          <Paragraph>
            We do not use any third-party advertising networks, behavioural
            tracking SDKs, or data brokers. finexo does not display
            advertisements.
          </Paragraph>

          <SectionTitle>6. Data Sharing and Disclosure</SectionTitle>
          <Paragraph>
            We do not sell, rent, or trade your personal data. We share data
            only in the following limited circumstances:
          </Paragraph>
          <UnorderedList>
            <li>
              <strong className="text-slate-800">With Firebase/Google:</strong>{" "}
              To authenticate your account and store your user profile data (see
              Section 5.1).
            </li>
            <li>
              <strong className="text-slate-800">With Google Play:</strong>{" "}
              Purchase transaction data when you make in-app purchases (see
              Section 5.2).
            </li>
            <li>
              <strong className="text-slate-800">Legal compliance:</strong> If
              required by applicable law, court order, or government regulation,
              we may disclose your information after taking reasonable steps to
              notify you (unless prohibited by law).
            </li>
            <li>
              <strong className="text-slate-800">Business transfer:</strong> In
              the event of a merger, acquisition, or sale of assets, your data
              may be transferred as part of the transaction. You will be
              notified via the App or email.
            </li>
          </UnorderedList>
          <Paragraph>No other sharing occurs.</Paragraph>

          <SectionTitle>7. Data Retention</SectionTitle>
          <div className="overflow-x-auto mb-8 rounded-xl shadow-sm ring-1 ring-slate-200">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-slate-50 text-slate-800 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold border-b border-slate-200 w-1/3">
                    Data Type
                  </th>
                  <th className="px-6 py-4 font-semibold border-b border-slate-200">
                    Retention Period
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-600 divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Account data (Firebase)
                  </td>
                  <td className="px-6 py-4">
                    Retained until account deletion is requested
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Transaction data (local)
                  </td>
                  <td className="px-6 py-4">
                    Retained on-device until manually cleared by the user
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Transaction data (Firestore)
                  </td>
                  <td className="px-6 py-4">
                    Retained until account deletion is requested
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Voice/audio input
                  </td>
                  <td className="px-6 py-4 text-emerald-600 font-medium">
                    Not retained — discarded immediately after transcription
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Subscription status
                  </td>
                  <td className="px-6 py-4">
                    Retained until subscription expires or is cancelled
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Referral data
                  </td>
                  <td className="px-6 py-4">
                    Retained until account deletion is requested
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Exported reports
                  </td>
                  <td className="px-6 py-4">
                    Retained on device storage until deleted by the user
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Exchange rate cache
                  </td>
                  <td className="px-6 py-4">
                    Refreshed every 6 hours; not permanently stored
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6 text-amber-800 text-sm">
            If you delete the App without requesting account deletion, your
            Firebase account and associated cloud data (email, referral stats)
            may persist. Please contact us to request full data deletion.
          </div>

          <SectionTitle>8. Data Security</SectionTitle>
          <Paragraph>
            We implement the following technical and organisational measures to
            protect your data:
          </Paragraph>
          <UnorderedList>
            <li>
              <strong className="text-slate-800">Authentication:</strong>{" "}
              Firebase Authentication with email verification is required for
              account access.
            </li>
            <li>
              <strong className="text-slate-800">Transport Security:</strong>{" "}
              All communications with Firebase and external APIs use HTTPS/TLS
              encryption.
            </li>
            <li>
              <strong className="text-slate-800">Local Storage:</strong>{" "}
              Transaction data stored on your device is protected by Android’s
              application sandboxing.
            </li>
            <li>
              <strong className="text-slate-800">Password Handling:</strong>{" "}
              Passwords are managed entirely by Firebase Authentication and are
              never stored in plaintext by our application.
            </li>
            <li>
              <strong className="text-slate-800">No Audio Storage:</strong>{" "}
              Voice input is processed in real time and never recorded or stored
              by the App.
            </li>
            <li>
              <strong className="text-slate-800">Offline Resilience:</strong>{" "}
              Transactions created offline are stored locally and synced when
              connectivity is restored, without exposure to external systems in
              the interim.
            </li>
          </UnorderedList>
          <Paragraph>
            Despite these safeguards, no method of electronic transmission or
            storage is 100% secure. We encourage you to use a strong password
            and to keep your device software up to date.
          </Paragraph>

          <SectionTitle>9. Your Rights and Choices</SectionTitle>
          <Paragraph>
            Subject to applicable law (including GDPR for users in the European
            Economic Area and CCPA for California residents), you have the
            following rights:
          </Paragraph>
          <UnorderedList>
            <li>
              <strong className="text-slate-800">a) Right to Access:</strong>{" "}
              You may request a copy of the personal data we hold about you.
            </li>
            <li>
              <strong className="text-slate-800">
                b) Right to Correction:
              </strong>{" "}
              You may update your display name directly within the App (Profile
              section). To correct your email address, contact us.
            </li>
            <li>
              <strong className="text-slate-800">c) Right to Deletion:</strong>{" "}
              You may request deletion of your account and associated personal
              data by contacting us at support@iotrenetics.com. Local
              transaction data can be deleted directly within the App via
              Settings &gt; Clear All Data.
            </li>
            <li>
              <strong className="text-slate-800">
                d) Right to Data Portability:
              </strong>{" "}
              You may export your transaction data at any time in Excel format
              using the “Export” feature in the App.
            </li>
            <li>
              <strong className="text-slate-800">
                e) Right to Withdraw Consent (Microphone):
              </strong>{" "}
              You may revoke microphone permission at any time via your device’s
              system settings (Settings &gt; Apps &gt; finexo &gt; Permissions).
              This will disable voice input but will not affect other App
              features.
            </li>
            <li>
              <strong className="text-slate-800">
                f) Right to Withdraw Consent (Notifications):
              </strong>{" "}
              You may disable local notifications at any time via your device’s
              system settings or within the App’s Report Scheduling settings.
            </li>
            <li>
              <strong className="text-slate-800">
                g) CCPA Rights (California Residents):
              </strong>{" "}
              California residents have the right to know what personal
              information is collected, to request deletion, and to opt out of
              the sale of personal information. We do not sell personal
              information.
            </li>
          </UnorderedList>
          <Paragraph>
            To exercise any of these rights, contact us at:{" "}
            <a
              href="mailto:support@iotrenetics.com"
              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            >
              support@iotrenetics.com
            </a>
            . We will respond to verified requests within 30 days.
          </Paragraph>

          <SectionTitle>10. Children’s Privacy</SectionTitle>
          <Paragraph>
            finexo is not directed at children under the age of 13 (or under 16
            in the European Economic Area). We do not knowingly collect personal
            information from children under these ages.
          </Paragraph>
          <Paragraph>
            If you are a parent or guardian and believe your child has provided
            personal information to us without your consent, please contact us
            at{" "}
            <a
              href="mailto:support@iotrenetics.com"
              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            >
              support@iotrenetics.com
            </a>
            , and we will promptly delete such information.
          </Paragraph>

          <SectionTitle>11. International Data Transfers</SectionTitle>
          <Paragraph>
            IoTrenetics Solutions Private Limited is incorporated in India. If
            you are located outside India, please note that your data
            (specifically, data stored in Firebase) may be transferred to and
            processed in data centres operated by Google LLC, which may be
            located outside your country of residence.
          </Paragraph>
          <Paragraph>
            Google maintains appropriate data transfer mechanisms, including
            Standard Contractual Clauses, to protect data transferred across
            borders. By using the App, you consent to this transfer.
          </Paragraph>

          <SectionTitle>12. Changes to This Privacy Policy</SectionTitle>
          <Paragraph>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices, technology, or legal requirements. When we
            make material changes:
          </Paragraph>
          <UnorderedList>
            <li>
              We will update the “Last Updated” date at the top of this policy.
            </li>
            <li>
              We will notify you through the App or by email to your registered
              address at least 7 days before the change takes effect.
            </li>
          </UnorderedList>
          <Paragraph>
            Your continued use of the App after the effective date of changes
            constitutes acceptance of the updated policy. We encourage you to
            review this policy periodically.
          </Paragraph>

          <SectionTitle>13. Contact Us</SectionTitle>
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mt-6">
            <p className="text-slate-600 mb-6">
              If you have any questions, concerns, or requests related to this
              Privacy Policy or our data practices, please contact us:
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-indigo-100 p-2 rounded-lg mr-4 text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-slate-800">Company</h5>
                  <p className="text-slate-600">
                    IoTrenetics Solutions Private Limited
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-100 p-2 rounded-lg mr-4 text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-slate-800">Email</h5>
                  <a
                    href="mailto:support@iotrenetics.com"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    support@iotrenetics.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-100 p-2 rounded-lg mr-4 text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-slate-800">Address</h5>
                  <p className="text-slate-600">
                    A-3, Third Floor, Chander Nagar (West), Shahdara,
                    Delhi-110051
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-100 p-2 rounded-lg mr-4 text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-slate-800">Website</h5>
                  <a
                    href="https://www.iotrenetics.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    https://www.iotrenetics.com/
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 text-sm text-slate-500">
              <p>
                <strong className="text-slate-700">Response Time:</strong>{" "}
                Within 30 business days
              </p>
              <p className="mt-1">
                <strong className="text-slate-700">
                  For data deletion requests:
                </strong>{" "}
                Use the subject line <em>“Data Deletion Request — finexo”</em>
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-xs sm:text-sm text-slate-400 text-center leading-relaxed">
              This Privacy Policy is governed by the laws of India, including
              the Information Technology (Reasonable Security Practices and
              Procedures and Sensitive Personal Data or Information) Rules,
              2011, and applicable provisions of the Digital Personal Data
              Protection Act, 2023.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyfinexo;
