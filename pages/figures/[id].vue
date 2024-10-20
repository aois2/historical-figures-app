<template>
  <v-container max-width="800">
    <div v-if="error" class="error-message pa-2 red--text">
      {{ error.message }}
    </div>
    <div>
      <div class="text-h3 pa-2">{{ figure.name_jp }}</div>
      <div class="text-h5 pa-2">MBTI: {{ figure.mbti_type }}</div>
      <v-img :src="figure.image_url" aspect-ratio="2.0" />
      <div class="text-body-1 pa-2">{{ figure.biography_jp }}</div>
      <div class="text-body-1 pa-2 d-flex align-center">
        お気に入り投票数: {{ figure.votes }}
        <v-btn small icon @click="openConfirmDialog()">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>

      <div class="text-body-1 pa-2">
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
              <li
                v-for="type in category.types"
                :key="type.mbti"
                class="d-flex align-center justify-space-between mr-10"
              >
                <span
                  >{{ type.mbti }}:
                  {{ figure.mbti_votes[type.mbti] || 0 }}</span
                >
                <v-btn small icon @click="openConfirmDialog(type.mbti)">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </li>
            </ul>
          </v-col>
        </v-row>
      </div>

      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title class="headline">確認</v-card-title>
          <v-card-text>
            <span>{{ confirmMessage }}</span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="plain" @click="dialog = false">キャンセル</v-btn>
            <v-btn
              :loading="loading"
              color="primary"
              variant="flat"
              @click="onSubmit"
              >投票</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div v-if="apiError" class="error-message pa-2 red--text">
        {{ apiError }}
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
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
const apiError = ref<string | null>(null);
const confirmMessage = ref<string>("");
const selectedMbti = ref<string | null>(null);

const fetchMbtiCategories = async () => {
  const categoriesData = await $fetch("/api/mbti-categories");
  mbtiCategories.value = categoriesData;
};

const openConfirmDialog = (mbtiType: string | null = null) => {
  console.log(mbtiType);
  selectedMbti.value = mbtiType;
  confirmMessage.value = mbtiType
    ? `${mbtiType}に投票しますか？`
    : `${figure.value.name_jp}に投票しますか？`;
  dialog.value = true;
};

const onSubmit = async () => {
  loading.value = true;
  apiError.value = null;
  try {
    const params = { id: route.params.id };
    if (selectedMbti.value) {
      params["mbtiType"] = selectedMbti.value;
    }

    await $fetch(`/api/vote`, {
      method: "PUT",
      params: params,
    });

    await refresh();
    selectedMbti.value = null;
    dialog.value = false;
  } catch (error) {
    apiError.value = error.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchMbtiCategories();
});
</script>
