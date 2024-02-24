'use strict';

/**
 * Логи
 * @type {boolean} true: выводить, false: не выводить
 */
let logs = false;
if(logs){console.log('expenditure.js');}

/**
 * Отладка
 * @type {boolean} true: включена, false: выключена
 */
let debug = false;

/** Затрата */
export class Expenditure {
/**
 * Создает затрату
 * @param {Object} unit Объект юнита для расчета экономики
 * @param {Object} expenditure Объект типа затраты
 * @param {String} name Название затраты
 */
    constructor(unit, expenditure, name) {
        this.unit = unit;
        this.expenditure = expenditure;
        this.type = expenditure.type;
        this.container = expenditure.container;
        this.storage = expenditure.storage;
        this.name = name;
    }
    /** Название затраты */
    name = new String();
    /** Идентификатор затраты: время создания в формате Unix*/
    id = new Date().getTime();
    /** Массив для хранения всех экземпляров затрат */
    storage = new Object();
    /** Объект со всеми HTML-элементами затраты */
    element = {
        /** Блок HTML-элемента класса */
        block: new Object(),
        /** HTML-элементы карточки */
        card: new Object(),
        /** HTML-элементы названия */
        name: {
            newTitle: 'Новая затрата',
            editTitle: 'Редактировать затрату',
            inputTitle: 'Введите название',
            errorIcon: '<i class="bi bi-exclamation-circle-fill"></i>',
        },
        /** HTML-элементы значения */
        value: {
            inputTitle: 'Сумма',
            inputCaption: 'руб.',
            // typeCaption: 'Фиксированная',
        },
        /** HTML-элементы процентов */
        percent: {
            inputTitle: 'Процент',
            inputCaption: '%',
            // typeCaption: 'Процент',
        },
        /** HTML-элементы кнопок */
        button: {
            saveIcon: '<i class="bi bi-check"></i>',
            saveCaption: 'Сохранить',
            editIcon: '<i class="bi bi-pencil-fill"></i>',
            editCaption: 'Редактировать',
            deleteIcon: '<i class="bi bi-trash-fill"></i>',
            deleteCaption: 'Удалить',
        },
        /** Тип затраты */
        type: new String,
    }

    /**
     * Создать затрату
     * - Добавляет экземпляр затраты в массив со всеми экземплярами затраты.
     * - Создает карточку затраты
     */
    create() {
        if(logs){console.log('expenditure create:');}
        this.storage.push(this);

        if(logs){
            console.log('expenditure.storage:');
            console.log(this.storage);
        }

        this.showCard();

        if(debug){this.debug();
        if(logs){console.log('');}}
    }

    /** Вырезать затрату из массива для хранения экземпляров затрат */
    cutOut() {
        this.storage.splice(this.storage.indexOf(this), 1);
    }

    /**
     * Редактировать затрату
     * - Убрать значение затраты
     * - Вывести заголовок
     * - Вывести кнопку удаления
     * - Вывести ввод имени
     */
    edit() {
        if(logs){console.log('expenditure edit:');}
        
        this.removeValue();
        this.showHeadingEdit();
        this.showHeaderDeleteButton();
        this.showName();

        if(logs){console.log('');}
    }

    /**
     * Удалить затрату
     * - Вырезать затрату из массива для хранения экземпляров затрат
     * - Удалить карточку затраты
     * - Пересчитать юнит-экономику
     */
    delete() {
        if(logs){
            console.log('expenditure delete:')
            console.log(this);
        }

        this.cutOut();
        this.removeCard();
        this.unit.marketplacePrice.change(this.unit);

        if(logs){
            console.log('this.storage:')
            console.log(this.storage);
        }
            
        if(logs){console.log('');}
    }

    /** Удалить карточку затраты */
    removeCard() {
        this.element.block.remove();
    }

    /** Убрать кнопку удаления затраты */
    removeHeaderDeleteButton(){
        if(this.element.card.headerDeleteButton !== undefined) {
            this.element.card.headerDeleteButton.remove();
        }
    }

    /** Удалить значение затраты в процентах */
    removePercent() {
        if(logs){console.log('remove value:');}
        if(logs){console.log(this.element.percent.block);}
        if(this.element.percent.block != null) {
            this.element.percent.block.remove();
        }
    }      

