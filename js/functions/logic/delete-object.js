'use strict';

/* Логи */
let logs = false; // true - выводим логи, false - не выводим логи
if (logs) {console.log('add-name.js');}

/* Импорт */
/* Данные */
import { sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees } from '../../../script.js'; // Оптовая цена, расходы, комиссии, тарифы

/* Удаление объекта
object - объект массива расходов, комиссий или тарифов
*/
export function deleteObject(object) {
    if (logs) {
        console.log('');
        console.log('function deleteObject:');
        console.log(object)
    }
    let dataArray; // Массив с данными
    if (sourceCosts.indexOf(object) > -1) { // Если в массиве расходов есть индекс объекта
        dataArray = sourceCosts; // В массив с данными записываем в массив с данными расходы
    } else if (sourceCommissions.indexOf(object) > -1) { // Если в массиве комиссий есть индекс объекта
        dataArray = sourceCommissions; // В массив с данными записываем в массив с данными комиссии
    } else if(sourceFees.indexOf(object) > -1) { // Если в массиве тарифов есть индекс объекта
        dataArray = sourceFees; // В массив с данными записываем в массив с данными тарифы
    } else { // В другом случае 
        console.warn('There is no object in costs, commissions and fees source arrays!');
    }
    if (dataArray !== undefined) { // Если массив с данными имеет значение
        dataArray.splice(dataArray.indexOf(object),1); // Удаляем элемент из массива данных
    }
    if (logs) {
        console.log(sourceCosts);
        console.log(sourceCommissions);
        console.log(sourceFees);
        console.log('deleteObject done!');
    }
}