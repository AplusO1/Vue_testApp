<template>
  <v-data-table
    :headers="headers"
    :items="posts"
    :items-per-page="10"
    item-key="id"
  >
    <template v-slot:item="{ item }">
      <tr @click="rowSelected(item)" class="clickable-row">
        <td>{{ item.id }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.body }}</td>
        <td>
          <v-btn icon @click.stop="deletePost(item.id)">
            <v-icon color="red">mdi-trash-can</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: ["posts"],
  data() {
    return {
      headers: [
        { text: "ID", value: "id" },
        { text: "Заголовок", value: "title" },
        { text: "Текст", value: "body" },
        { text: "Действия", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    rowSelected(post) {
      this.$emit("select", post);
    },
    deletePost(postId) {
      this.$emit("delete", postId);
    },
  },
});
</script>

<style scoped>
.clickable-row {
  cursor: pointer;
}
</style>
