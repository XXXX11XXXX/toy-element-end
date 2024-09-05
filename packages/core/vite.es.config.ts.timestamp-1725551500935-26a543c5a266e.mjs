// vite.es.config.ts
import { defineConfig } from "file:///C:/Users/63623/Desktop/toy-element/node_modules/.pnpm/vite@5.4.2_@types+node@20.16.1/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/63623/Desktop/toy-element/node_modules/.pnpm/@vitejs+plugin-vue@5.1.2_vite@5.4.2_@types+node@20.16.1__vue@3.4.38_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import dts from "file:///C:/Users/63623/Desktop/toy-element/packages/core/node_modules/.store/vite-plugin-dts@4.0.3/node_modules/vite-plugin-dts/dist/index.mjs";
import { filter, map, delay } from "file:///C:/Users/63623/Desktop/toy-element/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import { readdirSync, readFileSync } from "fs";
import shell from "file:///C:/Users/63623/Desktop/toy-element/node_modules/.store/shelljs@0.8.5/node_modules/shelljs/shell.js";

// hooksPlugin.ts
import { each, isFunction } from "file:///C:/Users/63623/Desktop/toy-element/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import shelljs from "file:///C:/Users/63623/Desktop/toy-element/node_modules/.store/shelljs@0.8.5/node_modules/shelljs/shell.js";
function hooksPlugin({
  rmFiles = [],
  beforeBuild,
  afterBuild
}) {
  return {
    name: "hooks-plugin",
    buildStart() {
      each(rmFiles, (fName) => shelljs.rm("-rf", fName));
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err) {
      !err && isFunction(afterBuild) && afterBuild();
    }
  };
}

