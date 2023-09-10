'use strict';

/* Логи */
export let logs = true; // true - выводим логи, false - не выводим логи

/* Данные для примера */
import { exampleWhosalePrice } from './js/data/example/example-whosale-price.js'; // Импортируем пример розничной цены
import { exampleCosts } from './js/data/example/example-costs.js'; // Импортируем пример расходов
import { exampleCommissions } from './js/data/example/example-commissions.js'; // Импортируем пример комиссий
import { exampleFees } from './js/data/example/example-fees.js'; // Импортируем пример тарифов
export let wholesalePrice = exampleWhosalePrice; ; // Заполняем оптовую цену из примера
export let costs = exampleCosts; // Заполняем расходы из примера
export let commissions = exampleCommissions; // Заполняем комиссии из примера
export let fees = exampleFees; // Заполняем тарифы из примера
if (logs) { // Логи данных для примера
    console.log('exampleData');
    console.log(wholesalePrice); // Оптовая цена
    console.log(costs); // Расходы
    console.log(commissions); // Комиссии
    console.log(fees) // Тарифы
};

/* Вычисления */
import { retailPrice } from './js/functions/logic/retail-price.js'; // Импортируем функцию расчета розничной цены

/* Подписи */
import { lang } from './js/data/lang.js'; // Импортируем подписи на разных языках
export let captions = lang.ru; // Подписи на русском языке
if (logs) {console.log(captions);} // Логи подписей

/* Отображение */
import { addElement } from './js/functions/rendering/add-element.js'; // Импортируем функцию добавления элементов
import { addData } from './js/functions/rendering/add-data.js'; // Импортируем функцию добавления данных
import { addName } from './js/functions/rendering/add-name.js'; // Импортируем функцию добавления имени
import { addType } from './js/functions/rendering/add-type.js'; // Импортируем функцию добавления типа

export let allCosts = []; // Определяем переменную для всех расходов
export let allCommissions = []; // Определяем переменную для всех комиссий
export let allFees = []; // Определяем переменную для всех тарифов

/* Отображение розничной цены */
export const inputRetailPrice = document.querySelector('.retail-price__value'); // Определяем поле для вывода розничной цены
inputRetailPrice.value = retailPrice(wholesalePrice, costs, commissions, fees); // Считаем розничную цену и выводим ее в поле для вывода

/* Отображение оптовой цены */
export const inputWholesalePrice = document.querySelector('.wholesale-price__number'); // Определяем элемент, где находится поле для ввода оптовой цена
inputWholesalePrice.value = wholesalePrice; // Записываем в него оптовую цену
inputWholesalePrice.addEventListener('input', function (event) { // Добавляем отслеживание событий по вводу данных в поле для ввода оптовой цены
    wholesalePrice = Number(inputWholesalePrice.value); // Записываем новую оптовую цену из поля для ввода оптовой цены
    inputRetailPrice.value = retailPrice(wholesalePrice, costs, commissions, fees) // Пересчитываем и выводим розничную цену 
})

/* Отображение расходов */
export const elementCosts = document.querySelector('.costs'); // Определяем элемент, куда добавлять новые расходы
export let addCosts = addType(elementCosts, 'cost', costs); // Добавляем новые расходы

/* Отображение комиссий */
export const elementCommissions = document.querySelector('.commissions'); // Определяем элемент, куда добавлять новые комиссии
export let addCommissions = addType(elementCommissions, 'commission', commissions); // Добавляем новые комиссии

/* Отображение тарифов */
export const elementFees = document.querySelector('.fees'); // Определяем элемент, куда добавлять новые тарифы
export let addFees = addType(elementFees, 'fee', fees); // Добавляем новые тарифы

/* Кнопки добавления новых данных */
const buttonAddCost = document.querySelector('.add__cost'); // Определяем кнопку, нажатие на которую добавляет новые расходы
buttonAddCost.addEventListener('click', function () { // Добавляем отслеживание событий по этой кнопке
    let newCostId = Number(costs.length); // Считаем количество элементов в массиве расходов
    let newCost = costs.push({ // Добавляем в новый элемент массива
        'id': 'cost-' + newCostId, // Идентификатор - расход с количеством элементов в массиве 
        'type': 'fix', // Тип - фиксированная стоимость
        'value': null // Значение - отсутствует
    });
    const addNewCost = addElement(elementCosts, 'div', ['cost', 'mb-3']); // Добавляем новый расход
    const addNewCostName = addName(addNewCost, 'cost', 'fix', costs[newCostId]); // Добавляем название нового расхода
});

const buttonAddCommission = document.querySelector('.add__commission'); // Определяем кнопку, нажатие на которую добавляет новые комиссии
buttonAddCommission.addEventListener('click', function () { // Добавляем отслеживание событий по этой кнопке
    let newCommissionId = Number(commissions.length); // Считаем количество элементов в массиве комиссий
    let newCommission = commissions.push({ // Добавляем в новый элемент массива
        'id': 'commission-' + newCommissionId, // Идентификатор - комиссия с количеством элементов в массиве 
        'type': 'commission', // Тип - комиссия
        'value': null // Значение - отсутствует
    });
    const addNewCommission = addElement(elementCommissions, 'div', ['commission', 'mb-3']); // Добавляем новую комиссию
    const addNewCommissionName = addName(addNewCommission, 'commission', 'commission', commissions[newCommissionId]); // Добавляем название новой комиссии
});

const buttonAddFee = document.querySelector('.add__fee'); // Определяем кнопку, нажатие на которую добавляет новые тарифы
buttonAddFee.addEventListener('click', function () { // Добавляем отслеживание событий по этой кнопке
    let newFeeId = Number(fees.length); // Считаем количество элементов в массиве тарифов
    let newFee = fees.push({ // Идентификатор - тариф с количеством элементов в массиве 
        'id': 'fee-' + newFeeId, // Идентификатор - тариф с количеством элементов в массиве 
        'type': 'fee', // Тип - тариф
        'value': null  // Значение - отсутствует
    });
    const addNewFee = addElement(elementFees, 'div', ['fee', 'mb-3']); // Добавляем новый тариф
    const addNewFeeName = addName(addNewFee, 'fee', 'fee', fees[newFeeId]); // Добавляем название нового тарифа
});
inputRetailPrice.focus(); // Фокусируемся на поле для вывода розничной цены
inputRetailPrice.blur(); // Снимаем фокус с поля для вывода розничной цены