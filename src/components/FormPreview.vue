<script lang="ts">
declare var window: any;
</script>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps<{ JsonResult: string; visible: boolean }>();
const emit = defineEmits(["close"]);

const formPreviewDialogVisible = ref(props.visible);

const domRef = ref();
const app = ref<{ unmount: () => void }>();

const data = {
  id: "03fa9de5-679b-4273-b282-0626dd798370",
  name: "pt-flow-form",
  bundleUrl:
    "https://ecstatic.ptengine.com/ecp/1b35d857-3f52-4d6e-911c-70e4a6062481/app/03fa9de5-679b-4273-b282-0626dd798370/0.1.0/bundle.js",
  config: {
    data: {
      language: "English",
      formData: props.JsonResult,
      baseFontSize: { unit: "px", value: "14" },
      tagFontSize: { unit: "em", value: "1" },
      tagColor: "#555",
      textFontSize: { unit: "em", value: "1.36" },
      textColor: "#181818",
      subFontSize: { unit: "em", value: "0.8" },
      subColor: "#999",
      answerFontSize: { unit: "em", value: "0.96" },
      completeTitleFontSize: { unit: "em", value: "1.6" },
      completeTitleColor: "#181818",
      completeSubtitleFontSize: { unit: "em", value: "1" },
      completeSubtitleColor: "#181818",
      completeDescriptionFontSize: { unit: "em", value: "1.2" },
      completeDescriptionColor: "#3B3B3B",
    },
    events: {},
  },
};

onMounted(() => {
  const mockAssetId = "" + Math.random();

  setTimeout(async () => {
    app.value = await window.__PT_COMPONENTS_RENDER__(
      domRef.value,
      mockAssetId,
      () => {
        return data;
      },
      false,
      true
    );
  }, 0);
});
onUnmounted(() => {
  app.value?.unmount();
});
</script>

<template>
  <el-dialog
    v-model="formPreviewDialogVisible"
    :align-center="true"
    title="表单预览"
    width="80%"
    @close="emit('close')"
  >
    <div class="render-container">
      <div ref="domRef"></div>
    </div>
  </el-dialog>
</template>

<style scoped>
.render-container {
  min-height: 300px;
}
</style>
