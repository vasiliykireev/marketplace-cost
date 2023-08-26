"use strict";

export function saveName(name, place, removeElement) { // Функция сохранения названия с переданными названием, местом и элементом для удаления
    costs.push({
        "name": name,
        "type": "fix",
        "value": ""
    })
    showCost(costs[Number(costs.length - 1)], Number(costs.length - 1));
    //place.append(name); // Размещаем название
    removeElement.remove(); // Удаляем элемент для удаления
}