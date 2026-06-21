import { motion } from "framer-motion";

const bullets = [
  "Built TaskMate, a cross-platform task management app using React Native, Expo, and Firebase.",
  "Integrated Firebase Authentication and Cloud Firestore for secure login and real-time data sync.",
  "Implemented 4 core features: task creation, updates, categorization, and progress tracking using Context API and AsyncStorage.",
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(0,229,255,0.04), transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Horizontal scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          style={{ background: "linear-gradient(to right, transparent, rgba(123,97,255,0.25), transparent)" }}
          animate={{ top: ["10%", "90%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-16 flex items-center gap-4">
            <span className="text-primary font-mono text-2xl md:text-4xl">04.</span>
            Experience
          </h2>

          <div className="relative pl-8 md:pl-0">
            {/* Timeline line — animated grow */}
            <motion.div
              className="absolute left-[11px] md:left-[50%] top-0 w-[2px] bg-gradient-to-b from-primary to-transparent md:-translate-x-1/2"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-full md:w-1/2 md:pr-12 ml-auto md:ml-0 text-left md:text-right"
            >
              {/* Pulsing timeline dot */}
              <div className="absolute left-[-21px] md:right-[-35px] md:left-auto top-6 z-10">
                <motion.div
                  className="w-6 h-6 rounded-full border-4 border-background bg-primary"
                  style={{ boxShadow: "0 0 0 0 rgba(0,229,255,0.7)" }}
                  animate={{ boxShadow: ["0 0 0 0 rgba(0,229,255,0.7)", "0 0 0 10px rgba(0,229,255,0)", "0 0 0 0 rgba(0,229,255,0)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Card */}
              <motion.div
                className="glass-panel p-8 rounded-2xl relative overflow-hidden group"
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Hover shimmer */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(105deg, transparent 30%, rgba(0,229,255,0.06) 50%, transparent 70%)" }}
                  animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                {/* Top accent bar */}
                <motion.div
                  className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                />

                <h3 className="text-2xl font-bold text-foreground mb-1">Software Development Intern</h3>
                <h4 className="text-xl font-medium text-primary mb-4">Xcelcure</h4>
                <p className="text-sm font-mono text-muted-foreground mb-6">May 2025 – June 2025 • Remote</p>

                <ul className="space-y-4 text-muted-foreground font-light text-left">
                  {bullets.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                      className="flex gap-3"
                    >
                      <motion.span
                        className="text-primary mt-1 shrink-0"
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                      >
                        ▹
                      </motion.span>
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
