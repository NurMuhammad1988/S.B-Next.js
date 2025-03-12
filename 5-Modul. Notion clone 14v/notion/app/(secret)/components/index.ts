//bu index.ts (secret) papka ichidagi copmonents papka ichidagi faillarni loyiha bo'ylab export qilish uchun shunda bu index  (secret) papka ichidagi faillarni bir biriga export import qilish uchun qulay bo'ladi masalan bunday>>>import { Sidebar } from "./components"; agar shunday qilinmaganda               import { Sidebar } from "./app/(secret)/components/sidebar.tsx"; bo'lib ham uzun ham marshutlashda qiyinroq tushunarsizroq bo'lardi

import { Sidebar } from "./sidebar";

export { Sidebar };
