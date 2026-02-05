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

// 2. Экспортируем объект collections
export const collections = {
  'faq': faqCollection,
};