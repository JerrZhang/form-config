<script lang="ts" setup>
const releaseNotes = [
  {
    timeline: "2023/3/07",
    content: "条件配置支持下拉选择",
    author: "shanpeng.zhang@ptmind.com",
  },
  {
    timeline: "2023/2/18",
    content: "支持配置跳转条件",
    author: "shanpeng.zhang@ptmind.com",
  },
  {
    timeline: "2023/2/17",
    content: "增加调研管理模块;优化选项配置;增加分页",
    author: "shanpeng.zhang@ptmind.com",
  },
  {
    timeline: "2023/2/11",
    content: "支持本地更新;支持预览",
    author: "shanpeng.zhang@ptmind.com",
  },
  {
    timeline: "2023/2/4",
    content: "mvp版本上线，支持配置到处",
    author: "shanpeng.zhang@ptmind.com",
  },
  {
    timeline: "2023/2/1",
    content: "项目mvp规划",
    author: "wei.zhang@ptmind.com",
  },
];
</script>

<template>
  <h1 style="padding-left: 40px; padding-bottom: 40px">更新日志</h1>
  <el-timeline>
    <el-timeline-item
      center
      v-for="(item, index) in releaseNotes"
      :key="index"
      :timeline="item.timeline"
      placement="top"
    >
      <el-card>
        <h4>update:{{ item.content }}</h4>
        <p>author:{{ item.author }}</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>
