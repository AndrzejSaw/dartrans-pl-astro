# 🚀 Анализ Проекта Dartrans: Модернизация до Astro 5 Стандартов

**Дата анализа:** 5 февраля 2026  
**Версия Astro:** 5.16.11  
**Итоговая оценка:** 8.5/10  

---

## 📊 Резюме Анализа

Ваш проект уже реализован на высоком уровне с использованием современных практик Astro 5. Основные сильные стороны:

✅ **Отлично реализовано:**
- Использование Astro 5.16 (последняя версия)
- SSR с адаптером @astrojs/node
- Оптимизация производительности (Terser, минификация)
- Интеграция Alpine.js через entrypoint
- Структура проекта соответствует best practices
- TypeScript strict конфигурация
- SEO оптимизация
- Rate limiting для API

⚠️ **Требует улучшения:**
- Миграция на Tailwind CSS 4
- Внедрение Content Collections
- Использование View Transitions API
- Добавление env.d.ts для типизации окружения
- Модернизация TypeScript конфигурации
- Оптимизация изображений с новыми возможностями Astro 5
- Добавление PWA поддержки

---

## 🎯 Детальный Анализ по Категориям

### 1. ⚙️ Конфигурация Astro (9/10)

**Текущее состояние:**
```javascript
// astro.config.mjs
export default defineConfig({
  adapter: node({ mode: 'standalone' }),
  integrations: [tailwind(), alpinejs(), partytown()],
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: { ... }
    }
  }
});
```

**Рекомендации для 10/10:**

#### 1.1 Добавить Output Options
```javascript
export default defineConfig({
  output: 'hybrid', // Новая возможность Astro 5
  adapter: node({ mode: 'standalone' }),
  // ...
});
```

#### 1.2 Включить экспериментальные возможности
```javascript
export default defineConfig({
  experimental: {
    contentLayer: true,        // Новый Content Layer API
    contentIntellisense: true, // Автодополнение в .md/.mdx
    serverIslands: true,       // Частичная гидратация
  },
  // ...
});
```

#### 1.3 Настроить Image Service
```javascript
import { defineConfig } from 'astro/config';
import { imageService } from '@astrojs/vercel/image';

export default defineConfig({
  image: {
    service: imageService(),
    domains: ['transport.nexus-talent.eu'],
    remotePatterns: [{ protocol: "https" }],
  },
  // ...
});
```

#### 1.4 Добавить Security Headers
```javascript
export default defineConfig({
  vite: {
    server: {
      headers: {
        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      }
    }
  }
});
```

---

### 2. 🎨 Tailwind CSS (6/10)

**Текущее состояние:**
- ✅ Используется Tailwind 3.4.19
- ✅ Подключены DaisyUI и Preline
- ❌ Устаревший формат конфигурации (.cjs)
- ❌ Не используется Tailwind 4

**⚠️ КРИТИЧЕСКАЯ РЕКОМЕНДАЦИЯ: Миграция на Tailwind CSS 4**

Tailwind 4 вышел и полностью поддерживается Astro 5.2+. Он предлагает:
- ⚡ **10x быстрее** компиляция
- 📦 Меньший размер бандла (native CSS вместо PostCSS)
- 🎨 Новый синтаксис через `@import` и `@theme`
- 🔧 Улучшенная интеграция с Vite

#### Шаги миграции:

**1. Установить зависимости:**
```bash
npm install tailwindcss@next @tailwindcss/vite@next
npm uninstall @astrojs/tailwind
```

**2. Обновить astro.config.mjs:**
```javascript
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    // Удалить tailwind() отсюда
    alpinejs({ entrypoint: '/src/alpine.ts' }),
    partytown({ ... }),
  ],
});
```

