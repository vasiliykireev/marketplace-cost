'use strict';

import { Expenditure } from './expenditure.js';
import { Cost } from './cost.js';
import { Commission } from './commission.js';
import { Fee } from './fee.js';

/**
 * Логи
 * @type {boolean} true: выводить, false: не выводить
 */
let logs = true;
if(logs){console.log('unit.js');}

let debug = true;


export class Unit {
    constructor() {
        this.wholesalePrice.value = 1000;
        this.wholesalePrice.input.value = this.wholesalePrice.value;
        this.wholesalePrice.input.addEventListener('input', (event) => {
            this.wholesalePrice.value = this.wholesalePrice.input.value;
            console.log(this.wholesalePrice);
        })

        const cost10 = new Cost(this.costs, 'Расход 10', 10);
        this.costs.buttonAdd.addEventListener('click', () => {
            const costNull = new Cost(this.costs, null, null);
        })
        if(debug){this.debugCosts();}

        const commission20 = new Commission(this.commissions, 'Комиссия 1', 1);
        this.commissions.buttonAdd.addEventListener('click', () => {
            const commissionNull = new Commission(this.commissions, null, null);
        })
        // if(debug){this.debugCommissions();}

        const fees30 = new Fee(this.fees, 'Тариф 30', 30);
        this.fees.buttonAdd.addEventListener('click', () => {
            const feeNull = new Fee(this.fees, null, null);
        })

    }
    
    // expenditures = {
    //     buttonAdd: document.querySelector('.add__cost'),
    //     storage: new Array(),
    // };

    costs = {
        type: 'cost',
        buttonAdd: document.querySelector('.add__cost'),
        container: document.querySelector('.costs'),
        storage: new Array(),
    }

    commissions = {
        type: 'commission',
        buttonAdd: document.querySelector('.add__commission'),
        container: document.querySelector('.commissions'),
        storage: new Array(),
    }

    fees = {
        type: 'fee',
        buttonAdd: document.querySelector('.add__fee'),
        container: document.querySelector('.fees'),
        storage: new Array(),
    }

    wholesalePrice = {
        input: document.querySelector('.wholesale-price__number'),
        value: new Number(),
    }

    debugCosts() {
        this.debugCostsButton = document.createElement('button');
        this.debugCostsButton.setAttribute('type', 'button');
        this.debugCostsButton.classList.add('btn', 'btn-info');
        this.debugCostsButton.innerHTML = '<i class="bi bi-question-lg"></i>';
        document.querySelector('.costs + .add .text-center').append(this.debugCostsButton);
        this.debugCostsButton.addEventListener('click', () => {
            console.log(this.costs.storage);
        })
    }

}