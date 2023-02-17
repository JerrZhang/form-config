<script lang="ts" setup>
import { ArrowLeft } from "@element-plus/icons-vue";
const emit = defineEmits(["back"]);
const handleBack = () => {
  emit("back");
};
</script>
<template>
  <el-page-header :icon="ArrowLeft" @back="handleBack">
    <template #content>
      <div class="flex items-center">
        <span class="text-large font-600 mr-3">
          <slot name="title"></slot>
        </span>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <div class="toolbar">
          <slot></slot>
        </div>
      </div>
    </template>
  </el-page-header>
</template>
