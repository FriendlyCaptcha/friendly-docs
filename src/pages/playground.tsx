import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function PlaygroundPage() {
  return (
    <BrowserOnly fallback={<div>Playground Loading...</div>}>
      {() => {
        const Playground =
          require("../components/playground/Playground").default;
        return <Playground />;
      }}
    </BrowserOnly>
  );
}
