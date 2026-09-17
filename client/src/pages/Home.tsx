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
  GraduationCap,
  Mail,
  MapPin,
  Lightbulb,
  Menu,
  Phone,
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
  sourceUrl: string;
  sourceLabel: string;
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
    sourceUrl: "https://drive.google.com/file/d/1huhd6D01jccDNvBuX1NOMLvqAL5GguE5/view",
    sourceLabel: "فتح فيديو الخزانة الذكية في Drive",
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
    sourceUrl: "https://drive.google.com/file/d/1tAnG7hz9K5VS-jTslHK2S6FA9kIl-q8o/view",
    sourceLabel: "فتح تجربة الجاذبية التفاعلية",
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
    sourceUrl: "https://drive.google.com/file/d/1aJsvgePBQN-DgC7yZ6iD4yw_TQWYqKbN/view",
    sourceLabel: "فتح فيديو دورة حياة النحلة",
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
    sourceUrl: "https://drive.google.com/file/d/1aiBSigTjF8OC-y9ho_WC66oEo4k8as78/view",
    sourceLabel: "تشغيل لعبة الذكاء",
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
    sourceUrl: "https://drive.google.com/file/d/1vU-YND9f7fDDzEju1TVnZ98v-5VVVWAz/view",
    sourceLabel: "فتح الصورة الأصلية",
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
    sourceUrl: "https://drive.google.com/file/d/1oJKhwo-HJHG0zDjuniHERAdsNxfvTEgo/view",
    sourceLabel: "فتح الصورة الأصلية",
    icon: BookOpen,
  },
];

const filters: ProjectCategory[] = ["الكل", "تجارب", "ألعاب", "مرئيات", "صوت"];

