import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import stylisticJs from "@stylistic/eslint-plugin-js";

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    stylisticJs.configs.all,
    stylisticTs.configs.all,
    {
        "languageOptions": {
            "parserOptions": {
                "projectService": true,
                "tsconfigRootDir": import.meta.dirname
            }
        }
    },
    {
        "files": [
            "*.astro",
            "**/*.astro/*.ts",
            "*.astro/*.ts"
        ],
        "extends": [eslintPluginAstro.configs.recommended],
        "languageOptions": {
            "parser": "astro-eslint-parser",
            "processor": "astro/client-side-ts",
            "parserOptions": {
                "parser": tseslint.parser,
                "extraFileExtensions": [".astro"],
                "projectService": true,
                "tsconfigRootDir": import.meta.dirname
            }
        }
    },
    {
        "rules": {
            "object-curly-newline": [
                "error",
                {
                    "ObjectExpression": "always",
                    "ObjectPattern": {
                        "multiline": true
                    }
                }
            ]
        }
    }
);
