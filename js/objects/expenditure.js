'use strict';

/**
 * Логи
 * @type {boolean} true: выводить, false: не выводить
 */
let logs = true;

if(logs){console.log('expenditure.js');}

/**
 * Кнопка добавления затраты
 */
let addExpentitureButton = document.querySelector('.add__cost');
addExpentitureButton.addEventListener('click', () => {
    console.log('expenditure!')
    const expenditure = new Expenditure('new', 19.123456);
});

/**
 * Затраты
 */
export class Expenditure {
    costs = document.querySelector('.costs');

    captionNew = 'Новая затрата';
    captionNewName = 'Введите название';
    // captionSaveName = 'Сохранить';
    captionSaveName = '<i class="bi bi-check"></i>';
    captionEdit = '<i class="bi bi-pencil-fill"></i>';

    id = new Date().getTime();

    constructor(name, value) {

        // this.value = value.toFixed(2);
        this.section = this.displayExpenditure('expenditure');

        this.card = this.displayCard(this.section);

        this.cardHeader = this.displayCardHeader(this.card);
        this.cardHeaderRow = this.displayRow(this.cardHeader, 'align-items-center');
        this.cardHeaderHeadingCol = this.displayCol(this.cardHeaderRow, 'col');
        this.cardHeaderHeading = this.displayCardHeaderHeading(this.cardHeaderHeadingCol, this.captionNew);

        this.cardBody = this.displayCardBody(this.card);

        this.nameInputGroup = this.displayInputGroup(this.cardBody);
        this.nameFormFloating = this.displayFormFloating(this.nameInputGroup);
        this.nameInputFormControl = this.displayFormControlText(this.nameFormFloating, this.id);
        this.nameLabelForInputFormControl = this.displayLabel(this.nameFormFloating, this.id, this.captionNewName);

        this.settingsSaveButton = this.displayButton(this.nameInputGroup, 'button', 'btn-primary', this.captionSaveName);
        this.settingsSaveButton.addEventListener('click', (event) => {
            this.cardHeaderHeading.textContent = this.nameInputFormControl.value;
            this.removeElement(this.nameInputGroup)
            this.cardHeaderEditCol = this.displayCol(this.cardHeaderRow, 'col-auto');
            this.cardHeaderEditButton = this.displayButton(this.cardHeaderEditCol, 'button', 'btn-outline-secondary', this.captionEdit, 'btn-sm');
            this.cardHeaderEditButton.addEventListener('click', (event) => {
                this.cardHeaderEditCol.remove()
                this.nameInputGroup = this.displayInputGroup(this.cardBody);
                this.nameFormFloating = this.displayFormFloating(this.nameInputGroup);
                this.nameInputFormControl = this.displayFormControlText(this.nameFormFloating, this.id);
                this.nameLabelForInputFormControl = this.displayLabel(this.nameFormFloating, this.id, this.captionNewName);
                this.settingsSaveButton = this.displayButton(this.nameInputGroup, 'button', 'btn-primary', this.captionSaveName);
            })
        })

        console.log(this);
    }

    displayExpenditure(type) {
        const div = document.createElement('div');
        div.classList.add(type);
        this.costs.append(div);
        return div;
    }

    displayCard(place) {
        const div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('mb-3');
        place.append(div);
        return div;
    }

    displayCardHeader(place, content) {
        const div = document.createElement('div');
        div.classList.add('card-header');
        div.textContent = content;
        place.append(div);
        return div;
    }

    // displayCardHeaderRow(place) {
    //     const div = document.createElement('div');
    //     div.classList.add('row', 'align-items-center');
    //     place.append(div);
    //     return div;
    // }

    // displayCardHeaderHeadingCol(place) {
    //     const div = document.createElement('div');
    //     div.classList.add('col');
    //     place.append(div);
    //     return div;
    // }

    displayCardHeaderHeading(place, content) {
        const h3 = document.createElement('h3');
        h3.classList.add('h5');
        h3.classList.add('mb-0');
        h3.textContent = content;
        place.append(h3);
        return h3;
    }

    displayCardBody(place, content) {
        const div = document.createElement('div');
        div.classList.add('card-body');
        div.textContent = content;
        place.append(div);
        return div;
    }

    displayInputGroup(place) {
        const div = document.createElement('div');
        div.classList.add('input-group');
        div.classList.add('mb-2');
        place.append(div);
        return div;
    }

    displayFormFloating(place) {
        const div = document.createElement('div');
        div.classList.add('form-floating');
        place.append(div);
        return div;
    }

    displayFormControlText(place, id) {
        const input = document.createElement('input');
        input.classList.add('form-control');
        input.setAttribute('type', 'text');
        input.setAttribute('id', id);
        input.setAttribute('placeholder', null);
        // input.setAttribute('value', null);
        place.append(input);
        input.focus();
        return input;
    }

    displayLabel(place, id, content) {
        const label = document.createElement('label');
        // label.classList.add('form-control-label');
        label.setAttribute('for', id);
        label.textContent = content;
        place.append(label);
        return label;
    }

    // displayRow(place) {
    //     const div = document.createElement('div');
    //     div.classList.add('row', 'align-items-end', 'align-self-center', 'justify-content-center');
    //     place.append(div);
    //     return div;
    // }

    // displayCol(place) {
    //     const div = document.createElement('div');
    //     div.classList.add('col-auto');
    //     place.append(div);
    //     return div;
    // }

    displayButton(place, type, className, caption, size) {
        const button = document.createElement('button');
        button.classList.add('btn', className);
        button.classList.add('btn', size);
        button.setAttribute('type', type);
        button.innerHTML = caption;
        place.append(button);
        return button;
    }

    displayRow(place, className) {
        const div = document.createElement('div');
        div.classList.add('row', className);
        place.append(div);
        return div;
    }

    displayCol(place, className) {
        const div = document.createElement('div');
        div.classList.add(className);
        place.append(div);
        return div;
    }

    removeElement(element) {
        element.remove();
    }
}