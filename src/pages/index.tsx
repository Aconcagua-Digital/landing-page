'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';

// =========================================
// HOOK: Detección y cambio de idioma
// =========================================
function useLocale() {
  const [locale, setLocale] = useState<'es' | 'en'>('es');

  useEffect(() => {
    // 1. Revisamos si el usuario ya eligió un idioma antes
    const savedLocale = localStorage.getItem('aconcagua-lang') as 'es' | 'en' | null;
    if (savedLocale) {
      setLocale(savedLocale);
      return;
    }
    // 2. Si no, detectamos el del navegador
    const browserLang = navigator.language || navigator.languages?.[0] || 'es';
    setLocale(browserLang.toLowerCase().startsWith('en') ? 'en' : 'es');
  }, []);

  const toggleLocale = () => {
    setLocale((prev) => {
      const newLocale = prev === 'es' ? 'en' : 'es';
      localStorage.setItem('aconcagua-lang', newLocale);
      return newLocale;
    });
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return { locale, toggleLocale };
}

// =========================================
// CONTENIDO BILINGÜE - ACONCAGUA DIGITAL
// =========================================
const content = {
  es: {
    nav: { inicio: 'Inicio', nosotros: 'Nosotros', proceso: 'Metodología', servicios: 'Servicios', planes: 'Planes', proyectos: 'Casos' },
    availability: 'Disponibles para nuevos proyectos',
    hablemos: 'Agendar Asesoría',
    hero: {
      subtitle: 'Agencia de Desarrollo Web & Ecosistemas Digitales',
      description: 'Construimos infraestructura digital, automatización de datos y plataformas a medida para escalar las operaciones y ventas de tu empresa.',
      ctaProjects: 'Explorar Casos',
      ctaPricing: 'Ver Planes',
      ctaCall: 'Solicitar Presupuesto',
    },
    clientsLabel: 'Empresas que confían en nosotros',
    about: {
      title: 'Nosotros',
      p1: 'En Aconcagua Digital entendemos que el marketing y las operaciones comerciales tienen un techo si no están respaldados por la tecnología correcta.',
      p2: 'Somos el puente entre los objetivos de tu empresa y el entorno digital. Fusionamos desarrollo de software full-stack, automatización y análisis de datos para crear soluciones que impactan directamente en la rentabilidad de nuestros clientes.',
      p3: 'Ya sea desarrollando una plataforma web a medida para captar clientes corporativos, auditando el rendimiento con dashboards en tiempo real, o automatizando procesos manuales, construimos la infraestructura que tu negocio necesita para liderar su sector.',
      stats: [
        { value: 2, suffix: '', label: 'Sitios en Producción', href: undefined as string | undefined },
        { value: 500, suffix: '+', label: 'Usuarios Mensuales Impactados', href: undefined as string | undefined },
        { value: 1, suffix: '', label: 'Integración Meta CAPI en Producción', href: undefined as string | undefined },
        { value: 96, suffix: '', label: 'Lighthouse Performance (Móvil)', href: 'https://pagespeed.web.dev/analysis/https-aconcagua-digital-vercel-app/ktmxkpxvum?form_factor=mobile' as string | undefined },
      ],
    },
    process: {
      title: 'Nuestra Metodología',
      items: [
        {
          role: '1. Auditoría y Estrategia', company: 'Descubrimiento', time: 'Fase Inicial',
          desc: 'Analizamos el estado actual de tus activos digitales y flujos de trabajo. Identificamos cuellos de botella y diseñamos una arquitectura tecnológica alineada con tus objetivos comerciales.',
          color: 'bg-blue-500', timeColor: 'text-blue-400',
        },
        {
          role: '2. Desarrollo y Automatización', company: 'Ejecución Técnica', time: 'Fase Core',
          desc: 'Programamos a medida. Desde plataformas web de alto rendimiento orientadas a la conversión, hasta scripts en Python para integrar APIs y automatizar tus reportes de datos.',
          color: 'bg-orange-500', timeColor: 'text-orange-400',
        },
        {
          role: '3. Lanzamiento y Optimización', company: 'Escalabilidad', time: 'Mantenimiento',
          desc: 'Desplegamos el ecosistema digital, implementamos medición analítica avanzada (píxeles, dashboards de Power BI) y monitoreamos los KPIs para garantizar el retorno de inversión.',
          color: 'bg-green-500', timeColor: 'text-green-400',
        },
      ],
    },
    services: {
      title: 'Servicios Core',
      subtitle: 'Soluciones tecnológicas integrales para modernizar tu empresa.',
      items: [
        { title: 'Desarrollo Web Custom & Apps', desc: 'Sitios corporativos y plataformas B2B ultrarrápidas orientadas a la conversión. Desarrollo full-stack de sistemas internos para digitalizar operaciones operativas.' },
        { title: 'Data Analytics & Automatización', desc: 'Transformamos datos fragmentados en decisiones. Integración de APIs, automatización de reportes manuales y creación de dashboards dinámicos en Power BI.' },
        { title: 'Ingeniería de Conversión (Growth)', desc: 'Infraestructura para pauta digital de alto nivel. Configuración avanzada de seguimiento (Server-Side Tracking) y auditoría técnica de campañas para maximizar el ROI.' },
      ],
    },
    pricing: {
      title: 'Planes de Desarrollo',
      subtitle: 'Inversión transparente adaptada al momento de tu empresa.',
      contactCta: 'Cotizar Proyecto',
      badge: 'MÁS ELEGIDO',
      items: [
        {
          name: 'START',
          price: '400 - 600',
          desc: 'Presencia digital profesional. Ideal para profesionales y pequeñas empresas.',
          features: ['Diseño responsive (Hasta 5 secciones)', 'Formulario de contacto', 'Integración WhatsApp & Redes', 'Google Maps & SEO Básico', 'Google Analytics Básico'],
          highlight: false,
        },
        {
          name: 'BUSINESS',
          price: '800 - 1.200',
          desc: 'Presencia + Captación. Para PyMEs que necesitan convertir visitas en leads.',
          features: ['Todo lo de START', 'Hasta 8-10 páginas personalizadas', 'Meta Pixel + Eventos', 'Analytics Avanzado + Search Console', 'Captura y Base de Datos de Leads', 'Optimización técnica de velocidad'],
          highlight: true,
        },
        {
          name: 'PRO',
          price: '1.500 - 2.500',
          desc: 'Plataforma web empresarial. Procesos digitales y funcionalidades a medida.',
          features: ['Todo lo de BUSINESS', 'Backend personalizado + Base de Datos', 'Sistema de Login, Roles y Permisos', 'Panel Administrativo a medida', 'APIs, Integraciones & Emails Auto', 'Meta Conversions API + Docker Deploy'],
          highlight: false,
        },
        {
          name: 'ENTERPRISE',
          price: '3.000+',
          desc: 'Solución digital corporativa. Infraestructura y desarrollo específico.',
          features: ['Arquitectura web/catálogo a medida', 'Sistemas internos y Áreas privadas', 'Integración compleja con CRM / ERP', 'Automatizaciones de flujos de trabajo', 'Infraestructura Cloud & Monitoreo', 'Mantenimiento y Soporte SLA'],
          highlight: false,
        }
      ]
    },
    projects: {
      title: 'Casos de Éxito',
      subtitle: 'Proyectos donde la tecnología potenció el negocio.',
      viewCase: 'Ver detalles técnicos',
      liveSite: 'Ver en vivo',
      modal: { problema: 'Desafío del Negocio', accion: 'Solución Implementada', resultado: 'Impacto Comercial' },
      items: [
        {
          category: 'SOFTWARE & LOGÍSTICA', categoryColor: 'text-blue-400', title: 'Ticketing App & CMS a Medida',
          desc: 'Desarrollo end-to-end de un ecosistema para gestión y validación de entradas. Autenticación y escáner QR nativo en tiempo real.',
          tags: ['React Native', 'FastAPI', 'PostgreSQL'],
          problema: 'Los organizadores de eventos no tenían forma de validar entradas en tiempo real ni de evitar fraudes o duplicados en el ingreso masivo.',
          accion: 'Diseñamos y desarrollamos un ecosistema completo: app móvil con React Native para el staff, backend robusto en FastAPI, y base de datos PostgreSQL.',
          resultado: 'Un sistema autónomo en producción capaz de procesar cientos de escaneos por minuto sin fricción operativa.',
        },
        {
          category: 'INFRAESTRUCTURA WEB', categoryColor: 'text-yellow-400', title: 'Sentidos - Plataforma Corporativa',
          desc: 'Plataforma web para un centro de capacitación en seguridad vial: inscripciones, campus virtual y gestión de alumnos.',
          tags: ['Flask', 'Panel Admin', 'Campus Virtual'],
          image: '/case-sentidos.jpg',
          liveUrl: 'https://www.sentidosseguridadvial.com',
          problema: 'La empresa necesitaba digitalizar su oferta de servicios para competir por licitaciones y clientes corporativos de primer nivel, y agilizar la gestión de cientos de inscripciones mensuales.',
          accion: 'Desarrollamos una plataforma en producción con autenticación, panel administrativo y campus de capacitación, desplegada en DigitalOcean.',
          resultado: 'Hoy sostiene la operación de un centro que capacita a más de 500 choferes por mes, sin depender de planillas ni gestión manual.',
        },
        {
          category: 'TRACKING & DATA', categoryColor: 'text-green-400', title: 'Become The Director - Marca Personal',
          desc: 'Plataforma de marca personal para venta de sesiones y contenido digital, con tracking de conversiones a prueba de bloqueadores.',
          tags: ['Supabase', 'PostgreSQL', 'Meta Conversions API'],
          image: '/case-become-director.jpg',
          liveUrl: 'https://www.becomethedirector.com',
          problema: 'La marca necesitaba vender sesiones y contenido digital sin perder visibilidad sobre qué campañas de Meta realmente estaban generando ventas.',
          accion: 'Implementamos un backend en Supabase (PostgreSQL) y conectamos Meta Pixel junto con la Meta Conversions API, enviando los eventos de conversión también del lado del servidor.',
          resultado: 'Atribución de conversiones más confiable, resistente a bloqueadores de anuncios y a las restricciones de iOS.',
        },
      ],
    },
    faq: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Lo que suelen preguntarnos antes de arrancar un proyecto.',
      items: [
        {
          q: '¿Cuánto tarda el desarrollo de un sitio?',
          a: 'Depende del plan y el alcance. Te damos un cronograma estimado apenas definimos el proyecto en la primera llamada.',
        },
        {
          q: '¿El hosting está incluido?',
          a: 'Coordinamos el despliegue en la infraestructura que mejor se adapte a tu proyecto (Vercel, DigitalOcean, AWS) y te dejamos la documentación. Vos decidís si lo administrás internamente o seguimos dándote soporte.',
        },
        {
          q: '¿Qué pasa después del lanzamiento?',
          a: 'Incluimos un período de soporte post-lanzamiento para ajustes y corrección de errores. Para mantenimiento continuo, tenemos planes de soporte mensual.',
        },
        {
          q: '¿De quién es el código una vez terminado el proyecto?',
          a: 'Tuyo. Una vez abonado el proyecto, el código fuente y todos los accesos te pertenecen por completo.',
        },
        {
          q: '¿Puedo pedir cambios durante el desarrollo?',
          a: 'Sí, coordinamos rondas de revisión antes de la entrega final para ajustar lo que haga falta.',
        },
      ],
    },
    contact: {
      title: 'Iniciemos tu Proyecto',
      subtitle: 'Contanos sobre tu empresa y evaluemos cómo podemos escalar tus operaciones.',
      jobTitle: 'Desarrollo o Web a Medida',
      jobDesc: 'Sitios corporativos, plataformas o apps (Start, Business, Pro).',
      serviceTitle: 'Datos, APIs y Automatización',
      serviceDesc: 'Buscas optimizar procesos, integrar sistemas o crear dashboards.',
      back: '← Cambiar opción',
      nameLabel: 'Nombre y Empresa',
      namePlaceholder: 'Ej: Carlos Gómez - TechLogistics',
      jobMsgLabel: 'Describí el proyecto o plataforma',
      jobMsgPlaceholder: 'Ej: Necesitamos desarrollar un portal para nuestros clientes...',
      serviceMsgLabel: '¿Qué proceso buscás optimizar?',
      serviceMsgPlaceholder: 'Ej: Requerimos automatizar nuestros reportes semanales...',
      sendButton: 'Iniciar Conversación',
      waJobTemplate: (name: string, msg: string) => `Hola equipo de Aconcagua Digital! Soy ${name || '[nombre]'}. Nos interesa cotizar un desarrollo: ${msg || '[breve descripción]'}`,
      waServiceTemplate: (name: string, msg: string) => `Hola equipo de Aconcagua Digital! Soy ${name || '[nombre]'}. Buscamos ayuda con datos y automatización para nuestra empresa: ${msg || '[breve descripción]'}`,
    },
    techLabel: 'Stack Tecnológico & Partners',
  },
  en: {
    nav: { inicio: 'Home', nosotros: 'About Us', proceso: 'Methodology', servicios: 'Services', planes: 'Pricing', proyectos: 'Cases' },
    availability: 'Available for new partnerships',
    hablemos: "Book a Consultation",
    hero: {
      subtitle: 'Web Development & Digital Ecosystems Agency',
      description: 'We build digital infrastructure, automate data pipelines, and craft custom platforms to scale your business operations and sales.',
      ctaProjects: 'Explore Case Studies',
      ctaPricing: 'View Pricing',
      ctaCall: 'Request a Proposal',
    },
    clientsLabel: 'Trusted by innovative companies',
    about: {
      title: 'About Us',
      p1: 'At Aconcagua Digital, we understand that marketing and business operations have a ceiling if they are not backed by the right technology.',
      p2: 'We serve as the bridge between your business goals and the digital environment. We merge full-stack software development, automation, and data analytics to build solutions that directly impact our clients\' profitability.',
      p3: 'Whether it is developing a custom web platform to attract corporate clients, auditing performance with real-time dashboards, or automating manual workflows, we build the technical infrastructure your business needs to lead its industry.',
      stats: [
        { value: 2, suffix: '', label: 'Sites in Production', href: undefined as string | undefined },
        { value: 500, suffix: '+', label: 'Monthly Users Impacted', href: undefined as string | undefined },
        { value: 1, suffix: '', label: 'Live Meta CAPI Integration', href: undefined as string | undefined },
        { value: 96, suffix: '', label: 'Lighthouse Performance (Mobile)', href: 'https://pagespeed.web.dev/analysis/https-aconcagua-digital-vercel-app/ktmxkpxvum?form_factor=mobile' as string | undefined },
      ],
    },
    process: {
      title: 'Our Methodology',
      items: [
        {
          role: '1. Audit & Strategy', company: 'Discovery', time: 'Phase 1',
          desc: 'We analyze the current state of your digital assets and workflows. We identify bottlenecks and design a technological architecture aligned with your business goals.',
          color: 'bg-blue-500', timeColor: 'text-blue-400',
        },
        {
          role: '2. Development & Automation', company: 'Technical Execution', time: 'Phase 2',
          desc: 'We code custom solutions. From high-performance web platforms built for conversion, to Python scripts that integrate APIs and automate your data reporting.',
          color: 'bg-orange-500', timeColor: 'text-orange-400',
        },
        {
          role: '3. Launch & Optimization', company: 'Scalability', time: 'Ongoing',
          desc: 'We deploy the digital ecosystem, implement advanced analytics tracking (server-side, Power BI dashboards), and monitor KPIs to guarantee a strong ROI.',
          color: 'bg-green-500', timeColor: 'text-green-400',
        },
      ],
    },
    services: {
      title: 'Core Services',
      subtitle: 'Comprehensive technology solutions to modernize your company.',
      items: [
        { title: 'Custom Web & App Development', desc: 'Lightning-fast corporate websites and B2B platforms focused on conversion. Full-stack development of internal tools to digitize operations.' },
        { title: 'Data Analytics & Automation', desc: 'We turn fragmented data into actionable decisions. API integrations, manual reporting automation, and dynamic Power BI dashboard creation.' },
        { title: 'Conversion Engineering (Growth)', desc: 'High-level infrastructure for digital advertising. Advanced server-side tracking setup and technical campaign audits to maximize your ROI.' },
      ],
    },
    pricing: {
      title: 'Development Plans',
      subtitle: 'Transparent investment tailored to your business stage.',
      contactCta: 'Get a Quote',
      badge: 'MOST POPULAR',
      items: [
        {
          name: 'START',
          price: '400 - 600',
          desc: 'Professional digital presence. Ideal for independent professionals and small businesses.',
          features: ['Responsive design (Up to 5 sections)', 'Contact form', 'WhatsApp & Social Media integration', 'Google Maps & Basic SEO', 'Basic Google Analytics'],
          highlight: false,
        },
        {
          name: 'BUSINESS',
          price: '800 - 1,200',
          desc: 'Presence + Lead Generation. For SMBs needing to convert visitors into leads.',
          features: ['Everything in START', 'Up to 8-10 custom pages', 'Meta Pixel + Events setup', 'Advanced Analytics + Search Console', 'Lead Capture & Database', 'Technical speed optimization'],
          highlight: true,
        },
        {
          name: 'PRO',
          price: '1,500 - 2,500',
          desc: 'Corporate web platform. Digital processes and custom functionalities.',
          features: ['Everything in BUSINESS', 'Custom Backend + Database', 'Login System, Roles & Permissions', 'Custom Administrative Panel', 'APIs, Integrations & Auto Emails', 'Meta Conversions API + Docker Deploy'],
          highlight: false,
        },
        {
          name: 'ENTERPRISE',
          price: '3,000+',
          desc: 'Custom corporate digital solution. Tailored architecture and infrastructure.',
          features: ['Custom web/catalog architecture', 'Internal systems & Private areas', 'Complex CRM / ERP integrations', 'Workflow automations', 'Cloud Infrastructure & Monitoring', 'Ongoing SLA Support & Maintenance'],
          highlight: false,
        }
      ]
    },
    projects: {
      title: 'Case Studies',
      subtitle: 'Projects where technology drove business growth.',
      viewCase: 'View technical details',
      liveSite: 'View live site',
      modal: { problema: 'Business Challenge', accion: 'Implemented Solution', resultado: 'Commercial Impact' },
      items: [
        {
          category: 'SOFTWARE & LOGISTICS', categoryColor: 'text-blue-400', title: 'Custom Ticketing App & CMS',
          desc: 'End-to-end development of a ticket management ecosystem with real-time native QR scanning.',
          tags: ['React Native', 'FastAPI', 'PostgreSQL'],
          problema: 'Event organizers lacked a reliable way to validate tickets in real-time, leading to potential fraud and bottlenecks during mass entry.',
          accion: 'We designed a complete ecosystem: a React Native mobile app for staff, a robust FastAPI backend, and a PostgreSQL database.',
          resultado: 'An autonomous production system capable of processing hundreds of scans per minute with zero operational friction.',
        },
        {
          category: 'WEB INFRASTRUCTURE', categoryColor: 'text-yellow-400', title: 'Sentidos - Corporate Platform',
          desc: 'Web platform for a road safety training center: enrollment, virtual campus, and student management.',
          tags: ['Flask', 'Admin Panel', 'Virtual Campus'],
          image: '/case-sentidos.jpg',
          liveUrl: 'https://www.sentidosseguridadvial.com',
          problema: 'The company needed to digitize its service offerings to compete for high-level corporate tenders, and speed up handling hundreds of monthly enrollments.',
          accion: 'We built a production platform with authentication, an admin panel, and a training campus, deployed on DigitalOcean.',
          resultado: 'It now supports a center that trains more than 500 drivers a month, with no manual spreadsheets involved.',
        },
        {
          category: 'TRACKING & DATA', categoryColor: 'text-green-400', title: 'Become The Director - Personal Brand',
          desc: 'Personal-brand platform selling sessions and digital content, with conversion tracking built to survive ad blockers.',
          tags: ['Supabase', 'PostgreSQL', 'Meta Conversions API'],
          image: '/case-become-director.jpg',
          liveUrl: 'https://www.becomethedirector.com',
          problema: 'The brand needed to sell sessions and digital content without losing visibility into which Meta campaigns were actually driving sales.',
          accion: 'We built a Supabase (PostgreSQL) backend and connected Meta Pixel together with the Meta Conversions API, sending conversion events server-side as well.',
          resultado: 'More reliable conversion attribution, resistant to ad blockers and iOS tracking restrictions.',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'What clients usually ask before we kick off a project.',
      items: [
        {
          q: 'How long does building a site take?',
          a: 'It depends on the plan and scope. We give you an estimated timeline as soon as we scope the project on the first call.',
        },
        {
          q: 'Is hosting included?',
          a: "We handle deployment on whatever infrastructure fits your project best (Vercel, DigitalOcean, AWS) and hand over the documentation. You decide whether to manage it in-house or keep us on for support.",
        },
        {
          q: 'What happens after launch?',
          a: 'We include a post-launch support period for adjustments and bug fixes. For ongoing maintenance, we offer monthly support plans.',
        },
        {
          q: 'Who owns the code once the project is finished?',
          a: 'You do. Once the project is paid in full, the source code and all access credentials are entirely yours.',
        },
        {
          q: 'Can I request changes during development?',
          a: 'Yes, we schedule review rounds before final delivery to adjust anything that needs it.',
        },
      ],
    },
    contact: {
      title: "Let's Start Your Project",
      subtitle: "Tell us about your company and let's evaluate how we can scale your operations.",
      jobTitle: 'Custom Web & Software',
      jobDesc: 'Corporate sites, platforms or apps (Start, Business, Pro).',
      serviceTitle: 'Data, APIs & Automation',
      serviceDesc: 'You want to optimize workflows, integrate systems, or build dashboards.',
      back: '← Change option',
      nameLabel: 'Name and Company',
      namePlaceholder: 'E.g.: John Doe - TechLogistics',
      jobMsgLabel: 'Describe the project',
      jobMsgPlaceholder: "E.g.: We need to develop a B2B portal for our clients...",
      serviceMsgLabel: 'What process do you want to optimize?',
      serviceMsgPlaceholder: 'E.g.: We need to automate our weekly reports...',
      sendButton: 'Start Conversation',
      waJobTemplate: (name: string, msg: string) => `Hi Aconcagua Digital team! I'm ${name || '[name]'}. We are interested in a web project: ${msg || '[brief description]'}`,
      waServiceTemplate: (name: string, msg: string) => `Hi Aconcagua Digital team! I'm ${name || '[name]'}. We need help with data and automation: ${msg || '[brief description]'}`,
    },
    techLabel: 'Tech Stack & Partners',
  },
};

// =========================================
// COMPONENTE: Switch de Idioma
// =========================================
function LanguageToggle({ locale, onToggle }: { locale: 'es' | 'en'; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold transition-colors hover:bg-white/10"
      aria-label="Toggle language"
    >
      <span className={locale === 'es' ? 'text-white' : 'text-gray-500 transition-colors'}>ES</span>
      <span className="text-gray-500">/</span>
      <span className={locale === 'en' ? 'text-white' : 'text-gray-500 transition-colors'}>EN</span>
    </button>
  );
}

// =========================================
// COMPONENTE: Barra de progreso de scroll
// =========================================
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-[60]"
    />
  );
}

