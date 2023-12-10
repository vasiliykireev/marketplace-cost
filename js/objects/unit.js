'use strict';

import { Expenditure } from "./expenditure.js";

/**
 * Логи
 * @type {boolean} true: выводить, false: не выводить
 */
let logs = true;
if(logs){console.log('unit.js');}

let debug = true;


export class Unit {
    constructor() {
        const expenditure10 = new Expenditure(this.expenditures.storage, 'Десять', 10);
        this.expenditures.buttonAdd.addEventListener('click', () => {
            console.log('expenditure!');
            const expenditureNull = new Expenditure(this.expenditures.storage, null, null);
            console.log('unit.expenditure.storage:');
            console.log(this.expenditures.storage);
        })
        if(debug){this.debug();}
    }
    
    expenditures = {
        test: console.log('expenditure.test'),
        buttonAdd: document.querySelector('.add__cost'),
        storage: new Array(),
    };
    costs = new Object();
    commissions = Object();
    fees = new Object();

    debug() {
        console.log('displayButton');
        this.debugButton = document.createElement('button');
        this.debugButton.setAttribute('type', 'button');
        this.debugButton.classList.add('btn', 'btn-info');
        this.debugButton.innerHTML = '<i class="bi bi-question-lg"></i>';
        document.querySelector('.costs + .add .text-center').append(this.debugButton);
        this.debugButton.addEventListener('click', () => {
            console.log(this.expenditures.storage);
        })
    }

    checkButton = {
        // title: '<i class="bi bi-question-lg"></i>',
        // place: document.querySelector('.costs + .add .text-center'),
    }
}