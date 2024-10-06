<template>
  <v-container>
    <h1>Famous Historical Figures</h1>
    <v-row>
      <v-col v-for="figure in figures" :key="figure._id" cols="12" md="4">
        <FigureCard :figure="figure" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useFetch } from "#imports";
import FigureCard from "~/components/FigureCard.vue";

interface Figure {
  _id: string;
  name: string;
  mbti_type: string;
  biography: string;
  image_url: string;
}

const { data: figures } = await useFetch<Figure[]>("/api/figures");
</script>
