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
