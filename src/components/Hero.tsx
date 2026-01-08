import { Navbar } from "./Navbar";
import { BookingWidget } from "./BookingWidget";

export function Hero() {
    return (
        <section id="experience" className="relative h-[85vh] min-h-[600px] flex items-center justify-center px-4">
            {/* Background with overlay */}
            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/saryu-hero-bg.png')" }}>
                <div className="absolute inset-0 bg-black/30 bg-gradient-to-b from-black/40 to-transparent"></div>
            </div>

            <Navbar />

            <div className="z-10 flex flex-col items-center w-full max-w-6xl mt-20">
                <div className="text-center text-white mb-20 md:mb-32">
                    <h1 className="text-5xl md:text-7xl font-semibold mb-6 leading-tight drop-shadow-lg">Your peaceful retreat <br /> in the heart of Ayodhya</h1>
                    <p className="text-lg md:text-xl opacity-90 font-light drop-shadow-md">Experience comfort, tradition, and serenity.</p>
                </div>

                <div id="booking-widget" className="absolute -bottom-12 w-full flex justify-center px-4 z-20">
                    <BookingWidget />
                </div>
            </div>
        </section>
    )
}
