import { demoTasks } from "./data.js";
import {
  findTaskById,
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask
} from "./task-service.js";

let currentTasks = demoTasks;

console.log("=== ИСХОДНЫЙ НАБОР ===");
console.log("Задачи:", currentTasks);
const stats0 = getTaskStats(currentTasks);
console.log(`Сводка: всего ${stats0.total}, выполнено ${stats0.completed}, осталось ${stats0.pending}, прогресс ${stats0.progress.toFixed(1)}%`);

console.log("\n=== 1. ДОБАВЛЕНИЕ id=20 ===");
const addResult = addTask(currentTasks, 20, "Добавить проверку", "high");
if (addResult.ok) {
  currentTasks = addResult.tasks;
  console.log("Добавлено. Всего задач:", currentTasks.length);
} else {
  console.error("Ошибка:", addResult.error);
}
const stats1 = getTaskStats(currentTasks);
console.log(`Сводка: всего ${stats1.total}, выполнено ${stats1.completed}, осталось ${stats1.pending}, прогресс ${stats1.progress.toFixed(1)}%`);

console.log("\n=== 2. ВЫПОЛНЕНИЕ id=4 ===");
const completeResult = setTaskCompleted(currentTasks, 4, true);
if (completeResult.ok) {
  currentTasks = completeResult.tasks;
  console.log("Статус изменён.");
} else {
  console.error("Ошибка:", completeResult.error);
}
const stats2 = getTaskStats(currentTasks);
console.log(`Сводка: всего ${stats2.total}, выполнено ${stats2.completed}, осталось ${stats2.pending}, прогресс ${stats2.progress.toFixed(1)}%`);

console.log("\n=== 3. ПЕРЕИМЕНОВАНИЕ id=10 ===");
const renameResult = renameTask(currentTasks, 10, "Подготовить инструкцию запуска");
if (renameResult.ok) {
  currentTasks = renameResult.tasks;
  console.log("Переименовано.");
} else {
  console.error("Ошибка:", renameResult.error);
}
const stats3 = getTaskStats(currentTasks);
console.log(`Сводка: всего ${stats3.total}, выполнено ${stats3.completed}, осталось ${stats3.pending}, прогресс ${stats3.progress.toFixed(1)}%`);

console.log("\n=== 4. УДАЛЕНИЕ id=7 ===");
const removeResult = removeTask(currentTasks, 7);
if (removeResult.ok) {
  currentTasks = removeResult.tasks;
  console.log("Удалено. Идентификаторы:", currentTasks.map(t => t.id));
} else {
  console.error("Ошибка:", removeResult.error);
}
const stats4 = getTaskStats(currentTasks);
console.log(`Сводка: всего ${stats4.total}, выполнено ${stats4.completed}, осталось ${stats4.pending}, прогресс ${stats4.progress.toFixed(1)}%`);

console.log("\n=== 5. ОБРАБОТКА ОТКАЗА (повторное добавление id=20) ===");
const duplicateResult = addTask(currentTasks, 20, "Дубликат", "low");
if (duplicateResult.ok) {
  console.log("Неожиданно: добавлено.");
} else {
  console.log("Отказ корректен:", duplicateResult.error);
  console.log("Количество задач не изменилось:", currentTasks.length);
}

console.log("\n=== 6. ПРОВЕРКА СОХРАННОСТИ ИСХОДНОГО НАБОРА ===");
console.log("demoTasks[0].title:", demoTasks[0].title);
console.log("demoTasks.length:", demoTasks.length);
console.log("Исходный набор не изменён:", demoTasks.length === 4 && demoTasks[0].title === "Изучить функции");

console.log("\n=== ИТОГОВЫЙ НАБОР ===");
console.log("Идентификаторы:", currentTasks.map(t => t.id));
console.log("Невыполненные задачи:", getPendingTasks(currentTasks).map(t => t.id));

console.log("\n\n========================================");
console.log("=== ИНДИВИДУАЛЬНЫЙ ВАРИАНТ (Вариант 4) ===");
console.log("========================================\n");

import { variantTasks, variantNumber } from "./data.js";

let variantCurrent = variantTasks;

