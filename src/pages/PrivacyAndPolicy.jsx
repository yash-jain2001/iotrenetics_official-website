import React from 'react'

const PrivacyAndPolicy = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' }).toLowerCase()}, ${currentDate.getFullYear()}`;

  return (
    <div className="bg-gray-50 py-10 px-5 font-sans text-gray-800 leading-relaxed">
      <div className="max-w-[1200px] mx-auto rounded-3xl">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Privacy <span className="text-accent">Policy</span></h1>
          <p className="text-gray-500 font-medium">Last Updated: {formattedDate}</p>
        </div>

        <div className="space-y-8 text-lg">
          <p>
            IoTrenetics Solutions Pvt. Ltd. ("we", "our", or "us") operates the Finexa mobile application (the "Service"). This page informs users of our policies regarding the collection, use, and disclosure of personal information when using our Service.
          </p>
          <p>
            By using the Service, you agree to the collection and use of information in accordance with this policy.
          </p>

          <hr className="border-gray-200 my-10" />

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">1. Information We Collect</h2>
            <p className="mb-4">We may collect several types of information to provide and improve our Service.</p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Personal Information</h3>
            <p className="mb-3">While using Finexa, we may ask you to provide certain personally identifiable information, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Account login credentials</li>
              <li>Customer support communications</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Usage Data</h3>
            <p className="mb-3">We may automatically collect information about how the Service is accessed and used. This may include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Device type</li>
              <li>Operating system</li>
              <li>App version</li>
              <li>Usage statistics</li>
              <li>Crash reports</li>
              <li>Diagnostic information</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Payment Information</h3>
            <p>If you purchase subscriptions or digital products within the app, payments are processed through the Google Play Store. IoTrenetics Solutions Pvt. Ltd. does not collect or store your credit card or payment details. Payment information is securely handled by Google according to their policies.</p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">2. How We Use Your Information</h2>
            <p className="mb-3">We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain the Finexa application</li>
              <li>To manage user accounts</li>
              <li>To process subscriptions and in-app purchases</li>
              <li>To improve application performance and features</li>
              <li>To communicate with users</li>
              <li>To provide customer support</li>
              <li>To detect and prevent fraud or misuse</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">3. In-App Purchases and Subscriptions</h2>
            <p>Finexa may offer subscriptions or digital purchases. These transactions are processed through the Google Play Store. Subscription management, billing, and payment processing are handled by Google according to their own terms and privacy policies.</p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">4. Third-Party Services</h2>
            <p className="mb-3">Finexa may use third-party services that collect information to help provide and improve our Service. These services may include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Analytics services</li>
              <li>Cloud hosting providers</li>
              <li>Crash reporting tools</li>
              <li>Payment processing systems</li>
            </ul>
            <p>These third-party providers have access to personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for other purposes.</p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">5. Data Security</h2>
            <p>IoTrenetics Solutions Pvt. Ltd. values your trust in providing your personal information. We implement commercially reasonable security measures to protect your data. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">6. Data Retention</h2>
            <p>We retain personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law.</p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">7. Children's Privacy</h2>
            <p>Finexa is not directed toward children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to remove that information from our systems.</p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">8. Your Privacy Rights</h2>
            <p className="mb-3">Depending on your location and applicable laws, you may have rights regarding your personal data, including:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>The right to access your data</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to request deletion of your data</li>
              <li>The right to restrict or object to certain processing</li>
            </ul>
            <p>Requests related to privacy rights may be submitted through the contact information below.</p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-brand">9. Changes to This Privacy Policy</h2>
            <p className="mb-3">IoTrenetics Solutions Pvt. Ltd. may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.</p>
            <p>Users are encouraged to review this Privacy Policy periodically for any updates.</p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 10 */}
          <section className="">
            <h2 className="text-2xl font-bold mb-6 text-brand">10. Contact Us</h2>
            <p className="mb-4">If you have any questions about this Privacy Policy, you can contact us at:</p>
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

export default PrivacyAndPolicy