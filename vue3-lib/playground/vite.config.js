import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginDoc from '@youus/vite-plugin-doc';
import matter from 'gray-matter';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  plugins: [
    vue({
      include: /(\.md|\.vue)$/,
    }),
    vitePluginDoc({
      markdown: {
        container(md, container) {
          md.use(container, 'demo', {
            validate(params) {
              return params.trim().match(/^demo\s+([\\/.\w-]+)(\s+(.+?))?(\s+--dev)?$/);
            },
            render(tokens, idx) {
              if (tokens[idx].nesting === 1) {
                const match = tokens[idx].info.trim().match(/^demo\s+([\\/.\w-]+)(\s+(.+?))?(\s+--dev)?$/);
                const [, demoPath, componentName = ''] = match;
                const demoPathOnlyLetters = demoPath.replace(/[^a-zA-Z\d]/g, '');
                const demoName = path.basename(demoPath).trim();
                const demoDefName = `Demo${demoPathOnlyLetters}`;
                const demoCodeDefName = `Demo${demoPathOnlyLetters}Code`;

                const tpl = `
                    <div>
                      <DemoBox :code="${demoCodeDefName}">
                        <${demoDefName} />
                      </DemoBox>
                    </div>
                  `;

                tokens.tttpl = tpl;

                return `<div class="${componentName.trim()}-${demoName}">`;
              }
              if (tokens.tttpl) return `${tokens.tttpl || ''}</div>`;

              return '';
            },
          })
        }
      },
      transforms: {
        before({ source, file, md}) {
          demoImports = {};
          demoCodeImports = {};

          source.replace(/:::\s*demo\s+([\\/.\w-]+)/g, (demoStr, relativeDemoPath) => {
            const demoPathOnlyLetters = relativeDemoPath.replace(/[^a-zA-Z\d]/g, '');
            const demoDefName = `Demo${demoPathOnlyLetters}`;
            const demoCodeDefName = `Demo${demoPathOnlyLetters}Code`;
            demoImports[demoDefName] = `import ${demoDefName} from './${relativeDemoPath}.vue';`;
            demoCodeImports[demoCodeDefName] = `import ${demoCodeDefName} from './${relativeDemoPath}.vue?raw';`;
          });

          const { content, data: pageData } = matter(source);

          return content;
        },
        after({ result, file, source, md }) {
          const demoDefsStr = Object.keys(demoImports)
              .map((key) => demoImports[key])
              .join('\n');
          const demoCodesStr = Object.keys(demoCodeImports)
              .map((key) => demoCodeImports[key])
              .join('\n');

          const vueSource = `
                <template>
                  <div name="DEMO">${result.html}</div>
                </template>
                <script>
                ${demoDefsStr}
                ${demoCodesStr}
                export default {
                  components: {
                    ${Object.keys(demoImports).join(',')}
                  },
                  setup() {
                    return {
                      ${Object.keys(demoCodeImports).join(',')}
                    }
                  }
                }
                </script>
              `;

          return vueSource;
        },
      }
    })
  ],
})
