'use strict';

/**
 * Логи
 * @type {boolean} true: выводить, false: не выводить
 */
let logs = true;
if(logs){console.log('expenditure.js');}

let debug = true;

/**
 * Кнопка добавления затраты
 */
// let addExpentitureButton = document.querySelector('.add__cost');
// addExpentitureButton.addEventListener('click', () => {
//     console.log('expenditure!')
//     const expenditure = new Expenditure();
// });

/**
 * 
 * Затраты
 * - Создать
 * - Редактировать
 * - Вывести
 * - Удалить
 * 
*/
export class Expenditure {
    constructor(storage, name, value) {
        this.storage.data = storage;
        this.name.value = name;
        this.value.value = value;
        this.create();
        if(this.name.value == null) {
            this.edit();
        } else {
            this.show();
        }
    }
    storage = new Object();

    id = new Date().getTime();

    costs = document.querySelector('.costs');

    element = new Object();
    /**
     * Элемент
     * @type {{value: string}} Название
     */
    name = new Object();
    value = new Object();

    caption = {
        newTitle: 'Новая затрата',
        editTitle: 'Редактировать затрату',
        valueTitle: 'Сумма, руб.',
        newInputPlaceholder: 'Введите название',
        iconCheck: '<i class="bi bi-check"></i>',
        iconPencil: '<i class="bi bi-pencil-fill"></i>',
        iconTrash: '<i class="bi bi-trash-fill"></i>',

    }

    checkButton = {
        title: '<i class="bi bi-question-lg"></i>',
    }

    /**
     * Создать
     */
    create() {
        console.log('create');
        this.storage.data.push(this);
        // this.storage.index = this.storage.data.indexOf(this);

        console.log('expenditure.storage:');
        console.log(this.storage.index);
        console.log(this.storage.data);

        this.element.section = document.createElement('div');
        this.element.section.classList.add('expenditure');
        this.costs.append(this.element.section);

        this.element.card = document.createElement('div');
        this.element.card.classList.add('card');
        this.element.card.classList.add('mb-3');
        this.element.section.append(this.element.card);

        this.element.cardHeader = document.createElement('div');
        this.element.cardHeader.classList.add('card-header');
        this.element.card.append(this.element.cardHeader);

        this.element.cardHeaderRow = document.createElement('div');
        this.element.cardHeaderRow.classList.add('row', 'align-items-center');
        this.element.cardHeader.append(this.element.cardHeaderRow);

        this.element.cardHeaderHeadingCol = document.createElement('div');
        this.element.cardHeaderHeadingCol.classList.add('col');
        this.element.cardHeaderRow.append(this.element.cardHeaderHeadingCol);

        this.element.cardHeaderHeading = document.createElement('h3');
        this.element.cardHeaderHeading.classList.add('h5');
        this.element.cardHeaderHeading.classList.add('mb-0');
        this.element.cardHeaderHeadingCol.append(this.element.cardHeaderHeading);

        this.element.cardHeaderExtraCol = document.createElement('div');
        this.element.cardHeaderExtraCol.classList.add('col-auto', 'pe-0');
        this.element.cardHeaderRow.append(this.element.cardHeaderExtraCol);

        this.element.cardHeaderEditCol = document.createElement('div');
        this.element.cardHeaderEditCol.classList.add('col-auto');
        this.element.cardHeaderRow.append(this.element.cardHeaderEditCol);

        this.element.cardBody = document.createElement('div');
        this.element.cardBody.classList.add('card-body');
        this.element.card.append(this.element.cardBody);

        if(debug){this.check();}
    }
    /**
     * Редактировать
     */
    edit() {
        console.log('edit');
        if(this.value.inputGroup != null) {
            this.value.inputGroup.remove();
        }
        
        if(this.name.value == null) {
            this.element.cardHeaderHeading.textContent = this.caption.newTitle;
            this.name.value = '';
        } else {
            this.element.cardHeaderHeading.textContent = this.caption.editTitle;
        }

        this.element.cardHeaderDeleteButton = document.createElement('button');
        this.element.cardHeaderDeleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        this.element.cardHeaderDeleteButton.setAttribute('type', 'button');
        this.element.cardHeaderDeleteButton.innerHTML = this.caption.iconTrash;
        this.element.cardHeaderEditCol.append(this.element.cardHeaderDeleteButton);

        this.element.cardHeaderDeleteButton.addEventListener('click', (event) => {
            // this.element.section.remove();
            this.delete();
        })

        this.name.inputGroup = document.createElement('div');
        this.name.inputGroup.classList.add('input-group');
        this.name.inputGroup.classList.add('mb-2');
        this.element.cardBody.append(this.name.inputGroup);

        this.name.formFloating = document.createElement('div');
        this.name.formFloating.classList.add('form-floating');
        this.name.inputGroup.append(this.name.formFloating);

        this.name.inputFormControl = document.createElement('input');
        this.name.inputFormControl.classList.add('form-control');
        // this.name.inputFormControl.classList.add('border', 'border-primary-subtle', 'focus-ring', 'focus-ring-primary');
        this.name.inputFormControl.setAttribute('type', 'text');
        this.name.inputFormControl.setAttribute('id', this.id);
        this.name.inputFormControl.setAttribute('placeholder', null);
        this.name.inputFormControl.setAttribute('required',true);
        if(this.name.value !== undefined) {
            this.name.inputFormControl.setAttribute('value', this.name.value);
        }
        this.name.formFloating.append(this.name.inputFormControl);
        this.name.inputFormControl.focus();
        this.name.inputFormControl.selectionStart = this.name.inputFormControl.value.length;

        this.name.labelForInputFormControl = document.createElement('label');
        // this.name.labelForInputFormControl.classList.add('form-control-label');
        this.name.labelForInputFormControl.setAttribute('for', this.id);
        this.name.labelForInputFormControl.textContent = this.caption.newInputPlaceholder;
        this.name.formFloating.append(this.name.labelForInputFormControl);

        this.name.feedback = document.createElement('div');
        // this.name.feedback.classList.add('feedback');
        // this.name.feedback.textContent = 'фидбек';
        this.element.cardBody.append(this.name.feedback);
        // <div class="invalid-feedback"></div>

        this.name.saveButton = document.createElement('button');
        this.name.saveButton.classList.add('btn', 'btn-primary');
        this.name.saveButton.setAttribute('type', 'button');
        this.name.saveButton.innerHTML = this.caption.iconCheck;
        this.name.inputGroup.append(this.name.saveButton);

        this.name.saveButton.addEventListener('click', (event) => {
            this.saveName();
        });
        this.name.inputFormControl.addEventListener('keypress', (event) => {
            if(event.key === 'Enter') {
                this.saveName();
            }
        })

    }
    /**
     * Сохранить имя
     */
    saveName() {
        if(this.name.inputFormControl.value.length !== 0) {
            this.name.value = this.name.inputFormControl.value;
            this.element.cardHeaderHeading.textContent = this.name.value;
            this.name.inputGroup.remove()
            this.show();
        } else {


// <div class="invalid-feedback">Example invalid feedback text</div>
            // this.name.feedback.classList.add('invalid-feedback');
            // this.name.feedback.innerHTML = 'Введите название';
            alert('Введите название!');
            this.name.inputFormControl.focus();
        }
    }

