import SEO from "../components/SEO";
import React from "react";

const DeleteAccHealNet = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <SEO
        title="HealNet Delete Account & Data | IoTrenetics"
        description="Instructions on how to request deletion of your HealNet account and associated health data."
        url="/delete-account-policy-healnet"
      />

      {/* HEADER */}
      <header className="bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 text-white py-10 px-5 text-center relative overflow-hidden shadow-md">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-cyan-300 blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Account &amp; Data Deletion</h1>
          <p className="mt-2 text-lg font-medium text-emerald-100">
            HealNet — AI Health Platform
          </p>
          <p className="mt-1 text-xs sm:text-sm text-teal-200 opacity-90">
            by IoTrenetics Solutions Private Limited · Made in Bharat 🇮🇳
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6 pb-16">
        {/* INTRO */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 shadow-sm border border-slate-200/80">
          <p className="text-slate-600 leading-relaxed text-base mb-4">
            At HealNet, we respect your privacy and your right to control your data. This page explains how to request deletion of your HealNet account and all associated data.
          </p>
          <p className="text-slate-600 leading-relaxed text-base">
            You can delete your account directly inside the app, or by submitting a request to our support team.
          </p>
        </div>

        {/* OPTION 1: IN-APP */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 shadow-sm border border-slate-200/80">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span>📱</span> Option 1 — Delete Inside the App
          </h2>
          <p className="text-slate-600 leading-relaxed text-base mb-4">
            This is the fastest way. Follow these steps:
          </p>

          <ul className="list-none my-4 space-y-3.5">
            {[
              <span key="1">Open the <strong>HealNet</strong> app on your device</span>,
              <span key="2">Tap the <strong>☰ Menu</strong> icon in the top-left corner</span>,
              <span key="3">Go to <strong>Profile / Account Settings</strong></span>,
              <span key="4">Scroll down to the bottom of the page</span>,
              <span key="5">Tap <strong>"Delete My Account"</strong> (shown in red)</span>,
              <span key="6">Confirm the deletion in the two prompts that appear</span>,
            ].map((step, idx) => (
              <li key={idx} className="flex items-start gap-3.5 text-base text-slate-700">
                <span className="bg-emerald-600 text-white font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  {idx + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>

          <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-4 sm:p-5 mt-5 text-sm sm:text-base text-amber-900 leading-relaxed flex items-start gap-3">
            <span className="text-xl shrink-0">⚠️</span>
            <div>
              <strong>This action is immediate and irreversible.</strong> Your account and all data will be permanently deleted right away.
            </div>
          </div>
        </div>

        {/* OPTION 2: EMAIL */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 shadow-sm border border-slate-200/80">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span>✉️</span> Option 2 — Email Request
          </h2>
          <p className="text-slate-600 leading-relaxed text-base mb-4">
            If you cannot access the app, send us an email:
          </p>

          <div className="bg-teal-50/70 border border-teal-200/80 rounded-xl p-5 sm:p-6 mt-4 space-y-3 text-sm sm:text-base text-teal-950">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-teal-200/50 pb-2">
              <span className="font-semibold text-teal-900">Email</span>
              <a href="mailto:support@iotrenetics.com" className="text-teal-700 font-bold hover:underline">
                support@iotrenetics.com
              </a>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-teal-200/50 pb-2">
              <span className="font-semibold text-teal-900">Subject</span>
              <span className="font-medium text-slate-800">Account Deletion Request — HealNet</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="font-semibold text-teal-900">Include</span>
              <span className="font-medium text-slate-800">Your registered email address</span>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed text-base mt-4">
            We will process your request within <strong>7 business days</strong> and send a confirmation to your email.
          </p>
        </div>

        {/* WHAT DATA IS DELETED VS RETAINED */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 shadow-sm border border-slate-200/80">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span>🗂️</span> What Data is Deleted vs Retained
          </h2>

          <div className="overflow-x-auto mt-4 rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="py-3.5 px-4 font-semibold border-b border-slate-200">Data Type</th>
                  <th className="py-3.5 px-4 font-semibold border-b border-slate-200">Status</th>
                  <th className="py-3.5 px-4 font-semibold border-b border-slate-200">Retention Period</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {[
                  { type: "Email address & password", status: "Deleted", badge: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: "✅", period: "Immediately" },
                  { type: "Name & profile information", status: "Deleted", badge: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: "✅", period: "Immediately" },
                  { type: "Patient records you created", status: "Deleted", badge: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: "✅", period: "Immediately" },
                  { type: "Vitals, symptoms & medications history", status: "Deleted", badge: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: "✅", period: "Immediately" },
                  { type: "Blood report uploads & extracted values", status: "Deleted", badge: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: "✅", period: "Immediately" },
                  { type: "Health Score history", status: "Deleted", badge: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: "✅", period: "Immediately" },
                  { type: "QR sharing links you generated", status: "Deleted", badge: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: "✅", period: "Immediately" },
                  { type: "Data added by a family member to a patient shared with you", status: "Retained under their account", badge: "bg-amber-100 text-amber-800 border-amber-200", icon: "⏳", period: "N/A — belongs to the other account" },
                  { type: "Anonymized usage analytics", status: "Retained", badge: "bg-slate-100 text-slate-800 border-slate-200", icon: "⏳", period: "Up to 90 days" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-slate-800 align-top">{row.type}</td>
                    <td className="py-3.5 px-4 align-top">
                      <span className={`inline-flex items-center gap-1 py-1 px-2.5 rounded-full text-xs font-semibold border ${row.badge}`}>
                        <span>{row.icon}</span> {row.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 align-top">{row.period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PARTIAL DATA DELETION */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 shadow-sm border border-slate-200/80">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span>✂️</span> Partial Data Deletion (Without Deleting Account)
          </h2>
          <p className="text-slate-600 leading-relaxed text-base mb-4">
            You can delete specific data without deleting your entire account. Here's how:
          </p>

          <ul className="list-disc list-outside pl-5 space-y-2.5 text-slate-700 text-base marker:text-emerald-500 mb-5">
            <li><strong>Delete a patient record</strong> — Go to <strong>Patients</strong> → open the patient → <strong>Delete Patient</strong></li>
            <li><strong>Delete a blood report</strong> — Go to <strong>Blood Reports</strong> → select the report → <strong>Delete</strong></li>
            <li><strong>Revoke family sharing access</strong> — Go to <strong>Family Dashboard</strong> → select the shared patient → <strong>Revoke Access</strong></li>
            <li><strong>Delete a single vitals entry</strong> — Go to the patient's <strong>Timeline</strong> → tap the entry → <strong>Delete</strong></li>
          </ul>

          <p className="text-slate-600 leading-relaxed text-base">
            For any other partial deletion requests, email us at{" "}
            <a href="mailto:support@iotrenetics.com" className="text-emerald-700 font-bold hover:underline">
              support@iotrenetics.com
            </a>.
          </p>
        </div>
      </div>

      <footer className="text-center py-8 text-sm text-slate-500 border-t border-slate-200 bg-white">
        <p><strong className="text-emerald-700 font-semibold">HealNet</strong> is a product of IoTrenetics Solutions Private Limited</p>
        <p className="mt-1">Made in Bharat 🇮🇳 · support@iotrenetics.com</p>
      </footer>
    </div>
  );
};

export default DeleteAccHealNet;
