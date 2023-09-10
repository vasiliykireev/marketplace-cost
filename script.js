'use strict';

/* Логи */
export let logs = true; // true - выводим логи, false - не выводим логи

/* Подписи */
import { lang } from './js/source/lang.js'; // Импортируем подписи на разных языках
export let captions = lang.ru; // Подписи на русском языке
if (logs) {console.log(captions);} // Логи подписей

/* Данные для примера */
import { sourceExampleWholesalePrice } from './js/source/example/example-wholesale-price.js'; // Импортируем пример розничной цены
import { sourceExampleCosts } from './js/source/example/example-costs.js'; // Импортируем пример расходов
import { sourceExampleCommissions } from './js/source/example/example-commissions.js'; // Импортируем пример комиссий
import { sourceExampleFees } from './js/source/example/example-fees.js'; // Импортируем пример тарифов
export let sourceWholesalePrice = sourceExampleWholesalePrice; ; // Заполняем оптовую цену из примера
export let sourceCosts = sourceExampleCosts; // Заполняем расходы из примера
export let sourceCommissions = sourceExampleCommissions; // Заполняем комиссии из примера
export let sourceFees = sourceExampleFees; // Заполняем тарифы из примера
if (logs) { // Логи данных для примера
    console.log('exampleData');
    console.log(sourceWholesalePrice); // Оптовая цена
    console.log(sourceCosts); // Расходы
    console.log(sourceCommissions); // Комиссии
    console.log(sourceFees) // Тарифы
};

/* Вычисления */
import { retailPrice } from './js/functions/logic/retail-price.js'; // Импортируем функцию расчета розничной цены

/* Отображение */
import { addElement } from './js/functions/rendering/add-element.js'; // Импортируем функцию добавления элементов
import { addData } from './js/functions/rendering/add-data.js'; // Импортируем функцию добавления данных
import { addName } from './js/functions/rendering/add-name.js'; // Импортируем функцию добавления имени
import { addType } from './js/functions/rendering/add-type.js'; // Импортируем функцию добавления типа

export let displayCosts = []; // Определяем переменную для всех расходов
export let displayCommissions = []; // Определяем переменную для всех комиссий
export let displayFees = []; // Определяем переменную для всех тарифов

/* Отображение розничной цены */
export const displayRetailPriceInputFormControl = document.querySelector('.retail-price__value'); // Определяем поле для вывода розничной цены
displayRetailPriceInputFormControl.value = retailPrice(sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees); // Считаем розничную цену и выводим ее в поле для вывода

/* Отображение оптовой цены */
export const displayWholesalePriceInputFormControl = document.querySelector('.wholesale-price__number'); // Определяем элемент, где находится поле для ввода оптовой цена
displayWholesalePriceInputFormControl.value = sourceWholesalePrice; // Записываем в него оптовую цену
displayWholesalePriceInputFormControl.addEventListener('input', function (event) { // Добавляем отслеживание событий по вводу данных в поле для ввода оптовой цены
    sourceWholesalePrice = Number(displayWholesalePriceInputFormControl.value); // Записываем новую оптовую цену из поля для ввода оптовой цены
    displayRetailPriceInputFormControl.value = retailPrice(sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees) // Пересчитываем и выводим розничную цену 
})

/* Отображение расходов */
export const displayCostsBlock = document.querySelector('.costs'); // Определяем элемент, куда добавлять новые расходы
export let displayCostsElements = addType(displayCostsBlock, 'cost', sourceCosts); // Добавляем новые расходы

/* Отображение комиссий */
export const displayCommissionsBlock = document.querySelector('.commissions'); // Определяем элемент, куда добавлять новые комиссии
export let displayCommissionsElements = addType(displayCommissionsBlock, 'commission', sourceCommissions); // Добавляем новые комиссии

/* Отображение тарифов */
export const displayFeesBlock = document.querySelector('.fees'); // Определяем элемент, куда добавлять новые тарифы
export let displayFeesElements = addType(displayFeesBlock, 'fee', sourceFees); // Добавляем новые тарифы

/* Кнопки добавления новых данных */
const displayCostButtonAdd = document.querySelector('.add__cost'); // Определяем кнопку, нажатие на которую добавляет новые расходы
displayCostButtonAdd.addEventListener('click', function () { // Добавляем отслеживание событий по этой кнопке
    let pushSourceCostId = Number(sourceCosts.length); // Считаем количество элементов в массиве расходов
    let pushSourceCostObject = sourceCosts.push({ // Добавляем в новый элемент массива
        'id': 'cost-' + pushSourceCostId, // Идентификатор - расход с количеством элементов в массиве 
        'type': 'fix', // Тип - фиксированная стоимость
        'value': null // Значение - отсутствует
    });
    const displayCostBlock = addElement(displayCostsBlock, 'div', ['cost', 'mb-3']); // Добавляем новый расход
    const displayCostBlockName = addName(displayCostBlock, 'cost', sourceCosts[pushSourceCostId]); // Добавляем название нового расхода
    displayCosts.push(displayCostBlock);
});

const displayCommissionButtonAdd = document.querySelector('.add__commission'); // Определяем кнопку, нажатие на которую добавляет новые комиссии
displayCommissionButtonAdd.addEventListener('click', function () { // Добавляем отслеживание событий по этой кнопке
    let pushSourceCommissionId = Number(sourceCommissions.length); // Считаем количество элементов в массиве комиссий
    let pushSourceCommissionObject = sourceCommissions.push({ // Добавляем в новый элемент массива
        'id': 'commission-' + pushSourceCommissionId, // Идентификатор - комиссия с количеством элементов в массиве 
        'type': 'commission', // Тип - комиссия
        'value': null // Значение - отсутствует
    });
    const displayCommissionBlock = addElement(displayCommissionsBlock, 'div', ['commission', 'mb-3']); // Добавляем новую комиссию
    const displayCommissionBlockName = addName(displayCommissionBlock, 'commission', sourceCommissions[pushSourceCommissionId]); // Добавляем название новой комиссии
    displayCommissions.push(displayCommissionBlock);
});

const displayFeeButtonAdd = document.querySelector('.add__fee'); // Определяем кнопку, нажатие на которую добавляет новые тарифы
displayFeeButtonAdd.addEventListener('click', function () { // Добавляем отслеживание событий по этой кнопке
    let pushSourceFeeId = Number(sourceFees.length); // Считаем количество элементов в массиве тарифов
    let pushSourceFeeObject = sourceFees.push({ // Идентификатор - тариф с количеством элементов в массиве 
        'id': 'fee-' + pushSourceFeeId, // Идентификатор - тариф с количеством элементов в массиве 
        'type': 'fee', // Тип - тариф
        'value': null  // Значение - отсутствует
    });
    const displayFeeBlock = addElement(displayFeesBlock, 'div', ['fee', 'mb-3']); // Добавляем новый тариф
    const displayFeeBlockName = addName(displayFeeBlock, 'fee', sourceFees[pushSourceFeeId]); // Добавляем название нового тарифа
    displayFees.push(displayFeeBlock);
});
displayRetailPriceInputFormControl.focus(); // Фокусируемся на поле для вывода розничной цены
displayRetailPriceInputFormControl.blur(); // Снимаем фокус с поля для вывода розничной цены

import { displayRetailPriceButtonCopy } from './js/functions/utilities/copy-retail-price.js';