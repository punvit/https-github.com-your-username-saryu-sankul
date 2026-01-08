import Image from "next/image";

export function Accommodations() {
    return (
        <section id="rooms" className="mt-32 px-6 md:px-12 pb-20 max-w-7xl mx-auto scroll-mt-24">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Our Accommodations</h2>
                    <p className="text-gray-500 mt-2">Thoughtfully designed for your comfort</p>
                </div>
                <button className="text-gray-400 border-b border-gray-400 pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">View All Rooms</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group cursor-pointer">
                    <div className="overflow-hidden rounded-[2rem] mb-4 aspect-[4/5] relative">
                        <Image
                            src="/room-2.jpg"
                            alt="Luxury Double Bed"
                            fill
                            className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
                        />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Luxury Double Bed</h3>
                    <p className="text-gray-500">Starting from ₹1,800/night</p>
                </div>
                <div className="group cursor-pointer">
                    <div className="overflow-hidden rounded-[2rem] mb-4 aspect-[4/5] relative">
                        <Image
                            src="/room-3.jpg"
                            alt="Family Suite"
                            fill
                            className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
                        />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Family Suite</h3>
                    <p className="text-gray-500">Starting from ₹4,500/night</p>
                </div>
                <div className="group cursor-pointer">
                    <div className="overflow-hidden rounded-[2rem] mb-4 aspect-[4/5] relative">
                        <Image
                            src="/room-1.jpg"
                            alt="Deluxe Twin"
                            fill
                            className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
                        />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Deluxe Twin</h3>
                    <p className="text-gray-500">Starting from ₹1,500/night</p>
                </div>
            </div>
        </section>
    )
}
