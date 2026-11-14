"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  Plus,
  ShoppingBag,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { apiRequest, rememberLocalAction } from "@/lib/api";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */

const CDN = "https://marcopanconesi.com/cdn/shop/files/";
const COLLECTION_CDN = "https://marcopanconesi.com/cdn/shop/collections/";

type Product = {
  slug: string;
  name: string;
  price: string;
  image: string;
  hoverImage?: string;
  family: string;
  category: string;
  colors?: number;
  sizes?: string[];
};

const PRODUCTS: Product[] = [
  { slug: "diamanti-nova-ring-silver-fw26", name: "Diamanti Nova Ring", price: "492€", image: `${CDN}110.jpg?v=1783072194&width=800`, hoverImage: `${CDN}Cropped_163.jpg?v=1783085814&width=800`, family: "Constellation", category: "Finger", sizes: ["S", "M"] },
  { slug: "diamanti-pendant-ring-large-silver-fw26", name: "Diamanti Pendant Ring Large", price: "335€", image: `${CDN}102.jpg?v=1783070342&width=800`, hoverImage: `${CDN}2137.jpg?v=1783351776&width=800`, family: "Constellation", category: "Finger", sizes: ["S", "M", "L"] },
  { slug: "diamanti-pendant-ring-small-silver-fw26", name: "Diamanti Pendant Ring Small", price: "251€", image: `${CDN}101_31d283d4-c051-42e1-8ef2-40d679a658d8.jpg?v=1783070193&width=800`, hoverImage: `${CDN}Cropped_173.jpg?v=1783085675&width=800`, family: "Constellation", category: "Finger", sizes: ["S", "M", "L"] },
  { slug: "kismet-hoops-silver-fw26", name: "Kismet Hoops", price: "471€", image: `${CDN}95.jpg?v=1783070117&width=800`, hoverImage: `${CDN}Cropped_146.jpg?v=1783085512&width=800`, family: "Ascolto", category: "Ear" },
  { slug: "pierced-circle-cuff-silver-fw26", name: "Pierced Circle Cuff", price: "309€", image: `${CDN}130.jpg?v=1783072991&width=800`, hoverImage: `${CDN}Cropped_101.jpg?v=1783082125&width=800`, family: "Orbit", category: "Ear", colors: 1 },
  { slug: "blow-up-helix-ear-cuff-silver-fw26", name: "Blow Up Helix Ear Cuff", price: "157€", image: `${CDN}151.jpg?v=1783070654&width=800`, hoverImage: `${CDN}Cropped_63.jpg?v=1783086490&width=800`, family: "Blow Up", category: "Ear", colors: 1 },
  { slug: "blow-up-forma-ear-cuff-silver-fw26", name: "Blow Up Forma Ear Cuff", price: "293€", image: `${CDN}77.jpg?v=1783072308&width=800`, hoverImage: `${CDN}Cropped_65.jpg?v=1783086865&width=800`, family: "Blow Up", category: "Ear", colors: 2 },
  { slug: "blow-up-forma-ring-silver-fw26", name: "Blow Up Forma Ring", price: "345€", image: `${CDN}78.jpg?v=1783072309&width=800`, family: "Blow Up", category: "Finger", sizes: ["S", "M", "L", "XL"] },
  { slug: "pierced-solar-hoops-large-silver-fw26", name: "Pierced Solar Hoops Large", price: "439€", image: `${CDN}54.jpg?v=1783069895&width=800`, family: "Stellar", category: "Ear", colors: 1 },
  { slug: "pierced-helix-earrings-silver-fw26", name: "Pierced Helix Earrings", price: "408€", image: `${CDN}45.jpg?v=1783069765&width=800`, family: "Orbit", category: "Ear" },
  { slug: "orbit-ear-cuff-silver-ss26", name: "Orbit Ear Cuff", price: "272€", image: `${CDN}147.jpg?v=1753899850&width=800`, family: "Orbit", category: "Ear" },
  { slug: "orbit-multi-ear-cuff-silver-fw26", name: "Orbit Multi Ear Cuff", price: "314€", image: `${CDN}148.jpg?v=1783070974&width=800`, family: "Orbit", category: "Ear", colors: 1 },
  { slug: "pierced-solar-hoops-large-gold-fw26", name: "Pierced Solar Hoops Large", price: "539€", image: `${CDN}55.jpg?v=1783069902&width=800`, family: "Stellar", category: "Ear" },
  { slug: "pierced-huggies-gold-ss26", name: "Pierced Huggies", price: "340€", image: `${CDN}125.jpg?v=1753899838&width=800`, family: "Stellar", category: "Ear", colors: 1 },
  { slug: "nova-earrings-gold-fw26", name: "Nova Earrings", price: "335€", image: `${CDN}112.jpg?v=1783072198&width=800`, family: "Constellation", category: "Ear", colors: 1 },
  { slug: "ascolto-aura-drop-earrings-pink-fw26", name: "Ascolto Aura Drop Earrings", price: "450€", image: `${CDN}128.jpg?v=1783073003&width=800`, family: "Ascolto", category: "Ear" },
  { slug: "ascolto-aura-ring-pink-fw26", name: "Ascolto Aura Ring", price: "309€", image: `${CDN}129.jpg?v=1783073021&width=800`, family: "Ascolto", category: "Finger", sizes: ["S", "M", "L"] },
  { slug: "blow-up-forma-earrings-silver-gold-fw26", name: "Blow Up Forma Earrings", price: "633€", image: `${CDN}81.jpg?v=1783072350&width=800`, family: "Blow Up", category: "Ear" },
  { slug: "kismet-earrings-silver-fw26", name: "Kismet Earrings", price: "816€", image: `${CDN}94.jpg?v=1783070106&width=800`, family: "Ascolto", category: "Ear" },
  { slug: "orbit-choker-silver-fw26", name: "Orbit Choker", price: "957€", image: `${CDN}149.jpg?v=1783071015&width=800`, family: "Orbit", category: "Neck" },
  { slug: "pierced-serpent-hoops-silver-cao", name: "Pierced Serpent Hoops", price: "314€", image: `${CDN}Panconesi-SS24-Packshots-_14.01.24_0142.jpg?v=1753516091&width=1200`, hoverImage: `${CDN}40_2.jpg?v=1754073950&width=1200`, family: "Serpent", category: "Ear", colors: 1 },
  { slug: "blow-up-ear-cuff-silver-cao", name: "Blow Up Cuff", price: "251€", image: `${CDN}122.jpg?v=1783087410&width=800`, hoverImage: `${CDN}Cropped_12.jpg?v=1783087384&width=800`, family: "Blow Up", category: "Ear" },
  { slug: "serpent-hoops-small-silver-cao", name: "Serpent Hoops Small", price: "251€", image: `${CDN}PANCONESI0746_40485159-05bf-4ca2-a331-88024bb6c701.jpg?v=1737107382&width=800`, hoverImage: `${CDN}42-2.jpg?v=1754074017&width=800`, family: "Serpent", category: "Ear" },
  { slug: "blow-up-stellar-ear-cuff-silver-cao", name: "Blow Up Stellar Cuff", price: "188€", image: `${CDN}PANCONESI0947-2.jpg?v=1753516294&width=800`, hoverImage: `${CDN}PANCONESI0761-2.jpg?v=1754074062&width=800`, family: "Stellar", category: "Ear" },
  { slug: "constellation-cluster-earrings-silver-fw26", name: "Constellation Cluster Earrings", price: "382€", image: `${CDN}89.jpg?v=1783072222&width=800`, family: "Constellation", category: "Ear" },
  { slug: "orbit-ring-silver-fw26", name: "Orbit Ring", price: "408€", image: `${CDN}146.jpg?v=1783070981&width=800`, family: "Orbit", category: "Finger", sizes: ["S", "M", "L", "XL"] },
  { slug: "ascolto-necklace-silver-fw26", name: "Ascolto Necklace", price: "988€", image: `${CDN}124.jpg?v=1783073028&width=800`, family: "Ascolto", category: "Neck" },
];

