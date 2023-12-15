'use strict';

/**
 * Логи
 * @type {boolean} true: выводить, false: не выводить
 */
let logs = true;
if(logs){console.log('get-marketplace-price.js');}

/**
 * Отладка
 * @type {boolean} true: включена, false: выключена
 */
let debug = true;

export function getMaketplacePrice(wholesalePrice, costs, commissions, fees) {
    if(logs){
        console.log('function getMaketplacePrice:');
        console.log(wholesalePrice);
        console.log(costs);
        console.log(commissions)
        console.log(fees);
    }
    wholesalePrice = Number(wholesalePrice);
    let sumCommissions = new Number();
    let sumCosts = new Number();
    let sumFees = new Number();

    // /* Заполнение всех свойств расхода */
    // if (logs) {console.log('costs:');}
    // costs.forEach(function(cost) { // Каждый объект расходов должен иметь значение, поэтому 
    //     if (cost.type === "percent") { // Если тип расхода процент
    //         cost.value = Number(wholesalePrice * cost.percent/100).toFixed(2); // Значение расхода рассчитывается относительно процента от оптовой цены
    //     } else if (cost.type === "fix") { // Если тип расхода фиксированный
    //         cost.percent = Number(cost.value / wholesalePrice * 100).toFixed(2); // Процент расхода расчитывается из значения относительно оптовой цены
    //     }
    //     if (logs) {console.log(cost);}
    // });
    /* Сумма расходов */
    costs.forEach(function(cost) { // Для каждого расхода в массиве расходов
        if(logs){
            console.log('cost.value:');
            console.log(cost.value)
        };
        sumCosts = sumCosts + Number(cost.value); // Прибавляем расход в сумму расходов
    })
    if (logs) {console.log('sumCosts: ' + sumCosts);}

    /* Сумма комиссий */
    commissions.forEach(function(commission) { // Для каждой комиссии в массиве комиссий
        sumCommissions = sumCommissions + Number(commission.percent); // Прибавляем комиссию в сумму комиссий
    })
    if (sumCommissions >= 100) { // Сумма не может быть больше или равна 100,
        // потому что тогда в расчетах получится отрицательное число,
        // потому что сумма комиссий не может превышать стоимость товара.
        console.warn("Сумма комиссий не может быть 100 или больше процентов.");
        return 0; // Завершаем выполнение функции
    }
    if (logs) {console.log('sumCommissions: ' + sumCommissions);}

    /* Сумма тарифов */
    fees.forEach(function(fee) { // Для каждого тарифа в массиве тарифов
        sumFees = sumFees + Number(fee.value); // Прибавляем тариф в сумму тарифов
    })
    if (logs) {console.log('sumFees: ' + sumFees);}

    /* Розничная цена */
    let result = (wholesalePrice + sumCosts + sumFees) / (1 - sumCommissions / 100); // Результат равен сумме оптовой цены, расходов и прибыли и тарифов маркетплейса, деленых на разницу 1 (100%) и суммы процентов комиссий маркетплейсов
    result = result.toFixed(2);
    if (logs) {console.log('result: ' + result);}
    if (logs) {console.log('retailPrice done!');}
    return result;
    // return 666;
}
