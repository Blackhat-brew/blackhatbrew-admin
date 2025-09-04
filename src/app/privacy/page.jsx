import React from 'react'
import { Metadata } from 'next'

export const metadata = {
  title: "Privacy & Policy | Black Hat Brew",
  description: "Stay updated with cutting-edge cybersecurity insights, tips, and industry trends to safeguard your business.",
  keywords: ['cybersecurity', 'privacy policy', 'data protection', 'business security', 'industry trends'], // Add relevant keywords (or dynamically fetch from blog tags)
  openGraph: {
    title: "Privacy & Policy | Black Hat Brew",
    description: "Stay updated with cutting-edge cybersecurity insights, tips, and industry trends to safeguard your business.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/privacy`, // Update with your actual blogs URL
    type: "website",
  },
  authors: [{ name: "Black Hat Brew Team" }],
  robots: {
    index: false,
    follow: true
  }
}


const page = () => {
  return (
    <>  <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-600 mb-6">Effective Date: 01/01/2025</p>

      <h2 className="text-xl font-semibold mb-2">Who We Are</h2>
      <p className="mb-4">Black Hat Brew (referred to as “we,” “our,” or “us”) is a cybersecurity consultation firm specializing in penetration testing, red team operations, vulnerability assessments, and other related services. Our website address is <a href="https://RedHatBrew.com" className="text-blue-500 hover:underline">https://RedHatBrew.com</a>.</p>

      <h2 className="text-xl font-semibold mb-2">Personal Information Collection</h2>
      <p className="mb-4">We may collect personal identification information in various ways, including when users:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Fill out contact forms or request services.</li>
        <li>Subscribe to newsletters or updates.</li>
        <li>Engage in consultations or training sessions.</li>
        <li>Interact with other activities, features, or resources we make available.</li>
      </ul>
      <p className="mb-4">Visitors may browse our website anonymously, but personal identification information will only be collected if voluntarily provided.</p>

      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      <p className="mb-4">When Visitors leave comments on our site, we collect the data provided in the comment form, the Visitor’s IP address, and browser user agent string to assist in spam detection.</p>

      <h2 className="text-xl font-semibold mb-2">Media</h2>
      <p className="mb-4">If users upload images to our website, they should avoid embedding location data (EXIF GPS). Visitors can download and extract location data from uploaded images.</p>

      <h2 className="text-xl font-semibold mb-2">Cookies</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Comments:</strong> When leaving a comment, users can opt-in to save their name, email, and website in cookies for convenience. These cookies last for one year.</li>
        <li><strong>Login:</strong> If you visit the login page, we set a temporary cookie to determine if your browser accepts cookies. These cookies contain no personal data and are discarded when you close your browser.</li>
        <li><strong>Logged-In Users:</strong> Login cookies are stored for two days, and display preference cookies are stored for one year. Selecting “Remember Me” extends login persistence to two weeks.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Embedded Content from Other Websites</h2>
      <p className="mb-4">Articles on our website may include embedded content (e.g., videos, images). Embedded content from other websites behaves as if the Visitor has accessed the external site, which may collect data, use cookies, and track interactions.</p>

      <h2 className="text-xl font-semibold mb-2">How We Use Collected Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>To Improve Customer Service:</strong> Information helps us respond to inquiries and support requests more effectively.</li>
        <li><strong>To Personalize User Experience:</strong> Aggregated information helps us understand how users interact with our services.</li>
        <li><strong>To Send Updates:</strong> Email addresses may be used to send information related to inquiries, services, or company updates.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Who We Share Your Data With</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Service Providers:</strong> Trusted third parties for data storage, payment processing, and advertising.</li>
        <li><strong>Legal Compliance:</strong> To comply with legal obligations or protect our rights and the safety of users.</li>
        <li><strong>Change in Control:</strong> In case of mergers, acquisitions, or sale of assets.</li>
        <li><strong>With Your Consent:</strong> When directed or authorized by you.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">How Long We Retain Your Data</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Comments:</strong> Retained indefinitely, along with metadata, for moderation purposes.</li>
        <li><strong>Registered Users:</strong> Personal data provided in profiles is retained as long as the account is active. Users can view, edit, or delete their data, except for usernames. Administrators can also access this information.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Legal Bases for Collecting and Using Information</h2>
      <p className="mb-4">For users in the EU, our legal grounds for processing your data include:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Fulfilling our commitments under terms of service or agreements.</li>
        <li>Complying with legal obligations.</li>
        <li>Protecting vital interests.</li>
        <li>Pursuing legitimate interests, such as improving our services and ensuring security.</li>
        <li>Obtaining user consent where required.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Your Rights Over Your Data</h2>
      <p className="mb-4">Users can request:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>An export of personal data we hold.</li>
        <li>Deletion of personal data, except for information retained for legal, administrative, or security purposes.</li>
      </ul>
      <p className="mb-4">To exercise these rights, contact us at <a href="mailto:support@RedHatBrew.com" className="text-blue-500 hover:underline">support@RedHatBrew.com</a>. We respond within 30 days.</p>

      <h2 className="text-xl font-semibold mb-2">Where We Send Your Data</h2>
      <p className="mb-4">Visitor comments may be checked through automated spam detection services.</p>

      <h2 className="text-xl font-semibold mb-2">Third-Party Websites</h2>
      <p className="mb-4">Our website may link to third-party services, advertisers, and content. We are not responsible for the privacy practices of external sites.</p>

      <h2 className="text-xl font-semibold mb-2">Changes to This Privacy Policy</h2>
      <p className="mb-4">Black Hat Brew reserves the right to update this Privacy Policy at any time. Users are encouraged to review this page periodically. Continued use of our services signifies acceptance of any changes.</p>

      <h2 className="text-xl font-semibold mb-2">Exceptions</h2>
      <p className="mb-4">Requests for exceptions to this policy must be approved by the company’s management.</p>

      <h2 className="text-xl font-semibold mb-2">Violations & Enforcement</h2>
      <p className="mb-4">Violations of this policy should be reported to management. Violations may result in disciplinary action, including termination of services or employment.</p>

      <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
      <p className="mb-4">For questions or concerns about this Privacy Policy, please contact us at:</p>
      <ul className="list-disc pl-6">
        <li>Email: <a href="mailto:support@RedHatBrew.com" className="text-blue-500 hover:underline">support@RedHatBrew.com</a></li>
        <li>Website: <a href="https://RedHatBrew.com" className="text-blue-500 hover:underline">https://RedHatBrew.com</a></li>
      </ul>
    </div></>
  );
};



export default page