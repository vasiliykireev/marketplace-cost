'use strict';

/**
 * Логи
 * @type {boolean} true: выводить, false: не выводить
 */
let logs = true;
if(logs){console.log('expenditure.js');}

/**
 * Отладка
 * @type {boolean} true: включена, false: выключена
 */
let debug = false;

/** Затраты */
export class Expenditure {
/**
 * Создает затрату. Выводит затрату, но если не заполнено имя, выводит редактирование затраты.
 * @param {Array} storage Массив для хранения всех экземпляров класса
 * @param {String} name Название затраты
 * @param {Number} value Значение затраты
 */
    constructor(storage, name, value) {
        this.storage = storage;
        this.name = name;
        this.value = value;
        this.create();
        if(this.name == null) {
            this.edit();
        } else {
            this.show();
        }
    }
    /** Название затраты */
    name = new String();
    /** Значение затраты */
    value = new Number();
    /** Идентификатор затраты: время создания в формате Unix*/
    id = new Date().getTime();
    /** Массив для хранения всех экземпляров затрат */
    storage = new Object();
    /** Объект со всеми HTML-элементами затраты */
    element = {
        /** Родительский HTML-элемент */
        parent: document.querySelector('.costs'),
        /** Блок HTML-элемента класса */
        block: new Object(),
        /** HTML-элементы карточки */
        card: new Object(),
        /** HTML-элементы названия */
        name: {
            newTitle: 'Новая затрата',
            editTitle: 'Редактировать затрату',
            inputTitle: 'Введите название',
        },
        /** HTML-элементы значения */
        value: {
            inputTitle: 'Сумма, руб.',
        },
        /** HTML-элементы кнопок */
        button: {
            saveIcon: '<i class="bi bi-check"></i>',
            saveCaption: 'Сохранить',
            editIcon: '<i class="bi bi-pencil-fill"></i>',
            editCaption: 'Редактировать',
            deleteIcon: '<i class="bi bi-trash-fill"></i>',
            deleteCaption: 'Удалить',
        }
    }

    /**
     * Создать затрату
     * - Добавляет экземпляр затраты в массив со всеми экземплярами затраты.
     * - Создает карточку затраты
     */
    create() {
        console.log('create');

        this.storage.push(this);

        console.log('expenditure.storage:');
        console.log(this.storage);

        this.element.block = document.createElement('div');
        this.element.block.classList.add('expenditure');
        this.element.parent.append(this.element.block);

        this.element.card.card = document.createElement('div');
        this.element.card.card.classList.add('card');
        this.element.card.card.classList.add('mb-3');
        this.element.block.append(this.element.card.card);

        this.element.card.header = document.createElement('div');
        this.element.card.header.classList.add('card-header');
        this.element.card.card.append(this.element.card.header);

        this.element.card.headerRow = document.createElement('div');
        this.element.card.headerRow.classList.add('row', 'align-items-center');
        this.element.card.header.append(this.element.card.headerRow);

        this.element.card.headerHeadingCol = document.createElement('div');
        this.element.card.headerHeadingCol.classList.add('col');
        this.element.card.headerRow.append(this.element.card.headerHeadingCol);

        this.element.card.headerHeading = document.createElement('h3');
        this.element.card.headerHeading.classList.add('h5');
        this.element.card.headerHeading.classList.add('mb-0');
        this.element.card.headerHeadingCol.append(this.element.card.headerHeading);

        this.element.card.headerExtraCol = document.createElement('div');
        this.element.card.headerExtraCol.classList.add('col-auto', 'pe-0');
        this.element.card.headerRow.append(this.element.card.headerExtraCol);

        this.element.card.headerEditCol = document.createElement('div');
        this.element.card.headerEditCol.classList.add('col-auto');
        this.element.card.headerRow.append(this.element.card.headerEditCol);

        this.element.card.body = document.createElement('div');
        this.element.card.body.classList.add('card-body');
        this.element.card.card.append(this.element.card.body);

        if(debug){this.debug();}
    }
    /**
     * Редактировать затрату
     * - Удаляет значение затраты
     * - Добавляет заголовок 
     * - Добавляет кнопку удаления
     * - Добавляет ввод имени
     */
    edit() {
        console.log('edit');
        if(this.element.value.inputGroup != null) {
            this.element.value.inputGroup.remove();
        }
        
        if(this.name == null) {
            this.element.card.headerHeading.textContent = this.element.name.newTitle;
            this.name = '';
        } else {
            this.element.card.headerHeading.textContent = this.element.name.editTitle;
        }

        this.element.card.headerDeleteButton = document.createElement('button');
        this.element.card.headerDeleteButton.classList.add('delete__btn', 'btn', 'btn-danger', 'btn-sm');
        this.element.card.headerDeleteButton.setAttribute('type', 'button');
        this.element.card.headerDeleteButton.setAttribute('aria-label', this.element.button.deleteCaption);
        this.element.card.headerDeleteButton.innerHTML = this.element.button.deleteIcon;
        this.element.card.headerEditCol.append(this.element.card.headerDeleteButton);

        this.element.card.headerDeleteButton.addEventListener('click', (event) => {
            this.delete();
        })

        this.element.name.block = document.createElement('div');
        this.element.name.block.classList.add('name');
        this.element.card.body.append(this.element.name.block);

        this.element.name.inputGroup = document.createElement('div');
        this.element.name.inputGroup.classList.add('name__input-group' ,'input-group');
        this.element.name.inputGroup.classList.add('mb-2');
        this.element.name.block.append(this.element.name.inputGroup);

        this.element.name.formFloating = document.createElement('div');
        this.element.name.formFloating.classList.add('name__form-floating', 'form-floating');
        this.element.name.inputGroup.append(this.element.name.formFloating);

        this.element.name.inputFormControl = document.createElement('input');
        this.element.name.inputFormControl.classList.add('name__form-control', 'form-control');
        // this.name.inputFormControl.classList.add('border', 'border-primary-subtle', 'focus-ring', 'focus-ring-primary');
        this.element.name.inputFormControl.setAttribute('type', 'text');
        this.element.name.inputFormControl.setAttribute('id', 'name-' + this.id);
        this.element.name.inputFormControl.setAttribute('placeholder', null);
        this.element.name.inputFormControl.setAttribute('required', '');
        if(this.name != '') {
            this.element.name.inputFormControl.setAttribute('value', this.name);
        }
        this.element.name.formFloating.append(this.element.name.inputFormControl);
        this.element.name.inputFormControl.focus();
        this.element.name.inputFormControl.selectionStart = this.element.name.inputFormControl.value.length;

        this.element.name.labelForInputFormControl = document.createElement('label');
        this.element.name.labelForInputFormControl.classList.add('name__label');
        this.element.name.labelForInputFormControl.setAttribute('for', 'name-' + this.id);
        this.element.name.labelForInputFormControl.textContent = this.element.name.inputTitle;
        this.element.name.formFloating.append(this.element.name.labelForInputFormControl);

        this.element.name.saveButton = document.createElement('button');
        this.element.name.saveButton.classList.add('name__btn', 'btn', 'btn-primary');
        this.element.name.saveButton.setAttribute('type', 'button');
        this.element.name.saveButton.setAttribute('aria-label', this.element.button.saveCaption);
        this.element.name.saveButton.innerHTML = this.element.button.saveIcon;
        this.element.name.inputGroup.append(this.element.name.saveButton);

        this.element.name.saveButton.addEventListener('click', (event) => {
            // console.log(event);
            this.saveName();
        }, false);
        this.element.name.inputFormControl.addEventListener('keypress', (event) => {
            this.element.name.labelForInputFormControl.classList.remove('text-danger');
            if(event.key === 'Enter') {
                this.saveName();
            }
        })

    }
    /**
     * Сохранить название затраты
     */
    saveName() {
        if(this.element.name.inputFormControl.value.length !== 0) {
            this.name = this.element.name.inputFormControl.value;
            this.element.card.headerHeading.textContent = this.name;
            this.element.name.inputGroup.remove()
            this.show();
        } else {
            this.element.name.labelForInputFormControl.classList.add('text-danger');
            this.element.name.inputFormControl.focus();
        }
    }

