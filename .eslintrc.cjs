module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:vue/vue3-recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["vue", "html", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "vue/multi-word-component-names": "off",
    "vue/no-multiple-template-root": "off",
    "vue/no-deprecated-slot-attribute": "off",
  },
};
