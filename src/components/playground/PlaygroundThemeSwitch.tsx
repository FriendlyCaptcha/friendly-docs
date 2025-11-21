import { useColorMode } from "@docusaurus/theme-common";
import React from "react";
import { Icon } from "@iconify/react";

export default function PlaygroundThemeSwitch() {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <div className="fixed top-5 right-5">
      <button
        onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}
        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
      >
        <Icon
          icon={colorMode === "light" ? "solar:sun-bold" : "solar:moon-bold"}
          height={26}
        />
      </button>
    </div>
  );
}
