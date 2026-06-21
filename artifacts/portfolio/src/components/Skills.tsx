import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  SiC, SiCplusplus, SiJavascript, SiHtml5, SiReact, SiTailwindcss,
  SiMui, SiBootstrap, SiNodedotjs, SiExpress, SiMongodb, SiMysql,
  SiFirebase, SiGit, SiGithub, SiWebrtc, SiSocketdotio, SiRender, SiCloudinary, SiMapbox
} from "react-icons/si";
import { FaJava, FaPython } from "react-icons/fa";

const skillCategories = [
  {
    title: "Languages",
    color: "from-[#00e5ff] to-[#0088ff]",
    skills: [
      { name: "Java", icon: <FaJava className="text-2xl" /> },
      { name: "Python", icon: <FaPython className="text-2xl" /> },
      { name: "C", icon: <SiC className="text-2xl" /> },
      { name: "C++", icon: <SiCplusplus className="text-2xl" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-2xl" /> },
      { name: "HTML5", icon: <SiHtml5 className="text-2xl" /> },
      { name: "CSS3", icon: <span className="font-bold text-xl leading-none">CSS</span> }
    ]
  },
  {
    title: "Frontend",
    color: "from-[#7b61ff] to-[#5b41ff]",
    skills: [
      { name: "React.js", icon: <SiReact className="text-2xl" /> },
      { name: "React Native", icon: <SiReact className="text-2xl" /> },
      { name: "Tailwind", icon: <SiTailwindcss className="text-2xl" /> },
      { name: "Material UI", icon: <SiMui className="text-2xl" /> },
      { name: "Bootstrap 5", icon: <SiBootstrap className="text-2xl" /> }
    ]
  },
  {
    title: "Backend",
    color: "from-[#ff007b] to-[#cc005b]",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs className="text-2xl" /> },
      { name: "Express.js", icon: <SiExpress className="text-2xl" /> },
      { name: "REST APIs", icon: <span className="font-bold text-xl leading-none">API</span> }
    ]
  },
  {
    title: "Databases",
    color: "from-[#00e5ff] to-[#7b61ff]",
    skills: [
      { name: "MongoDB", icon: <SiMongodb className="text-2xl" /> },
      { name: "MySQL", icon: <SiMysql className="text-2xl" /> },
      { name: "Firebase", icon: <SiFirebase className="text-2xl" /> }
    ]
  },
  {
    title: "Tools & Other",
    color: "from-[#7b61ff] to-[#00e5ff]",
    skills: [
      { name: "Git", icon: <SiGit className="text-2xl" /> },
      { name: "GitHub", icon: <SiGithub className="text-2xl" /> },
      { name: "WebRTC", icon: <SiWebrtc className="text-2xl" /> },
      { name: "Socket.IO", icon: <SiSocketdotio className="text-2xl" /> },
      { name: "VS Code", icon: <span className="font-bold text-xl leading-none">VS</span> },
      { name: "Render", icon: <SiRender className="text-2xl" /> },
      { name: "Cloudinary", icon: <SiCloudinary className="text-2xl" /> },
      { name: "Mapbox", icon: <SiMapbox className="text-2xl" /> }
    ]
  }
];

function SkillCard({ skill, index }: { skill: { name: string, icon: React.ReactNode }, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06, type: "spring", stiffness: 200, damping: 20 }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center gap-3 relative group overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.08 }}
    >
      {/* Spotlight */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: useMotionTemplate`radial-gradient(90px circle at ${useTransform(x, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(y, [-0.5, 0.5], ["0%", "100%"])}, rgba(0,229,255,0.2), transparent)`
        }}
      />
      {/* Glow border on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-primary/50" style={{ boxShadow: "0 0 15px rgba(0,229,255,0.3) inset" }} />

      <motion.div
        className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
        style={{ transform: "translateZ(20px)" }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3 + (index % 3) * 0.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
      >
        {skill.icon}
      </motion.div>
      <span className="text-sm font-medium text-foreground text-center" style={{ transform: "translateZ(10px)" }}>
        {skill.name}
      </span>
    </motion.div>
  );
}

function CategoryBlock({ category, idx }: { category: typeof skillCategories[0], idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: idx * 0.12, ease: "easeOut" }}
      className="space-y-6 relative"
    >
      {/* Category header with animated underline */}
      <div>
        <h3 className="text-xl font-bold flex items-center gap-3 mb-1">
          <div className="w-4 h-[1px] bg-secondary" />
          {category.title}
        </h3>
        <motion.div
          className={`h-[2px] rounded-full bg-gradient-to-r ${category.color}`}
          initial={{ width: 0 }}
          whileInView={{ width: "60%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: idx * 0.12 + 0.3, ease: "easeOut" }}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {category.skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Scrolling scan-line beam */}
        <motion.div
          className="absolute left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(to right, transparent, rgba(0,229,255,0.3), transparent)" }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />
        {/* Side glow orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,229,255,0.08), transparent 70%)" }}
          animate={{ y: [0, 40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-2/3 -right-32 w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(123,97,255,0.08), transparent 70%)" }}
          animate={{ y: [0, -40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, #00e5ff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black flex items-center gap-4">
            <span className="text-primary font-mono text-2xl md:text-4xl">02.</span>
            Skills
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground mt-4 font-mono text-lg pl-14"
          >
            Technologies I work with
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {skillCategories.map((category, idx) => (
            <CategoryBlock key={category.title} category={category} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
