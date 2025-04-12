import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierConfig from "./prettier.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended"
  ),

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // 문자열은 쌍따옴표
      quotes: ["error", "double"],

      // 세미콜론 필수
      semi: ["error", "always"],

      // 템플릿 문자열 사용 권장
      "prefer-template": "error",

      // 연산자 앞뒤 공백
      "space-infix-ops": "error",

      // 쉼표 뒤 공백
      "comma-spacing": ["error", { before: false, after: true }],

      // 중괄호 생략 금지
      curly: ["error", "all"],

      // 탭 간격 2칸
      indent: ["error", 2, { SwitchCase: 1 }],

      // Prettier와 연동
      "prettier/prettier": ["error", prettierConfig],
    },
  },
];

export default eslintConfig;