    /**
     * Вывести затрату
     * - Удаляет кнопку удаления затраты
     * - Добавляет заголовок
     * - Добавляет кнопку редактирования затраты
     */
    show() {

        console.log('show');

        console.log(this.name);

        if(this.element.card.headerDeleteButton !== undefined) {
            this.element.card.headerDeleteButton.remove();
        }

        if(this.name == null) {
            this.element.card.headerHeading.textContent = this.element.name.newTitle;
        } else {
            this.element.card.headerHeading.textContent = this.name;
        }

        this.element.card.headerEditButton = document.createElement('button');
        this.element.card.headerEditButton.classList.add('edit__btn', 'btn', 'btn-outline-secondary', 'btn-sm', 'border-0');
        this.element.card.headerEditButton.setAttribute('type', 'button');
        this.element.card.headerEditButton.setAttribute('aria-label', this.element.button.editCaption);
        this.element.card.headerEditButton.innerHTML = this.element.button.editIcon;
        this.element.card.headerEditCol.append(this.element.card.headerEditButton);

        this.element.card.headerEditButton.addEventListener('click', (event) => {
            this.element.card.headerEditButton.remove();
            this.edit();
        })
        this.showValue();
    }

    /**
     * Вывести значение затраты
     * - Добавляет значение затраты
     * - При вводе нового значения, записывает в значение затраты число до сотых
     */
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
        if(this.value !== undefined) {
            this.element.value.inputFormControl.setAttribute('value', this.value);
        }
        this.element.value.formFloating.append(this.element.value.inputFormControl);
        this.element.value.inputFormControl.focus();

        this.element.value.labelForInputFormControl = document.createElement('label');
        this.element.value.labelForInputFormControl.classList.add('value-label');
        this.element.value.labelForInputFormControl.setAttribute('for', 'value-' + this.id);
        this.element.value.labelForInputFormControl.textContent = this.element.value.inputTitle;
        this.element.value.formFloating.append(this.element.value.labelForInputFormControl);

        this.element.value.inputFormControl.addEventListener('input', (event) => {
            this.value = Number(this.element.value.inputFormControl.value).toFixed(2);
            console.log(this.value);
        })
    }
    /**
     * Удалить затрату
     * - Удаляет затрату из массива для хранения экземпляров затрат
     * - Удаляет HTML-элемент затраты
     */
    delete() {

        this.storage.splice(this.storage.indexOf(this), 1);

        this.element.block.remove();

        console.log('this.storage:')
        console.log(this.storage);
            

    }
    /**
     * Отладка
     */
    debug() {
        this.debugButton = document.createElement('button');
        this.debugButton.classList.add('debug__btn', 'btn', 'btn-info', 'btn-sm');
        this.debugButton.setAttribute('type', 'button');
        this.debugButton.innerHTML = '<i class="bi bi-question-lg"></i>';
        this.element.card.headerExtraCol.append(this.debugButton);
        this.debugButton.addEventListener('click', (event) => {
            console.log('this.storage:')
            console.log(this.storage);
        })

    }
}