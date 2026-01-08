'use client'    export const dynamic = 'force-dynamic'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Navbar } from "@/components/Navbar";

export default function AdminPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setBookings(data);
        setLoading(false);
    }

    const verifyBooking = async (id: string) => {
        const { error } = await supabase
            .from('bookings')
            .update({ status: 'confirmed' })
            .eq('id', id);

        if (!error) fetchBookings();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-black relative h-[80px]">
                <div className="text-white p-6 font-bold text-xl">Saryu Sankul Admin</div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-8">Booking Requests</h1>

                {loading ? <p>Loading...</p> : (
                    <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="p-4 text-sm font-semibold text-gray-500">Guest</th>
                                    <th className="p-4 text-sm font-semibold text-gray-500">Dates</th>
                                    <th className="p-4 text-sm font-semibold text-gray-500">Amount</th>
                                    <th className="p-4 text-sm font-semibold text-gray-500">Payment</th>
                                    <th className="p-4 text-sm font-semibold text-gray-500">Status</th>
                                    <th className="p-4 text-sm font-semibold text-gray-500">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4">
                                            <p className="font-medium">{booking.guest_name}</p>
                                            <p className="text-xs text-gray-400">{booking.phone}</p>
                                        </td>
                                        <td className="p-4">
                                            <p>{booking.check_in}</p>
                                            <p className="text-xs text-gray-400">to {booking.check_out}</p>
                                        </td>
                                        <td className="p-4">₹{booking.total_amount}</td>
                                        <td className="p-4">
                                            {booking.payment_screenshot_url ? (
                                                <a href={booking.payment_screenshot_url} target="_blank" className="text-blue-600 underline text-sm">View Screenshot</a>
                                            ) : (<span className="text-gray-400 text-sm">No upload</span>)}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {booking.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {booking.status !== 'confirmed' && (
                                                <button
                                                    onClick={() => verifyBooking(booking.id)}
                                                    className="bg-black text-white px-3 py-1 rounded text-sm hover:opacity-80"
                                                >
                                                    Confirm
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
