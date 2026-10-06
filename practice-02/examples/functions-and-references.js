// Эксперимент 1: Вызов sum с числами и со строкой
function sum(a, b) {
  return a + b;
}

console.log("Эксперимент 1:");
console.log("sum(2, 3) =", sum(2, 3));
console.log("sum('2', 3) =", sum('2', 3));
console.log("Тип sum(2, 3):", typeof sum(2, 3));
console.log("Тип sum('2', 3):", typeof sum('2', 3));

// Эксперимент 2: Стрелочная функция с телом в фигурных скобках (ИСПРАВЛЕНО: добавлен return)
const square = (value) => {
  return value * value;
};

console.log("\nЭксперимент 2:");
console.log("square(4) =", square(4));
console.log("Тип square(4):", typeof square(4));

// Эксперимент 3: Присваивание объекта второй переменной
const original = { title: "Черновик", published: false };
const alias = original;

alias.published = true;

console.log("\nЭксперимент 3:");
console.log("original.published =", original.published);
console.log("original === alias:", original === alias);

// Эксперимент 4: Копирование массива объектов через spread
const items = [{ id: 1, name: "Первый" }, { id: 2, name: "Второй" }];
const itemsCopy = [...items];

itemsCopy[0].name = "Изменённый первый";

console.log("\nЭксперимент 4:");
console.log("items[0].name =", items[0].name);
console.log("itemsCopy[0].name =", itemsCopy[0].name);
console.log("items === itemsCopy:", items === itemsCopy);
console.log("items[0] === itemsCopy[0]:", items[0] === itemsCopy[0]);

// Эксперимент 5: Spread объекта и повторное указание свойства
const oldBook = { id: 12, title: "Черновик", available: false };
const newBook1 = { ...oldBook, available: true };
const newBook2 = { available: true, ...oldBook };

console.log("\nЭксперимент 5:");
console.log("newBook1.available =", newBook1.available);
console.log("newBook2.available =", newBook2.available);
console.log("oldBook.available =", oldBook.available);

// Эксперимент 6: Параметр по умолчанию
function makeCaption(text = "Без названия") {
  return text;
}

console.log("\nЭксперимент 6:");
console.log('makeCaption() =', makeCaption());
console.log('makeCaption(undefined) =', makeCaption(undefined));
console.log('makeCaption(null) =', makeCaption(null));
console.log('makeCaption("") =', makeCaption(""));
