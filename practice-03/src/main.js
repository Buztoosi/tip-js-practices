import { demoTasks, variantTasks } from "./data.js";
import {
  findTaskById,
  setTaskCompleted,
  removeTask
} from "./task-service.js";
import { getVisibleTasks } from "./task-selectors.js";
import {
  renderTaskList,
  renderSummary,
  renderEmptyState
} from "./task-view.js";

// Определение начального набора данных
const params = new URLSearchParams(window.location.search);
const dataset = params.get("dataset");
const initialTasks = dataset === "variant" ? variantTasks : demoTasks;

let currentTasks = initialTasks.map((task) => ({ ...task }));
let currentFilter = "all";

const taskListElement = document.querySelector("#task-list");
const summaryElement = document.querySelector("#task-summary");
const emptyMessageElement = document.querySelector("#empty-message");
const operationMessageElement = document.querySelector("#operation-message");
const filterContainer = document.querySelector("#task-filters");

function renderApp() {
  const visibleTasks = getVisibleTasks(currentTasks, currentFilter);
  
  renderTaskList(taskListElement, visibleTasks);
  renderSummary(summaryElement, currentTasks, visibleTasks.length);
  renderEmptyState(emptyMessageElement, currentTasks.length, visibleTasks.length);
}

function restoreTaskFocus(id, action) {
  const card = document.querySelector(`li[data-task-id="${id}"]`);
  if (card) {
    const button = card.querySelector(`button[data-action="${action}"]`);
    if (button) {
      button.focus();
      return;
    }
  }
  const activeFilter = filterContainer.querySelector("button.is-active");
  if (activeFilter) activeFilter.focus();
}

function handleTaskListClick(event) {
  if (!(event.target instanceof Element)) return;

  const button = event.target.closest("button[data-action]");
  if (!button || !taskListElement.contains(button)) return;

  const action = button.dataset.action;
  if (action !== "toggle" && action !== "delete") return;

  const card = button.closest("li[data-task-id]");
  if (!card) return;

  const idStr = card.dataset.taskId;
  const id = Number(idStr);
  
  if (!Number.isSafeInteger(id) || id <= 0) {
    operationMessageElement.textContent = "Некорректный идентификатор задачи";
    return;
  }

  const task = findTaskById(currentTasks, id);
  if (!task) {
    operationMessageElement.textContent = "Задача не найдена";
    return;
  }

  let result;
  if (action === "toggle") {
    result = setTaskCompleted(currentTasks, id, !task.completed);
  } else if (action === "delete") {
    result = removeTask(currentTasks, id);
  }

  if (result.ok) {
    currentTasks = result.tasks;
    operationMessageElement.textContent = "";
    renderApp();
    restoreTaskFocus(id, action);
  } else {
    operationMessageElement.textContent = `Ошибка: ${result.error}`;
  }
}

function handleFilterClick(event) {
  if (!(event.target instanceof Element)) return;

  const button = event.target.closest("button[data-filter]");
  if (!button || !filterContainer.contains(button)) return;

  const filter = button.dataset.filter;
  if (filter !== "all" && filter !== "pending" && filter !== "completed") return;

  currentFilter = filter;
  
  const buttons = filterContainer.querySelectorAll("button");
  buttons.forEach(btn => {
    const isActive = btn.dataset.filter === filter;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  operationMessageElement.textContent = "";
  renderApp();
}

taskListElement.addEventListener("click", handleTaskListClick);
filterContainer.addEventListener("click", handleFilterClick);

renderApp();
