'use strict';

import { Expenditure } from "./expenditure.js";
import { roundToHundredths } from "../functions/round-to-hundredths.js";

export class Commission extends Expenditure {
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
    // percent = new Number;

    showValue() {
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

        return this.element.percent.block;
    }
    
}