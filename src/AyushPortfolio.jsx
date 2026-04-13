import { useState, useEffect, useRef } from "react";
import {
  FiMail, FiExternalLink, FiDownload, FiMoon, FiSun, FiChevronUp,
  FiCode, FiDatabase, FiServer, FiGlobe, FiMapPin, FiCalendar,
  FiTerminal, FiCpu, FiCheckCircle, FiArrowRight, FiSend,
  FiMenu, FiX,
} from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const DATA = {
  name: "Ayush Sharma",
  location: "India",
  email: "ayushsharma@email.com",
  github: "https://github.com/iayushsharma05",
  linkedin: "https://www.linkedin.com/in/iayushsharma05/",
  bio: "I am a BCA Student passionate Full Stack Developer specializing in the MERN stack. I build real-world applications with features like authentication systems, dashboards, and email integrations. I actively share my work on GitHub and engage professionally on LinkedIn.",
  typewriterWords: [
    "Full Stack Developer", "MERN Stack Expert", "UI/UX Enthusiast",
    "Problem Solver", "Open Source Contributor",
  ],
  skills: {
    Frontend: [
      { name: "React.js", level: 90 }, { name: "Python", level: 70 },
      { name: "Java", level: 80 }, { name: "Django", level: 80 },
      { name: "C/C++", level: 100 }, { name: "JavaScript (ES6+)", level: 88 },
      { name: "HTML5 & CSS3", level: 95 }, { name: "Tailwind CSS", level: 82 },
    ],
    Backend: [
      { name: "Node.js", level: 85 }, { name: "Express.js", level: 84 },
      { name: "REST APIs", level: 88 }, { name: "JWT Auth", level: 80 },
    ],
    Database: [
      { name: "MongoDB", level: 83 }, { name: "Mongoose ODM", level: 80 },
    ],
    Tools: [
      { name: "Git & GitHub", level: 87 }, { name: "Postman", level: 82 },
      { name: "Nodemailer", level: 75 }, { name: "PhotoShop", level: 50 },
    ],
  },
  projects: [
    {
      id: 1, title: "Invoice Generator System", emoji: "🧾", category: "Fullstack",
      desc: "A full-featured billing system with email delivery, real-time dashboard analytics, and PDF invoice generation. Includes client management and payment tracking.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Nodemailer", "Chart.js"],
      github: "https://github.com/iayushsharma05", live: "#", featured: true,
    },
    {
      id: 2, title: "College Management System", emoji: "🎓", category: "Fullstack",
      desc: "Comprehensive CMS with role-based authentication for admin, staff, and students. Features include attendance tracking, fee management, and exam result portals.",
      tech: ["React", "Node.js", "MongoDB", "JWT", "Express", "Tailwind", "Vercel", "Render"],
      github: "https://github.com/iayushsharma05/", live: "https://ayushprojectcollege.vercel.app/", featured: true,
    },
    {
      id: 3, title: "Timetable Management System", emoji: "📅", category: "Backend",
      desc: "Dynamic timetable generator with auto-conflict detection, class auto-fetching from MongoDB schema, and PDF export. Supports multiple departments and semesters.",
      tech: ["Node.js", "Express", "MongoDB", "React", "Mongoose"],
      github: "https://github.com/iayushsharma05", live: "#", featured: false,
    },
  ],
  certifications: [
    { title: "Diploma In Web Designing", issuer: "NICT Sector-15 Chandigarh", year: "2022", icon: "🌐", color: "#3b82f6" },
    { title: "Full Stack Development-MERN Stack", issuer: "NICT Sector-15 Chandigarh", year: "2026", icon: "⚡", color: "#f59e0b" },
    { title: "Node.js Backend Development", issuer: "NICT Sector-15 Chandigarh", year: "2026", icon: "🖥️", color: "#10b981" },
    { title: "MongoDB Developer Certificate", issuer: "NICT Sector-15 Chandigarh", year: "2026", icon: "🍃", color: "#22c55e" },
  ],
  timeline: [
    { year: "2021", title: "Started Coding Journey", desc: "Began learning HTML, CSS & JavaScript fundamentals. Built first static websites.", icon: "🚀" },
    { year: "2022", title: "Discovered React & Node.js", desc: "Dived deep into Web Development. Built first dynamic web apps with Javascript.", icon: "⚡" },
    { year: "2022", title: "Database", desc: "Dived deep into the Database Management System.", icon: "⚡" },
    { year: "2023", title: "First Real-World Projects", desc: "Developed School Website. Learned How Everything Works in the real world.", icon: "🔨" },
    { year: "2023", title: "MySQL", desc: "Learning Database Management System.", icon: "🔨" },
    { year: "2023", title: "C/C++", desc: "Learnt C/C++ from College.", icon: "🔨" },
    { year: "2024", title: "MERN Projects", desc: "Developed Invoice Generator and College Management System. Learned email integrations and dashboard analytics.", icon: "🔨" },
    { year: "2026", title: "Advanced MERN Applications", desc: "Built complex role-based systems, REST APIs, and integrated third-party services. Active on GitHub.", icon: "🏆" },
  ],
};

