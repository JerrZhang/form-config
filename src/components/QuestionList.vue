<script setup lang="ts">
import type { Question, Summary } from "./types";

const emit = defineEmits(["edit", "delete"]);
defineProps<{ questions: Array<Question | Summary> }>();

const handleEdit = (q: Question | Summary) => {
  emit("edit", q);
};

const handleDelete = (q: Question | Summary) => {
  emit("delete", q);
};
</script>
<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th style="width: 180px">ID</th>
          <th style="width: calc(100% - 360px)">标题</th>
          <th style="width: 180px">操作</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(element, idx) in questions" :key="idx">
          <td>{{ element.id }}</td>
          <td>{{ element.title }}</td>
          <td>
            <el-button size="small" @click="handleEdit(element)"
              >编辑</el-button
            >
            <el-button size="small" type="danger" @click="handleDelete(element)"
              >删除</el-button
            >
          </td>
        </tr>
      </tbody>

      <tfoot v-if="questions.length === 0">
        <td colspan="3" style="text-align: center">没有数据</td>
      </tfoot>
    </table>
  </div>
</template>

<style scoped>
.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
}

.table th {
  /* color: #fff; */
  /* background-color: #343a40; */
  border-color: #454d55;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 1px solid #dee2e6;
  border-top: none;
  text-align: left;
  font-weight: 500;
}

.table td,
.table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid var(--el-border-color);
  border-bottom: 1px solid var(--el-border-color);
  word-break: break-all;
}
</style>
