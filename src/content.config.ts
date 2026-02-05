import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // Используем glob загрузчик (стандарт Astro 5)

// 1. Определяем коллекцию FAQ
const faqCollection = defineCollection({
  // Указываем, где искать файлы (относительно корня проекта)
  loader: glob({ pattern: "**/*.md", base: "./src/content/faq" }),
  
  // Описываем типы данных (валидация Zod)
  schema: z.object({
    question: z.string(), // Вопрос обязателен и должен быть строкой
    order: z.number(),    // Порядок сортировки (число)
  }),
});

// 2. Определяем коллекцию Fleet (Автопарк)
const fleetCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/fleet" }),
  
  schema: ({ image }) => z.object({
    brand: z.string(), // Марка грузовика (Mercedes-Benz, Scania, Volvo)
    model: z.string(), // Модель (Actros MP5 L, R450 Next Gen)
    order: z.number(), // Порядок отображения
    image: image(), // Путь к изображению (с поддержкой астро оптимизации)
    tag: z.string().optional(), // Тег (Euro 6, Next Gen)
    features: z.array(z.string()), // Массив особенностей
  }),
});

// 3. Определяем коллекцию Benefits (Преимущества)
const benefitsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/benefits" }),
  
  schema: z.object({
    title: z.string(), // Заголовок преимущества
    order: z.number(), // Порядок отображения (01, 02, 03...)
    icon: z.string(), // SVG иконка как строка
    checkpoints: z.array(z.string()), // Массив чек-пойнтов (что включено)
  }),
});

// 4. Экспортируем объект collections
export const collections = {
  'faq': faqCollection,
  'fleet': fleetCollection,
  'benefits': benefitsCollection,
};