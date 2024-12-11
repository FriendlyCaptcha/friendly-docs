import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import { Tag, TAGS, Integration, INTEGRATIONS } from "@site/src/integrations";

import styles from "./index.module.css";

export default function Integrations() {
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const integrations = INTEGRATIONS.filter((integration) => {
    const tags = selectedTags.includes("v1")
      ? selectedTags.concat(searchQuery)
      : selectedTags.concat("v2", searchQuery);

    const stringified = JSON.stringify(integration).toLowerCase();
    return tags.every((tag) => stringified.includes(tag.toLowerCase()));
  });

  const phpVisible = !!integrations.find((i) => i.slug === "php");
  const androidVisible = !!integrations.find((i) => i.slug === "android");

  return (
    <Layout title="Integrations">
      <div className="hero padding-bottom--none">
        <div className="container">
          <h1 className="hero__title">Integrations</h1>
          <p className="hero__subtitle">
            Plugins and libraries to implement Friendly Captcha into your
            product easily.
          </p>
        </div>
      </div>
      <FilterBar
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {integrations.length > 0 ? (
        <div className={clsx(styles.grid, "container margin-vert--md")}>
          {integrations.map((integration) => (
            <IntegrationCard key={integration.slug} {...integration} />
          ))}
        </div>
      ) : (
        <div className="container margin-vert--md">
          <div className="alert alert--primary">
            <h2>Don't see your framework or programming language?</h2>
            <p className="margin-bottom--none">
              You can integrate Friendly Captcha into any framework or
              programming language by following the{" "}
              <a href="/docs/v2/getting-started">Getting Started</a> guide.
            </p>
          </div>
        </div>
      )}
      <LicensingFooter android={androidVisible} php={phpVisible} />
    </Layout>
  );
}

const LicensingFooter = ({
  android,
  php,
}: {
  android?: boolean;
  php?: boolean;
}) => {
  if (!php && !android) {
    return null;
  }
  return (
    <div className="container margin-bottom--md">
      {php ? (
        <p className="text--italic margin--none">
          <small>
            The PHP logo created by Colin Viebrock is licensed under{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/">
              CC BY-SA 4.0
            </a>
            .
          </small>
        </p>
      ) : null}
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
  link,
}: Integration) => (
  <div className={clsx("card", styles.grid__item)}>
    <div className={clsx("card__header", styles.grid__item__header)}>
      <h3>{name}</h3>
      {official && (
        <span className={clsx("badge", styles.badge__official)}>Official</span>
      )}
      {fcVersion === "v1" && (
        <span className="badge badge--secondary margin-left--xs">
          {fcVersion}
        </span>
      )}
    </div>
    <div className={clsx("card__body", styles.grid__item__body)}>
      <img src={`/img/integrations/${image}`} alt={`${name} logo`} />
    </div>
    <div className="card__footer">
      <a href={link} className="button button--secondary button--block">
        Integration ➔
      </a>
      <a
        href={`https://github.com/${github}`}
        className="button button--secondary button--block button--outline margin-top--sm"
      >
        <img
          className={styles.github}
          src="/img/github-logo.svg"
          alt="GitHub logo"
        />
        Source
      </a>
    </div>
  </div>
);

interface FilterBarProps {
  selectedTags: Tag[];
  setSelectedTags: (tags: Tag[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function FilterBar({
  selectedTags,
  setSelectedTags,
  searchQuery,
  setSearchQuery,
}: FilterBarProps) {
  return (
    <div className="container">
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
            {selectedTags.length ? selectedTags[0] : "All"}
          </button>
          <ul className="dropdown__menu">
            <li>
              <a className="dropdown__link" onClick={() => setSelectedTags([])}>
                All
              </a>
            </li>
            {Array.from(TAGS).map((tag: Tag) => (
              <li key={tag}>
                <a
                  className="dropdown__link"
                  onClick={() => {
                    setSelectedTags([tag]);
                  }}
                >
                  {tag}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ul className="pills margin--none">
          <li
            className={clsx(
              "pills__item",
              selectedTags.length || "pills__item--active"
            )}
            value={searchQuery}
            onClick={() => setSelectedTags([])}
          >
            All
          </li>
          {Array.from(TAGS).map((tag: Tag) => (
            <li
              key={tag}
              onClick={() => {
                if (selectedTags.includes(tag)) {
                  setSelectedTags(selectedTags.filter((t) => t !== tag));
                } else {
                  setSelectedTags(selectedTags.concat(tag));
                }
              }}
              className={clsx(
                "pills__item",
                selectedTags.includes(tag) && "pills__item--active"
              )}
            >
              {tag}
            </li>
          ))}
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