    /** Удалить значение затраты */
    removeValue() {
        if(logs){console.log('remove value:');}
        if(logs){console.log(this.element.value.block);}
        if(this.element.value.block != null) {
            this.element.value.block.remove();
        }
    }  

    /**
     * Сохранить название затраты
     * Сохраняет значение затраты и удаляет ввод имени. Либо выводит ошибку, если имя не введено.
     */
    saveName() {
        if(logs){console.log('expenditure saveName');}

        if(this.element.name.inputFormControl.value.length !== 0) {
            this.name = this.element.name.inputFormControl.value;
            this.element.card.headerHeading.textContent = this.name;
            this.element.name.inputGroup.remove()
            this.show();
        } else {
            this.element.name.labelIcon.innerHTML = this.element.name.errorIcon + ' ';
            this.element.name.labelForInputFormControl.classList.add('text-danger');
            this.element.name.inputFormControl.focus();
        }

        if(logs){console.log('')};
    }

    /**
     * Вывести затрату
     * - Убрать кнопку удаления затраты
     * - Вывести заголовок
     * - Вывести кнопку редактирования затраты
     * - Вывести значение
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

    /** Показать карточку затраты */
    showCard() {
        this.element.block = document.createElement('div');
        this.element.block.classList.add(this.type);
        this.container.append(this.element.block);
    
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

        this.element.card.type = document.createElement('div');
        this.element.card.type.classList.add('type');
        this.element.card.body.append(this.element.card.type);

        this.element.card.name = document.createElement('div');
        this.element.card.name.classList.add('name');
        this.element.card.body.append(this.element.card.name);

        this.element.card.content = document.createElement('div');
        this.element.card.content.classList.add('content');
        this.element.card.body.append(this.element.card.content);
    }

    /** Вывести контент 
     * - Вывести значение
    */
    showContent() {
        this.showValue();
    }

    /** Добавить заголовок */
    showHeading() {
        if(this.name == null) {
            this.element.card.headerHeading.textContent = this.element.name.newTitle;
        } else {
            this.element.card.headerHeading.textContent = this.name;
        }
    }

    /** Вывести кнопку удаления */
    showHeaderDeleteButton() {
        this.element.card.headerDeleteButton = document.createElement('button');
        this.element.card.headerDeleteButton.classList.add('delete__btn', 'btn', 'btn-danger', 'btn-sm');
        this.element.card.headerDeleteButton.setAttribute('type', 'button');
        this.element.card.headerDeleteButton.setAttribute('aria-label', this.element.button.deleteCaption);
        this.element.card.headerDeleteButton.innerHTML = this.element.button.deleteIcon;
        this.element.card.headerEditCol.append(this.element.card.headerDeleteButton);
    
        this.element.card.headerDeleteButton.addEventListener('click', (event) => {
            this.delete();
        })
    }

    /** Добавить кнопку редактирования затраты */
    showHeaderEditButton() {
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
    }

    /** Вывести заголовок для редактирования */
    showHeadingEdit() {
        if(this.name == null) {
            this.element.card.headerHeading.textContent = this.element.name.newTitle;
            this.name = '';
        } else {
            this.element.card.headerHeading.textContent = this.element.name.editTitle;
        }
    }

