import BrowserOnly from "@docusaurus/BrowserOnly";
import { ColorModeProvider } from "@docusaurus/theme-common/internal";
import React from "react";

export default function PlaygroundPage() {
  return (
    <BrowserOnly fallback={<div>Playground Loading...</div>}>
      {() => {
        const Playground =
          require("../components/playground/Playground").default;
        return (
          <ColorModeProvider>
            <Playground />
          </ColorModeProvider>
        );
      }}
    </BrowserOnly>
  );
}
