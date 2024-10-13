<template>
  <v-container>
    <div v-if="error">An error occurred: {{ error.message }}</div>
    <div v-else>
      <v-card>
        <v-card-title>{{ figure.name_jp }}</v-card-title>
        <v-card-subtitle>MBTI: {{ figure.mbti_type }}</v-card-subtitle>
        <v-img :src="figure.image_url" aspect-ratio="1.5" />
        <v-card-text>{{ figure.biography_jp }}</v-card-text>
        <v-card-actions>
          <v-btn @click="voteForFigure" color="primary"
            >Vote for {{ figure.name }}</v-btn
          >
          <span>Votes: {{ figure.votes }}</span>
        </v-card-actions>
        <v-card-actions>
          <v-btn @click="voteForMBTI" color="secondary"
            >Vote for MBTI Type: {{ figure.mbti_type }}</v-btn
          >
          <span
            >{{ figure.mbti_type }} Votes:
            {{ figure.mbti_votes[figure.mbti_type] }}</span
          >
        </v-card-actions>
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

const voteForFigure = async () => {
  const { data, error: voteError } = await useFetch(
    `/api/figures/${route.params.id}`,
    {
      method: "PUT",
    }
  );

  if (!voteError) {
    figure.value.votes += 1;
  } else {
    console.error("Failed to vote:", voteError);
  }
};

const voteForMBTI = async () => {
  const { data, error: mbtiVoteError } = await useFetch(
    `/api/vote/${route.params.id}?mbtiType=${figure.value.mbti_type}`,
    {
      method: "PUT",
    }
  );

  if (!mbtiVoteError) {
    figure.value.mbti_votes[figure.value.mbti_type] += 1;
  } else {
    console.error("Failed to vote for MBTI type:", mbtiVoteError);
  }
};
</script>

<style scoped>
/* Add any styles you want here */
</style>
