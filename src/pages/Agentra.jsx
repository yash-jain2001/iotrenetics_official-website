import React from "react";

export default function Agentra() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans text-gray-800 selection:bg-blue-200">
      <div className=" mx-auto bg-white shadow-xl rounded-sm overflow-hidden print:shadow-none print:bg-white divide-y divide-gray-200">
        {/* Cover / Header Layer */}
        <header className="px-12 pt-14 pb-10">
          <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-widest mb-12">
            <span>Agentra MailSense — Technical README</span>
            <span>Confidential · v1.0 · March 2026</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-serif">
            Agentra MailSense
          </h1>
          <h2 className="text-xl text-gray-600 mb-8 border-l-4 border-blue-600 pl-4 font-medium">
            AI-Powered Agentic Email Automation Platform
          </h2>

          <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 flex justify-between border border-gray-100">
            <span>
              <strong>Prepared by:</strong> Pooja
            </span>
            <span>
              <strong>Date:</strong> March 2026
            </span>
            <span>
              <strong>Status:</strong> Development
            </span>
          </div>
        </header>

        <main className="px-12 py-10 space-y-12 text-sm leading-relaxed text-gray-700">
          {/* 1. Executive Summary */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              1. Executive Summary
            </h3>
            <p className="mb-4">
              Agentra MailSense is a full-stack, multi-user AI email automation
              platform that connects directly to Gmail via Google OAuth2 and
              uses Mistral AI to classify, archive, and automatically reply to
              emails — all without manual effort.
            </p>
            <p className="mb-6">
              The platform gives users two operational modes —{" "}
              <strong>Fast Mode</strong> for fully automated hands-free replies,
              and <strong>Safe Mode</strong> for AI-drafted replies that the
              user reviews and approves before sending. A server-side scheduler
              handles auto-deletion of spam and promotional emails on a
              configurable schedule, even when no browser is open.
            </p>

            <h4 className="font-bold text-gray-900 mb-3">
              Key Value Proposition
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">→</span> Reduces email
                management time by automating classification, archiving, and
                replies
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">→</span> Gives users
                control via Safe Mode without sacrificing intelligence
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">→</span> Runs entirely on
                open-source / low-cost infrastructure (Node.js + SQLite +
                Mistral AI)
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">→</span> Zero build step —
                deploy a single Node.js server, no separate frontend required
              </li>
            </ul>
          </section>

          {/* 2. Technology Stack */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              2. Technology Stack
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-200 px-4 py-2 text-left font-bold text-gray-900">
                      Layer
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-bold text-gray-900">
                      Technology
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-bold text-gray-900">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-medium">
                      Frontend
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      HTML5 + React 18 (UMD)
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Single-page dashboard — no build step required
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-medium">
                      Backend
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Node.js 24 + Express 4
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      REST API server, OAuth callback, scheduler
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-medium">
                      Database
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      SQLite (node:sqlite)
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Built-in to Node 24 — zero compilation needed
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-medium">
                      AI Model
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Mistral AI (mistral-small)
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Email classification + contextual reply generation
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-medium">
                      Email API
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Gmail API (googleapis)
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      OAuth2 inbox access, send, draft, trash
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-medium">
                      Auth
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      JWT + bcryptjs
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Secure login, OTP email verification
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-medium">
                      OTP Email
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Nodemailer (SMTP)
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Signup verification and password reset codes
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-medium">
                      Scheduler
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Node.js setInterval
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Server-side auto-delete runs every hour
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-medium">
                      Styling
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Custom CSS Variables
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Dark/light theme, fully responsive
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Feature List */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              3. Feature List
            </h3>

            <div className="space-y-6 text-sm">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  3.1 Authentication & User Management
                </h4>
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-200 px-3 py-1.5 text-left font-bold w-1/4">
                        Feature
                      </th>
                      <th className="border border-gray-200 px-3 py-1.5 text-left font-bold">
                        Description
                      </th>
                      <th className="border border-gray-200 px-3 py-1.5 text-center font-bold w-1/12">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Multi-user signup
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Email + OTP verification via SMTP. Bcrypt password
                        hashing.
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-center">
                        ✅ Done
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-1.5">
                        JWT login
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Secure JSON Web Token sessions, 7-day expiry.
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-center">
                        ✅ Done
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Forgot password
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5">
                        6-digit OTP sent to email. 3-step reset flow.
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-center">
                        ✅ Done
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Delete account
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Identity verified with email + password before permanent
                        deletion.
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-center">
                        ✅ Done
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Role-based access
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Admin / User / Observer roles stored per account.
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-center">
                        ✅ Done
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  3.2 Gmail Integration
                </h4>
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-200 px-3 py-1.5 text-left font-bold w-1/4">
                        Feature
                      </th>
                      <th className="border border-gray-200 px-3 py-1.5 text-left font-bold">
                        Description
                      </th>
                      <th className="border border-gray-200 px-3 py-1.5 text-center font-bold w-1/12">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-3 py-1.5">
                        OAuth2 Connect
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5">
                        One-click Google sign-in. Tokens stored encrypted.
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-center">
                        ✅ Done
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Date-range fetch
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Yesterday / 7 days / 30 days / 1 year / Custom.
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-center">
                        ✅ Done
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Email classification
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Mistral AI classifies emails: Important, Promotion,
                        Spam.
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-center">
                        ✅ Done
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Auto-archive
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Promo/spam removed from inbox automatically on fetch.
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-center">
                        ✅ Done
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Email reader
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Click any email to open full body in detail modal.
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-center">
                        ✅ Done
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Bulk delete
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Select by category or individually and move to bin.
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-center">
                        ✅ Done
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  3.3 AI Reply Automation
                </h4>
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-200 px-3 py-1.5 text-left font-bold w-1/4">
                        Feature
                      </th>
                      <th className="border border-gray-200 px-3 py-1.5 text-left font-bold">
                        Description
                      </th>
                      <th className="border border-gray-200 px-3 py-1.5 text-center font-bold w-1/12">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Fast Mode
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Agent generates and sends replies automatically to
                        Important emails.
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-center">
                        ✅ Done
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Safe Mode
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Agent generates a draft; user previews, edits, before
                        sending.
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-center">
                        ✅ Done
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Custom context
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Safe Mode users can add per-email context before reply
                        gen.
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-center">
                        ✅ Done
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Template editor
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5">
                        User-editable base template used as starting point for
                        AI replies.
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-center">
                        ✅ Done
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  3.4 Auto-Delete Scheduler
                </h4>
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-200 px-3 py-1.5 text-left font-bold w-1/4">
                        Feature
                      </th>
                      <th className="border border-gray-200 px-3 py-1.5 text-left font-bold">
                        Description
                      </th>
                      <th className="border border-gray-200 px-3 py-1.5 text-center font-bold w-1/12">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Server-side cron
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Runs hourly on backend — works even when browser closed.
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-center">
                        ✅ Done
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Configurable rules
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Per-user settings: spam after N days, bin auto-empty.
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-center">
                        ✅ Done
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Audit logging
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5">
                        Every action logged to agent_logs with timestamp.
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-center">
                        ✅ Done
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 4. Project Structure */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              4. Project Structure
            </h3>
            <pre className="bg-gray-50 border border-gray-200 p-4 rounded text-xs font-mono text-gray-800 leading-snug overflow-x-auto">
              {`agentra-mailsense/
├── backend/
│ ├── server.js ← Express entry point (port 3000)
│ ├── db.js ← SQLite schema + all prepared statements
│ ├── gmail.js ← Google OAuth2 + Gmail API helpers
│ ├── mailer.js ← Nodemailer OTP sender (SMTP)
│ ├── mistral.js ← Mistral AI classify + reply generation
│ ├── scheduler.js ← Server-side hourly auto-delete engine
│ ├── middleware/
│ │ └── auth.js ← JWT sign + requireAuth middleware
│ ├── routes/
│ │ ├── auth.js ← /api/login, signup-*, forgot-*, delete-account
│ │ └── gmail.js ← /api/gmail-*, /api/oauth2callback
│ ├── package.json
│ └── .env.example ← Copy to .env and fill in your values
└── public/
 ├── index.html ← Sign-in / Sign-up page
 └── dashboard.html ← React dashboard (served at /dashboard.html)`}
            </pre>
          </section>

          {/* 5. API Reference */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              5. API Reference
            </h3>

            <h4 className="font-bold text-gray-800 mb-2">
              5.1 Authentication Routes
            </h4>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-200 px-3 py-1.5 text-left font-bold">
                      Method
                    </th>
                    <th className="border border-gray-200 px-3 py-1.5 text-left font-bold">
                      Endpoint
                    </th>
                    <th className="border border-gray-200 px-3 py-1.5 text-left font-bold">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs">
                      POST
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs text-blue-700">
                      /api/signup-send-otp
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5">
                      Register user + send OTP to email
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs">
                      POST
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs text-blue-700">
                      /api/signup-verify-otp
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5">
                      Verify OTP → activate account
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs">
                      POST
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs text-blue-700">
                      /api/login
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5">
                      Login → returns JWT token
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs">
                      POST
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs text-blue-700">
                      /api/delete-account
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5">
                      Permanently delete account + all data
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-bold text-gray-800 mb-2">5.2 Gmail Routes</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-200 px-3 py-1.5 text-left font-bold">
                      Method
                    </th>
                    <th className="border border-gray-200 px-3 py-1.5 text-left font-bold">
                      Endpoint
                    </th>
                    <th className="border border-gray-200 px-3 py-1.5 text-left font-bold">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs">
                      GET
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs text-blue-700">
                      /api/gmail-auth
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5">
                      Redirect to Google OAuth2 consent screen
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs">
                      GET
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs text-blue-700">
                      /api/oauth2callback
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5">
                      Google redirects here after authorization
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs">
                      POST
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs text-blue-700">
                      /api/gmail-fetch
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5">
                      Fetch + classify emails by date range
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs">
                      POST
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs text-blue-700">
                      /api/gmail-reply
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5">
                      Send reply (Fast) or save draft (Safe Mode)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. Setup & Installation */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              6. Setup & Installation
            </h3>

            <h4 className="font-bold text-gray-800 mb-2">6.1 Prerequisites</h4>
            <ul className="list-disc pl-5 mb-6">
              <li>
                <strong>Node.js</strong> - Version 22 or higher (Node 24
                recommended)
              </li>
              <li>
                <strong>Mistral API Key</strong> - Free at console.mistral.ai
              </li>
              <li>
                <strong>Google Cloud</strong> - OAuth2 credentials for Gmail API
              </li>
              <li>
                <strong>Gmail Account</strong> - The SMTP sender account for OTP
                emails
              </li>
            </ul>

            <h4 className="font-bold text-gray-800 mb-2">
              6.2 Installation Steps
            </h4>
            <pre className="bg-gray-50 border border-gray-200 p-4 rounded text-xs font-mono text-gray-800 mb-6 overflow-x-auto">
              {`# 1. Extract the project zip or clone the repo
cd agentra-mailsense/backend

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env

# 4. Start the server
npm run dev
http://localhost:3000`}
            </pre>

            <h4 className="font-bold text-gray-800 mb-2">
              6.3 Google Cloud OAuth2 Setup
            </h4>
            <ul className="list-disc pl-5 mb-6 space-y-1">
              <li>Go to console.cloud.google.com and create a project</li>
              <li>
                Navigate to APIs & Services → Library → search "Gmail API" →
                Enable
              </li>
              <li>
                OAuth consent screen → External → add scopes:{" "}
                <span className="font-mono text-xs">
                  gmail.readonly, gmail.send, gmail.modify
                </span>
              </li>
              <li>Test Users page → add addresses</li>
              <li>
                Credentials → Create OAuth 2.0 Client ID → Web application
              </li>
              <li>
                Redirect URIs:{" "}
                <span className="font-mono text-xs">
                  http://localhost:3000/api/oauth2callback
                </span>
              </li>
            </ul>

            <h4 className="font-bold text-gray-800 mb-2">
              6.4 Environment Variables (.env)
            </h4>
            <pre className="bg-gray-50 border border-gray-200 p-4 rounded text-xs font-mono text-gray-800 mb-6 overflow-x-auto">
              {`PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/oauth2callback

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=youremail@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx

MISTRAL_API_KEY=your_key_from_console.mistral.ai
DB_PATH=./mailsense.db`}
            </pre>
          </section>

          {/* 7. Deployment Guide */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              7. Deployment Guide
            </h3>
            <p className="mb-2 font-bold">7.1 Deploy to Render.com</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Push to GitHub and connect on Render → New Web Service</li>
              <li>
                Root Directory: <code>backend</code> | Build:{" "}
                <code>npm install</code> | Start: <code>node server.js</code>
              </li>
              <li>
                Important: Due to ephemeral storage on Free Tier, the SQLite DB
                is wiped on redeploy. Use a Persistent Disk or provision a
                PostgreSQL DB.
              </li>
            </ul>
            <p className="mb-2 font-bold">7.2 Deploy to Railway.app</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Railway provides persistent storage natively. Run{" "}
                <code>railway init</code> and <code>railway up</code> via CLI.
              </li>
            </ul>
          </section>

          {/* 8. Known Issues */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              8. Known Issues & Fixes
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-200 px-3 py-1.5 text-left font-bold">
                      Error
                    </th>
                    <th className="border border-gray-200 px-3 py-1.5 text-left font-bold">
                      Fix
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs">
                      better-sqlite3 compile error
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5">
                      Replaced with built-in node:sqlite. Run npm install again.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs">
                      SMTP EAUTH error
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5">
                      Use 16-char Gmail App Password, not main password.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs">
                      Error 403 access_denied
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5">
                      App is in Testing mode. Add yourself as Test User.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-1.5 font-mono text-xs">
                      redirect_uri_mismatch
                    </td>
                    <td className="border border-gray-200 px-3 py-1.5">
                      Callback URL missing in Google Cloud credentials.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 9. Execution Plan */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              9. Week 1 Execution Plan
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Day 1:</strong> Environment Setup & Verify /api/health
              </li>
              <li>
                <strong>Day 2:</strong> Google OAuth and Consent Screen tests
              </li>
              <li>
                <strong>Day 3:</strong> Mistral AI classification and reply
                quality tests
              </li>
              <li>
                <strong>Day 4:</strong> End-to-end Test (Signup → Connect Gmail
                → Fetch emails)
              </li>
              <li>
                <strong>Day 5:</strong> Auto-reply test for Fast & Safe Mode
              </li>
              <li>
                <strong>Day 6:</strong> Edge Cases (Spam clearing, pagination,
                bulk empty)
              </li>
              <li>
                <strong>Day 7:</strong> Deployment on Render/Railway
              </li>
            </ul>
          </section>

          {/* 10. Security Considerations */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              10. Security Considerations
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Passwords hashed with bcryptjs (cost factor 12).</li>
              <li>JWT tokens signed with high-entropy secret, 7-day expiry.</li>
              <li>
                Gmail OAuth tokens stored securely in DB, never exposed to
                client.
              </li>
              <li>Account deletion requires strict re-verification.</li>
            </ul>
            <p className="mt-4 font-bold">Production Recommendation:</p>
            <p className="mt-1">
              Migrate SQLite to PostgreSQL, use HTTPS, and add rate-limiting for
              auth routes.
            </p>
          </section>

          {/* 11. Roadmap */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              11. Future Roadmap
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Vector database (FAISS/Weaviate) for deep agent memory context.
              </li>
              <li>Real-time websocket dashboards instead of polling.</li>
              <li>Chain-of-thought reasoning logs visible in Safe Mode.</li>
              <li>Docker containerisation.</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
