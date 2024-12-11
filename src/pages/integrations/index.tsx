import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import { Tag, TAGS, Integration, INTEGRATIONS } from "./all";

import styles from "./index.module.css";

export default function Integrations() {
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const integrations = INTEGRATIONS.filter((integration) => {
    const tags = selectedTags.includes("v1")
      ? selectedTags.concat(searchQuery)
      : selectedTags.concat("v2", searchQuery);

    const stringified = JSON.stringify(integration).toLowerCase();
    return tags.every(tag => stringified.includes(tag.toLowerCase()))
  });

  return (
    <Layout title="Integrations">
      <div className="hero">
        <div className="container">
          <h1 className="hero__title">Integrations</h1>
          <p className="hero__subtitle">
            Plugins and libraries to implement Friendly Captcha into your
            product easily.
          </p>
          <FilterBar
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className={clsx(styles.grid, "margin-top--md")}>
            {integrations.map((integration) => (
              <IntegrationCard key={integration.slug} {...integration} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

const IntegrationCard = ({ name, fcVersion }: Integration) => (
  <div className={clsx("card", styles.grid__item)}>
    <div className={clsx("card__header", styles.grid__item__header)}>
      <h3>{name}</h3>
      <span
        className={clsx("badge", {
          "badge--primary": fcVersion === "v2",
          "badge--secondary": fcVersion === "v1",
        })}
      >
        {fcVersion}
      </span>
    </div>
    <div className="card__footer">
      <button className="button button--secondary button--block">
        Integrate
      </button>
    </div>
  </div>
);

interface FilterBarProps {
  selectedTags: Tag[];
  setSelectedTags: (tags: Tag[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function FilterBar({ selectedTags, setSelectedTags, searchQuery, setSearchQuery }: FilterBarProps) {
  return (
    <div
      className={clsx("container padding--none padding-top--md", styles.filter)}
    >
      <div
        className={clsx(
          "navbar__search margin-right--md",
          styles.filter__search
        )}
      >
        <input
          className="navbar__search-input"
          placeholder="Search integrations"
          onInput={(e) => { setSearchQuery((e.target as HTMLInputElement).value) }}
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
