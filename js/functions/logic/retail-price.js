"use strict";

/* Логи */
export let logs = true; // true - выводим логи, false - не выводим логи

export function retailPrice(wholesalePrice, costs, commissions, fees) { // Расчет розничной цены

    let sumCommissions = 0; // Сумма комиссий маркетплейса
    let sumCosts = 0; // Сумма расходов и прибыли
    let sumFees = 0; // Сумма тарифов маркетплейса
    costs.forEach(function(cost) { // Каждый объект расходов и прибыли должен иметь значение, поэтому 
    if (cost.type === "percent") { // Если расход указан в процентах,
        cost.value = Number(wholesalePrice * cost.percent/100).toFixed(2); // то он пересчитывается в числовое значение.
    } else if (cost.type === "fix") {
        cost.percent = Number(cost.value / wholesalePrice * 100).toFixed(2);
    }
    }) 
    /* Сумма расходов и прибыли */
    costs.forEach(function(cost) { // Сумма всех расходов и прибыли
        sumCosts = sumCosts + Number(cost.value); // В sumCosts суммируются все значения value из расходов и прибылей costs.
    })
    
    commissions.forEach(function(commission) { // Сумма всех комиссий
        sumCommissions = sumCommissions + Number(commission.percent); // В sumCommissions суммируются все значения percent из комиссий commissions.
    })
    if (sumCommissions >= 100) { // Сумма не может быть больше или равна 100,
        // потому что тогда в расчетах получится отрицательное число,
        // потому что сумма комиссий не может превышать стоимость товара
        console.warn("Сумма комиссий не может быть 100 или больше процентов.");
        return 0;
    }

    /* Сумма тарифов */
    fees.forEach(function(fee) { // Сумма всех тарифов
        sumFees = sumFees + Number(fee.value); // В sumFees суммируются все значения value из тарифов fees.
    })

    /* Розничная цена */
    let result = (wholesalePrice + sumCosts + sumFees) / (1 - sumCommissions / 100); // Розничная цена равна сумме оптовой цены, расходов и прибыли и тарифов маркетплейса, деленых на разницу 1 (100%) и суммы процентов комиссий маркетплейсов
    result = result.toFixed(2);
    
    if (logs) {
        console.log("retailPrice data");
        console.log(costs);
        console.log(commissions);
        console.log(fees);
    }

    return result;
}