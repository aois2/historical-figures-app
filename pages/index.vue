<template>
  <v-container>
    <h1>歴史上の人物</h1>
    <v-row>
      <v-col
        v-for="(figures, mbti) in categorizedFigures"
        :key="mbti"
        cols="12"
      >
        <h2>{{ mbti }}</h2>
        <v-row>
          <v-col v-for="figure in figures" :key="figure._id" cols="12" md="4">
            <FigureCard :figure="figure" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useFetch } from "#imports";
import FigureCard from "~/components/FigureCard.vue";
import type { Figure } from "~/types";

const { data: figures } = await useFetch<Figure[]>("/api/figures");

// Categorizing figures by MBTI type
const categorizedFigures = computed(() => {
  return figures.value.reduce(
    (acc, figure) => {
      if (!acc[figure.mbti_type]) {
        acc[figure.mbti_type] = [];
      }
      acc[figure.mbti_type].push(figure);
      return acc;
    },
    {} as Record<string, Figure[]>
  );
});
</script>

<style scoped>
/* Add any styles you want here */
</style>