const COLLECTIONS = [
  { slug: "new", title: "New", eyebrow: "New arrivals", image: `${CDN}dddsssaa.jpg?v=1782931528&width=900` },
  { slug: "all", title: "Shop All", eyebrow: "141 Products", image: `${CDN}sdfg.jpg?v=1782931526&width=900` },
  { slug: "ss26-collection", title: "SS26 Collection", eyebrow: "Seasonal", image: `${CDN}PANCONESI_LOV_V2_ng-60.jpg?v=1769950491&width=900` },
  { slug: "fw26-collection", title: "FW26 Collection", eyebrow: "Seasonal", image: `${COLLECTION_CDN}sdfg.jpg?v=1783170905&width=700` },
  { slug: "signatures", title: "Signatures", eyebrow: "Icons", image: `${COLLECTION_CDN}0386_8231fb93-21de-423b-afbd-6186ac8b2234.jpg?v=1783093794&width=700` },
  { slug: "ascolto", title: "Ascolto", eyebrow: "Family", image: `${CDN}IMG_1490.jpg?v=1769693986&width=900` },
  { slug: "blow-up", title: "Blow Up", eyebrow: "Family", image: `${CDN}new_blow_up_family.jpg?v=1769694116&width=900` },
  { slug: "diamanti-constellation", title: "Constellation", eyebrow: "Family", image: `${CDN}IMG_1720-Edit.jpg?v=1769694217&width=900` },
  { slug: "orbit", title: "Orbit", eyebrow: "Family", image: `${CDN}IMG_1929.jpg?v=1769694325&width=900` },
  { slug: "serpent", title: "Serpent", eyebrow: "Family", image: `${CDN}IMG_1894.jpg?v=1769694407&width=900` },
  { slug: "stellar-solar", title: "Stellar", eyebrow: "Family", image: `${CDN}IMG_1971.jpg?v=1769694484&width=900` },
  { slug: "silver", title: "Silver", eyebrow: "Composition", image: `${CDN}IMG_1637_copy.jpg?v=1769694742&width=900` },
  { slug: "gold", title: "Gold", eyebrow: "Composition", image: `${CDN}IMG_1923.jpg?v=1769694833&width=900` },
  { slug: "enamel", title: "Enamel", eyebrow: "Composition", image: `${CDN}IMG_1389.jpg?v=1769694993&width=900` },
  { slug: "gems", title: "Gems", eyebrow: "Composition", image: `${CDN}IMG_1727.jpg?v=1769695142&width=900` },
  { slug: "ear", title: "Ear", eyebrow: "Anatomy", image: `${CDN}dddsssaa.jpg?v=1782931528&width=900` },
  { slug: "finger", title: "Finger", eyebrow: "Anatomy", image: `${CDN}dfffff.jpg?v=1782931528&width=900` },
  { slug: "neck", title: "Neck", eyebrow: "Anatomy", image: `${CDN}260712_panconesi_atelier_ck_01_R_40e3f32f-6161-4373-9cae-c800dbc2a271.jpg?v=1788786183&width=900` },
  { slug: "wrist", title: "Wrist", eyebrow: "Anatomy", image: `${CDN}260616_panconesi_objects10556_R_42cf7bfa-a147-463a-8f43-bd93c54a4ba8.jpg?v=1783003644&width=900` },
  { slug: "body", title: "Body", eyebrow: "Anatomy", image: `${CDN}body-diamanti-chandelier-brooch.jpg?v=1769693703&width=900` },
  { slug: "objects", title: "Objects", eyebrow: "Beyond jewelry", image: `${CDN}260616_panconesi_objects10556_R_42cf7bfa-a147-463a-8f43-bd93c54a4ba8.jpg?v=1783003644&width=900` },
  { slug: "seasonalsale", title: "Sale", eyebrow: "Selected pieces", image: `${CDN}PANCONESI_LOV_V2_ng-60.jpg?v=1769950491&width=900` },
  { slug: "popular", title: "Bestsellers", eyebrow: "Popular", image: `${CDN}new_blow_up_family.jpg?v=1769694116&width=900` },
  { slug: "p-collection", title: "P Earrings", eyebrow: "Collection", image: `${CDN}IMG_1637_copy.jpg?v=1769694742&width=900` },
  { slug: "ear-cuffs", title: "Ear Cuffs", eyebrow: "Category", image: `${CDN}IMG_1929.jpg?v=1769694325&width=900` },
];

const SHOP_LINKS = [["FW26 Collection", "/collections/fw26-collection"], ["Signatures", "/collections/signatures"], ["New", "/collections/new"], ["Jewelry", "/collections/all"], ["Bespoke", "/pages/bespoke"], ["Objects", "/collections/objects"], ["Sale", "/collections/seasonalsale"]];
const FAMILY_LINKS = [["Ascolto", "/collections/ascolto"], ["Blow Up", "/collections/blow-up"], ["Constellation", "/collections/diamanti-constellation"], ["Orbit", "/collections/orbit"], ["Serpent", "/collections/serpent"], ["Stellar", "/collections/stellar-solar"]];
const COMPOSITION_LINKS = [["Silver", "silver"], ["Gold", "gold"], ["Enamel", "enamel"], ["Gems", "gems"]];
const ANATOMY_LINKS = [["Ear", "ear"], ["Finger", "finger"], ["Neck", "neck"], ["Wrist", "wrist"], ["Body", "body"]];

