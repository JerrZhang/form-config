<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import FormPreview from "./FormPreview.vue";
import SurveyItemToolbar from "./SurveyItemToolbar.vue";
import QuestionList from "./QuestionList.vue";
import QuestionItem from "./QuestionItem.vue";
import SummaryItem from "./SummaryItem.vue";
import ResultView from "./ResultView.vue";
import type { Question, Summary, SurveyItem } from "./types";
import { useQuestion } from "./useQuestion";
import { useResult } from "./useResult";

const route = useRoute();
const { find, save, remove, questionVisible, summaryVisible } = useQuestion();

const { jsonResult, previewResult, setJsonResult, setPreviewResult } =
  useResult();

const surveyId = route.params.id as string;

let item: Question;
let summary: Summary;
let questionList = ref<Array<Question | Summary>>([]);

const loadQuestions = async (surveyId: string) => {
  const items = await find(surveyId);
  questionList.value = items.map((item) => {
    return { __meta: { id: item.id }, ...JSON.parse(item.content) };
  });
};
onMounted(async () => {
  loadQuestions(surveyId);
});

const hasSummary = computed(() => {
  return questionList.value.find((r) => r.id === "__complete");
});

const handleEdit = async (row: Question | Summary) => {
  if (row.id === "__complete") {
    summary = row as Summary;
    item = {} as Question;
    summaryVisible.value = true;
  } else {
    item = row as Question;

    summary = {} as Summary;
    questionVisible.value = true;
  }
};
const handleDelete = async (row: Question) => {
  await remove(row.__meta.id);
  loadQuestions(surveyId);
};

const handleConfirm = async (input: Question) => {
  const { __meta, ...rest } = input;
  const entity: SurveyItem = {
    ...__meta,
    surveyId,
    content: JSON.stringify(rest),
  };

  await save(entity);

  item = {} as Question;

  questionVisible.value = false;

  loadQuestions(surveyId);
};

const handleSummaryConfirm = async (input: Summary) => {
  const { __meta, ...rest } = input;
  const entity: SurveyItem = {
    ...__meta,
    surveyId,
    content: JSON.stringify(rest),
  };

  await save(entity);

  summary = {} as Summary;

  summaryVisible.value = false;

  loadQuestions(surveyId);
};

const handleCreate = () => {
  item = reactive<Question>({
    id: "",
    tagline: "",
    title: "",
    required: true,
    type: "text",
    keepAlive: false,
    multiple: false,
    allowOther: false,
    helpTextShow: false,
    options: [{ label: "", value: "" }],
  });
  questionVisible.value = true;
};

const handleSummaryCreate = () => {
  summaryVisible.value = true;

  summary = reactive<Summary>({
    id: "__complete",
    title: "",
    subtitle: "",
    description: "",
    showSubmit: false,
  });
};
</script>

<template>
  <SurveyItemToolbar
    :has-summary="!!hasSummary"
    @create-question="handleCreate"
    @create-summary="handleSummaryCreate"
    @view-result="() => setJsonResult(true)"
    @preview="() => setPreviewResult(true)"
  ></SurveyItemToolbar>

  <div>
    <QuestionList
      :questions="questionList"
      @edit="handleEdit"
      @delete="handleDelete"
    ></QuestionList>
  </div>

  <div v-if="questionVisible">
    <QuestionItem
      :item="item"
      :visible="questionVisible"
      @cancel="questionVisible = false"
      @confirm="handleConfirm"
    >
    </QuestionItem>
  </div>

  <div v-if="summaryVisible">
    <SummaryItem
      :item="summary"
      :visible="summaryVisible"
      @cancel="summaryVisible = false"
      @confirm="handleSummaryConfirm"
    ></SummaryItem>
  </div>

  <div v-if="jsonResult">
    <ResultView
      :visible="jsonResult"
      :questions="questionList"
      @close="() => setJsonResult(false)"
    >
    </ResultView>
  </div>

  <div v-if="previewResult">
    <FormPreview
      :JsonResult="JSON.stringify(questionList)"
      :visible="previewResult"
      @close="() => setPreviewResult(false)"
    ></FormPreview>
  </div>
</template>

<style scoped>
.popup-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.popup-body {
  max-height: 450px;
  overflow-y: auto;
}
</style>