/* ═══════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════ */
function useTypewriter(words, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wi];
    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, display.length + 1));
        if (display.length + 1 === word.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setDisplay(word.slice(0, display.length - 1));
        if (display.length === 0) { setDeleting(false); setWi((wi + 1) % words.length); }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [display, deleting, wi, words, speed, pause]);
  return display;
}

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return width;
}

/* ═══════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════ */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Outfit', sans-serif; overflow-x: hidden; }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #3b82f655; border-radius: 3px; }

@keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.06)} 66%{transform:translate(-15px,15px) scale(0.96)} }
@keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-30px,20px) scale(1.04)} 66%{transform:translate(20px,-15px) scale(0.98)} }
@keyframes blob3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,-20px) scale(1.08)} }
@keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
@keyframes blink { 50%{opacity:0} }
@keyframes pulseGreen { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(0.96)} }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
@keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }

.fade-up { animation: fadeUp 0.7s ease both; }
.cursor-blink { display:inline-block; width:2px; height:1em; background:#3b82f6; margin-left:3px; animation:blink 1s step-end infinite; vertical-align:middle; border-radius:1px; }
.card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
.card-hover:hover { transform: translateY(-4px); }
.nav-link { position:relative; }
.nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:linear-gradient(90deg,#3b82f6,#06b6d4); transition:width 0.3s ease; border-radius:1px; }
.nav-link:hover::after, .nav-link.active::after { width:100%; }
.btn-primary { background:linear-gradient(135deg,#3b82f6,#06b6d4); color:#fff; border:none; transition:all 0.3s ease; }
.btn-primary:hover { opacity:0.88; transform:translateY(-2px); box-shadow:0 10px 28px rgba(59,130,246,0.38); }
.floating { animation: float 4s ease-in-out infinite; }
.tag { display:inline-block; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:500; }
.mobile-menu { animation: slideDown 0.25s ease; }

@media (max-width: 768px) {
  .card-hover:hover { transform: none; }
}
`;

/* ═══════════════════════════════════════════════
   THEMES
═══════════════════════════════════════════════ */
const themes = {
  dark: {
    bg: "#050d1a", bgCard: "rgba(255,255,255,0.04)", bgCardHover: "rgba(255,255,255,0.07)",
    border: "rgba(255,255,255,0.08)", borderHover: "rgba(59,130,246,0.5)",
    text: "#f1f5f9", muted: "#94a3b8", navBg: "rgba(5,13,26,0.92)",
  },
  light: {
    bg: "#f8fafc", bgCard: "#ffffff", bgCardHover: "#f1f5f9",
    border: "rgba(0,0,0,0.08)", borderHover: "rgba(59,130,246,0.5)",
    text: "#0f172a", muted: "#64748b", navBg: "rgba(248,250,252,0.95)",
  },
};

/* ═══════════════════════════════════════════════
   REUSABLE COMPONENTS
═══════════════════════════════════════════════ */
function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <div style={{ width: 28, height: 2, background: "linear-gradient(90deg,#3b82f6,#06b6d4)", borderRadius: 1 }} />
      <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#3b82f6" }}>
        {children}
      </span>
    </div>
  );
}

function SkillBar({ name, level, inView, delay = 0 }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setAnimated(true), delay);
      return () => clearTimeout(t);
    }
  }, [inView, delay]);
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
        <span style={{ fontWeight: 500 }}>{name}</span>
        <span style={{ color: "#3b82f6", fontWeight: 700, fontFamily: "'Syne',sans-serif" }}>{level}%</span>
      </div>
      <div style={{ height: 5, background: "rgba(148,163,184,0.15)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          width: animated ? `${level}%` : "0%", height: "100%",
          background: "linear-gradient(90deg,#3b82f6,#06b6d4)", borderRadius: 3,
          boxShadow: "0 0 8px rgba(59,130,246,0.4)",
          transition: animated ? `width 1.1s cubic-bezier(.22,1,.36,1) ${delay}ms` : "none",
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ project, t }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="card-hover"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? t.bgCardHover : t.bgCard,
        border: `1px solid ${hovered ? t.borderHover : t.border}`,
        borderRadius: 16, padding: "24px 22px", position: "relative",
        overflow: "hidden", height: "100%",
        boxShadow: hovered ? "0 16px 48px rgba(59,130,246,0.12)" : "none",
      }}>
      {project.featured && (
        <div style={{ position: "absolute", top: 16, right: 16 }}>
          <span className="tag" style={{ background: "rgba(59,130,246,0.12)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.25)" }}>⭐ Featured</span>
        </div>
      )}
      <div style={{ fontSize: 32, marginBottom: 12 }}>{project.emoji}</div>
      <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 10, paddingRight: project.featured ? 80 : 0 }}>
        {project.title}
      </h3>
      <p style={{ color: t.muted, fontSize: 13.5, lineHeight: 1.75, marginBottom: 18 }}>{project.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {project.tech.map(tech => (
          <span key={tech} className="tag" style={{ background: "rgba(6,182,212,0.08)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.2)" }}>{tech}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <a href={project.github} target="_blank" rel="noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: t.muted, textDecoration: "none" }}
          onMouseEnter={e => e.currentTarget.style.color = "#3b82f6"}
          onMouseLeave={e => e.currentTarget.style.color = t.muted}>
          <GithubIcon size={14} /> GitHub
        </a>
        <a href={project.live} target="_blank" rel="noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: t.muted, textDecoration: "none" }}
          onMouseEnter={e => e.currentTarget.style.color = "#06b6d4"}
          onMouseLeave={e => e.currentTarget.style.color = t.muted}>
          <FiExternalLink size={14} /> Live Demo
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════ */
function Navbar({ dark, setDark, t, activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const w = useWindowWidth();
  const isMobile = w < 768;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  const links = [
    { href: "#home", label: "Home" }, { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" }, { href: "#projects", label: "Projects" },
    { href: "#certifications", label: "Certs" }, { href: "#journey", label: "Journey" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: isMobile ? "13px 20px" : scrolled ? "14px 32px" : "20px 32px",
        background: scrolled || menuOpen ? t.navBg : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        borderBottom: scrolled || menuOpen ? `1px solid ${t.border}` : "none",
        transition: "all 0.3s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#home" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 18 : 22, color: t.text, textDecoration: "none" }}>
          Ayush<span style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>.dev</span>
        </a>

        {!isMobile && (
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {links.map(({ href, label }) => {
              const id = href.slice(1);
              return (
                <a key={href} href={href}
                  className={`nav-link${activeSection === id ? " active" : ""}`}
                  style={{ fontSize: 13.5, fontWeight: 600, color: activeSection === id ? "#3b82f6" : t.muted, textDecoration: "none", transition: "color 0.2s" }}>
                  {label}
                </a>
              );
            })}
          </div>
        )}

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setDark(!dark)} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, padding: "7px 9px", cursor: "pointer", color: t.muted, display: "flex", alignItems: "center" }}>
            {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          {!isMobile && (
            <a href="#contact" className="btn-primary" style={{ padding: "8px 18px", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: "pointer", textDecoration: "none" }}>
              Hire Me
            </a>
          )}
          {isMobile && (
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, padding: "7px 9px", cursor: "pointer", color: t.text, display: "flex", alignItems: "center" }}>
              {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          )}
        </div>
      </nav>

      {isMobile && menuOpen && (
        <div className="mobile-menu" style={{
          position: "fixed", top: 56, left: 0, right: 0, zIndex: 999,
          background: t.navBg, backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${t.border}`, padding: "12px 20px 20px",
        }}>
          {links.map(({ href, label }) => {
            const id = href.slice(1);
            return (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}
                style={{
                  display: "block", padding: "13px 0", fontSize: 15, fontWeight: 600,
                  color: activeSection === id ? "#3b82f6" : t.text, textDecoration: "none",
                  borderBottom: `1px solid ${t.border}`,
                }}>
                {label}
              </a>
            );
          })}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary"
            style={{ display: "block", textAlign: "center", marginTop: 16, padding: "12px", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
            Hire Me
          </a>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════ */
function Hero({ t, dark }) {
  const typed = useTypewriter(DATA.typewriterWords);
  const w = useWindowWidth();
  const isMobile = w < 768;

  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 80 }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: isMobile ? 280 : 600, height: isMobile ? 280 : 600, borderRadius: "50%", background: dark ? "radial-gradient(circle,rgba(59,130,246,0.12),transparent 70%)" : "radial-gradient(circle,rgba(59,130,246,0.07),transparent 70%)", top: "-10%", left: "-10%", animation: "blob1 18s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: isMobile ? 220 : 500, height: isMobile ? 220 : 500, borderRadius: "50%", background: dark ? "radial-gradient(circle,rgba(6,182,212,0.1),transparent 70%)" : "radial-gradient(circle,rgba(6,182,212,0.05),transparent 70%)", top: "30%", right: "-5%", animation: "blob2 22s ease-in-out infinite" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"} 1px,transparent 1px),linear-gradient(90deg,${dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"} 1px,transparent 1px)`, backgroundSize: isMobile ? "36px 36px" : "60px 60px" }} />
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 20px" : "0 32px", position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr auto", gap: isMobile ? 36 : 60, alignItems: "center" }}>

          <div className="fade-up">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 30, padding: "5px 14px", marginBottom: 22 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", animation: "pulseGreen 2s ease-in-out infinite" }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#10b981", letterSpacing: 1 }}>AVAILABLE FOR WORK</span>
            </div>

            <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 12, fontWeight: 600, color: "#3b82f6", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>Hello, I'm</p>

            <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(36px,10vw,52px)" : "clamp(44px,7vw,78px)", color: t.text, lineHeight: 1.05, marginBottom: 16 }}>
              {DATA.name}
            </h1>

            <div style={{ fontSize: isMobile ? "clamp(15px,4.5vw,20px)" : "clamp(18px,2.5vw,26px)", fontFamily: "'Syne',sans-serif", fontWeight: 600, marginBottom: 22, minHeight: "1.6em", display: "flex", alignItems: "center" }}>
              <span style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{typed}</span>
              <span className="cursor-blink" />
            </div>

            <p style={{ color: t.muted, fontSize: isMobile ? 14.5 : 16.5, lineHeight: 1.85, maxWidth: 520, marginBottom: 32 }}>
              Building robust web applications with the MERN stack — from authentication systems to real-time dashboards. Turning ideas into scalable, production-ready products.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <a href="#projects" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: isMobile ? "10px 20px" : "13px 26px", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                View Projects <FiArrowRight size={15} />
              </a>
              <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: isMobile ? "9px 18px" : "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", color: t.text, border: `1.5px solid ${t.border}`, transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#3b82f6"; e.currentTarget.style.color = "#3b82f6"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.text; }}>
                <FiDownload size={15} /> Download CV
              </a>
              <div style={{ display: "flex", gap: 8 }}>
                <a href={DATA.github} target="_blank" rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: 10, border: `1.5px solid ${t.border}`, color: t.muted, textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#3b82f6"; e.currentTarget.style.color = "#3b82f6"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.muted; }}>
                  <GithubIcon size={17} />
                </a>
                <a href={DATA.linkedin} target="_blank" rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: 10, border: `1.5px solid ${t.border}`, color: t.muted, textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#0ea5e9"; e.currentTarget.style.color = "#0ea5e9"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.muted; }}>
                  <FiLinkedin size={17} />
                </a>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 24, color: t.muted, fontSize: 13 }}>
              <FiMapPin size={13} /><span>{DATA.location}</span>
            </div>
          </div>

          {/* Stat cards */}
          <div className={isMobile ? "" : "floating"} style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(3,1fr)" : "1fr", gap: 10, minWidth: isMobile ? "auto" : 175 }}>
            {[
              { n: "3+", l: "Projects Built", icon: "💼" },
              { n: "MERN", l: "Stack Expert", icon: "⚡" },
              { n: "100%", l: "Passion Driven", icon: "🔥" },
            ].map(({ n, l, icon }) => (
              <div key={l} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: isMobile ? "12px 8px" : "20px 20px", backdropFilter: "blur(12px)", textAlign: "center" }}>
                <div style={{ fontSize: isMobile ? 16 : 22, marginBottom: 3 }}>{icon}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 16 : 24, background: "linear-gradient(135deg,#3b82f6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: isMobile ? 9.5 : 11.5, color: t.muted, marginTop: 3, fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!isMobile && (
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 10, color: t.muted, letterSpacing: 2, fontWeight: 600 }}>SCROLL</span>
          <div style={{ width: 1, height: 30, background: `linear-gradient(${t.muted},transparent)` }} />
        </div>
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════ */
function About({ t, dark }) {
  const [ref, inView] = useInView();
  const w = useWindowWidth();
  const isMobile = w < 768;

  return (
    <section id="about" ref={ref} style={{ padding: isMobile ? "70px 0" : "100px 0", background: dark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 20px" : "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 72, alignItems: "center" }}>

          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "all 0.7s ease" }}>
            <SectionLabel>About Me</SectionLabel>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(26px,7vw,38px)" : "clamp(30px,4vw,46px)", color: t.text, marginBottom: 20, lineHeight: 1.15 }}>
              Crafting Digital<br />
              <span style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Experiences</span>
            </h2>
            <p style={{ color: t.muted, lineHeight: 1.9, fontSize: 15, marginBottom: 16 }}>{DATA.bio}</p>
            <p style={{ color: t.muted, lineHeight: 1.9, fontSize: 15, marginBottom: 26 }}>
              My approach combines clean architecture with intuitive user experiences. Whether building a billing system, managing complex college workflows, or generating dynamic timetables — I focus on reliability and scalability.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["MERN Stack", "REST APIs", "Authentication", "Email Integration", "Dashboards"].map(tag => (
                <span key={tag} className="tag" style={{ background: "rgba(59,130,246,0.08)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.2)", padding: "5px 12px", fontSize: 12 }}>{tag}</span>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "all 0.7s ease 0.15s" }}>
            {[
              { icon: <FiCode size={20} />, title: "Frontend", desc: "React, HTML, CSS, JS", color: "#3b82f6" },
              { icon: <FiServer size={20} />, title: "Backend", desc: "Node.js, Express.js", color: "#06b6d4" },
              { icon: <FiDatabase size={20} />, title: "Database", desc: "MongoDB, Mongoose", color: "#10b981" },
              { icon: <FiGlobe size={20} />, title: "APIs", desc: "REST APIs, JWT Auth", color: "#f59e0b" },
              { icon: <FiTerminal size={20} />, title: "Tools", desc: "Git, GitHub, Postman", color: "#8b5cf6" },
              { icon: <FiCpu size={20} />, title: "Integrations", desc: "Nodemailer, 3rd-party", color: "#ec4899" },
            ].map(({ icon, title, desc, color }) => (
              <div key={title} className="card-hover" style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 12, padding: isMobile ? "14px 12px" : "18px 16px" }}>
                <div style={{ color, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, color: t.text, marginBottom: 3 }}>{title}</div>
                <div style={{ fontSize: 11.5, color: t.muted, lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════ */
function Skills({ t }) {
  const [ref, inView] = useInView(0.1);
  const w = useWindowWidth();
  const isMobile = w < 768;
  const categories = Object.entries(DATA.skills);
  const icons = { Frontend: <FiCode size={15} />, Backend: <FiServer size={15} />, Database: <FiDatabase size={15} />, Tools: <FiTerminal size={15} /> };
  const colors = { Frontend: "#3b82f6", Backend: "#06b6d4", Database: "#10b981", Tools: "#8b5cf6" };

  return (
    <section id="skills" ref={ref} style={{ padding: isMobile ? "70px 0" : "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 20px" : "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 56 }}>
          <SectionLabel>Skills</SectionLabel>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(26px,7vw,38px)" : "clamp(30px,4vw,46px)", color: t.text }}>
            Technical <span style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Arsenal</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 18 }}>
          {categories.map(([cat, skills], ci) => (
            <div key={cat} style={{
              background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "22px 20px",
              opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(18px)",
              transition: `all 0.55s ease ${ci * 0.1}s`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 9, background: `${colors[cat]}18`, color: colors[cat] }}>
                  {icons[cat]}
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: t.text }}>{cat}</h3>
              </div>
              {skills.map((s, si) => (
                <div key={s.name} style={{ color: t.text }}>
                  <SkillBar name={s.name} level={s.level} inView={inView} delay={ci * 100 + si * 80} />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: "center" }}>
          <p style={{ color: t.muted, fontSize: 12, marginBottom: 14, letterSpacing: 1, fontWeight: 600, textTransform: "uppercase" }}>Also familiar with</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {["Tailwind CSS", "Bootstrap", "Multer", "bcrypt.js", "dotenv", "CORS", "Axios", "React Router", "Context API", "Chart.js"].map(badge => (
              <span key={badge} className="tag" style={{ background: t.bgCard, border: `1px solid ${t.border}`, color: t.muted, padding: "6px 14px", fontSize: 12 }}>{badge}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════════ */
function Projects({ t, dark }) {
  const [ref, inView] = useInView(0.08);
  const [filter, setFilter] = useState("All");
  const w = useWindowWidth();
  const isMobile = w < 768;
  const categories = ["All", "Fullstack", "Backend", "Frontend"];
  const filtered = filter === "All" ? DATA.projects : DATA.projects.filter(p => p.category === filter);

  return (
    <section id="projects" ref={ref} style={{ padding: isMobile ? "70px 0" : "100px 0", background: dark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 20px" : "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 48 }}>
          <SectionLabel>Projects</SectionLabel>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(26px,7vw,38px)" : "clamp(30px,4vw,46px)", color: t.text, marginBottom: 12 }}>
            What I've <span style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Built</span>
          </h2>
          <p style={{ color: t.muted, fontSize: 15, maxWidth: 440, margin: "0 auto" }}>Real-world applications solving real problems.</p>
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 32, flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              padding: isMobile ? "7px 14px" : "9px 20px", borderRadius: 30, fontSize: 13, fontWeight: 600, cursor: "pointer",
              transition: "all 0.25s",
              background: filter === cat ? "linear-gradient(135deg,#3b82f6,#06b6d4)" : t.bgCard,
              color: filter === cat ? "#fff" : t.muted,
              boxShadow: filter === cat ? "0 5px 18px rgba(59,130,246,0.32)" : "none",
              border: filter === cat ? "none" : `1px solid ${t.border}`,
            }}>{cat}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
          {filtered.map((p, i) => (
            <div key={p.id} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(22px)", transition: `all 0.55s ease ${i * 0.1}s` }}>
              <ProjectCard project={p} t={t} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 36 }}>
          <a href={DATA.github} target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 22px", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", color: t.text, border: `1.5px solid ${t.border}`, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#3b82f6"; e.currentTarget.style.color = "#3b82f6"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.text; }}>
            <GithubIcon size={15} /> View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CERTIFICATIONS
═══════════════════════════════════════════════ */
function Certifications({ t }) {
  const [ref, inView] = useInView();
  const w = useWindowWidth();
  const isMobile = w < 768;

  return (
    <section id="certifications" ref={ref} style={{ padding: isMobile ? "70px 0" : "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 20px" : "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 52 }}>
          <SectionLabel>Certifications</SectionLabel>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(26px,7vw,38px)" : "clamp(30px,4vw,46px)", color: t.text }}>
            <span style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Credentials</span> & Badges
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill,minmax(230px,1fr))", gap: 14 }}>
          {DATA.certifications.map((cert, i) => (
            <div key={cert.title} className="card-hover" style={{
              background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: isMobile ? "18px 14px" : "22px 20px",
              opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(18px)",
              transition: `all 0.55s ease ${i * 0.1}s`,
            }}>
              <div style={{ fontSize: isMobile ? 26 : 30, marginBottom: 10 }}>{cert.icon}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 7 }}>
                <FiCheckCircle size={12} style={{ color: cert.color }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: cert.color, letterSpacing: 1, textTransform: "uppercase" }}>Verified</span>
              </div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: isMobile ? 12.5 : 14, color: t.text, marginBottom: 5, lineHeight: 1.4 }}>{cert.title}</h3>
              <p style={{ color: t.muted, fontSize: isMobile ? 11 : 12, marginBottom: 10 }}>{cert.issuer}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <FiCalendar size={11} style={{ color: t.muted }} />
                <span style={{ fontSize: 11.5, color: t.muted }}>{cert.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   JOURNEY
═══════════════════════════════════════════════ */
function Journey({ t, dark }) {
  const [ref, inView] = useInView(0.08);
  const w = useWindowWidth();
  const isMobile = w < 768;

  return (
    <section id="journey" ref={ref} style={{ padding: isMobile ? "70px 0" : "100px 0", background: dark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "0 20px" : "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 44 : 56 }}>
          <SectionLabel>Journey</SectionLabel>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(26px,7vw,38px)" : "clamp(30px,4vw,46px)", color: t.text }}>
            My <span style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Learning Path</span>
          </h2>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: isMobile ? 15 : 19, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg,#3b82f6,#06b6d4,transparent)", borderRadius: 1 }} />
          {DATA.timeline.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: isMobile ? 16 : 24, marginBottom: isMobile ? 24 : 32, opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-16px)", transition: `all 0.55s ease ${i * 0.1}s` }}>
              <div style={{ flexShrink: 0, width: isMobile ? 32 : 40, height: isMobile ? 32 : 40, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 14 : 17, boxShadow: "0 0 0 4px rgba(59,130,246,0.12)", position: "relative", zIndex: 1 }}>
                {item.icon}
              </div>
              <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 12, padding: isMobile ? "12px 14px" : "16px 18px", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 10, color: "#3b82f6", background: "rgba(59,130,246,0.1)", padding: "2px 8px", borderRadius: 20 }}>{item.year}</span>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: isMobile ? 13 : 15, color: t.text }}>{item.title}</h3>
                </div>
                <p style={{ color: t.muted, fontSize: isMobile ? 12.5 : 13.5, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════ */
function Contact({ t }) {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const w = useWindowWidth();
  const isMobile = w < 768;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: "", email: "", message: "" });
  };

  const inputStyle = {
    width: "100%", padding: "12px 14px", borderRadius: 10,
    background: t.bgCard, border: `1px solid ${t.border}`,
    color: t.text, fontSize: 14, fontFamily: "'Outfit',sans-serif",
    outline: "none", transition: "border-color 0.2s",
  };

  return (
    <section id="contact" ref={ref} style={{ padding: isMobile ? "70px 0" : "100px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 20px" : "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 36 : 56, alignItems: "start" }}>

          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(18px)", transition: "all 0.6s ease" }}>
            <SectionLabel>Contact</SectionLabel>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(26px,7vw,38px)" : "clamp(30px,4vw,46px)", color: t.text, marginBottom: 16, lineHeight: 1.15 }}>
              Let's <span style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Work Together</span>
            </h2>
            <p style={{ color: t.muted, lineHeight: 1.85, fontSize: 15, marginBottom: 28 }}>
              Have a project in mind or want to discuss opportunities? I'm open to freelance work, full-time roles, and interesting collaborations.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: <FiMail size={17} />, label: "Email", value: DATA.email, href: `mailto:${DATA.email}`, color: "#3b82f6" },
                { icon: <GithubIcon size={17} />, label: "GitHub", value: "iayushsharma05", href: DATA.github, color: "#10b981" },
                { icon: <FiLinkedin size={17} />, label: "LinkedIn", value: "iayushsharma05", href: DATA.linkedin, color: "#0ea5e9" },
              ].map(({ icon, label, value, href, color }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 15px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 12, textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = "none"; }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: `${color}18`, color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: 10, color: t.muted, fontWeight: 600, marginBottom: 1, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
                    <div style={{ fontSize: 13, color: t.text, fontWeight: 500 }}>{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(18px)", transition: "all 0.6s ease 0.15s" }}>
            <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 18, padding: isMobile ? "22px 18px" : "30px 26px" }}>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: t.text, marginBottom: 22 }}>Send a Message</h3>
              {sent && (
                <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 10, padding: "10px 14px", marginBottom: 16, color: "#10b981", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 7 }}>
                  <FiCheckCircle size={14} /> Message sent! I'll reply soon.
                </div>
              )}
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: t.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>Your Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="John Doe" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#3b82f6"}
                    onBlur={e => e.target.style.borderColor = t.border} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: t.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>Email Address</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="john@example.com" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#3b82f6"}
                    onBlur={e => e.target.style.borderColor = t.border} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: t.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>Message</label>
                  <textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required placeholder="Tell me about your project..." style={{ ...inputStyle, resize: "vertical", minHeight: 116 }}
                    onFocus={e => e.target.style.borderColor = "#3b82f6"}
                    onBlur={e => e.target.style.borderColor = t.border} />
                </div>
                <button type="submit" className="btn-primary" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "12px 22px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  <FiSend size={15} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════ */
function Footer({ t }) {
  const w = useWindowWidth();
  const isMobile = w < 768;

  return (
    <footer style={{ borderTop: `1px solid ${t.border}`, padding: isMobile ? "24px 20px" : "30px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: isMobile ? 14 : 18, textAlign: "center" }}>
        <div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, color: t.text, marginBottom: 2 }}>
            Ayush<span style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>.dev</span>
          </div>
          <div style={{ fontSize: 12, color: t.muted }}>Full Stack Developer · MERN Stack</div>
        </div>
        <div style={{ fontSize: 12, color: t.muted }}>
          © {new Date().getFullYear()} Ayush Sharma. Built with React & ❤️
        </div>
        <div style={{ display: "flex", gap: 9 }}>
          {[
            { icon: <GithubIcon size={16} />, href: DATA.github },
            { icon: <FiLinkedin size={16} />, href: DATA.linkedin },
            { icon: <FiMail size={16} />, href: `mailto:${DATA.email}` },
          ].map(({ icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 9, border: `1px solid ${t.border}`, color: t.muted, textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#3b82f6"; e.currentTarget.style.color = "#3b82f6"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.muted; }}>
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   SCROLL TO TOP + PROGRESS BAR
═══════════════════════════════════════════════ */
function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="btn-primary"
      style={{ position: "fixed", bottom: 22, right: 18, zIndex: 999, width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 6px 20px rgba(59,130,246,0.38)", border: "none" }}>
      <FiChevronUp size={18} />
    </button>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      setProgress((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, height: 3, background: "linear-gradient(90deg,#3b82f6,#06b6d4)", width: `${progress}%`, zIndex: 9999, transition: "width 0.1s linear", borderRadius: "0 2px 2px 0" }} />
  );
}

/* ═══════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════ */
export default function AyushPortfolio() {
  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const t = themes[dark ? "dark" : "light"];

  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "projects", "certifications", "journey", "contact"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.2 }
    );
    sectionIds.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: t.bg, color: t.text, minHeight: "100vh", fontFamily: "'Outfit',sans-serif", transition: "background 0.4s ease, color 0.3s ease" }}>
      <style>{GLOBAL_CSS}</style>
      <ScrollProgress />
      <Navbar dark={dark} setDark={setDark} t={t} activeSection={activeSection} />
      <Hero t={t} dark={dark} />
      <About t={t} dark={dark} />
      <Skills t={t} dark={dark} />
      <Projects t={t} dark={dark} />
      <Certifications t={t} dark={dark} />
      <Journey t={t} dark={dark} />
      <Contact t={t} dark={dark} />
      <Footer t={t} dark={dark} />
      <ScrollTop />
    </div>
  );
}
