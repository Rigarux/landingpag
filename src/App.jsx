import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle2, Mail, Phone, Briefcase, MapPin, UploadCloud, Image as ImageIcon, FileText, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Routes, Route, Link } from 'react-router-dom';
import CookieBanner from './CookieBanner';
import './index.css';
import './institucional.css';

// Animaciones estilo Emil Kowalski (Spring physics reales)
const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)', scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: "spring", stiffness: 120, damping: 14, mass: 1 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const springHover = {
  scale: 1.03,
  y: -4,
  transition: { type: "spring", stiffness: 400, damping: 12 }
};

const springTap = {
  scale: 0.96,
  y: 0,
  transition: { type: "spring", stiffness: 400, damping: 12 }
};

const Facebook = ({ size = 24 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const Twitter = ({ size = 24 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const Instagram = ({ size = 24 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const Linkedin = ({ size = 24 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const Youtube = ({ size = 24 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;

const serviciosList = [
  { 
    title: "Obras Civiles y Acabados", 
    desc: "Desarrollo de infraestructura, obra gris y acabados finales para proyectos residenciales y comerciales.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "Electricidad y Electromecánica", 
    desc: "Diseño, instalación y mantenimiento preventivo y correctivo de sistemas eléctricos de potencia y distribución.",
    img: "/electrical_systems.jpg"
  },
  { 
    title: "Ventanería, Aluminio y PVC", 
    desc: "Fabricación e instalación de sistemas de cerramiento arquitectónico en vidrio de alta seguridad y perfiles de última generación.",
    img: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "Estructuras Metálicas", 
    desc: "Diseño, soldadura y montaje de estructuras de alta resistencia para protección, techados e industria.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "Redes Estructuradas", 
    desc: "Conectividad y seguridad electrónica perimetral con tecnología IP de alta definición (fibra óptica y CCTV).",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "Audio, Iluminación y Pantallas LED", 
    desc: "Montaje, soporte logístico e ingeniería de sonido y video para eventos corporativos y masivos.",
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "Transporte de Carga y Logística", 
    desc: "Soluciones de movilidad seguras y puntuales para mercancías y equipos de trabajo a nivel nacional.",
    img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "Carpintería y Fontanería", 
    desc: "Servicios especializados de mantenimiento y soporte de soporte técnico operativo y automotriz.",
    img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80"
  }
];

function App() {
  const serviciosSliderRef = React.useRef(null);
  
  const scrollServicios = (dir) => {
    const slider = serviciosSliderRef.current;
    if (slider) {
      const amount = 340;
      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      
      if (dir === 'left') {
        if (slider.scrollLeft <= 0) {
          // Si está al inicio, saltar al final
          slider.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: -amount, behavior: 'smooth' });
        }
      } else {
        // Usamos un pequeño margen de 10px para evitar fallos por decimales
        if (slider.scrollLeft >= maxScrollLeft - 10) {
          // Si está al final, regresar al inicio
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: amount, behavior: 'smooth' });
        }
      }
    }
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [salary, setSalary] = useState('');

  const handleSalaryChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    if (!rawValue) {
      setSalary('');
      return;
    }
    const formatted = new Intl.NumberFormat('es-GT').format(rawValue);
    setSalary(`Q ${formatted}`);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (value.length > 0 && !emailRegex.test(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (emailError) return; // Prevenir envío si el correo está mal

    setIsSubmitting(true);
    setSubmitMessage('');

    const formData = new FormData(e.target);

    try {
      const response = await fetch('http://localhost:3001/api/apply', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setSubmitMessage('¡Aplicación enviada con éxito!');
        e.target.reset();
      } else {
        setSubmitMessage('Hubo un error al enviar tu solicitud.');
      }
    } catch (error) {
      setSubmitMessage('Error de conexión con el servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Navbar Anclado */}
      <div style={{ position: 'sticky', top: 0, width: '100%', zIndex: 100, display: 'flex', justifyContent: 'center' }}>
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          style={{
            width: '100%',
            padding: '1rem 5%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.8)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/logo.png"
              alt="DCH Multiservicios Logo"
              style={{ height: '32px', width: 'auto', filter: 'brightness(0)', opacity: 0.85 }}
            />
          </div>

          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link to="/" style={{ color: '#334155', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#000'} onMouseOut={(e) => e.target.style.color = '#334155'}>SOMOS DCH</Link>
            <a href="/#servicios" style={{ color: '#334155', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#000'} onMouseOut={(e) => e.target.style.color = '#334155'}>SERVICIOS</a>
            <a href="/#mision-vision" style={{ color: '#334155', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#000'} onMouseOut={(e) => e.target.style.color = '#334155'}>MISIÓN Y VISIÓN</a>
            <a href="/#nuestras-empresas" style={{ color: '#334155', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#000'} onMouseOut={(e) => e.target.style.color = '#334155'}>NUESTRAS EMPRESAS</a>
            <Link to="/aplicar" style={{ color: '#334155', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#000'} onMouseOut={(e) => e.target.style.color = '#334155'}>TRABAJA CON NOSOTROS</Link>
          </div>
        </motion.nav>
      </div>

      <Routes>
        <Route path="/" element={
          <>
            {/* Hero Section */}
            <section className="hero container">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                style={{ maxWidth: '850px' }}
              >
                <motion.h1 variants={fadeUp} style={{ marginBottom: '1.5rem' }}>
                  Multiservicios<span className="highlight">DCH</span>
                </motion.h1>
                <motion.p variants={fadeUp} style={{ marginBottom: '3.5rem', fontSize: '1.25rem', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
                  Entidad que integra en un solo proveedor soluciones técnicas, logísticas y operativas para el mantenimiento, remodelación y edificación de espacios One-Stop Shop.
                </motion.p>
                <motion.a
                  href="#servicios"
                  variants={fadeUp}
                  className="glass-button"
                  whileHover={springHover}
                  whileTap={springTap}
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                >
                  Conoce nuestros servicios <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                </motion.a>
              </motion.div>
            </section>

            {/* Secciones de Contenido */}
            <section className="section container" style={{ paddingTop: '2rem' }}>
              <div className="content-divisions-wrapper">

                {/* DIV SOMOS DCH (Estilo Referencia) */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                  className="content-div somos-dch"
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', marginBottom: '6rem', padding: '2rem 0' }}
                >
                  {/* Imagen Izquierda */}
                  <div style={{ flex: '1 1 400px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '90%', height: '110%', background: '#F1F5F9', borderRadius: '16px', zIndex: 0 }}></div>
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                      alt="Equipo DCH"
                      style={{ width: '100%', borderRadius: '8px', position: 'relative', zIndex: 1, boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                    />
                  </div>

                  {/* Contenido Derecha */}
                  <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 400, marginBottom: '1.5rem', letterSpacing: '-0.02em', color: '#1E293B', textAlign: 'left', marginInlineStart: 0, paddingLeft: 0, width: '100%' }}>Somos MultiserviciosDCH</h3>
                    <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '3rem', textAlign: 'justify', width: '100%' }}>
                      Somos una empresa de multiservicios dedicada al desarrollo, construcción, remodelación y mantenimiento de infraestructura residencial, comercial e industrial. Centralizamos todas las necesidades técnicas y operativas.
                    </p>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem', color: '#334155' }}>Alcance de Servicios</h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, textAlign: 'justify' }}>
                        Para que el mercado entienda claramente que abarca construcción, los servicios se agrupan en tres grandes pilares:
                      </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#1E293B' }}>Obras Civiles y Construcción</h4>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, textAlign: 'justify', margin: 0 }}>
                          Edificación desde cero, ampliaciones estructurales, cimentación, levantamiento de muros, techados y acabados principales.
                        </p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#1E293B' }}>Remodelación y Acabados</h4>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, textAlign: 'justify', margin: 0 }}>
                          Tablayeso (drywall), pintura, colocación de pisos (cerámica, porcelanato), carpintería y herrería.
                        </p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#1E293B' }}>Instalaciones y Mantenimiento</h4>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, textAlign: 'justify', margin: 0 }}>
                          Electricidad residencial e industrial, plomería, sistemas de aire acondicionado y mantenimiento preventivo/correctivo.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* DIV 1: Servicios que cubrimos (Estilo CMI "Lo nuevo") */}
                <motion.div
                  id="servicios"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                  className="content-div"
                  style={{ scrollMarginTop: '120px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 400 }}>
                      Nuestros servicios
                    </h3>
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                      <button 
                        onClick={() => scrollServicios('left')}
                        style={{ background: '#F8FAFC', border: '1px solid var(--border-color)', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1E293B', transition: 'all 0.2s' }}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#E2E8F0'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = '#F8FAFC'; }}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={() => scrollServicios('right')}
                        style={{ background: '#F8FAFC', border: '1px solid var(--border-color)', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1E293B', transition: 'all 0.2s' }}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#E2E8F0'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = '#F8FAFC'; }}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>

                  <div 
                    ref={serviciosSliderRef}
                    className="servicios-slider" 
                    style={{ 
                      display: 'flex', 
                      gap: '2rem', 
                      overflowX: 'auto', 
                      paddingBottom: '2rem',
                      scrollSnapType: 'x mandatory',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none'
                    }}
                  >
                    {serviciosList.map((srv, idx) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ y: -8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="servicio-card"
                        style={{ 
                          flex: '0 0 min(320px, 85vw)', 
                          scrollSnapAlign: 'start',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <img src={srv.img} alt={srv.title} className="servicio-img" style={{ height: '220px', objectFit: 'cover' }} />
                        <div className="servicio-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 600, color: '#1E293B' }}>{srv.title}</h4>
                          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.5, textAlign: 'justify', marginBottom: 0 }}>
                            {srv.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* DIV: Definición Institucional (Estilo CMI Sostenibilidad) */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                  className="content-div inst-section"
                  style={{ marginBottom: '6rem' }}
                >
                  <div className="inst-container">
                    {/* Capa de fondo 80% */}
                    <div className="inst-bg"></div>

                    <div className="inst-content-wrapper">
                      {/* Contenido Izquierdo */}
                      <div className="inst-left">
                        <h3>Definición Institucional</h3>
                        <p>
                          Multiservicios DCH es una empresa guatemalteca especializada en el desarrollo integral de proyectos de construcción, remodelación y mantenimiento técnico de infraestructura. Bajo un modelo operativo centralizado, unificamos soluciones en áreas críticas que van desde la obra civil y estructuras metálicas hasta sistemas eléctricos, redes y acabados profesionales, garantizando un control riguroso de calidad en cada etapa.
                        </p>
                        <div className="inst-btn">
                          NUESTRA FILOSOFÍA <ArrowRight size={14} style={{ marginLeft: '0.5rem' }} />
                        </div>
                      </div>

                      {/* Tarjetas Derechas (Misión y Visión) */}
                      <div className="inst-right">
                        <motion.div whileHover={{ y: -5 }} className="inst-card">
                          <h4>Misión</h4>
                          <p>
                            Proveer soluciones integrales de alta ingeniería y construcción para los sectores residencial, comercial e industrial a través de Multiservicios DCH. Nos dedicamos a simplificar la ejecución de proyectos complejos unificando disciplinas técnicas clave bajo un estándar estricto de puntualidad, transparencia técnica y un equipo calificado que asegura el valor de la inversión de nuestros clientes.
                          </p>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="inst-card">
                          <h4>Visión</h4>
                          <p>
                            Consolidar a Multiservicios DCH como el referente líder de multiservicios y soluciones constructivas en Guatemala, siendo reconocidos por la excelencia técnica de nuestras obras, la innovación en la gestión de servicios y la solidez de nuestras relaciones comerciales a largo plazo.
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Valores Corporativos */}
                  <div className="inst-valores">
                    <h4>Valores Corporativos</h4>
                    <div className="valores-grid">
                      <div className="valor-card">
                        <h5>Precisión e Integridad Técnica</h5>
                        <p>Ejecutamos cada disciplina en construcción y servicios con absoluta rigurosidad técnica para garantizar infraestructuras seguras y duraderas.</p>
                      </div>
                      <div className="valor-card">
                        <h5>Transparencia DCH</h5>
                        <p>Fomentamos relaciones honestas mediante presupuestos claros, cubicaciones exactas y el uso de materiales de alta calidad que respaldan la confianza del cliente.</p>
                      </div>
                      <div className="valor-card">
                        <h5>Eficiencia Multidisciplinaria</h5>
                        <p>Optimizamos los tiempos de ejecución al coordinar simultáneamente distintas áreas de trabajo especializadas sin perder el enfoque de detalle.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* DIV 2: Nuestras empresas (Estilo CMI "Nuestras marcas") */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                  className="content-div div-empresas"
                >
                  <div className="empresas-text">
                    <h3 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '1.5rem', fontWeight: 400 }}>
                      Nuestras empresas
                    </h3>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
                      Contamos con múltiples empresas para cubrir cada una de tus necesidades con cobertura a nivel nacional.
                    </p>
                    <motion.button
                      whileHover={springHover}
                      whileTap={springTap}
                      className="glass-button secondary"
                    >
                      CONOCER MÁS SOBRE DCH <ArrowRight size={16} />
                    </motion.button>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="featured-card"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                      alt="Edificio Corporativo"
                      className="featured-img"
                    />
                    <div style={{ padding: '2.5rem' }}>
                      <h4 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontWeight: 400 }}>Servicios DCH</h4>
                      <Link to="/servicios-dch" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        CONOCER MÁS <ArrowRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>

                {/* DIV 3: Trabaja con nosotros (Empleo) */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="content-div div-empleo"
                >
                  <div style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      background: 'rgba(255,255,255,0.1)',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '999px',
                      color: '#fff',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Briefcase size={16} /> SÉ PARTE DE NUESTRO EQUIPO
                    </div>
                    <h3 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', marginBottom: '1.5rem', fontWeight: 400, color: '#fff' }}>
                      Aplica ahora
                    </h3>
                    <p style={{ fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '2.5rem', color: '#A1A1AA' }}>
                      Forma parte de nuestro equipo, envíanos tu solicitud para formar parte de nuestra gran familia.
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <Link to="/aplicar" style={{ textDecoration: 'none' }}>
                        <motion.button
                          whileHover={springHover}
                          whileTap={springTap}
                          className="glass-button"
                          style={{ background: '#FFFFFF', color: '#000000', boxShadow: '0 8px 20px rgba(255,255,255,0.15)', textDecoration: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          Aplicar <ArrowRight size={18} />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          </>
        } />

        <Route path="/aplicar" element={
          <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: 'calc(100vh - 150px)' }}>

            {/* DIV 4: Formulario de Aplicación */}
            <motion.div
              id="formulario-aplicacion"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="content-div"
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                border: '1px solid var(--border-color)',
                width: '100%',
                maxWidth: '750px'
              }}
            >
              <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', fontWeight: 500, marginBottom: '0.5rem' }}>Envía tu solicitud</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.5, fontSize: '0.95rem' }}>
                  Completa el siguiente formulario para aplicar a nuestras vacantes. Nuestro equipo de recursos humanos evaluará tu perfil.
                </p>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }} onSubmit={handleApplySubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Nombre completo</label>
                      <input name="fullName" type="text" placeholder="Ej. Juan Pérez" required style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: '#F8FAFC', outline: 'none', fontFamily: 'inherit' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Correo electrónico</label>
                      <input
                        name="email"
                        type="email"
                        placeholder="juan@ejemplo.com"
                        required
                        value={email}
                        onChange={handleEmailChange}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          borderRadius: '12px',
                          border: emailError ? '1px solid #EF4444' : '1px solid var(--border-color)',
                          background: emailError ? '#FEF2F2' : '#F8FAFC',
                          outline: 'none',
                          fontFamily: 'inherit',
                          transition: 'all 0.2s ease'
                        }}
                      />
                      {emailError && (
                        <span style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.4rem', display: 'block', fontWeight: 500 }}>
                          Formato inválido. Debe incluir @, dominio y extensión (ej. .com)
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Área de trabajo</label>
                      <select name="area" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: '#F8FAFC', outline: 'none', color: 'var(--text-primary)', fontFamily: 'inherit', cursor: 'pointer' }}>
                        <option>Infraestructura y Construcción</option>
                        <option>Tecnología y Redes</option>
                        <option>Operaciones y Logística</option>
                        <option>Administrativo</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Disposición de horario</label>
                      <select name="schedule" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: '#F8FAFC', outline: 'none', color: 'var(--text-primary)', fontFamily: 'inherit', cursor: 'pointer' }}>
                        <option>Tiempo Completo</option>
                        <option>Medio Tiempo</option>
                        <option>Turnos Rotativos</option>
                        <option>Fines de Semana</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Pretensión salarial (Mensual)</label>
                      <input
                        name="salary"
                        type="text"
                        placeholder=""
                        value={salary}
                        onChange={handleSalaryChange}
                        style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: '#F8FAFC', outline: 'none', fontFamily: 'inherit' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Dirección de residencia</label>
                      <input name="address" type="text" placeholder="Ej. Ciudad de Guatemala" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: '#F8FAFC', outline: 'none', fontFamily: 'inherit' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Adjuntar Currículum (PDF/DOC)</label>
                      <label
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          padding: '1.5rem 1rem', borderRadius: '12px', border: '2px dashed var(--border-color)',
                          background: '#F8FAFC', cursor: 'pointer', transition: 'all 0.3s ease', textAlign: 'center'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent-mono)'; e.currentTarget.style.background = '#FFFFFF'; }}
                        onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.background = '#F8FAFC'; }}
                      >
                        <FileText size={28} color="var(--text-secondary)" style={{ marginBottom: '0.75rem' }} />
                        <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Haz clic para subir documento</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Máx. 5MB</span>
                        <input name="cv" type="file" accept=".pdf,.doc,.docx" required style={{ display: 'none' }} />
                      </label>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Adjuntar Fotografía</label>
                      <label
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          padding: '1.5rem 1rem', borderRadius: '12px', border: '2px dashed var(--border-color)',
                          background: '#F8FAFC', cursor: 'pointer', transition: 'all 0.3s ease', textAlign: 'center'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent-mono)'; e.currentTarget.style.background = '#FFFFFF'; }}
                        onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.background = '#F8FAFC'; }}
                      >
                        <ImageIcon size={28} color="var(--text-secondary)" style={{ marginBottom: '0.75rem' }} />
                        <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Haz clic para subir imagen</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>JPG o PNG (Máx. 3MB)</span>
                        <input name="photo" type="file" accept="image/*" required style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Mensaje o carta de presentación</label>
                    <textarea name="message" rows="4" placeholder="Háblanos brevemente sobre tu experiencia..." style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: '#F8FAFC', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}></textarea>
                  </div>

                  <motion.button
                    whileHover={springHover}
                    whileTap={springTap}
                    className="glass-button"
                    style={{ justifyContent: 'center', marginTop: '1rem', width: '100%', opacity: isSubmitting ? 0.7 : 1 }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar información'} <ArrowRight size={18} />
                  </motion.button>
                  {submitMessage && (
                    <p style={{ textAlign: 'center', color: submitMessage.includes('éxito') ? 'green' : 'red', fontWeight: 500, marginTop: '0.5rem' }}>
                      {submitMessage}
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        } />
      </Routes>

      {/* Footer Ampliado */}
      <footer className="expanded-footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <img
              src="/logo.png"
              alt="DCH Multiservicios Logo"
              className="footer-logo"
            />
            <p className="footer-desc">
              Entidad que integra en un solo proveedor soluciones técnicas, logísticas y operativas para el mantenimiento, remodelación y edificación de espacios One-Stop Shop.
            </p>
            <div className="footer-brand-links" style={{ display: 'flex', flexDirection: 'row', gap: '1.25rem', marginTop: '1.5rem' }}>
              <a href="#" style={{ color: '#FFFFFF', transition: 'color 0.2s', opacity: 0.8 }} onMouseOver={(e) => e.currentTarget.style.opacity = 1} onMouseOut={(e) => e.currentTarget.style.opacity = 0.8}><Facebook size={22} /></a>
              <a href="#" style={{ color: '#FFFFFF', transition: 'color 0.2s', opacity: 0.8 }} onMouseOver={(e) => e.currentTarget.style.opacity = 1} onMouseOut={(e) => e.currentTarget.style.opacity = 0.8}><Twitter size={22} /></a>
              <a href="#" style={{ color: '#FFFFFF', transition: 'color 0.2s', opacity: 0.8 }} onMouseOver={(e) => e.currentTarget.style.opacity = 1} onMouseOut={(e) => e.currentTarget.style.opacity = 0.8}><Instagram size={22} /></a>
              <a href="#" style={{ color: '#FFFFFF', transition: 'color 0.2s', opacity: 0.8 }} onMouseOver={(e) => e.currentTarget.style.opacity = 1} onMouseOut={(e) => e.currentTarget.style.opacity = 0.8}><Linkedin size={22} /></a>
              <a href="#" style={{ color: '#FFFFFF', transition: 'color 0.2s', opacity: 0.8 }} onMouseOver={(e) => e.currentTarget.style.opacity = 1} onMouseOut={(e) => e.currentTarget.style.opacity = 0.8}><Youtube size={22} /></a>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-link-col">
              <h4 style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '1rem', textTransform: 'uppercase' }}>Contacto</h4>
              <span style={{ color: '#FFFFFF', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>rrhh@multiserviciosdch.com</span>
              <span style={{ color: '#FFFFFF', fontSize: '0.85rem', display: 'block' }}>+502 3565 6886</span>
            </div>
            <div className="footer-link-col">
              <motion.a whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300, damping: 15 }} href="#" className="footer-link">POLÍTICA DE COOKIES</motion.a>
              <motion.a whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300, damping: 15 }} href="#" className="footer-link">POLÍTICA DE PRIVACIDAD</motion.a>
              <motion.a whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300, damping: 15 }} href="#" className="footer-link">TÉRMINOS DE USO</motion.a>
            </div>
          </div>
        </div>
      </footer>
      <CookieBanner />
    </>
  );
}

export default App;