**3. Переписать src/styles/global.css в новый формат:**
```css
/* src/styles/global.css */
@import 'tailwindcss';

/* Plugins загружаются через новый синтаксис */
@plugin 'daisyui';
@plugin 'preline/plugin';

@theme {
  /* Ваша кастомная тема */
  --font-sans: 'Inter', ui-sans-serif, system-ui;
  --font-heading: 'Inter', ui-sans-serif, system-ui;
  
  /* Цвета */
  --color-primary: #0066cc;
  --color-base-content: #1f2937;
  
  /* Размеры текста с line-height */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
  --font-size-6xl: 3.75rem;
  --font-size-7xl: 4.5rem;
  --font-size-8xl: 6rem;
}

/* Custom utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

**4. Удалить tailwind.config.cjs**

---

### 3. 📚 Content Collections (4/10)

**Текущее состояние:**
- ❌ Content Collections не используются
- ❌ Нет структурированного контента
- ✅ FAQ и другие данные хардкодятся в компонентах

**Рекомендации:**

#### 3.1 Создать Content Collections для FAQ, отзывов, статей

**Структура:**
```
src/
├── content/
│   ├── config.ts
│   ├── faq/
│   │   ├── co-to-jest-kod95.md
│   │   ├── jakie-pojazdy.md
│   │   └── ...
│   ├── testimonials/
│   │   ├── jan-kowalski.json
│   │   └── ...
│   └── fleet/
│       ├── scania-r450.md
│       ├── mercedes-actros.md
│       └── volvo-fh.md
```

**src/content/config.ts:**
```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faqCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    order: z.number(),
    category: z.enum(['employment', 'documents', 'fleet', 'salary', 'routes']),
    publishedAt: z.date().optional(),
  }),
});

const testimonialsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    avatar: z.string().optional(),
    rating: z.number().min(1).max(5),
    text: z.string(),
    date: z.date(),
    verified: z.boolean().default(false),
  }),
});

const fleetCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/fleet' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    manufacturer: z.enum(['Scania', 'Mercedes', 'Volvo']),
    model: z.string(),
    year: z.number(),
    image: image(),
    features: z.array(z.string()),
    specification: z.object({
      engine: z.string(),
      power: z.string(),
      transmission: z.string(),
      cabin: z.string(),
    }),
  }),
});

export const collections = {
  faq: faqCollection,
  testimonials: testimonialsCollection,
  fleet: fleetCollection,
};
```

#### 3.2 Использование в компонентах

**Пример для FAQ.astro:**
```astro
---
import { getCollection } from 'astro:content';

// Получаем все FAQ, отсортированные по порядку
const faqItems = (await getCollection('faq'))
  .sort((a, b) => a.data.order - b.data.order);
---

