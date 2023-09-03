"use strict";

console.log("retail-price.js loaded");

export function retailPrice(wholesalePrice, costs, commissions, fees) { // Расчет розничной цены

    let sumCommissions = 0; // Сумма комиссий маркетплейса
    let sumCosts = 0; // Сумма расходов и прибыли
    let sumFees = 0; // Сумма тарифов маркетплейса
    costs.forEach(function(cost) { // Каждый объект расходов и прибыли должен иметь значение, поэтому 
    if (cost["type"] === "percent") { // Если расход указан в процентах,
            cost["value"] = wholesalePrice * cost["percent"]/100; // то он пересчитывается в числовое значение.
        }
    })
    /* Сумма расходов и прибыли */
    costs.forEach(function(cost) { // Сумма всех расходов и прибыли
        sumCosts = sumCosts + Number(cost["value"]); // В sumCosts суммируются все значения value из расходов и прибылей costs.
    })
    
    commissions.forEach(function(commission) { // Сумма всех комиссий
        sumCommissions = sumCommissions + Number(commission["percent"]); // В sumCommissions суммируются все значения percent из комиссий commissions.
        if (sumCommissions >= 100) { // Сумма не может быть больше 99,
            // потому что тогда в расчетах получится отрицательное число,
            // потому что сумма комиссий не может превышать стоимость товара
            console.warn("Сумма комиссий не может быть 100 или больше процентов.")
        }
    })
    
    /* Сумма тарифов */
    fees.forEach(function(fee) { // Сумма всех тарифов
        sumFees = sumFees + Number(fee["value"]); // В sumFees суммируются все значения value из тарифов fees.
    })

    /* Розничная цена */
    let result = (wholesalePrice + sumCosts + sumFees) / (1 - sumCommissions / 100); // Розничная цена равна сумме оптовой цены, расходов и прибыли и тарифов маркетплейса, деленых на разницу 1 (100%) и суммы процентов комиссий маркетплейсов
    result = result.toFixed(2);
    
    //const inputRetailPrice = document.querySelector(".retail-price__value");
    //inputRetailPrice.value = result;
    
    //addRetailPrice(result);

    return result;
}