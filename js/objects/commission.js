'use strict';

import { Expenditure } from "./expenditure.js";
import { roundToHundredths } from "../functions/utilities/round-to-hundredths.js";

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
     * @param {String} type Тип комиссии
     * @param {Number} value Значение
     */
    constructor(unit, expenditure, name, type, value){
        super(unit, expenditure, name);
        Object.defineProperties(this.element.name, {
            newTitle: {value: 'Новая комиссия'},
            editTitle: {value: 'Редактировать комиссию'},
        });
        this.type = 'commission';
        this.commission.type = type;
        console.log('new Commission:');
        console.log(this.type);

        switch(this.commission.type) {
            case 'commission-percent':
                this.percent = roundToHundredths(value);
                break;
            case 'commission-value':
                this.value = roundToHundredths(value);
                break;
            default:
                // ...
                break;
          }

        this.create(this.type);
        if(this.name == null) {
            this.edit();
        } else {
            this.show();
        }

    }

    // /** Процент комиссии */
    percent = new Number;
    // /** Значение комиссии */
    value = new Number;

    commission = new Object;

    /**
     * Редактировать затрату
     * - Убрать контент
     * - Вывести заголовок
     * - Вывести кнопку удаления
     * - Вывести смену типа
     * - Вывести ввод имени
     */
    edit() {
        if(logs){console.log('commission edit:');}

        this.removeContent();
        this.showHeadingEdit();
        this.showHeaderDeleteButton();
        this.showChangeType(this.commission.type);
        this.showName();

        if(logs){console.log('');}
    }
    
    /** Убрать контент
    * - Убрать изменение типа
    * - Если комиссия — процент, убрать процент
    * - Если комиссия — значение, убрать значение
    */
    removeContent() {
        this.removeChangeType();
        switch(this.commission.type) {
            case 'commission-percent':
                this.removePercent();
                break;
            case 'commission-value':
                this.removeValue();
                break;
            default:
                // ...
                break;
          }
    }

    /** Убрать переключение типа комиссии */
    removeChangeType() {
        if(logs){console.log('remove value:');}
        if(logs){console.log(this.element.percent.block);}
        if(this.element.type.block != null) {
            this.element.type.block.remove();
        }
    }
    /** Переключить комиссию
     * @param {String} type Тип комиссии
    * - Установить комиссию из переданного типа
    * - Убрать изменение типа
    * - Вывести изменение типа
    */
    replaceCommission(type) {
        this.commission.type = type;
        this.removeChangeType();
        this.showChangeType(type);

        this.unit.marketplacePrice.change(this.unit);
    }

    /**
     * Вывести затрату
     * - Убрать кнопку удаления затраты
     * - Добавляет заголовок
     * - Добавляет кнопку редактирования затраты
     * - Добавляет значение
     */
    show() {
        if(logs){
            console.log('expenditure show');
            console.log(this.name);
        }

        this.removeHeaderDeleteButton();
        this.showHeading();
        this.showHeaderEditButton();
        this.showContent();

        if(logs){console.log('');}
    }

    /** Вывести изменение типа */
    showChangeType(type) {
        console.log('function showChangeType:');
        console.log(type);

        this.element.type.block = document.createElement('div');
        this.element.type.block.classList.add('type');
        this.element.card.type.append(this.element.type.block);

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
        this.element.type.inputFormControl.setAttribute('id', 'form-' + this.id);
        this.element.type.inputFormControl.setAttribute('placeholder', null);
        this.element.type.inputFormControl.setAttribute('disabled', null);
        switch(type) {
            case 'commission-percent':
                this.element.type.inputFormControl.setAttribute('value', this.element.percent.inputTitle);
                break;
          
            case 'commission-value':
                this.element.type.inputFormControl.setAttribute('value', this.element.value.inputTitle);
                break;
          
            default:
                // ...
                break;
          }
        this.element.type.formFloating.append(this.element.type.inputFormControl);

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

        this.element.type.dropdownItemComissionPercent = document.createElement('li');
        this.element.type.dropdownMenu.append(this.element.type.dropdownItemComissionPercent);
        
        this.element.type.dropdownButtonComissionPercent = document.createElement('button');
        this.element.type.dropdownButtonComissionPercent.classList.add('dropdown-item');
        this.element.type.dropdownButtonComissionPercent.setAttribute('type', 'button');
        if(type === 'commission-percent') {this.element.type.dropdownButtonComissionPercent.setAttribute('disabled', '');}
        this.element.type.dropdownButtonComissionPercent.innerText = this.element.percent.inputTitle;
        this.element.type.dropdownItemComissionPercent.append(this.element.type.dropdownButtonComissionPercent);

        this.element.type.dropdownItemComissionValue = document.createElement('li');
        this.element.type.dropdownMenu.append(this.element.type.dropdownItemComissionValue);
        
        this.element.type.dropdownButtonComissionValue = document.createElement('button');
        this.element.type.dropdownButtonComissionValue.classList.add('dropdown-item');
        this.element.type.dropdownButtonComissionValue.setAttribute('type', 'button');
        if(type === 'commission-value') {this.element.type.dropdownButtonComissionValue.setAttribute('disabled', '');}
        this.element.type.dropdownButtonComissionValue.innerText = this.element.value.inputTitle;
        this.element.type.dropdownItemComissionValue.append(this.element.type.dropdownButtonComissionValue);

        this.element.type.dropdownButtonComissionPercent.addEventListener('click', (event) => {
            this.replaceCommission('commission-percent');
        });

        this.element.type.dropdownButtonComissionValue.addEventListener('click', (event) => {
            this.replaceCommission('commission-value');
        });
    }

    /** Вывести контент */
    showContent() {
        // this.showChangeType(this.commission.type);
        this.removeChangeType();
        switch(this.commission.type) {
            case 'commission-percent':
                this.showPercent();
                break;
            case 'commission-value':
                this.showValue();
                break;
            default:
                // ...
                break;
          }
    }

}