'use strict';

/* Логи */
let logs = false; // true - выводим логи, false - не выводим логи
if (logs) {console.log('add-type.js')};

/* Импорт */
/* Данные */
import { displayCosts, displayCommissions, displayFees } from '../../../script.js'; // Массивы для отображения расходов, комиссий и тарифов 
/* Функции */
import { addElement } from './add-element.js'; // Добавление элементов
import { addData } from './add-data.js'; // Добавление элемента

/* Отображение типа 
parent - родительский элемент
type - тип объекта: расход, комиссия, тариф
objects - массив с объектами: расходы, комиссии, тарифы
*/
export function addType(parent, type, objects) {
    if (logs) {
        console.log('');
        console.log('function addType: ');
        console.log(parent);
        console.log(type);
        console.log(objects); 
    }

    objects.forEach(object => { // Для каждого объекта массива
        if (logs) {console.log(object);}
        const displayTypeBlock = addElement(parent, 'div', [type, type + '_type_' + object.type, 'mb-3']); // Блок типа
        const displayTypeElement = addData(displayTypeBlock, type, object); // Элемент типа
        switch (type) { // В зависимости от типа
            case 'cost': // Если расход
                displayCosts.push(displayTypeBlock); // В массив для отображения расходов добавляем блок типа
            break;
            case 'commission': // Если комиссия
                displayCommissions.push(displayTypeBlock); // В массив для отображения комиссий добавляем блок типа
            break;
            case 'fee': // Если тариф
                displayFees.push(displayTypeBlock); // В массив для отображения тарифов добавляем блок типа
            break;
            default:
                console.warn('Unknown object type!')
        }
    });
    if (logs) {console.log('addType done!');}
}