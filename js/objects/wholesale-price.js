'use strict';

/**
 * Логи
 * @type {boolean} true: выводить, false: не выводить
 */
let logs = true;
if(logs){console.log('wholesale-price.js');}

/**
 * Отладка
 * @type {boolean} true: включена, false: выключена
 */
let debug = true;

export class WholesalePrice {
    constructor(value) {
        this.input.value = value;
        this.input.addEventListener('input', (event) => {
            this.wholesalePrice.value = this.wholesalePrice.input.value;
            console.log(this.wholesalePrice);
        })
    }
    input = document.querySelector('.wholesale-price__number');
    value = new Number();
}