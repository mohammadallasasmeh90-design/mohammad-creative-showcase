import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  Atom,
  Beaker,
  BookOpen,
  Brain,
  ChevronDown,
  Clapperboard,
  Code2,
  ExternalLink,
  Film,
  FlaskConical,
  Gamepad2,
  Lightbulb,
  Menu,
  Play,
  Sparkles,
  Trophy,
  X,
  Zap,
} from "lucide-react";

type ProjectCategory = "الكل" | "تجارب" | "ألعاب" | "مرئيات" | "صوت";

type Project = {
  id: string;
  category: Exclude<ProjectCategory, "الكل">;
  title: string;
  description: string;
  label: string;
  accent: string;
  image?: string;
  video?: string;
  icon: typeof Atom;
};

const projects: Project[] = [
  {
    id: "cabinet",
    category: "مرئيات",
    title: "الخزانة الذكية",
    description: "فكرة منتج ذكي تبدأ من سؤال بسيط: كيف نجعل الأشياء اليومية أكثر وعيًا وسلاسة؟",
    label: "تصميم + فيديو",
    accent: "coral",
    image: "/manus-storage/smart-cabinet_d7433183.png",
    video: "/manus-storage/smart-cabinet_fb4e38f1.mp4",
    icon: Zap,
  },
  {
    id: "gravity",
    category: "تجارب",
    title: "الجاذبية ببساطة",
    description: "تجربة تفاعلية تقرّب مفهومًا فيزيائيًا معقدًا إلى عين الطالب ويده، لا إلى ذاكرته فقط.",
    label: "تجربة علمية",
    accent: "blue",
    video: "/manus-storage/physics-explainer_12d8104e.mp4",
    icon: Atom,
  },
  {
    id: "bee",
    category: "مرئيات",
    title: "رحلة النحلة",
    description: "سرد بصري لدورة الحياة، يحوّل المعلومة إلى رحلة قصيرة بإيقاع واضح وشخصية محبوبة.",
    label: "فيديو تعليمي",
    accent: "gold",
    video: "/manus-storage/bee-lifecycle_b5a655bd.mp4",
    icon: Film,
  },
  {
    id: "brain",
    category: "ألعاب",
    title: "مختبر الذكاء",
    description: "لعبة خفيفة تجعل التفكير نشاطًا ممتعًا، وتفتح مساحة للتجربة والمحاولة دون خوف من الخطأ.",
    label: "لعبة تفاعلية",
    accent: "violet",
    image: "/manus-storage/explainer-character_a5fee8aa.jpg",
    icon: Brain,
  },
  {
    id: "visual-01",
    category: "مرئيات",
    title: "بدايات بصرية",
    description: "تمارين تركيب وصورة ولون تشكل أرشيفًا بصريًا يثبت أن كل فكرة عظيمة تبدأ بمحاولة.",
    label: "تمرين إبداعي",
    accent: "lime",
    image: "/manus-storage/exercise-one_b66de397.jpg",
    icon: Clapperboard,
  },
  {
    id: "visual-02",
    category: "صوت",
    title: "الصوت كقصة",
    description: "تجارب صوتية تمزج الحوار والمؤثرات والبيئة لتضيف طبقة شعورية كاملة إلى المحتوى.",
    label: "تجربة صوتية",
    accent: "pink",
    image: "/manus-storage/exercise-two_e014028f.jpg",
    icon: BookOpen,
  },
];

const filters: ProjectCategory[] = ["الكل", "تجارب", "ألعاب", "مرئيات", "صوت"];

function BrandMark() {
  return (
    <div className="brand-mark" aria-label="مختبر الإبداع الرقمي">
      <span className="brand-mark__shape"><Sparkles size={16} strokeWidth={2.5} /></span>
      <span className="brand-mark__copy">
        <strong>مُختبر</strong>
        <small>الإبداع الرقمي</small>
      </span>
    </div>
  );
}

function SectionKicker({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`section-kicker ${light ? "section-kicker--light" : ""}`}><span />{children}</span>;
}

