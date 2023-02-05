<script setup lang="ts">
import { ref, computed } from "vue";
import type { Question, Summary } from "./types";

const props = defineProps<{
  visible: boolean;
  questions: Array<Question | Summary>;
}>();

const emits = defineEmits(["close"]);

const jsonResultDialogVisible = ref(props.visible);

const jsonResult = computed(() => {
  const processedResult = props.questions.map((q) => {
    const item = q as Question;
    //如果是选择项
    if (item.type && !item.type.includes("choice")) {
      return {
        ...item,
        options: undefined,
      };
    }
    return item;
  });

  return JSON.stringify(processedResult, null, 4);
});

const handleClose = () => {
  emits("close");
};
</script>
<template>
  <el-dialog
    v-model="jsonResultDialogVisible"
    :align-center="true"
    title="JSON结果"
    width="95%"
    @close="handleClose"
  >
    <div>
      <el-input
        type="textarea"
        :value="jsonResult"
        rows="20"
        :readonly="true"
      ></el-input>
    </div>
  </el-dialog>
</template>
