<template>
  <v-container max-width="800">
    <div v-if="error">An error occurred: {{ error.message }}</div>
    <div v-else>
      <div :class="['text-h3', 'pa-2']">{{ figure.name_jp }}</div>
      <div :class="['text-h5', 'pa-2']">MBTI: {{ figure.mbti_type }}</div>
      <v-img :src="figure.image_url" aspect-ratio="2.0" />
      <div :class="['text-body-1', 'pa-2']">{{ figure.biography_jp }}</div>
      <div :class="['text-body-1', 'pa-2']">
        お気に入り投票数: {{ figure.votes }}
      </div>

      <div :class="['text-body-1', 'pa-2']">
        <div>MBTI投票数:</div>
        <ul>
          <li v-for="(count, mbtiType) in figure.mbti_votes" :key="mbtiType">
            <span>{{ mbtiType }}: {{ count }}</span>
          </li>
        </ul>
      </div>

      <v-btn @click="openDialog" color="secondary" class="ml-2">
        投票する
      </v-btn>

      <v-dialog v-model="dialog" max-width="600">
        <v-card>
          <v-card title="MBTI 投票">
            <v-card-text>
              <v-radio-group v-model="selectedMbtiType" column>
                <v-row>
                  <v-col
                    v-for="category in mbtiCategories"
                    :key="category.category"
                    cols="12"
                    md="6"
                    lg="3"
                  >
                    <div class="font-weight-bold mb-2">
                      {{ category.category }}
                    </div>
                    <v-radio
                      v-for="type in category.types"
                      :key="type.mbti"
                      :label="type.mbti"
                      :value="type.mbti"
                    ></v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" variant="elevated" @click="submitMbtiVote"
                >送信</v-btn
              >
              <v-btn color="secondary" @click="handleCancel">キャンセル</v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useFetch, useRoute } from "#imports";
import type { Figure } from "~/types";

const route = useRoute();
const { data: figure, error } = await useFetch<Figure>(
  `/api/figures/${route.params.id}`
);

// Dialog state
const dialog = ref(false);
const selectedMbtiType = ref<string | null>(null);
const mbtiCategories = ref([]);

const fetchMbtiCategories = async () => {
  const { data } = await useFetch("/api/mbti-categories");
  mbtiCategories.value = data.value;
};

const openDialog = () => {
  dialog.value = true;
};

const handleCancel = () => {
  selectedMbtiType.value = null; // Reset the selected MBTI type
  dialog.value = false;
};

const submitMbtiVote = async () => {
  if (!selectedMbtiType.value) {
    console.error("No MBTI type selected");
    return;
  }

  const { error: mbtiVoteError } = await useFetch(
    `/api/vote/${route.params.id}?mbtiType=${selectedMbtiType.value}`,
    {
      method: "PUT",
    }
  );

  if (!mbtiVoteError && figure.value?.mbti_votes) {
    // Increment the vote count for the specified MBTI type
    figure.value.mbti_votes[selectedMbtiType.value] += 1;
    dialog.value = false; // Close the dialog after successful vote
    selectedMbtiType.value = null; // Reset the selected MBTI type
  } else {
    console.error(
      `Failed to vote for MBTI type ${selectedMbtiType.value}:`,
      mbtiVoteError
    );
  }
};

onMounted(() => {
  fetchMbtiCategories();
});
</script>
