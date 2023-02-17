import { ref } from "vue";
import { db } from "../db";
import type { Survey } from "./types";

import { useQuestion } from "./useQuestion";

const question = useQuestion();

export function useSurvey(initList: Array<Survey>) {
  const surveyVisible = ref(false);
  const surveyList = ref<Array<Survey>>(initList);

  const pageNumber = ref(1);
  const pageSize = ref(10);
  const total = ref(0);

  return {
    remove,
    save,
    find,
    total,
    surveyVisible,
    surveyList,
    pageNumber,
    pageSize,
  };

  async function remove(id: string) {
    const items = await question.find(id);

    if (items.length > 0) {
      items.forEach((q) => question.remove(q.id as number));
    }
    await db.survey.delete(id);
  }

  function save(survey: Survey) {
    survey.updatedAt = Date.now();
    if (survey.id) {
      db.survey.update(survey.id, survey);
    } else {
      survey.createdAt = Date.now();
      db.survey.add(survey);
    }
  }

  async function find(pageSize = 10, pageNumber = 1) {
    total.value = await db.survey.count();

    return db.survey
      .orderBy("createdAt")
      .reverse()
      .offset((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();
  }
}
