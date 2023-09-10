'use strict';

/* Логи */
export let logs = true; // true - выводим логи, false - не выводим логи

import { addElement } from './add-element.js'; // Импортируем функцию добавления элементов
import { addData } from './add-data.js'; // Импортируем функцию добавления данных
import { displayCosts, displayCommissions, displayFees } from '../../../script.js';

export function addType(parent, type, objects) { // Добавить тип: где, тип - строка, объекты из массива
    if (logs) {console.log('addType: ' + type);} // Логи добавления типа
    objects.forEach(object => { // Для каждого объекта массива
        if (logs) {console.log(object);} // Логи объекта массива
        const displayTypeBlock = addElement(parent, 'div', [type, type + '_type_' + object.type, 'mb-3']); // Добавляем новый элемент
        const displayTypeElement = addData(displayTypeBlock, type, object); // Добавляем данные в этот элемент
        switch (type) {
            case 'cost':
                displayCosts.push(displayTypeBlock);
            break;
            case 'commission':
                displayCommissions.push(displayTypeBlock);
            break;
            case 'fee':
                displayFees.push(displayTypeBlock);
            break;
            default:
                console.warn('Неизвестный тип объекта')
        }
    });
}