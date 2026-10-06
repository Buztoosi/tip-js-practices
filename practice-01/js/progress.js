"use strict";

const totalTasks = 12;
const completedTasks = 5;

// 1. Проверка типов и значений
const isTotalValid = typeof totalTasks === "number" && Number.isInteger(totalTasks) && Number.isFinite(totalTasks) && totalTasks >= 0 && totalTasks <= 1000;
const isCompletedValid = typeof completedTasks === "number" && Number.isInteger(completedTasks) && Number.isFinite(completedTasks) && completedTasks >= 0 && completedTasks <= totalTasks;

if (!isTotalValid) {
  console.log("Ошибка: некорректное общее количество задач.");
} else if (!isCompletedValid) {
  console.log("Ошибка: некорректное количество выполненных задач.");
} else if (totalTasks === 0 && completedTasks === 0) {
  console.log("Задач пока нет");
} else {
  const remaining = totalTasks - completedTasks;
  const progress = (completedTasks / totalTasks * 100).toFixed(1);
  
  let status = "В работе";
  if (completedTasks === 0) {
    status = "Не начато";
  } else if (completedTasks === totalTasks) {
    status = "Завершено";
  }

  console.log(`Всего задач: ${totalTasks}`);
  console.log(`Выполнено: ${completedTasks}`);
  console.log(`Осталось: ${remaining}`);
  console.log(`Прогресс: ${progress}%`);
  console.log(`Статус: ${status}`);
}
