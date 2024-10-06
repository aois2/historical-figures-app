<template>
  <v-card>
    <v-img :src="figure.image_url" height="200px" />
    <v-card-title>{{ figure.name }}</v-card-title>
    <v-card-subtitle>{{ figure.mbti_type }}</v-card-subtitle>
    <v-card-actions>
      <NuxtLink :to="`/figures/${figure._id}`">Learn More</NuxtLink>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
interface Figure {
  _id: string;
  name: string;
  mbti_type: string;
  image_url: string;
}

const props = defineProps<{ figure: Figure }>();
</script>
