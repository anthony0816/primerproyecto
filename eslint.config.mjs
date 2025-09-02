// import js from "@eslint/js";
// import globals from "globals";
// import pluginReact from "eslint-plugin-react";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
//   pluginReact.configs.flat.recommended,
// ]);

import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    plugins: { 
      js 
    }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      globals: {
        ...globals.browser, 
        ...globals.node
      } 
    } 
  },
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      // Desactivar solo el error de React scope
      "react/react-in-jsx-scope": "off",
      // Opcional: desactivar prop-types
      "react/prop-types": "off",
    },
  },
]);