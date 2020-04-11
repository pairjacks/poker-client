module.exports = {
  processors: ["stylelint-processor-styled-components"],
  plugins: ["stylelint-order", "stylelint-config-rational-order/plugin"],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-styled-components",
    "stylelint-prettier/recommended",
  ],
  rules: {
    "order/properties-order": [],
    "plugin/rational-order": [true, { "border-in-box-model": true }],
  },
};