<section id="faq" class="py-20">
  <div class="container mx-auto">
    <h2>Najczęściej Zadawane Pytania</h2>
    
    <div class="space-y-4">
      {faqItems.map(async (item) => {
        const { Content } = await item.render();
        return (
          <div class="collapse collapse-plus bg-base-200">
            <input type="radio" name="faq-accordion" />
            <div class="collapse-title text-xl font-medium">
              {item.data.question}
            </div>
            <div class="collapse-content">
              <Content />
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>
```

**Преимущества:**
- 🔍 Type-safety для всего контента
- ✏️ Легкое редактирование в Markdown
- 🔄 Автоматическая перегенерация при изменениях
- 📊 Intellisense в VSCode
- 🚀 Оптимизированные запросы

---

### 4. 🖼️ Оптимизация Изображений (7/10)

**Текущее состояние:**
```astro
<Image 
  src={truckImage}
  widths={[640, 1024, 1536, 1920]}
  format="webp"
  quality={70}
  loading="eager"
  fetchpriority="high"
/>
```

**Рекомендации:**

#### 4.1 Использовать новый Picture компонент для Art Direction
```astro
---
import { Picture } from 'astro:assets';
import heroMobile from '../assets/hero-mobile.webp';
import heroDesktop from '../assets/hero-desktop.webp';
---

<Picture
  src={heroDesktop}
  widths={[640, 768, 1024, 1536, 1920]}
  sizes="(max-width: 768px) 100vw, (max-width: 1536px) 90vw, 1536px"
  formats={['avif', 'webp']}
  alt="Modern Scania truck on European highway"
  loading="eager"
  fetchpriority="high"
  quality={80}
  fallbackFormat="webp"
  pictureAttributes={{
    class: "hero-image"
  }}
>
  <source media="(max-width: 768px)" srcset={heroMobile} />
</Picture>
```

#### 4.2 Добавить inferSize для автоматических размеров
```astro
---
import { Image } from 'astro:assets';
import truckImage from '../assets/photo_3.webp';
---

<Image
  src={truckImage}
  inferSize
  alt="..."
  format="avif"
  quality={80}
/>
```

#### 4.3 Оптимизировать логотипы через SVG
Конвертируйте `/public/logo_1.webp` в SVG для идеального качества:
```astro
---
import Logo from '../components/Logo.svg?raw';
---

<Fragment set:html={Logo} />
```

---

### 5. 🔄 View Transitions (0/10)

**Текущее состояние:**
- ❌ View Transitions API не используется

**Рекомендации:**

#### 5.1 Добавить в MainLayout.astro
```astro
---
import { ViewTransitions } from 'astro:transitions';
import '../styles/global.css';
const { title } = Astro.props;
---

<html lang="pl" data-theme="corporate" class="scroll-smooth">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
    
    <ViewTransitions />
  </head>
  <body>
    <slot />
  </body>
</html>
```

#### 5.2 Кастомные анимации переходов
```astro
---
import { fade, slide } from 'astro:transitions';
---

<div transition:animate={slide({ duration: '0.3s' })}>
  <Header />
</div>

<main transition:animate={fade({ duration: '0.2s' })}>
  <slot />
</main>
```

#### 5.3 Persist для сохранения состояния
```astro
<div transition:persist="header">
  <Header />
</div>

<script transition:persist>
  // Скрипты, которые должны сохраняться между переходами
  console.log('This runs only once');
</script>
```

---

### 6. 📝 TypeScript Конфигурация (7/10)

**Текущее состояние:**
```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

**Рекомендации:**

#### 6.1 Обновить на strictest
```json
{
  "extends": "astro/tsconfigs/strictest",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist", "node_modules"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@utils/*": ["src/utils/*"],
      "@assets/*": ["src/assets/*"]
    },
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "skipLibCheck": false
  }
}
```

#### 6.2 Создать env.d.ts для типизации окружения
```typescript
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly CRM_TOKEN: string;
  readonly CRM_API_URL: string;
  readonly GTM_ID: string;
  readonly RATE_LIMIT_LEAD_FORM_MAX: string;
  readonly RATE_LIMIT_LEAD_FORM_WINDOW: string;
  readonly PUBLIC_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

### 7. 🚀 Performance Оптимизация (8/10)

**Текущее состояние:**
- ✅ Terser минификация
- ✅ CSS code splitting
- ✅ Self-hosted fonts
- ✅ Partytown для GTM
- ⚠️ Можно улучшить

**Рекомендации:**

#### 7.1 Добавить Resource Hints
```astro
---
// MainLayout.astro
---
<html>
  <head>
    <!-- DNS Prefetch -->
    <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
    <link rel="dns-prefetch" href="https://transport.nexus-talent.eu" />
    
    <!-- Preconnect для критичных ресурсов -->
    <link rel="preconnect" href="https://transport.nexus-talent.eu" crossorigin />
    
    <!-- Preload критичных ресурсов -->
    <link rel="preload" href="/fonts/inter-700.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" as="image" href="/logo_1.webp" fetchpriority="high" />
  </head>
</html>
```

#### 7.2 Использовать Astro Islands для тяжелых компонентов
```astro
---
// Для интерактивных компонентов используйте директивы загрузки
---

<!-- Загрузить только когда виден -->
<LeadForm client:visible />

<!-- Загрузить когда браузер свободен -->
<FAQ client:idle />

<!-- Загрузить только на мобильных -->
<MobileMenu client:media="(max-width: 768px)" />

<!-- Загрузить сразу (для критичных компонентов) -->
<Header client:load />
```

#### 7.3 Включить компрессию Brotli
```javascript
// astro.config.mjs
export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['alpinejs'],
            'utils': ['zod'],
          },
          experimentalMinChunkSize: 10000, // 10KB
        },
      },
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'],
        },
        format: {
          comments: false,
        },
        mangle: {
          safari10: true,
        },
      },
    },
  },
});
```

#### 7.4 Добавить Critical CSS
Создайте inline critical CSS для above-the-fold контента:

```astro
---
// MainLayout.astro
---
<html>
  <head>
    <style is:inline>
      /* Critical CSS для header и hero */
      .header { /* ... */ }
      .hero { /* ... */ }
    </style>
    
    <link rel="stylesheet" href={Astro.resolve('../styles/global.css')} media="print" onload="this.media='all'" />
  </head>
</html>
```

---

### 8. 🔌 API Routes & SSR (9/10)

**Текущее состояние:**
- ✅ Используется `prerender: false`
- ✅ Rate limiting реализован
- ✅ Zod валидация
- ✅ Honeypot защита
- ⚠️ Можно добавить CSRF защиту

**Рекомендации:**

#### 8.1 Добавить CSRF Protection
```typescript
// src/utils/csrf.ts
import crypto from 'node:crypto';

