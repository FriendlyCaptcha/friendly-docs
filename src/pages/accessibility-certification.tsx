import BrowserOnly from "@docusaurus/BrowserOnly";
import { ColorModeProvider } from "@docusaurus/theme-common/internal";
import React from "react";

export default function PlaygroundPage() {
  return (
    <BrowserOnly fallback={<div>Playground Loading...</div>}>
      {() => {
        const AcessibilityCertificationWidget =
          require("../components/AcessibilityCertificationWidget").default;
        return (
          <ColorModeProvider>
            <AcessibilityCertificationWidget />
          </ColorModeProvider>
        );
      }}
    </BrowserOnly>
  );
}
