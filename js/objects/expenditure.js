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
    const expenditure = new Expenditure();
});

/**
 * 
 * Затраты
 * - Создать
 * - Назвать / Переименовать
 * - Вывести
 * - Удалить
 * 
*/
export class Expenditure {
    id = new Date().getTime();

    costs = document.querySelector('.costs');

    element = new Object();
    name = new Object();


    caption = {
        newTitle: 'Новая затрата',
        editTitle: 'Редактировать затрату',
        newInputPlaceholder: 'Введите название',
        iconCheck: '<i class="bi bi-check"></i>',
        iconPencil: '<i class="bi bi-pencil-fill"></i>',
        iconTrash: '<i class="bi bi-trash-fill"></i>',

    }

    constructor() {
        this.create();

    }

    create() {
        console.log('create');

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

        this.element.cardHeaderEditCol = document.createElement('div');
        this.element.cardHeaderEditCol.classList.add('col-auto');
        this.element.cardHeaderRow.append(this.element.cardHeaderEditCol);

        this.element.cardBody = document.createElement('div');
        this.element.cardBody.classList.add('card-body');
        this.element.card.append(this.element.cardBody);

        this.edit(true);
    }

    edit() {
        console.log('edit');

        this.element.cardHeaderHeading = document.createElement('h3');
        this.element.cardHeaderHeading.classList.add('h5');
        this.element.cardHeaderHeading.classList.add('mb-0');
        if(this.name.value === undefined) {
            this.element.cardHeaderHeading.textContent = this.caption.newTitle;
        } else {
            this.element.cardHeaderHeading.textContent = this.caption.editTitle;
        }

        this.element.cardHeaderHeadingCol.append(this.element.cardHeaderHeading);

        this.element.cardHeaderDeleteButton = document.createElement('button');
        this.element.cardHeaderDeleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        this.element.cardHeaderDeleteButton.setAttribute('type', 'button');
        this.element.cardHeaderDeleteButton.innerHTML = this.caption.iconTrash;
        this.element.cardHeaderEditCol.append(this.element.cardHeaderDeleteButton);

        this.element.cardHeaderDeleteButton.addEventListener('click', (event) => {
            this.element.section.remove();
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
        this.name.inputFormControl.setAttribute('type', 'text');
        this.name.inputFormControl.setAttribute('id', this.id);
        this.name.inputFormControl.setAttribute('placeholder', null);
        if(this.name.value !== undefined) {
            this.name.inputFormControl.setAttribute('value', this.name.value);
        }
        this.name.formFloating.append(this.name.inputFormControl);
        this.name.inputFormControl.focus();

        this.name.labelForInputFormControl = document.createElement('label');
        // this.name.labelForInputFormControl.classList.add('form-control-label');
        this.name.labelForInputFormControl.setAttribute('for', this.id);
        this.name.labelForInputFormControl.textContent = this.caption.newInputPlaceholder;
        this.name.formFloating.append(this.name.labelForInputFormControl);

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

    saveName() {
        if(this.name.inputFormControl.value.length !== 0) {
            this.name.value = this.name.inputFormControl.value;
            this.element.cardHeaderHeading.textContent = this.name.value;
            this.name.inputGroup.remove()
            this.show();
        } else {
            alert('Введите название!');
            // this.name.inputFormControl.focus();
        }
    }

    show() {

        console.log('show');

        this.element.cardHeaderDeleteButton.remove();

        this.element.cardHeaderEditButton = document.createElement('button');
        this.element.cardHeaderEditButton.classList.add('btn', 'btn-outline-secondary', 'btn-sm', 'border-0');
        this.element.cardHeaderEditButton.setAttribute('type', 'button');
        this.element.cardHeaderEditButton.innerHTML = this.caption.iconPencil;
        this.element.cardHeaderEditCol.append(this.element.cardHeaderEditButton);

        this.element.cardHeaderEditButton.addEventListener('click', (event) => {
            this.element.cardHeaderEditButton.remove();
            this.element.cardHeaderHeading.remove();
            this.edit();
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