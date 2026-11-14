const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const apiUrl = process.env.API_URL ?? "http://127.0.0.1:4000/api";
const routes = [
  "/",
  "/collections/all",
  "/collections/new",
  "/collections/ascolto",
  "/collections/finger",
  "/products/pierced-serpent-hoops-silver-cao",
  "/pages/about",
  "/pages/craft",
  "/pages/philosophy",
  "/pages/bespoke",
  "/pages/campaigns",
  "/pages/contact",
  "/pages/faq",
  "/pages/legals",
  "/cart",
  "/search?q=serpent",
];

let failed = false;
for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`);
  const body = await response.text();
  const good = response.ok && body.includes("ORÉA");
  console.log(`${good ? "PASS" : "FAIL"} ${response.status} ${route}`);
  if (!good) failed = true;
}

const productResponse = await fetch(`${baseUrl}/products/pierced-serpent-hoops-silver-cao`);
const productBody = await productResponse.text();
const priceCheck = productBody.includes("تومان");
console.log(`${priceCheck ? "PASS" : "FAIL"} product price is rendered in تومان`);
if (!priceCheck) failed = true;

try {
  const health = await fetch(`${apiUrl}/health`);
  const healthBody = await health.text();
  console.log(`${health.ok ? "PASS" : "FAIL"} API health ${health.status}`);
  if (!health.ok || !healthBody.includes("orea-api")) failed = true;
  const products = await fetch(`${apiUrl}/catalog/products`);
  const productsBody = await products.json();
  const catalogCheck = products.ok && Array.isArray(productsBody.products) && productsBody.products.length > 0;
  console.log(`${catalogCheck ? "PASS" : "FAIL"} API catalog products`);
  if (!catalogCheck) failed = true;
} catch {
  console.log("SKIP API live checks (start Docker Compose to run Mongo + NestJS)");
}

if (failed) process.exitCode = 1;
