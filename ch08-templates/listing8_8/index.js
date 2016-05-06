const hogan = require('hogan.js');
const md = require('github-flavored-markdown');
const templateSource = `
  {{#markdown}}
    **Name**: {{name}}
  {{/markdown}}
`;
const context = {
  name: 'Rick LaRue',
  markdown: () => {
    return function(text) {
      return md.parse(text);
    };
  }
};
const template = hogan.compile(templateSource);
console.log(template.render(context));
