import PanconesiSite from "@/components/sites/panconesi/site";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const pathname = `/${(slug ?? []).join("/")}`.replace(/\/$/, "") || "/";
  const normalizedQuery = Object.fromEntries(
    Object.entries(query).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] ?? "" : value ?? "",
    ]),
  );

  return <PanconesiSite pathname={pathname} query={normalizedQuery} />;
}