const EUR_TO_TOMAN = 100_000;
const PRODUCT_NAMES_FA: Record<string, string> = {
  "Diamanti Nova Ring": "انگشتر الماس نوا",
  "Diamanti Pendant Ring Large": "انگشتر آویز الماس بزرگ",
  "Diamanti Pendant Ring Small": "انگشتر آویز الماس کوچک",
  "Kismet Hoops": "حلقه‌های کیسمت",
  "Pierced Circle Cuff": "کاف دایره‌ای پیرس",
  "Blow Up Helix Ear Cuff": "کاف گوش هلیکس بلوآپ",
  "Blow Up Forma Ear Cuff": "کاف گوش فورما بلوآپ",
  "Blow Up Forma Ring": "انگشتر فورما بلوآپ",
  "Pierced Solar Hoops Large": "حلقه‌های خورشیدی بزرگ",
  "Pierced Helix Earrings": "گوشواره‌های هلیکس پیرس",
  "Orbit Ear Cuff": "کاف گوش اوربیت",
  "Orbit Multi Ear Cuff": "کاف گوش چندگانه اوربیت",
  "Pierced Huggies": "گوشواره‌های هاگیز پیرس",
  "Nova Earrings": "گوشواره‌های نوا",
  "Ascolto Aura Drop Earrings": "گوشواره آویز هاله اسکولتو",
  "Ascolto Aura Ring": "انگشتر هاله اسکولتو",
  "Blow Up Forma Earrings": "گوشواره‌های فورما بلوآپ",
  "Kismet Earrings": "گوشواره‌های کیسمت",
  "Orbit Choker": "چوکر اوربیت",
  "Pierced Serpent Hoops": "حلقه‌های مار پیرس",
  "Blow Up Cuff": "کاف بلوآپ",
  "Serpent Hoops Small": "حلقه‌های مار کوچک",
  "Blow Up Stellar Cuff": "کاف ستاره‌ای بلوآپ",
  "Constellation Cluster Earrings": "گوشواره خوشه‌ای صورت فلکی",
  "Orbit Ring": "انگشتر اوربیت",
  "Ascolto Necklace": "گردنبند اسکولتو",
};
const FA_LABELS: Record<string, string> = {
  New: "جدیدها", "New arrivals": "تازه‌واردها", "Shop All": "همه محصولات", "141 Products": "۱۴۱ محصول",
  "SS26 Collection": "مجموعه SS26", "FW26 Collection": "مجموعه FW26", Seasonal: "فصلی", Icons: "نمادها",
  Family: "خانواده", Composition: "متریال", Anatomy: "آناتومی", "Beyond jewelry": "فراتر از جواهرات",
  "Selected pieces": "محصولات منتخب", Popular: "محبوب‌ها", Collection: "مجموعه", Category: "دسته‌بندی",
  Ascolto: "اسکولتو", "Blow Up": "بلوآپ", Constellation: "صورت فلکی", Orbit: "اوربیت", Serpent: "مار", Stellar: "ستاره",
  Silver: "نقره‌ای", Gold: "طلایی", Enamel: "مینای رنگی", Gems: "سنگ‌های قیمتی", Ear: "گوش", Finger: "انگشت", Neck: "گردن", Wrist: "مچ", Body: "بدن",
  Signatures: "امضادارها", Newer: "جدیدها", Jewelry: "جواهرات", Bespoke: "سفارشی", Objects: "اشیاء", Sale: "حراج",
  "P Earrings": "گوشواره‌های P", "Ear Cuffs": "کاف‌های گوش", Bestsellers: "پرفروش‌ها",
};

function faLabel(value: string) { return FA_LABELS[value] ?? value; }
function productName(product: Product) { return PRODUCT_NAMES_FA[product.name] ?? product.name; }
function formatToman(value: string) {
  const euro = Number(value.replace(/[^\d]/g, ""));
  return `${(euro * EUR_TO_TOMAN).toLocaleString("fa-IR")} تومان`;
}
function faFamily(value: string) { return faLabel(value); }
function faCategory(value: string) { return faLabel(value); }

const pageCopy: Record<string, { title: string; lead: string; paragraphs: string[]; image?: string; image2?: string }> = {
  about: { title: "درباره ما", lead: "ORÉA جواهرات را امتدادی از بدن می‌داند؛ زبانی زنده که با حرکت، احساس و حضور شکل می‌گیرد.", paragraphs: ["ORÉA در سال ۲۰۱۸ با هدف بازگرداندن ارزش احساسی به آنچه می‌پوشیم شکل گرفت. این برند از نخستین مجموعه خود جایگاهی متمایز در دنیای جواهرات ساخته است.", "چهار کد اصلی خانه، انباشت، حرکت، طبیعت و بافت هستند. هر قطعه برای حرکت و تکامل همراه با صاحبش طراحی می‌شود و انرژی‌ای مجسمه‌وار دارد."], image: `${CDN}Panconesi_VF2711.jpg?v=1769696196&width=1000`, image2: `${CDN}CONTACT.jpg?v=1753792366&width=1000` },
  craft: { title: "هنر ساخت", lead: "جواهرسازی یک هنر است؛ رسانه‌ای برای روایت داستان و جشن گرفتن هویت.", paragraphs: ["ما چه در تجربه با مواد منحصربه‌فرد و چه در ساخت طراحی‌های ماژولار، هر اثر را با کنجکاوی و دقت می‌سازیم.", "استودیوی پاریس ما کارگاهی پویاست که در آن هنر با نوآوری پیوند می‌خورد. تکنیک‌های سنتی، پایه خلق قطعاتی هستند که هم دست‌ساز و هم معاصر به نظر می‌رسند."], image: `${CDN}CONTACT.jpg?v=1753792366&width=1000`, image2: `${CDN}1653-05_copie.jpg?v=1753780045&width=1000` },
  philosophy: { title: "فلسفه", lead: "ORÉA از میل به بازگرداندن ارزش احساسی آنچه می‌پوشیم متولد شد.", paragraphs: ["جهان خلاق این برند بر انباشت، حرکت، طبیعت و بافت بنا شده است. هر قطعه امتدادی از بدن است که با صاحبش حرکت و تکامل پیدا می‌کند.", "تمام مجموعه‌ها در کارگاه‌های خانوادگی فلورانس و آرتزو ساخته می‌شوند. این تعهد به هنر ساخت با رویکردی مسئولانه به پایداری همراه است."], image: `${CDN}intro_savoir-faire_e13f5931-b3af-4c94-99a0-f00e2fc1a308.jpg?v=1753880262&width=1000`, image2: `${CDN}Panconesi_VF1832_980d4490-bf6b-44c7-b920-f8d3f1eb0004.jpg?v=1770110554&width=1000` },
  bespoke: { title: "سفارشی‌سازی", lead: "رویکردی شخصی به جواهرات، برآمده از زبان طراحی خانه.", paragraphs: ["هر قطعه با یک گفت‌وگو، یک ایده، یک سنگ، یک خاطره یا غریزه‌ای آغاز می‌شود که با داستان صاحبش شکل می‌گیرد.", "این فرایند با گفت‌وگو، طراحی و پژوهش متریال پیش می‌رود. سنگ‌های خاص برای هر قطعه تهیه می‌شوند و حتی سنگ‌های شخصی صاحب اثر نیز می‌توانند در طراحی به کار روند.", "برای شروع، فرم درخواست سفارشی را تکمیل کنید تا تیم ما با شما تماس بگیرد."], image: `${CDN}Panconesi_VF2711.jpg?v=1769696196&width=1000`, image2: `${CDN}CONTACT.jpg?v=1753792366&width=1000` },
};

