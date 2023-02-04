<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import draggable from "vuedraggable";

import { questionTypes } from "./constants";
import SelectOptions from "./SelectOptions.vue";
import type { Question, Summary } from "./types";

const dialogVisible = ref(false);
const summaryDialogVisible = ref(false);
const jsonResultDialogVisible = ref(false);

const drag = ref(false);

let item: Question;
let summary: Summary;
let questionList = ref<Array<Question | Summary>>([]);

const dragOptions = [
  {
    selector: "tbody", // add drag support for row
    option: {
      // sortablejs's option
      animation: 150,
      onEnd: (event: any) => {
        console.log(event.oldIndex, event.newIndex);

        const newList = [];

        // 按照新索引 分为 索引前和索引后，索引后面的往后移，前面的保持不变即可

        const oldVal = questionList.value[event.oldIndex];
        var keep = questionList.value.slice(0, event.newIndex);
        console.log("keep", keep);

        newList.push(...keep);
        newList.push(oldVal);

        console.log(
          "move",
          questionList.value
            .slice(event.newIndex)
            .filter((q) => q.id !== oldVal.id)
        );
        newList.push(
          ...questionList.value
            .slice(event.newIndex)
            .filter((q) => q.id !== oldVal.id)
        );

        questionList = ref(newList);
        //
        const value = questionList.value[event.oldIndex];
        // const newVal = questionList.value[event.newIndex];
        //按照新索引插入
        //移除旧值
        // console.log(oldVal, newVal);

        // questionList.value[event.oldIndex] =
      },
    },
  },
];