    /**
     * Вывести
     */
    show() {

        console.log('show');

        console.log(this.name.value);

        if(this.element.cardHeaderDeleteButton !== undefined) {
            this.element.cardHeaderDeleteButton.remove();
        }

        if(this.name.value == null) {
            this.element.cardHeaderHeading.textContent = this.caption.newTitle;
        } else {
            this.element.cardHeaderHeading.textContent = this.name.value;
        }

        this.element.cardHeaderEditButton = document.createElement('button');
        this.element.cardHeaderEditButton.classList.add('btn', 'btn-outline-secondary', 'btn-sm', 'border-0');
        this.element.cardHeaderEditButton.setAttribute('type', 'button');
        this.element.cardHeaderEditButton.innerHTML = this.caption.iconPencil;
        this.element.cardHeaderEditCol.append(this.element.cardHeaderEditButton);

        this.element.cardHeaderEditButton.addEventListener('click', (event) => {
            this.element.cardHeaderEditButton.remove();
            // this.element.cardHeaderHeading.remove();
            this.edit();
        })
        this.showValue();
    }

    /**
     * Вывести значение
     */
    showValue() {
        this.value.inputGroup = document.createElement('div');
        this.value.inputGroup.classList.add('input-group');
        this.value.inputGroup.classList.add('mb-2');
        this.element.cardBody.append(this.value.inputGroup);

        this.value.formFloating = document.createElement('div');
        this.value.formFloating.classList.add('form-floating');
        this.value.inputGroup.append(this.value.formFloating);

        this.value.inputFormControl = document.createElement('input');
        this.value.inputFormControl.classList.add('form-control');
        // this.value.inputFormControl.classList.add('border', 'border-light-subtle', 'focus-ring', 'focus-ring-secondary');
        this.value.inputFormControl.setAttribute('type', 'number');
        this.value.inputFormControl.setAttribute('min', '0');
        this.value.inputFormControl.setAttribute('step', '0.01')
        this.value.inputFormControl.setAttribute('id', this.id);
        this.value.inputFormControl.setAttribute('placeholder', null);
        if(this.value.value !== undefined) {
            this.value.inputFormControl.setAttribute('value', this.value.value);
        }
        this.value.formFloating.append(this.value.inputFormControl);
        this.value.inputFormControl.focus();
        // this.value.inputFormControl.selectionStart = this.value.inputFormControl.value.length;

        this.value.labelForInputFormControl = document.createElement('label');
        // this.name.labelForInputFormControl.classList.add('form-control-label');
        this.value.labelForInputFormControl.setAttribute('for', this.id);
        this.value.labelForInputFormControl.textContent = this.caption.valueTitle;
        this.value.formFloating.append(this.value.labelForInputFormControl);

        this.value.inputFormControl.addEventListener('input', (event) => {
            this.value.value = this.value.inputFormControl.value;
            console.log(this.value);
        })
    }

