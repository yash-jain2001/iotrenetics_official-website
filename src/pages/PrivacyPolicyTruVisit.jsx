import SEO from "../components/SEO";
import React from "react";

const HeaderInfo = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-blue-200/30 last:border-0">
    <span className="text-blue-100 font-medium">{label}</span>
    <span className="text-white sm:text-right font-semibold">{value}</span>
  </div>
);
const SectionTitle = ({ children }) => (
  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 border-b-2 border-blue-100 pb-2 mb-6 mt-12 first:mt-0">{children}</h2>
);
const SubSectionTitle = ({ children }) => (
  <h3 className="text-lg sm:text-xl font-bold text-blue-700 mt-6 mb-3">{children}</h3>
);
const Paragraph = ({ children }) => <p className="text-gray-600 leading-relaxed mb-4">{children}</p>;
const UnorderedList = ({ children }) => (
  <ul className="list-disc list-outside pl-5 space-y-2 text-gray-600 mb-6 marker:text-blue-400">{children}</ul>
);

const PrivacyPolicyTruVisit = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-blue-100 selection:text-blue-900">
      <SEO title="TruVisit Privacy Policy | IoTrenetics" description="Privacy policy for the TruVisit field visit tracking app." url="/privacy-policy-truvisit" />

      <div className="mx-auto rounded-3xl shadow-xl overflow-hidden bg-white ring-1 ring-gray-900/5">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-6 py-12 sm:px-12 sm:py-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-400 blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100 mb-8 font-medium">TruVisit — Field Visit Tracking</p>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/20 shadow-lg">
              <HeaderInfo label="App Name" value="TruVisit — Field Visit Tracking" />
              <HeaderInfo label="Company" value="IoTrenetics Solutions Private Limited" />
              <HeaderInfo label="Effective Date" value="August 8, 2026" />
              <HeaderInfo label="Last Updated" value="August 8, 2026" />
              <HeaderInfo label="Contact Email" value="support@iotrenetics.com" />
              <HeaderInfo label="Company Address" value="A-3, Third Floor, Chander Nagar (West), Shahdara, Delhi-110051" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-10 sm:px-12 sm:py-14 bg-white">
          <SectionTitle>1. Introduction</SectionTitle>
          <Paragraph>
            IoTrenetics Solutions Private Limited (“we,” “our,” or “us”) operates the TruVisit mobile application (the “App”), a field workforce visit-tracking tool used by Worker and Manager/Admin users within an organization (the “Customer”) that has deployed TruVisit for its field operations.
          </Paragraph>
          <Paragraph>
            This Privacy Policy explains what information TruVisit collects, how it is used, with whom it is shared, and what rights you have. Please read this carefully. If you disagree with its terms, please discontinue use of the App.
          </Paragraph>

          <SectionTitle>2. Information We Collect</SectionTitle>

          <SubSectionTitle>2.1 Account and Identity Data</SubSectionTitle>
          <UnorderedList>
            <li><strong className="text-gray-800">Name, phone number/email</strong> — provided during account setup by your organization's Admin</li>
            <li><strong className="text-gray-800">Role</strong> — Worker, Manager, or Admin, as assigned within your organization</li>
            <li><strong className="text-gray-800">Employer organization</strong> — the Customer account you are linked to</li>
          </UnorderedList>

          <SubSectionTitle>2.2 Location Data</SubSectionTitle>
          <UnorderedList>
            <li><strong className="text-gray-800">Foreground location</strong> — precise GPS captured at visit check-in and check-out, using multi-sample averaging for accuracy</li>
            <li><strong className="text-gray-800">Background location</strong> — collected only during an active visit where a Manager/Admin has enabled live tracking, and only after the Worker separately grants "Allow all the time" location permission following an in-app disclosure screen. Background location is never collected outside an active tracked visit, and a persistent notification is shown by the operating system the entire time it is running.</li>
          </UnorderedList>

          <SubSectionTitle>2.3 Camera, Photo, and Face Data</SubSectionTitle>
          <Paragraph>
            TruVisit uses the device camera to capture arrival/departure selfies and visit-related photos. To verify the person checking in is the assigned Worker, the app performs on-device face comparison against a reference photo the Worker previously submitted. This generates a mathematical face descriptor — a set of numbers representing facial geometry — which cannot be used to reconstruct the original photo and is not linked to any outside identity database.
          </Paragraph>

          <SubSectionTitle>2.4 Visit and Device Data</SubSectionTitle>
          <UnorderedList>
            <li>Visit records: customer name, address, timestamps, notes, status</li>
            <li>Visit photos and any signatures captured during a visit</li>
            <li>Offline queue data stored locally on-device until synced</li>
            <li>Push notification tokens (Firebase Cloud Messaging), for visit and status alerts</li>
          </UnorderedList>

          <SectionTitle>3. How We Collect Information</SectionTitle>
          <div className="overflow-x-auto mb-8 rounded-xl shadow-sm ring-1 ring-gray-200">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-gray-50 text-gray-800 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold border-b border-gray-200">Method</th>
                  <th className="px-6 py-4 font-semibold border-b border-gray-200">Data Collected</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y divide-gray-100">
                <tr><td className="px-6 py-4 font-medium text-gray-800">Account provisioning by Admin</td><td className="px-6 py-4">Name, contact info, role, organization</td></tr>
                <tr><td className="px-6 py-4 font-medium text-gray-800">Device GPS</td><td className="px-6 py-4">Foreground and (opt-in) background location during visits</td></tr>
                <tr><td className="px-6 py-4 font-medium text-gray-800">Device Camera</td><td className="px-6 py-4">Arrival selfies, visit photos, face descriptor</td></tr>
                <tr><td className="px-6 py-4 font-medium text-gray-800">Manual Input</td><td className="px-6 py-4">Visit notes, forms, signatures</td></tr>
                <tr><td className="px-6 py-4 font-medium text-gray-800">Supabase (backend)</td><td className="px-6 py-4">Stores visit records, user profiles, audit logs</td></tr>
                <tr><td className="px-6 py-4 font-medium text-gray-800">Firebase Cloud Messaging</td><td className="px-6 py-4">Push notification delivery token</td></tr>
                <tr><td className="px-6 py-4 font-medium text-gray-800">Local Device Storage</td><td className="px-6 py-4">Offline visit queue until synced</td></tr>
              </tbody>
            </table>
          </div>

          <SectionTitle>4. How We Use Your Information</SectionTitle>
          <UnorderedList>
            <li><strong className="text-gray-800">a) Visit verification:</strong> To confirm a Worker was on-site via GPS and face-match at check-in/check-out.</li>
            <li><strong className="text-gray-800">b) Reporting:</strong> To generate visit reports, PDF exports, audit logs, and analytics for the Worker's organization.</li>
            <li><strong className="text-gray-800">c) Offline support:</strong> To store visit data locally when the device is offline, syncing once connectivity returns.</li>
            <li><strong className="text-gray-800">d) Notifications:</strong> To alert Workers and Managers of visit assignments and status changes.</li>
            <li><strong className="text-gray-800">e) Account and access management:</strong> To manage roles and permissions within your organization's account.</li>
          </UnorderedList>

          <SectionTitle>5. Third-Party Services</SectionTitle>
          <div className="flex flex-col md:flex-row flex-wrap gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">5.1 Supabase</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><span className="font-medium text-gray-700">Data shared:</span> Visit records, user profiles, face descriptors, photos</li>
                <li><span className="font-medium text-gray-700">Purpose:</span> Backend database and file storage</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">5.2 Google Firebase</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><span className="font-medium text-gray-700">Data shared:</span> Push notification token</li>
                <li><span className="font-medium text-gray-700">Purpose:</span> Delivering visit and status notifications</li>
              </ul>
            </div>
          </div>
          <Paragraph>We do not use advertising networks, behavioural tracking SDKs, or data brokers. TruVisit does not display advertisements and does not sell personal data.</Paragraph>

          <SectionTitle>6. Data Sharing and Disclosure</SectionTitle>
          <UnorderedList>
            <li><strong className="text-gray-800">Within your organization:</strong> Visit data, location, and photos are visible to your assigned Manager/Admin — never to any party outside your employer's TruVisit account.</li>
            <li><strong className="text-gray-800">With Supabase and Firebase:</strong> As described in Section 5, to operate the App.</li>
            <li><strong className="text-gray-800">Legal compliance:</strong> If required by applicable law or court order.</li>
            <li><strong className="text-gray-800">Business transfer:</strong> In the event of a merger or acquisition, data may transfer as part of the transaction; you will be notified via the App or email.</li>
          </UnorderedList>

          <SectionTitle>7. Data Retention</SectionTitle>
          <div className="overflow-x-auto mb-8 rounded-xl shadow-sm ring-1 ring-gray-200">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-gray-50 text-gray-800 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold border-b border-gray-200 w-1/3">Data Type</th>
                  <th className="px-6 py-4 font-semibold border-b border-gray-200">Retention Period</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y divide-gray-100">
                <tr><td className="px-6 py-4 font-medium text-gray-800">Visit records &amp; reports</td><td className="px-6 py-4">Retained while your organization's TruVisit account is active</td></tr>
                <tr><td className="px-6 py-4 font-medium text-gray-800">Location data</td><td className="px-6 py-4">Retained as part of the visit record it belongs to</td></tr>
                <tr><td className="px-6 py-4 font-medium text-gray-800">Face descriptor &amp; photos</td><td className="px-6 py-4">Retained until account deletion is requested</td></tr>
                <tr><td className="px-6 py-4 font-medium text-gray-800">Offline queue (local)</td><td className="px-6 py-4">Cleared automatically once synced</td></tr>
              </tbody>
            </table>
          </div>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6 text-amber-800 text-sm">
            Deleting the App from your device does not delete your account or organization's data. See our Delete Account Policy for how to request deletion.
          </div>

          <SectionTitle>8. Data Security</SectionTitle>
          <UnorderedList>
            <li><strong className="text-gray-800">Transport Security:</strong> All communication with Supabase and Firebase uses HTTPS/TLS encryption.</li>
            <li><strong className="text-gray-800">Access Control:</strong> Visit and location data is scoped to your organization only.</li>
            <li><strong className="text-gray-800">On-Device Processing:</strong> Face matching runs on-device; raw face images are not required to leave the device for comparison.</li>
            <li><strong className="text-gray-800">Backup Controls:</strong> The App does not allow automatic device backup of sensitive local data.</li>
          </UnorderedList>
          <Paragraph>No method of transmission or storage is 100% secure. We encourage keeping your device and app updated.</Paragraph>

          <SectionTitle>9. Your Rights and Choices</SectionTitle>
          <UnorderedList>
            <li><strong className="text-gray-800">a) Right to Access:</strong> Request a copy of the personal data we hold about you via your organization's Admin or by contacting us.</li>
            <li><strong className="text-gray-800">b) Right to Correction:</strong> Contact your organization's Admin to correct your profile information.</li>
            <li><strong className="text-gray-800">c) Right to Deletion:</strong> Request deletion of your account and associated data — see our Delete Account Policy.</li>
            <li><strong className="text-gray-800">d) Withdraw Location Consent:</strong> Decline "Allow all the time" location at any time; the visit will still work with foreground-only tracking.</li>
            <li><strong className="text-gray-800">e) Withdraw Camera Consent:</strong> Revoke camera permission via device Settings &gt; Apps &gt; TruVisit &gt; Permissions; this will disable check-in verification.</li>
          </UnorderedList>
          <Paragraph>
            To exercise these rights, contact <a href="mailto:support@iotrenetics.com" className="text-blue-600 hover:text-blue-800 font-medium">support@iotrenetics.com</a>. We respond to verified requests within 30 days.
          </Paragraph>

          <SectionTitle>10. Children's Privacy</SectionTitle>
          <Paragraph>TruVisit is a workplace tool not directed at children and is not knowingly used by anyone under 18.</Paragraph>

          <SectionTitle>11. International Data Transfers</SectionTitle>
          <Paragraph>
            IoTrenetics Solutions Private Limited is incorporated in India. Data processed via Firebase may be transferred to and processed in data centres operated by Google LLC, which may be located outside your country of residence, under appropriate data transfer safeguards.
          </Paragraph>

          <SectionTitle>12. Changes to This Privacy Policy</SectionTitle>
          <Paragraph>We may update this policy periodically. Material changes will be reflected by updating the "Last Updated" date and, where required, notified via the App or email.</Paragraph>

          <SectionTitle>13. Contact Us</SectionTitle>
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm mt-6">
            <p className="text-gray-600 mb-6">If you have questions or requests related to this Privacy Policy, contact us:</p>
            <div className="space-y-4">
              <div><h5 className="font-bold text-gray-800">Company</h5><p className="text-gray-600">IoTrenetics Solutions Private Limited</p></div>
              <div><h5 className="font-bold text-gray-800">Email</h5><a href="mailto:support@iotrenetics.com" className="text-blue-600 hover:text-blue-800">support@iotrenetics.com</a></div>
              <div><h5 className="font-bold text-gray-800">Address</h5><p className="text-gray-600">A-3, Third Floor, Chander Nagar (West), Shahdara, Delhi-110051</p></div>
              <div><h5 className="font-bold text-gray-800">Website</h5><a href="https://www.iotrenetics.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">https://www.iotrenetics.com/</a></div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
              <p><strong className="text-gray-700">Response Time:</strong> Within 30 business days</p>
              <p className="mt-1"><strong className="text-gray-700">For data deletion requests:</strong> Use subject line <em>"Data Deletion Request — TruVisit"</em></p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-xs sm:text-sm text-gray-400 text-center leading-relaxed">
              This Privacy Policy is governed by the laws of India, including the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and applicable provisions of the Digital Personal Data Protection Act, 2023.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyTruVisit;