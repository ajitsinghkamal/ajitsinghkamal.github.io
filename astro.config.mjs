// @ts-check
import {defineConfig} from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    "site": "ajitsinghkamal.github.io",
    "base": "/ajitsinghkamal",
    "integrations": [
        mdx(),
        sitemap()
    ]
});
