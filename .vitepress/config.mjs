import { defineConfig } from "vitepress";

export default defineConfig({
  srcDir: "docs",

  title: "idempot.dev",
  description: "Idempotency middlewares for resilient APIs",

  head: [
    [
      "script",
      {
        async: true,
        src: "https://plausible.io/js/pa-9RIBzBG_R4o5GyH7c1n9C.js"
      }
    ],
    [
      "script",
      {},
      "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()"
    ]
  ],

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
