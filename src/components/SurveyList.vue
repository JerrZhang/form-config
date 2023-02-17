<script lang="ts" setup>
import { reactive, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

import ToolbarSlot from "./ToolbarSlot.vue";
import type { Survey } from "./types";
import { useSurvey } from "./useSurvey";

const router = useRouter();
const {
  save,
  remove,
  find,
  total,
  surveyVisible,
  surveyList,
  pageSize,
  pageNumber,
} = useSurvey([]);

const load = async () => {
  surveyList.value = await find(pageSize.value, pageNumber.value);
};

watch(pageSize, () => {
  load();
});
watch(pageNumber, () => {
  load();
});

let survey = reactive<Survey>({
  name: "",
});

onMounted(async () => {
  load();
});

const handleEdit = (row: any) => {
  survey = reactive({ ...row });
  surveyVisible.value = true;
};
const handleCreate = () => {
  surveyVisible.value = true;
};
const handleDelete = async (row: any) => {
  await remove(row.id);
  load();
};
const handleConfirm = async () => {
  await save({ ...survey });
  await load();

  survey = reactive<Survey>({
    name: "",
  });

  surveyVisible.value = false;
};

const handleGoQuestion = (row: any) => {
  router.push({
    name: "survey",
    params: {
      id: row.id,
    },
  });
};
</script>

<template>
  <ToolbarSlot @back="router.push({ path: '/' })">
    <template #title> 调研列表 </template>
    <el-button type="success" @click="handleCreate">
      <el-icon><Plus /></el-icon>
      <span>创建调研</span>
    </el-button>
  </ToolbarSlot>

  <el-table :data="surveyList" style="width: 100%">
    <el-table-column prop="name" label="调研名称" width="180" />
    <el-table-column prop="description" label="调研描述" />

    <el-table-column label="操作" width="270" fixed="right">
      <template #default="scope">
        <el-button size="small" type="success" @click="handleEdit(scope.row)">
          <el-icon><Edit /></el-icon>
          <span> 编辑 </span>
        </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.row)"
          ><el-icon>
            <Delete />
          </el-icon>
          <span>删除</span>
        </el-button>
        <el-button
          size="small"
          type="success"
          @click="handleGoQuestion(scope.row)"
        >
          <el-icon><Position /></el-icon>
          <span>问题列表</span>
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="pager">
    <el-pagination
      :hide-on-single-page="true"
      v-model:current-page="pageNumber"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
  </div>

  <el-dialog
    v-model="surveyVisible"
    :align-center="true"
    title="调研编辑"
    width="600px"
    @close="surveyVisible = false"
  >
    <el-form :model="survey" label-width="120px">
      <el-form-item label="调研名称">
        <el-input v-model="survey.name" placeholder="请输入调研名称" />
      </el-form-item>
      <el-form-item label="调研描述">
        <el-input
          type="textarea"
          v-model="survey.description"
          placeholder="请输入调研描述信息"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="surveyVisible = false">取消</el-button>
        <el-button type="success" @click="handleConfirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.pager {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  align-items: center;
}
</style>
