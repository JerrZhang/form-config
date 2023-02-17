import { ref } from "vue";

import { db } from "../db";
import type { SurveyItem } from "./types";

export function useQuestion() {
  const questionVisible = ref(false);
  const summaryVisible = ref(false);

  return {
    find,
    findOne,
    save,
    remove,
    questionVisible,
    summaryVisible,
  };

  function find(surveyId: string) {
    return db.surveyItem.filter((item) => item.surveyId == surveyId).toArray();
  }

  function findOne(id: number) {
    return db.surveyItem.get({
      id,
    });
  }

  function save(surveyItem: SurveyItem) {
    surveyItem.id
      ? db.surveyItem.update(surveyItem.id, surveyItem)
      : db.surveyItem.add(surveyItem);
  }

  function remove(id: number) {
    return db.surveyItem.delete(id);
  }
}