    /** Вывести ввод имени */
    showName() {
        this.element.name.block = document.createElement('div');
        this.element.name.block.classList.add('name');
        this.element.card.name.append(this.element.name.block);
    
        this.element.name.inputGroup = document.createElement('div');
        this.element.name.inputGroup.classList.add('name__input-group' ,'input-group');
        this.element.name.inputGroup.classList.add('mb-2');
        this.element.name.block.append(this.element.name.inputGroup);
    
        this.element.name.formFloating = document.createElement('div');
        this.element.name.formFloating.classList.add('name__form-floating', 'form-floating');
        this.element.name.inputGroup.append(this.element.name.formFloating);
    
        this.element.name.inputFormControl = document.createElement('input');
        this.element.name.inputFormControl.classList.add('name__form-control', 'form-control');
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
        this.element.name.formFloating.append(this.element.name.labelForInputFormControl);
    
        this.element.name.labelIcon = document.createElement('span');
        this.element.name.labelIcon.classList.add('name__label-icon');
        this.element.name.labelForInputFormControl.append(this.element.name.labelIcon);
    
        this.element.name.labelText = document.createElement('span');
        this.element.name.labelText.classList.add('name__label-text');
        this.element.name.labelText.innerHTML = this.element.name.inputTitle;
        this.element.name.labelForInputFormControl.append(this.element.name.labelText);
    
        this.element.name.saveButton = document.createElement('button');
        this.element.name.saveButton.classList.add('name__btn', 'btn', 'btn-primary', 'w-42px');
        this.element.name.saveButton.setAttribute('type', 'button');
        this.element.name.saveButton.setAttribute('aria-label', this.element.button.saveCaption);
        this.element.name.saveButton.innerHTML = this.element.button.saveIcon;
        this.element.name.inputGroup.append(this.element.name.saveButton);
    
        this.element.name.saveButton.addEventListener('click', (event) => {
            this.saveName();
        }, false);
        this.element.name.inputFormControl.addEventListener('keypress', (event) => {
            this.element.name.labelIcon.innerHTML = '';
            this.element.name.labelForInputFormControl.classList.remove('text-danger');
            if(event.key === 'Enter') {
                this.element.name.saveButton.click();
            }
        })
    }

    /**
    * Вывести значение комиссии
    * - Вывести значение комиссии
    * - При изменении значения изменить значение комиссии и пересчитать юнит-экономику
    */
    showPercent() {
        if(logs){
            console.log('commission showPercent:');
            console.log(this.percent);
        }
    
        this.element.percent.block = document.createElement('div');
        this.element.percent.block.classList.add('percent');
        this.element.card.content.append(this.element.percent.block);
    
        this.element.percent.inputGroup = document.createElement('div');
        this.element.percent.inputGroup.classList.add('percent__input-group', 'input-group');
        this.element.percent.inputGroup.classList.add('mb-2');
        this.element.percent.block.append(this.element.percent.inputGroup);
    
        this.element.percent.formFloating = document.createElement('div');
        this.element.percent.formFloating.classList.add('percent__form-floating', 'form-floating');
        this.element.percent.inputGroup.append(this.element.percent.formFloating);
    
        this.element.percent.inputFormControl = document.createElement('input');
        this.element.percent.inputFormControl.classList.add('percent__form-control', 'form-control');
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
        this.element.percent.labelForInputFormControl.classList.add('percent-label');
        this.element.percent.labelForInputFormControl.setAttribute('for', 'value-' + this.id);
        this.element.percent.labelForInputFormControl.textContent = this.element.percent.inputTitle;
        this.element.percent.formFloating.append(this.element.percent.labelForInputFormControl);
    
        this.element.percent.inputFormControl.addEventListener('input', (event) => {
            this.percent = Number(this.element.percent.inputFormControl.value);
            console.log(this.percent);
            this.unit.marketplacePrice.change(this.unit);
        })
    
        this.element.percent.inputGroupText = document.createElement('span');
        this.element.percent.inputGroupText.classList.add('percent__input-group-text', 'input-group-text', 'w-42px');
        this.element.percent.inputGroupText.innerText = this.element.percent.inputCaption;
        this.element.percent.inputGroup.append(this.element.percent.inputGroupText);
    
        if(logs){console.log('');}
    
        return this.element.percent.block;
    }

    /**
     * Вывести значение расхода
     * - Вывести значение расхода
     * - При изменении значения изменить значение расхода и пересчитать юнит-экономику
     */
    showValue() {
        if(logs){
            console.log('cost showValue:');
            console.log(this.value);
        }

        this.element.value.block = document.createElement('div');
        this.element.value.block.classList.add('value');
        this.element.card.content.append(this.element.value.block);

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

        this.element.value.inputGroupText = document.createElement('span');
        this.element.value.inputGroupText.classList.add('input-group-text');
        this.element.value.inputGroupText.innerText = this.element.value.inputCaption;
        this.element.value.inputGroup.append(this.element.value.inputGroupText);

        if(logs){console.log('');}

        return this.element.value.block;
    }
}