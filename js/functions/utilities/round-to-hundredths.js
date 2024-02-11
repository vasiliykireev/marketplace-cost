'use strict';

/**
 * Логи
 * @type {boolean} true: выводить, false: не выводить
 */
let logs = true;
if(logs){console.log('round-to-hundreths.js');}

/**
 * Отладка
 * @type {boolean} true: включена, false: выключена
 */
let debug = true;

/**
 * Округлить до сотых — умножает число на 100, округляет до целых и делит на 100. Тем самым округляя до сотых.
 * @param {Number} number Число
 * @returns {Number} 
 */
export function roundToHundredths(number) {
    if(logs){console.log('function roundToHundredths:');}
    let value = Math.round(Number(number)*100)/100;
    if(logs){console.log(value)};
    if(logs){console.log('');}
    return value;
}