function href(path: string) { return path.startsWith("/") ? path : `/collections/${path}`; }

function Header({ onSearch, onCart, onMenu, cartCount }: { onSearch: () => void; onCart: () => void; onMenu: () => void; cartCount: number }) {
  const [announcementOpen, setAnnouncementOpen] = useState(true);
  return <>{announcementOpen && <div className="announcement"><span>ارسال رایگان برای سفارش‌های بالای ۴۰٬۰۰۰٬۰۰۰ تومان.</span><span>ارسال رایگان برای سفارش‌های بالای ۴۰٬۰۰۰٬۰۰۰ تومان.</span><span>ارسال رایگان برای سفارش‌های بالای ۴۰٬۰۰۰٬۰۰۰ تومان.</span><button aria-label="بستن اطلاعیه" onClick={() => setAnnouncementOpen(false)}>×</button></div>}<header className="site-header"><button className="mobile-only icon-button" onClick={onMenu} aria-label="باز کردن منو"><Menu size={18} /></button><a className="header-link header-left" href="/collections/all">فروشگاه <span className="desktop-only">↓</span></a><a className="wordmark" href="/">ORÉA</a><nav className="desktop-only header-right"><a href="/pages/about">درباره ما</a><button onClick={onSearch}>جست‌وجو</button><button onClick={onCart}>سبد خرید&nbsp; {cartCount}</button></nav><button className="mobile-only icon-button" onClick={onCart} aria-label="باز کردن سبد خرید"><ShoppingBag size={17} /><span>{cartCount}</span></button></header></>;
}

function Footer() {
  const [email, setEmail] = useState(""); const [sent, setSent] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    try {
      await apiRequest("/newsletter", { method: "POST", body: JSON.stringify({ email }) });
    } catch {
      rememberLocalAction("orea-newsletter", { email });
    }
    setSent(true);
  }
  return <footer className="site-footer"><div className="service-strip"><div><strong>ارسال رایگان</strong><span>ارسال رایگان برای سفارش‌های بالای ۴۰ میلیون تومان</span></div><div><strong>تحویل حضوری</strong><span>با تعیین وقت قبلی در پاریس</span></div><div><strong>مرجوعی</strong><span>تا ۷ روز پس از تحویل امکان‌پذیر است</span></div><div><strong>خدمات مشتریان</strong><span>دوشنبه تا جمعه، ۱۰ تا ۱۸ به وقت اروپا</span></div><div><strong>مبدأ</strong><span>طراحی در پاریس، ساخت در ایتالیا</span></div></div><div className="footer-main"><div className="footer-columns"><div><span className="footer-label">فروشگاه</span>{SHOP_LINKS.map(([label, url]) => <a href={url} key={url}>{faLabel(label)}</a>)}</div><div><span className="footer-label">خانواده‌ها</span>{FAMILY_LINKS.map(([label, url]) => <a href={url} key={url}>{faLabel(label)}</a>)}</div><div><span className="footer-label">متریال</span>{COMPOSITION_LINKS.map(([label, slug]) => <a href={href(slug)} key={slug}>{faLabel(label)}</a>)}</div><div><span className="footer-label">آناتومی</span>{ANATOMY_LINKS.map(([label, slug]) => <a href={href(slug)} key={slug}>{faLabel(label)}</a>)}</div><div><span className="footer-label">دسته‌بندی</span><a href="/collections/signatures">امضادارها</a><a href="/collections/fw26-collection">فصلی</a><a href="/collections/all">همه محصولات</a></div><div><span className="footer-label">ارتباط با ما</span><a href="https://www.instagram.com/panconesi/">اینستاگرام</a><a href="https://www.facebook.com/profile.php?id=100069343290052">فیس‌بوک</a><a href="https://www.linkedin.com/company/panconesi/">لینکدین</a><a href="/pages/faq">سؤالات متداول</a><a href="/pages/contact">تماس با ما</a><a href="/pages/legals">قوانین</a></div></div><div className="footer-newsletter"><div className="newsletter-image"><img src={`${CDN}lamw.jpg?v=1782931528&width=800`} alt="خبرنامه" /></div><div><span className="footer-label">خبرنامه</span><p>برای اطلاع از محصولات جدید و پیشنهادهای ویژه عضو شوید.</p><form onSubmit={submit}><input type="email" aria-label="ایمیل" placeholder="نشانی ایمیل" value={email} onChange={(event) => setEmail(event.target.value)} /><button type="submit">{sent ? "ثبت شد" : "ثبت"}</button></form></div></div></div><div className="footer-bottom"><span>©۲۰۲۶ ORÉA</span><span>طراحی در پاریس، ساخت در ایتالیا</span></div></footer>;
}

