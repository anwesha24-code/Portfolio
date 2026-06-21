import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedCounter({ value, duration = 2 }: { value: number | string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isNumber = typeof value === "number" || !isNaN(Number(value));
  const numericValue = isNumber ? Number(value) : 0;

  useEffect(() => {
    if (isInView && isNumber) {
      let start = 0;
      const increment = numericValue / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) { setCount(numericValue); clearInterval(timer); }
        else { setCount(Math.ceil(start)); }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue, duration, isNumber]);

  return (
    <span ref={ref}>
      {isNumber ? (Number.isInteger(numericValue) ? count : count.toFixed(2)) : value}
    </span>
  );
}

const statCards = [
  { value: 9.25, label: "GPA", color: "text-primary", glow: "rgba(0,229,255,0.3)" },
  { value: 524, label: "Problems", suffix: "+", color: "text-secondary", glow: "rgba(123,97,255,0.3)" },
  { value: 1619, label: "Rating", color: "text-accent", glow: "rgba(255,0,123,0.3)" },
  { value: 2, label: "Projects", color: "text-primary", glow: "rgba(0,229,255,0.3)" },
];

const paragraphs = [
  <>B.Tech CS student at <span className="text-foreground font-medium">VIT Chennai</span> (GPA: 9.25/10), passionate about building full-stack products and solving hard problems.</>,
  <>I love competing on <span className="text-foreground font-medium">LeetCode</span> (Top 21.4% globally, 524+ problems solved) and translating complex logic into elegant, scalable web applications.</>,
  <>Currently seeking Software Developer roles where I can contribute to high-impact projects.</>,
];

export default function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-0 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,229,255,0.05), transparent 70%)" }}
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 right-0 w-72 h-72 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(123,97,255,0.06), transparent 70%)" }}
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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
          <h2 className="text-4xl md:text-6xl font-black mb-12 flex items-center gap-4">
            <span className="text-primary font-mono text-2xl md:text-4xl">01.</span>
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text paragraphs — staggered slide-in */}
            <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.18, ease: "easeOut" }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Stat cards — flip-in with glow pulse */}
            <div className="grid grid-cols-2 gap-6">
              {statCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                  whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                  whileHover={{ scale: 1.06, y: -4 }}
                  className="glass-panel p-6 rounded-2xl flex flex-col justify-center items-center text-center relative overflow-hidden group"
                >
                  {/* Pulsing glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `0 0 25px ${card.glow} inset` }}
                  />
                  <motion.div
                    className={`text-4xl font-bold ${card.color} mb-2`}
                    animate={{ textShadow: [`0 0 0px transparent`, `0 0 20px ${card.glow}`, `0 0 0px transparent`] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  >
                    <AnimatedCounter value={card.value} />
                    {card.suffix}
                  </motion.div>
                  <div className="text-sm text-muted-foreground uppercase tracking-widest">{card.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education timeline */}
          <div className="mt-20">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-8 flex items-center gap-3"
            >
              <div className="w-8 h-[1px] bg-primary" />
              Education
            </motion.h3>

            <div className="space-y-8 pl-4 relative">
              {/* Animated growing timeline line */}
              <motion.div
                className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />

              {[
                {
                  school: "VIT Chennai",
                  period: "Aug 2023 – May 2027",
                  desc: "B.Tech Computer Science and Engineering • GPA 9.25/10",
                  color: "bg-primary shadow-[0_0_12px_rgba(0,229,255,0.9)]",
                  textColor: "text-primary",
                },
                {
                  school: "Delhi Public School, Kolkata",
                  period: "Aug 2021 – May 2023",
                  desc: "CBSE • 95.4%",
                  color: "bg-secondary shadow-[0_0_12px_rgba(123,97,255,0.9)]",
                  textColor: "text-secondary",
                },
              ].map((edu, i) => (
                <motion.div
                  key={edu.school}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.25 }}
                  className="relative pl-8"
                >
                  {/* Pulsing dot */}
                  <motion.div
                    className={`absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full ${edu.color}`}
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                  />
                  <h4 className="text-xl font-bold text-foreground">{edu.school}</h4>
                  <p className={`${edu.textColor} font-mono text-sm my-1`}>{edu.period}</p>
                  <p className="text-muted-foreground">{edu.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
