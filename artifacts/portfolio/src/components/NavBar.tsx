import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function NavBar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const observers = new Map();
    const sections = ["hero", "about", "skills", "projects", "experience", "achievements", "contact"];
    
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );
      
      observer.observe(element);
      observers.set(id, observer);
    });
    
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" }
  ];

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-300 ${
        isScrolled ? "py-4 bg-background/80 backdrop-blur-lg border-b border-white/10" : "py-6 bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div 
          className="text-xl font-bold tracking-tighter cursor-pointer hover:text-primary transition-colors"
          onClick={() => scrollTo("#hero")}
        >
          AP<span className="text-primary">.</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.href)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === item.href.substring(1) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