function SearchDrawer({ onClose, query, setQuery, products }: { onClose: () => void; query: string; setQuery: (value: string) => void; products: Product[] }) {
  const results = products.filter((product) => `${product.name} ${productName(product)}`.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
  return <div className="overlay-layer"><div className="drawer search-drawer"><button className="drawer-close" onClick={onClose}><X size={18} /></button><div className="drawer-title">جست‌وجو</div><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="چه چیزی می‌خواهید پیدا کنید؟" />{query && <div className="search-results">{results.length ? results.map((product) => <a href={`/products/${product.slug}`} key={product.slug}><img src={product.image} alt="" /><span>{productName(product)}<small>{formatToman(product.price)}</small></span><ChevronRight size={14} /></a>) : <p>نتیجه‌ای پیدا نشد.</p>}</div>}<div className="popular"><span>جست‌وجوهای محبوب</span><a href="/products/pierced-serpent-hoops-silver-cao">حلقه‌های مار</a><a href="/collections/finger">انگشترها</a><a href="/collections/ear">گوشواره‌ها</a><a href="/collections/serpent">خانواده مار</a></div></div></div>;
}

function CartDrawer({ items, onClose, onCheckout }: { items: Product[]; onClose: () => void; onCheckout: () => void }) {
  return <div className="overlay-layer"><div className="drawer cart-drawer"><button className="drawer-close" onClick={onClose}><X size={18} /></button><div className="drawer-title">سبد خرید <span>{items.length}</span></div>{items.length === 0 ? <div className="empty-cart"><p>سبد خرید شما خالی است.</p><a className="text-link" href="/collections/all" onClick={onClose}>ادامه خرید <ChevronRight size={14} /></a></div> : <><div className="cart-items">{items.map((item, index) => <div className="cart-item" key={`${item.slug}-${index}`}><img src={item.image} alt="" /><div><strong>{productName(item)}</strong><span>{formatToman(item.price)}</span></div></div>)}</div><button className="dark-button full-width" onClick={onCheckout}>تسویه حساب <span>{items.length} محصول</span></button></>}</div></div>;
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return <div className="overlay-layer"><div className="drawer mobile-menu"><button className="drawer-close" onClick={onClose}><X size={18} /></button><div className="drawer-title">منو</div><a href="/collections/all" onClick={onClose}>فروشگاه</a><a href="/pages/about" onClick={onClose}>درباره ما</a><div className="menu-group"><span>مجموعه‌ها</span>{[...SHOP_LINKS, ...FAMILY_LINKS].map(([label, url]) => <a href={url} onClick={onClose} key={`${label}${url}`}>{faLabel(label)}<ChevronRight size={13} /></a>)}</div><div className="menu-group"><span>کشف کنید</span><a href="/pages/campaigns" onClick={onClose}>کمپین‌ها</a><a href="/pages/craft" onClick={onClose}>هنر ساخت</a><a href="/pages/philosophy" onClick={onClose}>فلسفه</a><a href="/pages/contact" onClick={onClose}>تماس با ما</a></div></div></div>;
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) {
  return <article className="product-card"><a href={`/products/${product.slug}`} className="product-image-wrap"><img className="product-image" src={product.image} alt={productName(product)} /><img className="product-image product-hover" src={product.hoverImage ?? product.image} alt="" /></a><div className="product-meta"><a href={`/products/${product.slug}`}><span>{productName(product)}</span><span>{formatToman(product.price)}</span></a>{product.sizes && <small>{product.sizes.join("  ")}</small>}{product.colors ? <small>+ {product.colors} رنگ</small> : null}<button className="quick-add" onClick={() => onAdd(product)}>افزودن</button></div></article>;
}

function ProductGrid({ products, onAdd }: { products: Product[]; onAdd: (product: Product) => void }) { return <div className="product-grid">{products.map((product) => <ProductCard key={product.slug} product={product} onAdd={onAdd} />)}</div>; }

function CollectionFamilyRail({ active }: { active: string }) {
  const families = COLLECTIONS.filter((item) => ["Ascolto", "Blow Up", "Constellation", "Orbit", "Serpent", "Stellar"].includes(item.title));
  return <div className="family-rail">{families.map((family) => <a href={`/collections/${family.slug}`} className={family.title === active ? "active" : ""} key={family.slug}><img src={family.image} alt="" /><span>{faLabel(family.title)}</span></a>)}</div>;
}

function CollectionPage({ slug, onAdd, products: catalogProducts }: { slug: string; onAdd: (product: Product) => void; products: Product[] }) {
  const collection = COLLECTIONS.find((item) => item.slug === slug) ?? COLLECTIONS[1];
  const [grid, setGrid] = useState("4");
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Ear", "Finger", "Neck", "Wrist", "Body"];
  const products = useMemo(() => {
    let result = catalogProducts;
    if (slug === "new") result = catalogProducts.slice(0, 14);
    if (slug === "seasonalsale") result = catalogProducts.slice(6).filter((_, index) => index % 2 === 0);
    if (slug === "objects") result = [];
    if (["Ascolto", "Blow Up", "Constellation", "Orbit", "Serpent", "Stellar"].includes(collection.title)) result = result.filter((product) => product.family === collection.title);
    if (filter !== "All") result = result.filter((product) => product.category === filter);
    return result.length ? result : catalogProducts.slice(0, 8);
  }, [catalogProducts, collection.title, filter, slug]);
  return <main className="collection-page"><section className="collection-intro"><div className="collection-hero-image"><img src={collection.image} alt="" /></div><div className="collection-title"><span>{faLabel(collection.eyebrow)}</span><h1>{faLabel(collection.title)}</h1><p>{collection.title === "Shop All" ? "مجموعه‌ای از قطعاتی که برای حرکت با بدن طراحی شده‌اند؛ مجسمه‌وار، لمسی و زنده." : `مجموعه ${faLabel(collection.title)} را کشف کنید.`}</p></div></section><CollectionFamilyRail active={collection.title} /><div className="collection-toolbar"><div><button className="toolbar-filter" onClick={() => setFilter(filter === "All" ? "Ear" : "All")}>فیلترها <ChevronDown size={13} /></button><span className="product-count">{products.length.toLocaleString("fa-IR")} محصول</span></div><div className="toolbar-right"><span className="desktop-only">منتخب</span><button className={grid === "2" ? "selected" : ""} onClick={() => setGrid("2")}>۲</button><button className={grid === "4" ? "selected" : ""} onClick={() => setGrid("4")}>۴</button><button className={grid === "8" ? "selected" : ""} onClick={() => setGrid("8")}>۸</button><button className={grid === "list" ? "selected" : ""} onClick={() => setGrid("list")}>فهرست</button></div></div>{filter !== "All" && <div className="filter-pills">{filters.map((item) => <button className={item === filter ? "selected" : ""} key={item} onClick={() => setFilter(item)}>{item === "All" ? "همه" : faLabel(item)}</button>)}</div>}<div className={`collection-products grid-${grid}`}><ProductGrid products={products} onAdd={onAdd} /></div><div className="collection-next"><span>مجموعه قبلی و بعدی</span><a href="/collections/wrist"><ChevronLeft size={13} /> مچ</a><a href="/collections/ascolto">اسکولتو <ChevronRight size={13} /></a></div></main>;
}

function HomePage() {
  return <main className="home-page"><section className="home-hero"><a href="/collections/all" className="hero-half"><img src={`${CDN}dddsssaa.jpg?v=1782931528&width=1200`} alt="کمپین جواهرات ORÉA" /></a><a href="/collections/all" className="hero-half"><img src={`${CDN}dfffff.jpg?v=1782931528&width=1200`} alt="کمپین جواهرات ORÉA" /></a><div className="hero-wordmark">ORÉA</div></section><section className="home-intro"><h1>قطعه‌ای برای گفت‌وگو</h1><p>جواهرات به‌عنوان امتدادی از بدن، به کنش و واکنشی تبدیل می‌شوند که از گفت‌وگوی احساسی با درون شکل گرفته است. زیورآلات منفعل نیستند؛ فرم‌ها می‌پیچند و می‌چرخند تا بدن را در رقصی از حرکت و حضور همراهی کنند.</p><a className="discover-link" href="/collections/ss26-collection">کشف کنید</a></section><section className="story-split"><div className="story-copy"><span className="eyebrow">اشیاء</span><h2>اشیاء</h2><a className="discover-link" href="/collections/objects">کشف کنید</a><p>شمعدان اسکولتو مانند یک توتم مجسمه‌وار، سنگ‌های رنگی را در تعادلی ظریف کنار هم قرار می‌دهد؛ ترکیبی که میان سکون و حرکت، حسی آیینی می‌سازد.</p></div><div className="story-images"><img src={`${CDN}260616_panconesi_objects10556_R_42cf7bfa-a147-463a-8f43-bd93c54a4ba8.jpg?v=1783003644&width=1000`} alt="اشیاء ORÉA" /><img src={`${CDN}PANCONESI_LOV_V2_ng-60.jpg?v=1769950491&width=1000`} alt="اشیاء ORÉA" /></div></section><section className="home-collage"><a href="/collections/diamanti-constellation"><img src={`${CDN}IMG_1683.jpg?v=1769693125&width=900`} alt="صورت فلکی" /></a><a href="/collections/ascolto"><img src={`${CDN}IMG_2121.jpg?v=1769693448&width=900`} alt="اسکولتو" /></a><a href="/collections/stellar-solar"><img src={`${CDN}IMG_1601.jpg?v=1769693565&width=900`} alt="ستاره" /></a><a href="/collections/all"><img src={`${CDN}IMG_2085.jpg?v=1769693774&width=900`} alt="جواهرات ORÉA" /></a></section></main>;
}

function ProductPage({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [open, setOpen] = useState<string | null>(null);
  const [variant, setVariant] = useState("silver");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? "");
  const gallery = [product.image, product.hoverImage ?? product.image, `${CDN}40.jpg?v=1754073950&width=1200`, `${CDN}panconesi0938.jpg?v=1754073950&width=1200`, `${CDN}panconesi0945.jpg?v=1754073950&width=1200`];
  const accordionItems = [
    ["ترکیب", "ساخته‌شده در ایتالیا از نقره استرلینگ بازیافتی و پرداخت‌شده با دست."],
    ["جزئیات", "طراحی‌شده در پاریس. زمان آماده‌سازی و ارسال بین ۲ تا ۴ هفته است."],
    ["ارسال و مرجوعی", "ارسال برای سفارش‌های بالای ۴۰ میلیون تومان رایگان است. مرجوعی تا ۷ روز پس از تحویل امکان‌پذیر است."],
    ["مراقبت", "با پارچه‌ای نرم به‌آرامی تمیز کنید و دور از رطوبت نگهداری کنید."],
  ];
  return <main className="product-page"><div className="breadcrumbs"><a href={`/collections/${product.category.toLowerCase()}`}>{faCategory(product.category)}</a><span>→</span><strong>{productName(product)}</strong></div><section className="product-layout"><div className="product-gallery"><div className="gallery-thumbs">{gallery.map((image, index) => <button className={activeImage === image ? "active" : ""} onClick={() => setActiveImage(image)} key={`${image}${index}`}><img src={image} alt="" /></button>)}</div><div className="gallery-main"><img src={activeImage} alt={productName(product)} /><button className="gallery-prev" onClick={() => setActiveImage(gallery[Math.max(0, gallery.indexOf(activeImage) - 1)])}><ChevronLeft size={18} /></button><button className="gallery-next" onClick={() => setActiveImage(gallery[(gallery.indexOf(activeImage) + 1) % gallery.length])}><ChevronRight size={18} /></button></div></div><aside className="product-details"><div className="product-title-row"><h1>{productName(product)}</h1><span>{formatToman(product.price)}</span></div><div className="variant-row"><button className={`variant ${variant === "silver" ? "selected" : ""}`} onClick={() => setVariant("silver")}><span className="swatch silver" />نقره‌ای</button><button className={`variant ${variant === "gold" ? "selected" : ""}`} onClick={() => setVariant("gold")}><span className="swatch gold" />طلایی</button></div><p className="product-description">این قطعه از خانواده {faFamily(product.family)} است؛ فرمی امضادار که با حجمی چشمگیر و حسی معاصر، برای همراهی با بدن طراحی شده است.</p>{product.sizes && <div className="size-row">{product.sizes.map((size) => <button className={selectedSize === size ? "selected" : ""} onClick={() => setSelectedSize(size)} key={size}>{size}</button>)}</div>}<button className="dark-button add-button" onClick={() => onAdd(product)}>افزودن به سبد <span>{formatToman(product.price)}</span></button><div className="accordions">{accordionItems.map(([item, body]) => <div className="accordion" key={item}><button onClick={() => setOpen(open === item ? null : item)}><span>{item}</span><Plus size={14} className={open === item ? "rotate" : ""} /></button>{open === item && <p>{body}</p>}</div>)}</div></aside></section><section className="product-editorial"><a href="/pages/campaigns"><img src={`${CDN}Panconesi_VF2711.jpg?v=1769696196&width=1000`} alt="لحظه‌های خیال" /><span>لحظه‌های خیال<small>عکاس: وینسنت فرانه</small></span></a><a href="/pages/campaigns"><img src={`${CDN}CONTACT.jpg?v=1753792366&width=1000`} alt="مجموعه گوش" /><span>مجموعه گوش<small>عکاس: تو نورگارد</small></span></a></section><section className="anatomy-section"><div><span className="eyebrow">آناتومی</span><h2>خرید بر اساس محل استفاده</h2><a className="discover-link" href="/collections/all">همه محصولات</a></div><div className="anatomy-links">{ANATOMY_LINKS.map(([label, slug]) => <a href={href(slug)} key={slug}>{faLabel(label)}<ChevronRight size={14} /></a>)}</div></section></main>;
}

function EditorialPage({ page, onAdd, products }: { page: string; onAdd: (product: Product) => void; products: Product[] }) {
  if (page === "campaigns") return <CampaignsPage />;
  if (page === "contact") return <ContactPage />;
  if (page === "faq") return <FaqPage />;
  if (page === "legals") return <LegalsPage />;
  const content = pageCopy[page] ?? pageCopy.about;
  return <main className="editorial-page"><div className="editorial-heading"><span className="eyebrow">درباره ما <span>→</span></span><h1>{content.title}</h1></div><section className="editorial-lead"><div><h2>{content.lead}</h2>{content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<a className="dark-button inline-button" href={page === "bespoke" ? "/pages/contact" : "/collections/all"}>{page === "bespoke" ? "شروع درخواست سفارشی" : "ادامه خرید"}<ChevronRight size={14} /></a></div><div className="editorial-images"><img src={content.image} alt="" /><img src={content.image2 ?? content.image} alt="" /></div></section><section className="discover-more"><span>بیشتر کشف کنید</span><div><a href="/pages/campaigns">کمپین‌ها <ChevronRight size={14} /></a><a href="/pages/craft">هنر ساخت <ChevronRight size={14} /></a><a href="/pages/philosophy">فلسفه <ChevronRight size={14} /></a></div></section><ProductGrid products={products.slice(0, 8)} onAdd={onAdd} /></main>;
}

function CampaignsPage() {
  const campaigns = ["لحظه‌های خیال", "مجموعه گوش", "مجموعه دست", "مجموعه پرتره", "طبیعت بی‌جان", "وجوه", "زیارتگاه", "طلای گیاهان", "توتم‌ها", "کیمیا", "جواهرات خانوادگی", "دانشنامه"];
  const images = [`${CDN}Panconesi_VF2711.jpg?v=1769696196&width=1000`, `${CDN}CONTACT.jpg?v=1753792366&width=1000`, `${CDN}intro_savoir-faire_e13f5931-b3af-4c94-99a0-f00e2fc1a308.jpg?v=1753880262&width=1000`, `${CDN}1653-05_copie.jpg?v=1753780045&width=1000`];
  const [filter, setFilter] = useState("همه");
  const filteredCampaigns = filter === "همه" ? campaigns : campaigns.filter((_, index) => (filter === "کمپین" ? index % 3 === 0 : filter === "کوتور" ? index % 3 === 1 : index % 3 === 2));
  return <main className="campaigns-page"><div className="editorial-heading"><span className="eyebrow">درباره ما <span>→</span></span><h1>کمپین‌ها</h1></div><p className="campaign-intro">کمپین‌های ORÉA پنجره‌ای به جهان تصویری در حال تحول برند هستند؛ جایی که جواهرات به رسانه‌ای برای تجربه، احساس و روایت تبدیل می‌شوند.</p><div className="campaign-filters">{["همه", "کمپین", "کوتور", "فیلم"].map((item) => <button className={filter === item ? "selected" : ""} onClick={() => setFilter(item)} key={item}>{item === "همه" ? "↓ همه" : item}</button>)}</div><div className="campaign-grid">{filteredCampaigns.map((campaign) => { const index = campaigns.indexOf(campaign); return <a href="/pages/campaigns" key={campaign}><img src={images[index % images.length]} alt="" /><span>{campaign}<small>عکاس: {index % 2 ? "تو نورگارد" : "وینسنت فرانه"}</small></span></a>; })}</div></main>;
}

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    try {
      await apiRequest("/appointments", { method: "POST", body: JSON.stringify({ name, email, message }) });
    } catch {
      rememberLocalAction("orea-appointments", { name, email, message });
    }
    setSent(true);
  }

  return <main className="contact-page"><div className="editorial-heading"><span className="eyebrow">درباره ما <span>→</span></span><h1>تماس با ما</h1></div><section className="contact-layout"><div className="contact-copy"><div><span className="footer-label">پرسش‌های عمومی</span><a href="mailto:customercare@marcopanconesi.com">customercare@marcopanconesi.com</a></div><div><span className="footer-label">روابط عمومی و ارتباطات</span><a href="mailto:nancy@nancyxu.co">nancy@nancyxu.co</a></div><div><span className="footer-label">فروش از طریق آژانس Clothes</span><a href="mailto:carlo@clothes.agency">carlo@clothes.agency</a><a href="mailto:luca@clothes.agency">luca@clothes.agency</a><a href="mailto:ben@marcopanconesi.com">ben@marcopanconesi.com</a></div><div className="appointment"><h2>رزرو وقت ملاقات</h2><p>استودیوی پاریس ما با تعیین وقت قبلی از شما میزبانی می‌کند تا مجموعه را از نزدیک ببینید و قطعات موردعلاقه‌تان را امتحان کنید.</p><form className="appointment-form" onSubmit={submit}><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="نام و نام خانوادگی" /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ایمیل" /><textarea required value={message} onChange={(event) => setMessage(event.target.value)} placeholder="پیام شما" rows={4} /><button className="dark-button inline-button" type="submit">{sent ? "درخواست ثبت شد" : "رزرو وقت ملاقات"} <ChevronRight size={14} /></button></form></div></div><div className="contact-image"><img src={`${CDN}Panconesi_VF1832_980d4490-bf6b-44c7-b920-f8d3f1eb0004.jpg?v=1770110554&width=1000`} alt="استودیوی ORÉA" /></div></section></main>;
}

