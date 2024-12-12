export type Tag = "CMS" | "E-commerce" | "Library" | "Mobile";

export interface Integration {
  name: string;
  slug: string;
  tags: Tag[];
  fcVersion: "v1" | "v2";
  image: string;
  link: string;
  github: string;
  official?: boolean;
}

export const INTEGRATIONS: Integration[] = [
  {
    name: "WordPress",
    slug: "wordpress",
    tags: ["CMS"],
    fcVersion: "v2",
    image: "wordpress.svg",
    link: "https://wordpress.org/plugins/friendly-captcha/",
    github: "friendlycaptcha/friendly-captcha-wordpress",
    official: true,
  },
  {
    name: "WordPress",
    slug: "v1/wordpress",
    tags: ["CMS"],
    fcVersion: "v1",
    image: "wordpress.png",
    link: "https://wordpress.org/plugins/friendly-captcha/",
    github: "friendlycaptcha/friendly-captcha-wordpress",
    official: true,
  },
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
    name: "PHP",
    slug: "php",
    tags: ["Library"],
    fcVersion: "v2",
    image: "php.svg",
    link: "https://packagist.org/packages/friendlycaptcha/sdk",
    github: "friendlycaptcha/friendly-captcha-php",
    official: true,
  },
  {
    name: "Python",
    slug: "python",
    tags: ["Library"],
    fcVersion: "v2",
    image: "python.svg",
    link: "https://pypi.org/project/friendly-captcha-client/",
    github: "friendlycaptcha/friendly-captcha-python",
    official: true,
  },
  {
    name: "Go",
    slug: "golang",
    tags: ["Library"],
    fcVersion: "v2",
    image: "golang.svg",
    link: "https://github.com/friendlycaptcha/friendly-captcha-go",
    github: "friendlycaptcha/friendly-captcha-go",
    official: true,
  },
  {
    name: "Go",
    slug: "v1/golang",
    tags: ["Library"],
    fcVersion: "v1",
    image: "golang.svg",
    link: "https://github.com/friendlycaptcha/friendly-captcha-go-sdk",
    github: "friendlycaptcha/friendly-captcha-go-sdk",
    official: true,
  },
  {
    name: "JavaScript",
    slug: "js",
    tags: ["Library"],
    fcVersion: "v2",
    image: "js.svg",
    link: "https://www.npmjs.com/package/@friendlycaptcha/server-sdk",
    github: "friendlycaptcha/friendly-captcha-javascript",
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
    name: "Android",
    slug: "android",
    tags: ["Mobile"],
    fcVersion: "v2",
    image: "android.svg",
    link: "https://central.sonatype.com/artifact/com.friendlycaptcha.android/friendly-captcha-android",
    github: "friendlycaptcha/friendly-captcha-android",
    official: true,
  },
  {
    name: "iOS",
    slug: "ios",
    tags: ["Mobile"],
    fcVersion: "v2",
    image: "ios.svg",
    link: "https://cocoapods.org/pods/FriendlyCaptcha",
    github: "friendlycaptcha/friendly-captcha-ios",
    official: true,
  },
];

export const TAGS = new Set(INTEGRATIONS.flatMap((i) => i.tags));
