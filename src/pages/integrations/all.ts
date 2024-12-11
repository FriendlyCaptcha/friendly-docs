export type Tag = "CMS" | "E-commerce" | "Library" | "Mobile" | "v1";

export interface Integration {
  name: string;
  slug: string;
  tags: Tag[];
  fcVersion: "v1" | "v2";
  image: string;
}

export const INTEGRATIONS: Integration[] = [
  {
    name: "WordPress",
    slug: "wordpress",
    tags: ["CMS"],
    fcVersion: "v2",
    image: "wordpress.png",
  },
  {
    name: "WordPress",
    slug: "v1/wordpress",
    tags: ["CMS"],
    fcVersion: "v1",
    image: "wordpress.png",
  },
  {
    name: "Magento 2",
    slug: "magento-2",
    tags: ["E-commerce"],
    fcVersion: "v1",
    image: "magento-2.svg",
  },
  {
    name: "PHP",
    slug: "php",
    tags: ["Library"],
    fcVersion: "v2",
    image: "php.svg",
  },
  {
    name: "Python",
    slug: "python",
    tags: ["Library"],
    fcVersion: "v2",
    image: "python.svg",
  },
  {
    name: "Go",
    slug: "golang",
    tags: ["Library"],
    fcVersion: "v2",
    image: "golang.svg",
  },
  {
    name: "Go",
    slug: "v1/golang",
    tags: ["Library"],
    fcVersion: "v1",
    image: "golang.svg",
  },
  {
    name: "JavaScript",
    slug: "js",
    tags: ["Library"],
    fcVersion: "v2",
    image: "js.svg",
  },
  {
    name: "JVM",
    slug: "jvm",
    tags: ["Library"],
    fcVersion: "v1",
    image: "java.svg",
  },
  {
    name: "Android",
    slug: "android",
    tags: ["Mobile"],
    fcVersion: "v2",
    image: "android.svg",
  },
  {
    name: "iOS",
    slug: "ios",
    tags: ["Mobile"],
    fcVersion: "v2",
    image: "ios.svg",
  },
];

export const TAGS = new Set(
  INTEGRATIONS.flatMap((i) => i.tags).concat("v1")
);