const jsonResult = computed(() => {
  const processedResult = questionList.value.map((q) => {
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

const hasSummary = computed(() => {
  return questionList.value.find((r) => r.id === "__complete");
});

const popupTitle = ref("创建问题");

let curr: any = null;

const handleEdit = (row: Question | Summary) => {
  popupTitle.value = "编辑问题";

  curr = row;

  if (row.id === "__complete") {
    summary = row as Summary;
    item = {} as Question;
    summaryDialogVisible.value = true;
  } else {
    item = row as Question;

    summary = {} as Summary;
    dialogVisible.value = true;
  }
};
const handleDelete = (row: Question) => {
  const idx = questionList.value.findIndex((q) => q.id === row.id);
  questionList.value.splice(idx, 1);
};

const handleConfirm = () => {
  //id 不能重复，通过id强制替换
  if (curr) {
    let target = questionList.value.find((q) => q.id === curr.id) as Question;
    if (target) {
      target = curr;
      curr = null;
    }
  } else {
    questionList.value.push(item);
  }

  item = {} as Question;

  dialogVisible.value = false;
  // summaryDialogVisible.value = false;
};

const handleSummaryConfirm = () => {
  //id 不能重复，通过id强制替换
  if (curr) {
    let target = questionList.value.find((q) => q.id === curr.id) as Summary;
    if (target) {
      target = curr;
      curr = null;
    }
  } else {
    questionList.value.push(summary);
  }

  summary = {} as Summary;

  summaryDialogVisible.value = false;
};

const handleCreate = () => {
  popupTitle.value = "创建问题";

  item = reactive<Question>({
    id: "",
    tagline: "",
    title: "",
    required: true,
    type: "text",
    keepAlive: false,
    multiple: false,
    allowOther: false,
    helpTextShow: false,
    options: [{ label: "", value: "" }],
  });
  dialogVisible.value = true;
};

const handleSummaryCreate = () => {
  popupTitle.value = "创建问题";

  summaryDialogVisible.value = true;

  summary = reactive<Summary>({
    id: "__complete",
    title: "",
    subtitle: "",
    description: "",
    showSubmit: false,
  });
};
</script>

<template>
  <!-- <h1>多步表单配置模块</h1>
  <h2>拖动排序</h2> -->
  <el-descriptions title="多步表单配置模块">
    <el-descriptions-item label="表格内容：使用说明"
      >表格可以直接拖动排序</el-descriptions-item
    >
    <el-descriptions-item label="工具栏：创建普通问题/创建结束问题"
      >普通问题可以创建多个，结束问题只能创建一个</el-descriptions-item
    >
  </el-descriptions>
  <div>
    <div class="toolbar">
      <el-button type="primary" @click="handleCreate">创建普通问题</el-button>
      <el-button
        type="primary"
        @click="handleSummaryCreate"
        :disabled="hasSummary"
        >创建最后问题</el-button
      >
      <el-button type="primary" @click="jsonResultDialogVisible = true"
        >查看JSON结果</el-button
      >
    </div>
    <div>
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col" style="width: 180px">ID</th>
            <th scope="col" style="width: calc(100% - 360px)">标题</th>
            <th scope="col" style="width: 180px">操作</th>
          </tr>
        </thead>
        <draggable
          v-model="questionList"
          tag="tbody"
          @start="drag = true"
          @end="drag = false"
          item-key="id"
        >
          <template #item="{ element }">
            <tr>
              <td scope="row">{{ element.id }}</td>
              <td>{{ element.title }}</td>
              <td>
                <el-button size="small" @click="handleEdit(element)"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(element)"
                  >删除</el-button
                >
              </td>
            </tr>
          </template>
        </draggable>
        <tfoot v-if="questionList.length === 0">
          <td colspan="3" style="text-align: center">没有数据</td>
        </tfoot>
      </table>
    </div>
  </div>

  <div v-if="dialogVisible">
    <el-dialog
      v-model="dialogVisible"
      :align-center="true"
      :title="popupTitle"
      width="95%"
    >
      <div class="popup-body">
        <el-form :model="item" label-width="120px">
          <el-form-item label="ID">
            <el-input
              v-model="item.id"
              placeholder="问题ID，唯一标识，用来简要描述问题标题"
            />
          </el-form-item>
          <el-form-item label="欢迎语">
            <el-input
              v-model="item.tagline"
              placeholder="请输入欢迎语内容，注意：只对第一个问题生效"
            />
          </el-form-item>
          <el-form-item label="标题内容">
            <el-input v-model="item.title" placeholder="标题" />
          </el-form-item>

          <el-form-item label="问题类型">
            <el-select v-model="item.type" placeholder="选择问题类型">
              <el-option
                v-for="item in questionTypes"
                :key="item.name"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <template v-if="!!item.type">
            <template v-if="item.type.includes('choice')">
              <template v-if="item.options">
                <SelectOptions
                  :options="item.options"
                  :type="item.type"
                ></SelectOptions>
              </template>
              <el-form-item label="是否多选">
                <el-switch v-model="item.multiple" />
              </el-form-item>
              <el-form-item label="添加其它选项">
                <el-switch v-model="item.allowOther" />
              </el-form-item>
            </template>
            <el-form-item label="是否必填">
              <el-switch v-model="item.required" />
            </el-form-item>
            <el-form-item label="设为标签">
              <el-switch v-model="item.tag" />
            </el-form-item>
            <el-form-item label="是否显示提示">
              <el-switch v-model="item.helpTextShow" />
            </el-form-item>
            <el-form-item label="Keepalive">
              <el-switch v-model="item.keepAlive" />
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>

  <div v-if="summaryDialogVisible">
    <el-dialog
      v-model="summaryDialogVisible"
      :align-center="true"
      :title="popupTitle"
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
          <el-button @click="summaryDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSummaryConfirm">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>

  <div v-if="jsonResultDialogVisible">
    <el-dialog
      v-model="jsonResultDialogVisible"
      :align-center="true"
      title="JSON结果"
      width="95%"
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
.toolbar {
  display: flex;
  justify-content: right;
  border-bottom: 1px dashed var(--el-border-color);
  margin-bottom: 10px;
  padding: 10px;
}

.popup-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.popup-body {
  max-height: 450px;
  overflow-y: auto;
}
</style>
