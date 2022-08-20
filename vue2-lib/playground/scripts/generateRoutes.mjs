/* eslint-disable @typescript-eslint/no-var-requires */
import { globby } from 'globby'
import fs from 'fs'
import matter from 'gray-matter'

(async () => {
  const paths = await globby(['../examples/*/*.md']);
  const components = {};

  paths.forEach(path => {
    const content = fs.readFileSync(path).toString();
    const componentName = path.split('/')[2];

    if (componentName) {
      const { data } = matter(content);
      components[componentName] = { ...components[componentName], ...data };
    }
  });
  const TEMPLATE = `export default [
  ${Object.keys(components).map(
    component => `
  {
    path: '/${component}',
    meta: ${JSON.stringify(components[component])},
    component: () => import('../../examples/${component}/${component}.md'),
  }`,
  )}
];`;

  fs.writeFileSync('./router/demoRoutes.js', TEMPLATE);
})();
