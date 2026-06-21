import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, Activity, Shield, Users, MapPin, Image as ImageIcon } from "lucide-react";

const projects = [
  {
    title: "WanderLust",
    subtitle: "Hotel Listing Platform",
    description: "Full-stack property listing platform with CRUD for listings and reviews, secure authentication, cloud image storage, and interactive geolocation.",
    stats: [
      { icon: <MapPin className="w-4 h-4" />, label: "Mapbox geocoding" },
      { icon: <ImageIcon className="w-4 h-4" />, label: "Cloudinary CDN" },
      { icon: <Activity className="w-4 h-4" />, label: "4 Key workflows" },
    ],
    tech: ["Node.js", "Express.js", "MongoDB", "EJS", "Passport.js", "Cloudinary", "Mapbox"],
    live: "https://airbnb-5t79.onrender.com/listings",
    github: "https://github.com/anwesha24-code/Airbnb",
    color: "from-[#7b61ff] to-[#5b41ff]"
  },
  {
    title: "Gather",
    subtitle: "Video Conference Platform",
    description: "Real-time video conferencing platform with authentication, multi-participant video calls, live chat, screen sharing, meeting history, and custom meeting links.",
    stats: [
      { icon: <Activity className="w-4 h-4" />, label: "3 Real-time features" },
      { icon: <Users className="w-4 h-4" />, label: "6 Core modules" },
      { icon: <Shield className="w-4 h-4" />, label: "2 Auth methods" },
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "WebRTC", "Socket.IO", "Material UI"],
    live: "https://gathervideofrontend-k2eo.onrender.com/",
    github: "https://github.com/anwesha24-code/Zoom",
    color: "from-[#00e5ff] to-[#0088ff]"
  },
  {
    title: "TaskMate",
    subtitle: "Task Management App",
    description: "Cross-platform task management application built during internship at Xcelcure. Features real-time sync, task categorization, and secure authentication.",
    stats: [
      { icon: <Activity className="w-4 h-4" />, label: "4 Core features" },
      { icon: <Shield className="w-4 h-4" />, label: "Firebase Auth" },
      { icon: <Users className="w-4 h-4" />, label: "Cross-platform" },
    ],
    tech: ["React Native", "Expo", "Firebase", "Context API", "AsyncStorage"],
    live: "",
    github: "",
    color: "from-[#ff007b] to-[#cc005b]"
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative [perspective:1000px] w-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass-panel p-1 rounded-3xl relative group"
      >
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`} />
        
        <div className="bg-card/80 backdrop-blur-xl p-8 md:p-10 rounded-[22px] h-full border border-white/5 relative z-10 overflow-hidden">
          {/* Spotlight Effect */}
          <motion.div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: useMotionTemplate`radial-gradient(600px circle at ${useTransform(x, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(y, [-0.5, 0.5], ["0%", "100%"])}, rgba(255, 255, 255, 0.05), transparent)`
            }}
          />

          <div className="flex flex-col h-full justify-between gap-8 relative z-20" style={{ transform: "translateZ(30px)" }}>
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-black mb-2 text-foreground tracking-tight">{project.title}</h3>
                  <p className="text-primary font-mono text-sm uppercase tracking-wider">{project.subtitle}</p>
                </div>
                
                <div className="flex gap-4">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-muted-foreground hover:text-white"
                      data-testid={`github-${project.title}`}
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-colors"
                      data-testid={`demo-${project.title}`}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground text-lg font-light leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {project.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-foreground/80 bg-white/5 py-2 px-4 rounded-lg">
                    <span className="text-primary">{stat.icon}</span>
                    {stat.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech.map(tech => (
                <span 
                  key={tech} 
                  className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black flex items-center gap-4">
            <span className="text-primary font-mono text-2xl md:text-4xl">03.</span>
            Featured Projects
          </h2>
          <p className="text-muted-foreground mt-4 font-mono text-lg pl-14">Some things I've built</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
