"use strict";

const plannedText = "8";
const completedText = "3";
const additionalText = "2";

// ИСПРАВЛЕНИЕ 1: Явное преобразование строк в числа перед сложением
const completedTotal = Number(completedText) + Number(additionalText);
const remainingTasks = Number(plannedText) - completedTotal;

console.log("Выполнено:", completedTotal);
console.log("Осталось:", remainingTasks);

let controlSum = 0;

// ИСПРАВЛЕНИЕ 2: Граница цикла должна быть <= 4, чтобы включить число 4
for (let taskNumber = 1; taskNumber <= 4; taskNumber += 1) {
  controlSum += taskNumber;
}

console.log("Контрольная сумма:", controlSum);