// =========================================
// COMPONENTE: Glow ambiental
// =========================================
function AmbientGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    let tx = 0, ty = 0, gx = 0, gy = 0;
    let rafId: number;

    function setTarget(x: number, y: number) {
      tx = x;
      ty = y;
    }

    function handleMouseMove(e: MouseEvent) {
      setTarget(e.clientX, e.clientY);
    }

    function handleTouchStart(e: TouchEvent) {
      const touch = e.touches[0];
      if (!touch) return;
      setTarget(touch.clientX, touch.clientY);
      gx = touch.clientX;
      gy = touch.clientY;
      setActive(true);
    }

    function handleTouchMove(e: TouchEvent) {
      const touch = e.touches[0];
      if (!touch) return;
      setTarget(touch.clientX, touch.clientY);
    }

    function handleTouchEnd() {
      setActive(false);
    }

    function loop() {
      gx += (tx - gx) * 0.08;
      gy += (ty - gy) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.left = gx + 'px';
        glowRef.current.style.top = gy + 'px';
      }
      rafId = requestAnimationFrame(loop);
    }

    if (isTouch) {
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });
      window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    } else {
      window.addEventListener('mousemove', handleMouseMove);
      setActive(true);
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className={`fixed w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-full pointer-events-none z-[1] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background:
          'radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0) 70%)',
      }}
    />
  );
}

// =========================================
// COMPONENTE: Card con spotlight
// =========================================
function SpotlightCard({
  children,
  className = '',
  contentClassName = '',
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  onClick?: () => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 80%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onClick={onClick}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`group relative overflow-hidden ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background }}
      />
      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </motion.div>
  );
}

