import { useEffect, useState } from "react";
import { ArrowRight, ExternalLink, Gamepad2, Home, Maximize2 } from "lucide-react";
import { Link, useRoute } from "wouter";

const games: Record<string, { title: string; subtitle: string; src: string; drive: string }> = {
  "letters-adventure": { title: "مغامرة الحروف", subtitle: "تعلم ممتع وتفاعلي للأطفال", src: "/games/letters-adventure.html", drive: "https://drive.google.com/file/d/1Jyjhiu0YIVp3a66NFbSS2Nbd6ppsSI-z/view" },
  "neon-bomberman": { title: "Neon Bomberman 2088", subtitle: "لعبة الأكشن المستقبلية", src: "/games/neon-bomberman.html", drive: "https://drive.google.com/file/d/1S7PAvxbvQvCLYZ6Gy-rtMFSNnh5z2IIl/view" },
  "wood-science": { title: "مختبر علوم النجارة", subtitle: "تجارب فيزيائية تفاعلية", src: "/games/wood-science.html", drive: "https://drive.google.com/file/d/1jjxS9t4hLx0gGpnz2y3y9MLVA8PmySH6/view" },
  "gravity-lab": { title: "مختبر الجاذبية", subtitle: "محاكاة السقوط الحر والكواكب", src: "/games/gravity-lab.html", drive: "https://drive.google.com/file/d/1tAnG7hz9K5VS-jTslHK2S6FA9kIl-q8o/view" },
};

export default function GamePage() {
  const [, params] = useRoute<{ slug: string }>("/play/:slug");
  const game = params ? games[params.slug] : undefined;
  const [gameHtml, setGameHtml] = useState("");
  useEffect(() => {
    if (!game) return;
    fetch(game.src).then((response) => response.text()).then(setGameHtml).catch(() => setGameHtml(""));
  }, [game]);
  if (!game) return <div className="game-missing" dir="rtl"><h1>اللعبة غير موجودة</h1><Link href="/">العودة إلى المختبر</Link></div>;

  return <main className="game-page" dir="rtl">
    <header className="game-toolbar">
      <Link href="/" className="game-back"><ArrowRight size={18} /> العودة للمختبر</Link>
      <div className="game-title"><Gamepad2 size={18} /><div><strong>{game.title}</strong><small>{game.subtitle}</small></div></div>
      <div className="game-tools"><a href={game.drive} target="_blank" rel="noreferrer" title="المصدر الأصلي"><ExternalLink size={16} /></a><button onClick={() => document.documentElement.requestFullscreen?.()} title="ملء الشاشة"><Maximize2 size={16} /></button></div>
    </header>
    <section className="game-stage">{gameHtml ? <iframe title={game.title} srcDoc={gameHtml} allow="fullscreen" /> : <div className="game-loading"><Gamepad2 size={28} /><span>جارٍ تشغيل التجربة...</span></div>}</section>
    <footer className="game-footer"><span>تجربة تعمل مباشرة داخل الموقع — لا حاجة لتنزيل أو فتح ملف</span><Link href="/"><Home size={14} /> الرئيسية</Link></footer>
  </main>;
}
