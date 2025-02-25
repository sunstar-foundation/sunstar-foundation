module.exports = {
    printWidth: 100, // Matches Airbnb’s recommended max line length
    tabWidth: 2, // Airbnb enforces 2 spaces per indent
    useTabs: false, // Use spaces instead of tabs
    semi: true, // Airbnb enforces semicolons
    singleQuote: true, // Airbnb prefers single quotes
    trailingComma: "es5", // Airbnb enforces trailing commas where valid in ES5
    bracketSpacing: true, // Ensures spaces inside object literals
    arrowParens: "always", // Enforce parentheses around single param arrow functions
    endOfLine: "lf", // Matches your 'linebreak-style': ['error', 'unix']
    overrides: [
      {
        files: ["*.js"],
        options: {
          parser: "babel",
        },
      },
    ],
  };
  