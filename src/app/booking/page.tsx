"use client"

import { useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"
import { Navbar } from "@/components/Navbar"
import { supabase } from "@/lib/supabase"

function BookingContent() {
    const searchParams = useSearchParams()
    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')
    const guests = searchParams.get('guests')
    const roomType = searchParams.get('roomType') || "Luxury Double Bed"

    const [step, setStep] = useState(1); // 1: Review, 2: Details, 3: Payment, 4: Success
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    })
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pricing Logic
    const roomPrices: Record<string, number> = {
        "Luxury Double Bed": 1800,
        "Family Suite": 4500,
        "Deluxe Twin": 1500
    };

    // Parse logic: "1 Family Suite, 2 Luxury Double Bed"
    // Default to fallback if parsing fails
    let calculatedPrice = 0;
    if (roomType.includes(',')) {
        // Complex case
        const parts = roomType.split(', ');
        parts.forEach(part => {
            // part like "1 Family Suite" or "2 Luxury Double Bed"
            const firstSpaceIndex = part.indexOf(' ');
            if (firstSpaceIndex !== -1) {
                const count = parseInt(part.substring(0, firstSpaceIndex));
                const type = part.substring(firstSpaceIndex + 1);
                if (roomPrices[type]) {
                    calculatedPrice += (count * roomPrices[type]);
                }
            }
        });
    } else {
        // Single case "Luxury Double Bed" or maybe just "1 Luxury Double Bed" check
        // Ideally the widget always sends "1 RoomName" format now, but fallback:
        // Try parsing "1 RoomName" style first
        const firstSpaceIndex = roomType.indexOf(' ');
        if (firstSpaceIndex !== -1 && !isNaN(parseInt(roomType.substring(0, firstSpaceIndex)))) {
            const count = parseInt(roomType.substring(0, firstSpaceIndex));
            const type = roomType.substring(firstSpaceIndex + 1);
            calculatedPrice = (count * (roomPrices[type] || 0));
        }

        // If still 0, maybe it's just raw room name (backup)
        if (calculatedPrice === 0) {
            calculatedPrice = roomPrices[roomType] || 1800;
        }
    }

    const pricePerNight = calculatedPrice || 1800;

    // Calculate Nights
    const getDaysDifference = (start: string | null, end: string | null) => {
        if (!start || !end) return 1;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const timeDiff = endDate.getTime() - startDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysDiff > 0 ? daysDiff : 1;
    };

    const nights = getDaysDifference(checkIn, checkOut);
    const totalAmount = pricePerNight * nights;
    const advanceAmount = totalAmount * 0.25;

    const handleSubmit = async () => {
        if (!file) return;
        setIsSubmitting(true);

        try {
            // 1. Upload Screenshot
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('payments')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('payments')
                .getPublicUrl(fileName);

            // 3. Create Booking Record
            const { error: insertError } = await supabase
                .from('bookings')
                .insert({
                    guest_name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    check_in: checkIn || new Date().toISOString(), // Fallback if missing
                    check_out: checkOut || new Date().toISOString(),
                    guests: guests,
                    total_amount: totalAmount,
                    payment_screenshot_url: publicUrl,
                    status: 'pending'
                });

            if (insertError) throw insertError;

            setStep(4);
        } catch (error) {
            console.error("Booking error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            {step === 1 && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h1 className="text-2xl font-bold mb-6">Confirm Your Stay</h1>
                    <div className="grid grid-cols-2 gap-6 mb-8 text-gray-600">
                        <div>
                            <p className="text-sm text-gray-600">Check In</p>
                            <p className="font-medium text-black">{checkIn || "Not selected"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Check Out</p>
                            <p className="font-medium text-black">{checkOut || "Not selected"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Guests</p>
                            <p className="font-medium text-black">{guests}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Room</p>
                            <p className="font-medium text-black">{roomType}</p>
                        </div>
                    </div>

                    <div className="border-t pt-4 mb-8">
                        <div className="flex justify-between mb-2">
                            <span>Total Amount ({nights} Nights)</span>
                            <span className="font-bold text-black">₹{totalAmount}</span>
                        </div>
                        <div className="flex justify-between text-[#B89470] font-semibold">
                            <span>Advance Payment (25%)</span>
                            <span>₹{advanceAmount}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setStep(2)}
                        className="w-full bg-[#B89470] text-white py-4 rounded-xl font-semibold hover:bg-[#a38363] transition"
                    >
                        Proceed to Guest Details
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h1 className="text-2xl font-bold mb-6">Guest Details</h1>
                    <div className="space-y-4 mb-8">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                            <input
                                className="w-full p-3 border rounded-lg outline-none focus:border-[#B89470]"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                            <input
                                className="w-full p-3 border rounded-lg outline-none focus:border-[#B89470]"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                            <input
                                className="w-full p-3 border rounded-lg outline-none focus:border-[#B89470]"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setStep(1)} className="flex-1 border text-gray-600 py-4 rounded-xl font-semibold hover:bg-gray-50">Back</button>
                        <button onClick={() => setStep(3)} className="flex-1 bg-[#B89470] text-white py-4 rounded-xl font-semibold hover:bg-[#a38363]">Proceed to Payment</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h1 className="text-2xl font-bold mb-6">Secure Your Booking</h1>
                    <div className="bg-yellow-50 p-4 rounded-lg mb-6 text-sm text-yellow-800">
                        Please pay <span className="font-bold">₹{advanceAmount}</span> to confirm your booking.
                        Scan the QR code below or use the details.
                    </div>

                    <div className="flex flex-col items-center mb-8">
                        <div className="w-48 h-48 bg-gray-200 flex items-center justify-center mb-4 rounded-lg overflow-hidden relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/payment-qr.jpg"
                                alt="Payment QR Code"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="font-mono text-gray-600 font-bold">UPI ID: 8375879752-2@ybl</p>
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Upload Payment Screenshot</label>
                        <input
                            type="file"
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 border border-dashed rounded-lg p-2 cursor-pointer"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                        <p className="text-xs text-gray-600 mt-1">We verify payment within 2 hours.</p>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => setStep(2)} className="flex-1 border text-gray-600 py-4 rounded-xl font-semibold hover:bg-gray-50">Back</button>
                        <button
                            onClick={handleSubmit}
                            disabled={!file || isSubmitting}
                            className="flex-1 bg-[#B89470] text-white py-4 rounded-xl font-semibold hover:bg-[#a38363] disabled:opacity-50"
                        >
                            {isSubmitting ? "Processing..." : "Confirm Booking"}
                        </button>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Booking Requested!</h1>
                    <p className="text-gray-500 mb-6">
                        Booking ID: #SS-{Math.floor(Math.random() * 10000)}<br />
                        We have received your payment screenshot. Our team will verify it and send a confirmation to your email within 2 hours.
                    </p>
                    <button onClick={() => window.location.href = '/'} className="inline-block border text-gray-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50">Return Home</button>
                </div>
            )}
        </>
    )
}

export default function BookingPage() {
    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <div className="bg-black/90 relative h-[100px]">
                <Navbar />
            </div>
            <div className="max-w-3xl mx-auto px-6 py-12">
                <Suspense fallback={<div>Loading...</div>}>
                    <BookingContent />
                </Suspense>
            </div>
        </div>
    )
}
