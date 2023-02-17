export interface AnswerOption {
  label: string;
  value: string;
  imageSrc?: string;
}

export interface Content {
  id: string;
  title: string;
  [key: string]: any;
}

export interface Question extends Content {
  tagline?: string;
  required?: boolean;
  type: string;
  keepAlive?: boolean;
  multiple?: boolean;
  allowOther?: boolean;
  helpTextShow?: boolean;
  tag?: boolean;
  options?: Array<AnswerOption>;
}

export interface Summary extends Content {
  subtitle?: string;
  description?: string;
  showSubmit: boolean;
}

export interface Survey {
  id?: number;
  name: string;
  description?: string;
  updatedAt?: number;
  createdAt?: number;
}

export interface SurveyItem {
  id?: number;
  content: string;
  surveyId: string;
  createdAt: number;
  updatedAt?: number;
}
