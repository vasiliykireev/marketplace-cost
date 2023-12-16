'use strict';

import { roundToHundredths } from "./round-to-hundredths.js";

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

/**
 * Получить цену для маркетплейсов — суммирует данные расходов, комиссий и тарифов, и считает из них и оптовой цены цену для маркетплейсов
 * @param {Number} wholesalePrice Оптовая цена
 * @param {Array} costs Массив с объектами расходов
 * @param {Array} commissions Массив с объектами комиссий
 * @param {Array} fees Массив с объектами с тарифами
 * @returns 
 */
export function getMaketplacePrice(wholesalePrice, costs, commissions) {
    if(logs){
        console.log('function getMaketplacePrice:');
        console.log(wholesalePrice);
        console.log(costs);
        console.log(commissions)
        // console.log(fees);
    }

    wholesalePrice = roundToHundredths(wholesalePrice);
    /** Сумма расходов */
    let sumCosts = new Number();
    /** Сумма комиссий */
    let sumCommissions = new Number();
    /** Сумма тарифов */
    let sumFees = new Number();

    /* Сумма расходов */
    costs.forEach(function(cost) { // Для каждого расхода в массиве расходов
        let costValue = roundToHundredths(cost.value);
        if(logs){
            console.log('cost:');
            console.log(cost);
            console.log(cost.value);
            console.log('costValue');
            console.log(costValue);
            console.log(typeof(costValue));
            console.log('sumCosts');
            console.log(sumCosts);
        };
        sumCosts = sumCosts + costValue; // Прибавляем расход в сумму расходов
    })
    if (logs) {console.log('sumCosts: ' + sumCosts);}

    /* Распределение массива комиссий на комиссии в процентах и тарифы со значением */
    commissions.forEach(function(commission) { // Для каждой комиссии в массиве комиссий
        if(commission.value == undefined && commission.percent != undefined){
            let commissionValue = roundToHundredths(commission.percent);
            sumCommissions = sumCommissions + commissionValue; // Прибавляем комиссию в сумму комиссий
        } else if(commission.value != undefined) {
            let feeValue = roundToHundredths(commission.value);
            sumFees = sumFees + feeValue; // Прибавляем тариф в сумму тарифов
        }
    })
/**
 * Сумма не может быть больше или равна 100,
 * потому что тогда в расчетах получится отрицательное число,
 * потому что сумма комиссий не может превышать стоимость товара.
 */
    if (sumCommissions >= 100) {
            console.warn("Сумма комиссий не может быть 100 или больше процентов.");
            return 'Ошибка!'; // Завершаем выполнение функции
        }

    // /* Сумма комиссий */
    // commissions.forEach(function(commission) { // Для каждой комиссии в массиве комиссий
    //     let commissionValue = roundToHundredths(commission.percent);
    //     sumCommissions = sumCommissions + commissionValue; // Прибавляем комиссию в сумму комиссий
    // })
    // if (sumCommissions >= 100) { // Сумма не может быть больше или равна 100,
    //     // потому что тогда в расчетах получится отрицательное число,
    //     // потому что сумма комиссий не может превышать стоимость товара.
    //     console.warn("Сумма комиссий не может быть 100 или больше процентов.");
    //     return 'Ошибка!'; // Завершаем выполнение функции
    // }
    // if (logs) {console.log('sumCommissions: ' + sumCommissions);}

    // /* Сумма тарифов */
    // fees.forEach(function(fee) { // Для каждого тарифа в массиве тарифов
    //     let feeValue = roundToHundredths(fee.value);
    //     sumFees = sumFees + feeValue; // Прибавляем тариф в сумму тарифов
    // })
    // if (logs) {console.log('sumFees: ' + sumFees);}

    /** Цена для маркетплейсов */
    let result = (wholesalePrice + sumCosts /*+ sumFees*/) / (1 - sumCommissions / 100); // Результат равен сумме оптовой цены, расходов и прибыли и тарифов маркетплейса, деленых на разницу 1 (100%) и суммы процентов комиссий маркетплейсов
    result = roundToHundredths(result);
    if (logs) {console.log('marketplace price: ' + result);}
    if (logs) {console.log('retailPrice done!');}
    if (logs) {console.log('');}

    return result;
}
