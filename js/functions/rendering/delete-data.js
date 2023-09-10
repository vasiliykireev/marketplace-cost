'use strict';

export function deleteData(data) { // Удалить данные  
    data.forEach(element => { // Для каждого элемента в данных
        element.remove(); // Удаляем элемент
    });
}