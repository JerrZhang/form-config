import Dexie from "dexie";
import type { Table } from "dexie";

export interface Form {
  id?: number;
  content: string;
}

export class PtClientDB extends Dexie {
  forms!: Table<Form>;

  constructor() {
    super("pt-form-db");
    this.version(1).stores({
      forms: "++id, content", // Primary key and indexed props
    });
  }
}

export const db = new PtClientDB();