    delete() {
        // this.storage.index = this.storage.data.indexOf(this);
        // this.storage.data.splice(this.storage.index, 1);
        this.storage.data.splice(this.storage.data.indexOf(this), 1);

        this.element.section.remove();
        this.element.cardHeaderHeading.classList.add('text-danger');
        console.log('this.storage.data:')
        console.log(this.storage.data);
            

    }

    check() {
        this.checkButton.button = document.createElement('button');
        this.checkButton.button.classList.add('btn', 'btn-info', 'btn-sm');
        this.checkButton.button.setAttribute('type', 'button');
        this.checkButton.button.innerHTML = this.checkButton.title;
        this.element.cardHeaderExtraCol.append(this.checkButton.button);
        this.checkButton.button.addEventListener('click', (event) => {
            console.log(this.storage);
        })

    }
}


    // ---

//     captionNew = 'Новая затрата';
//     captionNewName = 'Введите название';
//     // captionSaveName = 'Сохранить';
//     captionSaveName = '<i class="bi bi-check"></i>';
//     captionEdit = '<i class="bi bi-pencil-fill"></i>';

//     id = new Date().getTime();

//     constructor(name, value) {

//         // this.value = value.toFixed(2);
//         this.section = this.displayExpenditure('expenditure');

//         this.card = this.displayCard(this.section);

//         this.cardHeader = this.displayCardHeader(this.card);
//         this.cardHeaderRow = this.displayRow(this.cardHeader, 'align-items-center');
//         this.cardHeaderHeadingCol = this.displayCol(this.cardHeaderRow, 'col');
//         this.cardHeaderHeading = this.displayCardHeaderHeading(this.cardHeaderHeadingCol, this.captionNew);

//         this.cardBody = this.displayCardBody(this.card);

//         this.nameInputGroup = this.displayInputGroup(this.cardBody);
//         this.nameFormFloating = this.displayFormFloating(this.nameInputGroup);
//         this.nameInputFormControl = this.displayFormControlText(this.nameFormFloating, this.id);
//         this.nameLabelForInputFormControl = this.displayLabel(this.nameFormFloating, this.id, this.captionNewName);

//         this.settingsSaveButton = this.displayButton(this.nameInputGroup, 'button', 'btn-primary', this.captionSaveName);
//         this.settingsSaveButton.addEventListener('click', (event) => {
//             this.cardHeaderHeading.textContent = this.nameInputFormControl.value;
//             this.removeElement(this.nameInputGroup)
//             this.cardHeaderEditCol = this.displayCol(this.cardHeaderRow, 'col-auto');
//             this.cardHeaderEditButton = this.displayButton(this.cardHeaderEditCol, 'button', 'btn-outline-secondary', this.captionEdit, 'btn-sm');
//             this.cardHeaderEditButton.addEventListener('click', (event) => {
//                 this.cardHeaderEditCol.remove()
//                 this.nameInputGroup = this.displayInputGroup(this.cardBody);
//                 this.nameFormFloating = this.displayFormFloating(this.nameInputGroup);
//                 this.nameInputFormControl = this.displayFormControlText(this.nameFormFloating, this.id);
//                 this.nameLabelForInputFormControl = this.displayLabel(this.nameFormFloating, this.id, this.captionNewName);
//                 this.settingsSaveButton = this.displayButton(this.nameInputGroup, 'button', 'btn-primary', this.captionSaveName);
//             })
//         })
//         console.log(this);
//     }
// }