export type Tag = "CMS" | "E-commerce" | "Library" | "Mobile" | "v1";

export interface Integration {
  name: string;
  slug: string;
  tags: Tag[];
  fcVersion: "v1" | "v2";
}

export const INTEGRATIONS: Integration[] = [
  {
    name: "WordPress",
    slug: "wordpress",
    tags: ["CMS"],
    fcVersion: "v2",
  },
  {
    name: "WordPress",
    slug: "v1/wordpress",
    tags: ["CMS"],
    fcVersion: "v1",
  },
  {
    name: "Magento 2",
    slug: "magento-2",
    tags: ["E-commerce"],
    fcVersion: "v1",
  },
  {
    name: "PHP",
    slug: "php",
    tags: ["Library"],
    fcVersion: "v2",
  },
  {
    name: "Python",
    slug: "python",
    tags: ["Library"],
    fcVersion: "v2",
  },
  {
    name: "Go",
    slug: "golang",
    tags: ["Library"],
    fcVersion: "v2",
  },
  {
    name: "Go",
    slug: "v1/golang",
    tags: ["Library"],
    fcVersion: "v1",
  },
  {
    name: "JavaScript",
    slug: "js",
    tags: ["Library"],
    fcVersion: "v2",
  },
  {
    name: "JVM",
    slug: "jvm",
    tags: ["Library"],
    fcVersion: "v1",
  },
  {
    name: "Android",
    slug: "android",
    tags: ["Mobile"],
    fcVersion: "v2",
  },
  {
    name: "iOS",
    slug: "ios",
    tags: ["Mobile"],
    fcVersion: "v2",
  },
];

export const TAGS = new Set(
  INTEGRATIONS.flatMap((i) => i.tags).concat("v1")
);
