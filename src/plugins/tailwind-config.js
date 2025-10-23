module.exports = function tailwindPlugin(context, options) {
  return {
    name: "tailwind-plugin",
    configurePostCss(postcssOptions) {
      postcssOptions.plugins.push(
        require("postcss-import"),
        require("@tailwindcss/postcss")
      );
      return postcssOptions;
    },
  };
};
