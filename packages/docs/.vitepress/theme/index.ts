import DefaultTheme from "vitepress/theme";
import { type App } from "vue";
import ToyElement from "toy-element";
import {ElementPlusContainer} from '@vitepress-demo-preview/component'

// import "@vitepress-preview/component/dist/style.css";
import "toy-element/dist/es/theme/index.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component("demo-preview", ElementPlusContainer);
    app.use(ToyElement);
  },
};