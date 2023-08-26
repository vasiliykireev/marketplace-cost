"use strict";
console.log("addNewData");

export function addNewData(type) { // Функция добавления новых данных в зависимости от типа
    switch (type) {
        case "cost": // Если добавляем расход
            let idCost = costs.length + 1; // Записываем id расхода 
            costs.push({ // Добавляем в конец массива расходов
                "id": idCost // Идентификатор 
            })
            console.log(costs);
            let newCost = addBlock(type, divCosts); // Добавляем новый элемент расхода
            newCost.classList.add("mb-3");  // Добавляем отступ снизу
            let newCostName = addName(idCost, type, newCost); // Добавляем новое название для расхода
            
        break;
        case "commission": // Если добавляем комиссию
            let idCommission = commissions.length + 1; // Записываем id комиссии
            commissions.push({ // Добавляем в конец массива комиссий
                "id": idCommission // Идентификатор
            })
            console.log(commissions);
            let newCommission = addBlock(type, divCommissions); // Добавляем новый элемент комиссии
            newCommission.classList.add("mb-3");  // Добавляем отступ снизу
            let newCommissionName = addName(idCommission, type, newCommission); // Добавляем новое название для комиссии
        break;
        case "fee": // Если добавляем тариф
            let idFee = fees.length + 1; // Записываем id тарифа
            fees.push({ // Добавляем в конец массива тарифов
                "id": idFee // Идентификатор
            })
            console.log(fees);
            let newFee = addBlock(type, divFees); // Добавляем новый элемент тарифа
            newFee.classList.add("mb-3");  // Добавляем отступ снизу
            let newFeeName = addName(idFee, type, newFee); // Добавляем новое название для тарифа

        break;
        default: // В любом другом случае
            console.error("Ошибка при попытке добавления неизвестного типа!")
    }
}