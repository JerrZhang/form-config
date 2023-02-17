import { createRouter, createWebHistory } from "vue-router";

import SurveyItem from "@/components/SurveyItem.vue";
import SurveyList from "@/components/SurveyList.vue";
import Dashboard from "@/components/Dashboard.vue";

const routes = [
  {
    path: "/",
    name: "root",
    component: Dashboard,
  },
  {
    path: "/survey/:id",
    name: "survey",
    component: SurveyItem,
  },
  {
    path: "/list",
    name: "list",
    component: SurveyList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
