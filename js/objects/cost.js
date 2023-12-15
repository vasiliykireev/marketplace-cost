'use strict';

import { Expenditure } from "./expenditure.js";
import { roundToHundredths } from "../functions/round-to-hundredths.js";


/**
 * Логи
 * @type {boolean} true: выводить, false: не выводить
 */
let logs = true;
if(logs){console.log('cost.js');}

/**
 * Расход
 */
export class Cost extends Expenditure {
/**
 * Создает расход. Выводит расход, но если не заполнено имя, выводит редактирование затраты.
 * @param {Object} unit Объект юнита для расчета экономики
 * @param {Object} expenditure Объект типа затраты
 * @param {String} name Название расхода
 * @param {String} value Значение расхода
 */
    constructor(unit, expenditure, name, value){
        super(unit, expenditure, name);
        this.value = roundToHundredths(value);

        Object.defineProperties(this.element.name, {
            newTitle: {value: 'Новый расход'},
            editTitle: {value: 'Редактировать расход'},
        });

        this.create(this.type);
        if(this.name == null) {
            this.edit();
        } else {
            this.show();
        }
    }
    /** Значение расхода */
    value = new Number();

    /**
     * Вывести значение расхода
     * - Выводит значение расхода
     * - При изменении значения меняет значение расхода и пересчитывает юнит-экономику
     */
    showValue() {
        if(logs){
            console.log('cost showValue:');
            console.log(this.value);
        }

        this.element.value.block = document.createElement('div');
        this.element.value.block.classList.add('value');
        this.element.card.body.append(this.element.value.block);

        this.element.value.inputGroup = document.createElement('div');
        this.element.value.inputGroup.classList.add('value__input-group', 'input-group');
        this.element.value.inputGroup.classList.add('mb-2');
        this.element.value.block.append(this.element.value.inputGroup);

        this.element.value.formFloating = document.createElement('div');
        this.element.value.formFloating.classList.add('value__form-floating', 'form-floating');
        this.element.value.inputGroup.append(this.element.value.formFloating);

        this.element.value.inputFormControl = document.createElement('input');
        this.element.value.inputFormControl.classList.add('value__form-control', 'form-control');
        this.element.value.inputFormControl.setAttribute('type', 'number');
        this.element.value.inputFormControl.setAttribute('min', '0');
        this.element.value.inputFormControl.setAttribute('step', '0.01')
        this.element.value.inputFormControl.setAttribute('id', 'value-' + this.id);
        this.element.value.inputFormControl.setAttribute('placeholder', null);
        if(this.value != 0) {
            this.element.value.inputFormControl.setAttribute('value', this.value);
        }
        this.element.value.formFloating.append(this.element.value.inputFormControl);
        if(this.value == 0) {
            this.element.value.inputFormControl.focus();
        }
        this.element.value.labelForInputFormControl = document.createElement('label');
        this.element.value.labelForInputFormControl.classList.add('value-label');
        this.element.value.labelForInputFormControl.setAttribute('for', 'value-' + this.id);
        this.element.value.labelForInputFormControl.textContent = this.element.value.inputTitle;
        this.element.value.formFloating.append(this.element.value.labelForInputFormControl);

        this.element.value.inputFormControl.addEventListener('input', (event) => {
            this.value = Number(this.element.value.inputFormControl.value);
            if(logs){console.log(this.value);}
            this.unit.marketplacePrice.change(this.unit);
        })

        if(logs){console.log('');}

        return this.element.value.block;
    }
}