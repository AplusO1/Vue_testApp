<template>
  <v-container>
    <v-file-input label="Выберите файл" v-model="file"></v-file-input>
    <v-btn color="green" @click="sendFile">Отправить</v-btn>
    <v-btn v-if="downloadUrl" color="success" @click="downloadFile"
      >Скачать</v-btn
    >
  </v-container>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const file = ref(null);
    const downloadUrl = ref(null);

    const sendFile = async () => {
      const formData = new FormData();
      formData.append("file", file.value);
      try {
        const response = await axios.post(
          "https://api.escuelajs.co/api/v1/files/upload",
          formData
        );
        downloadUrl.value = response.data.location;
        alert("Файл успешно загружен");
      } catch (error) {
        alert("Ошибка при загрузке файла");
      }
    };

    const downloadFile = () => {
      const link = document.createElement("a");
      link.href = downloadUrl.value;
      link.download = "downloaded-file";
      link.click();
    };

    return { file, downloadUrl, sendFile, downloadFile };
  },
};
</script>

<style scoped>
.v-container {
  padding: 100px;
}
</style>
