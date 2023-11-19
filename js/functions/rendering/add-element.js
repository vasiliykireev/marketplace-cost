'use strict';

/* Логи */
let logs = true;
if (logs) {console.log('add-element.js');}

/* Отображение элементов
parent - родительский элемент
tag - html-тэг
classes - html-классы. 
attributes - html-аттрибуты. Передаются одним объектом.
*/

/**
 * Функция для создания html-элементов с классами и атрибутами
 * @param {string} parent Родительский элемент, в котором создается новый элемент
 * @param {string} tag Тэг создаваемого элемента
 * @param {string|string[]} classes Классы создаваемого элемента. Единственный класс передается строкой, несколько классов строками в массиве.
 * @param {object} attributes Атрибуты создаваемого элемента. Передаются одним объектом в формате ключ: значение
 * @returns {object} Возвращает созданный в родителе html-элемент с классами и атрибутами
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
    
    const element = document.createElement(tag);
    switch(typeof(classes)) {
        case 'string':
            element.classList.add(classes);
            break;
        case 'object':
            classes.map(className => {
                element.classList.add(className);
            })
            break;
        default: console.warn('No classes!');
    }
    if (typeof(attributes) === 'object') {
        let attributesKeys = Object.keys(attributes);
        let attributesValues = Object.values(attributes);
        attributesKeys.map(key => {
            element.setAttribute(key, attributes[key]);
        })
    }
    parent.append(element);
    if (logs) {
        console.log('element: ');
        console.log(element);
        console.log('addElement done!');
    }
    return element;
}