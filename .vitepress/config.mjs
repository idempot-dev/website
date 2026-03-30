import { defineConfig } from "vitepress";

export default defineConfig({
  srcDir: "docs",

  title: "idempot.dev",
  description: "Idempotency middlewares for resilient APIs",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Why Idempotency", link: "/why-idempotency" },
      { text: "Specs", link: "/specs" }
    ],
    sidebar: [
      {
        text: "Documentation",
        items: [
          { text: "Why Idempotency", link: "/why-idempotency" },
          { text: "Specifications", link: "/specs" }
        ]
      },
      {
        text: "Projects",
        items: [
          {
            text: "idempot-js",
            link: "https://github.com/idempot-dev/idempot-js"
          }
        ]
      }
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/idempot-dev" }]
  }
});
