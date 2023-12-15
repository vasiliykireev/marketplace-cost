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

export class MarketplacePrice {
    constructor(unit) {
        this.input.value = getMaketplacePrice(unit.wholesalePrice.value, unit.costs.storage, unit.commissions.storage, unit.fees.storage);
        return this;
    }
    input = document.querySelector('.retail-price__value');
}