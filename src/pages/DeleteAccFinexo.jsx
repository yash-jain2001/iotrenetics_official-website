import React from "react";

const DeleteAccfinexo = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-gradient-to-br from-orange-500 to-red-500 text-white py-6 px-5 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">finexo</h1>
        <p className="mt-1 text-sm opacity-90">
          by IoTrenetics Solutions Private Limited · Made in Bharat 🇮🇳
        </p>
      </header>

      <div className=" mx-auto mt-10 px-5 pb-16">
        {/* INTRO */}
        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2.5">
            🗑️ Account & Data Deletion
          </h2>
          <p className="text-gray-600 leading-relaxed text-[15px] mb-3">
            At finexo, we respect your privacy and your right to control your
            data. This page explains how to request deletion of your finexo
            account and all associated data.
          </p>
          <p className="text-gray-600 leading-relaxed text-[15px] mb-3">
            You can delete your account directly inside the app, or by
            submitting a request to our support team.
          </p>
        </div>

        {/* OPTION 1: IN-APP */}
        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2.5">
            📱 Option 1 — Delete Inside the App
          </h2>
          <p className="text-gray-600 leading-relaxed text-[15px] mb-3">
            This is the fastest way. Follow these steps:
          </p>

          <ul className="list-none my-4 space-y-4">
            {[
              <span key="1">
                Open the <strong>finexo</strong> app on your device
              </span>,
              <span key="2">
                Tap the <strong>☰ Menu</strong> icon in the top-left corner
              </span>,
              <span key="3">
                Go to <strong>View Profile</strong>
              </span>,
              <span key="4">Scroll down to the bottom of the page</span>,
              <span key="5">
                Tap <strong>"Delete My Account"</strong> (shown in red)
              </span>,
              <span key="6">
                Confirm the deletion in the two prompts that appear
              </span>,
            ].map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3.5 text-[15px] text-gray-700"
              >
                <span className="bg-orange-500 text-white font-bold text-[13px] w-[26px] h-[26px] rounded-full flex items-center justify-center shrink-0 mt-[1px]">
                  {idx + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>

          <div className="bg-red-50 border border-red-200 rounded-xl py-4 px-5 mt-4 text-sm text-red-800 leading-relaxed">
            ⚠️ This action is <strong>immediate and irreversible.</strong> Your
            account and all data will be permanently deleted right away.
          </div>
        </div>

        {/* OPTION 2: EMAIL */}
        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2.5">
            📧 Option 2 — Email Request
          </h2>
          <p className="text-gray-600 leading-relaxed text-[15px] mb-3">
            If you cannot access the app, send us an email:
          </p>

          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl py-5 px-6 mt-4 space-y-2">
            <p className="m-0 text-[15px] text-orange-800">
              📬 Email:{" "}
              <a
                href="mailto:support@iotrenetics.com"
                className="text-orange-600 font-bold hover:underline"
              >
                support@iotrenetics.com
              </a>
            </p>
            <p className="m-0 text-[15px] text-orange-800">
              📌 Subject: <strong>Account Deletion Request — finexo</strong>
            </p>
            <p className="m-0 text-[15px] text-orange-800">
              📝 Include: Your <strong>registered email address</strong>
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed text-[15px] mt-4 mb-3">
            We will process your request within <strong>7 business days</strong>{" "}
            and send a confirmation to your email.
          </p>
        </div>

        {/* WHAT GETS DELETED */}
        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2.5">
            📋 What Data is Deleted vs Retained
          </h2>
          <table className="w-full border-collapse mt-4 text-sm">
            <thead>
              <tr>
                <th className="bg-gray-100 py-3 px-4 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                  Data Type
                </th>
                <th className="bg-gray-100 py-3 px-4 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                  Status
                </th>
                <th className="bg-gray-100 py-3 px-4 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                  Retention Period
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  type: "Email address & password",
                  status: "Deleted",
                  badge: "bg-green-100 text-green-600",
                  icon: "✅",
                  period: "Immediately",
                },
                {
                  type: "Name & profile information",
                  status: "Deleted",
                  badge: "bg-green-100 text-green-600",
                  icon: "✅",
                  period: "Immediately",
                },
                {
                  type: "Transaction history",
                  status: "Deleted",
                  badge: "bg-green-100 text-green-600",
                  icon: "✅",
                  period: "Immediately",
                },
                {
                  type: "Referral code & referral data",
                  status: "Deleted",
                  badge: "bg-green-100 text-green-600",
                  icon: "✅",
                  period: "Immediately",
                },
                {
                  type: "Group expenses data",
                  status: "Deleted",
                  badge: "bg-green-100 text-green-600",
                  icon: "✅",
                  period: "Immediately",
                },
                {
                  type: "Anonymized usage analytics",
                  status: "Retained",
                  badge: "bg-yellow-100 text-yellow-600",
                  icon: "⏳",
                  period: "Up to 90 days",
                },
              ].map((row, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-4 border-b border-gray-100 text-gray-600 align-top">
                    {row.type}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100 text-gray-600 align-top">
                    <span
                      className={`inline-block py-0.5 px-2.5 rounded-full text-xs font-semibold ${row.badge}`}
                    >
                      {row.icon} {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100 text-gray-600 align-top">
                    {row.period}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PARTIAL DELETION */}
        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2.5">
            🔧 Partial Data Deletion (Without Deleting Account)
          </h2>
          <p className="text-gray-600 leading-relaxed text-[15px] mb-3">
            You can delete specific data without deleting your entire account.
            Here's how:
          </p>
          <ul className="list-none my-3">
            <li className="py-2 border-b border-gray-100 text-sm text-gray-700 flex items-center gap-2.5">
              🗂️{" "}
              <span>
                <strong>Delete all transactions</strong> — Go to Settings → Data
                &amp; Storage → Clear All Data
              </span>
            </li>
            <li className="py-2 border-b border-gray-100 text-sm text-gray-700 flex items-center gap-2.5">
              ✏️{" "}
              <span>
                <strong>Edit or delete individual transactions</strong> — Tap
                the 🗑️ icon on any transaction in the Transactions tab
              </span>
            </li>
            <li className="py-2 text-sm text-gray-700 flex items-center gap-2.5">
              👥{" "}
              <span>
                <strong>Delete a group</strong> — Go to Group Mode → tap 🗑️ on
                the group card
              </span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed text-[15px] mt-3">
            For any other partial deletion requests, email us at{" "}
            <a
              href="mailto:support@iotrenetics.com"
              className="text-orange-600 font-semibold hover:underline"
            >
              support@iotrenetics.com
            </a>
          </p>
        </div>
      </div>

      <footer className="text-center py-6 text-[13px] text-gray-400 border-t border-gray-200">
        <p>
          <strong className="text-orange-500 font-bold">finexo</strong> is a
          product of IoTrenetics Solutions Private Limited
        </p>
        <p className="mt-1.5">Made in Bharat 🇮🇳 · support@iotrenetics.com</p>
      </footer>
    </div>
  );
};

export default DeleteAccfinexo;
