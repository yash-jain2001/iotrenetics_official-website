import SEO from "../components/SEO";
import React from "react";

const DeleteAccTruVisit = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <SEO title="TruVisit Delete Account | IoTrenetics" description="Instructions on how to request deletion of your TruVisit account." url="/delete-account-policy-truvisit" />

      <header className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-6 px-5 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">TruVisit</h1>
        <p className="mt-1 text-sm opacity-90">by IoTrenetics Solutions Private Limited · Made in Bharat 🇮🇳</p>
      </header>

      <div className="mx-auto mt-10 px-5 pb-16">
        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2.5">🗑️ Account &amp; Data Deletion</h2>
          <p className="text-gray-600 leading-relaxed text-[15px] mb-3">
            TruVisit accounts are created and managed by your organization's Admin, since visit data belongs to your employer's workforce records. Because of this, account deletion is handled by your Admin or by contacting our support team directly — not as a self-serve toggle inside the app.
          </p>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            You can request deletion through either option below.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2.5">👤 Option 1 — Request via Your Organization's Admin</h2>
          <p className="text-gray-600 leading-relaxed text-[15px] mb-3">If you're a field Worker, the fastest route is through your own organization:</p>
          <ul className="list-none my-4 space-y-4">
            {[
              <span key="1">Contact your <strong>Manager or Admin</strong> within your organization</span>,
              <span key="2">Ask them to remove your account from the <strong>TruVisit Admin Dashboard</strong></span>,
              <span key="3">Your account, visit history, and face reference data linked to it will be deleted from active records</span>,
            ].map((step, idx) => (
              <li key={idx} className="flex items-start gap-3.5 text-[15px] text-gray-700">
                <span className="bg-blue-600 text-white font-bold text-[13px] w-[26px] h-[26px] rounded-full flex items-center justify-center shrink-0 mt-[1px]">{idx + 1}</span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2.5">📧 Option 2 — Email Request</h2>
          <p className="text-gray-600 leading-relaxed text-[15px] mb-3">If you can't reach your Admin, or you are an Admin requesting deletion of your organization's account, email us directly:</p>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl py-5 px-6 mt-4 space-y-2">
            <p className="m-0 text-[15px] text-blue-800">📬 Email: <a href="mailto:support@iotrenetics.com" className="text-blue-600 font-bold hover:underline">support@iotrenetics.com</a></p>
            <p className="m-0 text-[15px] text-blue-800">📌 Subject: <strong>Account Deletion Request — TruVisit</strong></p>
            <p className="m-0 text-[15px] text-blue-800">📝 Include: Your <strong>registered name, phone/email, and organization name</strong></p>
          </div>
          <p className="text-gray-600 leading-relaxed text-[15px] mt-4">
            We will verify the request with your organization's Admin (for Worker accounts) and process it within <strong>7 business days</strong>, sending a confirmation to your email.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2.5">📋 What Data is Deleted vs Retained</h2>
          <table className="w-full border-collapse mt-4 text-sm">
            <thead>
              <tr>
                <th className="bg-gray-100 py-3 px-4 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Data Type</th>
                <th className="bg-gray-100 py-3 px-4 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Status</th>
                <th className="bg-gray-100 py-3 px-4 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Retention Period</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Name, phone/email, profile info", status: "Deleted", badge: "bg-green-100 text-green-600", icon: "✅", period: "Immediately" },
                { type: "Face reference photo & descriptor", status: "Deleted", badge: "bg-green-100 text-green-600", icon: "✅", period: "Immediately" },
                { type: "Location history tied to your account", status: "Deleted", badge: "bg-green-100 text-green-600", icon: "✅", period: "Immediately" },
                { type: "Visit records you completed", status: "Retained by employer", badge: "bg-amber-100 text-amber-600", icon: "⏳", period: "As part of org's business records, per employer policy" },
                { type: "Audit logs (compliance)", status: "Retained", badge: "bg-amber-100 text-amber-600", icon: "⏳", period: "Up to 90 days, anonymized" },
              ].map((row, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-4 border-b border-gray-100 text-gray-600 align-top">{row.type}</td>
                  <td className="py-3 px-4 border-b border-gray-100 text-gray-600 align-top">
                    <span className={`inline-block py-0.5 px-2.5 rounded-full text-xs font-semibold ${row.badge}`}>{row.icon} {row.status}</span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100 text-gray-600 align-top">{row.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-4 text-amber-800 text-sm">
            Visit records you completed remain part of your employer's business and compliance records even after your personal account is deleted, with your identifying data (name, face descriptor, precise location) removed or anonymized.
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2.5">🔧 Removing Just Your Face Reference Photo</h2>
          <p className="text-gray-600 leading-relaxed text-[15px] mb-3">
            If you only want your face reference photo removed (without deleting your whole account), ask your Manager/Admin to reset it from the Admin Dashboard, or email us at{" "}
            <a href="mailto:support@iotrenetics.com" className="text-blue-600 font-semibold hover:underline">support@iotrenetics.com</a>.
          </p>
        </div>
      </div>

      <footer className="text-center py-6 text-[13px] text-gray-400 border-t border-gray-200">
        <p><strong className="text-blue-600 font-bold">TruVisit</strong> is a product of IoTrenetics Solutions Private Limited</p>
        <p className="mt-1.5">Made in Bharat 🇮🇳 · support@iotrenetics.com</p>
      </footer>
    </div>
  );
};

export default DeleteAccTruVisit;