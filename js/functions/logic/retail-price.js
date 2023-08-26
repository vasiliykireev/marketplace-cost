"use strict";

console.log("retail-price.js loaded");
import { addData } from "../rendering/add-data.js";
import { addElement } from "../elements/add-element.js";

export function retailPrice(wholesalePrice, costs, commissions, fees) { // Расчет розничной цены

    let sumCommissions = 0; // Сумма комиссий маркетплейса
    let sumCosts = 0; // Сумма расходов и прибыли
    let sumFees = 0; // Сумма тарифов маркетплейса
    costs.forEach(function(cost) { // Каждый объект расходов и прибыли должен иметь значение, поэтому 
    if (cost["type"] === "percent") { // Если расход указан в процентах,
        
            cost["value"] = wholesalePrice * cost["percent"]/100; // то он пересчитывается в числовое значение.
            //console.log(cost);
        }
    })
    /* Сумма расходов и прибыли */
    //console.log("- Расходы и прибыль:")
    costs.forEach(function(cost) { // Сумма всех расходов и прибыли
        sumCosts = sumCosts + Number(cost["value"]); // В sumCosts суммируются все значения value из расходов и прибылей costs.
        //console.log("name: " + cost["name"] + ", value: " + cost["value"]);
        //console.log("sumCosts: " + sumCosts)
    })
    //console.log("sumCosts (final): " + sumCosts);
    /* Сумма комиссий */
    //console.log("- Комиссии:")
    
    commissions.forEach(function(commission) { // Сумма всех комиссий
        sumCommissions = sumCommissions + Number(commission["percent"]); // В sumCommissions суммируются все значения percent из комиссий commissions.
        if (sumCommissions > 99) { // Сумма не может быть больше 99,
            // потому что тогда в расчетах получится отрицательное число,
            // потому что сумма комиссий не может превышать стоимость товара
            console.warn("Сумма комиссий не может быть 100 или больше процентов.")
        }
        //console.log(commission["name"] + ": " + commission["percent"]);
    })
    //console.log(sumCommissions);
    
    /* Сумма тарифов */
    //console.log("- Тарифы:")
    fees.forEach(function(fee) { // Сумма всех тарифов
        sumFees = sumFees + Number(fee["value"]); // В sumFees суммируются все значения value из тарифов fees.
        //console.log(fee["name"] + ": " + fee["value"]);
    })
    //console.log(sumFees);
    
    //console.log("- Оптовая цена: " + wholesalePrice);

    /* Розничная цена */
    let result = (wholesalePrice + sumCosts + sumFees) / (1 - sumCommissions / 100); // Розничная цена равна сумме оптовой цены, расходов и прибыли и тарифов маркетплейса, деленых на разницу 1 (100%) и суммы процентов комиссий маркетплейсов
    result = result.toFixed(2);
    //console.log("- Результат: " + result);
    
    const retailPriceValue = document.querySelector(".retail-price__value");
    retailPriceValue.value = result;

    console.log("Закупочная цена:")
    console.log(wholesalePrice);
    console.log("Расходы и прибыль");
    console.log(costs);
    console.log("Комиссии");
    console.log(commissions);
    console.log("Тарифы");
    console.log(fees);
    console.log("Розничная цена: " + result);
}