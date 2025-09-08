import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
      options: {
        projectConfig: {
          root: '',
          sourceRoot: 'src',
          buildOptions: {
            outputPath: 'dist/dice-roller',
            index: 'src/index.html',
            main: 'src/main.ts',
            polyfills: [],
            tsConfig: 'tsconfig.app.json',
            inlineStyleLanguage: 'scss',
            assets: [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            styles: [
              'src/styles.css'
            ],
            scripts: [],
            buildOptimizer: false,
            optimization: false,
            vendorChunk: true,
            extractLicenses: false,
            sourceMap: true,
            namedChunks: true
          }
        }
      }
    },
    specPattern: "**/*.cy.ts"
  }
});
