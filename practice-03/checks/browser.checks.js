   import { getVisibleTasks } from '../src/task-selectors.js';
   import { createTaskElement, renderTaskList, renderSummary, renderEmptyState } from '../src/task-view.js';
   import { demoTasks } from '../src/data.js';

   const resultsDiv = document.getElementById('results');
   let passed = 0;
   let failed = 0;
   let log = [];

   function runTest(name, fn) {
     try {
       fn();
       log.push(`✅ PASS: ${name}`);
       passed++;
     } catch (e) {
       log.push(`❌ FAIL: ${name} — ${e.message}`);
       failed++;
     }
   }

   runTest("getVisibleTasks: фильтр 'all'", () => {
     const res = getVisibleTasks(demoTasks, "all");
     if (res.length !== 4) throw new Error("Должно быть 4 задачи");
   });

   runTest("getVisibleTasks: фильтр 'pending'", () => {
     const res = getVisibleTasks(demoTasks, "pending");
     if (res.length !== 2 || res[0].id !== 4) throw new Error("Должно быть 2 задачи, первая с id=4");
   });

   runTest("getVisibleTasks: фильтр 'completed'", () => {
     const res = getVisibleTasks(demoTasks, "completed");
     if (res.length !== 2 || res[0].id !== 1) throw new Error("Должно быть 2 задачи, первая с id=1");
   });

   runTest("createTaskElement: структура DOM", () => {
     const task = { id: 99, title: "Тест <script>", completed: false, priority: "high" };
     const el = createTaskElement(task);
     if (el.tagName !== 'LI') throw new Error("Должен быть LI");
     if (!el.classList.contains('task-card')) throw new Error("Должен быть класс task-card");
     if (el.dataset.taskId !== "99") throw new Error("Неверный dataset.taskId");
     if (el.querySelector('.task-title').textContent !== "Тест <script>") throw new Error("title должен быть текстом, а не HTML");
     if (el.querySelector('.task-priority').textContent !== "Высокий") throw new Error("Неверный приоритет");
   });

   runTest("createTaskElement: выполненная задача", () => {
     const task = { id: 1, title: "Готово", completed: true, priority: "low" };
     const el = createTaskElement(task);
     if (!el.classList.contains('is-completed')) throw new Error("Должен быть класс is-completed");
     if (el.querySelector('button[data-action="toggle"]').getAttribute('aria-pressed') !== "true") throw new Error("aria-pressed должен быть true");
   });

   runTest("renderTaskList: отрисовка и очистка", () => {
     const ul = document.createElement('ul');
     ul.innerHTML = '<li>Старый элемент</li>';
     renderTaskList(ul, demoTasks.slice(0, 2));
     if (ul.children.length !== 2) throw new Error("Должно быть 2 элемента");
     renderTaskList(ul, []);
     if (ul.children.length !== 0) throw new Error("Список должен быть очищен");
   });

   runTest("renderSummary: корректный расчёт", () => {
     const div = document.createElement('div');
     div.innerHTML = `
       <span data-stat="total"></span>
       <span data-stat="completed"></span>
       <span data-stat="pending"></span>
       <span data-stat="progress"></span>
       <span data-stat="visible"></span>
     `;
     renderSummary(div, demoTasks, 3);
     if (div.querySelector('[data-stat="total"]').textContent !== "4") throw new Error("total должен быть 4");
     if (div.querySelector('[data-stat="progress"]').textContent !== "50.0%") throw new Error("progress должен быть 50.0%");
     if (div.querySelector('[data-stat="visible"]').textContent !== "3") throw new Error("visible должен быть 3");
   });

   runTest("renderEmptyState: полностью пустой список", () => {
     const p = document.createElement('p');
     renderEmptyState(p, 0, 0);
     if (p.textContent !== "Список задач пуст.") throw new Error("Неверное сообщение");
     if (p.hidden !== false) throw new Error("Элемент не должен быть скрыт");
   });

   runTest("renderEmptyState: нет совпадений по фильтру", () => {
     const p = document.createElement('p');
     renderEmptyState(p, 4, 0);
     if (p.textContent !== "Нет задач по выбранному фильтру.") throw new Error("Неверное сообщение");
   });

   runTest("renderEmptyState: есть задачи", () => {
     const p = document.createElement('p');
     renderEmptyState(p, 4, 2);
     if (p.hidden !== true) throw new Error("Элемент должен быть скрыт");
   });

   resultsDiv.innerHTML = log.join('\n') + `\n\n<strong>Всего: ${passed + failed}. Пройдено: ${passed}. Ошибок: ${failed}.</strong>`;
   if (failed > 0) {
     resultsDiv.innerHTML += '\n<span class="fail">Есть ошибки! Проверьте консоль.</span>';
   } else {
     resultsDiv.innerHTML += '\n<span class="pass">Все проверки пройдены успешно!</span>';
   }
