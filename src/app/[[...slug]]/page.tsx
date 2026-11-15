import PanconesiSite from "@/components/sites/panconesi/site";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

const STATIC_ROUTES = [
  [],
  ["collections", "all"],
  ["collections", "new"],
  ["collections", "ss26-collection"],
  ["collections", "fw26-collection"],
  ["collections", "signatures"],
  ["collections", "ascolto"],
  ["collections", "blow-up"],
  ["collections", "diamanti-constellation"],
  ["collections", "orbit"],
  ["collections", "serpent"],
  ["collections", "stellar-solar"],
  ["collections", "silver"],
  ["collections", "gold"],
  ["collections", "enamel"],
  ["collections", "gems"],
  ["collections", "ear"],
  ["collections", "finger"],
  ["collections", "neck"],
  ["collections", "wrist"],
  ["collections", "body"],
  ["collections", "objects"],
  ["collections", "seasonalsale"],
  ["collections", "popular"],
  ["collections", "p-collection"],
  ["collections", "ear-cuffs"],
  ["products", "diamanti-nova-ring-silver-fw26"],
  ["products", "diamanti-pendant-ring-large-silver-fw26"],
  ["products", "diamanti-pendant-ring-small-silver-fw26"],
  ["products", "kismet-hoops-silver-fw26"],
  ["products", "pierced-circle-cuff-silver-fw26"],
  ["products", "blow-up-helix-ear-cuff-silver-fw26"],
  ["products", "blow-up-forma-ear-cuff-silver-fw26"],
  ["products", "blow-up-forma-ring-silver-fw26"],
  ["products", "pierced-solar-hoops-large-silver-fw26"],
  ["products", "pierced-helix-earrings-silver-fw26"],
  ["products", "orbit-ear-cuff-silver-ss26"],
  ["products", "orbit-multi-ear-cuff-silver-fw26"],
  ["products", "pierced-solar-hoops-large-gold-fw26"],
  ["products", "pierced-huggies-gold-ss26"],
  ["products", "nova-earrings-gold-fw26"],
  ["products", "ascolto-aura-drop-earrings-pink-fw26"],
  ["products", "ascolto-aura-ring-pink-fw26"],
  ["products", "blow-up-forma-earrings-silver-gold-fw26"],
  ["products", "kismet-earrings-silver-fw26"],
  ["products", "orbit-choker-silver-fw26"],
  ["products", "pierced-serpent-hoops-silver-cao"],
  ["products", "blow-up-ear-cuff-silver-cao"],
  ["products", "serpent-hoops-small-silver-cao"],
  ["products", "blow-up-stellar-ear-cuff-silver-cao"],
  ["products", "constellation-cluster-earrings-silver-fw26"],
  ["products", "orbit-ring-silver-fw26"],
  ["products", "ascolto-necklace-silver-fw26"],
  ["pages", "about"],
  ["pages", "craft"],
  ["pages", "philosophy"],
  ["pages", "bespoke"],
  ["pages", "campaigns"],
  ["pages", "contact"],
  ["pages", "faq"],
  ["pages", "legals"],
  ["cart"],
  ["search"],
] satisfies string[][];

export function generateStaticParams() {
  return STATIC_ROUTES.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const pathname = `/${(slug ?? []).join("/")}`.replace(/\/$/, "") || "/";

  return <PanconesiSite pathname={pathname} query={{}} />;
}
