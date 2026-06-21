import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Trophy, Code2, Award, BookOpen, Star } from "lucide-react";

function CountUp({ value, suffix = "", isFloat = false }: { value: number, suffix?: string, isFloat?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) { setCount(value); clearInterval(timer); }
        else { setCount(isFloat ? parseFloat(start.toFixed(2)) : Math.floor(start)); }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value, isFloat]);

  return <span ref={ref}>{isFloat ? count.toFixed(2) : count}{suffix}</span>;
}

const achievements = [
  {
    icon: <Trophy className="w-8 h-8" />,
    iconColor: "text-[#f89f1b]",
    glowColor: "rgba(248,159,27,0.4)",
    bgColor: "bg-[#f89f1b]/10",
    value: 1619,
    label: "LeetCode Rating",
    sublabel: "Top 21.4% Globally",
    link: "https://leetcode.com/u/MJOstrich/",
  },
  {
    icon: <Code2 className="w-8 h-8" />,
    iconColor: "text-primary",
    glowColor: "rgba(0,229,255,0.4)",
    bgColor: "bg-primary/10",
    value: 524,
    suffix: "+",
    label: "DSA Problems Solved",
    sublabel: "Across Platforms",
  },
  {
    icon: <Award className="w-8 h-8" />,
    iconColor: "text-secondary",
    glowColor: "rgba(123,97,255,0.4)",
    bgColor: "bg-secondary/10",
    value: 32,
    label: "Contests Participated",
    sublabel: "Consistent Competitor",
  },
  {
    icon: <Star className="w-8 h-8" />,
    iconColor: "text-[#ff007b]",
    glowColor: "rgba(255,0,123,0.4)",
    bgColor: "bg-[#ff007b]/10",
    value: 9.25,
    isFloat: true,
    label: "GPA / 10",
    sublabel: "VIT Chennai",
  },
];

function AchievementCard({ item, index }: { item: typeof achievements[0], index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x);
  const ySpring = useSpring(y);
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const card = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 50, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, type: "spring", stiffness: 180, damping: 18 }}
      whileHover={{ scale: 1.05 }}
      className="glass-panel p-8 rounded-2xl h-full flex flex-col items-center text-center relative overflow-hidden group cursor-pointer"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `0 0 30px ${item.glowColor} inset` }}
      />
      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)", backgroundSize: "200% 100%" }}
        animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Icon with floating bob */}
      <motion.div
        className={`mb-6 p-4 ${item.bgColor} rounded-full inline-block ${item.iconColor}`}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
        style={{ transform: "translateZ(20px)" }}
      >
        {item.icon}
      </motion.div>

      <motion.div
        className="text-4xl md:text-5xl font-black mb-2 text-foreground font-mono"
        style={{ transform: "translateZ(15px)" }}
      >
        <CountUp value={item.value} suffix={item.suffix} isFloat={item.isFloat} />
      </motion.div>
      <div className="text-lg font-bold mb-1" style={{ transform: "translateZ(10px)" }}>{item.label}</div>
      <div className="text-sm text-muted-foreground">{item.sublabel}</div>
    </motion.div>
  );

  if (item.link) {
    return (
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {card}
      </a>
    );
  }
  return card;
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-32 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(123,97,255,0.06), transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        {/* Rotating ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/5"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-secondary/5"
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-black mb-16 flex items-center gap-4 justify-center text-center">
            <span className="text-primary font-mono text-2xl md:text-4xl">05.</span>
            Achievements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {achievements.map((item, index) => (
              <AchievementCard key={item.label} item={item} index={index} />
            ))}
          </div>

          {/* Certificate card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass-panel p-8 rounded-2xl max-w-3xl mx-auto flex items-center gap-6 relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: "linear-gradient(105deg, transparent 30%, rgba(0,229,255,0.05) 50%, transparent 70%)" }}
            />
            <motion.div
              className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.6 }}
            />
            <motion.div
              className="p-4 bg-primary/10 rounded-xl shrink-0"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <BookOpen className="w-10 h-10 text-primary" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Full Stack Development Certificate</h3>
              <p className="text-muted-foreground font-mono text-sm">React • Node.js • Express • MongoDB • REST APIs</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
