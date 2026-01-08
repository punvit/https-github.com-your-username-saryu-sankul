import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Reusing Navbar with a dark background wrapper or just letting it sit on top */}
            <div className="bg-black/90 relative h-[100px]">
                <Navbar />
            </div>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Privacy Policy</h1>
                <p className="text-gray-500 mb-8">Last Updated: January 2026</p>

                <div className="prose prose-lg text-gray-700 max-w-none space-y-8">
                    <p>
                        Your privacy is paramount to us. This policy explains how Saryu Sankul collects and handles your information when you use our website or visit our homestay.
                    </p>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Personal Details:</strong> Name, contact number, email address, and home address provided during booking.</li>
                            <li><strong>Identity Verification:</strong> As per local government regulations in Ayodhya, we require a copy of a government-issued ID (Aadhar, Passport, etc.) at the time of check-in.</li>
                            <li><strong>Payment Data:</strong> We do not store your credit/debit card details. All online payments are processed through secure, third-party encrypted gateways.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>To confirm and manage your reservations.</li>
                            <li>To comply with mandatory local police reporting (C-Form requirements for foreign guests).</li>
                            <li>To send you important stay-related updates or occasional promotional offers (which you can opt-out of at any time).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Protection</h2>
                        <p>
                            We implement a variety of security measures to maintain the safety of your personal information. We never sell, trade, or otherwise transfer your personally identifiable information to outside parties, except for trusted third parties who assist us in operating our website or servicing you, so long as those parties agree to keep this information confidential.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