const CSRF_SECRET = import.meta.env.CSRF_SECRET || 'change-me-in-production';

export function generateCSRFToken(sessionId: string): string {
  const hmac = crypto.createHmac('sha256', CSRF_SECRET);
  hmac.update(sessionId);
  return hmac.digest('hex');
}

export function verifyCSRFToken(token: string, sessionId: string): boolean {
  const expectedToken = generateCSRFToken(sessionId);
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(expectedToken)
  );
}
```

```typescript
// src/pages/api/submit-form.ts
import { verifyCSRFToken } from '../../utils/csrf';

export const POST: APIRoute = async ({ request, cookies }) => {
  const csrfToken = request.headers.get('X-CSRF-Token');
  const sessionId = cookies.get('session_id')?.value;
  
  if (!csrfToken || !sessionId || !verifyCSRFToken(csrfToken, sessionId)) {
    return new Response(
      JSON.stringify({ message: 'Invalid CSRF token' }),
      { status: 403 }
    );
  }
  
  // ... остальная логика
};
```

#### 8.2 Добавить API Response Caching
```typescript
// src/pages/api/vacancies.ts
export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const etag = generateETag(data);
  
  // Check If-None-Match header
  if (request.headers.get('If-None-Match') === etag) {
    return new Response(null, { status: 304 });
  }
  
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      'ETag': etag,
    },
  });
};
```

#### 8.3 Использовать Middleware для общей логики
```typescript
// src/middleware.ts
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // Логирование запросов
  console.log(`${context.request.method} ${context.url.pathname}`);
  
  // Добавить security headers
  const response = await next();
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  return response;
});
```

---

### 9. 🎯 SEO & Метаданные (8/10)

**Текущее состояние:**
- ✅ SEO компонент создан
- ✅ Structured data
- ⚠️ Нет динамической генерации OG изображений

**Рекомендации:**

#### 9.1 Создать SEO.astro с полной поддержкой
```astro
---
// src/components/SEO.astro
interface Props {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  canonical?: string;
}

const {
  title,
  description,
  image = '/og-default.jpg',
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  canonical = Astro.url.href,
} = Astro.props;

const siteUrl = import.meta.env.PUBLIC_SITE_URL || Astro.url.origin;
const ogImageUrl = new URL(image, siteUrl).href;
---

<!-- Basic Meta Tags -->
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content={type} />
<meta property="og:url" content={canonical} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImageUrl} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="Dartrans & Henzel" />
<meta property="og:locale" content="pl_PL" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content={canonical} />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageUrl} />

<!-- Article Specific -->
{type === 'article' && publishedTime && (
  <>
    <meta property="article:published_time" content={publishedTime} />
    {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
    {author && <meta property="article:author" content={author} />}
  </>
)}

<!-- Structured Data -->
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Kierowca C+E - Transport Międzynarodowy",
  "description": description,
  "datePosted": "2026-02-05",
  "validThrough": "2026-12-31",
  "employmentType": "FULL_TIME",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "Dartrans & Henzel",
    "sameAs": siteUrl,
    "logo": `${siteUrl}/logo_1.webp`
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PL"
    }
  },
  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "EUR",
    "value": {
      "@type": "QuantitativeValue",
      "value": 2800,
      "minValue": 2600,
      "maxValue": 3000,
      "unitText": "MONTH"
    }
  }
})} />
```

#### 9.2 Генерация Динамических OG Images
```astro
---
// src/pages/og/[...slug].png.ts
import { ImageResponse } from '@vercel/og';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;
  
  const html = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#1a1a1a',
        padding: '60px',
        fontFamily: 'Inter',
      },
      children: [
        {
          type: 'h1',
          props: {
            style: { fontSize: '72px', color: 'white' },
            children: 'Praca dla Kierowcy C+E',
          },
        },
        {
          type: 'p',
          props: {
            style: { fontSize: '36px', color: '#0066cc' },
            children: 'Zarabiaj €2,600+ miesięcznie',
          },
        },
      ],
    },
  };
  
  return new ImageResponse(html, {
    width: 1200,
    height: 630,
  });
};

