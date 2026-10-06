import assert from 'node:assert/strict';
import {
  createTask, findTaskById, getPendingTasks, getTaskTitles, getTaskStats,
  addTask, setTaskCompleted, renameTask, removeTask
} from '../src/task-service.js';
import { demoTasks } from '../src/data.js';

let passed = 0;
let failed = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`OK: ${name}`);
    passed++;
  } catch (e) {
    console.log(`FAIL: ${name} - ${e.message}`);
    failed++;
  }
}

// --- Задание 2: createTask ---
runTest("createTask: успешное создание", () => {
  const res = createTask(99, "Тест", "low");
  assert.equal(res.ok, true);
  assert.equal(res.task.id, 99);
  assert.equal(res.task.completed, false);
  assert.equal(res.task.priority, "low");
});

runTest("createTask: приоритет по умолчанию", () => {
  const res = createTask(98, "Тест");
  assert.equal(res.task.priority, "medium");
});

runTest("createTask: trim пробелов", () => {
  const res = createTask(97, "  Пробелы  ");
  assert.equal(res.task.title, "Пробелы");
});

runTest("createTask: ошибка пустого названия", () => {
  const res = createTask(96, "   ");
  assert.equal(res.ok, false);
});

runTest("createTask: ошибка некорректного id (строка)", () => {
  const res = createTask("1", "Тест");
  assert.equal(res.ok, false);
});

runTest("createTask: ошибка некорректного приоритета", () => {
  const res = createTask(95, "Тест", "urgent");
  assert.equal(res.ok, false);
});

// --- Задание 3: Чтение ---
runTest("findTaskById: поиск существующего", () => {
  const task = findTaskById(demoTasks, 4);
  assert.equal(task.title, "Подготовить модель задач");
});

runTest("findTaskById: поиск несуществующего", () => {
  const task = findTaskById(demoTasks, 777);
  assert.equal(task, undefined);
});

runTest("getPendingTasks: фильтрация", () => {
  const pending = getPendingTasks(demoTasks);
  assert.equal(pending.length, 2);
  assert.equal(pending[0].id, 4);
});

runTest("getTaskTitles: маппинг", () => {
  const titles = getTaskTitles(demoTasks);
  assert.deepEqual(titles, ["Изучить функции", "Подготовить модель задач", "Проверить методы массивов", "Оформить README"]);
});

runTest("getTaskStats: сводка demoTasks", () => {
  const stats = getTaskStats(demoTasks);
  assert.deepEqual(stats, { total: 4, completed: 2, pending: 2, progress: 50 });
});

runTest("getTaskStats: пустой список", () => {
  const stats = getTaskStats([]);
  assert.deepEqual(stats, { total: 0, completed: 0, pending: 0, progress: 0 });
});

// --- Задание 4: Изменение ---
runTest("addTask: успешное добавление", () => {
  const res = addTask(demoTasks, 20, "Новая", "high");
  assert.equal(res.ok, true);
  assert.equal(res.tasks.length, 5);
  assert.equal(res.tasks[4].id, 20);
});

runTest("addTask: дубликат id", () => {
  const res = addTask(demoTasks, 1, "Дубликат");
  assert.equal(res.ok, false);
});

runTest("setTaskCompleted: изменение статуса", () => {
  const res = setTaskCompleted(demoTasks, 1, false);
  assert.equal(res.ok, true);
  assert.equal(res.tasks.find(t => t.id === 1).completed, false);
});

runTest("setTaskCompleted: некорректный статус (строка)", () => {
  const res = setTaskCompleted(demoTasks, 1, "true");
  assert.equal(res.ok, false);
});

runTest("renameTask: переименование", () => {
  const res = renameTask(demoTasks, 10, "Новое имя");
  assert.equal(res.ok, true);
  assert.equal(res.tasks.find(t => t.id === 10).title, "Новое имя");
});

runTest("removeTask: удаление", () => {
  const res = removeTask(demoTasks, 7);
  assert.equal(res.ok, true);
  assert.equal(res.tasks.length, 3);
  assert.equal(res.tasks.find(t => t.id === 7), undefined);
});

// --- Проверка неизменности (Immutability) ---
runTest("Immutability: исходный массив не меняется", () => {
  const originalLength = demoTasks.length;
  const originalTitle = demoTasks[0].title;
  
  addTask(demoTasks, 999, "Тест");
  setTaskCompleted(demoTasks, 1, false);
  renameTask(demoTasks, 1, "Изменено");
  removeTask(demoTasks, 1);

  assert.equal(demoTasks.length, originalLength);
  assert.equal(demoTasks[0].title, originalTitle);
  assert.equal(demoTasks[0].completed, true);
});

console.log(`\nИтого: пройдено ${passed}, провалено ${failed}`);
if (failed > 0) process.exit(1);
