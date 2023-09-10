import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SakuraRenderer from "sakura-renderer";

const app = createApp(App);
// app.use(ElementPlus);
// app.use(SakuraUi);
app.use(SakuraRenderer);
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component);
// }

app.use(store).use(router).mount("#app");
