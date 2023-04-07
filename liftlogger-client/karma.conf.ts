export default function karma(config: any) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('@angular/cli/plugins/karma'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    files: [{ pattern: './src/test.ts', watched: false }],
    preprocessors: {
      './src/test.ts': ['@angular/cli'],
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx'],
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true,
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        // base: 'ChromeHeadlessNoSandbox',
        flags: ['--no-sandbox', '--disable-gpu', '--headless', '--remote-debugging-port=9222'],
      },
    },
    singleRun: false,
  });
}
