"use strict";

function showCosts() { // Функция отображения расходов
    let index; // Индекс для массива расходов
    for (index = 0; index < costs.length; ++index) { // Цикл перебора расходов
        showCost(costs[index], index); // Отображаем расход
    }
}

function showCommissions () { // Функция отображения комиссий
    commissions.forEach(function(commission) {
        let newCommision = addBlock("commission", divCommissions);
        newCommision.classList.add("mb-3");  // Добавляем отступ снизу
        newCommision.append(commission["id"], ". ", commission["name"], " = ", commission["percent"], " %");
    })
}

function showFees () { // Функция отображения тарифов
    fees.forEach(function(fee) {
        let newFee = addBlock("fee", divFees);
        newFee.classList.add("mb-3");  // Добавляем отступ снизу
        newFee.append(fee["id"], ". ", fee["name"], " = ", fee["value"], " руб.");
    })
}