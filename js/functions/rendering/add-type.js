'use strict';

/* Логи */
export let logs = true; // true - выводим логи, false - не выводим логи

import { addElement } from './add-element.js'; // Импортируем функцию добавления элементов
import { addData } from './add-data.js'; // Импортируем функцию добавления данных
import { allCosts, allCommissions, allFees } from '../../../script.js';

export function addType(place, type, objects) { // Добавить тип: где, тип - строка, объекты из массива
    if (logs) {console.log('addType: ' + type);} // Логи добавления типа
    objects.forEach(object => { // Для каждого объекта массива
        if (logs) {console.log(object);} // Логи объекта массива
        const newObject = addElement(place, 'div', [type, type + '_type_' + object.type, 'mb-3']); // Добавляем новый элемент
        const newObjectData = addData(newObject, type, object.type, object); // Добавляем данные в этот элемент
        switch (type) {
            case 'cost':
                allCosts.push(newObject);
            break;
            case 'commission':
                allCommissions.push(newObject);
            break;
            case 'fee':
                allFees.push(newObject);
            break;
            default:
                console.warn('Неизвестный тип объекта')
        }
    });
}