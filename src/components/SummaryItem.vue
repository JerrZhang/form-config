<script setup lang="ts">
import {
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElSwitch,
  ElButton,
} from "element-plus";
import { ref, reactive, computed } from "vue";
import type { Summary } from "./types";

const props = defineProps<{ item: Summary; visible: boolean }>();

const emit = defineEmits(["confirm", "cancel"]);

const dialogVisible = ref(props.visible);

const summary = reactive({ ...props.item });

const handleConfirm = () => {
  emit("confirm", summary);
};

const title = computed(() => {
  return props.item.title ? "编辑结果" : "新建结果";
});
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    :align-center="true"
    :title="title"
    width="95%"
  >
    <div class="popup-body">
      <el-form :model="summary" label-width="120px">
        <el-form-item label="ID">
          <el-input
            v-model="summary.id"
            placeholder="问题ID，唯一标识，用来简要描述问题标题"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item label="标题">
          <el-input v-model="summary.title" placeholder="请输入标题" />
        </el-form-item>

        <el-form-item label="子标题">
          <el-input v-model="summary.subtitle" placeholder="请输入子标题" />
        </el-form-item>

        <el-form-item label="详细描述">
          <el-input
            v-model="summary.description"
            type="textarea"
            placeholder="输入描述信息"
          />
        </el-form-item>

        <el-form-item label="显示提交按钮">
          <el-switch v-model="summary.showSubmit" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('cancel')">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
