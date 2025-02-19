// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  ignorePatterns: ["/dist/*"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-empty": "error",
    "react/jsx-uses-react": "error",
    "react/react-in-jsx-scope": "error",
    "react/prop-types": "error",
  },
};
