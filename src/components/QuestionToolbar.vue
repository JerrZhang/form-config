<script setup lang="ts">
const emit = defineEmits([
  "createQuestion",
  "createSummary",
  "viewResult",
  "preview",
]);

defineProps<{ hasSummary: boolean }>();

const handleCreate = () => {
  emit("createQuestion");
};

const handleSummaryCreate = () => {
  emit("createSummary");
};

const handleViewResult = () => {
  emit("viewResult");
};
</script>
<template>
  <div class="toolbar">
    <el-button type="primary" @click="handleCreate">创建普通问题</el-button>
    <el-button
      type="primary"
      @click="handleSummaryCreate"
      :disabled="hasSummary"
      >创建最后问题</el-button
    >
    <el-button type="primary" @click="emit('preview')" :disabled="!hasSummary"
      >预览</el-button
    >
    <el-button type="primary" @click="handleViewResult">查看JSON结果</el-button>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  justify-content: right;
  margin-bottom: 10px;
  padding: 10px;
}
</style>
