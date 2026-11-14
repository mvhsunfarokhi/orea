# ORÉA

فروشگاه اینترنتی جواهرات با رابط کاربری فارسی و راست‌چین (RTL)، طراحی‌شده برای ارائهٔ یک تجربهٔ مینیمال و تصویری در خرید آنلاین محصولات لوکس.

ORÉA یک معماری full-stack دارد: رابط کاربری با Next.js ساخته شده، API با NestJS اجرا می‌شود و داده‌های کاتالوگ، خبرنامه، درخواست‌های ملاقات و سفارش‌ها در MongoDB ذخیره می‌شوند. اجرای یکپارچهٔ پروژه از طریق Docker Compose انجام می‌شود.

## ویژگی‌های فروشگاه

- رابط کاربری فارسی با پشتیبانی کامل از RTL
- نمایش قیمت‌ها به تومان با نرخ نمایشی ثابت `۱ یورو = ۱۰۰٬۰۰۰ تومان`
- صفحهٔ اصلی، کالکشن‌ها، صفحات محصول و صفحات محتوایی
- کاتالوگ محصولات با فیلتر بر اساس خانواده، متریال و محل استفاده
- تغییر چیدمان محصولات در حالت‌های مختلف و نمایش فهرستی
- جست‌وجوی محصولات با نمایش نتایج و قیمت تومانی
- صفحهٔ محصول با گالری تصاویر، انتخاب رنگ، انتخاب سایز و بخش‌های جزئیات
- سبد خرید با نگهداری وضعیت در LocalStorage
- ثبت سفارش در حالت `pending` از طریق API
- ثبت عضویت در خبرنامه
- فرم درخواست رزرو وقت ملاقات
- تب‌های FAQ و فیلتر کمپین‌ها
- fallback محلی برای ادامهٔ کار رابط کاربری در صورت در دسترس نبودن API

> پرداخت آنلاین، احراز هویت کاربر و اتصال به درگاه بانکی در این نسخه پیاده‌سازی نشده‌اند. ثبت سفارش فعلی برای ثبت درخواست و ادامهٔ فرایند فروش است.

## تکنولوژی‌ها

### Frontend

- Next.js 16
- React 19
- TypeScript
- CSS و Tailwind CSS
- Lucide React برای آیکن‌ها

### Backend و داده

- NestJS 11
- Mongoose
- MongoDB
- Class Validator و Class Transformer

### اجرا و کیفیت کد

- Docker
- Docker Compose
- ESLint
- TypeScript type checking
- تست smoke برای مسیرهای اصلی

## ساختار پروژه

```text
.
├── src/
│   ├── app/
│   │   ├── [[...slug]]/page.tsx     # route اصلی و مدیریت مسیرهای فروشگاه
│   │   ├── globals.css              # استایل‌های RTL و طراحی ORÉA
│   │   └── layout.tsx               # metadata و تنظیمات زبان صفحه
│   ├── components/sites/panconesi/
│   │   └── site.tsx                 # صفحات و کامپوننت‌های رابط فروشگاه
│   └── lib/api.ts                   # client ارتباط با NestJS API
├── server/
│   ├── src/
│   │   ├── catalog/                 # محصولات، کالکشن‌ها و seed اولیه
│   │   ├── newsletter/              # ثبت اعضای خبرنامه
│   │   ├── orders/                  # ایجاد سفارش‌های pending
│   │   ├── appointments/            # ثبت درخواست رزرو ملاقات
│   │   ├── app.module.ts
│   │   ├── health.controller.ts
│   │   └── main.ts
│   └── tsconfig.json
├── public/                          # فایل‌های public محلی
├── scripts/smoke-test.mjs           # تست مسیرها و API در صورت فعال بودن
├── Dockerfile                       # image فرانت‌اند Next.js
├── Dockerfile.api                   # image بک‌اند NestJS
├── docker-compose.yml               # app + api + mongo
├── .env.example                     # نمونهٔ متغیرهای محیطی
├── package.json
└── package-lock.json
```

## پیش‌نیازها

برای اجرای Docker:

- Docker Desktop یا Docker Engine
- Docker Compose

برای اجرای مستقیم روی سیستم:

