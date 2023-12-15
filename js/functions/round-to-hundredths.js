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

export function roundToHundredths(number) {
    if(logs){console.log('function getMaketplacePrice:');}
    let value = Math.round(Number(number)*100)/100;
    if(logs){console.log(value)};
    return value;
}