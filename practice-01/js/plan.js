"use strict";

const totalTasks = 12;
const completedTasks = 5;
const dailyLimit = 3;

// 1. Проверка задач (как в задании 3)
const isTotalValid = typeof totalTasks === "number" && Number.isInteger(totalTasks) && Number.isFinite(totalTasks) && totalTasks >= 0 && totalTasks <= 1000;
const isCompletedValid = typeof completedTasks === "number" && Number.isInteger(completedTasks) && Number.isFinite(completedTasks) && completedTasks >= 0 && completedTasks <= totalTasks;

// 2. Проверка дневного лимита
const isLimitValid = typeof dailyLimit === "number" && Number.isInteger(dailyLimit) && Number.isFinite(dailyLimit) && dailyLimit >= 1 && dailyLimit <= 1000;

if (!isTotalValid || !isCompletedValid) {
  console.log("Ошибка: некорректные данные о задачах.");
} else if (!isLimitValid) {
  console.log("Ошибка: некорректный дневной лимит.");
} else {
  let remaining = totalTasks - completedTasks;
  
  if (remaining === 0) {
    console.log("Все задачи уже выполнены.");
    console.log("Потребуется дней: 0");
  } else {
    console.log(`Осталось задач: ${remaining}`);
    let day = 1;
    
    while (remaining > 0) {
      const todayDone = Math.min(dailyLimit, remaining);
      remaining -= todayDone;
      console.log(`День ${day}: выполнено ${todayDone}, осталось ${remaining}`);
      day += 1;
    }
    
    console.log(`Потребуется дней: ${day - 1}`);
  }
}
