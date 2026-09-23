import { useEffect } from "react";
import type { ReactNode } from "react";
import { ArrowRight, Check, ChevronDown, Clock3, Mail, MapPin, MessageCircle, Package, ShieldCheck, UserRound } from "lucide-react";
import { Link } from "wouter";

const whatsapp = "https://wa.me/905312604735";

function Seo({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
  return null;
}

export function ContentHeader() {
  return <header className="store-header"><Link href="/" className="brand"><span className="brand-mark">K</span><span className="brand-wordmark">Kumsal<span>Koleksiyon</span></span></Link><nav><Link href="/kategori/kiz-cocuk">Kız çocuk</Link><Link href="/kategori/erkek-cocuk">Erkek çocuk</Link><Link href="/beden-rehberi">Beden rehberi</Link><Link href="/blog">Blog</Link><Link href="/sss">Yardım</Link></nav><Link href="/checkout" className="store-bag">Çanta</Link></header>;
}

export function ContentFooter() {
  return <footer className="store-footer"><div><span className="brand-mark">K</span><p>Renkli çocukluklara<br />eşlik ediyoruz.</p><small className="footer-company">Kumsal Koleksiyon · İstanbul</small></div><div className="store-footer-links"><Link href="/beden-rehberi">Beden rehberi</Link><Link href="/sss">Kargo & iade</Link><Link href="/iletisim">İletişim</Link><Link href="/gizlilik">Gizlilik</Link><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></div></footer>;
}

function ContentShell({ children, title, description }: { children: ReactNode; title: string; description: string }) {
  return <div className="store-page"><Seo title={title} description={description} /><ContentHeader /><main className="content-page">{children}</main><a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp destek"><MessageCircle size={21} /><span>WhatsApp destek</span></a><ContentFooter /></div>;
}

export function BlogPage() {
  const posts = [
    ["Beden seçmenin kısa yolu", "Çocuğun boy ve göğüs ölçüsünü evde doğru almanın 4 pratik adımı.", "#ff4c98"],
    ["Okula dönüş kapsülü", "Sabahları kolay kombinlenen, oyun molasına hazır 7 parça.", "#5d78ef"],
    ["Kıyafet bakım notları", "Renkli kumaşların canlılığını daha uzun korumak için küçük ipuçları.", "#cfff46"],
  ];
  return <ContentShell title="Kumsal Blog | Çocuk Giyim Rehberi" description="Kumsal Koleksiyon blogunda çocuk giyimi, beden seçimi ve kıyafet bakımına dair pratik öneriler."><div className="content-hero"><span className="eyebrow dark-eyebrow">kumsal notları</span><h1>Stil kadar<br /><em>oyun da önemli.</em></h1><p>Çocukların özgürce hareket ettiği, ebeveynlerin de kolayca karar verdiği bir gardırop için ilham.</p></div><div className="editorial-grid">{posts.map(([title, copy, color], index) => <article className="editorial-card" key={title}><div className="editorial-art" style={{ background: color }}><span>0{index + 1}</span><strong>{index === 0 ? "MEASURE" : index === 1 ? "PLAY" : "CARE"}</strong></div><span className="eyebrow dark-eyebrow">rehber · 4 dk</span><h2>{title}</h2><p>{copy}</p><button className="text-link">Devamını oku <ArrowRight size={15} /></button></article>)}</div></ContentShell>;
}

export function AccountPage() {
  return <ContentShell title="Hesabım | Kumsal Koleksiyon" description="Kumsal Koleksiyon hesabınızdan siparişlerinizi ve favori ürünlerinizi yönetin."><div className="account-layout"><section className="account-intro"><span className="account-icon"><UserRound size={25} /></span><span className="eyebrow dark-eyebrow">kişisel alanın</span><h1>Hoş geldin,<br /><em>küçük stilist.</em></h1><p>Siparişlerini takip etmek, favorilerini saklamak ve beden bilgilerini tek yerde tutmak için giriş yap.</p><a className="primary-button" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp ile destek al <MessageCircle size={16} /></a></section><section className="account-card"><h2>Hesabına giriş yap</h2><label>E-posta adresi<input placeholder="ornek@mail.com" type="email" /></label><label>Şifre<input placeholder="••••••••" type="password" /></label><button className="primary-button">Giriş yap <ArrowRight size={16} /></button><button className="text-link centered">Şifremi unuttum</button><div className="account-divider"><span>veya</span></div><button className="social-button">Google ile devam et</button><p>Hesabın yok mu? <b>Yeni hesap oluştur</b></p></section></div></ContentShell>;
}

export function FaqPage() {
  const faqs = ["Siparişim ne zaman kargoya verilir?", "Ücretsiz kargo ve iade koşulları nedir?", "Beden konusunda nasıl yardım alabilirim?", "Değişim sürecini nasıl başlatırım?"];
  return <ContentShell title="SSS, Kargo ve İade | Kumsal Koleksiyon" description="Kumsal Koleksiyon kargo, iade, değişim ve sipariş süreçleri hakkında sık sorulan sorular."><div className="content-hero compact"><span className="eyebrow dark-eyebrow"><Package size={14} /> yardım merkezi</span><h1>Bilmek<br /><em>iyi gelir.</em></h1><p>Siparişten beden seçimine kadar aklına takılan her şey için buradayız.</p></div><div className="faq-layout"><div className="faq-list">{faqs.map((question) => <details key={question}><summary>{question}<ChevronDown size={17} /></summary><p>750 ₺ üzeri siparişlerde kargo ücretsizdir. Siparişler 1–2 iş günü içinde hazırlanır; değişim ve iade için teslimattan itibaren 14 gün içinde WhatsApp destek ekibimize ulaşabilirsin.</p></details>)}</div><aside className="support-card"><ShieldCheck size={23} /><h2>Hızlı cevap mı lazım?</h2><p>Bir beden, ürün ya da sipariş sorusunda en hızlı kanal WhatsApp.</p><a href={whatsapp} target="_blank" rel="noreferrer">Bize yaz <ArrowRight size={15} /></a></aside></div><div className="trust-row"><span><Check size={16} /> Kolay iade</span><span><Check size={16} /> Hızlı kargo</span><span><Check size={16} /> Güvenli ödeme</span></div></ContentShell>;
}

export function ContactPage() {
  return <ContentShell title="İletişim | Kumsal Koleksiyon" description="Kumsal Koleksiyon iletişim ve WhatsApp destek bilgileri. Sorularınız için bize ulaşın."><div className="contact-layout"><section><span className="eyebrow dark-eyebrow"><MessageCircle size={14} /> konuşalım</span><h1>Bir merhaba,<br /><em>iyi gelir.</em></h1><p>Ürün, beden, kargo veya kombin fikri… tüm soruların için gerçek bir kişiyle konuşabilirsin.</p><a className="whatsapp-large" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={20} /> +90 531 260 47 35 <ArrowRight size={18} /></a></section><section className="contact-details"><div><MapPin size={20} /><span><b>Mağaza & merkez</b><small>İstanbul · Online mağaza</small></span></div><div><Clock3 size={20} /><span><b>Çalışma saatleri</b><small>Hafta içi 09:00–18:00</small></span></div><div><Mail size={20} /><span><b>E-posta</b><small>merhaba@kumsalkoleksiyon.com</small></span></div><div><MessageCircle size={20} /><span><b>Öncelikli kanal</b><small>WhatsApp'tan hızlı destek</small></span></div></section></div></ContentShell>;
}

export function LegalPage({ type }: { type: "gizlilik" | "iade" | "mesafeli" }) {
  const data = { gizlilik: ["Gizlilik politikası", "Bilgilerin bizimle güvende."], iade: ["İade ve değişim", "Kolayca değiştir, rahatça devam et."], mesafeli: ["Mesafeli satış sözleşmesi", "Şeffaf alışverişin temel koşulları."] }[type];
  return <ContentShell title={`${data[0]} | Kumsal Koleksiyon`} description={`${data[0]} hakkında Kumsal Koleksiyon bilgilendirme metni.`}><div className="legal-page"><span className="eyebrow dark-eyebrow">kumsal bilgiler</span><h1>{data[0]}<br /><em>{data[1]}</em></h1><p className="legal-lead">Bu sayfa, alışveriş deneyimimizi açık ve anlaşılır tutmak için hazırlanmıştır.</p><div className="legal-copy"><h2>1. Genel bilgiler</h2><p>Kumsal Koleksiyon, 3–16 yaş çocuk giyim ürünlerini online olarak sunar. Sipariş, teslimat ve destek süreçlerinde paylaşılan bilgiler yalnızca ilgili hizmeti sağlamak amacıyla kullanılır.</p><h2>2. İletişim ve destek</h2><p>Sorularınız için WhatsApp üzerinden +90 531 260 47 35 numarasına ulaşabilirsiniz. Güncel süreç ve istisnalar sipariş sırasında ayrıca paylaşılır.</p><h2>3. Güncelleme</h2><p>Bu metin ihtiyaç halinde güncellenebilir. En güncel versiyon bu sayfada yayınlanır.</p></div></div></ContentShell>;
}

export { ContentShell };
