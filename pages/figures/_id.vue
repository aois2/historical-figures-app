<template>
  <v-container>
    <v-card>
      <v-card-title>{{ figure.name }}</v-card-title>
      <v-card-subtitle>MBTI: {{ figure.mbti_type }}</v-card-subtitle>
      <v-card-text>{{ figure.biography }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useFetch, useRoute } from "#imports";

interface Figure {
  _id: string;
  name: string;
  mbti_type: string;
  biography: string;
  image_url: string;
}

const route = useRoute();
const { data: figure } = await useFetch<Figure>(
  `/api/figures/${route.params.id}`,
);
</script>
