import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue';
import { resolve} from 'path'
import dts from 'vite-plugin-dts';
import {filter,map,delay} from "lodash-es"
import { readdirSync,readFileSync } from "fs";
import shell from 'shelljs';
import hooks from './hooksPlugin';
import terser from '@rollup/plugin-terser';
const TRY_MOVE_STYLES_DELAY = 800 as const;
const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";
// const COMP_NAMES = [
//   "Alert",
//   "Button",
//   "Collapse",
//   "Dropdown",
//   "Form",
//   "Icon",
//   "Input",
//   "Loading",
//   "Message",
//   "MessageBox",
//   "Notification",
//   "Overlay",
//   "Popconfirm",
//   "Select",
//   "Switch",
//   "Tooltip",
//   "Upload"
// ] as const;
function moveStyles() {
  try {
      readFileSync('./dist/umd/index.css.gz');
      shell.cp("./dist/umd/index.css","./dist/index.css")
  } catch (_) {
      delay(moveStyles,TRY_MOVE_STYLES_DELAY);
  }
}
function getDirectoriesSync(basePath: string) {
    const entries = readdirSync(basePath, { withFileTypes: true });
  
    return map(
      filter(entries, (entry:any) => entry.isDirectory()),
      (entry:any) => entry.name
    );
  }
export default defineConfig({
    plugins:[vue(),dts({
        tsconfigPath:'../../tsconfig.build.json',
        outDir:'dist/types'

    }),hooks({
      rmFiles:['./dist/es','./dist/theme','./dist/types'],
      afterBuild:moveStyles,
    }),
    terser({
      compress:{
        sequences:isProd,
        arguments:isProd,
        drop_console:isProd&&['log'],
        drop_debugger:isProd,
        passes:isProd?4:1,
        global_defs:{
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
      format:{
        semicolons:false,
        shorthand:isProd,
        braces:!isProd,
        beautify:!isProd,
      comments:!isProd,
      },
      mangle:{
        toplevel:isProd,
        eval:isProd,
        keep_classnames:isDev,
        keep_fnames:isDev,
      },
    })
  ],
    build:{
        outDir:'dist/es',
        minify:false,
        cssCodeSplit: true,
        lib:{
            entry:resolve(__dirname,'./index.ts'),
            name:'ToyElement',
            fileName:'index',
            formats:['es']
        },
        rollupOptions:{
            external:[
            "vue",
            "@fortawesome/fontawesome-svg-core",
            "@fortawesome/free-solid-svg-icons",
            "@fortawesome/vue-fontawesome",
            "@popperjs/core",
            "async-validator",
            ],
            output:{
              assetFileNames: (chunkInfo) => {
                if (chunkInfo.name === "style.css") {
                  return "index.css";
                }
                if (
                  chunkInfo.type === "asset" &&
                  /\.(css)$/i.test(chunkInfo.name as string)
                ) {
                  return "theme/[name].[ext]";
                }
                return chunkInfo.name as string;
              },
                manualChunks(id){
                    if (id.includes("node_modules")) {
                        return "vendor";
                      }
                      if (id.includes("/packages/hooks")) {
                        return "hooks";
                      }
                      if (
                        id.includes("/packages/utils") ||
                        id.includes("plugin-vue:export-helper")
                        //为了防止exp这个sfc进入到button里面而加载顺序icon后于button但是该sfc依赖于icon导致的问题
                      ) {
                        return "utils";
                      }
                      
                      for (const item of getDirectoriesSync("../components")) {
                        if (`/packages/components/${item}`.includes(id)) {
                          return item;
                        }
                      }
                },

            }
        }
    }
})