- Node.js نسخهٔ ۲۴ یا بالاتر
- npm
- MongoDB محلی یا یک MongoDB قابل دسترس از طریق شبکه

## اجرای پروژه با Docker

ابتدا فایل environment نمونه را کپی کنید:

```bash
cp .env.example .env
```

سپس همهٔ سرویس‌ها را build و اجرا کنید:

```bash
docker compose up --build
```

سرویس‌های اصلی:

| سرویس | آدرس پیش‌فرض |
| --- | --- |
| فروشگاه ORÉA | http://localhost:3000 |
| NestJS API | http://localhost:4000 |
| MongoDB | mongodb://localhost:27017 |

برای توقف سرویس‌ها:

```bash
docker compose down
```

## اجرای توسعهٔ محلی

```bash
npm ci
npm run dev
```

برای اجرای API در حالت توسعه، MongoDB را فعال کنید و در ترمینال جداگانه اجرا کنید:

```bash
npm run dev:api
```

## APIها

پیشوند همهٔ endpointها `/api` است.

| Method | Endpoint | کاربرد |
| --- | --- | --- |
| `GET` | `/api/health` | بررسی سلامت API |
| `GET` | `/api/catalog/products` | دریافت کاتالوگ محصولات |
| `GET` | `/api/catalog/products/:slug` | دریافت یک محصول |
| `GET` | `/api/catalog/collections` | دریافت کالکشن‌ها |
| `POST` | `/api/newsletter` | ثبت ایمیل در خبرنامه |
| `POST` | `/api/orders` | ثبت سفارش pending |
| `POST` | `/api/appointments` | ثبت درخواست رزرو ملاقات |

نمونهٔ درخواست ثبت سفارش:

```json
{
  "items": [
    {
      "slug": "pierced-serpent-hoops-silver-cao",
      "quantity": 1
    }
  ]
}
```

## Environment Variables

فایل `.env.example` فقط شامل مقدارهای نمونه است. در محیط production، مقدارهای واقعی را خارج از repository و در Secretهای سرویس deployment نگهداری کنید.

| متغیر | کاربرد | نمونه |
| --- | --- | --- |
| `PORT` | پورت Frontend | `3000` |
| `API_PORT` | پورت عمومی API | `4000` |
| `MONGO_PORT` | پورت MongoDB | `27017` |
| `MONGODB_URI` | آدرس اتصال NestJS به MongoDB | `mongodb://127.0.0.1:27017/orea` |
| `NEXT_PUBLIC_API_URL` | آدرس API قابل دسترس از مرورگر | `http://127.0.0.1:4000/api` |
| `CORS_ORIGIN` | originهای مجاز برای API | `http://localhost:3000,http://127.0.0.1:3000` |

`MONGODB_URI` در محیط آنلاین می‌تواند شامل اطلاعات اتصال باشد؛ این مقدار نباید در Git commit شود.

## تصاویر و پیش‌نمایش

پیش‌نمایش محلی بعد از اجرای پروژه:

- [مشاهدهٔ فروشگاه ORÉA](http://localhost:3000)
- [بررسی سلامت API](http://localhost:4000/api/health)

در نسخهٔ فعلی، تصاویر محصولات و تصاویر editorial از CDN خارجی بارگذاری می‌شوند و داخل `public/` کپی نشده‌اند. بنابراین برای نمایش کامل تصاویر، دسترسی شبکه به منبع تصاویر لازم است.

## بررسی و تست

برای اجرای بررسی‌های کد و build:

```bash
npm run check
```

این دستور lint، typecheck، build فرانت‌اند و build بک‌اند را اجرا می‌کند.

برای بررسی مسیرهای اصلی فروشگاه:

```bash
npm run test:smoke
```

تست smoke مسیرهای اصلی، نمایش قیمت تومانی و در صورت فعال بودن API، health و catalog API را بررسی می‌کند.

## نکات انتشار امن

- فایل‌های `.env` واقعی را commit نکنید.
- مقدار `MONGODB_URI` production را فقط در Secretهای محیط اجرا قرار دهید.
- پیش از انتشار عمومی، مجوز استفاده از تصاویر و assetهای خارجی را بررسی کنید.
- پرداخت آنلاین و احراز هویت در این نسخه جزو scope پروژه نیستند و باید جداگانه توسعه داده شوند.
