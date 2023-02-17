<script setup lang="ts">
import { ref, computed } from "vue";
import type { Question, Summary } from "./types";

const props = defineProps<{
  visible: boolean;
  questions: Array<Question | Summary>;
}>();

const emit = defineEmits(["close"]);

const jsonResultDialogVisible = ref(props.visible);

const jsonResult = computed(() => {
  const processedResult = props.questions.map((q) => {
    const item = q as Question;
    const { __meta, ...rest } = item;
    rest.options = rest.options?.map((o) => {
      return {
        ...o,
        label: o.value,
      };
    });
    //如果是选择项
    if (rest.type && !rest.type.includes("choice")) {
      return {
        ...rest,
        options: undefined,
      };
    }
    return rest;
  });

  return JSON.stringify(processedResult, null, 4);
});
</script>
<template>
  <el-dialog
    v-model="jsonResultDialogVisible"
    :align-center="true"
    title="JSON结果"
    width="95%"
    @close="emit('close')"
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
