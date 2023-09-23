'use strict';

/* Логи */
let logs = true; // true - выводим логи, false - не выводим логи
if (logs) {console.log('remove-data.js')};

export function removeData(data) { // Убрать данные
    if (logs) {console.log('function removeData: '); console.log(data);}
    data.forEach(element => { // Для каждого элемента в данных
        element.remove(); // Удаляем элемент
        if (logs) {console.log('element removed: '); console.log(element);}
    });
    if (logs) {console.log('removeData done!');}
}