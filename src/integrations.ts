export type Tag = "CMS" | "E-commerce" | "Library" | "Mobile";

export interface Integration {
  name: string;
  slug: string;
  tags: Tag[];
  fcVersion: "v1" | "v2";
  image: string;
  link: string;
  github?: string;
  source?: string;
  official?: boolean;
}

export const INTEGRATIONS: Integration[] = [
  // E-commerce plugins
  {
    name: "Magento 2",
    slug: "magento-2",
    tags: ["E-commerce"],
    fcVersion: "v1",
    image: "magento-2.svg",
    link: "https://github.com/iMi-digital/magento2-friendly-captcha",
    github: "iMi-digital/magento2-friendly-captcha",
  },
  {
    name: "Adobe Commerce",
    slug: "adobe-commerce",
    tags: ["E-commerce"],
    fcVersion: "v1",
    image: "adobe-commerce.svg",
    link: "https://github.com/iMi-digital/magento2-friendly-captcha",
    github: "iMi-digital/magento2-friendly-captcha",
  },
  {
    name: "Shopware",
    slug: "shopware",
    tags: ["E-commerce"],
    fcVersion: "v1",
    image: "shopware.svg",
    link: "https://store.shopware.com/en/laude19210865287/friendly-captcha.html",
  },

  // CMS plugins
  {
    name: "Contao",
    slug: "contao",
    tags: ["CMS"],
    fcVersion: "v1",
    image: "contao.svg",
    link: "https://github.com/FriendlyCaptcha/friendly-captcha-contao",
    github: "FriendlyCaptcha/friendly-captcha-contao",
    official: true,
  },
  {
    name: "Craft CMS",
    slug: "craft",
    tags: ["CMS"],
    fcVersion: "v1",
    image: "craft.svg",
    link: "https://github.com/digitalpulsebe/craft-friendly-captcha",
    github: "digitalpulsebe/craft-friendly-captcha",
  },
  {
    name: "Drupal",
    slug: "drupal",
    tags: ["CMS"],
    fcVersion: "v1",
    image: "drupal.svg",
    link: "https://www.drupal.org/project/friendlycaptcha",
    source: "https://git.drupalcode.org/project/friendlycaptcha",
  },
  {
    name: "Joomla",
    slug: "joomla",
    tags: ["CMS"],
    fcVersion: "v1",
    image: "joomla.svg",
    link: "https://github.com/SharkyKZ/plg_captcha_friendlycaptcha",
    github: "SharkyKZ/plg_captcha_friendlycaptcha",
  },
  {
    name: "TYPO3",
    slug: "typo3",
    tags: ["CMS"],
    fcVersion: "v1",
    image: "typo3.svg",
    link: "https://t3planet.de/en/typo3-friendly-captcha-extension",
    github: "nitsan-technologies/ns_friendlycaptcha",
  },
  {
    name: "TYPO3",
    slug: "typo3",
    tags: ["CMS"],
    fcVersion: "v2",
    image: "typo3.svg",
    link: "https://github.com/studiomitte/friendlycaptcha-typo3",
    github: "studiomitte/friendlycaptcha-typo3",
  },

  // Libraries and SDKs
  {
    name: "Go",
    slug: "golang",
    tags: ["Library"],
    fcVersion: "v2",
    image: "golang.svg",
    link: "https://github.com/friendlycaptcha/friendly-captcha-go",
    github: "FriendlyCaptcha/friendly-captcha-go",
    official: true,
  },
  {
    name: "Go",
    slug: "v1/golang",
    tags: ["Library"],
    fcVersion: "v1",
    image: "golang.svg",
    link: "https://github.com/friendlycaptcha/friendly-captcha-go-sdk",
    github: "FriendlyCaptcha/friendly-captcha-go-sdk",
    official: true,
  },
  {
    name: "JavaScript",
    slug: "js",
    tags: ["Library"],
    fcVersion: "v2",
    image: "js.svg",
    link: "https://www.npmjs.com/package/@friendlycaptcha/server-sdk",
    github: "FriendlyCaptcha/friendly-captcha-javascript",
    official: true,
  },
  {
    name: "Deno",
    slug: "deno",
    tags: ["Library"],
    fcVersion: "v2",
    image: "deno.svg",
    link: "https://www.npmjs.com/package/@friendlycaptcha/server-sdk",
    github: "FriendlyCaptcha/friendly-captcha-javascript",
    official: true,
  },
  {
    name: "Node.js",
    slug: "nodejs",
    tags: ["Library"],
    fcVersion: "v2",
    image: "nodejs.svg",
    link: "https://www.npmjs.com/package/@friendlycaptcha/server-sdk",
    github: "FriendlyCaptcha/friendly-captcha-javascript",
    official: true,
  },
  {
    name: "React",
    slug: "react",
    tags: ["Library"],
    fcVersion: "v1",
    image: "react.svg",
    link: "https://www.npmjs.com/package/@aacn.eu/use-friendly-captcha",
    github: "aacn/use-friendly-captcha",
  },
  {
    name: "React",
    slug: "react",
    tags: ["Library"],
    fcVersion: "v2",
    image: "react.svg",
    link: "/integrations/react",
    github: "FriendlyCaptcha/friendly-captcha-javascript",
    official: true,
  },
  {
    name: "Vue.js",
    slug: "vue-js",
    tags: ["Library"],
    fcVersion: "v1",
    image: "vue-js.svg",
    link: "https://www.npmjs.com/package/@somushq/vue3-friendly-captcha",
    github: "renderaidev/vue-friendly-captcha",
  },
  {
    name: "Vue.js",
    slug: "vue-js",
    tags: ["Library"],
    fcVersion: "v2",
    image: "vue-js.svg",
    link: "/integrations/vue",
    github: "FriendlyCaptcha/friendly-captcha-javascript",
    official: true,
  },
  {
    name: "JVM",
    slug: "jvm",
    tags: ["Library"],
    fcVersion: "v1",
    image: "java.svg",
    link: "https://github.com/dheid/friendlycaptcha",
    github: "dheid/friendlycaptcha",
  },
  {
    name: "Laravel",
    slug: "laravel",
    tags: ["Library"],
    fcVersion: "v1",
    image: "laravel.svg",
    link: "https://github.com/FriendlyCaptcha/friendly-captcha-laravel",
    github: "FriendlyCaptcha/friendly-captcha-laravel",
    official: true,
  },
  {
    name: "PHP",
    slug: "php",
    tags: ["Library"],
    fcVersion: "v2",
    image: "php.svg",
    link: "https://packagist.org/packages/friendlycaptcha/sdk",
    github: "FriendlyCaptcha/friendly-captcha-php",
    official: true,
  },
  {
    name: "Python",
    slug: "python",
    tags: ["Library"],
    fcVersion: "v2",
    image: "python.svg",
    link: "https://pypi.org/project/friendly-captcha-client/",
    github: "FriendlyCaptcha/friendly-captcha-python",
    official: true,
  },
  {
    name: "Django",
    slug: "django",
    tags: ["Library"],
    fcVersion: "v1",
    image: "django.svg",
    link: "https://github.com/FriendlyCaptcha/friendly-captcha-django",
    github: "FriendlyCaptcha/friendly-captcha-django",
    official: true,
  },
  {
    name: "Android",
    slug: "android",
    tags: ["Mobile"],
    fcVersion: "v2",
    image: "android.svg",
    link: "https://central.sonatype.com/artifact/com.friendlycaptcha.android/friendly-captcha-android",
    github: "FriendlyCaptcha/friendly-captcha-android",
    official: true,
  },
  {
    name: "iOS",
    slug: "ios",
    tags: ["Mobile"],
    fcVersion: "v2",
    image: "ios.svg",
    link: "https://cocoapods.org/pods/FriendlyCaptcha",
    github: "FriendlyCaptcha/friendly-captcha-ios",
    official: true,
  },
];

