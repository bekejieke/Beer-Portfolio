import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "$dest/**",
      "cor v1/**",
      ".agent/**",
      ".agents/**"
    ]
  }
];

export default config;
