import React from "react";

const FinexoArticle = () => {
  return (
    <div className="pt-2 pb-2 min-h-screen bg-slate-50 font-sans">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-14 mb-1 transition-all hover:shadow-md relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-bold text-emerald-600 uppercase tracking-widest mb-6 border border-emerald-100 bg-emerald-50/50 inline-flex px-4 py-1.5 rounded-full">
              <span>Android</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>iOS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Web</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
              finexo
            </h1>
            <p className="text-2xl md:text-3xl text-emerald-600 font-bold leading-relaxed mb-4">
              Your Money. Your Voice. Your Control.
            </p>
            <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8 max-w-2xl">
              The AI-powered personal finance app built for the way you actually
              live.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500 bg-slate-50 inline-flex px-6 py-3 rounded-2xl border border-slate-100">
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 11V9h2v2H9z" />
                </svg>
                Coming Soon on Google Play & App Store
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="flex items-center gap-2">Made in Bharat 🇮🇳</span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <article className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-14">
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight border-b pb-4">
              What Is finexo?
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Most people do not have a money problem. They have a visibility
              problem. Income comes in, expenses go out, and somewhere in
              between — without any clear record of where it went — the month
              ends with less than expected. Budgets get made and abandoned.
              Saving intentions stay intentions. The financial picture is always
              slightly blurry.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              finexo is a personal finance app built to fix exactly that — not
              by adding another spreadsheet to manage, but by making financial
              tracking so fast, so frictionless, and so intelligent that it
              actually fits into everyday life. Built in India, designed for how
              real people spend and save, finexo combines voice-powered
              transaction entry, AI-driven categorisation, smart budgeting, and
              actionable analytics into a single app that works on Android, iOS,
              and the web.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed font-semibold">
              It does not require you to change how you manage money. It meets
              you where you are — and then quietly makes you much better at it.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight border-b pb-4">
              The Problem With Every Other Finance App
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Personal finance apps have been around for over a decade. Most
              people have downloaded at least one. Most people have also stopped
              using it within a month. The reason is almost always the same:
              logging transactions manually is a chore, the interface demands
              too much attention, and the insights produced are generic enough
              to be useless.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              The existing options fall into two categories. Consumer apps are
              simple but shallow — they track spending without explaining it,
              and provide charts without context. Enterprise-grade tools are
              powerful but built for accountants, not individuals. Neither
              category was designed for someone who paid for chai by UPI, split
              a dinner bill, reimbursed a colleague in cash, and made an
              international transfer — all in the same week.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              finexo was built for that person. Which is to say, it was built
              for everyone.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight border-b pb-4">
              How finexo Works: Designed for Real Life
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 text-emerald-600">
                  Just Speak It
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  The fastest way to log a transaction in finexo is to say it
                  out loud. Tap the microphone and say something like 'paid 450
                  for groceries by UPI' or 'received 15,000 salary' — and finexo
                  does the rest. Speech recognition captures the input, natural
                  language processing extracts the amount, category, and payment
                  mode, and the transaction is logged in under three seconds.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  No forms. No dropdowns. No friction. For anyone who has ever
                  forgotten to log a purchase because the entry screen was too
                  many taps away, this changes everything.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Prefer typing? The keyboard input mode works identically —
                  same intelligence, same speed, just typed rather than spoken.
                  And if you are in a meeting, on a flight, or somewhere without
                  internet access, finexo's offline mode lets you log
                  transactions in text that sync automatically when connectivity
                  returns.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 text-emerald-600">
                  It Learns How You Spend
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  finexo's category detection does not rely on a static list of
                  rules. It uses natural language processing to understand
                  transaction descriptions intelligently, and a machine learning
                  model that studies your personal patterns over time. If you
                  consistently label a particular merchant as 'work lunch',
                  finexo learns that and applies it automatically. The more you
                  use it, the more accurate it becomes — adapting to your
                  vocabulary, your habits, and your categories.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  The result is an app that requires progressively less effort
                  from you as it accumulates context. Early in your usage, you
                  might correct a category occasionally. After a few weeks, you
                  rarely need to.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 text-emerald-600">
                  Every Transaction, Fully Tracked
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Each transaction in finexo captures everything that matters:
                  amount, type (debit or credit), category, payment mode — UPI,
                  cash, card, bank transfer, or any custom mode — currency,
                  date, and an optional note. Multi-currency support with live
                  exchange rates means finexo works equally well for
                  international travel, foreign income, or cross-border
                  payments.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Transactions can be searched, filtered, edited, copied, and
                  deleted at any time. For users with large transaction
                  histories, pagination keeps the experience fast and navigable.
                  Nothing gets lost, and nothing is locked in.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight border-b pb-4">
              What finexo Does: A Complete Feature Overview
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 transition-all hover:bg-emerald-50">
                <h3 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  Smart Budgeting That Actually Works
                </h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  finexo's budget system is built around the reality that
                  different spending categories need different time horizons.
                  You can set daily, weekly, or monthly spending limits for any
                  category — and finexo tracks progress against each limit in
                  real time with visual progress bars.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Where most budget apps send a single alert when you hit your
                  limit — by which point it is already too late — finexo sends
                  smart push notifications at four progressive thresholds: 75%,
                  90%, 95%, and 99% of each budget consumed.
                </p>
              </div>

              <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 transition-all hover:bg-emerald-50">
                <h3 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Analytics That Tell You Something Useful
                </h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  finexo's analytics engine translates transaction data into
                  financial insight across multiple dimensions. Pie charts break
                  spending down by category. Bar and line charts show trends
                  over time. Area charts visualise balance movements.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Balance trend tracking provides a running picture of your
                  financial position over time — not just a snapshot, but a
                  narrative. For Premium users, the financial health score
                  synthesises spending patterns into a single meaningful
                  indicator.
                </p>
              </div>

              <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 transition-all hover:bg-emerald-50">
                <h3 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Reports You Can Actually Use
                </h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  When you need your financial data in a format that works
                  outside the app, finexo's reporting tools deliver. Export to
                  Excel, generate PDF or HTML reports for sharing or filing, and
                  define custom date ranges.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Scheduled report reminders via push notifications mean you
                  never miss a monthly review. Import from Excel is also
                  supported, making it straightforward to migrate historical
                  data picked up where you left off.
                </p>
              </div>

              <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 transition-all hover:bg-emerald-50">
                <h3 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  A Better Way to Group Expense
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Splitting expenses in a group is consistently painful.
                  finexo's Group Mode eliminates all of that. Create an expense
                  group for any occasion, log shared transactions in a
                  WhatsApp-style chat interface, and let finexo calculate
                  per-person splits automatically. Everyone sees exactly what
                  was spent, what they owe, and what they are owed.
                </p>
              </div>

              <div className="md:col-span-2 bg-slate-900 text-white rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-slate-800 p-4 rounded-xl flex-shrink-0">
                  <svg
                    className="w-10 h-10 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">
                    Security Built Around Your Privacy
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Financial data is among the most sensitive information a
                    person generates. Account access is secured through
                    Firebase-authenticated email and password login with
                    mandatory email verification. On supported devices,
                    biometric login provides fast, secure access. For public
                    use, finexo includes a privacy mode that disables voice
                    input and masks all figures with a single tap.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight border-b pb-4">
              finexo Premium: For Serious Financial Clarity
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              finexo's core features are available to all users, free of charge.
              Premium unlocks the capabilities designed for users who want a
              deeper, more analytical relationship with their finances.
              Available via Google Play as a monthly subscription or a one-time
              lifetime purchase, Premium includes:
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-transparent border border-emerald-100/50">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <strong className="text-slate-900">
                    Financial Health Score
                  </strong>{" "}
                  — A composite score that synthesises your spending patterns,
                  saving rate, and budget adherence into a single indicator —
                  giving you an honest, data-backed assessment of your financial
                  habits rather than a vague sense of whether things are going
                  well or badly.
                </div>
              </li>
              <li className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-transparent border border-emerald-100/50">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <strong className="text-slate-900">Spending Insights</strong>{" "}
                  — AI-generated observations about your financial behaviour:
                  where spending is trending up, which categories are consuming
                  a disproportionate share of income, where there are
                  opportunities to save, and what your patterns suggest about
                  the month ahead.
                </div>
              </li>
              <li className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-transparent border border-emerald-100/50">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <strong className="text-slate-900">Group Mode</strong> — Full
                  access to shared expense groups with per-person splitting,
                  group transaction management, and the WhatsApp-style group
                  chat interface — the complete solution for shared finances.
                </div>
              </li>
            </ul>

            <p className="text-lg text-slate-700 leading-relaxed italic border-l-4 border-slate-200 pl-4 py-1">
              Premium access can also be earned without paying. finexo's
              referral programme rewards users with free Premium months for
              every friend they bring to the app — making the upgrade accessible
              to anyone willing to share something they find genuinely useful.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight border-b pb-4">
              Why finexo Is Different: The FinTech Gap It Fills
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              The personal finance app market is large and well-funded, yet the
              problem of consistent, intelligent financial tracking remains
              largely unsolved for the average person. The reason is that most
              apps were designed to impress rather than to embed — built to win
              a product review, not to survive a busy Tuesday.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              finexo was designed around a different question: what would it
              take for someone to actually use this every day, for years? The
              answers shaped every product decision.
            </p>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-lg mb-2">
                  Voice-first entry is not a novelty — it is a necessity
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  The single biggest barrier to consistent expense tracking is
                  the time cost of manual entry. A payment made by UPI takes two
                  seconds. Logging it in a traditional app takes thirty. That
                  gap is where financial tracking habits die. Voice entry
                  collapses that gap to near zero. It is the most significant UX
                  innovation in personal finance that most apps have not built.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-lg mb-2">
                  AI that learns you, not just categories
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  Generic categorisation engines apply the same logic to every
                  user. finexo's ML layer learns from your specific patterns —
                  your vocabulary, your merchants, your habits. Over time it
                  becomes a system that knows how you spend, which means it
                  requires less from you while delivering more accuracy.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-lg mb-2">
                  Built for the Indian financial reality
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  UPI is the dominant payment rail for hundreds of millions of
                  people. Cash remains widely used. Multi-currency needs are
                  growing as more Indians work internationally or travel
                  frequently. finexo was built with these realities at the
                  centre, not adapted from a product designed for a different
                  market.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-lg mb-2">
                  Offline-first reliability
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  In a country where connectivity is not always guaranteed, an
                  app that stops working without internet is an app that cannot
                  be relied upon. finexo's offline mode ensures that
                  transactions can always be logged — syncing when connectivity
                  returns.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-lg mb-2">
                  One app for your entire financial picture
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  Personal spending, shared group expenses, budgets, reports,
                  multi-currency transactions, analytics, and health scoring —
                  finexo covers the full scope of personal and small-group
                  financial management in a single, cohesive application.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight border-b pb-4">
              finexo in Everyday Life: Who It Is For
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              finexo is not a niche tool for financial enthusiasts. It is a
              practical daily utility for anyone who earns, spends, saves, or
              shares expenses — which is to say, everyone.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-emerald-600 text-lg mb-1">
                  Students and young professionals
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  Managing a first salary, splitting rent, tracking
                  subscriptions, and building saving habits for the first time —
                  finexo provides the structure and intelligence that turns
                  financial awareness into financial discipline, without
                  requiring any prior knowledge of personal finance management.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-emerald-600 text-lg mb-1">
                  Working professionals and dual-income households
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  Complex monthly finances with multiple income sources, varied
                  expenses, and shared household costs benefit enormously from
                  finexo's categorisation intelligence, budget tracking, and
                  group expense capabilities. Monthly reporting makes tax season
                  significantly less painful.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-emerald-600 text-lg mb-1">
                  Frequent travellers and international spenders
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  Multi-currency support with live exchange rates means every
                  transaction — whether made in INR, USD, AED, or any other
                  currency — is tracked accurately and consistently. finexo
                  converts, records, and reports across currencies without
                  requiring any manual conversion work.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-emerald-600 text-lg mb-1">
                  Anyone who has ever wondered where their money went
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  This is, ultimately, the broadest and most important use case.
                  finexo's balance trend tracking, category breakdowns, and
                  financial health score give every user a clear, honest,
                  data-backed answer to the question that most people ask
                  themselves at the end of every month — and never quite manage
                  to answer.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight border-b pb-4">
              The Future of Personal Finance Is Intelligent
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Financial literacy is often discussed as a knowledge problem — as
              if people would manage their money better if they simply
              understood it more. In reality, for most people, it is a
              visibility and friction problem. They do not lack understanding.
              They lack a tool that makes tracking effortless, insight
              automatic, and action obvious.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              finexo is that tool. Voice entry that takes three seconds. AI that
              learns your patterns and handles categorisation for you. Budgets
              that warn you before you overspend. Analytics that explain your
              financial behaviour rather than just displaying it. Group expense
              management that eliminates the awkward calculations. Reports that
              are ready when you need them.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-4 font-semibold text-emerald-700">
              It is the personal finance app that takes less from you as it
              gives you more — growing more accurate, more useful, and more
              attuned to your specific financial life with every transaction you
              log.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              finexo is launching soon on Google Play and the App Store. Whether
              you have been looking for a better way to track your spending,
              finally want to make a budget that sticks, or just want to stop
              wondering where your salary went — this is the app built for
              exactly that.
            </p>

            <div className="bg-emerald-50 rounded-2xl p-6 text-center border border-emerald-100">
              <p className="text-lg text-emerald-800 font-medium italic">
                Your money deserves better than a spreadsheet. finexo is the
                intelligent, voice-powered personal finance companion built for
                the way you actually live — designed in India, built for the
                world.
              </p>
            </div>
          </section>

          {/* Footer Card */}
          <div className="bg-emerald-900 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-emerald-500 opacity-20 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-teal-500 opacity-20 blur-2xl"></div>

            <h3 className="text-3xl font-extrabold mb-2 tracking-tight">
              finexo
            </h3>
            <p className="text-emerald-300 text-lg mb-6 font-medium">
              Your Money. Your Voice. Your Control.
            </p>

            <div className="bg-white/10 border border-white/20 rounded-xl py-3 px-6 inline-flex flex-wrap justify-center gap-4 mb-8 text-sm font-medium">
              <span>Android, iOS & Web</span>
              <span className="opacity-50">•</span>
              <span>Available soon on Google Play & App Store</span>
              <span className="opacity-50">•</span>
              <span>Made in Bharat 🇮🇳</span>
            </div>

            <p className="text-xl font-semibold">
              Download finexo — and finally know where your money goes.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default FinexoArticle;
