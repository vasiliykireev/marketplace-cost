'use strict';

/* Логи */
export let logs = true; // true - выводим логи, false - не выводим логи

import { addElement } from "../elements/add-element.js"; // Импортируем функцию добавления элементов
import { addData } from "./add-data.js"; // Импортируем функцию добавления данных

export function addType(place, type, objects) { // Функция добавления типа с указанием места добавления, типа и объектов массива
    if (logs) {console.log("addType: " + type);} // Логи добавления типа
    objects.forEach(object => { // Для каждого объекта массива
        if (logs) {console.log(object);} // Логи объекта массива
        const newObject = addElement(place, "div", [type, type + "_type_" + object.type, "mb-3"]); // Добавляем новый элемент
        const newObjectData = addData(newObject, type, object.type, object); // Добавляем данные в этот элемент
    });
}