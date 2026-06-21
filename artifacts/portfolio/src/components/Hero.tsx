import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import gsap from "gsap";

function MagneticButton({ children, onClick, className }: { children: React.ReactNode, onClick: () => void, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLButtonElement>(null);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`relative px-8 py-4 rounded-full font-medium transition-colors ${className}`}
    >
      {children}
    </motion.button>
  );
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full glass-panel text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all hover:scale-110"
      data-testid={`social-link-${href}`}
    >
      {icon}
    </a>
  );
}

function TypewriterEffect({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index];
    const typeSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      } else {
        setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, words]);

  return (
    <span className="inline-block min-w-[280px] text-left">
      {text}
      <span className="animate-pulse inline-block w-[3px] h-6 bg-primary ml-1 translate-y-1" />
    </span>
  );
}

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.8 });
    tl.fromTo(".hero-greeting",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(".hero-name",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(".hero-roles",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(".hero-actions",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated CSS background shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

        {/* Aurora blobs behind the name — centered vertically ~35% from top */}
        <motion.div
          className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(0,229,255,0.18) 0%, transparent 70%)", filter: "blur(40px)" }}
          animate={{ scaleX: [1, 1.3, 1], scaleY: [1, 0.8, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[180px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(123,97,255,0.2) 0%, transparent 70%)", filter: "blur(50px)" }}
          animate={{ scaleX: [1, 0.8, 1], scaleY: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Pulsing concentric rings centered on name */}
        {[120, 240, 360, 480].map((size, i) => (
          <motion.div
            key={size}
            className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
            style={{ width: size, height: size / 3.5 }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        ))}

        {/* Floating sparkle particles scattered around name area */}
        {[
          { x: "22%", y: "20%", d: 7 }, { x: "75%", y: "18%", d: 5 },
          { x: "15%", y: "40%", d: 4 }, { x: "82%", y: "42%", d: 6 },
          { x: "30%", y: "55%", d: 3 }, { x: "68%", y: "58%", d: 5 },
          { x: "50%", y: "12%", d: 6 }, { x: "42%", y: "65%", d: 4 },
          { x: "88%", y: "25%", d: 3 }, { x: "10%", y: "28%", d: 5 },
          { x: "60%", y: "15%", d: 3 }, { x: "35%", y: "30%", d: 4 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary"
            style={{ left: p.x, top: p.y, width: p.d, height: p.d, boxShadow: `0 0 ${p.d * 3}px rgba(0,229,255,0.8)` }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5], y: [0, -15, 0] }}
            transition={{ duration: 2.5 + (i % 4) * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        ))}

        {/* Orbiting ring around name */}
        <motion.div
          className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          style={{ width: 520, height: 100 }}
        >
          <div
            className="w-full h-full rounded-full border border-primary/15"
            style={{ boxShadow: "0 0 20px rgba(0,229,255,0.1)" }}
          />
          {/* Comet dot on the orbit */}
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-primary"
            style={{ top: -6, left: "50%", boxShadow: "0 0 12px 4px rgba(0,229,255,0.7)" }}
          />
        </motion.div>

        {/* Second orbiting ring (opposite direction) */}
        <motion.div
          className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          style={{ width: 680, height: 130 }}
        >
          <div className="w-full h-full rounded-full border border-secondary/10" />
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-secondary"
            style={{ top: -4, left: "25%", boxShadow: "0 0 10px 3px rgba(123,97,255,0.7)" }}
          />
        </motion.div>

        {/* Large slow-rotating morphing blob — top right */}
        <motion.div
          className="absolute top-[10%] right-[8%] w-64 h-64 opacity-20"
          style={{
            background: "conic-gradient(from 0deg, #00e5ff, #7b61ff, #00e5ff)",
            filter: "blur(1px)",
            borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
          }}
          animate={{
            rotate: [0, 360],
            borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "70% 30% 50% 50% / 30% 60% 40% 70%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        {/* Bottom-left polygon */}
        <motion.div
          className="absolute bottom-[15%] left-[6%] w-48 h-48 opacity-15"
          style={{ background: "linear-gradient(135deg, #7b61ff 0%, transparent 70%)", clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" }}
          animate={{ rotate: [0, -360], scale: [1, 1.15, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        {/* Diamond */}
        <motion.div
          className="absolute top-[55%] right-[20%] w-32 h-32 opacity-15"
          style={{ background: "linear-gradient(45deg, #00e5ff 0%, transparent 70%)", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          animate={{ rotate: [0, 360], y: [-10, 10, -10] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #00e5ff 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        {/* Bottom gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Mouse spotlight */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(600px circle at ${x}px ${y}px, rgba(0,229,255,0.07), transparent 50%)`
          ),
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <p className="hero-greeting text-xl md:text-2xl text-muted-foreground mb-4 opacity-0 font-mono tracking-widest uppercase">
          Hi, I'm
        </p>

        <h1 className="hero-name text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 opacity-0 text-gradient">
          Anwesha Pal
        </h1>

        <div className="hero-roles text-xl md:text-3xl text-muted-foreground h-10 mb-12 opacity-0 font-light flex items-center justify-center gap-2">
          <span className="text-primary">&lt;</span>
          <TypewriterEffect words={["Full Stack Developer", "Problem Solver"]} />
          <span className="text-primary">/&gt;</span>
        </div>

        <div className="hero-actions flex flex-col md:flex-row items-center gap-6 opacity-0">
          <MagneticButton
            onClick={() => scrollTo("projects")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-testid="btn-view-projects"
          >
            View Projects
          </MagneticButton>

          <MagneticButton
            onClick={() => scrollTo("contact")}
            className="glass-panel text-foreground hover:bg-white/10"
            data-testid="btn-contact"
          >
            Contact Me
          </MagneticButton>

          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
            <SocialLink href="https://www.linkedin.com/in/anwesha-pal-14a222293/" icon={<Linkedin size={18} />} />
            <SocialLink href="https://github.com/anwesha24-code" icon={<Github size={18} />} />
            <SocialLink href="https://leetcode.com/u/MJOstrich/" icon={<SiLeetcode size={18} />} />
            <SocialLink href="mailto:anweshapal2006@gmail.com" icon={<Mail size={18} />} />
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ChevronDown className="w-8 h-8 opacity-50" />
      </motion.div>
    </section>
  );
}
