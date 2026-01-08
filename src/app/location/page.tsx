import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Navigation } from "lucide-react";

export default function LocationPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="bg-black/90 relative h-[100px]">
                <Navbar />
            </div>

            <main className="flex-grow">
                <section className="max-w-7xl mx-auto px-6 py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">How to Reach Us</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Located near the serene Laxman Ghat, Saryu Sankul offers a peaceful stay just steps away from the holy Saryu River and close to major temples.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Address & Info */}
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <MapPin className="text-orange-600" />
                                    Address
                                </h3>
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    <strong>Saryu Sankul</strong><br />
                                    20/3/30, Laxman Ghat,<br />
                                    near Adgada,<br />
                                    Ayodhya, Uttar Pradesh 224123
                                </p>
                                <a
                                    href="https://maps.app.goo.gl/8Jjy1ADsMBrwyC9F7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-700 transition shadow-lg shadow-orange-200"
                                >
                                    <Navigation size={18} />
                                    Get Directions
                                </a>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold mb-4">Distances</h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex justify-between border-b border-gray-100 pb-2 last:border-0">
                                        <span>Saryu River</span>
                                        <span className="font-medium text-gray-900">100 m</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-2 last:border-0">
                                        <span>Hanuman Garhi</span>
                                        <span className="font-medium text-gray-900">1.0 km</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-2 last:border-0">
                                        <span>Ram Mandir</span>
                                        <span className="font-medium text-gray-900">1.5 km</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-2 last:border-0">
                                        <span>Ayodhya Dham Station</span>
                                        <span className="font-medium text-gray-900">2.0 km</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-2 last:border-0">
                                        <span>Maharishi Valmiki Airport</span>
                                        <span className="font-medium text-gray-900">12.5 km</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Map Embed */}
                        <div className="h-[500px] w-full bg-gray-200 rounded-2xl overflow-hidden shadow-lg relative lg:sticky lg:top-32">
                            <iframe
                                src="https://maps.google.com/maps?q=Saryu%20Sankul%20Ayodhya%20Uttar%20Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Saryu Sankul Location Map"
                            ></iframe>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
