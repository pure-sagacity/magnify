"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "How does Magnify help with my job search?",
        answer: "Magnify provides comprehensive tools including resume building, application tracking, interview preparation, and personalized career insights to streamline your entire job search process.",
    },
    {
        question: "Is my data secure?",
        answer: "Yes, we take security seriously. All your data is encrypted and stored securely. We never share your information with third parties without your explicit consent.",
    },
    {
        question: "How do I get started?",
        answer: "Simply create an account, upload your current resume or start from scratch, and our guided setup will help you get everything configured in minutes.",
    },
    {
        question: "What makes Magnify different?",
        answer: "Magnify combines AI-powered insights with intuitive design to create a seamless experience. We focus on putting your career in focus, not just building documents.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="px-4 py-24">
            <div className="mx-auto max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                        Frequently asked questions
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Everything you need to know about Magnify.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="overflow-hidden rounded-lg border bg-card"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-muted/50"
                            >
                                <span className="font-semibold">{faq.question}</span>
                                <motion.span
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="ml-4 text-xl"
                                >
                                    ▼
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="border-t px-6 pb-6 pt-4 text-muted-foreground">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
