module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential"],
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": "off"
    // [
    //   "error",
    //   { vars: "all", args: "after-used", ignoreRestSiblings: false }
    // ]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
