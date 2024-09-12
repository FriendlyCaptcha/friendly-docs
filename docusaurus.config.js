// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const organizationName = "FriendlyCaptcha";
const projectName = "friendly-docs";

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Friendly Captcha Developer Hub",
  tagline:
    "Documentation and tutorials to help you get started with Friendly Captcha",
  favicon: "img/favicon.svg",

  // Set the production url of your site here
  url: "https://developer.friendlycaptcha.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName, // Usually your GitHub org/user name.
  projectName, // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: ["docusaurus-plugin-sass"],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: `https://github.com/${organizationName}/${projectName}/tree/main/`,
          lastVersion: 'current',
          versions: {
            current: {
              label: 'v2',
              path: 'v2',
            },
          },
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: `https://github.com/${organizationName}/${projectName}/tree/main/`,
          blogDescription: "Friendly Captcha Engineering Blog",
          blogTitle: "Friendly Captcha Engineering Blog",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
      }),
    ],
  ],

  scripts: [
    {
      src: "https://plausible.io/js/script.js",
      defer: true,
      "data-domain": "developer.friendlycaptcha.com",
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "light",
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: "v2-docs-warning",
        content:
          "You're looking at the Friendly Captcha v2 Docs which is in <strong>early preview</strong>. Apply <a href='https://developer.friendlycaptcha.com/docs/guides/upgrading-to-v2/why-upgrade#how-do-i-upgrade'>here</a> to gain access to the closed <strong>BETA</strong>.",
        backgroundColor: "#ffb731",
        textColor: "#333",
        isCloseable: false,
      },
      // Replace with your project's social card
      image: "img/friendlycaptcha-social-card.png",
      navbar: {
        title: "",
        logo: {
          alt: "Friendly Captcha Developer Hub Logo",
          src: "img/friendlycaptcha-logo-developer-hub-blue.png",
          srcDark: "img/friendlycaptcha-logo-developer-hub-blue-dark-mode.png",
        },
        items: [
          {
            type: "docsVersion",
            position: "left",
            label: "Docs",
          },
          {
            to: "integrations",
            label: "Integrations",
            position: "left",
          },
          { to: "/blog", label: "Tech Blog", position: "left" },
          {
            type: 'docsVersionDropdown',
            position: "right",
          },
          {
            href: "https://support.friendlycaptcha.com",
            label: "Support",
            position: "right",
          },
          {
            href: "https://app.friendlycaptcha.com/dashboard",
            label: "Dashboard",
            position: "right",
          },
        ],
      },
      footer: {
        logo: {
          alt: "Friendly Captcha Logo",
          src: "img/friendlycaptcha-logo-white.png",
          href: "https://friendlycaptcha.com",
          width: "260px",
        },
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Getting Started",
                to: "/docs/v2/getting-started/introduction",
              },
              {
                label: "Guides",
                to: "/docs/v2/guides/",
              },
              {
                label: "Integrations",
                to: "integrations",
              }
            ],
          },
          {
            title: "Reference",
            items: [
              {
                label: "API Reference",
                to: "/docs/v2/api/overview",
              },
              {
                label: "SDK Reference",
                to: "/docs/v2/sdk/reference/",
              },
            ],
          },
          {
            title: "Links",
            items: [
              {
                label: "Dashboard",
                href: "https://app.friendlycaptcha.eu/dashboard",
              },
              {
                label: "Status",
                href: "https://status.friendlycaptcha.com",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/friendlycaptcha",
              },
              {
                label: "Wordpress Plugin",
                href: "https://wordpress.org/plugins/friendly-captcha/",
              },
            ],
          },
        ],
        copyright: `Copyright © 2020-${new Date().getFullYear()} | <b>Friendly Captcha GmbH</b>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
