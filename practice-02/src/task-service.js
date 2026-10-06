const VALID_PRIORITIES = ["low", "medium", "high"];

// Вспомогательная функция проверки id
function isValidId(id) {
  return typeof id === "number" && Number.isSafeInteger(id) && id > 0;
}

// Вспомогательная функция проверки названия
function validateTitle(title) {
  if (typeof title !== "string") {
    return { ok: false, error: "Название должно быть строкой" };
  }
  const cleanTitle = title.trim();
  if (cleanTitle.length < 1 || cleanTitle.length > 100) {
    return { ok: false, error: "Некорректная длина названия" };
  }
  return { ok: true, title: cleanTitle };
}

export function createTask(id, title, priority = "medium") {
  if (!isValidId(id)) {
    return { ok: false, error: "Некорректный идентификатор" };
  }
  const titleResult = validateTitle(title);
  if (!titleResult.ok) {
    return titleResult;
  }
  if (!VALID_PRIORITIES.includes(priority)) {
    return { ok: false, error: "Недопустимый приоритет" };
  }
  return {
    ok: true,
    task: { id, title: titleResult.title, completed: false, priority }
  };
}

export function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false);
}

export function getTaskTitles(tasks) {
  return tasks.map((task) => task.title);
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed === true).length;
  const pending = total - completed;
  const progress = total > 0 ? (completed / total) * 100 : 0;
  return { total, completed, pending, progress };
}

export function addTask(tasks, id, title, priority = "medium") {
  if (!isValidId(id)) {
    return { ok: false, error: "Некорректный идентификатор" };
  }
  if (findTaskById(tasks, id) !== undefined) {
    return { ok: false, error: "Задача с таким id уже существует" };
  }
  const createResult = createTask(id, title, priority);
  if (!createResult.ok) {
    return createResult;
  }
  return { ok: true, tasks: [...tasks, createResult.task] };
}

export function setTaskCompleted(tasks, id, completed) {
  if (!isValidId(id)) {
    return { ok: false, error: "Некорректный идентификатор" };
  }
  if (typeof completed !== "boolean") {
    return { ok: false, error: "Статус должен быть boolean" };
  }
  const task = findTaskById(tasks, id);
  if (task === undefined) {
    return { ok: false, error: "Задача не найдена" };
  }
  const newTask = { ...task, completed };
  const newTasks = tasks.map((t) => (t.id === id ? newTask : t));
  return { ok: true, tasks: newTasks };
}

export function renameTask(tasks, id, title) {
  if (!isValidId(id)) {
    return { ok: false, error: "Некорректный идентификатор" };
  }
  const titleResult = validateTitle(title);
  if (!titleResult.ok) {
    return titleResult;
  }
  const task = findTaskById(tasks, id);
  if (task === undefined) {
    return { ok: false, error: "Задача не найдена" };
  }
  const newTask = { ...task, title: titleResult.title };
  const newTasks = tasks.map((t) => (t.id === id ? newTask : t));
  return { ok: true, tasks: newTasks };
}

export function removeTask(tasks, id) {
  if (!isValidId(id)) {
    return { ok: false, error: "Некорректный идентификатор" };
  }
  const task = findTaskById(tasks, id);
  if (task === undefined) {
    return { ok: false, error: "Задача не найдена" };
  }
  const newTasks = tasks.filter((t) => t.id !== id);
  return { ok: true, tasks: newTasks };
}
