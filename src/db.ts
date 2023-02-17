import Dexie from "dexie";
import type { Table } from "dexie";
import type { Survey, SurveyItem } from "./components/types";

export interface Form {
  id?: number;
  content: string;
}

export class PtClientDB extends Dexie {
  survey!: Table<Survey>;
  surveyItem!: Table<SurveyItem>;

  constructor() {
    super("pt-client-db");
    this.version(1).stores({
      survey: "++id,name,description,createdAt",
      surveyItem: "++id,content,surveyId,createdAt",
    });
  }
}

export const db = new PtClientDB();
