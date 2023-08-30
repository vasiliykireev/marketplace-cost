"use strict";

let marketplaceCostData = {};

/* Начальные данные для примера
*/
export let wholesalePrice = 10000 ; // Оптовая цена

/* Расходы и прибыль
/* id: порядковый номер, число
/* name: Наименование, строка
/* type: percent - процент от оптовой цены, fix - фиксированное значение
/* percent - значение процента от оптовой цены, число
/* value - значение расхода или прибыли, число
*/
export let costs = [ // Расходы и прибыль
    {   
        id: 1,
        name: "Прибыль",
        type: "percent",
        percent: 20
    },
    {
        id: 2,
        name: "Персонал 1",
        type: "fix",
        value: 200
    },
    {
        id: 3,
        name: "Персонал 2",
        type: "fix",
        value: 300
    },
    {
        id: 4,
        name: "Маркетинг 1",
        type: "percent",
        percent: 3
    },
    {
        id: 5,
        name: "Маркетинг 2",
        type: "percent",
        percent: 2
    },
    {
        id: 6,
        name: "Маркетинг 3",
        type: "percent",
        percent: 3
    },
    {
        id: 7,
        name: "Логистика",
        type: "fix",
        value: 200
    }
];

/* Комиссии
/* id: порядковый номер, число
/* name: Наименование, строка
/* type: commission - комиссия маркетплейса
/* percent - значение процента комиссии, число
*/
export let commissions = [
    {
        id: 1,
        name: "Размещение",
        type: "commission",
        percent: 2
    },
    {
        id: 2,
        name: "Продвижение",
        type: "commission",
        percent: 5
    }
];

/* Тарифы */
/* id: порядковый номер, число
/* name: Наименование, строка
/* type: fee - тариф маркетплейса
/* value - значение расхода или прибыли, число */
export let fees = [
        {
            id: 1,
            name: "Обработка",
            type: "fee",
            value: 20
        },
        {
            id: 2,
            name: "Логистика",
            type: "fee",
            value: 300
        },
        {
            id: 3,
            name: "Последняя миля",
            type: "fee",
            value: 500
        }
    ];

console.log("wholesalePrice");
console.log(wholesalePrice);
console.log("costs");
console.log(costs);
console.log("commissions")
console.log(commissions);
console.log("fees");
console.log(fees);

let currency = " руб.";

import { addElement } from "./js/functions/elements/add-element.js";
import { addData } from "./js/functions/rendering/add-data.js";
import { addName } from "./js/functions/rendering/add-name.js";
import { retailPrice } from "./js/functions/logic/retail-price.js";



/* Получение оптовой цены */
export const inputWholesalePrice = document.querySelector(".wholesale-price__number"); // Определяем элемент, где находится поле для ввода оптовой цена
inputWholesalePrice.value = wholesalePrice; // Добавляем в него оптовую цену из примера
inputWholesalePrice.addEventListener('input', function (event) { // Добавляем отслеживание событий по вводу данных в поле для ввода
    wholesalePrice = Number(inputWholesalePrice.value); // Записываем новую оптовую цену из поля для ввода
    retailPrice(wholesalePrice, costs, commissions, fees); // Пересчитываем розничную цену
})

/* Вывод начальных данных */

retailPrice(wholesalePrice, costs, commissions, fees); // Пересчитываем розничную цену

export const elementCosts = document.querySelector(".costs"); // Определяем элемент, куда добавлять новые расходы
costs.forEach(cost => {
    const newCost = addElement(elementCosts, "div", ["cost", "mb-3"]);
    switch (cost.type) {
        case 'fix':
            const newCostFix = addData(newCost, "cost-fix", cost);
            break;
        case 'percent':
            const newCostPercent = addData(newCost, "cost-percent", cost);
            break;
        default: console.warn("Неизвестный тип расходов");
    }
});

export const elementCommissions = document.querySelector(".commissions"); // Определяем элемент, куда добавлять новые комиссии
commissions.forEach(commission => {
    const newCost = addElement(elementCommissions, "div", ["comission", "mb-3"]);
    switch (commission.type) {
        case 'commission':
            const newCostFix = addData(newCost, "commission-percent", commission);
            break;
        default: console.warn("Неизвестный тип расходов");
    }
});


export const elementFees = document.querySelector(".fees"); // Определяем элемент, куда добавлять новые тарифы
fees.forEach(fee => {
    const newCost = addElement(elementFees, "div", ["comission", "mb-3"]);
    switch (fee.type) {
        case 'fee':
            const newCostFix = addData(newCost, "commission-percent", fee);
            break;
        default: console.warn("Неизвестный тип расходов");
    }
});

/* Кнопки добавления новых данных */
const buttonAddCost = document.querySelector(".add__cost"); // Определяем кнопку, нажатие на которую добавляет новые расходы
//buttonAddCost.addEventListener('click', function () {addNewData("cost");}); // Добавляем отслеживание событий по этой кнопке
buttonAddCost.addEventListener('click', function () { // Добавляем отслеживание событий по этой кнопке
    let newDataCostNumber = Number(costs.length);
    let newDataCost = costs.push({
        "type": "fix",
        "value": ""
    });
    console.log("newDataCost")
    console.log(newDataCost);
    console.log("costs");
    console.log(costs);
    const newCost = addElement(elementCosts, "div", ["cost", "mb-3"]);
    const newCostName = addName(newCost, "cost", costs[newDataCostNumber]);
});

const buttonAddCommission = document.querySelector(".add__commission"); // Определяем кнопку, нажатие на которую добавляет новые комиссии
//buttonAddComission.addEventListener('click', function () {addNewData("commission");}); // Добавляем отслеживание событий по этой кнопке
buttonAddCommission.addEventListener('click', function () { // Добавляем отслеживание событий по этой кнопке
    let newDataCommissionNumber = Number(commissions.length);
    let newDataCommission = commissions.push({
        "type": "commission",
        "value": ""
    });
    console.log("newDataComission")
    console.log(newDataCommission);
    console.log("costs");
    console.log(commissions);
    const newCommission = addElement(elementCommissions, "div", ["commission", "mb-3"]);
    const newCommissionName = addName(newCommission, "commission", commissions[newDataCommissionNumber]);
});

const buttonAddFee = document.querySelector(".add__fee"); // Определяем кнопку, нажатие на которую добавляет новые тарифы
//buttonAddFee.addEventListener('click', function () {addNewData("fee");}); // Добавляем отслеживание событий по этой кнопке
buttonAddFee.addEventListener('click', function () { // Добавляем отслеживание событий по этой кнопке
    let newDataFeeNumber = Number(fees.length);
    let newDataFee = fees.push({
        "type": "fee",
        "value": ""
    });
    console.log("newDataFee")
    console.log(newDataFee);
    console.log("fees");
    console.log(fees);
    const newFee = addElement(elementFees, "div", ["fee", "mb-3"]);
    const newFeeName = addName(newFee, "fee", fees[newDataFeeNumber]);
});


/* Функции */

//showCosts(); // Выводим расходы

import { testFunction } from "./js/test.js";
testFunction();