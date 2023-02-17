<script setup lang="ts">
import { useRouter } from "vue-router";
import ToolbarSlot from "./ToolbarSlot.vue";

const router = useRouter();
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
  <ToolbarSlot @back="router.push({ name: 'list' })">
    <template #title> 调研问题列表 </template>
    <el-button type="success" @click="handleCreate">
      <el-icon><Plus /></el-icon>
      <span>创建普通问题</span>
    </el-button>
    <el-button
      type="success"
      @click="handleSummaryCreate"
      :disabled="hasSummary"
    >
      <el-icon><Plus /></el-icon>
      <span>创建最后问题</span>
    </el-button>
    <el-button type="success" @click="emit('preview')" :disabled="!hasSummary">
      <el-icon><View /></el-icon>
      <span>预览</span>
    </el-button>
    <el-button type="success" @click="handleViewResult">
      <el-icon><View /></el-icon>
      <span>查看导出结果</span>
    </el-button>
  </ToolbarSlot>
</template>
