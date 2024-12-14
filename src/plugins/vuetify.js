import { createVuetify } from "vuetify";
import "vuetify/styles";
import {
  VApp,
  VAppBar,
  VContainer,
  VDataTable,
  VBtn,
  VIcon,
  VSpacer,
  VTab,
  VTabs,
  VFileInput,
  VNavigationDrawer,
  VTextField,
  VTextarea,
  VToolbar,
  VToolbarTitle,
  VMain,
} from "vuetify/components";
import "@mdi/font/css/materialdesignicons.css";

export default createVuetify({
  components: {
    VApp,
    VAppBar,
    VContainer,
    VDataTable,
    VBtn,
    VIcon,
    VSpacer,
    VTab,
    VTabs,
    VFileInput,
    VNavigationDrawer,
    VTextField,
    VTextarea,
    VToolbar,
    VToolbarTitle,
    VMain,
  },
  icons: {
    iconfont: "mdi",
  },
});
