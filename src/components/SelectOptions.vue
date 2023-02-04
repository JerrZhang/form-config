<script setup lang="ts">
import { Delete, Plus } from "@element-plus/icons-vue";
import { toRef } from "vue";
import type { AnswerOption } from "./types";

const props = defineProps<{
  options: Array<AnswerOption>;
  type: string;
}>();

const options = toRef(props, "options");

const handleDelete = (item: AnswerOption, idx: number) => {
  options.value.splice(idx, 1);
};

const handleAdd = () => {
  options.value.push({
    label: "",
    value: "",
    imageSrc: "",
  });
};
</script>

<template>
  <div class="option-container">
    <div class="option-title">选项列表</div>
    <el-form
      label-width="120px"
      :inline="true"
      v-for="(item, idx) in options"
      :key="idx"
      :model="item"
    >
      <el-form-item label="选项标题">
        <el-input v-model="item.label" placeholder="请输入选项标题" />
      </el-form-item>
      <el-form-item label="选项内容">
        <el-input v-model="item.value" placeholder="请输入选项内容" />
      </el-form-item>
      <el-form-item label="图片地址" v-if="type === 'picture-choice'">
        <el-input v-model="item.imageSrc" placeholder="请输入图片选项地址" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="danger"
          :icon="Delete"
          circle
          v-if="options.length !== 1"
          @click="handleDelete(item, idx)"
        />
        <el-button
          type="primary"
          :icon="Plus"
          circle
          v-if="idx === options.length - 1"
          @click="handleAdd"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.option-container {
  box-sizing: content-box;
  border: 1px solid var(--el-border-color);

  padding-top: 20px;
}
.option-title {
  font-weight: 500;
  margin-left: 50px;
  font-size: 20px;
  margin-bottom: 20px;
}
</style>
