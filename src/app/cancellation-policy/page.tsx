import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CancellationPolicy() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-black/90 relative h-[100px]">
                <Navbar />
            </div>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Cancellation & Refund Policy</h1>
                <p className="text-gray-500 mb-8">Last Updated: January 2026</p>

                <div className="prose prose-lg text-gray-700 max-w-none space-y-8">
                    <p>
                        At Saryu Sankul, we understand that plans can change. However, as a boutique homestay with limited rooms, cancellations significantly impact our operations. Our policy is as follows:
                    </p>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancellation Timeline</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Full Refund:</strong> Cancellations made 7 days or more prior to the scheduled check-in date will receive a 100% refund (minus any bank processing fees).</li>
                            <li><strong>Partial Refund:</strong> Cancellations made between 3 to 7 days prior to check-in will be eligible for a 50% refund of the total booking amount.</li>
                            <li><strong>No Refund:</strong> Cancellations made less than 72 hours before the check-in date, or in the case of a "No-Show", are non-refundable.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Modification of Booking</h2>
                        <p>
                            If you wish to change your stay dates, please contact us at <a href="tel:+918375879752" className="text-blue-600 hover:underline">+91-8375879752</a>. Date changes are subject to room availability and may involve a rate difference.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Process</h2>
                        <p>
                            Approved refunds will be processed within 5-7 business days via the original payment method or bank transfer.
                        </p>
                    </section>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
                        <p className="font-medium text-yellow-800">
                            <strong>Note:</strong> Special policies may apply during peak festival dates (like Deepotsav or Ram Navami).
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
