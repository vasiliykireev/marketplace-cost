'use strict';

import { WholesalePrice } from './wholesale-price.js';
import { MarketplacePrice } from './marketplace-price.js';

import { Cost } from './cost.js';
import { Commission } from './commission.js';
// import { CommissionPercent } from './commission-percent.js';
// import { CommissionValue } from './commission-value.js';
// import { Fee } from './fee.js';


/**
 * Логи
 * @type {boolean} true: выводить, false: не выводить
 */
let logs = true;
if(logs){console.log('unit.js');}

let debug = true;

/**
 * Юнит
 */
export class Unit {
    /**
     * Создает расход, комиссию и тариф, и добавляет создание новых по нажатию на кнопку
     */
    constructor() {
        const PROFIT = new Cost(this, this.costs, "Прибыль", null)
        const cost10 = new Cost(this, this.costs, 'Расход 10', 10);
        this.costs.buttonAdd.addEventListener('click', () => {
            const costNull = new Cost(this, this.costs, null, null);
        })
        if(debug){this.debugCosts();}

        const commission20 = new Commission(this, this.commissions, 'Процент 1', 'commission-percent', 1);
        this.commissions.buttonAdd.addEventListener('click', () => {
            const commissionNull = new Commission(this, this.commissions, null, 'commission-percent', null);
        })

        const fees30 = new Commission(this, this.commissions, 'Тариф 30', 'commission-value', 30);
        this.fees.buttonAdd.addEventListener('click', () => {
            const feeNull = new Commission(this, this.commissions, null, 'comission-value', null);
        })

        this.wholesalePrice = new WholesalePrice(this, 10000);

        this.marketplacePrice = new MarketplacePrice(this);


    }
    /** Данные для расходов */
    costs = {
        type: 'cost',
        buttonAdd: document.querySelector('.add__cost'),
        container: document.querySelector('.costs'),
        storage: new Array(),
    }
    /** Данные для комиссий */
    commissions = {
        // type: 'commission',
        buttonAdd: document.querySelector('.add__commission'),
        container: document.querySelector('.commissions'),
        storage: new Array(),
    }
    /** Данные для тарифов */
    fees = {
        // type: 'fee',
        buttonAdd: document.querySelector('.add__fee'),
        container: document.querySelector('.fees'),
        storage: new Array(),
    }
    /** Кнопка для отладки */
    debugCosts() {
        this.debugCostsButton = document.createElement('button');
        this.debugCostsButton.setAttribute('type', 'button');
        this.debugCostsButton.classList.add('btn', 'btn-info');
        this.debugCostsButton.innerHTML = '<i class="bi bi-question-lg"></i>';
        document.querySelector('.costs + .add .text-center').append(this.debugCostsButton);
        this.debugCostsButton.addEventListener('click', () => {
            console.log(this);
        })
    }

}