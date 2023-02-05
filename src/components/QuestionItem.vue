<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import type { Question } from "./types";
import { questionTypes } from "./constants";
import SelectOptions from "./SelectOptions.vue";

const props = defineProps<{
  item: Question;
  visible: boolean;
}>();
const emit = defineEmits(["confirm", "cancel"]);

const question = reactive({ ...props.item });

const dialogVisible = ref(props.visible);

const handleConfirm = () => {
  emit("confirm", question);
};

const title = computed(() => {
  return props.item.id ? "编辑问题" : "新建问题";
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
      <el-form :model="question" label-width="120px">
        <el-form-item label="ID">
          <el-input
            v-model="question.id"
            placeholder="问题ID，唯一标识，用来简要描述问题标题"
          />
        </el-form-item>
        <el-form-item label="欢迎语">
          <el-input
            v-model="question.tagline"
            placeholder="请输入欢迎语内容，注意：只对第一个问题生效"
          />
        </el-form-item>
        <el-form-item label="标题内容">
          <el-input v-model="question.title" placeholder="标题" />
        </el-form-item>

        <el-form-item label="问题类型">
          <el-select v-model="question.type" placeholder="选择问题类型">
            <el-option
              v-for="item in questionTypes"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <template v-if="!!question.type">
          <template v-if="question.type.includes('choice')">
            <template v-if="question.options">
              <SelectOptions
                :options="question.options"
                :type="question.type"
              ></SelectOptions>
            </template>
            <el-form-item label="是否多选">
              <el-switch v-model="question.multiple" />
            </el-form-item>
            <el-form-item label="添加其它选项">
              <el-switch v-model="question.allowOther" />
            </el-form-item>
          </template>
          <el-form-item label="是否必填">
            <el-switch v-model="question.required" />
          </el-form-item>
          <el-form-item label="设为标签">
            <el-switch v-model="question.tag" />
          </el-form-item>
          <el-form-item label="是否显示提示">
            <el-switch v-model="question.helpTextShow" />
          </el-form-item>
          <el-form-item label="Keepalive">
            <el-switch v-model="question.keepAlive" />
          </el-form-item>
        </template>
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
