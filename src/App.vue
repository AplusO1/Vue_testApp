<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>Vue 3 POSTS</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs v-model="currentTab">
        <v-tab to="/one">Tab One</v-tab>
        <v-tab to="/two">Tab Two</v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const currentTab = ref(0);
    return { currentTab };
  },
};
</script>
