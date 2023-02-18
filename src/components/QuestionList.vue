<script setup lang="ts">
import type { Question, Summary } from "./types";

const emit = defineEmits(["edit", "delete", "jump-edit"]);
defineProps<{ questions: Array<Question | Summary> }>();

const handleEdit = (q: Question | Summary) => {
  emit("edit", q);
};

const handleDelete = (q: Question | Summary) => {
  emit("delete", q);
};

const handleJump = (q: Question) => {
  emit("jump-edit", q);
};

const viewBooleanText = (q: Question, key: keyof Question) => {
  return q[key] === undefined ? "" : q[key] ? "是" : "否";
};
</script>
<template>
  <div>
    <el-table :data="questions" style="width: 100%">
      <el-table-column fixed prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="type" label="问题类型" width="180" />
      <el-table-column label="是否必填" width="180">
        <template #default="scope">
          {{ viewBooleanText(scope.row, "required") }}
        </template>
      </el-table-column>
      <el-table-column label="显示提示文本" width="180">
        <template #default="scope">
          <div>
            {{ viewBooleanText(scope.row, "helpTextShow") }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="270" fixed="right">
        <template #default="scope">
          <el-button size="small" type="success" @click="handleEdit(scope.row)">
            <el-icon><Edit /></el-icon>
            <span>编辑</span>
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
          >
            <el-icon>
              <Delete />
            </el-icon>
            <span>删除</span>
          </el-button>
          <el-button
            v-if="scope.row.id !== '__complete'"
            size="small"
            type="success"
            @click="handleJump(scope.row)"
          >
            <el-icon>
              <Setting />
            </el-icon>
            <span>设置跳转条件</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped></style>
