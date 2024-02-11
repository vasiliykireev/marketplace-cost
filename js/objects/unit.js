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


/**
 * Отладка
 * @type {boolean} true: включена, false: выключена
 */
let debug = true;

/** Юнит */
export class Unit {
    /** Создает новый юнит, который включает в себя:
     * - Цену для маркетплейса
     * - Цены поставщика: пока только Оптовую цену
     * - Прибыль и расходы
     * - Комиссии макетплейса
     */
    constructor() {

        /** Выручка */
        const PROFIT = new Cost(this, this.costs, "Прибыль", 100);

        /* Примеры расходов */
        const cost10 = new Cost(this, this.costs, 'Расход 10', 10);

        /* Примеры комиссий */
        const commission20 = new Commission(this, this.commissions, 'Процент 1', 'commission-percent', 1);
        const fees30 = new Commission(this, this.commissions, 'Тариф 30', 'commission-value', 30);

        /** Кнопка добавления расходов */
        this.costs.buttonAdd.addEventListener('click', () => {
            const costNull = new Cost(this, this.costs, null, null);
        });

        /** Кнопка добавления комиссий */
        this.commissions.buttonAdd.addEventListener('click', () => {
            const commissionNull = new Commission(this, this.commissions, null, 'commission-percent', null);
        });

        /** Оптовая цена */
        this.wholesalePrice = new WholesalePrice(this, 10000);

        /** Цена для маркетплейса */
        this.marketplacePrice = new MarketplacePrice(this);

        /** Кнопка отладки */
        if(debug){this.debugUnit();}

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
    /** Кнопка для отладки */
    debugUnit() {
        this.debugUnitButton = document.createElement('button');
        this.debugUnitButton.setAttribute('type', 'button');
        this.debugUnitButton.classList.add('btn', 'btn-info', 'text-center');
        this.debugUnitButton.innerHTML = '<i class="bi bi-question-lg"></i> Отладка';
        document.querySelector('.debug').append(this.debugUnitButton);
        this.debugUnitButton.addEventListener('click', () => {
            console.log(this);
        })
    }
}