'use strict';
/* Логи */
export let logs = true; // true - выводим логи, false - не выводим логи

/* Импорт */
/* Данные */
import { sourceExampleWholesalePrice } from './js/source/example/example-wholesale-price.js'; // Пример оптовой цены
import { sourceExampleCosts } from './js/source/example/example-costs.js'; // Пример расходов
import { sourceExampleCommissions } from './js/source/example/example-commissions.js'; // Пример комиссий
import { sourceExampleFees } from './js/source/example/example-fees.js'; // Пример тарифов

/* Функции */
import { retailPrice } from './js/functions/logic/retail-price.js'; // Расчет розничной цены
import { addElement } from './js/functions/rendering/add-element.js'; // Отображение элементов
import { addData } from './js/functions/rendering/add-data.js'; // Отображение данных
import { addName } from './js/functions/rendering/add-name.js'; // Отображение имени
import { addType } from './js/functions/rendering/add-type.js'; // Отображения типа
import { displayRetailPriceButtonCopy } from './js/functions/utilities/copy-retail-price.js'; // Функция копирования розничной цены в буфер обмена

/* Данные для примера */
export let sourceWholesalePrice = sourceExampleWholesalePrice; ; // В оптовую цену для расчетов записываем оптовую цену из примера
export let sourceCosts = sourceExampleCosts; // В расходы для расчетов записываем расходы из примера
export let sourceCommissions = sourceExampleCommissions; // В комиссии для расчетов записываем комиссии из примера
export let sourceFees = sourceExampleFees; // В тарифы для расчетов записываем тарифы из примера
if (logs) {
    console.log('exampleData:');
    console.log(sourceWholesalePrice);
    console.log(sourceCosts);
    console.log(sourceCommissions);
    console.log(sourceFees);
};

/* Отображение */
export let displayCosts = []; // Массив для отображения расходов
export let displayCommissions = []; // Массив для отображения комиссий
export let displayFees = []; // Массив для отображения тарифов

/* Отображение розничной цены */
export const displayRetailPriceInputFormControl = document.querySelector('.retail-price__value'); // Поле для отображения розничной цены
displayRetailPriceInputFormControl.value = retailPrice(sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees); // В поле для отображения розничной цены выводим расчет розничной цены

/* Отображение оптовой цены */
export const displayWholesalePriceInputFormControl = document.querySelector('.wholesale-price__number'); // Поле для ввода оптовой цены
displayWholesalePriceInputFormControl.value = sourceWholesalePrice; // В поле для ввода оптовой цены записываем оптовую цену для расчетов
displayWholesalePriceInputFormControl.addEventListener('input', function (event) { // Поле для ввода оптовой цены добавляем отслеживание событий по клику
    sourceWholesalePrice = Number(displayWholesalePriceInputFormControl.value); // Оптовую цену для расчетов записываем из поля для ввода оптовой цены
    displayRetailPriceInputFormControl.value = retailPrice(sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees); // В поле для отображения розничной цены выводим расчет розничной цены
})

/* Отображение расходов */
export const displayCostsBlock = document.querySelector('.costs'); // Блок для отображения расходов
addType(displayCostsBlock, 'cost', sourceCosts); // В блоке для отображения расходов отображаем расходы

/* Отображение комиссий */
export const displayCommissionsBlock = document.querySelector('.commissions'); // Блок для отображения комиссий
addType(displayCommissionsBlock, 'commission', sourceCommissions); // В блоке для отображения комиссий отображаем комиссии

/* Отображение тарифов */
export const displayFeesBlock = document.querySelector('.fees'); // Блок для отображения тарифов
addType(displayFeesBlock, 'fee', sourceFees); // В блоке для отображения тарифов отображаем тарифы

/* Кнопки добавления новых данных */
/* Кнопка добавления расхода */
const displayCostButtonAdd = document.querySelector('.add__cost'); // Кнопка добавления расхода
displayCostButtonAdd.addEventListener('click', function () { // Кнопке добавления расхода добавляем отслеживание событий по клику
    let pushSourceCostId = Number(sourceCosts.length); // Количество элементов в массиве расходов
    let pushSourceCostObject = sourceCosts.push({ // Новый объект расхода добавляем в массив расходов
        'id': 'cost-' + pushSourceCostId, // Идентификатор: расход с количеством элементов в массиве 
        'type': 'fix', // Тип: фиксированная стоимость
        'value': null // Значение: отсутствует
    });
    const displayCostBlock = addElement(displayCostsBlock, 'div', ['cost', 'mb-3']); // Новый блок расхода
    const displayCostBlockName = addName(displayCostBlock, 'cost', sourceCosts[pushSourceCostId]); // Название нового расхода
    displayCosts.push(displayCostBlock); // В массив для отображения расходов добавляем новый блок расхода 
});

/* Кнопка добавления комиссий */
const displayCommissionButtonAdd = document.querySelector('.add__commission'); // Кнопка добавления комиссии
displayCommissionButtonAdd.addEventListener('click', function () { // Кнопке добавления комиссии добавляем отслеживание событий по клику
    let pushSourceCommissionId = Number(sourceCommissions.length); // Количество элементов в массиве комиссий
    let pushSourceCommissionObject = sourceCommissions.push({ // Новый объект комиссии добавляем в массив комиссий
        'id': 'commission-' + pushSourceCommissionId, // Идентификатор: комиссия с количеством элементов в массиве
        'type': 'commission', // Тип: комиссия
        'value': null // Значение: отсутствует
    });
    const displayCommissionBlock = addElement(displayCommissionsBlock, 'div', ['commission', 'mb-3']); // Новый блок комиссии
    const displayCommissionBlockName = addName(displayCommissionBlock, 'commission', sourceCommissions[pushSourceCommissionId]); // Название новой комиссии
    displayCommissions.push(displayCommissionBlock); // В массив для отображения комиссий добавляем новый блок комиссии 
});

const displayFeeButtonAdd = document.querySelector('.add__fee'); // Кнопка добавления тарифа
displayFeeButtonAdd.addEventListener('click', function () { // Кнопке добавляения тарифа добавляем отслеживание событий по клику
    let pushSourceFeeId = Number(sourceFees.length); // Количество элементов в массиве тарифов
    let pushSourceFeeObject = sourceFees.push({ // Новый объект тарифа добавляем в массив тарифов
        'id': 'fee-' + pushSourceFeeId, // Идентификатор: тариф с количеством элементов в массиве 
        'type': 'fee', // Тип: тариф
        'value': null  // Значение: отсутствует
    });
    const displayFeeBlock = addElement(displayFeesBlock, 'div', ['fee', 'mb-3']); // Новый тариф
    const displayFeeBlockName = addName(displayFeeBlock, 'fee', sourceFees[pushSourceFeeId]); // Название нового тарифа
    displayFees.push(displayFeeBlock);
});
displayRetailPriceInputFormControl.focus(); // Фокусируемся на поле для вывода розничной цены
displayRetailPriceInputFormControl.blur(); // Снимаем фокус с поля для вывода розничной цены

if (logs) {console.log('script.js done!')}