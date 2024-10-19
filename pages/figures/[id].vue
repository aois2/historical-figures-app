<template>
  <v-container max-width="800">
    <div v-if="error" class="error-message pa-2 red--text">
      {{ error.message }}
    </div>
    <div>
      <div :class="['text-h3', 'pa-2']">{{ figure.name_jp }}</div>
      <div :class="['text-h5', 'pa-2']">MBTI: {{ figure.mbti_type }}</div>
      <v-img :src="figure.image_url" aspect-ratio="2.0" />
      <div :class="['text-body-1', 'pa-2']">{{ figure.biography_jp }}</div>
      <div :class="['text-body-1', 'pa-2']">
        お気に入り投票数: {{ figure.votes }}
      </div>

      <div :class="['text-body-1', 'pa-2']">
        <div>MBTI投票数</div>
        <v-row>
          <v-col
            v-for="category in mbtiCategories"
            :key="category.category"
            cols="12"
            md="6"
            lg="3"
          >
            <ul>
              <li v-for="type in category.types" :key="type.mbti">
                <span
                  >{{ type.mbti }}:
                  {{ figure.mbti_votes[type.mbti] || 0 }}</span
                >
              </li>
            </ul>
          </v-col>
        </v-row>
      </div>

      <div v-if="apiError" class="error-message pa-2 red--text">
        {{ apiError }}
      </div>

      <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            color="primary"
            class="ml-2 my-3"
            variant="tonal"
            v-bind="activatorProps"
            >{{ `${figure.name_jp}のMBTIを投票する` }}</v-btn
          >
        </template>

        <v-card title="MBTI 投票">
          <v-form validate-on="submit lazy" @submit.prevent="submit">
            <v-card-text>
              <v-radio-group v-model="selectedMbti" column>
                <v-row>
                  <v-col
                    v-for="category in mbtiCategories"
                    :key="category.category"
                    cols="3"
                  >
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
              <v-spacer></v-spacer>

              <v-btn variant="plain" @click="dialog = false">キャンセル</v-btn>
              <v-btn
                :loading="loading"
                :disabled="!selectedMbti"
                color="primary"
                variant="flat"
                type="submit"
                >送信</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { useFetch, useRoute } from "#imports";
import type { Figure } from "~/types";

const route = useRoute();
const {
  data: figure,
  error,
  refresh,
} = await useFetch<Figure>(`/api/figures/${route.params.id}`);

const loading = ref(false);
const dialog = ref(false);
const mbtiCategories = ref([]);
const selectedMbti = ref("");
const apiError = ref<string | null>(null);

const fetchMbtiCategories = async () => {
  const categoriesData = await $fetch("/api/mbti-categories");
  mbtiCategories.value = categoriesData;
};

const submit = async () => {
  loading.value = true;
  apiError.value = null;

  try {
    await $fetch(`/api/vote`, {
      method: "PUT",
      params: {
        id: route.params.id,
        mbtiType: selectedMbti.value,
      },
    });

    await refresh();

    selectedMbti.value = "";
    dialog.value = false;
  } catch (error) {
    apiError.value = error.message;
  } finally {
    loading.value = false;
  }
};

watch(dialog, (newValue) => {
  if (!newValue) {
    selectedMbti.value = "";
  }
});

onMounted(() => {
  fetchMbtiCategories();
});
</script>
