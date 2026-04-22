"use client";

import { motion } from "framer-motion";

export function AnimatedBlock() {
  return (
    <section className="relative w-full overflow-hidden border-y border-[var(--framify-border)] bg-[var(--framify-surface-1)] py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          {/* Left Side: Typography */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center text-left"
          >
            <h2 className="text-4xl font-extrabold uppercase leading-[1.05] tracking-tighter text-[var(--framify-text)] sm:text-5xl lg:text-6xl">
              THE SMARTER, <br />
              <span className="gradient-text-static">AI POWERED</span> <br />
              LANDING PAGE <br />
              BUILDER
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[var(--framify-text-muted)]">
              Harness the power of AI to generate compelling copy and craft premium decentralized marketplace experiences with Framify.
            </p>
          </motion.div>

          {/* Right Side: 3D Block Animation */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex aspect-square w-full items-center justify-center lg:h-[500px]"
          >
            {/* 3D background / lighting */}
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[var(--framify-card-bg)] to-[var(--framify-bg)] shadow-[inset_0_2px_40px_rgba(255,255,255,0.05),0_20px_60px_-15px_rgba(0,0,0,0.1)] ring-1 ring-[var(--framify-border)] flex items-center justify-center overflow-hidden">
              
              {/* Outer Indention */}
              <div className="relative flex h-[350px] w-[350px] items-center justify-center rounded-full bg-[var(--framify-surface-1)] shadow-[inset_0_20px_50px_rgba(0,0,0,0.08),inset_0_-2px_10px_rgba(255,255,255,0.05)] ring-1 ring-[var(--framify-border)]">
                
                {/* Inner Plateau */}
                <div className="relative flex h-[280px] w-[280px] items-center justify-center rounded-full bg-[var(--framify-bg)] shadow-[0_20px_50px_rgba(0,0,0,0.1),0_-2px_10px_rgba(255,255,255,0.03)] ring-1 ring-[var(--framify-border)]">
                  {/* Grid lines simulating the segmented circle in photo */}
                  <div className="absolute inset-0 rounded-full border border-[var(--framify-border)]"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-[var(--framify-border)]"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 bg-[var(--framify-border)]"></div>
                  
                  {/* Animated Coin */}
                  <motion.div
                    animate={{ 
                      rotate: 360,
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="absolute inset-0 rounded-full"
                  >
                    <motion.div 
                      className="absolute top-0 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-600 shadow-[0_10px_30px_rgba(245,158,11,0.4),inset_0_2px_4px_rgba(255,255,255,0.6)] ring-2 ring-yellow-200"
                      animate={{ 
                        rotateY: [0, 360],
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
