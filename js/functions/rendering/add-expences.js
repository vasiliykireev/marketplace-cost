'use strict';

/* Логи */
let logs = true; // true - выводим логи, false - не выводим логи
if (logs) {console.log('add-type.js')};

/* Импорт */
/* Функции */
import { addElement } from './add-element.js'; // Добавление элементов
import { addData } from './add-data.js'; // Добавление элемента

/* Отображение типа 
parent - родительский элемент
type - тип объекта: расход, комиссия, тариф
source - массив с объектами: расходы, комиссии, тарифы
display - массив с выводимыми элементами
*/
export function addExpences(parent, type, expences) {
    if (logs) {
        console.log('');
        console.log('function addExpences: ');
        console.log(parent);
        console.log(type);
        console.log(expences);
    }

    let displayExpences = expences.map(expenditure => { // В отображение расходов из массива расходов каждый расход
        if (logs) {console.log('expenditure: '); console.log(expenditure)};
        const displayTypeBlock = addElement(parent, 'div', [type, type + '_type_' + expenditure.type, 'mb-3']); // Добавляем блок типа
        const displayTypeElement = addData(displayTypeBlock, type, expenditure); // Добавляем элемент типа
        return displayTypeBlock;
    }
    );

    if (logs) {console.log('displayExpences: '); console.log(displayExpences)};
    if (logs) {console.log('addExpences done!')};
    return displayExpences;
}