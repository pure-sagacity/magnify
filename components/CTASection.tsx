"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTASection() {
    return (
        <section className="px-4 py-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mx-auto max-w-4xl rounded-2xl bg-linear-to-br from-[rgb(var(--accent-green))]/20 to-[rgb(var(--accent-green))]/5 p-12 text-center shadow-xl"
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl"
                >
                    Ready to magnify your career?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-8 text-lg text-muted-foreground"
                >
                    Join thousands of professionals who have transformed their careers with Magnify. Start your journey today.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    <Button
                        size="lg"
                        className="bg-[rgb(var(--accent-green))] text-white hover:bg-[rgb(var(--accent-green))]/90 text-lg px-8 py-6"
                    >
                        Get Started for Free
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
