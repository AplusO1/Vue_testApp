import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";

const app = createApp(App);

app.config.globalProperties.$http = axios;

app.use(router).use(vuetify).mount("#app");
