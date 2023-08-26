"use strict";

let marketplaceCostData = {};

import { wholesalePrice, costs, commissions, fees } from "./js/example.js";

console.log("import { wholesalePrice, costs, commissions, fees }")
console.log(wholesalePrice);
console.log(costs);
console.log(commissions);
console.log(fees);

let currency = " руб.";

import { retailPrice } from "./js/functions/logic/retail-price.js";

/* Получение оптовой цены */
const inputWholesalePrice = document.querySelector(".wholesale-price__number"); // Определяем элемент, где находится поле для ввода оптовой цена
inputWholesalePrice.value = wholesalePrice; // Добавляем в него оптовую цену из примера
inputWholesalePrice.addEventListener('input', function (event) { // Добавляем отслеживание событий по вводу данных в поле для ввода
    wholesalePrice = Number(inputWholesalePrice.value); // Записываем новую оптовую цену из поля для ввода
    retailPrice(wholesalePrice, costs, commissions, fees); // Пересчитываем розничную цену
})

/* Кнопки добавления новых данных */
const elementCosts = document.querySelector(".costs"); // Определяем элемент, куда добавлять новые расходы
const buttonAddCost = document.querySelector(".add__cost"); // Определяем кнопку, нажатие на которую добавляет новые расходы
//buttonAddCost.addEventListener('click', function () {addNewData("cost");}); // Добавляем отслеживание событий по этой кнопке
buttonAddCost.addEventListener('click', function () { // Добавляем отслеживание событий по этой кнопке
    let newDataCostNumber = Number(costs.length);
    let newDataCost = costs.push({
        "id": newDataCostNumber + 1,
        "name": "Название"
    });
    console.log(newDataCost);
    console.log(costs);
    const newCost = addElement(elementCosts, "div", ["cost", "mb-3"]);
    const newCostName = addName(newCost, "cost", costs[newDataCostNumber]);
});

import { addElement } from "./js/functions/elements/add-element.js";


const divCommissions = document.querySelector(".commissions"); // Определяем элемент, куда добавлять новые комиссии
const buttonAddComission = document.querySelector(".add__commission"); // Определяем кнопку, нажатие на которую добавляет новые комиссии
buttonAddComission.addEventListener('click', function () {addNewData("commission");}); // Добавляем отслеживание событий по этой кнопке

const divFees = document.querySelector(".fees"); // Определяем элемент, куда добавлять новые тарифы
const buttonAddFee= document.querySelector(".add__fee"); // Определяем кнопку, нажатие на которую добавляет новые тарифы
buttonAddFee.addEventListener('click', function () {addNewData("fee");}); // Добавляем отслеживание событий по этой кнопке

import { addNewData } from "./js/functions/rendering/add-new-data.js";

/* Функции */

function addBlock(className, place) { // Функция добавления нового элемента с переданным именем класса и местом
    const element = document.createElement("div"); // Создаем элемент
    element.classList.add(className); // Добавляем нужный класс и отступ снизу
    place.append(element); // Размещаем элемент
    return element; // Возвращаем элемент
}

import { addName } from "./js/functions/rendering/add-name.js";

import { saveName } from "./js/functions/rendering/save-name.js";

import { showCost } from "./js/functions/rendering/show-cost.js";

/* Вывод начальных данных */

retailPrice(wholesalePrice, costs, commissions, fees); // Пересчитываем розничную цену

//showCosts(); // Выводим расходы

import { testFunction } from "./js/test.js";
testFunction();