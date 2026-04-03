import { defineConfig } from "vitepress";

export default defineConfig({
  srcDir: "docs",

  title: "idempot.dev",
  description: "Idempotency middlewares for resilient APIs",

  sitemap: {
    hostname: "https://idempot.dev/"
  },

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
    lastUpdated: true,
    nav: [
      { text: "Home", link: "/" },
      { text: "Learn", link: "/learn/" },
      { text: "Specs", link: "/specs" },
      {
        text: "Projects",
        items: [{ text: "idempot-js", link: "https://js.idempot.dev" }]
      }
    ],
    sidebar: {
      "/learn/": [
        {
          text: "Learn",
          items: [
            { text: "Overview", link: "/learn/" },
            { text: "Why Idempotency", link: "/learn/why" },
            {
              text: "Duplicated vs Repeated",
              link: "/learn/duplicated-vs-repeated"
            },
            {
              text: "Client Key Strategies",
              link: "/learn/client-key-strategies"
            },
            { text: "Spec Compliance", link: "/learn/spec" }
          ]
        }
      ],
      "/": [
        {
          text: "Documentation",
          items: [{ text: "Specifications", link: "/specs" }]
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
      ]
    },
    socialLinks: [{ icon: "github", link: "https://github.com/idempot-dev" }],
    footer: {
      message:
        '<a href="https://js.idempot.dev">Get started with idempot-js</a> — Idempotency middleware for Hono, Express, and Fastify',
      copyright:
        'Copyright © 2026 <a href="https://github.com/mroderick">Morgan Roderick</a> and contributors'
    }
  }
});
