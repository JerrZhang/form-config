export interface AnswerOption {
  label: string;
  value: string;
  imageSrc?: string;
}

export interface Content {
  id: string;
  title: string;
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

// const item = reactive({
//     id: "Shoes Type",
//     tagline:
//       "Thank you for participating in this survey and it may cost 1-2 minutes. The information you fill in is used to create more comfortable products for you.",
//     title: "Q1: What type of shoes do you typically wear in spring and summer?",
//     required: true,
//     type: "choice",
//     keepAlive: false,
//     multiple: false,
//     allowOther: false,
//     helpTextShow: false,
//     options: [
//       { label: "Sandals", value: "Sandals" },
//       { label: "Flats", value: "Flats" },
//       { label: "Sneakers", value: "Sneakers" },
//       { label: "Loafers", value: "Loafers" },
//       { label: "Heels", value: "Heels" },
//     ],
//   });
