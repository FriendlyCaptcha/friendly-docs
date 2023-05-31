import React, { useMemo, useState } from "react";
import styles from "./styles.module.css";

interface Props {
  options: {
    language: string;
    code: string;
  }[];
}

export default function CodeSnippet({ options }: Props): JSX.Element {
  const [selectedLangauge, setSelectedLangauge] = useState(options[0].language);

  const code = useMemo(
    () => options.find((o) => o.language === selectedLangauge).code,
    [selectedLangauge]
  );

  return (
    <section className={styles.features}>
      <div className="container">
        <select onChange={(e) => setSelectedLangauge(e.target.value)}>
          {options.map((o) => (
            <option value={o.language}>{o.language}</option>
          ))}
        </select>
        <div className="row">
          <pre>{code}</pre>
        </div>
      </div>
    </section>
  );
}
