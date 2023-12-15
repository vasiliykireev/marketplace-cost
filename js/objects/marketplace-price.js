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
        this.value = getMaketplacePrice(unit.wholesalePrice.value, unit.costs.storage, unit.commissions.storage, unit.fees.storage);
        this.input.value = this.value;
        return this;
    }
    input = document.querySelector('.retail-price__value');
    value = new Number();

    // set value(unit) {
    //     this._value = getMaketplacePrice(unit.wholesalePrice.value, unit.costs.storage, unit.commissions.storage, unit.fees.storage)

    // }

    change(unit) {
        this.value = getMaketplacePrice(unit.wholesalePrice.value, unit.costs.storage, unit.commissions.storage, unit.fees.storage);
        this.input.value = this.value;
    }
}