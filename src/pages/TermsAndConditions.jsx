import React from 'react'

const TermsAndConditions = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' }).toLowerCase()}, ${currentDate.getFullYear()}`;

  return (
    <div className="bg-gray-50 py-10 px-5 font-sans text-gray-800 leading-relaxed">
      <div className="max-w-[1200px] mx-auto rounded-3xl">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4"><span className="text-accent">Terms </span>&<span className="text-accent"> Conditions</span></h1>
          <p className="text-gray-500 font-medium">Last Updated: {formattedDate}</p>
        </div>

        <div className="space-y-8 text-lg">
          <p>
            These Terms and Conditions ("Terms") govern your use of the Finexa mobile application and all services provided by IoTrenetics Solutions Pvt. Ltd. ("Company", "we", "our", or "us").
          </p>
          <p>
            By accessing or using our services, you agree to these Terms.
          </p>

          <hr className="border-gray-200 my-10" />

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">1. Company Information</h2>
            <ul className="space-y-2">
              <li><strong>Company:</strong> IoTrenetics Solutions Pvt. Ltd.</li>
              <li><strong>Website:</strong> <a href="https://www.iotrenetics.com" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-brand transition-colors">https://www.iotrenetics.com</a></li>
              <li><strong>Jurisdiction:</strong> India</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">2. Nature of Services</h2>
            <p className="mb-3">We provide digital technology services including:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Mobile applications (e.g., Finexa)</li>
              <li>AI-driven analytics and insights</li>
              <li>IoT-based and data-driven platforms</li>
              <li>SaaS and automation tools</li>
            </ul>
            <p>All services are provided digitally.</p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">3. Eligibility</h2>
            <p className="mb-3">You must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be at least 18 years old</li>
              <li>Use the service legally</li>
              <li>Provide accurate information</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">4. Account Responsibility</h2>
            <p className="mb-3">You are responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your account credentials</li>
              <li>All activities under your account</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">5. Subscriptions, Billing & Payments</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Payments are processed via the Google Play Store</li>
              <li>Subscriptions are auto-renewing unless cancelled</li>
              <li>You may cancel anytime via your Google Play account</li>
              <li>Charges are billed in advance</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Refund Policy</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>All purchases are subject to Google Play refund policies</li>
              <li>We do not directly process refunds</li>
              <li>Refund requests must be made through Google Play</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">6. No Financial, Investment, or Medical Advice</h2>
            <p className="mb-3">Finexa provides informational and analytical insights only.</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>It does NOT provide financial, investment, or medical advice</li>
              <li>No guarantees of accuracy or outcomes are made</li>
              <li>Users are solely responsible for decisions</li>
            </ul>
            <p className="font-medium">Use of the service is at your own risk.</p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">7. AI and Data Disclaimer</h2>
            <p className="mb-3">Our services may use AI and automated systems:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Outputs may be incomplete or inaccurate</li>
              <li>Results should not be solely relied upon</li>
              <li>Independent verification is required</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">8. Acceptable Use</h2>
            <p className="mb-3">You agree NOT to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the service unlawfully</li>
              <li>Reverse engineer or exploit systems</li>
              <li>Distribute harmful or malicious content</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">9. Intellectual Property</h2>
            <p className="mb-3">All rights to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Software</li>
              <li>Content</li>
              <li>Designs</li>
              <li>AI models</li>
            </ul>
            <p>are owned by IoTrenetics Solutions Pvt. Ltd.<br/><strong>Unauthorized use is prohibited.</strong></p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">10. Third-Party Services</h2>
            <p className="mb-3">We may rely on third-party services including:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Google Play billing</li>
              <li>Cloud services</li>
              <li>Analytics providers</li>
            </ul>
            <p>We are not responsible for third-party systems.</p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">11. Service Availability</h2>
            <p className="mb-3">We do not guarantee:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>uninterrupted service</li>
              <li>error-free operation</li>
            </ul>
            <p>Services may be modified or discontinued at any time.</p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">12. Limitation of Liability</h2>
            <p className="mb-3">To the maximum extent permitted by law:<br/>IoTrenetics Solutions Pvt. Ltd. shall not be liable for:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>financial losses</li>
              <li>business interruption</li>
              <li>data loss</li>
              <li>indirect or consequential damages</li>
            </ul>
            <p>Total liability shall not exceed the amount paid by the user (if any).</p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">13. Indemnification</h2>
            <p className="mb-3">You agree to indemnify and hold harmless the Company from claims arising from:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>misuse of services</li>
              <li>violation of these Terms</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 14 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">14. Termination</h2>
            <p className="mb-3">We may suspend or terminate access if:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Terms are violated</li>
              <li>fraudulent or suspicious activity is detected</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 15 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">15. Force Majeure</h2>
            <p className="mb-3">We are not liable for failure or delay caused by events beyond our control, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>natural disasters</li>
              <li>internet failures</li>
              <li>government actions</li>
              <li>system outages</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 16 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">16. Governing Law</h2>
            <p>These Terms are governed by the laws of India.</p>
            <p className="font-bold mt-2">Jurisdiction: Delhi, India</p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 17 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">17. Changes to Terms</h2>
            <p className="mb-2">We may update these Terms at any time.</p>
            <p>Continued use constitutes acceptance.</p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 18 */}
          <section className="">
            <h2 className="text-2xl font-bold mb-6 text-brand">18. Contact</h2>
            <ul className="space-y-3 font-medium">
              <li><span className="text-gray-500 w-24 inline-block font-normal">Company:</span> IoTrenetics Solutions Pvt. Ltd.</li>
              <li><span className="text-gray-500 w-24 inline-block font-normal">Email:</span> <a href="mailto:support@iotrenetics.com" className="text-accent underline hover:text-brand transition-colors">support@iotrenetics.com</a></li>
              <li><span className="text-gray-500 w-24 inline-block font-normal">Website:</span> <a href="https://www.iotrenetics.com" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-brand transition-colors">https://www.iotrenetics.com</a></li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  )
}

export default TermsAndConditions