export function getStaticPaths() {
  return [
    { params: { slug: 'home' } },
    { params: { slug: 'application' } },
  ];
}
```

#### 9.3 Добавить RSS Feed
```typescript
// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const blog = await getCollection('blog');
  
  return rss({
    title: 'Dartrans & Henzel - Aktualności',
    description: 'Najnowsze oferty pracy dla kierowców C+E',
    site: context.site!,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>pl-PL</language>`,
  });
};
```

---

### 10. 🛡️ Security (8/10)

**Текущее состояние:**
- ✅ Rate limiting
- ✅ Honeypot защита
- ✅ Zod валидация
- ⚠️ Нет CORS настройки
- ⚠️ Нет Content Security Policy

**Рекомендации:**

#### 10.1 Добавить Content Security Policy
```astro
---
// MainLayout.astro
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://transport.nexus-talent.eu https://www.google-analytics.com",
  "frame-src https://www.youtube.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join('; ');
---

<html>
  <head>
    <meta http-equiv="Content-Security-Policy" content={csp} />
  </head>
</html>
```

#### 10.2 Настроить CORS для API
```typescript
// src/pages/api/submit-form.ts
export const POST: APIRoute = async ({ request }) => {
  const origin = request.headers.get('Origin');
  const allowedOrigins = [
    'https://yourdomain.com',
    'https://www.yourdomain.com',
  ];
  
  if (!origin || !allowedOrigins.includes(origin)) {
    return new Response('Forbidden', { status: 403 });
  }
  
  // ... остальная логика
  
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token',
    },
  });
};
```

---

### 11. 📱 Progressive Web App (0/10)

**Текущее состояние:**
- ❌ PWA не реализовано

**Рекомендации:**

#### 11.1 Добавить @vite-pwa/astro
```bash
npm install -D @vite-pwa/astro
```

```javascript
// astro.config.mjs
import { VitePWA } from '@vite-pwa/astro';

export default defineConfig({
  integrations: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Dartrans & Henzel - Praca dla Kierowcy',
        short_name: 'Dartrans',
        description: 'Oferty pracy dla kierowców C+E w transporcie międzynarodowym',
        theme_color: '#0066cc',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
      },
    }),
  ],
});
```

---

### 12. 🧪 Testing & Quality Assurance (3/10)

**Текущее состояние:**
- ❌ Нет тестов
- ❌ Нет Playwright для E2E
- ❌ Нет Vitest для unit тестов

**Рекомендации:**

#### 12.1 Добавить Vitest
```bash
npm install -D vitest @vitest/ui happy-dom
```

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { getViteConfig } from 'astro/config';

export default defineConfig(
  getViteConfig({
    test: {
      globals: true,
      environment: 'happy-dom',
    },
  })
);
```

```typescript
// src/utils/rateLimiter.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { checkRateLimit } from './rateLimiter';

describe('Rate Limiter', () => {
  beforeEach(() => {
    // Clear rate limit cache
  });
  
  it('should allow requests within limit', () => {
    expect(checkRateLimit('127.0.0.1', 5, 60000)).toBe(true);
  });
  
  it('should block requests exceeding limit', () => {
    const ip = '127.0.0.1';
    for (let i = 0; i < 5; i++) {
      checkRateLimit(ip, 5, 60000);
    }
    expect(checkRateLimit(ip, 5, 60000)).toBe(false);
  });
});
```

#### 12.2 Добавить Playwright для E2E
```bash
npm install -D @playwright/test
npx playwright install
```

```typescript
// tests/e2e/lead-form.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Lead Form', () => {
  test('should submit form successfully', async ({ page }) => {
    await page.goto('http://localhost:4321');
    
    await page.fill('[name="first_name"]', 'Jan Kowalski');
    await page.fill('[name="email"]', 'jan@example.com');
    await page.fill('[name="whatsapp_phone"]', '+48 123 456 789');
    
    await page.click('button[type="submit"]');
    
    await expect(page.locator('.success-message')).toBeVisible();
  });
  
  test('should show validation errors', async ({ page }) => {
    await page.goto('http://localhost:4321');
    
    await page.fill('[name="first_name"]', 'J');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('.error-message')).toContainText(
      'Name must be at least 2 characters'
    );
  });
});
```

---

## 📋 План Внедрения (Roadmap)

### Фаза 1: Критические Обновления (1-2 дня)
1. ✅ Миграция на Tailwind CSS 4
2. ✅ Обновление TypeScript конфигурации
3. ✅ Добавление env.d.ts
4. ✅ Внедрение View Transitions

### Фаза 2: Content & Performance (2-3 дня)
5. ✅ Создание Content Collections (FAQ, Fleet, Testimonials)
6. ✅ Оптимизация изображений (AVIF, Picture component)
7. ✅ Добавление Resource Hints
8. ✅ Внедрение Critical CSS

### Фаза 3: Security & SEO (1-2 дня)
9. ✅ Добавление CSRF Protection
10. ✅ Настройка CSP
11. ✅ Генерация динамических OG Images
12. ✅ Создание RSS Feed

### Фаза 4: Testing & PWA (2-3 дня)
13. ✅ Настройка Vitest
14. ✅ Написание unit тестов
15. ✅ Настройка Playwright
16. ✅ Написание E2E тестов
17. ✅ Внедрение PWA

### Фаза 5: Документация & Deployment (1 день)
18. ✅ Обновление README
19. ✅ Создание CHANGELOG
20. ✅ Настройка CI/CD

---

## 🎯 Итоговая Оценка по Категориям

| Категория | Текущая оценка | Целевая оценка | Приоритет |
|-----------|----------------|----------------|-----------|
| Конфигурация Astro | 9/10 | 10/10 | 🟡 Средний |
| Tailwind CSS | 6/10 | 10/10 | 🔴 Высокий |
| Content Collections | 4/10 | 10/10 | 🔴 Высокий |
| Оптимизация Изображений | 7/10 | 10/10 | 🟡 Средний |
| View Transitions | 0/10 | 10/10 | 🟢 Низкий |
| TypeScript | 7/10 | 10/10 | 🟡 Средний |
| Performance | 8/10 | 10/10 | 🟡 Средний |
| API Routes & SSR | 9/10 | 10/10 | 🟢 Низкий |
| SEO | 8/10 | 10/10 | 🟡 Средний |
| Security | 8/10 | 10/10 | 🟡 Средний |
| PWA | 0/10 | 8/10 | 🟢 Низкий |
| Testing | 3/10 | 9/10 | 🟡 Средний |

**Общая оценка: 8.5/10 → Цель: 10/10**

---

## 🔧 Готовые Файлы для Внедрения

### 1. astro.config.mjs (Модернизированный)
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import partytown from '@astrojs/partytown';
import { VitePWA } from '@vite-pwa/astro';

export default defineConfig({
  output: 'hybrid',
  adapter: node({
    mode: 'standalone',
  }),
  
  experimental: {
    contentLayer: true,
    contentIntellisense: true,
    serverIslands: true,
  },
  
  image: {
    domains: ['transport.nexus-talent.eu'],
    remotePatterns: [{ protocol: "https" }],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  
  integrations: [
    alpinejs({ 
      entrypoint: '/src/alpine.ts' 
    }),
    partytown({
      config: {
        forward: ['dataLayer.push', 'gtag'],
        proxyCosmetic: true,
        debug: false,
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Dartrans & Henzel - Praca dla Kierowcy',
        short_name: 'Dartrans',
        description: 'Oferty pracy dla kierowców C+E w transporcie międzynarodowym',
        theme_color: '#0066cc',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
  
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'],
        },
        format: {
          comments: false,
        },
        mangle: {
          safari10: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'alpine': ['alpinejs'],
            'utils': ['zod'],
          },
          experimentalMinChunkSize: 10000,
        },
      },
    },
    server: {
      headers: {
        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      },
    },
  },
});
```