const resources = [
  { kind: "لعبة", title: "مغامرة الحروف — تشغيل مباشر", url: "https://drive.google.com/file/d/1Jyjhiu0YIVp3a66NFbSS2Nbd6ppsSI-z/view", path: "/games/letters-adventure.html", icon: Gamepad2 },
  { kind: "لعبة", title: "لعبة الذكاء / الواجب", url: "https://drive.google.com/file/d/1aiBSigTjF8OC-y9ho_WC66oEo4k8as78/view", path: "/games/letters-adventure.html", icon: Brain },
  { kind: "لعبة", title: "Neon Bomberman — تشغيل مباشر", url: "https://drive.google.com/file/d/1S7PAvxbvQvCLYZ6Gy-rtMFSNnh5z2IIl/view", path: "/games/neon-bomberman.html", icon: Gamepad2 },
  { kind: "تجربة", title: "مختبر علوم النجارة — تشغيل مباشر", url: "https://drive.google.com/file/d/1jjxS9t4hLx0gGpnz2y3y9MLVA8PmySH6/view", path: "/games/wood-science.html", icon: FlaskConical },
  { kind: "تجربة", title: "مختبر الجاذبية — تشغيل مباشر", url: "https://drive.google.com/file/d/1tAnG7hz9K5VS-jTslHK2S6FA9kIl-q8o/view", path: "/games/gravity-lab.html", icon: Atom },
  { kind: "فيديو", title: "فيديو الخزانة الذكية", url: "https://drive.google.com/file/d/1huhd6D01jccDNvBuX1NOMLvqAL5GguE5/view", path: "/watch/smart-cabinet", icon: Film },
  { kind: "فيديو", title: "إنشاء فيديو لشرح الفيزياء", url: "https://drive.google.com/file/d/1KsN0sQHlO6vtmm-X4mhPrdWw39xpMQdP/view", path: "/watch/physics", icon: Film },
  { kind: "فيديو", title: "فيديو التنين", url: "https://drive.google.com/file/d/1XaGF4xKDggOKCNuh4GgsADUgy3W1hIkP/view", path: "/watch/dragon", icon: Film },
  { kind: "فيديو", title: "فيديو عطر", url: "https://drive.google.com/file/d/1i3XwU_KUAtxdpqgth1xK3hZyB9km7Ejy/view", path: "/watch/perfume", icon: Film },
  { kind: "فيديو", title: "جمع أكثر من فيديو مع بعض", url: "https://drive.google.com/file/d/1enjZJpPuceWCh01ya9zy5pF6alls8mk9/view", path: "/watch/montage", icon: Clapperboard },
  { kind: "فيديو", title: "أجراس الزهر", url: "https://drive.google.com/file/d/1u74708P7NEgt8vjTXpf1RWhWZWEqnFNA/view", path: "/watch/bells", icon: Film },
  { kind: "فيديو", title: "دورة حياة النحلة بالعربية", url: "https://drive.google.com/file/d/1aJsvgePBQN-DgC7yZ6iD4yw_TQWYqKbN/view", path: "/watch/bee", icon: Film },
  { kind: "فيديو", title: "فيديو على الجوجل فيبز", url: "https://drive.google.com/file/d/1DMGNKVfQ-OQIpfsd1ODYDHX0vVF0jEvh/view", path: "/watch/vibez", icon: Film },
  { kind: "صورة", title: "إعلان الخزانة الذكية", url: "https://drive.google.com/file/d/1zfkz8lB3XLGsvOs96BsUi8OnjwU4rTz2/view", path: "/watch/cabinet-image", icon: Clapperboard },
  { kind: "صورة", title: "شخصية الشرح", url: "https://drive.google.com/file/d/1x38qOFp51pL0r9UL-Pqz4B1vzuVCcNjv/view", path: "/watch/character", icon: Sparkles },
  { kind: "صورة", title: "نسخة من تمرين 1", url: "https://drive.google.com/file/d/1vU-YND9f7fDDzEju1TVnZ98v-5VVVWAz/view", path: "/watch/exercise-one", icon: Clapperboard },
  { kind: "صورة", title: "نسخة من تمرين 2", url: "https://drive.google.com/file/d/1oJKhwo-HJHG0zDjuniHERAdsNxfvTEgo/view", path: "/watch/exercise-two", icon: Clapperboard },
  { kind: "كتاب", title: "غلاف الكتاب", url: "https://drive.google.com/file/d/1BnN4sshv2A0eyPg1rcZtM5UNLl9oEKPh/view", icon: BookOpen },
  { kind: "قصة", title: "قصة للأطفال — قراءة مباشرة", url: "https://drive.google.com/file/d/1dhp1SY8sqiHSylyHmi6HSYwzpw95gwgp/view", path: "/story", icon: BookOpen },
  { kind: "عرض", title: "خريطة الجسم الإنساني", url: "https://docs.google.com/presentation/d/1edPVrnvVxjsuH4JOiGEyqHgkZji2lwq2/edit", icon: Atom },
  { kind: "صوت", title: "برودكاست شب وبنت", url: "https://drive.google.com/file/d/1w9CYMBF92p_188H29rg0fhIt3TAFWVdd/view", path: "/watch/podcast", icon: Film },
  { kind: "صوت", title: "صوت المطر على ألواح الحديد", url: "https://drive.google.com/file/d/1LdqUbU8qDK4IDWJTWohVWlaHxktnmybg/view", path: "/watch/rain", icon: Film },
  { kind: "صوت", title: "تحويل النص إلى صوت بالمشاعر", url: "https://drive.google.com/file/d/1t2GARmHEGRGwDyRugXC_IZQwAie-FVdL/view", path: "/watch/emotional-tts", icon: Film },
  { kind: "صوت", title: "صوت فيديو الجوجل فيبز", url: "https://drive.google.com/file/d/1DMGNKVfQ-OQIpfsd1ODYDHX0vVF0jEvh/view", icon: Film },
  { kind: "موقع", title: "موقع إلكتروني — تشغيل مباشر", url: "https://drive.google.com/file/d/1iu2s_ErfYMn5DifTSxjh9pQxhIIdU9mX/view", path: "/embedded-site/index.html", icon: Code2 },
];

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
            <button onClick={() => scrollTo("profile")}>ملفي</button>
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
            <SectionKicker light>محمد عبدالله العسعسمة · الأردن</SectionKicker>
            <h1>خبرة تُبنى.<br /><em>وأفكار تتحرك.</em></h1>
            <p className="hero-lede">مهندس اتصالات ومشرف ميداني يحوّل الخبرة التقنية إلى تجارب تعليمية ومشاريع رقمية نابضة بالحياة — من الألياف الضوئية إلى الألعاب التفاعلية.</p>
            <div className="hero-actions">
              <button className="button button--primary" onClick={() => scrollTo("work")}>اكتشف المشاريع <ArrowLeft size={18} /></button>
              <button className="text-link text-link--light" onClick={() => scrollTo("method")}>كيف نصنع الأثر؟ <span>↙</span></button>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>م</span><span>✦</span><span>ت</span>
              </div>
              <p><strong>مهندس اتصالات · مبتكر رقمي</strong><br /><span>من الكرك إلى مساحة أوسع</span></p>
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

      <section className="profile-section" id="profile">
        <div className="container profile-grid">
          <div className="profile-portrait-wrap"><div className="profile-orbit" /><img className="profile-portrait" src="/manus-storage/mohammad-portrait_1f220f22.png" alt="محمد عبدالله العسعسمة" /><span className="profile-badge">متاح للتعاون</span></div>
          <div className="profile-copy"><SectionKicker>من يقف خلف التجربة</SectionKicker><h2>محمد عبدالله<br /><em>العسعسمة.</em></h2><p className="profile-lead">مهندس كهرباء واتصالات أردني، بخبرة عملية في الألياف الضوئية، شبكات FTTH، صيانة الهواتف، وأنظمة CCTV — وبشغف واضح لصناعة محتوى وتجارب رقمية تجعل المعرفة أقرب وأكثر إنسانية.</p><div className="profile-contact"><a href="tel:+962790141918"><Phone size={15} /> +962 790 141 918</a><a href="mailto:Allasasmah.mohammad@yahoo.com"><Mail size={15} /> Allasasmah.mohammad@yahoo.com</a><span><MapPin size={15} /> الكرك، الأردن</span></div><div className="profile-meta"><span>أردني</span><span>العربية · English</span><span>تدريب صيانة أجهزة خلوية · 2024</span></div><a className="profile-cv" href="/manus-storage/profile_078c6478.pdf" target="_blank" rel="noreferrer"><ExternalLink size={14} /> عرض السيرة الذاتية الكاملة</a></div>
          <div className="profile-facts"><div className="profile-fact"><GraduationCap size={20} /><div><small>التخصص</small><strong>هندسة كهرباء واتصالات</strong><span>جامعة مؤتة · 2009–2015</span></div></div><div className="profile-fact"><Zap size={20} /><div><small>الخبرة</small><strong>ألياف ضوئية · FTTH · شبكات</strong><span>إشراف ميداني وتواصل مع العملاء</span></div></div><div className="profile-fact"><Sparkles size={20} /><div><small>نقاط القوة</small><strong>تواصل · تفاوض · قيادة فرق</strong><span>Excel و Word والعمل تحت الضغط</span></div></div></div>
          <div className="experience-row"><div className="experience-heading"><SectionKicker light>رحلة الخبرة</SectionKicker><span>2015 — الآن</span></div><div className="experience-list"><div><strong>مشرف ألياف ضوئية</strong><span>Joint Venture / Nimer Al-Lawzi & Partners · 2020–2021</span></div><div><strong>مهندس اتصالات ومبيعات FTTH</strong><span>STRAND Telecommunication Technology · 2017–2018</span></div><div><strong>مشرف ميداني</strong><span>MASAR United Contracting Company · 2015–2017</span></div><div><strong>فني صيانة CCTV وشبكات</strong><span>Siran Contracting Company · 2015–2017</span></div></div></div>
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
                <div className="project-card__body"><h3>{project.title}</h3><p>{project.description}</p><span className="project-card__more">استكشف المشروع <ArrowLeft size={15} /></span><a className="project-card__source" href={project.sourceUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}><ExternalLink size={13} /> {project.sourceLabel}</a></div>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="resources-section" id="resources">
        <div className="container">
          <div className="section-heading resources-heading"><div><SectionKicker>الأرشيف الكامل</SectionKicker><h2>كل الروابط،<br /><em>في مكان واحد.</em></h2></div><div className="section-heading__side"><p>كل الألعاب والوسائط والقصة والموقع تعمل من داخل الموقع مباشرة، مع الاحتفاظ برابط المصدر الأصلي لمن يريد الرجوع إليه.</p><span className="project-count">30 <small>روابط مباشرة</small></span></div></div>
          <div className="resource-grid">{resources.map((resource) => { const Icon = resource.icon; const href = resource.path ?? resource.url; return <a className={`resource-item ${resource.path ? "resource-item--playable" : ""}`} key={resource.url + resource.title} href={href} target={resource.path ? undefined : "_blank"} rel={resource.path ? undefined : "noreferrer"}><span className="resource-icon"><Icon size={18} /></span><span className="resource-copy"><small>{resource.path ? "تشغيل داخل الموقع" : resource.kind}</small><strong>{resource.title}</strong></span>{resource.path ? <Play className="resource-arrow" size={16} fill="currentColor" /> : <ExternalLink className="resource-arrow" size={16} />}</a>; })}</div>
          <a className="drive-folder-link" href="https://drive.google.com/drive/folders/1lsOL5MViy3kMO7fUdm2M9hlZjMFAmn8i" target="_blank" rel="noreferrer"><ExternalLink size={15} /> فتح مجلد Drive الكامل</a>
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
          <div className="project-modal__copy"><SectionKicker>{selectedProject.label}</SectionKicker><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><span className="modal-note"><Code2 size={15} /> فكرة مصممة لتُفهم بالتجربة</span><a className="modal-source" href={selectedProject.sourceUrl} target="_blank" rel="noreferrer"><ExternalLink size={15} /> {selectedProject.sourceLabel}</a></div>
        </div>
      </div>}
    </main>
  );
}

export default Home;
