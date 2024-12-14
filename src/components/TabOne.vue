<template>
  <v-container>
    <PostTable
      :posts="posts"
      :key="uniqueKey"
      @select="selectPost"
      @delete="deletePost"
    />
    <v-btn color="green" @click="openAddDrawer">Добавить пост</v-btn>

    <PostDrawer
      v-if="drawerOpen"
      :post="selectedPost"
      :mode="drawerMode"
      @close="closeDrawer"
      @update="updatePost"
      @add="addPost"
    />
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import PostTable from "./PostTable.vue";
import PostDrawer from "./PostDrawer.vue";

export default {
  components: { PostTable, PostDrawer },
  setup() {
    const posts = ref([]);
    const selectedPost = ref(null);
    const drawerMode = ref(null);
    const drawerOpen = ref(false);
    const uniqueKey = ref(uuidv4());

    // Загрузка данных
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        posts.value = response.data;
        uniqueKey.value = uuidv4();
      } catch (error) {
        console.error("Ошибка при загрузке постов:", error);
      }
    };

    // Открытие панели добавления
    const openAddDrawer = () => {
      selectedPost.value = null;
      drawerMode.value = "add";
      drawerOpen.value = true;
    };

    // Выбор поста для редактирования
    const selectPost = (post) => {
      if (post) {
        selectedPost.value = { ...post };
        drawerMode.value = "edit";
        drawerOpen.value = true;
      } else {
        console.error("Пост не найден!");
      }
    };

    // Обновление поста
    const updatePost = (updatedPost) => {
      const index = posts.value.findIndex((post) => post.id === updatedPost.id);
      if (index !== -1) {
        posts.value = [
          ...posts.value.slice(0, index),
          updatedPost,
          ...posts.value.slice(index + 1),
        ];
        alert("Пост обновлен!");
      } else {
        console.log("Пост с таким ID не найден.");
      }
      closeDrawer();
    };

    // Добавление нового поста
    const addPost = (newPost) => {
      const newId =
        posts.value.length > 0
          ? Math.max(...posts.value.map((p) => p.id)) + 1
          : 1;
      posts.value = [...posts.value, { ...newPost, id: newId }];
      closeDrawer();
      alert("Пост добавлен!");
    };

    // Удаление поста
    const deletePost = (postId) => {
      posts.value = posts.value.filter((post) => post.id !== postId);
      alert("Пост удален!");
    };

    // Закрытие панели
    const closeDrawer = () => {
      drawerOpen.value = false;
    };

    onMounted(fetchPosts);

    return {
      posts,
      selectedPost,
      drawerMode,
      drawerOpen,
      uniqueKey,
      openAddDrawer,
      selectPost,
      updatePost,
      addPost,
      deletePost,
      closeDrawer,
    };
  },
};
</script>
