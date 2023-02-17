<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const currRouteName = ref(route.name);

watch(
  () => route.name,
  () => {
    currRouteName.value = route.name;
  }
);
</script>

<template>
  <div class="layout">
    <div class="left">
      <el-menu class="el-menu-vertical" :default-active="currRouteName">
        <div class="logo">
          <el-icon size="40" color="#EBEDF0"><Ship /></el-icon>
          <span>调研辅助助手</span>
          <el-tag>0.0.2-beta</el-tag>
        </div>

        <el-menu-item index="root">
          <router-link class="menu-link" to="/"
            ><el-icon><Sunny /></el-icon>更新日志</router-link
          >
        </el-menu-item>

        <el-menu-item index="list">
          <router-link class="menu-link" to="/list"
            ><el-icon><EditPen /></el-icon>我的调研</router-link
          >
        </el-menu-item>
      </el-menu>
    </div>
    <div class="center">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.el-menu-vertical {
  height: 100%;
}

.menu-link {
  width: 100%;
  padding-left: calc(
    var(--el-menu-base-level-padding) + var(--el-menu-level) *
      var(--el-menu-level-padding)
  );

  color: var(--el-color-success);
}

.el-menu-item {
  padding: 0;
  padding-left: 0 !important;
}

.is-active {
  background-color: #e6e8eb;
}

.logo {
  height: 80px;
  padding-left: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.img {
  height: 60px;
}

.left {
  width: 260px;
  box-sizing: border-box;
}

.center {
  box-sizing: border-box;
  width: calc(100% - 260px);
  padding: 2em;
}
</style>
