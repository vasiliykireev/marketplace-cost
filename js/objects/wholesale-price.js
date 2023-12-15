'use strict';

/**
 * Логи
 * @type {boolean} true: выводить, false: не выводить
 */
let logs = true;
if(logs){console.log('wholesale-price.js');}

/**
 * Оптовая цена
 */
export class WholesalePrice {
    /**
     * Создает оптовую цену
     * @param {Object} unit Объект юнита для расчета экономики
     * @param {Number} value Значение оптовой цены
     * @returns 
     */
    constructor(unit, value) {
        this.unit = unit;
        this.value = Number(value);
        this.input.value = this.value;
        this.input.addEventListener('input', (event) => {
            this.value = this.input.value;
            console.log(this);
            this.unit.marketplacePrice.change(this.unit);
        })
        return this;
    }
    /** Поле для ввода оптовой цены */
    input = document.querySelector('.wholesale-price__number');
    /** Значение оптовой цены */
    value = new Number();
}