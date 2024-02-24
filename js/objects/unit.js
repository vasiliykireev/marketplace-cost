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

        //
        this.showPresets(this);

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
        presets: {
            dropdown: new Object,
            menu: document.querySelector('.presets__menu'),
            values: {
                ozonFBS: {
                    name: 'Ozon FBS',
                    add(unit) {
                        console.log('this =>');
                        console.log(this);
                        console.log('<= this');
                        console.log(unit.commissions.storage);
                        unit.deleteExpenditures(unit.commissions.storage);
                        new Commission(unit, unit.commissions, 'Обработка отправления', 'commission-value', 25);
                        new Commission(unit, unit.commissions, 'Логистика', 'commission-value', 76);
                        // new Commission(unit, unit.commissions, null, 'commission-percent', null);
                        // new Commission(unit, unit.commissions, null, 'commission-percent', null);
                    }
                },
                ozonFBO: {
                    name: 'Ozon FBO',
                    add() {
                        new Commission(this, this.commissions, 'Обработка отправления', 'commission-value', 25);
                        new Commission(this, this.commissions, 'Логистика', 'commission-value', 76);
                    }
                }
            }
        },

        // ozonFBS() {
        //     new Commission(this, this.commissions, 'Обработка отправления', 'commission-value', 25);
        //     new Commission(this, this.commissions, 'Логистика', 'commission-value', 76);

        // }
    }

    deleteExpenditures(expenditures) {

        if(logs){
            console.log('deleteExpenditures:');
            console.log(expenditures);
            console.log(expenditures.length);
        }
        
        while (expenditures.length > 0) {
            let counter = expenditures.length;
            if(logs){
                console.log('new counter:');
                console.log(counter);
            }
            expenditures[0].delete();
            if(logs){console.log(expenditures.length);}
            if (counter === expenditures.length) {
                if(logs){console.log('counter dont change!');}
                break;
            }
        }
    }

    showPresets(unit) {
        for (let key in this.commissions.presets.values) {

            console.log('Тест');
            console.log(this.commissions.presets.values[key].name);

            this.commissions.presets.dropdown.li = document.createElement('li');
            this.commissions.presets.menu.append(this.commissions.presets.dropdown.li);

            this.commissions.presets.dropdown.button = document.createElement('button');
            this.commissions.presets.dropdown.button.classList.add('btn', 'btn-default', 'dropdown-item');
            this.commissions.presets.dropdown.button.setAttribute('type', 'button');
            this.commissions.presets.dropdown.button.innerText = this.commissions.presets.values[key].name;
            this.commissions.presets.dropdown.li.append(this.commissions.presets.dropdown.button);

            this.commissions.presets.dropdown.button.addEventListener('click', () => {
                console.log(this);
                this.commissions.presets.values[key].add(unit);
            });

        };
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