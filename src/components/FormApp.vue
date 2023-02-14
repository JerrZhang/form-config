<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from "vue";
import { db } from "../db";
import FormPreview from "./FormPreview.vue";
import QuestionToolbar from "./QuestionToolbar.vue";
import QuestionList from "./QuestionList.vue";
import QuestionItem from "./QuestionItem.vue";
import SummaryItem from "./SummaryItem.vue";
import ResultView from "./ResultView.vue";
import type { Question, Summary } from "./types";

const dialogVisible = ref(false);
const summaryDialogVisible = ref(false);
const jsonResultDialogVisible = ref(false);
const formResultPreviewVisible = ref(false);

let item: Question;
let summary: Summary;
let questionList = ref<Array<Question | Summary>>([]);

//@fixme 没有问题列表只有一个
const findOne = async () => {
  return (await db.forms.limit(1).toArray())[0];
};
const loadQuestions = async () => {
  const itemOne = await findOne();
  try {
    if (itemOne?.content) {
      console.log("");
      questionList.value.push(...JSON.parse(itemOne.content));
    }
  } catch (error) {
    console.log("load questions", error);
  }
};
const loaded = ref(false);
onMounted(async () => {
  await loadQuestions();
  loaded.value = true;
});

watch(
  questionList,
  async () => {
    if (!loaded.value) return;
    console.log("数据发生变化，更新数据库");
    const itemOne = await findOne();
    const data = { content: JSON.stringify(questionList.value) };
    try {
      const result = itemOne?.id
        ? await db.forms.update(itemOne.id, data)
        : await db.forms.add(data);
      console.log("updated", result);
    } catch (error) {
      console.log(error);
    }
  },
  { deep: true }
);

const hasSummary = computed(() => {
  return questionList.value.find((r) => r.id === "__complete");
});

const handleEdit = (row: Question | Summary) => {
  if (row.id === "__complete") {
    summary = row as Summary;
    item = {} as Question;
    summaryDialogVisible.value = true;
  } else {
    item = row as Question;

    summary = {} as Summary;
    dialogVisible.value = true;
  }
};
const handleDelete = (row: Question) => {
  const idx = questionList.value.findIndex((q) => q.id === row.id);
  questionList.value.splice(idx, 1);
};

const handleConfirm = (item: Question) => {
  let target = questionList.value.find((q) => q.id === item.id) as Question;
  if (target) {
    Object.keys(item).forEach((p) => {
      const key = p as keyof Question;
      target[key] = item[key];
    });
  } else {
    questionList.value.push(item);
  }

  item = {} as Question;

  dialogVisible.value = false;
};

const handleSummaryConfirm = (item: Summary) => {
  const target = questionList.value.find((q) => q.id === item.id) as Summary;
  if (target) {
    Object.keys(item).forEach((p) => {
      const key = p as keyof Summary;
      target[key] = item[key];
    });
  } else {
    questionList.value.push(item);
  }

  summary = {} as Summary;

  summaryDialogVisible.value = false;
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
  dialogVisible.value = true;
};

const handleSummaryCreate = () => {
  summaryDialogVisible.value = true;

  summary = reactive<Summary>({
    id: "__complete",
    title: "",
    subtitle: "",
    description: "",
    showSubmit: false,
  });
};
const handleHeadBack = () => {
  location.href = "https://www.ptengine.com";
};
</script>

<template>
  <el-page-header :icon="null" @back="handleHeadBack">
    <template #content>
      <div class="flex items-center">
        <span class="text-large font-600 mr-3"> PT表单工具箱 </span>

        <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
          用来创建、配置多步表单的辅助工具
        </span>
        <el-tag>beta-0.0.1</el-tag>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <QuestionToolbar
          :has-summary="!!hasSummary"
          @create-question="handleCreate"
          @create-summary="handleSummaryCreate"
          @view-result="jsonResultDialogVisible = true"
          @preview="formResultPreviewVisible = true"
        ></QuestionToolbar>
      </div>
    </template>
  </el-page-header>

  <div>
    <QuestionList
      :questions="questionList"
      @edit="handleEdit"
      @delete="handleDelete"
    ></QuestionList>
  </div>

  <div v-if="dialogVisible">
    <QuestionItem
      :item="item"
      :visible="dialogVisible"
      @cancel="dialogVisible = false"
      @confirm="handleConfirm"
    >
    </QuestionItem>
  </div>

  <div v-if="summaryDialogVisible">
    <SummaryItem
      :item="summary"
      :visible="summaryDialogVisible"
      @cancel="summaryDialogVisible = false"
      @confirm="handleSummaryConfirm"
    ></SummaryItem>
  </div>

  <div v-if="jsonResultDialogVisible">
    <ResultView
      :visible="jsonResultDialogVisible"
      :questions="questionList"
      @close="jsonResultDialogVisible = false"
    >
    </ResultView>
  </div>

  <div v-if="formResultPreviewVisible">
    <FormPreview
      :JsonResult="JSON.stringify(questionList)"
      :visible="formResultPreviewVisible"
      @close="formResultPreviewVisible = false"
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