// WordPress and friends. These all support both v1 and v2,
// so to save space, we just define them all once here and
// then programmatically add both versions to the main list of integrations.
[
  {
    name: "WordPress",
    slug: "wordpress",
    image: "wordpress.svg",
  },
  {
    name: "CoBlocks",
    slug: "coblocks",
    image: "coblocks.svg",
  },
  {
    name: "Contact Form 7",
    slug: "contact-form-7",
    image: "contact-form-7.svg",
  },
  {
    name: "Divi Contact Form",
    slug: "divi",
    image: "divi.svg",
  },
  {
    name: "Elementor Pro Forms",
    slug: "elementor",
    image: "elementor.svg",
  },
  {
    name: "Fluent Forms",
    slug: "fluent-forms",
    image: "fluent-forms.png",
  },
  {
    name: "Gravity Forms",
    slug: "gravity-forms",
    image: "gravity-forms.svg",
  },
  {
    name: "Ultimate Member",
    slug: "ultimate-member",
    image: "ultimate-member.png",
  },
  {
    name: "WooCommerce",
    slug: "woocommerce",
    image: "woocommerce.svg",
    tags: ["CMS", "E-commerce"] as Tag[],
  },
  {
    name: "WPForms",
    slug: "wpforms",
    image: "wpforms.png",
  },
  {
    name: "Profile Builder",
    slug: "profile-builder",
    image: "profile-builder.png",
  },
  {
    name: "Forminator Forms",
    slug: "forminator",
    image: "forminator.png",
  },
  {
    name: "Formidable Forms",
    slug: "formidable",
    image: "formidable.svg",
  },
  {
    name: "Avada Form Builder",
    slug: "avada",
    image: "avada.png",
  },
].forEach((plugin) => {
  INTEGRATIONS.push({
    tags: ["CMS"],
    fcVersion: "v2",
    link: "https://wordpress.org/plugins/friendly-captcha/",
    github: "FriendlyCaptcha/friendly-captcha-wordpress",
    official: true,
    ...plugin,
  });
  INTEGRATIONS.push({
    tags: ["CMS"],
    fcVersion: "v1",
    link: "https://wordpress.org/plugins/friendly-captcha/",
    github: "FriendlyCaptcha/friendly-captcha-wordpress",
    official: true,
    ...plugin,
    slug: `v1/${plugin.slug}`,
  });
});

export const TAGS = new Set(
  INTEGRATIONS.filter((i) => i.fcVersion === "v2").flatMap((i) => i.tags)
);
