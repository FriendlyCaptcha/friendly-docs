import React, { useMemo } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import { useColorMode } from "@docusaurus/theme-common";
import { Tag, TAGS, Integration, INTEGRATIONS } from "@site/src/integrations";

import styles from "./index.module.css";

export default function Integrations() {
  const [categoryFilter, setCategoryFilter] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  let integrations = useMemo(
    () =>
      INTEGRATIONS.filter((i) => {
        if (categoryFilter === "v1") {
          return i.fcVersion === "v1";
        }
        return i.fcVersion === "v2";
      }),
    [categoryFilter]
  );

  integrations = useMemo(
    () =>
      integrations.filter((i) => {
        const s = JSON.stringify(i).toLowerCase();
        return (
          s.includes(searchQuery.toLowerCase()) &&
          s.includes(categoryFilter.toLowerCase())
        );
      }),
    [searchQuery, categoryFilter]
  );

  const androidVisible = !!integrations.find((i) => i.slug === "android");

  return (
    <Layout title="Integrations">
      <div className="hero padding-bottom--lg">
        <div className="container">
          <h1 className="hero__title">Integrations</h1>
          <p className="hero__subtitle">
            Plugins and libraries to implement Friendly Captcha into your
            product easily.
          </p>
        </div>
      </div>
      <FilterBar
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div
        className={clsx(
          styles.grid,
          "container margin-top--lg margin-bottom--xl"
        )}
      >
        {integrations.map((integration) => (
          <IntegrationCard key={integration.slug} {...integration} />
        ))}
        <div className={clsx("card", styles.grid__item)}>
          <div className="card__header">
            <h4>Don't see your framework or programming language?</h4>
          </div>
          <div className="card__body">
            You can integrate Friendly Captcha into any framework or programming
            language by following the{" "}
            <a href="/docs/v2/getting-started">Getting Started</a> guide.
          </div>
        </div>
      </div>
      <LicensingFooter android={androidVisible} />
    </Layout>
  );
}

const LicensingFooter = ({ android }: { android?: boolean }) => {
  if (!android) {
    return null;
  }
  return (
    <div className="container margin-bottom--lg">
      {android ? (
        <p className="text--italic margin--none">
          <small>
            The Android robot is reproduced or modified from work created and
            shared by Google and used according to terms described in the
            Creative Commons 3.0 Attribution License.
          </small>
        </p>
      ) : null}
    </div>
  );
};

const IntegrationCard = ({
  name,
  fcVersion,
  image,
  official,
  github,
  source,
  link,
}: Integration) => (
  <div className={clsx("card", styles.grid__item)}>
    <div
      className={clsx(
        "card__header padding--none margin-top--md margin-left--md",
        styles.grid__item__header
      )}
    >
      <img src={`/img/integrations/${image}`} alt={`${name} logo`} />
    </div>
    <div className={clsx("card__body", styles.grid__item__body)}>
      <h3>{name}</h3>
      {official && <span className="badge badge--secondary">Official</span>}
      {fcVersion === "v1" && (
        <span className="badge badge--secondary margin-left--xs">v1</span>
      )}
    </div>
    <div
      className={clsx("card__footer", {
        "margin-top--none": !github && !source,
      })}
    >
      <a href={link} className="button button--secondary button--block">
        Get Started
      </a>
      <SourceLink github={github} source={source} />
    </div>
  </div>
);

const SourceLink = ({ github, source }: { github: string; source: string }) => {
  if (!github && !source) {
    return null;
  }

  const href = github ? `https://github.com/${github}` : source;

  return (
    <a
      href={href}
      className="button button--secondary button--block button--outline margin-top--sm"
    >
      {github && (
        <img
          className={styles.github}
          src="/img/github-logo.svg"
          alt="GitHub logo"
        />
      )}
      Source
    </a>
  );
};

interface FilterBarProps {
  categoryFilter: string;
  setCategoryFilter: (f: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

function FilterBar({
  categoryFilter,
  setCategoryFilter,
  searchQuery,
  setSearchQuery,
}: FilterBarProps) {
  return (
    <div className="container margin-vert--md">
      <div className={clsx("padding-top--md", styles.filter)}>
        <div
          className={clsx(
            "navbar__search margin-right--md",
            styles.filter__search
          )}
        >
          <input
            className="navbar__search-input"
            placeholder="Search integrations"
            onInput={(e) => {
              setSearchQuery((e.target as HTMLInputElement).value);
            }}
          />
        </div>
        <div
          className={clsx(
            "dropdown dropdown--hoverable dropdown--right",
            styles.filter__dropdown
          )}
        >
          <button className="button button--primary padding-horiz--sm">
            <IconFilter />
            {categoryFilter || "All"}
          </button>
          <ul className="dropdown__menu">
            <li>
              <a
                className="dropdown__link"
                onClick={() => setCategoryFilter("")}
              >
                All
              </a>
            </li>
            {Array.from(TAGS).map((tag: Tag) => (
              <li key={tag}>
                <a
                  className="dropdown__link"
                  onClick={() => {
                    setCategoryFilter(tag);
                  }}
                >
                  {tag}
                </a>
              </li>
            ))}
            <li>
              <a
                className="dropdown__link"
                onClick={() => setCategoryFilter("v1")}
              >
                v1
              </a>
            </li>
          </ul>
        </div>
        <ul className="pills margin--none">
          <li
            className={clsx(
              "pills__item",
              categoryFilter || "pills__item--active"
            )}
            value={searchQuery}
            onClick={() => setCategoryFilter("")}
          >
            All
          </li>
          {Array.from(TAGS).map((tag: Tag) => (
            <li
              key={tag}
              onClick={() => {
                setCategoryFilter(tag);
              }}
              className={clsx("pills__item", {
                "pills__item--active": categoryFilter === tag,
              })}
            >
              {tag}
            </li>
          ))}
          <li
            className={clsx("pills__item", {
              "pills__item--active": categoryFilter === "v1",
            })}
            value={searchQuery}
            onClick={() => setCategoryFilter("v1")}
          >
            v1
          </li>
        </ul>
      </div>
    </div>
  );
}

const IconFilter = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1rem"
    height="1rem"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M7 12h10" />
    <path d="M10 18h4" />
  </svg>
);
