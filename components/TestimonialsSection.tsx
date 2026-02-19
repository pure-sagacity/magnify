"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const testimonials = [
    {
        quote: "Magnify transformed the way I approach my job search. The resume builder helped me land my dream job in just 3 weeks!",
        author: "Sarah Chen",
        role: "Software Engineer",
        company: "Tech Corp",
    },
    {
        quote: "The career insights feature gave me clarity on my next steps. I never felt more confident about my professional direction.",
        author: "Michael Rodriguez",
        role: "Product Manager",
        company: "Innovation Labs",
    },
    {
        quote: "Interview prep tools were a game-changer. I went from nervous to confident and aced every interview.",
        author: "Emily Watson",
        role: "UX Designer",
        company: "Design Studio",
    },
];

export default function TestimonialsSection() {
    return (
        <section className="bg-muted/30 px-4 py-24">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                        Trusted by professionals
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Join thousands who have accelerated their careers with Magnify.
                    </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.author}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                                <p className="mb-6 text-lg leading-relaxed">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>
                                <div className="border-t pt-4">
                                    <p className="font-semibold">{testimonial.author}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {testimonial.role} at {testimonial.company}
                                    </p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
