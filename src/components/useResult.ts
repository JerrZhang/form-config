import { ref } from "vue";

export function useResult() {
  const jsonResult = ref(false);
  const previewResult = ref(false);

  return {
    jsonResult,
    previewResult,
    setJsonResult,
    setPreviewResult,
  };

  function setJsonResult(result: boolean) {
    jsonResult.value = result;
  }

  function setPreviewResult(result: boolean) {
    previewResult.value = result;
  }
}
