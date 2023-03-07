<script lang="ts" setup>
import { ref, computed } from "vue";
import { Delete, Plus } from "@element-plus/icons-vue";
import type { Question, Summary } from "./types";

const props = defineProps<{
  visible: boolean;
  questions: Array<Question | Summary>;
  curr: Question;
}>();
const emit = defineEmits(["close", "confirm"]);

const destinationPaths = props.questions.filter((q) => q.id !== props.curr.id);
const defaultJumps = props.curr.jump || {};

const showSelect = computed(() => props.curr.type.includes("choice"));

const selectOptions = computed(() => props.curr.options);

const jumpSteps = ref(
  Object.keys(defaultJumps).map((k) => {
    return {
      key: k,
      value: defaultJumps[k],
    };
  })
);

const handleConfirm = () => {
  let result = null;
  if (jumpSteps.value.length > 0) {
    result = Object.create({});

    for (let { key, value } of jumpSteps.value) {
      result[key] = value;
    }
  }

  emit("confirm", result);
};

const handleDelete = (idx: number) => {
  jumpSteps.value.splice(idx, 1);
};
const handleAdd = () => {
  jumpSteps.value.push({
    key: "",
    value: "",
  });
};
</script>

<template>
  <el-dialog
    :model-value="visible"
    :align-center="true"
    title="设置调整条件"
    width="850px"
    @close="emit('close')"
  >
    <div v-if="jumpSteps.length === 0" class="nodata">
      <el-button type="success" @click="handleAdd">开始创建</el-button>
    </div>

    <el-form
      label-width="120px"
      :inline="true"
      v-for="(jp, index) in jumpSteps"
      :key="index"
      :model="jp"
    >
      <el-form-item label="当值等于">
        <el-select
          v-if="showSelect"
          v-model="jp.key"
          placeholder="请选择要条件值"
        >
          <el-option
            v-for="(opt, index) in selectOptions"
            :key="index"
            :label="opt.value"
            :value="opt.value"
          ></el-option>
        </el-select>
        <el-input v-else v-model="jp.key" placeholder="请输入条件值" />
      </el-form-item>
      <el-form-item label="跳转到">
        <el-select v-model="jp.value" placeholder="请选择跳转路径">
          <el-option
            v-for="(item, idx) in destinationPaths"
            :key="idx"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="danger"
          :icon="Delete"
          circle
          @click="handleDelete(index)"
        />
        <el-button
          type="success"
          :icon="Plus"
          circle
          v-if="index === jumpSteps.length - 1"
          @click="handleAdd"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">取消</el-button>
        <el-button type="success" @click="handleConfirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.nodata {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
