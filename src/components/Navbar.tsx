import Link from "next/link";
import Image from "next/image";

export function Navbar() {
    return (
        <nav className="flex justify-between items-center px-6 md:px-12 py-4 bg-black/80 backdrop-blur-md fixed w-full z-50 text-white top-0 left-0 transition-all duration-300">
            <div className="relative w-40 h-16">
                <Image
                    src="/saryu-logo.png"
                    alt="Saryu Sankul"
                    fill
                    className="object-contain object-left"
                    priority
                />
            </div>
            <div className="space-x-8 hidden md:flex items-center">
                <Link href="/#rooms" className="hover:opacity-70 transition-opacity">Rooms</Link>
                <Link href="/#experience" className="hover:opacity-70 transition-opacity">Experience</Link>
                <Link href="/location" className="hover:opacity-70 transition-opacity">Location</Link>
                <Link href="/#booking-widget" className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">Book Now</Link>
            </div>
        </nav>
    )
}