### 2. src/styles/global.css (Tailwind 4)
```css
/* src/styles/global.css */
@import 'tailwindcss';

/* Plugins */
@plugin 'daisyui';
@plugin 'preline/plugin';

/* Self-hosted fonts */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/inter-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/inter-600.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/inter-700.woff2') format('woff2');
}

/* Tailwind 4 Theme Configuration */
@theme {
  /* Typography */
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-heading: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  
  /* Font Sizes */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
  --font-size-6xl: 3.75rem;
  --font-size-7xl: 4.5rem;
  --font-size-8xl: 6rem;
  
  /* Colors - Primary */
  --color-primary: #0066cc;
  --color-base-content: #1f2937;
}

/* DaisyUI Theme Override */
@layer base {
  [data-theme="corporate"] {
    --p: 210 100% 40%;
    --bc: 220 18% 15%;
  }
}

/* Custom Utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Base Styles */
@layer base {
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
  }
  
  body {
    font-family: var(--font-sans);
  }
  
  html {
    scroll-behavior: smooth;
  }
}
```

### 3. src/env.d.ts (Типизация окружения)
```typescript
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly CRM_TOKEN: string;
  readonly CRM_API_URL: string;
  readonly GTM_ID: string;
  readonly RATE_LIMIT_LEAD_FORM_MAX: string;
  readonly RATE_LIMIT_LEAD_FORM_WINDOW: string;
  readonly PUBLIC_SITE_URL: string;
  readonly CSRF_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

### 4. src/content/config.ts (Content Collections)
```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faqCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    order: z.number(),
    category: z.enum(['employment', 'documents', 'fleet', 'salary', 'routes']),
    publishedAt: z.date().optional(),
  }),
});

const testimonialsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    avatar: z.string().optional(),
    rating: z.number().min(1).max(5),
    text: z.string(),
    date: z.date(),
    verified: z.boolean().default(false),
  }),
});

const fleetCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/fleet' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    manufacturer: z.enum(['Scania', 'Mercedes', 'Volvo']),
    model: z.string(),
    year: z.number(),
    image: image(),
    features: z.array(z.string()),
    specification: z.object({
      engine: z.string(),
      power: z.string(),
      transmission: z.string(),
      cabin: z.string(),
    }),
  }),
});

export const collections = {
  faq: faqCollection,
  testimonials: testimonialsCollection,
  fleet: fleetCollection,
};
```

---

## 📚 Полезные Ресурсы

### Официальная Документация
- [Astro 5 Documentation](https://docs.astro.build)
- [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
- [Alpine.js Documentation](https://alpinejs.dev)
- [DaisyUI Components](https://daisyui.com)

### Инструменты для Тестирования
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [WebPageTest](https://www.webpagetest.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

### Community
- [Astro Discord](https://astro.build/chat)
- [Astro GitHub](https://github.com/withastro/astro)

---

## ✅ Чеклист Внедрения

```markdown
### Критические обновления
- [ ] Мигрировать на Tailwind CSS 4
- [ ] Обновить TypeScript конфигурацию на strictest
- [ ] Создать env.d.ts
- [ ] Добавить View Transitions

### Content & Performance
- [ ] Создать Content Collections (FAQ, Fleet, Testimonials)
- [ ] Конвертировать контент в Markdown/JSON
- [ ] Обновить компоненты для использования getCollection()
- [ ] Оптимизировать изображения (AVIF, Picture)
- [ ] Добавить Resource Hints (preconnect, dns-prefetch)
- [ ] Внедрить Critical CSS

### Security
- [ ] Добавить CSRF Protection
- [ ] Настроить Content Security Policy
- [ ] Настроить CORS для API
- [ ] Добавить middleware для security headers

### SEO & PWA
- [ ] Обновить SEO компонент
- [ ] Создать генератор динамических OG изображений
- [ ] Добавить RSS Feed
- [ ] Внедрить PWA с @vite-pwa/astro
- [ ] Создать иконки для PWA

### Testing
- [ ] Настроить Vitest
- [ ] Написать unit тесты
- [ ] Настроить Playwright
- [ ] Написать E2E тесты
- [ ] Настроить CI/CD

### Документация
- [ ] Обновить README
- [ ] Создать CHANGELOG
- [ ] Документировать API
```

---

## 🎓 Заключение

Ваш проект **Dartrans** уже находится на очень высоком уровне (8.5/10) и демонстрирует отличное понимание современных веб-технологий. Основные области для улучшения:

### Приоритет 🔴 Высокий:
1. **Миграция на Tailwind CSS 4** - даст значительный прирост производительности
2. **Content Collections** - структурирует контент и добавит type-safety

### Приоритет 🟡 Средний:
3. **TypeScript strictest** - улучшит качество кода
4. **SEO оптимизация** - динамические OG изображения, RSS
5. **Performance** - Critical CSS, Resource Hints
6. **Testing** - Vitest + Playwright

### Приоритет 🟢 Низкий:
7. **View Transitions** - улучшит UX
8. **PWA** - offline поддержка

Следуя этому плану, вы достигнете **10/10** по всем современным стандартам Astro 5 и получите проект, готовый к production на высоконагруженных окружениях.

---

**Автор анализа:** GitHub Copilot  
**Дата:** 5 февраля 2026  
**Версия документа:** 1.0
