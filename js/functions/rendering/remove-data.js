'use strict';

export function removeData(data) { // Удалить данные  
    data.forEach(element => { // Для каждого элемента в данных
        element.remove(); // Удаляем элемент
    });
}