function FaqPage() {
  const questions = ["شرایط مرجوعی چیست؟", "چطور درخواست مرجوعی ثبت کنم؟", "چه زمانی وجه من بازگردانده می‌شود؟", "آیا می‌توانم سفارش ثبت‌شده را تغییر دهم؟", "چطور از موجود شدن دوباره محصول باخبر شوم؟", "آیا وقت ملاقات خصوصی دارید؟", "آیا می‌توانم یادداشت شخصی به سفارش اضافه کنم؟"];
  const [open, setOpen] = useState(0);
  const [tab, setTab] = useState("سفارش و مرجوعی");
  return <main className="faq-page"><div className="editorial-heading"><span className="eyebrow">درباره ما <span>→</span></span><h1>سؤالات متداول</h1></div><div className="faq-tabs">{["سفارش و مرجوعی", "محصولات و متریال", "ارسال"].map((item) => <button className={tab === item ? "selected" : ""} onClick={() => { setTab(item); setOpen(0); }} key={item}>{tab === item ? "↓ " : ""}{item}</button>)}</div><div className="faq-list">{questions.map((question, index) => <div className="faq-item" key={question}><button onClick={() => setOpen(open === index ? -1 : index)}><span>{question}</span><span>{open === index ? "−" : "+"}</span></button>{open === index && <p>{tab === "سفارش و مرجوعی" && index === 0 ? "مهلت مرجوعی ۷ روز پس از تاریخ تحویل است. کالا باید در شرایط اولیه، استفاده‌نشده، همراه با برچسب و بسته‌بندی اصلی بازگردانده شود." : `پاسخ مرتبط با بخش ${tab} را از تیم خدمات مشتریان دریافت کنید.`}</p>}</div>)}</div></main>;
}

