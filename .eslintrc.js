module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: [".eslintrc.js"], // .eslintrc.js 파일을 린트에서 제외한다
  extends: [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended", // 리액트 규칙을 사용한다
    "plugin:react-hooks/recommended", // 리액트 훅 규칙을 사용한다
    "plugin:prettier/recommended", // Prettier 규칙을 사용한다
    "react-app", // Create React App에서 제공하는 기본 규칙을 사용한다
    "prettier", // Prettier와 충돌하는 ESLint 규칙을 비활성화한다
  ],
  root: true, // 이 설정 파일을 기준으로 프로젝트의 루트로 간주한다
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/prop-types": "off",
    "arrow-body-style": "off", // 화살표 함수의 본문 스타일을 강제하지 않는다
    "prefer-arrow-callback": "off", // 가능한 경우 화살표 함수를 사용하는 것을 강제하지 않는다
    "react/react-in-jsx-scope": "off", // 리액트를 JSX 스코프에 가져오는 것을 강제하지 않는다 (React 17 이상)
    // 'import/no-extraneous-dependencies': [
    //   'error',
    //   {
    //     devDependencies: [
    //       'src/**/*.{test,spec}.{js,jsx,ts,tsx}',
    //       '**/__tests__/**/*.{js,jsx,ts,tsx}',
    //     ],
    //     optionalDependencies: false,
    //     peerDependencies: false,
    //     packagePath: './package.json',
    //   },
    // ],
    "no-param-reassign": "off",
    "no-nested-ternary": "off",
    "no-use-before-define": "off", // 정의되기 전에 사용하는 것을 금지하는 규칙을 끈다
    "import/extensions": "off", // 모듈 import 시 파일 확장자를 생략할 수 있도록 한다
    "import/no-unresolved": "off", // 경로가 올바르게 해결되지 않는 모듈 import를 허용한다
    "import/prefer-default-export": "off", // 단일 export가 있는 경우 기본 export를 선호하는 규칙을 끈다
    "react-hooks/rules-of-hooks": "error", // 훅의 규칙을 준수하도록 강제한다 (에러로 표시)
    "react-hooks/exhaustive-deps": "warn", // 훅의 의존성을 검사하고 경고를 표시한다
    "react/jsx-props-no-spreading": "off", // JSX 속성 전개를 허용한다
    "no-unused-vars": "off", // 사용하지 않는 변수를 허용하지 않는다
    "react/require-default-props": "off",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] }, // JSX를 사용할 수 있는 파일 확장자를 지정한다
    ],
  },
  settings: {
    react: { version: "detect" },
  },
};
