import type { StorybookConfig } from '@storybook/nextjs'; // storybook/ experimental-nextjs-vit

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  "framework": {
    "name": "@storybook/nextjs", // storybook/nextjs
    "options": {}
  },
  "staticDirs": [
    "../public"
  ]
};
export default config;