function LegalsPage() {
  return <main className="legals-page"><div className="editorial-heading"><span className="eyebrow">درباره ما <span>→</span></span><h1>قوانین</h1></div><p className="legal-date">آخرین به‌روزرسانی: ۲۸ ژوئیه ۲۰۲۵</p><div className="legal-copy"><p>ORÉA این فروشگاه و وب‌سایت، از جمله اطلاعات، محتوا، قابلیت‌ها، ابزارها، محصولات و خدمات مرتبط را برای ارائه تجربه‌ای منتخب از خرید مدیریت می‌کند.</p><p>این سیاست حفظ حریم خصوصی توضیح می‌دهد هنگام بازدید، استفاده، خرید یا ارتباط با خدمات، اطلاعات شخصی شما چگونه جمع‌آوری، استفاده و افشا می‌شود.</p><div className="legal-section"><h2>سیاست حفظ حریم خصوصی <span>−</span></h2><p>منظور از اطلاعات شخصی، اطلاعاتی است که شما یا فرد دیگری را شناسایی می‌کند یا به‌طور منطقی به او مرتبط است. اطلاعات فقط تا زمانی نگهداری می‌شوند که برای ارائه خدمات و رعایت تعهدات قانونی لازم باشند.</p></div><div className="legal-section"><h2>شرایط استفاده از خدمات <span>+</span></h2></div><div className="legal-section"><h2>اطلاعات شخصی جمع‌آوری‌شده <span>+</span></h2></div></div></main>;
}

