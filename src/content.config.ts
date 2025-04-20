import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const work = defineCollection({
  loader: glob({ base: "./src/content/work", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    fromDate: z.coerce.date(),
    toDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { work };
