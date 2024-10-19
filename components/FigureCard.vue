<template>
  <v-card>
    <v-img :src="figure.image_url" height="200px" />
    <v-card-title>{{ figure.name_jp }}</v-card-title>
    <v-card-subtitle>{{ figure.mbti_type }}</v-card-subtitle>
    <v-card-text>お気に入り投票数: {{ figure.votes }}</v-card-text>
    <v-card-text class="biography-text">{{ figure.biography_jp }}</v-card-text>
    <v-card-actions>
      <NuxtLink :to="`/figures/${figure._id}`">Learn More</NuxtLink>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import type { Figure } from "~/types";

const props = defineProps<{ figure: Figure }>();
</script>

<style scoped>
.biography-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 4em;
}
</style>
