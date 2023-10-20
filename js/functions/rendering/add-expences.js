'use strict';

/* Логи */
let logs = true; // true - выводим логи, false - не выводим логи
if (logs) {console.log('add-type.js')};

/* Импорт */
/* Данные */
// import { displayCosts, displayCommissions, displayFees } from '../../../script.js'; // Массивы для отображения расходов, комиссий и тарифов 
/* Функции */
import { addElement } from './add-element.js'; // Добавление элементов
import { addData } from './add-data.js'; // Добавление элемента

/* Отображение типа 
parent - родительский элемент
type - тип объекта: расход, комиссия, тариф
source - массив с объектами: расходы, комиссии, тарифы
display - массив с выводимыми элементами
*/
export function addExpences(parent, type, source) {
    if (logs) {
        console.log('');
        console.log('function addExpences: ');
        console.log(parent);
        console.log(type);
        console.log(source);
        //console.log(display);
    }
    let displayExpences = source.map(object => {
        if (logs) {console.log(object)};
        const displayTypeBlock = addElement(parent, 'div', [type, type + '_type_' + object.type, 'mb-3']); // Блок типа
        const displayTypeElement = addData(displayTypeBlock, type, object); // Элемент типа
        return object;
    }
    );
    if (logs) {console.log('addExpences addExpences: '); console.log(displayExpences)};
    if (logs) {console.log('addExpences done!')};
    return displayExpences;
}