console.log("=== ИСХОДНЫЙ НАБОР ВАРИАНТА ===");
console.log("Номер варианта:", variantNumber);
console.log("Задачи:", variantCurrent);
const vStats0 = getTaskStats(variantCurrent);
console.log(`Сводка: всего ${vStats0.total}, выполнено ${vStats0.completed}, осталось ${vStats0.pending}, прогресс ${vStats0.progress.toFixed(1)}%`);

console.log("\n=== 1. ДОБАВЛЕНИЕ id=80 ===");
const vAddResult = addTask(variantCurrent, 80, "Провести репетицию семинара", "high");
if (vAddResult.ok) {
  variantCurrent = vAddResult.tasks;
  console.log("Добавлено. Всего задач:", variantCurrent.length);
} else {
  console.error("Ошибка:", vAddResult.error);
}
const vStats1 = getTaskStats(variantCurrent);
console.log(`Сводка: всего ${vStats1.total}, выполнено ${vStats1.completed}, осталось ${vStats1.pending}, прогресс ${vStats1.progress.toFixed(1)}%`);

console.log("\n=== 2. ВЫПОЛНЕНИЕ id=11 ===");
const vCompleteResult = setTaskCompleted(variantCurrent, 11, true);
if (vCompleteResult.ok) {
  variantCurrent = vCompleteResult.tasks;
  console.log("Статус изменён (уже был выполнен, но операция успешна).");
} else {
  console.error("Ошибка:", vCompleteResult.error);
}
const vStats2 = getTaskStats(variantCurrent);
console.log(`Сводка: всего ${vStats2.total}, выполнено ${vStats2.completed}, осталось ${vStats2.pending}, прогресс ${vStats2.progress.toFixed(1)}%`);

console.log("\n=== 3. ПЕРЕИМЕНОВАНИЕ id=23 ===");
const vRenameResult = renameTask(variantCurrent, 23, "Обновить презентацию с новыми данными");
if (vRenameResult.ok) {
  variantCurrent = vRenameResult.tasks;
  console.log("Переименовано.");
} else {
  console.error("Ошибка:", vRenameResult.error);
}
const vStats3 = getTaskStats(variantCurrent);
console.log(`Сводка: всего ${vStats3.total}, выполнено ${vStats3.completed}, осталось ${vStats3.pending}, прогресс ${vStats3.progress.toFixed(1)}%`);

console.log("\n=== 4. УДАЛЕНИЕ id=37 ===");
const vRemoveResult = removeTask(variantCurrent, 37);
if (vRemoveResult.ok) {
  variantCurrent = vRemoveResult.tasks;
  console.log("Удалено. Идентификаторы:", variantCurrent.map(t => t.id));
} else {
  console.error("Ошибка:", vRemoveResult.error);
}
const vStats4 = getTaskStats(variantCurrent);
console.log(`Сводка: всего ${vStats4.total}, выполнено ${vStats4.completed}, осталось ${vStats4.pending}, прогресс ${vStats4.progress.toFixed(1)}%`);

console.log("\n=== 5. ОБРАБОТКА ОТКАЗА (повторное добавление id=80) ===");
const vDuplicateResult = addTask(variantCurrent, 80, "Дубликат", "low");
if (vDuplicateResult.ok) {
  console.log("Неожиданно: добавлено.");
} else {
  console.log("Отказ корректен:", vDuplicateResult.error);
  console.log("Количество задач не изменилось:", variantCurrent.length);
}

console.log("\n=== 6. ПРОВЕРКА СОХРАННОСТИ ИСХОДНОГО НАБОРА ===");
console.log("variantTasks[0].title:", variantTasks[0].title);
console.log("variantTasks.length:", variantTasks.length);
console.log("Исходный набор не изменён:", variantTasks.length === 6 && variantTasks[0].title === "Составить план семинара");

console.log("\n=== ИТОГОВЫЙ НАБОР ВАРИАНТА ===");
console.log("Идентификаторы:", variantCurrent.map(t => t.id));
console.log("Невыполненные задачи:", getPendingTasks(variantCurrent).map(t => t.id));
const vFinalStats = getTaskStats(variantCurrent);
console.log(`Итоговая сводка: всего ${vFinalStats.total}, выполнено ${vFinalStats.completed}, осталось ${vFinalStats.pending}, прогресс ${vFinalStats.progress.toFixed(1)}%`);
