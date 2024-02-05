'use strict';

import { Expenditure } from "./expenditure.js";
import { roundToHundredths } from "../functions/round-to-hundredths.js";

/**
 * Логи
 * @type {boolean} true: выводить, false: не выводить
 */
let logs = true;
if(logs){console.log('commission.js');}

/**
 * Комиссия
 */
export class Commission extends Expenditure {
    /**
     * Создает комиссию. Выводит комиссию, но если не заполнено имя, выводит редактирование затраты.
     * @param {Object} unit Объект юнита для расчета экономики
     * @param {Object} expenditure Объект типа комиссии
     * @param {String} name Название комиссии
     * @param {Number} percent Процент комиссии
     */
    constructor(unit, expenditure, name, percent){
        super(unit, expenditure, name);
        this.percent = roundToHundredths(percent);

        Object.defineProperties(this.element.name, {
            newTitle: {value: 'Новая комиссия'},
            editTitle: {value: 'Редактировать комиссию'},
        });

        this.create(this.type);
        if(this.name == null) {
            this.edit();
        } else {
            this.show();
        }
    }

    /** Процент комиссии */
    percent = new Number;

    /**
     * Вывести значение расхода
     * - Выводит значение расхода
     * - При изменении значения меняет значение расхода и пересчитывает юнит-экономику
     */
    showValue() {
        if(logs){
            console.log('commission showValue:');
            console.log(this.value);
        }

        this.element.percent.block = document.createElement('div');
        this.element.percent.block.classList.add('value');
        this.element.card.body.append(this.element.percent.block);

        this.element.percent.inputGroup = document.createElement('div');
        this.element.percent.inputGroup.classList.add('value__input-group', 'input-group');
        this.element.percent.inputGroup.classList.add('mb-2');
        this.element.percent.block.append(this.element.percent.inputGroup);

        this.element.percent.formFloating = document.createElement('div');
        this.element.percent.formFloating.classList.add('value__form-floating', 'form-floating');
        this.element.percent.inputGroup.append(this.element.percent.formFloating);

        this.element.percent.inputFormControl = document.createElement('input');
        this.element.percent.inputFormControl.classList.add('value__form-control', 'form-control');
        this.element.percent.inputFormControl.setAttribute('type', 'number');
        this.element.percent.inputFormControl.setAttribute('min', '0');
        this.element.percent.inputFormControl.setAttribute('step', '0.01')
        this.element.percent.inputFormControl.setAttribute('id', 'value-' + this.id);
        this.element.percent.inputFormControl.setAttribute('placeholder', null);
        if(this.percent != 0) {
            this.element.percent.inputFormControl.setAttribute('value', this.percent);
        } 
        this.element.percent.formFloating.append(this.element.percent.inputFormControl);
        if(this.percent == 0) {
            this.element.percent.inputFormControl.focus();
        }

        this.element.percent.labelForInputFormControl = document.createElement('label');
        this.element.percent.labelForInputFormControl.classList.add('value-label');
        this.element.percent.labelForInputFormControl.setAttribute('for', 'value-' + this.id);
        this.element.percent.labelForInputFormControl.textContent = this.element.percent.inputTitle;
        this.element.percent.formFloating.append(this.element.percent.labelForInputFormControl);

        this.element.percent.inputFormControl.addEventListener('input', (event) => {
            this.percent = Number(this.element.percent.inputFormControl.value);
            console.log(this.percent);
            this.unit.marketplacePrice.change(this.unit);
        })

        this.element.percent.inputGroupText = document.createElement('span');
        this.element.percent.inputGroupText.classList.add('input-group-text');
        this.element.percent.inputGroupText.innerText = this.element.percent.inputCaption;
        this.element.percent.inputGroup.append(this.element.percent.inputGroupText);

        if(logs){console.log('');}

        return this.element.percent.block;
    }
    
