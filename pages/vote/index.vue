<template>
  <v-container max-width="600">
    <h1>お気に入り投票</h1>
    <v-autocomplete
      label="カテゴリ"
      :items="['三国志']"
      variant="outlined"
    ></v-autocomplete>

    <v-form @submit.prevent="onSubmit">
      <v-autocomplete
        label="人物"
        :items="figureNames"
        variant="outlined"
        v-model="selectedFigure"
      ></v-autocomplete>
      <v-btn class="mt-2" type="submit" block>投票</v-btn>
    </v-form>

    <div v-if="apiError" class="error-message pa-2 red--text">
      {{ apiError }}
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import useFiguresData from "~/composables/useFiguresData";

const { figuresData } = useFiguresData();
console.log(figuresData.value);

const selectedFigure = ref<string | null>(null);
const apiError = ref<string | null>(null);

const figureNames = computed(() => {
  return figuresData.value.map((figure) => figure.name_jp);
});

const onSubmit = async () => {
  if (!selectedFigure.value) {
    apiError.value = "投票する人物を選択してください.";
    return;
  }

  // Find the figure's data based on the selected name
  const selectedFigureData = figuresData.value.find(
    (figure) => figure.name_jp === selectedFigure.value,
  );

  if (!selectedFigureData || !selectedFigureData._id) {
    apiError.value = "Figure not found or ID is missing";
    return;
  }

  try {
    await $fetch(`/api/vote`, {
      method: "PUT",
      params: {
        id: selectedFigureData._id,
      },
    });
  } catch (error) {
    apiError.value = error.message;
  }
};
</script>
