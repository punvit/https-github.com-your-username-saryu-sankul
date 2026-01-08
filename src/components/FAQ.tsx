"use client"
import React from 'react';

export const FAQ = () => {
    const faqs = [
        {
            question: "How far is Saryu Sankul from major landmarks?",
            answer: (
                <ul className="list-disc ml-5 space-y-1">
                    <li><strong>Ram Mandir:</strong> 1.5 km</li>
                    <li><strong>Hanuman Garhi:</strong> 1 km</li>
                    <li><strong>Saryu River:</strong> 100 meters</li>
                    <li><strong>Ayodhya Dham Railway Station:</strong> 2 km</li>
                    <li><strong>Ayodhya Cantt Railway Station:</strong> 11 km</li>
                    <li><strong>Ayodhya Airport:</strong> 12.5 km</li>
                </ul>
            )
        },
        {
            question: "What are the Check-in and Check-out timings?",
            answer: "Our standard Check-in time is 12:00 PM and Check-out time is 11:00 AM. Early check-in or late check-out is subject to availability."
        },
        {
            question: "Is parking available at the property?",
            answer: "Yes, we provide secure parking facilities for our guests."
        }
    ];

    return (
        <section className="py-16 px-6 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-serif text-center mb-10 text-gray-800">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details key={index} className="group bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-lg text-gray-700">
                                <span>{faq.question}</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div className="text-gray-600 mt-4 leading-relaxed">
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};
