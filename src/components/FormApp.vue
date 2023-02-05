<script setup lang="ts">
import { ref, reactive, computed } from "vue";

import QuestionToolbar from "./QuestionToolbar.vue";
import QuestionList from "./QuestionList.vue";
import QuestionItem from "./QuestionItem.vue";
import SummaryItem from "./SummaryItem.vue";
import ResultView from "./ResultView.vue";
import type { Question, Summary } from "./types";

const dialogVisible = ref(false);
const summaryDialogVisible = ref(false);
const jsonResultDialogVisible = ref(false);

let item: Question;
let summary: Summary;
let questionList = ref<Array<Question | Summary>>([]);

const hasSummary = computed(() => {
  return questionList.value.find((r) => r.id === "__complete");
});

const popupTitle = ref("创建问题");

const handleEdit = (row: Question | Summary) => {
  popupTitle.value = "编辑问题";

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
  popupTitle.value = "创建问题";

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
  popupTitle.value = "创建问题";

  summaryDialogVisible.value = true;

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
  <el-descriptions title="多步表单配置模块">
    <el-descriptions-item label="工具栏：创建普通问题/创建最后问题"
      >普通问题可以创建多个，最后的问题只能创建一个</el-descriptions-item
    >
  </el-descriptions>
  <div>
    <QuestionToolbar
      :has-summary="!!hasSummary"
      @create-question="handleCreate"
      @create-summary="handleSummaryCreate"
      @view-result="jsonResultDialogVisible = true"
    ></QuestionToolbar>

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
    ></QuestionItem>
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
    ></ResultView>
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
