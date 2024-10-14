<template>
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
    <v-btn class="mt-2" type="submit" block>Submit</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import useFiguresData from "~/composables/useFiguresData";

const { figuresData } = useFiguresData();

const selectedFigure = ref<string | null>(null);

const figureNames = computed(() => {
  return figuresData.value.map((figure) => figure.name_jp);
});

const onSubmit = async () => {
  if (!selectedFigure.value) {
    return;
  }

  // Find the figure's data based on the selected name
  const selectedFigureData = figuresData.value.find(
    (figure) => figure.name_jp === selectedFigure.value
  );

  if (!selectedFigureData || !selectedFigureData._id) {
    console.error("Figure not found or ID is missing");
    return;
  }

  try {
    const response = await $fetch(`/api/vote`, {
      method: "PUT",
      params: {
        id: selectedFigureData._id,
      },
    });
  } catch (error) {
    console.error("An error occurred while voting:", error);
  }
};
</script>
