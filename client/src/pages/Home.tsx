import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  ChevronDown,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

const imageBase = `${import.meta.env.BASE_URL}assets`;

const products = [
  {
    id: 1,
    name: "Fuchsia Ruffle Elbise",
    category: "Kız Çocuk",
    price: 899,
    oldPrice: 1199,
    badge: "Yeni",
    tone: "pink",
    image: `${imageBase}/kumsal-dress.jpg`,
  },
  {
    id: 2,
    name: "Color Pop T-shirt",
    category: "Unisex",
    price: 449,
    oldPrice: 599,
    badge: "Çok satan",
    tone: "orange",
    image: `${imageBase}/kumsal-outfit.jpg`,
  },
  {
    id: 3,
    name: "Sonic Blue Sweatshirt",
    category: "Erkek Çocuk",
    price: 649,
    oldPrice: 849,
    badge: "-25%",
    tone: "blue",
    image: `${imageBase}/kumsal-outfit.jpg`,
  },
  {
    id: 4,
    name: "Lime Club Eşofman",
    category: "Unisex",
    price: 749,
    oldPrice: 949,
    badge: "Editör seçimi",
    tone: "lime",
    image: `${imageBase}/kumsal-dress.jpg`,
  },
];

const categoryCards = [
  { label: "Kız çocuk", count: "248 ürün", tone: "pink", emoji: "✦" },
  { label: "Erkek çocuk", count: "196 ürün", tone: "blue", emoji: "↗" },
  { label: "Mini koleksiyon", count: "3–6 yaş", tone: "lime", emoji: "∿" },
];

type CartItem = (typeof products)[number] & { quantity: number };

