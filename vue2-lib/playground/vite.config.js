import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2'
import vitePluginDoc from '@youus/vite-plugin-doc';
import matter from 'gray-matter';
import visualizer from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    base: '/',
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../'),
        '@site': path.resolve(__dirname, './'),
        '@docs': path.resolve(__dirname, './docs'),
        '@components': path.resolve(__dirname, './src/components'),
        vue: 'vue/dist/vue.esm.js',
      },
    },
    server: {
      host: '0.0.0.0',
      port: 9999,
      open: '/',
      https: false,
      fs: {
        strict: false,
      },
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
                <script setup>
                ${demoDefsStr}
                ${demoCodesStr}
                </script>
              `;

            return vueSource;
          },
        }
      })
    ],
    build: {
      assetsDir: '',
      outDir: '../../output',
      cssCodeSplit: false,
      target: 'esnext',
      manifest: true,
      rollupOptions: {
          plugins: [visualizer({ open: false })],
          preserveEntrySignatures: 'exports-only',
          external: ['single-spa', 'single-spa-vue'],
          input: 'src/entry.js',
          output: {
              format: 'system',
              entryFileNames: 'vue2-lib.[format].[hash].js',
              compact: true,
          },
      },
    },
  });