function Home() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("الكل");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleProjects = useMemo(
    () => activeFilter === "الكل" ? projects : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main dir="rtl" className="site-shell">
      <header className="topbar">
        <div className="topbar__inner">
          <button className="mobile-menu" onClick={() => setMenuOpen((value) => !value)} aria-label="فتح القائمة">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <BrandMark />
          <nav className={`main-nav ${menuOpen ? "main-nav--open" : ""}`}>
            <button onClick={() => scrollTo("home")}>الرئيسية</button>
            <button onClick={() => scrollTo("work")}>المشاريع</button>
            <button onClick={() => scrollTo("method")}>المنهجية</button>
            <button onClick={() => scrollTo("about")}>عن المختبر</button>
          </nav>
          <button className="topbar__cta" onClick={() => scrollTo("contact")}>لنتعاون <ArrowUpLeft size={15} /></button>
        </div>
      </header>

      <section id="home" className="hero-section">
        <div className="hero-grid" />
        <div className="hero-orbit hero-orbit--one" />
        <div className="hero-orbit hero-orbit--two" />
        <div className="hero-content container">
          <div className="hero-copy">
            <SectionKicker light>ملف أعمال 2026 · عمّان</SectionKicker>
            <h1>حين يصبح <em>التعلّم</em><br />تجربة تُحكى.</h1>
            <p className="hero-lede">مساحة رقمية تجمع الفضول، التصميم، والتقنية في مشاريع تنبض بالحياة — من لعبة ذكية إلى تجربة علمية لا تُنسى.</p>
            <div className="hero-actions">
              <button className="button button--primary" onClick={() => scrollTo("work")}>اكتشف المشاريع <ArrowLeft size={18} /></button>
              <button className="text-link text-link--light" onClick={() => scrollTo("method")}>كيف نصنع الأثر؟ <span>↙</span></button>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>م</span><span>✦</span><span>ت</span>
              </div>
              <p><strong>6 مسارات إبداعية</strong><br /><span>وكلها تبدأ بسؤال جيد</span></p>
            </div>
          </div>
          <div className="hero-visual" aria-label="واجهة الخزانة الذكية">
            <div className="hero-visual__glow" />
            <div className="hero-card hero-card--main">
              <div className="hero-card__topline"><span>01 / 06</span><span>فكرة تتحرك</span></div>
              <div className="hero-card__image-wrap">
                <img src="/manus-storage/smart-cabinet_d7433183.png" alt="الخزانة الذكية" />
                <div className="image-overlay" />
                <div className="hero-card__caption"><small>مشروع مختار</small><strong>الخزانة الذكية</strong></div>
              </div>
            </div>
            <div className="floating-chip floating-chip--top"><Sparkles size={15} /><span>محتوى ينبض</span></div>
            <div className="floating-chip floating-chip--bottom"><span className="pulse-dot" /> جاهز للاستكشاف</div>
            <div className="hero-stamp"><span>CREATE</span><strong>✳</strong><span>WITH PURPOSE</span></div>
          </div>
        </div>
        <div className="hero-scroll"><span>مرّر للاستكشاف</span><ChevronDown size={17} /></div>
      </section>

      <section className="statement-section" id="about">
        <div className="container statement-grid">
          <div><SectionKicker>الفكرة في سطر</SectionKicker></div>
          <div className="statement-copy">
            <h2>نصمّم لحظة <span>«آه!»</span><br />في عقل المتعلّم.</h2>
            <p>لأن أفضل المحتوى لا يكتفي بأن يُفهم؛ بل يجعل صاحبه يرغب في أن يجرّب، يشارك، ويعود إليه مرة أخرى.</p>
          </div>
          <div className="statement-note"><span>لماذا؟</span><strong>لأن الفضول<br />أقوى من الحفظ.</strong></div>
        </div>
      </section>

      <section id="work" className="work-section">
        <div className="container">
          <div className="section-heading">
            <div><SectionKicker>من داخل المختبر</SectionKicker><h2>أعمال تُرى.<br /><em>أفكار تُحس.</em></h2></div>
            <div className="section-heading__side"><p>مجموعة مختارة من التمارين والتجارب والقصص التي تصنع جسرًا بين المعرفة والخيال.</p><span className="project-count">06 <small>مشاريع</small></span></div>
          </div>
          <div className="filter-row" role="tablist" aria-label="تصفية المشاريع">
            {filters.map((filter) => <button key={filter} className={activeFilter === filter ? "is-active" : ""} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
          </div>
          <div className="project-grid">
            {visibleProjects.map((project, index) => {
              const Icon = project.icon;
              return <article className={`project-card project-card--${project.accent} ${index === 0 ? "project-card--featured" : ""}`} key={project.id} onClick={() => setSelectedProject(project)}>
                <div className="project-card__media">
                  {project.video ? <video src={project.video} muted loop autoPlay playsInline poster={project.image} /> : <img src={project.image} alt={project.title} />}
                  <div className="project-card__veil" />
                  <span className="project-card__number">0{index + 1}</span>
                  <button className="project-card__play" aria-label={`عرض ${project.title}`}><Play size={16} fill="currentColor" /></button>
                  <span className="project-card__type"><Icon size={14} />{project.label}</span>
                </div>
                <div className="project-card__body"><h3>{project.title}</h3><p>{project.description}</p><span className="project-card__more">استكشف المشروع <ArrowLeft size={15} /></span></div>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section id="method" className="method-section">
        <div className="container method-grid">
          <div className="method-intro"><SectionKicker light>كيف نشتغل</SectionKicker><h2>من شرارة<br /><em>إلى أثر.</em></h2><p>كل مشروع هنا مرّ برحلة صغيرة. نبدأ من فضول حقيقي، وننتهي بتجربة تجعل الفكرة قابلة للرؤية واللمس والمشاركة.</p><button className="text-link text-link--light" onClick={() => scrollTo("contact")}>ابدأ بفكرة <ArrowLeft size={16} /></button></div>
          <div className="method-steps">
            <div className="method-step"><span>01</span><div><Lightbulb size={22} /><h3>نصغي للسؤال</h3><p>نبحث عن الفكرة التي تستحق أن تتحول إلى تجربة.</p></div></div>
            <div className="method-step"><span>02</span><div><Beaker size={22} /><h3>نجرّب بلا خوف</h3><p>نحوّل المفهوم إلى نموذج مرئي، ملموس، وقابل للتطوير.</p></div></div>
            <div className="method-step"><span>03</span><div><Trophy size={22} /><h3>نصنع لحظة الأثر</h3><p>نصقل التفاصيل حتى تصبح التجربة سهلة التذكر وصعبة النسيان.</p></div></div>
          </div>
        </div>
      </section>

      <section className="numbers-section">
        <div className="container numbers-grid">
          <div className="numbers-intro"><SectionKicker>بالأرقام، تقريبًا</SectionKicker><p>الأرقام لا تحكي القصة كاملة، لكنها تذكّرنا أن التجربة حين تُصنع بحب تصل أبعد.</p></div>
          <div className="number-item"><strong>06</strong><span>مسارات إبداعية</span></div>
          <div className="number-item"><strong>04</strong><span>تجارب تفاعلية</span></div>
          <div className="number-item"><strong>∞</strong><span>مساحة للخيال</span></div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-pattern" />
        <div className="container contact-inner">
          <SectionKicker light>هل لديك سؤال جديد؟</SectionKicker>
          <h2>لنصنع له<br /><em>تجربة تستحق.</em></h2>
          <button className="button button--light" onClick={() => window.alert("شكرًا! هذه المساحة جاهزة لفكرة التعاون القادمة.")}>افتح مساحة للحوار <ArrowLeft size={18} /></button>
          <div className="contact-footer"><BrandMark /><span>مختبر الإبداع الرقمي · 2026</span><a href="#home">العودة للأعلى ↑</a></div>
        </div>
      </section>

      {selectedProject && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={selectedProject.title} onClick={() => setSelectedProject(null)}>
        <div className="project-modal" onClick={(event) => event.stopPropagation()}>
          <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="إغلاق"><X size={20} /></button>
          <div className="project-modal__media">{selectedProject.video ? <video src={selectedProject.video} controls autoPlay playsInline poster={selectedProject.image} /> : <img src={selectedProject.image} alt={selectedProject.title} />}</div>
          <div className="project-modal__copy"><SectionKicker>{selectedProject.label}</SectionKicker><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><span className="modal-note"><Code2 size={15} /> فكرة مصممة لتُفهم بالتجربة</span></div>
        </div>
      </div>}
    </main>
  );
}

export default Home;
