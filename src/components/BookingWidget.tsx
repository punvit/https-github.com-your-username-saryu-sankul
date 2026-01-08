"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export function BookingWidget() {
    const router = useRouter();
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

    // Guest State
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [isGuestOpen, setIsGuestOpen] = useState(false);

    // Derived Room Allocation (Greedy Algorithm)
    const allocateRooms = (totalAdults: number, totalChildren: number) => {
        let totalGuests = totalAdults + totalChildren;
        const rooms = [];

        // Rules: Family (Cap 6), Luxury (Cap 3), Deluxe (Cap 2)
        while (totalGuests > 0) {
            if (totalGuests >= 6) {
                rooms.push("Family Suite");
                totalGuests -= 6;
            } else if (totalGuests >= 3) {
                rooms.push("Luxury Double Bed");
                totalGuests -= 3;
            } else {
                rooms.push("Deluxe Twin");
                totalGuests -= 2;
            }
        }

        // Count occurrences
        const counts: Record<string, number> = {};
        rooms.forEach(r => counts[r] = (counts[r] || 0) + 1);

        // Format string
        const parts = [];
        if (counts["Family Suite"]) parts.push(`${counts["Family Suite"]} Family Suite`);
        if (counts["Luxury Double Bed"]) parts.push(`${counts["Luxury Double Bed"]} Luxury Double Bed`);
        if (counts["Deluxe Twin"]) parts.push(`${counts["Deluxe Twin"]} Deluxe Twin`);

        return parts.join(", ") || "1 Luxury Double Bed";
    };

    const roomType = allocateRooms(adults, children);
    const guestsSummary = `${adults} Adults, ${children} Children`;

    const handleSearch = () => {
        const params = new URLSearchParams({
            checkIn,
            checkOut,
            guests: guestsSummary,
            roomType
        });
        router.push(`/booking?${params.toString()}`);
    };

    return (
        <div className="bg-white p-4 shadow-xl rounded-[2rem] flex flex-col md:flex-row gap-4 w-full max-w-5xl border border-gray-100 relative">
            <div className="flex-1 px-4 py-2 border-r border-gray-100 last:border-0 md:last:border-0">
                <p className="text-xs uppercase text-gray-500 font-bold mb-1">Check In</p>
                <input
                    type="date"
                    className="w-full outline-none text-gray-700 bg-transparent"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                />
            </div>
            <div className="flex-1 px-4 py-2 border-r border-gray-100 last:border-0 md:last:border-0">
                <p className="text-xs uppercase text-gray-500 font-bold mb-1">Check Out</p>
                <input
                    type="date"
                    className="w-full outline-none text-gray-700 bg-transparent"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                />
            </div>

            {/* Guest Selection Popover */}
            <div className="flex-1 px-4 py-2 border-r border-gray-100 last:border-0 md:last:border-0 relative">
                <p className="text-xs uppercase text-gray-500 font-bold mb-1">Guests</p>
                <button
                    onClick={() => setIsGuestOpen(!isGuestOpen)}
                    className="w-full text-left outline-none text-gray-700 bg-transparent flex justify-between items-center"
                >
                    <span className="truncate">{guestsSummary}</span>
                    <svg className={`w-4 h-4 transition-transform ${isGuestOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>

                {isGuestOpen && (
                    <div className="absolute top-full left-0 mt-4 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="font-bold text-gray-800">Adults</p>
                                <p className="text-xs text-gray-400">Ages 13 or above</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setAdults(Math.max(1, adults - 1))}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#B89470] hover:text-[#B89470]"
                                >-</button>
                                <span className="w-4 text-center font-medium">{adults}</span>
                                <button
                                    onClick={() => setAdults(adults + 1)}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#B89470] hover:text-[#B89470]"
                                >+</button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-gray-800">Children</p>
                                <p className="text-xs text-gray-400">Ages 2-12</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setChildren(Math.max(0, children - 1))}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#B89470] hover:text-[#B89470]"
                                >-</button>
                                <span className="w-4 text-center font-medium">{children}</span>
                                <button
                                    onClick={() => setChildren(children + 1)}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#B89470] hover:text-[#B89470]"
                                >+</button>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t text-right">
                            <button onClick={() => setIsGuestOpen(false)} className="text-[#B89470] font-bold text-sm">Done</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Read-Only Room Type (Auto Calculated) */}
            <div className="flex-1 px-4 py-2 border-r border-gray-100 last:border-0 md:last:border-0 bg-gray-50/50 rounded-r-[2rem] md:rounded-none">
                <p className="text-xs uppercase text-gray-400 font-bold mb-1">Room Recommendation</p>
                <div className="w-full text-gray-500 truncate text-sm py-1" title={roomType}>
                    {roomType}
                </div>
            </div>

            <button
                onClick={handleSearch}
                className="bg-[#B89470] text-white px-10 py-4 rounded-[2rem] font-semibold hover:bg-[#a38363] transition shrink-0"
            >
                Check
            </button>
        </div>
    )
}
