import { ArrowRight, ExternalLink, Home, Image as ImageIcon, Maximize2, Play } from "lucide-react";
import { Link, useRoute } from "wouter";

const media: Record<string, { title: string; subtitle: string; type: "video" | "image" | "audio"; src: string; drive: string }> = {
  "smart-cabinet": { title: "فيديو الخزانة الذكية", subtitle: "تصميم منتج ذكي", type: "video", src: "/manus-storage/smart-cabinet_fb4e38f1.mp4", drive: "https://drive.google.com/file/d/1huhd6D01jccDNvBuX1NOMLvqAL5GguE5/view" },
  physics: { title: "شرح الفيزياء", subtitle: "فيديو تعليمي", type: "video", src: "/manus-storage/physics-explainer_12d8104e.mp4", drive: "https://drive.google.com/file/d/1KsN0sQHlO6vtmm-X4mhPrdWw39xpMQdP/view" },
  dragon: { title: "فيديو التنين", subtitle: "مشهد بصري مولّد", type: "video", src: "/manus-storage/dragon_cd636d32.mp4", drive: "https://drive.google.com/file/d/1XaGF4xKDggOKCNuh4GgsADUgy3W1hIkP/view" },
  perfume: { title: "فيديو عطر", subtitle: "تجربة إعلانية", type: "video", src: "/manus-storage/perfume_24563473.mp4", drive: "https://drive.google.com/file/d/1i3XwU_KUAtxdpqgth1xK3hZyB9km7Ejy/view" },
  montage: { title: "مونتاج متعدد", subtitle: "جمع أكثر من فيديو", type: "video", src: "/manus-storage/montage_075e6d06.mp4", drive: "https://drive.google.com/file/d/1enjZJpPuceWCh01ya9zy5pF6alls8mk9/view" },
  bells: { title: "أجراس الزهر", subtitle: "فيديو موسيقي بصري", type: "video", src: "/manus-storage/bells_2781e3aa.mp4", drive: "https://drive.google.com/file/d/1u74708P7NEgt8vjTXpf1RWhWZWEqnFNA/view" },
  bee: { title: "دورة حياة النحلة", subtitle: "فيديو تعليمي بالعربية", type: "video", src: "/manus-storage/bee-lifecycle_b5a655bd.mp4", drive: "https://drive.google.com/file/d/1aJsvgePBQN-DgC7yZ6iD4yw_TQWYqKbN/view" },
  vibez: { title: "فيديو على الجوجل فيبز", subtitle: "تجربة فيديو", type: "video", src: "/manus-storage/vibez_3ff2fc67.mp4", drive: "https://drive.google.com/file/d/1DMGNKVfQ-OQIpfsd1ODYDHX0vVF0jEvh/view" },
  podcast: { title: "برودكاست شب وبنت", subtitle: "تجربة صوتية", type: "audio", src: "/manus-storage/podcast_e81c964f.mp3", drive: "https://drive.google.com/file/d/1w9CYMBF92p_188H29rg0fhIt3TAFWVdd/view" },
  rain: { title: "صوت المطر على ألواح الحديد", subtitle: "مؤثر صوتي", type: "audio", src: "/manus-storage/rain_b8869f14.mp3", drive: "https://drive.google.com/file/d/1LdqUbU8qDK4IDWJTWohVWlaHxktnmybg/view" },
  "emotional-tts": { title: "تحويل النص إلى صوت بالمشاعر", subtitle: "تجربة صوتية", type: "audio", src: "/manus-storage/emotional-tts_062a6e99.mp3", drive: "https://drive.google.com/file/d/1t2GARmHEGRGwDyRugXC_IZQwAie-FVdL/view" },
  "cabinet-image": { title: "إعلان الخزانة الذكية", subtitle: "صورة المشروع الأصلية", type: "image", src: "/manus-storage/smart-cabinet_d7433183.png", drive: "https://drive.google.com/file/d/1zfkz8lB3XLGsvOs96BsUi8OnjwU4rTz2/view" },
  character: { title: "شخصية الشرح", subtitle: "أصل بصري من المشروع", type: "image", src: "/manus-storage/explainer-character_a5fee8aa.jpg", drive: "https://drive.google.com/file/d/1x38qOFp51pL0r9UL-Pqz4B1vzuVCcNjv/view" },
  "exercise-one": { title: "نسخة من تمرين 1", subtitle: "تمرين بصري", type: "image", src: "/manus-storage/exercise-one_b66de397.jpg", drive: "https://drive.google.com/file/d/1vU-YND9f7fDDzEju1TVnZ98v-5VVVWAz/view" },
  "exercise-two": { title: "نسخة من تمرين 2", subtitle: "تمرين بصري", type: "image", src: "/manus-storage/exercise-two_e014028f.jpg", drive: "https://drive.google.com/file/d/1oJKhwo-HJHG0zDjuniHERAdsNxfvTEgo/view" },
};

export default function MediaPage() {
  const [, params] = useRoute<{ slug: string }>("/watch/:slug");
  const item = params ? media[params.slug] : undefined;
  if (!item) return <div className="game-missing" dir="rtl"><h1>الملف غير موجود</h1><Link href="/">العودة إلى المختبر</Link></div>;
  return <main className="game-page media-page" dir="rtl">
    <header className="game-toolbar"><Link href="/" className="game-back"><ArrowRight size={18} /> العودة للمختبر</Link><div className="game-title">{item.type === "video" ? <Play size={18} /> : <ImageIcon size={18} />}<div><strong>{item.title}</strong><small>{item.subtitle}</small></div></div><div className="game-tools"><a href={item.drive} target="_blank" rel="noreferrer" title="المصدر الأصلي"><ExternalLink size={16} /></a><button onClick={() => document.documentElement.requestFullscreen?.()} title="ملء الشاشة"><Maximize2 size={16} /></button></div></header>
    <section className="media-stage">{item.type === "video" ? <video src={item.src} controls autoPlay playsInline /> : item.type === "audio" ? <div className="audio-player-card"><div className="audio-orb"><Play size={32} fill="currentColor" /></div><h1>{item.title}</h1><p>{item.subtitle}</p><audio src={item.src} controls autoPlay /></div> : <img src={item.src} alt={item.title} />}</section>
    <footer className="game-footer"><span>يُعرض الآن داخل الموقع — لا حاجة لفتح Drive</span><Link href="/"><Home size={14} /> الرئيسية</Link></footer>
  </main>;
}
