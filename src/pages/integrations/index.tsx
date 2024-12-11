import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import { Tag, TAGS } from "./all";

import styles from "./index.module.css";

export default function Integrations() {
  const [selectedTags, setSelectedTags] = React.useState(new Set<Tag>());

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
          />
        </div>
      </div>
    </Layout>
  );
}

interface FilterBarProps {
  selectedTags: Set<Tag>;
  setSelectedTags: (tags: Set<Tag>) => void;
}

function FilterBar({ selectedTags, setSelectedTags }: FilterBarProps) {
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
          {selectedTags.size ? Array.from(selectedTags)[0] : "All"}
        </button>
        <ul className="dropdown__menu">
          <li>
            <a
              className="dropdown__link"
              onClick={() => setSelectedTags(new Set<Tag>())}
            >
              All
            </a>
          </li>
          {Array.from(TAGS).map((tag: Tag) => (
            <li key={tag}>
              <a
                className="dropdown__link"
                onClick={() => {
                  setSelectedTags(new Set<Tag>([tag]));
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
            selectedTags.size || "pills__item--active"
          )}
          onClick={() => setSelectedTags(new Set<Tag>())}
        >
          All
        </li>
        {Array.from(TAGS).map((tag: Tag) => (
          <li
            key={tag}
            onClick={() => {
              const newTags = new Set<Tag>(selectedTags);
              if (selectedTags.has(tag)) {
                newTags.delete(tag);
              } else {
                newTags.add(tag);
              }
              setSelectedTags(newTags);
            }}
            className={clsx(
              "pills__item",
              selectedTags.has(tag) && "pills__item--active"
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
