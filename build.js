const { writeFile, readFileSync } = require("fs");
const yaml = require("js-yaml");

// Color definition
const themeColors = yaml.safeLoad(readFileSync("colors/ibm-colors.yaml", "utf-8"));
// Base has the syntax tokens applicable across multiple languages
let base = yaml.safeLoad(readFileSync("colors/base.yaml", "utf-8"));
// Additional theme definitions to combine with base syntax token styles
const workbench = yaml.safeLoad(readFileSync("colors/workbench.yaml", "utf-8"));
//const template = yaml.safeLoad(readFileSync("colors/template.yaml", "utf-8"));
//const markdown = yaml.safeLoad(readFileSync("colors/markdown.yaml", "utf-8"));
//const js = yaml.safeLoad(readFileSync("colors/js.yaml", "utf-8"));
//const html = yaml.safeLoad(readFileSync("colors/html.yaml", "utf-8"));
//const css = yaml.safeLoad(readFileSync("colors/css.yaml", "utf-8"));
//const regex = yaml.safeLoad(readFileSync("colors/regex.yaml", "utf-8"));
//const jsdoc = yaml.safeLoad(readFileSync("colors/jsdoc.yaml", "utf-8"));

// Merge workbench styles
Object.assign(base, workbench);
// Merge additional syntax token styles
//base.tokenColors = base.tokenColors.concat(template, markdown, js, html, css, regex, jsdoc);

// Stringify all of the combined theme styles so we can run string regexes on it to
// replace color variables with color values
base = JSON.stringify(base, null, 2);

for (let color in themeColors) {
  
  for (let shade in themeColors[color]) {
    console.log(color + '.' + shade + ': ' + themeColors[color][shade]);
    base = base.replace(new RegExp('"' + color + "." + shade + '"', "g"), '"' + themeColors[color][shade] + '"');
  }
}

// Base file has been extended with additional theme styles and color variables have
// been replaced with Panda theme values. Write to /dist for consumption.
writeFile("themes/Positron.json", base, err => {
  if (err) {
    console.warn(err);
  }
  console.log("Build finished");
});