// =========================================
// COMPONENTE: Botón magnético
// =========================================
function MagneticButton({
  children,
  className = '',
  href,
  target,
  rel,
  download,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  download?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.3;
    const y = (e.clientY - (top + height / 2)) * 0.3;
    setPos({ x, y });
  }

  function reset() {
    setPos({ x: 0, y: 0 });
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      download={download}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.96 }}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

// =========================================
// COMPONENTE: Div magnético
// =========================================
function MagneticDiv({
  children,
  className = '',
  strength = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * strength;
    const y = (e.clientY - (top + height / 2)) * strength;
    setPos({ x, y });
  }

  function reset() {
    setPos({ x: 0, y: 0 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// =========================================
// COMPONENTE: Texto que se "decodifica"
// =========================================
function DecodeText({ text, className = '' }: { text: string; className?: string }) {
  const CHARS = '!<>-_\\/[]{}—=+*^?#';
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<number | undefined>(undefined);

  function scramble() {
    let iteration = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((letter, index) => {
            if (letter === '_' || letter === ' ') return letter;
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      if (iteration >= text.length) clearInterval(intervalRef.current);
      iteration += 1 / 2;
    }, 28);
  }

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <motion.span
      onViewportEnter={() => scramble()}
      onViewportLeave={() => setDisplay(text)}
      viewport={{ once: false, amount: 0.8 }}
      className={className}
    >
      {display}
    </motion.span>
  );
}

// =========================================
// COMPONENTE: Título hero con reveal
// =========================================
function RevealWords({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-[0.18em] -mb-[0.18em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// =========================================
// COMPONENTE: Número que cuenta al entrar en viewport
// =========================================
function CountUp({
  value,
  suffix = '',
  duration = 1.4,
  className = '',
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  function animate() {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  return (
    <motion.span
      onViewportEnter={animate}
      viewport={{ once: true, amount: 0.8 }}
      className={className}
    >
      {display}
      {suffix}
    </motion.span>
  );
}

// =========================================
// COMPONENTE: Indicador de disponibilidad (ahora vive en el hero)
// =========================================
function AvailabilityIndicator({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs text-gray-300 font-medium whitespace-nowrap px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
      </span>
      {label}
    </div>
  );
}

// =========================================
// COMPONENTE: Nav links
// =========================================
const NAV_IDS = ['inicio', 'nosotros', 'proceso', 'servicios', 'planes', 'proyectos'] as const;

function NavLinks({ activeSection, labels }: { activeSection: string; labels: typeof content.es.nav }) {
  const links = [
    { id: 'inicio', label: labels.inicio },
    { id: 'nosotros', label: labels.nosotros },
    { id: 'proceso', label: labels.proceso },
    { id: 'servicios', label: labels.servicios },
    { id: 'planes', label: labels.planes },
    { id: 'proyectos', label: labels.proyectos },
  ];
  return (
    <nav className="hidden xl:flex items-center gap-1 text-sm font-medium bg-white/5 border border-white/10 rounded-full p-1">
      {links.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className={`relative px-3 py-2 rounded-full transition-colors duration-200 whitespace-nowrap ${
            activeSection === link.id ? 'text-black' : 'text-gray-400 hover:text-white'
          }`}
        >
          {activeSection === link.id && (
            <motion.span
              layoutId="navPill"
              className="absolute inset-0 bg-white rounded-full -z-10"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
          )}
          {link.label}
        </a>
      ))}
    </nav>
  );
}

// =========================================
// COMPONENTE: Menú mobile desplegable
// =========================================
function MobileMenu({
  open,
  onClose,
  labels,
  hablemos,
}: {
  open: boolean;
  onClose: () => void;
  labels: typeof content.es.nav;
  hablemos: string;
}) {
  const links = [
    { id: 'inicio', label: labels.inicio },
    { id: 'nosotros', label: labels.nosotros },
    { id: 'proceso', label: labels.proceso },
    { id: 'servicios', label: labels.servicios },
    { id: 'planes', label: labels.planes },
    { id: 'proyectos', label: labels.proyectos },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 xl:hidden"
          />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[80px] left-4 right-4 z-50 xl:hidden bg-[#0a0a0a] border border-white/10 rounded-2xl p-3 shadow-xl shadow-black/50"
          >
            <nav className="flex flex-col">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={onClose}
                  className="px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={onClose}
                className="mt-2 px-4 py-3 rounded-xl bg-white text-black font-bold text-center"
              >
                {hablemos}
              </a>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// =========================================
// COMPONENTE: Tira de logos de clientes
// =========================================
function ClientLogos({ label }: { label: string }) {
  const clients = [
    { name: 'Gracie Barra Córdoba', src: '/GracieBarra.png' },
    { name: 'Moto Eventos Córdoba', src: '/MEC.png' },
    { name: 'Aconcagua Comunicación y Marketing', src: '/Aconc.png' },
    { name: 'Conexión Real', src: '/Conex.png' },
    { name: 'Sentidos Seguridad Vial', src: '/Sentidos.png' },
  ];
  return (
    <section className="max-w-6xl mx-auto px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <DecodeText text={label} className="text-2xl md:text-3xl font-bold tracking-tight text-white" />
        <div className="h-1 w-16 bg-white rounded-full mx-auto mt-3"></div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10"
      >
        {clients.map((client) => (
          <MagneticDiv key={client.name} strength={0.25}>
            <img
              src={client.src}
              alt={client.name}
              title={client.name}
              className="h-32 md:h-56 w-auto object-contain opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300"
            />
          </MagneticDiv>
        ))}
      </motion.div>
    </section>
  );
}

type Project = {
  category: string;
  categoryColor: string;
  title: string;
  desc: string;
  tags: string[];
  problema: string;
  accion: string;
  resultado: string;
  image?: string;
  liveUrl?: string;
};

// =========================================
// COMPONENTE: Modal de case study
// =========================================
function ProjectModal({
  project,
  onClose,
  labels,
}: {
  project: Project | null;
  onClose: () => void;
  labels: typeof content.es.projects.modal;
}) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#0d0d0d] border border-gray-800 rounded-2xl p-8 md:p-10 max-h-[85vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              aria-label="Cerrar"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"></path></svg>
            </button>

            <div className={`text-sm font-bold mb-2 ${project.categoryColor}`}>{project.category}</div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors mb-6"
              >
                {project.liveUrl.replace(/^https?:\/\//, '')}
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path><path d="M15 3h6v6"></path><path d="M10 14L21 3"></path></svg>
              </a>
            )}

            {project.image && (
              <div className="rounded-xl overflow-hidden border border-gray-800 mb-6">
                <img src={project.image} alt={project.title} className="w-full h-auto" />
              </div>
            )}

            <div className="space-y-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">{labels.problema}</div>
                <p className="text-gray-300 leading-relaxed">{project.problema}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">{labels.accion}</div>
                <p className="text-gray-300 leading-relaxed">{project.accion}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">{labels.resultado}</div>
                <p className="text-gray-300 leading-relaxed">{project.resultado}</p>
              </div>
            </div>

            <div className="flex gap-2 text-xs text-gray-500 font-mono flex-wrap mt-8 pt-6 border-t border-gray-800">
              {project.tags.map((tag) => (
                <span key={tag} className="bg-black px-2 py-1 rounded border border-gray-800">{tag}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// =========================================
// COMPONENTE: Acordeón de FAQ
// =========================================
function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.q}
            className="rounded-xl border border-gray-800 bg-[#0d0d0d] overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 text-left px-6 py-4"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-white">{item.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 text-gray-500 text-xl leading-none"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// =========================================
// COMPONENTE: Formulario inteligente
// =========================================
function SmartContactForm({ t }: { t: typeof content.es.contact }) {
  const [type, setType] = useState<'trabajo' | 'servicio' | null>(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const waMessage =
    type === 'trabajo' ? t.waJobTemplate(name, message) : t.waServiceTemplate(name, message);

  const waHref = `https://wa.me/5493513867474?text=${encodeURIComponent(waMessage)}`;

  return (
    <section id="contacto" className="max-w-4xl mx-auto pt-28 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2"><DecodeText text={t.title} /></h3>
        <div className="h-1 w-20 bg-white rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-400 text-lg">{t.subtitle}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-6 md:p-10"
      >
        {!type ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setType('trabajo')}
              className="p-6 rounded-xl border border-gray-800 hover:border-white bg-[#111111] hover:bg-white/5 transition-all text-left"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gray-500 mb-3">
                <rect x="3" y="7" width="18" height="13" rx="2"></rect>
                <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                <path d="M3 12h18"></path>
              </svg>
              <div className="font-bold text-white mb-1">{t.jobTitle}</div>
              <div className="text-sm text-gray-500">{t.jobDesc}</div>
            </button>
            <button
              onClick={() => setType('servicio')}
              className="p-6 rounded-xl border border-gray-800 hover:border-white bg-[#111111] hover:bg-white/5 transition-all text-left"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gray-500 mb-3">
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"></path>
              </svg>
              <div className="font-bold text-white mb-1">{t.serviceTitle}</div>
              <div className="text-sm text-gray-500">{t.serviceDesc}</div>
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={() => setType(null)}
              className="text-sm text-gray-500 hover:text-white mb-6 flex items-center gap-1 transition-colors"
            >
              {t.back}
            </button>

            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">{t.nameLabel}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">
                  {type === 'trabajo' ? t.jobMsgLabel : t.serviceMsgLabel}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder={type === 'trabajo' ? t.jobMsgPlaceholder : t.serviceMsgPlaceholder}
                  className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <MagneticButton
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors text-center flex items-center justify-center gap-2"
              >
                {t.sendButton}
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState('inicio');
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, toggleLocale } = useLocale();
  const t = content[locale];

  useEffect(() => {
    document.title = `Aconcagua Digital | ${t.hero.subtitle}`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', t.hero.description);
  }, [t]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    function onScroll() {
      setNavScrolled(window.scrollY > 60);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 600], [0, 150]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const alreadyScrolled = sessionStorage.getItem('aconcagua-portfolio-loaded');
    if (!alreadyScrolled) {
      window.scrollTo(0, 0);
      sessionStorage.setItem('aconcagua-portfolio-loaded', '1');
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let lenis: any;
    let rafId: number;

    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  const techStack = [
    'Python', 'React Native', 'FastAPI', 'Next.js', 'PostgreSQL',
    'Power BI', 'Meta Ads', 'AWS', 'Vercel', 'Docker', 'Tailwind',
  ];

  return (
    <main className="min-h-screen w-full bg-[#050505] text-white font-sans overflow-hidden">
      <ScrollProgress />
      <AmbientGlow />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} labels={t.projects.modal} />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} labels={t.nav} hablemos={t.hablemos} />

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 flex justify-center px-4 pt-3 md:pt-4">
        <div
          className={`flex items-center justify-between gap-4 min-w-0 backdrop-blur-md bg-[#0a0a0a]/80 border border-white/10 rounded-full shadow-lg shadow-black/40 transition-all duration-500 ease-out ${
            navScrolled ? 'w-[94%] max-w-5xl h-14 px-5' : 'w-full max-w-6xl h-16 px-6'
          }`}
        >
          <a href="#inicio" className="text-2xl font-bold tracking-tighter text-white shrink-0">
            Aconcagua<span className="text-gray-500">.</span>
          </a>

          <NavLinks activeSection={activeSection} labels={t.nav} />

          {/* MENÚ DERECHO - DESKTOP */}
          <div className="hidden xl:flex items-center gap-4 shrink-0">
            <LanguageToggle locale={locale} onToggle={toggleLocale} />
            <MagneticButton
              href="#contacto"
              className="px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-colors whitespace-nowrap"
            >
              {t.hablemos}
            </MagneticButton>
          </div>

          {/* MENÚ DERECHO - MOBILE */}
          <div className="flex xl:hidden items-center gap-4 shrink-0">
            <LanguageToggle locale={locale} onToggle={toggleLocale} />
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="text-gray-400 hover:text-white relative w-7 h-7 flex items-center justify-center"
              aria-label="Menú"
              aria-expanded={mobileMenuOpen}
            >
              <motion.span
                animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 6 : 0 }}
                className="absolute w-6 h-0.5 bg-current rounded-full"
                style={{ top: '30%' }}
              />
              <motion.span
                animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                className="absolute w-6 h-0.5 bg-current rounded-full"
                style={{ top: '50%', marginTop: '-1px' }}
              />
              <motion.span
                animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -6 : 0 }}
                className="absolute w-6 h-0.5 bg-current rounded-full"
                style={{ bottom: '30%' }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 overflow-hidden">

        <motion.video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          style={{ y: videoY }}
          className="absolute top-0 left-0 w-full h-[120%] object-cover z-0 opacity-50"
        >
          <source src="/hero-drone.mp4" type="video/mp4" />
        </motion.video>

        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/40 to-[#050505] z-0"></div>

        <motion.div className="relative z-10 max-w-5xl mx-auto mt-10">
          <div className="mb-6 flex justify-center">
            <AvailabilityIndicator label={t.availability} />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 text-white drop-shadow-lg">
            <RevealWords text="Aconcagua Digital" />
          </h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-3xl text-gray-300 font-medium mb-4 drop-shadow-md"
          >
            {t.hero.subtitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="text-gray-400 max-w-2xl mx-auto mt-4 mb-10 text-lg drop-shadow"
          >
            {t.hero.description}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center"
        >
          <MagneticButton
            href="#planes"
            className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors text-center"
          >
            {t.hero.ctaPricing}
          </MagneticButton>

          <MagneticButton
            href="#contacto"
            className="px-8 py-3 border border-gray-400 text-white font-semibold rounded-full hover:border-white hover:bg-white/10 transition-colors text-center backdrop-blur-sm"
          >
            {t.hero.ctaCall}
          </MagneticButton>
        </motion.div>
      </section>

      {/* CLIENTES */}
      <ClientLogos label={t.clientsLabel} />

      {/* NOSOTROS */}
      <section id="nosotros" className="max-w-6xl mx-auto pt-28 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2"><DecodeText text={t.about.title} /></h3>
          <div className="h-1 w-20 bg-white rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 space-y-6 text-lg leading-relaxed"
          >
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {t.about.stats.map((stat) =>
              stat.href ? (
                <a key={stat.label} href={stat.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <SpotlightCard
                    contentClassName="flex flex-col items-center"
                    className="h-full p-6 bg-[#111111] border border-gray-800 rounded-2xl flex flex-col justify-center items-center text-center hover:border-gray-600 transition-colors"
                  >
                    <span className="text-3xl lg:text-4xl font-extrabold text-white mb-2">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
                  </SpotlightCard>
                </a>
              ) : (
                <SpotlightCard
                  key={stat.label}
                  contentClassName="flex flex-col items-center"
                  className="p-6 bg-[#111111] border border-gray-800 rounded-2xl flex flex-col justify-center items-center text-center"
                >
                  <span className="text-3xl lg:text-4xl font-extrabold text-white mb-2">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
                </SpotlightCard>
              )
            )}
          </motion.div>

        </div>
      </section>

      {/* METODOLOGÍA */}
      <section id="proceso" className="max-w-4xl mx-auto pt-28 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2"><DecodeText text={t.process.title} /></h3>
          <div className="h-1 w-20 bg-white rounded-full"></div>
        </motion.div>

        <div className="relative border-l border-gray-800 ml-3 md:ml-0">
          {t.process.items.map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              className="mb-12 ml-8 relative"
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.1 * (i + 1) + 0.1 }}
                className={`absolute -left-[41px] top-1 flex h-4 w-4 rounded-full ${item.color} ring-4 ring-[#050505]`}
              ></motion.span>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h4 className="text-xl font-bold text-white">{item.role}</h4>
                <time className={`text-sm font-mono mt-1 md:mt-0 ${item.timeColor}`}>{item.time}</time>
              </div>
              <div className="text-gray-300 font-medium mb-3">{item.company}</div>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="max-w-6xl mx-auto pt-28 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2"><DecodeText text={t.services.title} /></h3>
          <div className="h-1 w-20 bg-white rounded-full"></div>
          <p className="mt-4 text-gray-400 text-lg">{t.services.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.services.items.map((service) => (
            <SpotlightCard key={service.title} className="p-8 rounded-2xl bg-gradient-to-b from-[#111] to-black border border-gray-800">
              <h4 className="text-xl font-bold mb-3 text-white">{service.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
            </SpotlightCard>
          ))}

        </div>
      </section>

      {/* PLANES Y PRECIOS */}
      <section id="planes" className="max-w-7xl mx-auto pt-28 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2"><DecodeText text={t.pricing.title} /></h3>
          <div className="h-1 w-20 bg-white rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-400 text-lg">{t.pricing.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {t.pricing.items.map((plan) => (
            <div
              key={plan.name}
              className="relative flex h-full"
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-white text-black text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg">
                  {t.pricing.badge}
                </span>
              )}
              <SpotlightCard
                contentClassName="flex flex-col flex-1"
                className={`w-full p-8 rounded-2xl border flex flex-col h-full ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border-white shadow-[0_0_40px_rgba(255,255,255,0.15)]'
                    : 'bg-[#0a0a0a] border-gray-800'
                }`}
              >
                <h4 className={`text-2xl font-black mb-2 ${plan.highlight ? 'text-white' : 'text-gray-200'}`}>
                  {plan.name}
                </h4>
                <p className="text-gray-400 text-sm mb-6 min-h-[3.5rem]">{plan.desc}</p>

                <div className="mb-6 pb-6 border-b border-gray-800 flex items-baseline gap-2">
                  <span className="text-gray-500 font-medium text-sm">USD</span>
                  <span className="text-2xl lg:text-3xl font-extrabold text-white whitespace-nowrap tracking-tight">{plan.price}</span>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-300">
                      <svg className={`w-5 h-5 mr-3 shrink-0 ${plan.highlight ? 'text-white' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      {feat}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacto"
                  className="block w-full px-4 py-3 rounded-xl font-bold text-center transition-colors mt-auto border bg-[#1a1a1a] text-white border-gray-700 hover:bg-white hover:text-black hover:border-white"
                >
                  {t.pricing.contactCta}
                </a>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </section>

      {/* PROYECTOS (CASOS DE ÉXITO) */}
      <section id="proyectos" className="max-w-6xl mx-auto pt-28 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2"><DecodeText text={t.projects.title} /></h3>
          <div className="h-1 w-20 bg-white rounded-full"></div>
          <p className="mt-4 text-gray-400 text-lg">{t.projects.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.projects.items.map((project) => (
            <SpotlightCard
              key={project.title}
              onClick={() => setSelectedProject(project)}
              className="rounded-2xl bg-[#111111] border border-gray-800 hover:border-gray-500 transition-colors overflow-hidden"
            >
              {project.image && (
                <div className="bg-[#0a0a0a] border-b border-gray-800">
                  <div className="h-7 flex items-center gap-1.5 px-3 bg-[#1a1a1a]">
                    <span className="h-2 w-2 rounded-full bg-red-500/70" />
                    <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
                    <span className="h-2 w-2 rounded-full bg-green-500/70" />
                    {project.liveUrl && (
                      <span className="ml-2 text-[10px] text-gray-500 font-mono truncate">
                        {project.liveUrl.replace(/^https?:\/\//, '')}
                      </span>
                    )}
                  </div>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              )}
              <div className="p-6">
                <div className={`text-sm font-bold mb-2 ${project.categoryColor}`}>{project.category}</div>
                <h4 className="text-xl font-bold mb-3 text-white">{project.title}</h4>
                <p className="text-gray-400 text-sm mb-4">{project.desc}</p>
                <div className="flex gap-2 text-xs text-gray-500 font-mono flex-wrap mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-black px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-gray-500 flex items-center gap-1 group-hover:text-white transition-colors">
                    {t.projects.viewCase}
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
                  </div>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-semibold text-white hover:text-gray-300 flex items-center gap-1 shrink-0"
                    >
                      {t.projects.liveSite}
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path><path d="M15 3h6v6"></path><path d="M10 14L21 3"></path></svg>
                    </a>
                  )}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto pt-28 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2"><DecodeText text={t.faq.title} /></h3>
          <div className="h-1 w-20 bg-white rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-400 text-lg">{t.faq.subtitle}</p>
        </motion.div>

        <FAQAccordion items={t.faq.items} />
      </section>

      {/* CONTACTO */}
      <SmartContactForm t={t.contact} />

      {/* TECH STACK */}
      <section className="w-full py-24 border-t border-gray-900 mt-20">
        <h3 className="text-center text-gray-500 mb-8 text-sm tracking-widest uppercase">{t.techLabel}</h3>

        <div className="marquee-wrapper">
          <div className="marquee-inner">
            {techStack.map((tech, index) => (
              <span key={`tech-1-${index}`} className="text-3xl md:text-5xl font-bold text-gray-700 hover:text-white transition-colors cursor-default">
                {tech}
              </span>
            ))}
            {techStack.map((tech, index) => (
              <span key={`tech-2-${index}`} className="text-3xl md:text-5xl font-bold text-gray-700 hover:text-white transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}