<template>
  <v-container>
    <div v-if="error">An error occurred: {{ error.message }}</div>
    <div v-else>
      <v-card>
        <v-card-title>{{ figure.name_jp }}</v-card-title>
        <v-card-subtitle>MBTI: {{ figure.mbti_type }}</v-card-subtitle>
        <v-img :src="figure.image_url" aspect-ratio="1.5" />
        <v-card-text>{{ figure.biography_jp }}</v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { useFetch, useRoute } from "#imports";
import type { Figure } from "~/types";

const route = useRoute();
const { data: figure, error } = await useFetch<Figure>(
  `/api/figures/${route.params.id}`
);
</script>

<style scoped>
/* Add any styles you want here */
</style>
