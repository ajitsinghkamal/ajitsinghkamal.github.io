import {glob} from "astro/loaders";
import {defineCollection, z} from "astro:content";
import {file} from "astro/loaders";


const work = defineCollection({
    "loader": glob({
        "base": "./src/content/work",
        "pattern": "**/*.{md,mdx}"
    }),
    "schema": z.object({
        "title": z.string(),
        "fromDate": z.coerce.date(),
        "toDate": z.coerce.date().optional(),
        "heroImage": z.string().optional()
    })
});


type Details = {
    "gallery": Record<string, string>[];
    "nav": Record<string, string>[];
};


const gallery = defineCollection({
    "loader": file(
        "./src/content/about/details.json",
        {
            "parser": (text: string) => (JSON.parse(text) as Details).gallery
        }
    ),
    "schema": ({image}) => z.object({
        "image": image(),
        "alt": z.string(),
        "description": z.string(),
        "link": z.string().url(),
        "size": z.enum(["2x"]).optional()
    })
});

const nav = defineCollection({
    "loader": file(
        "./src/content/about/details.json",
        {
            "parser": (text: string) => (JSON.parse(text) as Details).nav
        }
    ),
    "schema": z.object({
        "text": z.string(),
        "url": z.string().url()
    })
});


export const collections = {
    work,
    gallery,
    nav
};
