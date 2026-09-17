import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Home, Maximize2 } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const pages = Array.from({ length: 10 }, (_, index) => `/story/page-${String(index + 1).padStart(2, "0")}.jpg`);

export default function StoryPage() {
  const [page, setPage] = useState(0);
  const next = () => setPage((value) => Math.min(value + 1, pages.length - 1));
  const previous = () => setPage((value) => Math.max(value - 1, 0));
  return <main className="story-page" dir="rtl">
    <header className="story-toolbar"><Link href="/" className="game-back"><ArrowRight size={18} /> العودة للمختبر</Link><div className="story-title"><span>حكايات صغيرة</span><strong>قصة الأطفال التفاعلية</strong></div><div className="game-tools"><a href="https://drive.google.com/file/d/1dhp1SY8sqiHSylyHmi6HSYwzpw95gwgp/view" target="_blank" rel="noreferrer" title="المصدر الأصلي"><ExternalLink size={16} /></a><button onClick={() => document.documentElement.requestFullscreen?.()} title="ملء الشاشة"><Maximize2 size={16} /></button></div></header>
    <section className="story-reader"><button className="story-nav story-nav--next" onClick={next} disabled={page === pages.length - 1} aria-label="الصفحة التالية"><ChevronRight size={25} /></button><div className="story-page-wrap"><img src={pages[page]} alt={`صفحة ${page + 1} من قصة الأطفال`} /><div className="story-progress"><span style={{ width: `${((page + 1) / pages.length) * 100}%` }} /></div></div><button className="story-nav story-nav--previous" onClick={previous} disabled={page === 0} aria-label="الصفحة السابقة"><ChevronLeft size={25} /></button></section>
    <div className="story-controls"><button onClick={previous} disabled={page === 0}>السابق</button><span>صفحة {page + 1} من {pages.length}</span><button onClick={next} disabled={page === pages.length - 1}>التالي</button></div>
    <footer className="game-footer"><span>قصة الأطفال — تُعرض الآن داخل الموقع دون فتح Drive</span><Link href="/"><Home size={14} /> الرئيسية</Link></footer>
  </main>;
}