function CartPage({ items, onCheckout }: { items: Product[]; onCheckout: () => void }) {
  return <main className="cart-page"><div className="editorial-heading"><span className="eyebrow">فروشگاه <span>→</span></span><h1>سبد خرید شما</h1></div>{items.length ? <div className="cart-page-items">{items.map((item, index) => <div className="cart-page-item" key={`${item.slug}${index}`}><img src={item.image} alt="" /><div><h2>{productName(item)}</h2><span>{formatToman(item.price)}</span></div></div>)}<button className="dark-button" onClick={onCheckout}>تسویه حساب</button></div> : <div className="cart-page-empty"><p>سبد خرید شما خالی است.</p><a className="text-link" href="/collections/all">ادامه خرید <ChevronRight size={14} /></a></div>}</main>;
}

export default function PanconesiSite({ pathname, query }: { pathname: string; query: Record<string, string> }) {
  const [searchOpen, setSearchOpen] = useState(false); const [cartOpen, setCartOpen] = useState(false); const [menuOpen, setMenuOpen] = useState(false); const [searchQuery, setSearchQuery] = useState(query.q ?? ""); const [cart, setCart] = useState<Product[]>([]); const [cartReady, setCartReady] = useState(false); const [catalogProducts, setCatalogProducts] = useState<Product[]>(PRODUCTS); const [notice, setNotice] = useState("");
  useEffect(() => { try { setCart(JSON.parse(window.localStorage.getItem("orea-cart") ?? "[]") as Product[]); } catch { setCart([]); } finally { setCartReady(true); } }, []);
  useEffect(() => { if (cartReady) window.localStorage.setItem("orea-cart", JSON.stringify(cart)); }, [cart, cartReady]);
  useEffect(() => {
    let active = true;
    apiRequest<{ products: Product[] }>("/catalog/products").then((payload) => {
      if (active && payload.products?.length) setCatalogProducts(payload.products);
    }).catch(() => undefined);
    return () => { active = false; };
  }, []);
  const addToCart = (product: Product) => { setCart((current) => [...current, product]); setCartOpen(true); };
  const checkout = async () => {
    if (!cart.length) return;
    try {
      await apiRequest("/orders", { method: "POST", body: JSON.stringify({ items: cart.map((item) => ({ slug: item.slug, quantity: 1 })) }) });
    } catch {
      rememberLocalAction("orea-orders", { items: cart.map((item) => ({ slug: item.slug, quantity: 1 })) });
    }
    setCart([]);
    setCartOpen(false);
    setNotice("سفارش شما ثبت شد و برای هماهنگی با شما تماس می‌گیریم.");
    window.setTimeout(() => setNotice(""), 4500);
  };
  const segments = pathname.split("/").filter(Boolean);
  let content: React.ReactNode;
  if (pathname === "/") content = <HomePage />;
  else if (segments[0] === "collections") content = <CollectionPage slug={segments[1] ?? "all"} products={catalogProducts} onAdd={addToCart} />;
  else if (segments[0] === "products") { const product = catalogProducts.find((item) => item.slug === segments[1]) ?? catalogProducts[21] ?? PRODUCTS[21]; content = <ProductPage key={product.slug} product={product} onAdd={addToCart} />; }
  else if (segments[0] === "pages") content = <EditorialPage page={segments[1] ?? "about"} products={catalogProducts} onAdd={addToCart} />;
  else if (pathname === "/cart") content = <CartPage items={cart} onCheckout={checkout} />;
  else if (pathname === "/search") content = <CollectionPage slug="all" products={catalogProducts} onAdd={addToCart} />;
  else content = <HomePage />;
  return <div className="panconesi-site"><Header onSearch={() => setSearchOpen(true)} onCart={() => setCartOpen(true)} onMenu={() => setMenuOpen(true)} cartCount={cart.length} />{notice && <div className="toast" role="status">{notice}</div>}{content}<Footer />{searchOpen && <SearchDrawer products={catalogProducts} onClose={() => setSearchOpen(false)} query={searchQuery} setQuery={setSearchQuery} />}{cartOpen && <CartDrawer items={cart} onClose={() => setCartOpen(false)} onCheckout={checkout} />}{menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}</div>;
}
