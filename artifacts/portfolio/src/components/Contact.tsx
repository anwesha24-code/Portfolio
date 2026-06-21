import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { SiLeetcode } from "react-icons/si";

const socialLinks = [
  { href: "https://www.linkedin.com/in/anwesha-pal-14a222293/", icon: <Linkedin />, label: "LinkedIn" },
  { href: "https://github.com/anwesha24-code", icon: <Github />, label: "GitHub" },
  { href: "https://leetcode.com/u/MJOstrich/", icon: <SiLeetcode />, label: "LeetCode" },
  { href: "mailto:anweshapal2006@gmail.com", icon: <Mail />, label: "Email" },
];

function SocialLink({ href, icon, index }: { href: string, icon: React.ReactNode, index: number }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.15 }}
      whileTap={{ scale: 0.92 }}
      className="p-3 rounded-full glass-panel text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors relative group"
    >
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: "0 0 15px rgba(0,229,255,0.4)" }}
      />
      {icon}
    </motion.a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large glowing center orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(0,229,255,0.07), transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Orbiting decorative dots */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <motion.div
            key={deg}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-primary/40"
            style={{
              transformOrigin: "0 0",
              x: -3,
              y: -3,
            }}
            animate={{
              rotate: [deg, deg + 360],
              translateX: [Math.cos(deg * Math.PI / 180) * 220, Math.cos((deg + 360) * Math.PI / 180) * 220],
              translateY: [Math.sin(deg * Math.PI / 180) * 100, Math.sin((deg + 360) * Math.PI / 180) * 100],
            }}
            transition={{ duration: 12 + i, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-primary font-mono mb-4 text-xl"
          >
            06. What's Next?
          </motion.div>

          {/* Heading with character stagger */}
          <motion.h2
            className="text-5xl md:text-7xl font-black mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Let's build{" "}
            <span className="text-gradient">something</span>{" "}
            together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg mb-12 font-light leading-relaxed"
          >
            I'm currently looking for new opportunities in software development.
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </motion.p>

          {/* CTA button with ripple */}
          <motion.a
            href="mailto:anweshapal2006@gmail.com"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block relative px-10 py-5 border-2 border-primary text-primary font-bold text-lg rounded-full overflow-hidden group transition-all"
            data-testid="contact-email-btn"
          >
            <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out z-0" />
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-0 pointer-events-none"
              style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)", backgroundSize: "200% 100%" }}
              animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10 group-hover:text-background transition-colors duration-300">
              anweshapal2006@gmail.com
            </span>
          </motion.a>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-24 pt-12 border-t border-white/10 flex flex-col items-center gap-6"
          >
            <div className="flex gap-4">
              {socialLinks.map((s, i) => (
                <SocialLink key={s.label} href={s.href} icon={s.icon} index={i} />
              ))}
            </div>

            <motion.div
              className="font-mono text-xs text-muted-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Designed & Built by Anwesha Pal © {new Date().getFullYear()}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
