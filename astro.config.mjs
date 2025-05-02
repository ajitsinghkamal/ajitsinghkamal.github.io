// @ts-check
import {defineConfig} from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    "output": "static",
    "site": "https://ajitsinghkamal.github.io",
    "base": "/ajitsinghkamal",
    "integrations": [
        mdx(),
        sitemap()
    ]
});
