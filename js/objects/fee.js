'use strict';

import { Expenditure } from "./expenditure.js";

export class Fee extends Expenditure {
    constructor(unit, expenditure, name, value){
        super(unit, expenditure, name);
        this.value = Number(value);

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

    showValue() {
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

        return this.element.value.block;
    }
}