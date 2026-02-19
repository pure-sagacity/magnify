"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HeroSection() {
    const router = useRouter();

    return (
        <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4 py-20">
            <div className="mx-auto max-w-5xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="mb-6 text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl">
                        Magnify
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground sm:text-2xl"
                >
                    Your career, in focus.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    <Button
                        size="lg"
                        onClick={() => router.push("/signup")}
                        className="bg-[rgb(var(--accent-green))] text-white hover:bg-[rgb(var(--accent-green))]/90 text-lg px-8 py-6"
                    >
                        Get Started
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => router.push("/login")}
                        className="text-lg px-8 py-6"
                    >
                        Login
                    </Button>
                </motion.div>

                {/* Animated background accent */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                    className="absolute left-1/2 top-1/2 -z-10 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgb(var(--accent-green))] blur-3xl"
                />
            </div>
        </section>
    );
}