export default function Home() {
  const [, setLocation] = useLocation();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [liked, setLiked] = useState<number[]>([]);
  const [productFilter, setProductFilter] = useState("Tümü");
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(() => typeof Notification !== "undefined" && Notification.permission === "granted");
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Yeni sezon sahnede", copy: "Yaz editinden favori parçalarını keşfet.", time: "Şimdi", unread: true, tone: "pink", href: "#koleksiyon" },
    { id: 2, title: "Hoş geldin indirimi", copy: "İlk siparişinde %15 avantaj seni bekliyor.", time: "Bugün", unread: true, tone: "lime", href: "#urunler" },
    { id: 3, title: "Kargo bizden", copy: "750 ₺ üzeri siparişlerde hızlı kargo ücretsiz.", time: "Dün", unread: false, tone: "blue", href: "#yas" },
  ]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const visibleProducts = productFilter === "Tümü" ? products : products.filter((product) => product.category.toLowerCase().includes(productFilter.toLowerCase()));

  const formattedTotal = useMemo(
    () => new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(cartTotal),
    [cartTotal],
  );

  function addToCart(product: (typeof products)[number]) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
    toast.success("Ürün sepete eklendi", { description: product.name });
    if (pushEnabled && typeof Notification !== "undefined") {
      new Notification("Kumsal Koleksiyon", { body: `${product.name} çantana eklendi.` });
    }
  }

  async function enablePushNotifications() {
    if (typeof Notification === "undefined") {
      toast.error("Tarayıcın web bildirimlerini desteklemiyor.");
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setPushEnabled(true);
      toast.success("Bildirimler açıldı", { description: "Yeni koleksiyon ve kampanyalardan haberdar olacaksın." });
      new Notification("Bildirimler aktif", { body: "Kumsal Koleksiyon'dan ilk haberin hazır." });
    } else {
      toast.error("Bildirim izni verilmedi", { description: "İstersen tarayıcı ayarlarından daha sonra açabilirsin." });
    }
  }

  function openNotifications() {
    setNotificationsOpen((current) => !current);
    setNotifications((current) => current.map((notification) => ({ ...notification, unread: false })));
  }

  function followNotification(href: string) {
    setNotificationsOpen(false);
    setNotifications((current) => current.map((notification) => ({ ...notification, unread: false })));
    window.setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  }

  function updateQuantity(id: number, delta: number) {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0),
    );
  }

  function toggleLike(id: number) {
    setLiked((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <div className="site-shell">
      <div className="announcement-bar">
        <span className="announcement-dot" />
        <span>Yeni sezon geldi: İlk siparişe %15 hoş geldin indirimi</span>
        <ArrowRight size={14} strokeWidth={2.5} />
      </div>

      <header className="main-header">
        <div className="header-inner">
          <button className="mobile-menu-button icon-button" aria-label="Menüyü aç" onClick={() => setMenuOpen(true)}>
            <Menu size={20} />
          </button>
          <a className="brand" href="#top" aria-label="Kumsal Koleksiyon ana sayfa">
            <span className="brand-mark">K</span>
            <span className="brand-wordmark">Kumsal<span>Koleksiyon</span></span>
          </a>
          <nav className="desktop-nav" aria-label="Ana menü">
            <a className="active" href="#kesfet">Keşfet</a>
            <a href="#koleksiyon">Koleksiyon</a>
            <a href="#yas">Yaşa göre <ChevronDown size={14} /></a>
            <a href="#hikaye">Biz kimiz?</a>
          </nav>
          <div className="header-actions">
            <button className="icon-button" aria-label="Ara" onClick={() => setSearchOpen((value) => !value)}><Search size={19} /></button>
            <button className="icon-button favorites-button" aria-label="Favoriler">
              <Heart size={19} />
              {liked.length > 0 && <span>{liked.length}</span>}
            </button>
            <div className="notification-wrap">
              <button className="icon-button notification-button" aria-label="Bildirimleri aç" onClick={openNotifications}>
                <Bell size={18} />
                {notifications.some((notification) => notification.unread) && <span className="notification-dot" />}
              </button>
              {notificationsOpen && <div className="notification-panel">
                <div className="notification-panel-head"><div><span className="eyebrow dark-eyebrow">kumsal güncel</span><h3>Bildirimler</h3></div><button onClick={() => setNotificationsOpen(false)} aria-label="Bildirimleri kapat"><X size={16} /></button></div>
                <div className="notification-list">{notifications.map((notification) => <a className={`notification-item ${notification.unread ? "unread" : ""}`} href={notification.href} key={notification.id} onClick={(event) => { event.preventDefault(); followNotification(notification.href); }}><span className={`notification-tone ${notification.tone}`}><Sparkles size={14} /></span><span className="notification-copy"><strong>{notification.title}</strong><small>{notification.copy}</small><em>{notification.time} · Görüntüle ↗</em></span></a>)}</div>
                <button className={`push-permission ${pushEnabled ? "enabled" : ""}`} onClick={enablePushNotifications}><Bell size={15} />{pushEnabled ? "Tarayıcı bildirimleri açık" : "Tarayıcı bildirimlerini aç"}<ArrowRight size={14} /></button>
              </div>}
            </div>
            <button className="bag-button" aria-label="Sepeti aç" onClick={() => setCartOpen(true)}>
              <ShoppingBag size={19} />
              <span>Çanta</span>
              {cartCount > 0 && <b>{cartCount}</b>}
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="search-dock">
            <Search size={18} />
            <input autoFocus placeholder="Ne arıyorsun? (ör. fuchsia elbise)" aria-label="Ürün ara" />
            <button aria-label="Aramayı kapat" onClick={() => setSearchOpen(false)}><X size={17} /></button>
          </div>
        )}
      </header>

      {menuOpen && (
        <div className="mobile-menu-overlay" role="dialog" aria-modal="true">
          <div className="mobile-menu">
            <div className="mobile-menu-head"><a className="brand" href="#top"><span className="brand-mark">K</span><span className="brand-wordmark">Kumsal<span>Koleksiyon</span></span></a><button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Menüyü kapat"><X /></button></div>
            <nav>
              <a href="#kesfet" onClick={() => setMenuOpen(false)}>Keşfet <ArrowRight size={17} /></a>
              <a href="#koleksiyon" onClick={() => setMenuOpen(false)}>Koleksiyon <ArrowRight size={17} /></a>
              <a href="#yas" onClick={() => setMenuOpen(false)}>Yaşa göre <ArrowRight size={17} /></a>
              <a href="#hikaye" onClick={() => setMenuOpen(false)}>Biz kimiz? <ArrowRight size={17} /></a>
            </nav>
            <p className="mobile-menu-note">Renkli çocukluklar için tasarlandı.</p>
          </div>
        </div>
      )}

      <main id="top">
        <section className="hero-section" id="kesfet">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={14} /> 2026 / yaz edit</div>
            <h1>Çocukluk<br /><em>renklenince</em><br />güzel.</h1>
            <p className="hero-description">3–16 yaş arası özgür ruhlar için yüksek enerjili, rahat ve kendine has parçalar.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#koleksiyon">Koleksiyonu keşfet <ArrowRight size={17} /></a>
              <a className="text-button" href="#hikaye">Hikâyemizi oku <span>↗</span></a>
            </div>
            <div className="hero-proof"><span className="avatar-stack"><i>✦</i><i>☺</i><i>✿</i></span><span><strong>12.000+</strong> mutlu mini stil sahibi</span></div>
          </div>
          <div className="hero-visual" aria-label="Renkli kıyafetler içindeki çocuklardan oluşan moda kampanyası">
            <div className="hero-image-frame">
              <img src={`${imageBase}/kumsal-hero.jpg`} alt="Renkli kıyafetleriyle çocuk moda çekimi" />
              <div className="image-tint" />
            </div>
            <div className="hero-sticker sticker-top">PLAY<br /><span>ALL DAY</span></div>
            <div className="hero-sticker sticker-bottom"><span className="sticker-spark">✹</span> mini<br />manifesto</div>
            <div className="hero-number">01<span>/03</span></div>
          </div>
          <div className="hero-scroll"><span /> aşağı kaydır</div>
        </section>

        <section className="ticker-section" aria-label="Kumsal değerleri">
          <div className="ticker-track"><span>RAHATLIK</span><i>✦</i><span>MERAK</span><i>✦</i><span>RENK</span><i>✦</i><span>ÖZGÜRLÜK</span><i>✦</i><span>RAHATLIK</span><i>✦</i><span>MERAK</span><i>✦</i></div>
        </section>

        <section className="section-block collection-section" id="koleksiyon">
          <div className="section-heading">
            <div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> şimdi sahnede</div><h2>Mini <span>edit.</span></h2></div>
            <a className="outline-button" href="#urunler">Tüm ürünleri gör <ArrowRight size={16} /></a>
          </div>
          <div className="category-grid">
            {categoryCards.map((card) => (
              <a className={`category-card ${card.tone}`} href="#urunler" key={card.label}>
                <div className="category-card-top"><span>{card.count}</span><span className="category-symbol">{card.emoji}</span></div>
                <div className="category-card-bottom"><h3>{card.label}</h3><ArrowRight size={20} /></div>
              </a>
            ))}
          </div>
        </section>

        <section className="section-block product-section" id="urunler">
          <div className="section-heading product-heading">
            <div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> çok sevilenler</div><h2>Stilini <span>seç.</span></h2></div>
            <div className="filter-pills">{["Tümü", "Kız", "Erkek", "Unisex"].map((filter) => <button className={productFilter === filter ? "selected" : ""} onClick={() => setProductFilter(filter)} key={filter}>{filter}</button>)}</div>
          </div>
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article className={`product-card ${product.tone}`} key={product.id}>
                <div className="product-image-wrap">
                  <img src={product.image} alt={`${product.name} çocuk kıyafeti`} />
                  <div className="product-overlay" />
                  <span className="product-badge">{product.badge}</span>
                  <button className={`favorite-icon ${liked.includes(product.id) ? "liked" : ""}`} onClick={() => toggleLike(product.id)} aria-label={`${product.name} favorilere ekle`}><Heart size={17} fill={liked.includes(product.id) ? "currentColor" : "none"} /></button>
                  <button className="quick-add" onClick={() => addToCart(product)}>Hızlı ekle <Plus size={15} /></button>
                </div>
                <div className="product-info"><div><p>{product.category}</p><h3><a className="product-card-link" href={`${import.meta.env.BASE_URL}urun/${product.id}`}>{product.name}</a></h3></div><div className="price"><strong>{product.price.toLocaleString("tr-TR")} ₺</strong><del>{product.oldPrice.toLocaleString("tr-TR")} ₺</del></div></div>
              </article>
            ))}
          </div>
        </section>

        <section className="manifesto-section" id="hikaye">
          <div className="manifesto-art"><div className="orb orb-a" /><div className="orb orb-b" /><span>made<br />for<br /><em>more</em></span><div className="manifesto-tag">KUMSAL<br />STUDIO / 01</div></div>
          <div className="manifesto-copy"><div className="eyebrow"><span className="eyebrow-line" /> bizim manifestomuz</div><h2>Çocuklar<br /><em>küçük</em> değil,<br />sadece yeni.</h2><p>Biz, çocukların dünyasını yetişkinlerin renk skalasına sığdırmıyoruz. Her parça oyun, hareket ve biraz da hayal kurmak için tasarlandı.</p><a className="text-button light" href="#top">Kumsal'ı keşfet <ArrowRight size={17} /></a></div>
        </section>

        <section className="service-strip" id="yas">
          <div><Zap size={20} /><span><strong>Hızlı kargo</strong> 750 ₺ üzeri ücretsiz</span></div>
          <div><Star size={20} /><span><strong>Kolay değişim</strong> 14 gün içinde</span></div>
          <div><span className="whatsapp-symbol">◔</span><span><strong>WhatsApp destek</strong> bir mesaj uzağında</span></div>
        </section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark">K</span><span className="brand-wordmark">Kumsal<span>Koleksiyon</span></span></a><p>Renkli çocukluklara eşlik eden<br />Türk çocuk moda markası.</p></div><div className="footer-links"><a href="#koleksiyon">Koleksiyon</a><a href="#hikaye">Hikâyemiz</a><a href="https://wa.me/905312604735" target="_blank" rel="noreferrer">İletişim ↗</a></div><div className="footer-bottom"><span>© 2026 Kumsal Koleksiyon</span><span>Instagram&nbsp;&nbsp; Pinterest&nbsp;&nbsp; TikTok</span></div></footer>

      <a className="whatsapp-float" href="https://wa.me/905312604735?text=Merhaba%2C%20Kumsal%20Koleksiyon%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noreferrer" aria-label="WhatsApp ile iletişime geç"><span className="whatsapp-symbol">◔</span><span>WhatsApp'tan yaz</span></a>

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)} />}
      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`} aria-label="Sepet">
        <div className="drawer-head"><div><span className="eyebrow dark-eyebrow">alışveriş çantası</span><h2>Sepetin <em>({cartCount})</em></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Sepeti kapat"><X /></button></div>
        <div className="drawer-body">
          {cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={34} /><h3>Çanta henüz boş.</h3><p>Beğendiğin parçaları buraya taşı.</p><button className="primary-button" onClick={() => { setCartOpen(false); document.getElementById("urunler")?.scrollIntoView({ behavior: "smooth" }); }}>Keşfetmeye başla <ArrowRight size={16} /></button></div> : cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div className="cart-item-copy"><h3>{item.name}</h3><p>{item.price.toLocaleString("tr-TR")} ₺</p><div className="quantity"><button onClick={() => updateQuantity(item.id, -1)} aria-label="Azalt"><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)} aria-label="Artır"><Plus size={13} /></button></div></div></div>)}
        </div>
        {cart.length > 0 && <div className="drawer-foot"><div><span>Ara toplam</span><strong>{formattedTotal}</strong></div><button className="primary-button full" onClick={() => { setCartOpen(false); setLocation("/checkout"); }}>Ödemeye geç <ArrowRight size={17} /></button><small>Vergiler ve kargo ödeme adımında hesaplanır.</small></div>}
      </aside>
    </div>
  );
}

export { products };

// Ensure the imported icon remains part of the bundle in older Vite transforms.
void Minus;
void Plus;
void Sparkles;
void Star;
void Zap;
void ChevronDown;
void Menu;
void X;
void Search;
void ShoppingBag;
void ArrowRight;
void Heart;
