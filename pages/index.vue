<template>
  <v-container>
    <h1>歴史上の人物</h1>
    <div v-if="error" class="error-message pa-2 red--text">
      {{ error.message }}
    </div>
    <NuxtLink :to="'/vote'">お気に入りを投票する</NuxtLink>
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
import useFiguresData from "~/composables/useFiguresData";
import type { Figure } from "~/types";

const { figuresData, setFiguresData } = useFiguresData();

const { data, error } = await useFetch<Figure[]>("/api/figures");

if (data.value) {
  setFiguresData(data.value);
}

const categorizedFigures = computed(() => {
  return figuresData.value.reduce(
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