// vite.es.config.ts
import terser from "file:///C:/Users/63623/Desktop/toy-element/packages/core/node_modules/.store/@rollup+plugin-terser@0.4.4/node_modules/@rollup/plugin-terser/dist/es/index.js";
var __vite_injected_original_dirname = "C:\\Users\\63623\\Desktop\\toy-element\\packages\\core";
var TRY_MOVE_STYLES_DELAY = 800;
var isProd = process.env.NODE_ENV === "production";
var isDev = process.env.NODE_ENV === "development";
var isTest = process.env.NODE_ENV === "test";
function moveStyles() {
  try {
    readFileSync("./dist/umd/index.css.gz");
    shell.cp("./dist/umd/index.css", "./dist/index.css");
  } catch (_) {
    delay(moveStyles, TRY_MOVE_STYLES_DELAY);
  }
}
function getDirectoriesSync(basePath) {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
var vite_es_config_default = defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types"
    }),
    hooksPlugin({
      rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: moveStyles
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ["log"],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest)
        }
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev
      }
    })
  ],
  build: {
    outDir: "dist/es",
    minify: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "./index.ts"),
      name: "ToyElement",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator"
      ],
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") {
            return "index.css";
          }
          if (chunkInfo.type === "asset" && /\.(css)$/i.test(chunkInfo.name)) {
            return "theme/[name].[ext]";
          }
          return chunkInfo.name;
        },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }
          if (id.includes("/packages/utils") || id.includes("plugin-vue:export-helper")) {
            return "utils";
          }
          for (const item of getDirectoriesSync("../components")) {
            if (`/packages/components/${item}`.includes(id)) {
              return item;
            }
          }
        }
      }
    }
  }
});
export {
  vite_es_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5lcy5jb25maWcudHMiLCAiaG9va3NQbHVnaW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw2MzYyM1xcXFxEZXNrdG9wXFxcXHRveS1lbGVtZW50XFxcXHBhY2thZ2VzXFxcXGNvcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDYzNjIzXFxcXERlc2t0b3BcXFxcdG95LWVsZW1lbnRcXFxccGFja2FnZXNcXFxcY29yZVxcXFx2aXRlLmVzLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvNjM2MjMvRGVza3RvcC90b3ktZWxlbWVudC9wYWNrYWdlcy9jb3JlL3ZpdGUuZXMuY29uZmlnLnRzXCI7aW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcclxuaW1wb3J0IHsgcmVzb2x2ZX0gZnJvbSAncGF0aCdcclxuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xyXG5pbXBvcnQge2ZpbHRlcixtYXAsZGVsYXl9IGZyb20gXCJsb2Rhc2gtZXNcIlxyXG5pbXBvcnQgeyByZWFkZGlyU3luYyxyZWFkRmlsZVN5bmMgfSBmcm9tIFwiZnNcIjtcclxuaW1wb3J0IHNoZWxsIGZyb20gJ3NoZWxsanMnO1xyXG5pbXBvcnQgaG9va3MgZnJvbSAnLi9ob29rc1BsdWdpbic7XHJcbmltcG9ydCB0ZXJzZXIgZnJvbSAnQHJvbGx1cC9wbHVnaW4tdGVyc2VyJztcclxuY29uc3QgVFJZX01PVkVfU1RZTEVTX0RFTEFZID0gODAwIGFzIGNvbnN0O1xyXG5jb25zdCBpc1Byb2QgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCI7XHJcbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIjtcclxuY29uc3QgaXNUZXN0ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwidGVzdFwiO1xyXG4vLyBjb25zdCBDT01QX05BTUVTID0gW1xyXG4vLyAgIFwiQWxlcnRcIixcclxuLy8gICBcIkJ1dHRvblwiLFxyXG4vLyAgIFwiQ29sbGFwc2VcIixcclxuLy8gICBcIkRyb3Bkb3duXCIsXHJcbi8vICAgXCJGb3JtXCIsXHJcbi8vICAgXCJJY29uXCIsXHJcbi8vICAgXCJJbnB1dFwiLFxyXG4vLyAgIFwiTG9hZGluZ1wiLFxyXG4vLyAgIFwiTWVzc2FnZVwiLFxyXG4vLyAgIFwiTWVzc2FnZUJveFwiLFxyXG4vLyAgIFwiTm90aWZpY2F0aW9uXCIsXHJcbi8vICAgXCJPdmVybGF5XCIsXHJcbi8vICAgXCJQb3Bjb25maXJtXCIsXHJcbi8vICAgXCJTZWxlY3RcIixcclxuLy8gICBcIlN3aXRjaFwiLFxyXG4vLyAgIFwiVG9vbHRpcFwiLFxyXG4vLyAgIFwiVXBsb2FkXCJcclxuLy8gXSBhcyBjb25zdDtcclxuZnVuY3Rpb24gbW92ZVN0eWxlcygpIHtcclxuICB0cnkge1xyXG4gICAgICByZWFkRmlsZVN5bmMoJy4vZGlzdC91bWQvaW5kZXguY3NzLmd6Jyk7XHJcbiAgICAgIHNoZWxsLmNwKFwiLi9kaXN0L3VtZC9pbmRleC5jc3NcIixcIi4vZGlzdC9pbmRleC5jc3NcIilcclxuICB9IGNhdGNoIChfKSB7XHJcbiAgICAgIGRlbGF5KG1vdmVTdHlsZXMsVFJZX01PVkVfU1RZTEVTX0RFTEFZKTtcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0RGlyZWN0b3JpZXNTeW5jKGJhc2VQYXRoOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGVudHJpZXMgPSByZWFkZGlyU3luYyhiYXNlUGF0aCwgeyB3aXRoRmlsZVR5cGVzOiB0cnVlIH0pO1xyXG4gIFxyXG4gICAgcmV0dXJuIG1hcChcclxuICAgICAgZmlsdGVyKGVudHJpZXMsIChlbnRyeTphbnkpID0+IGVudHJ5LmlzRGlyZWN0b3J5KCkpLFxyXG4gICAgICAoZW50cnk6YW55KSA9PiBlbnRyeS5uYW1lXHJcbiAgICApO1xyXG4gIH1cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIHBsdWdpbnM6W3Z1ZSgpLGR0cyh7XHJcbiAgICAgICAgdHNjb25maWdQYXRoOicuLi8uLi90c2NvbmZpZy5idWlsZC5qc29uJyxcclxuICAgICAgICBvdXREaXI6J2Rpc3QvdHlwZXMnXHJcblxyXG4gICAgfSksaG9va3Moe1xyXG4gICAgICBybUZpbGVzOlsnLi9kaXN0L2VzJywnLi9kaXN0L3RoZW1lJywnLi9kaXN0L3R5cGVzJ10sXHJcbiAgICAgIGFmdGVyQnVpbGQ6bW92ZVN0eWxlcyxcclxuICAgIH0pLFxyXG4gICAgdGVyc2VyKHtcclxuICAgICAgY29tcHJlc3M6e1xyXG4gICAgICAgIHNlcXVlbmNlczppc1Byb2QsXHJcbiAgICAgICAgYXJndW1lbnRzOmlzUHJvZCxcclxuICAgICAgICBkcm9wX2NvbnNvbGU6aXNQcm9kJiZbJ2xvZyddLFxyXG4gICAgICAgIGRyb3BfZGVidWdnZXI6aXNQcm9kLFxyXG4gICAgICAgIHBhc3Nlczppc1Byb2Q/NDoxLFxyXG4gICAgICAgIGdsb2JhbF9kZWZzOntcclxuICAgICAgICAgIFwiQERFVlwiOiBKU09OLnN0cmluZ2lmeShpc0RldiksXHJcbiAgICAgICAgICBcIkBQUk9EXCI6IEpTT04uc3RyaW5naWZ5KGlzUHJvZCksXHJcbiAgICAgICAgICBcIkBURVNUXCI6IEpTT04uc3RyaW5naWZ5KGlzVGVzdCksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgZm9ybWF0OntcclxuICAgICAgICBzZW1pY29sb25zOmZhbHNlLFxyXG4gICAgICAgIHNob3J0aGFuZDppc1Byb2QsXHJcbiAgICAgICAgYnJhY2VzOiFpc1Byb2QsXHJcbiAgICAgICAgYmVhdXRpZnk6IWlzUHJvZCxcclxuICAgICAgY29tbWVudHM6IWlzUHJvZCxcclxuICAgICAgfSxcclxuICAgICAgbWFuZ2xlOntcclxuICAgICAgICB0b3BsZXZlbDppc1Byb2QsXHJcbiAgICAgICAgZXZhbDppc1Byb2QsXHJcbiAgICAgICAga2VlcF9jbGFzc25hbWVzOmlzRGV2LFxyXG4gICAgICAgIGtlZXBfZm5hbWVzOmlzRGV2LFxyXG4gICAgICB9LFxyXG4gICAgfSlcclxuICBdLFxyXG4gICAgYnVpbGQ6e1xyXG4gICAgICAgIG91dERpcjonZGlzdC9lcycsXHJcbiAgICAgICAgbWluaWZ5OmZhbHNlLFxyXG4gICAgICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcclxuICAgICAgICBsaWI6e1xyXG4gICAgICAgICAgICBlbnRyeTpyZXNvbHZlKF9fZGlybmFtZSwnLi9pbmRleC50cycpLFxyXG4gICAgICAgICAgICBuYW1lOidUb3lFbGVtZW50JyxcclxuICAgICAgICAgICAgZmlsZU5hbWU6J2luZGV4JyxcclxuICAgICAgICAgICAgZm9ybWF0czpbJ2VzJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6e1xyXG4gICAgICAgICAgICBleHRlcm5hbDpbXHJcbiAgICAgICAgICAgIFwidnVlXCIsXHJcbiAgICAgICAgICAgIFwiQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlXCIsXHJcbiAgICAgICAgICAgIFwiQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zXCIsXHJcbiAgICAgICAgICAgIFwiQGZvcnRhd2Vzb21lL3Z1ZS1mb250YXdlc29tZVwiLFxyXG4gICAgICAgICAgICBcIkBwb3BwZXJqcy9jb3JlXCIsXHJcbiAgICAgICAgICAgIFwiYXN5bmMtdmFsaWRhdG9yXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIG91dHB1dDp7XHJcbiAgICAgICAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChjaHVua0luZm8pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjaHVua0luZm8ubmFtZSA9PT0gXCJzdHlsZS5jc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gXCJpbmRleC5jc3NcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgY2h1bmtJbmZvLnR5cGUgPT09IFwiYXNzZXRcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAvXFwuKGNzcykkL2kudGVzdChjaHVua0luZm8ubmFtZSBhcyBzdHJpbmcpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGhlbWUvW25hbWVdLltleHRdXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2h1bmtJbmZvLm5hbWUgYXMgc3RyaW5nO1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtYW51YWxDaHVua3MoaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlc1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ2ZW5kb3JcIjtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIi9wYWNrYWdlcy9ob29rc1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJob29rc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZC5pbmNsdWRlcyhcIi9wYWNrYWdlcy91dGlsc1wiKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZC5pbmNsdWRlcyhcInBsdWdpbi12dWU6ZXhwb3J0LWhlbHBlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1x1NEUzQVx1NEU4Nlx1OTYzMlx1NkI2MmV4cFx1OEZEOVx1NEUyQXNmY1x1OEZEQlx1NTE2NVx1NTIzMGJ1dHRvblx1OTFDQ1x1OTc2Mlx1ODAwQ1x1NTJBMFx1OEY3RFx1OTg3QVx1NUU4Rmljb25cdTU0MEVcdTRFOEVidXR0b25cdTRGNDZcdTY2MkZcdThCRTVzZmNcdTRGOURcdThENTZcdTRFOEVpY29uXHU1QkZDXHU4MUY0XHU3Njg0XHU5NUVFXHU5ODk4XHJcbiAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidXRpbHNcIjtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGdldERpcmVjdG9yaWVzU3luYyhcIi4uL2NvbXBvbmVudHNcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGAvcGFja2FnZXMvY29tcG9uZW50cy8ke2l0ZW19YC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw2MzYyM1xcXFxEZXNrdG9wXFxcXHRveS1lbGVtZW50XFxcXHBhY2thZ2VzXFxcXGNvcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDYzNjIzXFxcXERlc2t0b3BcXFxcdG95LWVsZW1lbnRcXFxccGFja2FnZXNcXFxcY29yZVxcXFxob29rc1BsdWdpbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvNjM2MjMvRGVza3RvcC90b3ktZWxlbWVudC9wYWNrYWdlcy9jb3JlL2hvb2tzUGx1Z2luLnRzXCI7aW1wb3J0IHsgZWFjaCxpc0Z1bmN0aW9uIH0gZnJvbSBcImxvZGFzaC1lc1wiO1xyXG5pbXBvcnQgc2hlbGxqcyBmcm9tICdzaGVsbGpzJztcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaG9va3NQbHVnaW4oe1xyXG4gICAgcm1GaWxlcz1bXSxcclxuICAgIGJlZm9yZUJ1aWxkLFxyXG4gICAgYWZ0ZXJCdWlsZFxyXG59OntcclxuICAgIHJtRmlsZXM/OnN0cmluZ1tdLFxyXG4gICAgYmVmb3JlQnVpbGQ/OkZ1bmN0aW9uO1xyXG4gICAgYWZ0ZXJCdWlsZD86RnVuY3Rpb247XHJcbn0pe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOlwiaG9va3MtcGx1Z2luXCIsXHJcbiAgICAgICAgYnVpbGRTdGFydCgpe1xyXG4gICAgICAgICAgICBlYWNoKHJtRmlsZXMsKGZOYW1lKT0+c2hlbGxqcy5ybShcIi1yZlwiLGZOYW1lKSk7XHJcbiAgICAgICAgICAgIGlzRnVuY3Rpb24oYmVmb3JlQnVpbGQpJiZiZWZvcmVCdWlsZCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnVpbGRFbmQoZXJyPzpFcnJvcil7XHJcbiAgICAgICAgICAgICFlcnImJmlzRnVuY3Rpb24oYWZ0ZXJCdWlsZCkmJmFmdGVyQnVpbGQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNWLFNBQVEsb0JBQW1CO0FBQ2pYLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWM7QUFDdkIsT0FBTyxTQUFTO0FBQ2hCLFNBQVEsUUFBTyxLQUFJLGFB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
