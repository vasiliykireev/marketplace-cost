'use strict';

import { Expenditure } from "./expenditure.js";
import { Commission } from "./commission.js";
import { roundToHundredths } from "../functions/round-to-hundredths.js";

/**
 * Логи
 * @type {boolean} true: выводить, false: не выводить
 */
let logs = true;
if(logs){console.log('commission.js');}

/**
 * Тариф
 */
export class Fee extends Commission {
    /**
     * Создает тариф. Выводит тариф, но если не заполнено имя, выводит редактирование затраты.
     * @param {Object} unit Объект юнита для расчета экономики
     * @param {Object} expenditure Объект типа затраты
     * @param {String} name Название тарифа
     * @param {String} value Значение тарифа
     */
    constructor(unit, expenditure, name, value){
        super(unit, expenditure, name);
        this.value = roundToHundredths(value);

        Object.defineProperties(this.element.name, {
            newTitle: {value: 'Новый тариф'},
            editTitle: {value: 'Редактировать тариф'},
        });

        this.create(this.type);
        if(this.name == null) {
            this.edit();
        } else {
            this.show();
        }
    }

    /** Значение тарифа */
    value = new Number();

    /**
     * Вывести значение тарифа
     * - Выводит значение тарифа
     * - При изменении значения меняет значение тарифа и пересчитывает юнит-экономику
     */
    showValue() {
        if(logs){
            console.log('fee showValue:');
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
            console.log(this.value);
            this.unit.marketplacePrice.change(this.unit);
        })

        this.element.value.inputGroupText = document.createElement('span');
        this.element.value.inputGroupText.classList.add('input-group-text');
        this.element.value.inputGroupText.innerText = this.element.value.inputCaption;
        this.element.value.inputGroup.append(this.element.value.inputGroupText);

        if(logs){console.log('');}

        return this.element.value.block;
    }

    edit() {
        if(logs){console.log('fee edit:');}
        
        // Удалить значение затраты
        this.removeValue();
        
        // Вывести заголовок
        this.showHeading();

        // Вывести кнопку удаления
        this.showHeaderDeleteButton();

        // Вывести ввод имени
        this.showName();

        if(logs){console.log('');}
    }

    // Удалить значение затраты
    removeValue() {
        if(logs){console.log('remove value:');}
        if(logs){console.log(this.element.value.block);}
        if(this.element.value.block != null) {
            this.element.value.block.remove();
        }
    }

}