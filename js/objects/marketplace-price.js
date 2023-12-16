'use strict';

import { getMaketplacePrice } from "../functions/get-marketplace-price.js";

/**
 * Логи
 * @type {boolean} true: выводить, false: не выводить
 */
let logs = true;
if(logs){console.log('expenditure.js');}

/**
 * Отладка
 * @type {boolean} true: включена, false: выключена
 */
let debug = true;

/** Цена для маркетплейсов */
export class MarketplacePrice {
    /**
     * Создает цену для маркетплейсов. Изменяет цену для маркетплейсов.
     * @param {Object} unit Объект юнита для расчета экономики
     * @returns {Object} Возвращает созданный объект
     */
    constructor(unit) {
        this.change(unit);
        return this;
    }
    /** Поле для ввода цены для маркетплейсов */
    input = document.querySelector('.retail-price__value');
    /** Значение цены для маркетплейсов  */
    value = new Number();

    /**
     * Изменить цену для маркетплейсов. Получает цену для маркетплейсов и выводит ее значение.
     * @param {*} unit Объект юнита для расчета экономики
     */
    change(unit) {
        this.value = getMaketplacePrice(unit.wholesalePrice.value, unit.costs.storage, unit.commissions.storage);
        this.input.value = this.value;
    }
}