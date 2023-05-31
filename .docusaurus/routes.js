import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '715'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '4a6'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'd76'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '6aa'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '82a'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '3a6'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '92e'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', '78e'),
    exact: true
  },
  {
    path: '/blog/announcing-the-v2-beta',
    component: ComponentCreator('/blog/announcing-the-v2-beta', '4af'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '2f0'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', 'd47'),
    exact: true
  },
  {
    path: '/blog/tags/announcement',
    component: ComponentCreator('/blog/tags/announcement', '1d5'),
    exact: true
  },
  {
    path: '/blog/tags/beta',
    component: ComponentCreator('/blog/tags/beta', 'aef'),
    exact: true
  },
  {
    path: '/blog/tags/captcha',
    component: ComponentCreator('/blog/tags/captcha', '251'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', 'f7d'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'a22'),
    routes: [
      {
        path: '/docs/',
        component: ComponentCreator('/docs/', '2bf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/api/authentication',
        component: ComponentCreator('/docs/api/authentication', '946'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/api/endpoints/siteverify',
        component: ComponentCreator('/docs/api/endpoints/siteverify', 'e22'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/api/openapi',
        component: ComponentCreator('/docs/api/openapi', 'a57'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/api/overview',
        component: ComponentCreator('/docs/api/overview', '79e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/getting-started',
        component: ComponentCreator('/docs/category/getting-started', '01f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/widget-sdk',
        component: ComponentCreator('/docs/category/widget-sdk', '104'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/changelog',
        component: ComponentCreator('/docs/changelog', 'fe5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/getting-started/client',
        component: ComponentCreator('/docs/getting-started/client', 'aa4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/getting-started/common-problems',
        component: ComponentCreator('/docs/getting-started/common-problems', '8c8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/getting-started/installation',
        component: ComponentCreator('/docs/getting-started/installation', '490'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/getting-started/introduction',
        component: ComponentCreator('/docs/getting-started/introduction', 'd6c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/getting-started/siteverify',
        component: ComponentCreator('/docs/getting-started/siteverify', '90a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/guides/',
        component: ComponentCreator('/docs/guides/', 'eb5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/guides/migrating-from-hcaptcha',
        component: ComponentCreator('/docs/guides/migrating-from-hcaptcha', '561'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/guides/migrating-from-recaptcha',
        component: ComponentCreator('/docs/guides/migrating-from-recaptcha', '16e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/guides/upgrading-to-v2/backend-integration',
        component: ComponentCreator('/docs/guides/upgrading-to-v2/backend-integration', '1ae'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/guides/upgrading-to-v2/introduction',
        component: ComponentCreator('/docs/guides/upgrading-to-v2/introduction', 'fd2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/guides/upgrading-to-v2/javascript-api',
        component: ComponentCreator('/docs/guides/upgrading-to-v2/javascript-api', '3d5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/guides/upgrading-to-v2/script',
        component: ComponentCreator('/docs/guides/upgrading-to-v2/script', 'a16'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/guides/upgrading-to-v2/why-upgrade',
        component: ComponentCreator('/docs/guides/upgrading-to-v2/why-upgrade', '1dd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/integrations/',
        component: ComponentCreator('/docs/integrations/', '52e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/sdk/',
        component: ComponentCreator('/docs/sdk/', 'daf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/sdk/advanced/automated-testing',
        component: ComponentCreator('/docs/sdk/advanced/automated-testing', 'a4e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/sdk/advanced/browser-support',
        component: ComponentCreator('/docs/sdk/advanced/browser-support', '785'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/sdk/advanced/csp',
        component: ComponentCreator('/docs/sdk/advanced/csp', 'f06'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/sdk/advanced/localization',
        component: ComponentCreator('/docs/sdk/advanced/localization', 'dde'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/sdk/configuration',
        component: ComponentCreator('/docs/sdk/configuration', 'ee4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/sdk/events',
        component: ComponentCreator('/docs/sdk/events', 'ffb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/sdk/lifecycle',
        component: ComponentCreator('/docs/sdk/lifecycle', 'de3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/what-is-friendly-captcha',
        component: ComponentCreator('/docs/what-is-friendly-captcha', '03e'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '8c2'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