    edit() {
        if(logs){console.log('commission edit:');}
        
        // Удалить значение затраты
        this.removeValue();
        
        // Вывести заголовок
        this.showHeading();

        // Вывести кнопку удаления
        this.showButtonDelete();

        // Вывести смену типа
        this.showChangeType('commission');

        // Вывести ввод имени
        this.showName();

        if(logs){console.log('');}
    }

    showChangeType(type) {
        this.element.type.block = document.createElement('div');
        this.element.type.block.classList.add('type');
        this.element.card.body.append(this.element.type.block);

        this.element.type.inputGroup = document.createElement('div');
        this.element.type.inputGroup.classList.add('type__input-group', 'input-group');
        this.element.type.inputGroup.classList.add('mb-2');
        this.element.type.block.append(this.element.type.inputGroup);

        this.element.type.formFloating = document.createElement('div');
        this.element.type.formFloating.classList.add('type__form-floating', 'form-floating');
        this.element.type.inputGroup.append(this.element.type.formFloating);

        this.element.type.inputFormControl = document.createElement('input');
        this.element.type.inputFormControl.classList.add('form__form-control', 'form-control');
        this.element.type.inputFormControl.setAttribute('type', 'string');
        // this.element.type.inputFormControl.setAttribute('min', '0');
        // this.element.type.inputFormControl.setAttribute('step', '0.01')
        this.element.type.inputFormControl.setAttribute('id', 'form-' + this.id);
        this.element.type.inputFormControl.setAttribute('placeholder', null);
        this.element.type.inputFormControl.setAttribute('disabled', null);
        this.element.type.inputFormControl.setAttribute('value', 'Комиссия');
        // if(this.value != 0) {
        //     this.element.type.inputFormControl.setAttribute('value', this.value);
        // }
        this.element.type.formFloating.append(this.element.type.inputFormControl);
        // if(this.value == 0) {
        //     this.element.type.inputFormControl.focus();
        // }
        this.element.type.labelForInputFormControl = document.createElement('label');
        this.element.type.labelForInputFormControl.classList.add('type-label');
        this.element.type.labelForInputFormControl.setAttribute('for', 'type-' + this.id);
        this.element.type.labelForInputFormControl.textContent = 'Тип комиссии';
        this.element.type.formFloating.append(this.element.type.labelForInputFormControl);

        this.element.type.dropdownToggle = document.createElement('button');
        this.element.type.dropdownToggle.classList.add('btn', 'btn-secondary', 'dropdown-toggle');
        this.element.type.dropdownToggle.setAttribute('type', 'button');
        this.element.type.dropdownToggle.setAttribute('data-bs-toggle', 'dropdown');
        this.element.type.dropdownToggle.setAttribute('aria-expanded', 'false');
        this.element.type.inputGroup.append(this.element.type.dropdownToggle);

        this.element.type.dropdownMenu = document.createElement('ul');
        this.element.type.dropdownMenu.classList.add('dropdown-menu');
        this.element.type.inputGroup.append(this.element.type.dropdownMenu);

        this.element.type.dropdownItemComission = document.createElement('li');
        this.element.type.dropdownMenu.append(this.element.type.dropdownItemComission);
        
        this.element.type.dropdownButtonComission = document.createElement('button');
        this.element.type.dropdownButtonComission.classList.add('dropdown-item');
        if(type === 'commission') {this.element.type.dropdownButtonComission.setAttribute('disabled', '');}
        this.element.type.dropdownButtonComission.innerText = 'Комиссия';
        this.element.type.dropdownItemComission.append(this.element.type.dropdownButtonComission);

        this.element.type.dropdownItemFee = document.createElement('li');
        this.element.type.dropdownMenu.append(this.element.type.dropdownItemFee);
        
        this.element.type.dropdownButtonFee = document.createElement('button');
        this.element.type.dropdownButtonFee.classList.add('dropdown-item');
        if(type === 'fee') {this.element.type.dropdownButtonFee.setAttribute('disabled', '');}
        this.element.type.dropdownButtonFee.innerText = 'Тариф';
        this.element.type.dropdownItemFee.append(this.element.type.dropdownButtonFee);
    }

}