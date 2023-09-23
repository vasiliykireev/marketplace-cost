'use strict';

/* Логи */
let logs = false; // true - выводим логи, false - не выводим логи
if (logs) {console.log('add-element.js');}

/* Отображение элементов
parent - родительский элемент
tag - html-тэг
classes - html-классы. Единственный класс передается строкой, несколько классов строками в массиве.
attributes - html-аттрибуты. Передаются одним объектом.
*/

export function addElement(parent, tag, classes, attributes) {
    if (logs) {
        console.log('');
        console.log('function addElement:');
        console.log(parent);
        console.log(tag);
        console.log(classes);
        console.log(attributes);
    }
    
    const element = document.createElement(tag); // Элемент
    switch(typeof(classes)) { // В зависимости от типа классов
        case 'string': // Если строка
            element.classList.add(classes); // Добавляем в элемент название класса
            break;
        case 'object': // Если объект
            classes.forEach(className => { // Для каждого класса
                element.classList.add(className); // Добавляем в элемент названия класса
            })
            break;
        default: console.warn('No classes!') // В другом случае выводим предупреждение
    }
    if (typeof(attributes) === 'object') { // Если атрибуты переданы через объект
        let attributesKeys = Object.keys(attributes); // Создаем массив с данными в ключах объекта
        let attributesValues = Object.values(attributes); // Создаем массив с данными в значениях объекта
        let attributesIndex; // Индекс для перебора массивов
        for (attributesIndex = 0; attributesIndex < attributesKeys.length; ++attributesIndex) { // Пока индекс меньше количества элементов в массиве с ключами
            element.setAttribute(attributesKeys[attributesIndex], attributesValues[attributesIndex]); // Добавляем атрибуты из ключа и значения под номером индекса
        }
    }
    parent.append(element); // Размещаем элемент в нужном месте
    if (logs) {
        console.log('element: ');
        console.log(element);
        console.log('addElement done!');
    }
    return element; // Возвращаем элемент
}