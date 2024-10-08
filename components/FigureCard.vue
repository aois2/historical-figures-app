<template>
  <v-card>
    <v-img :src="figure.image_url" height="200px" />
    <v-card-title>{{ figure.name_jp }}</v-card-title>
    <v-card-subtitle>{{ figure.mbti_type }}</v-card-subtitle>
    <v-card-actions>
      <NuxtLink :to="`/figures/${figure._id}`">Learn More</NuxtLink>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import type { Figure } from "~/types";

const props = defineProps<{ figure: Figure }>();
</script>
