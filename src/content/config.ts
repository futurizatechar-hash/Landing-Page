import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(70, 'El título no debe superar los 70 caracteres para SEO'),
    description: z.string().max(160, 'La descripción no debe superar los 160 caracteres'),
    pubDate: z.date(),
    author: z.string().default('Angel'),
    category: z.enum([
      'Ingeniería de Software',
      'Automatización con IA',
      'Arquitectura Web',
      'Casos de Estudio',
    ]),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().default('/images/blog/default-cover.webp'),
    draft: z.boolean().default(false),
    canonicalURL: z.string().url().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
