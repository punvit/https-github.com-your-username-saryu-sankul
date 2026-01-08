import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
    return (
        <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-12">

                {/* Logo & About */}
                <div className="col-span-1 md:col-span-1">
                    <div className="relative w-40 h-16 mb-4 bg-white/10 p-2 rounded">
                        {/* Using existing transparent logo */}
                        <Image
                            src="/saryu-logo.png"
                            alt="Saryu Sankul"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Experience the spiritual essence of Ayodhya at Saryu Sankul, your peaceful retreat near the holy Saryu River.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                        <li><Link href="/#rooms" className="hover:text-white transition">Our Accommodations</Link></li>
                        <li><Link href="/location" className="hover:text-white transition">How to Reach</Link></li>
                    </ul>
                </div>

                {/* Policies */}
                <div>
                    <h4 className="text-lg font-semibold mb-6">Policies</h4>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li><Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
                        <li><Link href="/cancellation-policy" className="hover:text-white transition">Cancellation Policy</Link></li>
                        {/* <li><Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link></li> */}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li className="flex items-start gap-3">
                            <span className="text-gray-200">📍</span>
                            <span>20/3/30, Laxman Ghat, near Adgada, Ayodhya, UP 224123</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-gray-200">📞</span>
                            <a href="tel:+918375879752" className="hover:text-white">+91-8375879752</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-gray-200">✉️</span>
                            <a href="mailto:info@saryusankul.in" className="hover:text-white">info@saryusankul.in</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="text-center mt-8 text-gray-500 text-xs">
                <p>© {new Date().getFullYear()} Saryu Sankul Homestay. All rights reserved.</p>
            </div>
        </footer>
    );
};
