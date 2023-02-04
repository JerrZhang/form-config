import { ref } from "vue";

export const questionTypes = ref([
  {
    name: "文本",
    value: "text",
  },
  {
    name: "邮箱",
    value: "email",
  },
  {
    name: "选择",
    value: "choice",
  },
  {
    name: "图片选择",
    value: "picture-choice",
  },
]);
