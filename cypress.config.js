const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/**/*.spec.{js,jsx,ts,tsx}',
    // viewportHeight: 1920,
    // viewportWidth: 1080,
  },
});
