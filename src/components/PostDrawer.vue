<template>
  <v-navigation-drawer v-model="drawerOpen" absolute temporary>
    <v-toolbar flat class="custom-toolbar">
      <v-toolbar-title class="toolbar-title">{{
        mode === "add" ? "Добавить пост" : "Редактировать пост"
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container>
      <v-text-field
        label="Заголовок"
        v-model="postData.title"
        outlined
        dense
      ></v-text-field>
      <v-textarea
        label="Текст"
        v-model="postData.body"
        outlined
        dense
      ></v-textarea>
      <v-btn color="primary" @click="submit">{{
        mode === "add" ? "Добавить" : "Обновить"
      }}</v-btn>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
    mode: {
      type: String,
      required: true,
      validator: (value) => ["add", "edit"].includes(value),
    },
  },
  setup(props, { emit }) {
    const drawerOpen = ref(true);
    const postData = ref({ title: "", body: "" });

    // Слежение за изменениями в post
    watch(
      () => props.post,
      (newPost) => {
        if (newPost && newPost.id) {
          postData.value = { ...newPost }; // Обновляем данные поста, если есть id
        } else {
          postData.value = { title: "", body: "" }; // При очистке данных, сбрасываем поля
        }
      },
      { immediate: true }
    );

    // Функция для обработки отправки
    const submit = () => {
      if (props.mode === "add") {
        // Добавление нового поста
        emit("add", { ...postData.value });
      } else if (props.mode === "edit") {
        // Обновление существующего поста
        emit("update", { ...postData.value });
      }
      emit("close"); // Закрытие панели после действия
    };

    return {
      drawerOpen,
      postData,
      submit,
    };
  },
};
</script>

<style scoped>
.v-toolbar-title {
  font-size: 15px;
  flex: content;
  .v-toolbar-title {
    font-size: 15px;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
